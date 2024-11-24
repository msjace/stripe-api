import { References } from './base/references'
import { StripeRepository } from './base/repository'

import type Stripe from 'stripe'

export class StripePriceRepository extends StripeRepository {
  protected ref = References.prices

  public async getPrices(): Promise<Stripe.Price[]> {
    const result: Stripe.Price[] = []

    await this.ref
      .list({ limit: this.limit }, { stripeAccount: this.accountId })
      .autoPagingEach((price) => {
        result.push(price)
      })
    return result
  }

  public async save(
    param: Stripe.PriceCreateParams,
    priceId: string
  ): Promise<Stripe.Price> {
    const price = priceId
      ? await this.ref.update(priceId, param, {
          stripeAccount: this.accountId,
        })
      : await this.ref.create(param, {
          stripeAccount: this.accountId,
        })
    return price
  }
}
