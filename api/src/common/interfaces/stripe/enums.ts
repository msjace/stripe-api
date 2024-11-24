export enum CurrencyType {
  JPY = 'jpy',
  USD = 'usd',
}

export enum PaymentMode {
  // one-time payment
  Payment = 'payment',
  Subscription = 'subscription',
  Setup = 'setup',
}

export enum SubscriptionStatus {
  Active = 'active',
  Trialing = 'trialing',
  PastDue = 'past_due',
}

export enum PaymentMethodType {
  CARD = 'card',
}

export enum PriceIntervalType {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export enum PaymentBehavior {
  DEFAULT_INCOMPLETE = 'default_incomplete',
  ERROR_IF_INCOMPLETE = 'error_if_incomplete',
}

export enum SaveDefaultPaymentMethod {
  ON_SUBSCRIPTION = 'on_subscription',
}

export enum SubscriptionExpand {
  LATEST_INVOICE_PAYMENT = 'latest_invoice.payment_intent',
}
