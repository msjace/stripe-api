import { StripeProductRepository } from '../../repositories/stripe/product'

import type { IProduct } from '../../common/interfaces/stripe/product'
import type Stripe from 'stripe'

export class StripeProductService {
  private productRepository: StripeProductRepository

  constructor() {
    this.productRepository = new StripeProductRepository()
  }

  public async getProducts(): Promise<Stripe.Product[]> {
    const products = await this.productRepository.getProducts()
    return products
  }

  public async save(product: IProduct): Promise<string> {
    const productParams: Stripe.ProductCreateParams = {
      name: product.name,
      description: product.description,
      active: product.active,
      metadata: {
        currency: product.metadata.currency,
      },
    }

    const productData = await this.productRepository.save(
      productParams,
      product.id
    )
    return productData.id
  }
}
