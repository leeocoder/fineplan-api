import { ValidationComposite } from '../../../../validation/validation-composite'
import { TransactionMongoRepository } from '../../../../infra/db/transaction/transaction-mongo-repository'
import { DbAddTransaction } from '../../../../data/usecases/transaction/db-add-transaction'
import { DepositController } from '../../../../presentation/controllers/transaction/deposit/deposit-controller'
import { Controller } from '../../../../presentation/protocols/controller'
export const makeDepositController = (): Controller => {
  const addTransactionRepository = new TransactionMongoRepository()
  const addTransaction = new DbAddTransaction(addTransactionRepository)
  const validationComposite = new ValidationComposite([])
  return new DepositController(addTransaction, validationComposite)
}
