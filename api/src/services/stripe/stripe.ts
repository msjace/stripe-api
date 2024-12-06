import { UserRepository } from '../../repositories/user'

import type { CurrencyType } from '../../common/interfaces/stripe/enum_types'
import type { IPrice } from '../../common/interfaces/stripe/price'
import type Stripe from 'stripe'

export const isPaidByPaymentIntent = (
  paymentIntent: Stripe.PaymentIntent
): boolean => {
  const { status, invoice, metadata } = paymentIntent
  return status === 'succeeded' && !invoice && !('refunded' in metadata)
}

export const convertIPriceList = (price: Stripe.Price[]): IPrice[] => {
  return price.map((p) => {
    return {
      id: p.id,
      nickname: p.nickname ?? '',
      unit_amount: p.unit_amount ?? 0,
      created: p.created,
      currency: p.currency as CurrencyType,
      active: p.active,
    }
  })
}

export const updateCustomerId = async (uid: string, customer: string) => {
  const user = await UserRepository.findById(uid)
  if (!user) {
    throw new Error('user not found')
  }

  if (!user.customerId) {
    user.customerId = customer
    await UserRepository.update(user)
  }
}
