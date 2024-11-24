import { StripeInvoiceRepository } from '../../repositories/stripe/invoice'

import type Stripe from 'stripe'

export class StripeInvoiceService {
  private invoiceRepository: StripeInvoiceRepository

  constructor() {
    this.invoiceRepository = new StripeInvoiceRepository()
  }

  public async getInvoices(customerId: string): Promise<Stripe.Invoice[]> {
    const invoices = await this.invoiceRepository.getInvoices(customerId)
    return invoices
  }
  public async findById(invoiceId: string): Promise<Stripe.Invoice> {
    const invoice = await this.invoiceRepository.findById(invoiceId)
    return invoice
  }
}
