import type Stripe from 'stripe'

export interface ISubscriptionObject {
  subscription: Stripe.Subscription
  subscription_item: Stripe.SubscriptionItem
}

export interface ICreateSubscriptionRequest {
  userId: string
  email: string
  name: string
  customerId: string
  price: string
  tax_rate: string
}

export interface ICreateSubscriptionInfo {
  invoice: Stripe.Invoice | null
  payment_intent: Stripe.PaymentIntent | null
}
