interface IDateProvider {
  hoursBetweenDates(start_date: Date, end_date: Date): number
  convertToUTC(date: Date): string
  dateNow(): Date
  daysBetweenDates(start_date: Date, end_date: Date): number
  addDays(days: number): Date
  addHours(hours: number): Date
  compareIsBefore(start_date: Date, end_date: Date): boolean
}

export default IDateProvider;
