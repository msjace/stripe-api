import { References } from './base/references'
import { StripeRepository } from './base/repository'

export class StripePaymentMethodRepository extends StripeRepository {
  protected ref = References.paymentMethods

  public async attach(
    paymentMethodId: string,
    customerId: string
  ): Promise<void> {
    await this.ref.attach(paymentMethodId, { customer: customerId })
  }
}
