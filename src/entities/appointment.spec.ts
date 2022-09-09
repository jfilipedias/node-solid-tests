import { expect, test } from "vitest"

import { Appointment } from "./appointment"
import { getFutureDate } from "../test/utils/getFutureDate"

test("create an appointment", () => {
  const startsAt = getFutureDate("2022-08-10")
  const endsAt = getFutureDate("2022-08-11")

  const appointment = new Appointment({
    customer: "John Doe",
    startsAt,
    endsAt,
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.customer).toEqual("John Doe")
})

test("cannot create an appointment with end date before the start date", () => {
  const startsAt = getFutureDate("2022-08-10")
  const endsAt = getFutureDate("2022-08-08")

  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startsAt,
      endsAt,
    })
  }).toThrow()
})

test("cannot create an appointment with start date before than today", () => {
  const startsAt = new Date()
  const endsAt = new Date()

  startsAt.setDate(startsAt.getDate() - 1)
  endsAt.setDate(endsAt.getDate() + 1)

  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startsAt,
      endsAt,
    })
  }).toThrow()
})
