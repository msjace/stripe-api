import { getStripeApiKey } from '../../../common/environment'

import type { Stripe } from 'stripe'

export type StripePaginationLimit = NonNullable<
  Stripe.PaginationParams['limit']
>

export abstract class StripeRepository {
  protected accountId: string = getStripeApiKey()

  protected limit: StripePaginationLimit = 100
}
