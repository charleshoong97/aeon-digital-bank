import "@testing-library/jest-dom"
import { encryptPassword } from "./hash"

it("should return encrypted password", () => {
  const password = "dummy password"

  const encrypted = encryptPassword(password)

  expect(encrypted).not.toEqual(password)
})
