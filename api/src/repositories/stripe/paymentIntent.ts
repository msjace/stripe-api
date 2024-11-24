import { References } from './base/references'
import { StripeRepository } from './base/repository'

import type Stripe from 'stripe'

export class StripePaymentIntentRepository extends StripeRepository {
  protected ref = References.paymentIntents

  public async getIntents(
    customerId: string
  ): Promise<Stripe.ApiListPromise<Stripe.PaymentIntent>> {
    const paymentIntents = this.ref.list(
      { customer: customerId, limit: this.limit },
      { stripeAccount: this.accountId }
    )
    return paymentIntents
  }

  public async update(
    paymentIntentId: string,
    params: Stripe.PaymentIntentUpdateParams
  ): Promise<Stripe.PaymentIntent> {
    const paymentIntent = this.ref.update(paymentIntentId, params, {
      stripeAccount: this.accountId,
    })
    return paymentIntent
  }
}
