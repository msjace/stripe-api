import type { CurrencyType } from './enums'

export interface IPrice {
  id: string
  nickname: string
  unit_amount: number
  created: number
  currency: CurrencyType
  active: boolean
}
