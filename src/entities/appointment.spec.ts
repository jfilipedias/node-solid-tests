import { expect, test } from "vitest"
import { Appointment } from "./appointment"

test("Create an appointment", () => {
  const startsAt = new Date()
  const endsAt = new Date()

  endsAt.setDate(endsAt.getDate() + 1)

  const appointment = new Appointment({
    customer: "John Doe",
    startsAt,
    endsAt,
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.customer).toEqual("John Doe")
})

test("Cannot create an appointment with end date before start date", () => {
  const startsAt = new Date()
  const endsAt = new Date()

  endsAt.setDate(endsAt.getDate() - 1)

  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startsAt,
      endsAt,
    })
  }).toThrow()
})
