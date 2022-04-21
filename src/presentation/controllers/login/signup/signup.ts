import { HttpRequest, HttpResponse, Controller, Validation } from './signup-protocols'
import { badRequest, forbidden, ok, serverError } from '../../../helpers/http/http'
import { UsernameInUseError } from '../../../errors'
import { AddAccount } from '../../../../domain/usecases/account/add-account'
export class SignUpController implements Controller {
  constructor (private readonly addAccount: AddAccount,
    private readonly validationComposite: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise <HttpResponse> {
    try {
      const error = this.validationComposite.validate(httpRequest.body)
      if (error) return badRequest(error)
      const { username, password } = httpRequest.body
      const accessToken = await this.addAccount.add({ username, password })
      if (!accessToken) return forbidden(new UsernameInUseError())
      return ok({ accessToken })
    } catch (error: any) {
      return serverError(error)
    }
  }
}
