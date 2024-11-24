import express from 'express'

import { getServerPort } from './common/environment'
import {
  createCheckoutSession,
  setupCheckoutSession,
} from './controllers/stripe/checkout_session'
import { getInvoice, getInvoices } from './controllers/stripe/invoice'
import { getPrices, savePrice } from './controllers/stripe/price'
import { getProducts, saveProduct } from './controllers/stripe/product'
import {
  cancelSubscription,
  cancelWithGracePeriodSubscription,
  createSubscription,
  restartSubscription,
} from './controllers/stripe/subscription'
import { getTaxRates, saveTaxRate } from './controllers/stripe/tax_rate'
import { handleStripeWebhook } from './controllers/stripe/webhook_controller'

const app: express.Express = express()

const PORT = getServerPort()

app.post('/stripe/get_product', (req, res) => getProducts({ req, res }))
app.post('/stripe/save_product', (req, res) => saveProduct({ req, res }))
app.post('/stripe/get_price', (req, res) => getPrices({ req, res }))
app.post('/stripe/save_price', (req, res) => savePrice({ req, res }))
app.post('/stripe/get_tax_rate', (req, res) => getTaxRates({ req, res }))
app.post('/stripe/save_tax_rate', (req, res) => saveTaxRate({ req, res }))
app.post('/stripe/create_subscription', (req, res) =>
  createSubscription({ req, res })
)
app.post('/stripe/cancel_subscription_with_grace_period', (req, res) =>
  cancelWithGracePeriodSubscription({ req, res })
)
app.post('/stripe/restart_subscription', (req, res) =>
  restartSubscription({ req, res })
)
app.post('/stripe/cancel_subscription', (req, res) =>
  cancelSubscription({ req, res })
)
app.post('/stripe/get_invoice', (req, res) => getInvoice({ req, res }))
app.post('/stripe/get_invoices', (req, res) => getInvoices({ req, res }))

app.post('/stripe/create_session', (req, res) =>
  createCheckoutSession({ req, res })
)
app.post('/stripe/setup_session/card', (req, res) =>
  setupCheckoutSession({ req, res })
)

app.post('/stripe_webhook', (req, res) => handleStripeWebhook({ req, res }))

app.listen(PORT)
