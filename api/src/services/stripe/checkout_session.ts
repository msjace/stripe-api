import {
  PaymentMethodType,
  PaymentMode,
} from '../../common/interfaces/stripe/enums'
import { StripeCheckoutSessionRepository } from '../../repositories/stripe/checkout_session'
import { StripePaymentIntentRepository } from '../../repositories/stripe/paymentIntent'
import { StripeSubscriptionRepository } from '../../repositories/stripe/subscription'
import { UserRepository } from '../../repositories/user'

import { isPaidByPaymentIntent } from './stripe'

import type {
  ICheckoutSessionInfo,
  ICreateCheckoutSessionRequest,
  ISetupCheckoutSessionRequest,
} from '../../common/interfaces/stripe/checkout_session'
import type { IUser } from '../../common/interfaces/user'
import type Stripe from 'stripe'

export class StripeCheckoutSessionService {
  public async create(
    req: ICreateCheckoutSessionRequest
  ): Promise<ICheckoutSessionInfo> {
    const {
      price,
      userId,
      success_url,
      cancel_url,
      tax_rate,
      mode,
      trial_end,
    } = req

    const user = await UserRepository.findById(userId)
    if (!user) {
      throw new Error('user not found')
    }

    const isPurchased = await this.checkIsPurchased(user, mode)

    let message = ''
    let checkout_session: Stripe.Checkout.Session =
      {} as Stripe.Checkout.Session

    if (isPurchased) {
      message =
        mode === PaymentMode.Subscription
          ? 'you have already subscribed.'
          : 'you have already purchased.'
    } else {
      const ContentQuantity = 1
      const sessionCreateParams: Stripe.Checkout.SessionCreateParams = {
        success_url,
        cancel_url,
        payment_method_types: [PaymentMethodType.CARD],
        line_items: [
          {
            price,
            quantity: ContentQuantity,
            tax_rates: [tax_rate],
          },
        ],
        customer: user.customerId ? user.customerId : undefined,
        customer_email: user.customerId ? user.email : undefined,
        metadata: { uid: userId, price },
        mode,
      }

      if (mode === PaymentMode.Subscription) {
        sessionCreateParams.subscription_data = { trial_end }
      } else if (mode === PaymentMode.Payment) {
        sessionCreateParams.payment_intent_data = {
          metadata: {
            price,
          },
        }
      }
      const repo = new StripeCheckoutSessionRepository()
      checkout_session = await repo.create(sessionCreateParams)
    }

    return {
      checkout_session,
      message,
    }
  }

  public async setup(
    req: ISetupCheckoutSessionRequest
  ): Promise<ICheckoutSessionInfo> {
    const sessionCreateParams: Stripe.Checkout.SessionCreateParams = {
      success_url: req.success_url,
      cancel_url: req.cancel_url,
      payment_method_types: [PaymentMethodType.CARD],
      customer: req.customerId,
      mode: PaymentMode.Setup,
    }

    const repo = new StripeCheckoutSessionRepository()
    const checkout_session = await repo.create(sessionCreateParams)

    return {
      checkout_session,
      message: null,
    }
  }

  private async checkIsPurchased(
    user: IUser,
    mode: PaymentMode
  ): Promise<boolean> {
    if (!user.customerId) {
      return false
    }

    if (mode === PaymentMode.Subscription) {
      const repo = new StripeSubscriptionRepository()
      const subscription = await repo.getSubscription(user.customerId)
      return subscription ? true : false
    } else if (mode === PaymentMode.Payment) {
      const purchasedPriceIds = []

      const repo = new StripePaymentIntentRepository()
      const paymentIntents = await repo.getIntents(user.customerId)
      for await (const paymentIntent of paymentIntents.data) {
        {
          if (isPaidByPaymentIntent(paymentIntent)) {
            const { price } = paymentIntent.metadata
            if (price) {
              purchasedPriceIds.push(price)
            }
          }
        }
      }
    }
    return false
  }
}
