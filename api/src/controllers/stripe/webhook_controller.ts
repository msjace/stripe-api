import { errorResponse } from '../../common/interfaces/api'
import { WebhookService } from '../../services/stripe/webhook'

import type { IExpressVariable } from '../../common/interfaces/express'

export const handleStripeWebhook = async ({ req, res }: IExpressVariable) => {
  try {
    const { type, data } = req.body

    const service = new WebhookService()

    switch (type) {
      case 'charge.refunded':
        await service.chargeRefunded(data.object)
        break
      case 'checkout.session.completed':
        await service.checkoutSessionCompleted(data.object)
        break
      default:
        console.error(`Unhandled event type ${type}`)
    }
  } catch (error: any) {
    console.error(error)
    res.status(500).json(errorResponse(`stripe webhook error:${error.message}`))
  }
}
