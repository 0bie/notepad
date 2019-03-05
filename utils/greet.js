/**
 * Display a greeting message
 * @param {string} userName
 * @returns {string}
 */

module.exports = (userName) => {
  let greeting;
  const hour = new Date().getHours();
  if (hour < 12) {
    greeting = 'morning';
  } else if (hour < 17) {
    greeting = 'afternoon';
  } else {
    greeting = 'evening';
  }
  const fullName = userName.charAt(0).toUpperCase() + userName.substr(1);
  return `Good ${greeting}, ${fullName}`;
};
