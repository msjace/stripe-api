import { SubscriptionStatus } from '../../common/interfaces/stripe/enum_types'

import { References } from './base/references'
import { StripeRepository } from './base/repository'

import type Stripe from 'stripe'

export class StripeSubscriptionRepository extends StripeRepository {
  protected subscriptionsRef = References.subscriptions

  public async getSubscription(
    customerId: string
  ): Promise<Stripe.Subscription | null> {
    const validStatuses: string[] = [
      SubscriptionStatus.Active,
      SubscriptionStatus.Trialing,
      SubscriptionStatus.PastDue,
    ]

    const subscription = (
      await this.subscriptionsRef.list(
        { customer: customerId },
        { stripeAccount: this.accountId }
      )
    ).data.find(({ status }) => validStatuses.includes(status))
    if (!subscription) return null

    if (
      subscription.metadata.is_paid === 'false' &&
      subscription.status !== 'trialing'
    ) {
      return null
    }

    return subscription
  }

  public async create(
    params: Stripe.SubscriptionCreateParams
  ): Promise<Stripe.Subscription> {
    const subscription = await this.subscriptionsRef.create(params, {
      stripeAccount: this.accountId,
    })

    return subscription
  }

  public async update(
    subscriptionId: string,
    params: Stripe.SubscriptionUpdateParams
  ): Promise<number> {
    const { current_period_end } = await this.subscriptionsRef.update(
      subscriptionId,
      params,
      {
        stripeAccount: this.accountId,
      }
    )

    return current_period_end
  }

  public async cancel(subscriptionId: string): Promise<void> {
    await this.subscriptionsRef.cancel(subscriptionId, {
      stripeAccount: this.accountId,
    })
  }
}
