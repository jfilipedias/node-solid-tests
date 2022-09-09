import { expect, test } from "vitest"
import { getFutureDate } from "./getFutureDate"

test("increase date with one year", () => {
  const year = new Date().getFullYear()

  expect(getFutureDate(`${year}-08-22`).getFullYear()).toEqual(year + 1)
})
