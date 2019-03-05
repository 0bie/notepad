/**
 * Get a users' initials
 * @param {string} fullname - Users' full name
 */

module.exports = (name) => {
  if (!name || typeof name !== 'string') {
    throw new Error('`name` is required as a string for getInitials method');
  }
  if (name.indexOf(' ') > 0) {
    const firstName = name.substr(0, name.indexOf(' ')).trim();
    const lastName = name.substr(name.indexOf(' ')).trim();
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  }
  return name.charAt(0).toUpperCase();
};
