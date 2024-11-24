import { PaymentMode } from '../../common/interfaces/stripe/enums'
import { StripePaymentIntentRepository } from '../../repositories/stripe/paymentIntent'
import { StripePaymentMethodRepository } from '../../repositories/stripe/payment_method'
import { StripeSetupIntentRepository } from '../../repositories/stripe/setup_intent'
import { StripeSubscriptionRepository } from '../../repositories/stripe/subscription'

import { updateCustomerId } from './stripe'

import type {
  IChargeRefunded,
  ICheckoutMetadata,
} from '../../common/interfaces/stripe/webhook'
import type Stripe from 'stripe'

export class WebhookService {
  public async chargeRefunded(data: IChargeRefunded) {
    const { payment_intent, status } = data
    if (status !== 'succeeded') {
      return
    }
    const params: Stripe.PaymentIntentUpdateParams = {
      metadata: {
        refunded: 'true',
      },
    }
    const repo = new StripePaymentIntentRepository()
    await repo.update(payment_intent, params)
  }

  public async checkoutSessionCompleted(data: any) {
    const { mode, customer, metadata } = data
    const { uid }: ICheckoutMetadata = metadata

    switch (mode) {
      case PaymentMode.Payment:
      case PaymentMode.Subscription:
        await updateCustomerId(uid, customer)
        break

      case PaymentMode.Setup: {
        const stripeSetupIntentRepo = new StripeSetupIntentRepository()
        const stripePaymentMethodRepo = new StripePaymentMethodRepository()
        const stripeSubscriptionRepo = new StripeSubscriptionRepository()

        const { payment_method } = await stripeSetupIntentRepo.findById(
          data.setup_intent
        )

        await stripePaymentMethodRepo.attach(payment_method as string, customer)

        const subscription =
          await stripeSubscriptionRepo.getSubscription(customer)
        if (subscription) {
          const params: Stripe.SubscriptionUpdateParams = {
            default_payment_method: payment_method as string,
          }
          await stripeSubscriptionRepo.update(subscription.id, params)
        }
        break
      }
      default:
        console.error(`Unhandled mode ${mode}`)
    }
  }
}
