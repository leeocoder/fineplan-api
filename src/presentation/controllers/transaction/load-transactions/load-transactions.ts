import { LoadTransactions } from './../../../../domain/usecases/transaction/load-transactions'
import { Controller, HttpRequest, HttpResponse } from '../deposit/deposit-controller-protocols'

export class LoadTransactionsController implements Controller {
  constructor (private readonly loadTransactions: LoadTransactions) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const user = httpRequest.user

    await this.loadTransactions.loadAll(String(user?.id))
    return await Promise.resolve({ statusCode: 200, body: '' })
  }
}
