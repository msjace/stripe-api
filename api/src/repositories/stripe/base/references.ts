import { Stripe } from 'stripe'

import { getStripeApiKey } from '../../../common/environment'

export class References {
  public static stripe(): Stripe {
    return new Stripe(getStripeApiKey(), {
      apiVersion: '2024-10-28.acacia',
    })
  }

  public static customers: Stripe.CustomersResource = this.stripe().customers

  public static products: Stripe.ProductsResource = this.stripe().products

  public static prices: Stripe.PricesResource = this.stripe().prices

  public static taxRates: Stripe.TaxRatesResource = this.stripe().taxRates

  public static subscriptions: Stripe.SubscriptionsResource =
    this.stripe().subscriptions

  public static subscriptionItems: Stripe.SubscriptionItemsResource =
    this.stripe().subscriptionItems

  public static paymentIntents: Stripe.PaymentIntentsResource =
    this.stripe().paymentIntents

  public static checkoutSessions: Stripe.Checkout.SessionsResource =
    this.stripe().checkout.sessions

  public static setupIntents: Stripe.SetupIntentsResource =
    this.stripe().setupIntents

  public static paymentMethods: Stripe.PaymentMethodsResource =
    this.stripe().paymentMethods

  public static invoices: Stripe.InvoicesResource = this.stripe().invoices
}
