import { describe, expect, it } from "vitest"

import { Appointment } from "../entities/appointment"
import { InMemoryAppointmentsRepository } from "../repositories/inMemory/inMemoryAppointmentsRepository"
import { getFutureDate } from "../test/utils/getFutureDate"
import { CreateAppointment } from "./createAppointment"

describe("Create appointment", async () => {
  it("should be able to create an appointment", () => {
    const startsAt = getFutureDate("2022-08-10")
    const endsAt = getFutureDate("2022-08-11")

    const appointmentRepository = new InMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(appointmentRepository)

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment)
  })

  it("should not be able to create an appointment with overlapping dates", async () => {
    const startsAt = getFutureDate("2022-08-10")
    const endsAt = getFutureDate("2022-08-15")

    const appointmentRepository = new InMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(appointmentRepository)

    await createAppointment.execute({
      customer: "John Doe",
      startsAt,
      endsAt,
    })

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2022-08-13"),
        endsAt: getFutureDate("2022-08-18"),
      })
    ).rejects.toBeInstanceOf(Error)

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2022-08-08"),
        endsAt: getFutureDate("2022-08-13"),
      })
    ).rejects.toBeInstanceOf(Error)

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2022-08-08"),
        endsAt: getFutureDate("2022-08-18"),
      })
    ).rejects.toBeInstanceOf(Error)

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2022-08-12"),
        endsAt: getFutureDate("2022-08-13"),
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
