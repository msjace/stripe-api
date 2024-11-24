import { StripeTaxRateRepository } from '../../repositories/stripe/tax_rate'

import type { ITaxRate } from '../../common/interfaces/stripe/tax_rate'
import type Stripe from 'stripe'

export class StripeTaxService {
  private taxRateRepository: StripeTaxRateRepository

  constructor() {
    this.taxRateRepository = new StripeTaxRateRepository()
  }

  public async getTaxRates(): Promise<Stripe.TaxRate[]> {
    const taxRates = await this.taxRateRepository.getTaxRates()
    return taxRates
  }

  public async save(taxRate: ITaxRate): Promise<string> {
    const params: Stripe.TaxRateCreateParams = {
      display_name: taxRate.display_name,
      percentage: taxRate.percentage,
      inclusive: false,
    }
    const taxRateData = await this.taxRateRepository.save(params, taxRate.id)
    return taxRateData.id
  }
}
