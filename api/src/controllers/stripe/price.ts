import { errorResponse, successResponse } from '../../common/interfaces/api'
import { StripePriceService } from '../../services/stripe/price'

import type { IExpressVariable } from '../../common/interfaces/express'
import type { IPrice } from '../../common/interfaces/stripe/price'

export const getPrices = async ({ res }: IExpressVariable) => {
  try {
    const service = new StripePriceService()
    const prices: IPrice[] = await service.getPrices()

    res.status(200).json(successResponse(prices))
  } catch (error: any) {
    console.error(error)
    res.status(500).json(errorResponse('Failed to fetch prices'))
  }
}

export const savePrice = async ({ req, res }: IExpressVariable) => {
  try {
    const { price } = req.body
    const service = new StripePriceService()
    const priceId: string = await service.save(price)

    res.status(200).json(successResponse(priceId))
  } catch (error: any) {
    console.error(error)
  }
  res.status(500).json(errorResponse('Failed to save price'))
}
