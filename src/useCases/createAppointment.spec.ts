import { describe, expect, it } from "vitest"

import { Appointment } from "../entities/appointment"
import { getFutureDate } from "../test/utils/getFutureDate"
import { CreateAppointment } from "./createAppointment"

describe("Create appointment", () => {
  it("should be able to create an appointment", () => {
    const startsAt = getFutureDate("2022-08-10")
    const endsAt = getFutureDate("2022-08-11")

    const createAppointment = new CreateAppointment()
    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment)
  })
})
