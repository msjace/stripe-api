import {
  PaymentBehavior,
  SaveDefaultPaymentMethod,
  SubscriptionExpand,
} from '../../common/interfaces/stripe/enums'
import { StripeCustomerRepository } from '../../repositories/stripe/customer'
import { StripeSubscriptionRepository } from '../../repositories/stripe/subscription'

import type {
  ICreateSubscriptionInfo,
  ICreateSubscriptionRequest,
} from '../../common/interfaces/stripe/subscription'
import type Stripe from 'stripe'

export class StripeSubscriptionService {
  private subscriptionRepository: StripeSubscriptionRepository

  constructor() {
    this.subscriptionRepository = new StripeSubscriptionRepository()
  }

  public async create(
    req: ICreateSubscriptionRequest
  ): Promise<ICreateSubscriptionInfo> {
    const { userId, email, name, customerId, price, tax_rate } = req

    let customer = null
    if (!customerId) {
      const repo = new StripeCustomerRepository()

      const metadata: Stripe.MetadataParam = {
        userID: userId,
      }

      customer = await repo.createCustomer(email, name, metadata)
    }

    const params: Stripe.SubscriptionCreateParams = {
      customer: customerId || customer!.id,
      items: [{ price, tax_rates: [tax_rate] }],
      payment_behavior: PaymentBehavior.DEFAULT_INCOMPLETE,
      payment_settings: {
        save_default_payment_method: SaveDefaultPaymentMethod.ON_SUBSCRIPTION,
      },
      expand: [SubscriptionExpand.LATEST_INVOICE_PAYMENT],
    }
    const subscription = await this.subscriptionRepository.create(params)

    const invoice = subscription.latest_invoice as Stripe.Invoice
    const payment_intent = invoice.payment_intent as Stripe.PaymentIntent

    return { invoice, payment_intent }
  }

  public async cancelWithGracePeriod(subscriptionId: string): Promise<number> {
    const params: Stripe.SubscriptionUpdateParams = {
      cancel_at_period_end: true,
    }
    const current_period_end = await this.subscriptionRepository.update(
      subscriptionId,
      params
    )
    return current_period_end
  }

  public async restart(subscriptionId: string): Promise<void> {
    const params: Stripe.SubscriptionUpdateParams = {
      cancel_at_period_end: false,
    }

    await this.subscriptionRepository.update(subscriptionId, params)
  }

  public async cancel(subscriptionId: string): Promise<void> {
    await this.subscriptionRepository.cancel(subscriptionId)
  }
}
