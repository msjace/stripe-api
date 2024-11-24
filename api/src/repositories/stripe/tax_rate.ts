import { References } from './base/references'
import { StripeRepository } from './base/repository'

import type Stripe from 'stripe'

export class StripeTaxRateRepository extends StripeRepository {
  protected ref = References.taxRates

  public async getTaxRates(): Promise<Stripe.TaxRate[]> {
    const result: Stripe.TaxRate[] = []

    await this.ref
      .list(
        { limit: this.limit, active: true },
        { stripeAccount: this.accountId }
      )
      .autoPagingEach(async (taxRate) => {
        result.push(taxRate)
      })
    return result
  }

  public async save(
    param: Stripe.TaxRateCreateParams,
    taxRateId: string
  ): Promise<Stripe.TaxRate> {
    const taxRate = taxRateId
      ? await this.ref.update(taxRateId, param, {
          stripeAccount: this.accountId,
        })
      : await this.ref.create(param, {
          stripeAccount: this.accountId,
        })
    return taxRate
  }
}
