import { errorResponse, successResponse } from '../../common/interfaces/api'
import { StripeTaxService } from '../../services/stripe/tax_rate'

import type { IExpressVariable } from '../../common/interfaces/express'
import type Stripe from 'stripe'

export const getTaxRates = async ({ res }: IExpressVariable) => {
  try {
    const service = new StripeTaxService()
    const taxRates: Stripe.TaxRate[] = await service.getTaxRates()

    res.status(200).json(successResponse(taxRates))
  } catch (error: any) {
    console.error(error)
    res.status(500).json(errorResponse(' Failed to fetch tax rates'))
  }
}

export const saveTaxRate = async ({ req, res }: IExpressVariable) => {
  try {
    const { tax_rate } = req.body
    const service = new StripeTaxService()
    const taxRateId = await service.save(tax_rate)

    res.status(200).json(successResponse(taxRateId))
  } catch (error: any) {
    console.error(error)
    res.status(500).json(errorResponse('Failed to save tax rate'))
  }
}
