import {default as getDuration} from 'date-fns/distance_in_words_strict';

export default function parseDate(date) {
  const today = new Date();
  const duration = getDuration(date, today);
  const durationArr = duration.split(' ');
  return durationArr[0] + durationArr[1].substr(0, 1);
}
