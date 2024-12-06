import type { PaymentMode } from './enum_types'
import type Stripe from 'stripe'

export interface ICreateCheckoutSessionRequest {
  price: string
  userId: string
  success_url: string
  cancel_url: string
  tax_rate: string
  mode: PaymentMode
  trial_end?: number
}

export interface ICheckoutSessionInfo {
  checkout_session: Stripe.Checkout.Session
  message: string | null
}

export interface ISetupCheckoutSessionRequest {
  customerId: string
  success_url: string
  cancel_url: string
}
