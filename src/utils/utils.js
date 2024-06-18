import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

function humanizeTaskDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

const getInteger = (string) => parseInt(string, 10);

const getDuration = (startDate, endDate) => dayjs.duration(dayjs(endDate).diff(dayjs(startDate)));

const getDateDifference = (dateFrom, dateTo) => {
  const difference = getDuration(dateFrom, dateTo);
  const days = difference.format('D');
  const hours = difference.format('HH');
  const minutes = difference.format('mm');
  const daysTemplate = getInteger(days) ? `${days}D` : '';
  const hoursTemplate = !(getInteger(days) || getInteger(hours)) ? '' : `${hours}H`;
  const minutesTemplate = `${minutes}M`;

  return `${daysTemplate} ${hoursTemplate} ${minutesTemplate}`;
};

const isPointFuture = ({ dateFrom }) => dayjs().isBefore(dateFrom);

const isPointPresent = ({ dateFrom, dateTo }) =>
  dayjs().isAfter(dateFrom) && dayjs().isBefore(dateTo);

const isPointPast = ({ dateTo }) => dayjs().isAfter(dateTo);

function isEmpty(arr) {
  return arr.length === 0;
}

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

export {
  humanizeTaskDueDate,
  isEmpty,
  isPointFuture,
  isPointPresent,
  isPointPast,
  isDatesEqual,
  getDateDifference,
};
