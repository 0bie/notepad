/**
 * Check the value of a string
 * Return `true` only if value is 'true'
 * @param {string} - boolStr - The boolean string
 * @returns {boolean}
 */

export default function stringToBoolean(boolStr) {
  return boolStr.toLowerCase() === 'true';
}
