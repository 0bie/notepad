const distanceInWords = require('date-fns').distanceInWordsStrict;

module.exports = (date) => {
  const today = new Date();
  const duration = distanceInWords(date, today);
  const durationArr = duration.split(' ');
  return durationArr[0] + durationArr[1].substr(0, 1);
};
