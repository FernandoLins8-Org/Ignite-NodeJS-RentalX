import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import IDateProvider from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  hoursBetweenDates(start_date: Date, end_date: Date) {
    const StartDateUTC = this.convertToUTC(start_date);
    const EndDateUTC = this.convertToUTC(end_date);

    return dayjs(EndDateUTC).diff(StartDateUTC, 'hours');
  }

  convertToUTC(date: Date) {
    return dayjs(date)
      .utc()
      .local()
      .format();
  }

  dateNow() {
    return dayjs().toDate();
  }
}

export { DayjsDateProvider };
