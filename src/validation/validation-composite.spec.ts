import { Validation } from './../presentation/protocols/validation'
import { expect, test, describe, jest } from '@jest/globals'
import { ValidationComposite } from './validation-composite'
import { LengthParamError } from '../presentation/errors/index'
const mockValidation = (): Validation => {
  class ValidationFieldStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationFieldStub()
}

type SutTypes = {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [mockValidation(), mockValidation()]
  const sut = new ValidationComposite(validationStubs)
  return { sut, validationStubs }
}
describe('Validation Composite', () => {
  test('Should return an error if validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new LengthParamError('field', 5, 25))
    const error = sut.validate({ field: 'any' })
    expect(error).toEqual(new LengthParamError('field', 5, 25))
  })
})
