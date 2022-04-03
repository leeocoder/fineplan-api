import { LoadUserByUsernameRepository } from '@/data/protocols/load-user-by-username-repository'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'

export class DbAddAccount implements AddAccount {
  constructor (private readonly loadUserByUsername: LoadUserByUsernameRepository) {}
  async add (accountParams: AddAccountParams): Promise<string | null> {
    const account = await this.loadUserByUsername.loadByUsername(accountParams.username)
    if (account) return null

    return 'any'
  }
}
