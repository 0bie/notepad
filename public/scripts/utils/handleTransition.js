/**
 * Transition between form sections
 * @param {HTMLElement} parent - The parent element
 * @param {string} cta - The call-to-action
 * @param {string} activeClassName
 * @param {string} inactiveClassName
 * @param {object} evt - The `Event` object
 * @returns {undefined}
 */

export default function handleTransition({evt, parent, cta, activeClassName, inactiveClassName}) {
  const collection = Array.prototype.slice.call(parent.children);
  collection.forEach(function handler(item) {
    if (evt.target.closest(cta)) {
      if (item.classList.contains(activeClassName)) {
        item.classList.remove(activeClassName);
        item.classList.add(inactiveClassName);
      } else {
        item.classList.add(activeClassName);
        item.classList.remove(inactiveClassName);
      }
    }
  });
}
