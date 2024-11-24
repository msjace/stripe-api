import { errorResponse, successResponse } from '../../common/interfaces/api'
import { StripeInvoiceService } from '../../services/stripe/invoice'

import type { IExpressVariable } from '../../common/interfaces/express'
import type Stripe from 'stripe'

export const getInvoices = async ({ req, res }: IExpressVariable) => {
  try {
    const { customerId } = req.body

    const service = new StripeInvoiceService()
    const invoices = await service.getInvoices(customerId)

    res.status(200).json(successResponse(invoices))
  } catch (error: any) {
    console.error(error)
    res.status(500).json(errorResponse('Failed to fetch invoices'))
  }
}

export const getInvoice = async ({ req, res }: IExpressVariable) => {
  try {
    const { invoiceId } = req.body

    const service = new StripeInvoiceService()
    const invoice: Stripe.Invoice = await service.findById(invoiceId)

    res.status(200).json(successResponse(invoice))
  } catch (error: any) {
    console.error(error)
    res.status(500).json(errorResponse('Failed to fetch invoice'))
  }
}
