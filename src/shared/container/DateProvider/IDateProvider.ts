interface IDateProvider {
  hoursBetweenDates(start_date: Date, end_date: Date): number
  convertToUTC(date: Date): string
  dateNow(): Date
}

export default IDateProvider;