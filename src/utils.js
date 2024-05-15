import dayjs from 'dayjs';

function humanizeTaskDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

export {humanizeTaskDueDate};
