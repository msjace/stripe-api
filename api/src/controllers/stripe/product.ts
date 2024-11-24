import { errorResponse, successResponse } from '../../common/interfaces/api'
import { StripeProductService } from '../../services/stripe/product'

import type { IExpressVariable } from '../../common/interfaces/express'
import type Stripe from 'stripe'

export const getProducts = async ({ res }: IExpressVariable) => {
  try {
    const productService = new StripeProductService()
    const products: Stripe.Product[] = await productService.getProducts()

    res.status(200).json(successResponse(products))
  } catch (error: any) {
    console.error(error)
    res.status(500).json(errorResponse('Failed to fetch products'))
  }
}

export const saveProduct = async ({ req, res }: IExpressVariable) => {
  try {
    const { product } = req.body

    const productService = new StripeProductService()
    const productId: string = await productService.save(product)

    res.status(200).json(successResponse(productId))
  } catch (error: any) {
    console.error(error)
    res.status(500).json(errorResponse('Failed to save product'))
  }
}
