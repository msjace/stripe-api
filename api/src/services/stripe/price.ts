import { StripePriceRepository } from '../../repositories/stripe/price'

import { convertIPriceList } from './stripe'

import type { IPrice } from '../../common/interfaces/stripe/price'
import type Stripe from 'stripe'

export class StripePriceService {
  private priceRepository: StripePriceRepository

  constructor() {
    this.priceRepository = new StripePriceRepository()
  }

  public async getPrices(): Promise<IPrice[]> {
    const stripePrices = await this.priceRepository.getPrices()
    const prices = convertIPriceList(stripePrices)
    return prices
  }

  public async save(price: IPrice): Promise<string> {
    const priceCreateParams: Stripe.PriceCreateParams = {
      currency: price.currency,
      unit_amount: price.unit_amount,
      nickname: price.nickname,
      active: price.active,
    }

    const priceData = await this.priceRepository.save(
      priceCreateParams,
      price.id
    )
    return priceData.id
  }
}
