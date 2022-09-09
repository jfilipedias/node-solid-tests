import { setYear, parseISO } from "date-fns"

/***
 * Receive a date in string format and return a new date plus one year.
 * e.g.: Receive "2022-08-09" and return "2023-08-09".
 */
export function getFutureDate(date: string): Date {
  return setYear(parseISO(date), new Date().getFullYear() + 1)
}
