import { errorResponse, successResponse } from '../../common/interfaces/api'
import { StripeCheckoutSessionService } from '../../services/stripe/checkout_session'

import type { IExpressVariable } from '../../common/interfaces/express'
import type { ICheckoutSessionInfo } from '../../common/interfaces/stripe/checkout_session'

export const createCheckoutSession = async ({ req, res }: IExpressVariable) => {
  try {
    const service = new StripeCheckoutSessionService()
    const checkoutSessionInfo: ICheckoutSessionInfo = await service.create(
      req.body
    )

    res.status(200).json(successResponse(checkoutSessionInfo))
  } catch (error: any) {
    console.error(error)
    res.status(500).json(errorResponse('Failed to create checkout session'))
  }
}

export const setupCheckoutSession = async ({ req, res }: IExpressVariable) => {
  try {
    const service = new StripeCheckoutSessionService()
    const checkoutSessionInfo: ICheckoutSessionInfo = await service.setup(
      req.body
    )

    res.status(200).json(successResponse(checkoutSessionInfo))
  } catch (error: any) {
    console.error(error)
    res.status(500).json(errorResponse('Failed to setup checkout session'))
  }
}
