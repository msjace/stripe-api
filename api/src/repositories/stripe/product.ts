import { References } from './base/references'
import { StripeRepository } from './base/repository'

import type { Stripe } from 'stripe'

export class StripeProductRepository extends StripeRepository {
  protected ref = References.products

  public async getProducts(): Promise<Stripe.Product[]> {
    const result: Stripe.Product[] = []

    await this.ref
      .list({ limit: this.limit }, { stripeAccount: this.accountId })
      .autoPagingEach((product) => {
        result.push(product)
      })
    return result
  }

  public async save(
    params: Stripe.ProductCreateParams,
    productId: string
  ): Promise<Stripe.Product> {
    const product = productId
      ? await this.ref.update(productId, params, {
          stripeAccount: this.accountId,
        })
      : await this.ref.create(params, {
          stripeAccount: this.accountId,
        })
    return product
  }
}
