import "@testing-library/jest-dom"
import { getDisplay24Time, getDisplayDate } from "./date"

it("should return correct display date", () => {
  const date = "2025-01-13T03:28:45.000Z"

  const displayDate = getDisplayDate(date)

  expect(displayDate).toEqual("13 Jan 2025")
})

it("should return correct display time", () => {
  const date = "2025-01-13T03:28:45.000Z"

  const displayTime = getDisplay24Time(date)

  expect(displayTime).toEqual("11:28")
})
