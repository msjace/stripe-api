import type { CurrencyType } from './enum_types'

export interface IPrice {
  id: string
  nickname: string
  unit_amount: number
  created: number
  currency: CurrencyType
  active: boolean
}
