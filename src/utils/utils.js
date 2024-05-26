import dayjs from 'dayjs';

function humanizeTaskDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

const isPointFuture = ({ dateFrom }) => dayjs().isBefore(dateFrom);

const isPointPresent = ({ dateFrom, dateTo }) =>
  dayjs().isAfter(dateFrom) && dayjs().isBefore(dateTo);

const isPointPast = ({ dateTo }) => dayjs().isAfter(dateTo);

function isEmpty(arr) {
  return arr.length === 0;
}
export {
  humanizeTaskDueDate,
  isEmpty,
  isPointFuture,
  isPointPresent,
  isPointPast,
};
