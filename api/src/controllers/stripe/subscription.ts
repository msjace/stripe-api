import { errorResponse, successResponse } from '../../common/interfaces/api'
import { StripeSubscriptionService } from '../../services/stripe/subscription'

import type { IExpressVariable } from '../../common/interfaces/express'
import type { ICreateSubscriptionInfo } from '../../common/interfaces/stripe/subscription'

export const createSubscription = async ({ req, res }: IExpressVariable) => {
  try {
    const service = new StripeSubscriptionService()
    const SubscriptionInfo: ICreateSubscriptionInfo = await service.create(
      req.body
    )

    res.status(200).json(successResponse(SubscriptionInfo))
  } catch (error: any) {
    console.error(error)
    res.status(500).json(errorResponse('Failed to create subscription'))
  }
}

export const cancelWithGracePeriodSubscription = async ({
  req,
  res,
}: IExpressVariable) => {
  try {
    const { subscriptionId } = req.body

    const service = new StripeSubscriptionService()
    const current_period_end: number =
      await service.cancelWithGracePeriod(subscriptionId)

    res.status(200).json(successResponse(current_period_end))
  } catch (error: any) {
    console.error(error)
    res
      .status(500)
      .json(errorResponse('Failed to cancel subscription with grace period'))
  }
}

export const restartSubscription = async ({ req, res }: IExpressVariable) => {
  try {
    const { subscriptionId } = req.body

    const service = new StripeSubscriptionService()
    await service.restart(subscriptionId)

    res.status(200).json(successResponse('Subscription restarted'))
  } catch (error: any) {
    console.error(error)
    res.status(500).json(errorResponse('Failed to restart subscription'))
  }
}

export const cancelSubscription = async ({ req, res }: IExpressVariable) => {
  try {
    const { subscriptionId } = req.body

    const service = new StripeSubscriptionService()
    await service.cancel(subscriptionId)

    res.status(200).json(successResponse('Subscription cancelled'))
  } catch (error: any) {
    console.error(error)
    res.status(500).json(errorResponse('Failed to cancel subscription'))
  }
}
