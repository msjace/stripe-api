const CurrencyType = {
  JPY: 'jpy',
  USD: 'usd',
} as const
export type CurrencyType = (typeof CurrencyType)[keyof typeof CurrencyType]

export const PaymentMode = {
  Payment: 'payment',
  Subscription: 'subscription',
  Setup: 'setup',
} as const
export type PaymentMode = (typeof PaymentMode)[keyof typeof PaymentMode]

export const SubscriptionStatus = {
  Active: 'active',
  Trialing: 'trialing',
  PastDue: 'past_due',
} as const
export type SubscriptionStatus =
  (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus]

export const PaymentMethodType = {
  CARD: 'card',
} as const
export type PaymentMethodType =
  (typeof PaymentMethodType)[keyof typeof PaymentMethodType]

const PriceIntervalType = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
} as const
export type PriceIntervalType =
  (typeof PriceIntervalType)[keyof typeof PriceIntervalType]

export const PaymentBehavior = {
  DEFAULT_INCOMPLETE: 'default_incomplete',
  ERROR_IF_INCOMPLETE: 'error_if_incomplete',
} as const
export type PaymentBehavior =
  (typeof PaymentBehavior)[keyof typeof PaymentBehavior]

export const SaveDefaultPaymentMethod = {
  ON_SUBSCRIPTION: 'on_subscription',
} as const
export type SaveDefaultPaymentMethod =
  (typeof SaveDefaultPaymentMethod)[keyof typeof SaveDefaultPaymentMethod]

export const SubscriptionExpand = {
  LATEST_INVOICE_PAYMENT: 'latest_invoice.payment_intent',
} as const
export type SubscriptionExpand =
  (typeof SubscriptionExpand)[keyof typeof SubscriptionExpand]
