import { References } from './base/references'
import { StripeRepository } from './base/repository'

import type Stripe from 'stripe'

export class StripeSetupIntentRepository extends StripeRepository {
  protected ref = References.setupIntents

  public async findById(setupIntentId: string): Promise<Stripe.SetupIntent> {
    const setupIntent = await this.ref.retrieve(setupIntentId, {
      stripeAccount: this.accountId,
    })
    return setupIntent
  }
}
