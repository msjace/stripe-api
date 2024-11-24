import { References } from './base/references'
import { StripeRepository } from './base/repository'

import type Stripe from 'stripe'

export class StripeCheckoutSessionRepository extends StripeRepository {
  protected ref = References.checkoutSessions

  public async create(
    sessionCreateParams: Stripe.Checkout.SessionCreateParams
  ): Promise<Stripe.Checkout.Session> {
    const session = await this.ref.create(sessionCreateParams, {
      stripeAccount: this.accountId,
    })
    return session
  }
}
