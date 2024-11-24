import { References } from './base/references'
import { StripeRepository } from './base/repository'

import type Stripe from 'stripe'

export class StripeCustomerRepository extends StripeRepository {
  protected ref = References.customers

  public async createCustomer(
    email: string,
    name: string,
    metadata: Stripe.MetadataParam
  ): Promise<Stripe.Customer> {
    const customer = await this.ref.create(
      { email, name, metadata },
      { stripeAccount: this.accountId }
    )
    return customer
  }

  public async retrieveCustomer(): Promise<
    Stripe.Customer | Stripe.DeletedCustomer
  > {
    const customer = await this.ref.retrieve(this.accountId)
    return customer
  }

  public async updateCustomer(
    customerId: string,
    params: Stripe.CustomerUpdateParams
  ): Promise<Stripe.Customer> {
    const customer = await this.ref.update(customerId, params, {
      stripeAccount: this.accountId,
    })
    return customer
  }

  public async updateCustomerMetadata(
    customerId: string,
    metadata: Stripe.MetadataParam
  ): Promise<Stripe.Customer> {
    const customer = await this.ref.update(
      customerId,
      { metadata },
      { stripeAccount: this.accountId }
    )
    return customer
  }
}
