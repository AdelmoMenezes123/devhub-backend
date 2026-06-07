import dayjs from "dayjs";

export class DateProvider {
  addDays(days: number): Date {
    return dayjs().add(days, "day").toDate();
  }

  isBefore(date: Date, compareDate: Date): boolean {
    return dayjs(date).isBefore(compareDate);
  }
}
