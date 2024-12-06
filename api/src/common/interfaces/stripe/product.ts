import type { CurrencyType } from './enum_types'

export interface IProductMetadata {
  tax_rate: string
  currency: CurrencyType
}

export interface IProduct {
  id: string
  name: string
  description: string
  created: number
  active: boolean
  metadata: IProductMetadata
}
