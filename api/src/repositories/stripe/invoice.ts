import { References } from './base/references'
import { StripeRepository } from './base/repository'

import type Stripe from 'stripe'

export class StripeInvoiceRepository extends StripeRepository {
  protected ref = References.invoices

  public async getInvoices(customerId: string): Promise<Stripe.Invoice[]> {
    const result: Stripe.Invoice[] = []

    await this.ref
      .list(
        { customer: customerId, limit: this.limit },
        { stripeAccount: this.accountId }
      )
      .autoPagingEach((invoice) => {
        result.push(invoice)
      })
    return result
  }

  public async findById(invoiceId: string): Promise<Stripe.Invoice> {
    const invoice = await this.ref.retrieve(invoiceId, {
      stripeAccount: this.accountId,
    })
    return invoice
  }
}
