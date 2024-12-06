import type { PaymentMethodType } from './enum_types'
import type Stripe from 'stripe'

export interface IChargeRefunded {
  payment_intent: string
  payment_method_details: IPaymentMethodDetails
  status:
    | 'pending'
    | 'succeeded'
    | 'failed'
    | 'pending'
    | 'requires_action'
    | 'canceled'
}

export interface IPaymentMethodDetails {
  type: PaymentMethodType
}

export interface ICheckoutSessionCompleted {
  mode: Stripe.Checkout.Session.Mode
  metadata: ICheckoutMetadata
  customer: string
  charges: ICharges
  payment_intent: string
  setup_intent: string
}

export interface ICheckoutMetadata {
  uid: string
}

export interface ICharges {
  data: Stripe.Charge[]
}
