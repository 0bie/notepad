/**
 * Toggle active state between sidebar filters
 * @param {HTMLElement} parent - The parent element of the button set
 * @param {string} primaryClassName - The `class` attribute of primary button
 * @param {string} disabledClassName - The `class` attribute of disabled button
 * @returns {undefined}
 */

export default function toggleFilter({evt, parentClassName, activeClassName}) {
  const buttons = document.querySelectorAll('[data-filter]');
  const buttonCollection = Array.prototype.slice.call(buttons);
  buttonCollection.forEach(function handler(button) {
    const parent = button.closest(parentClassName);
    const filterInitiated = parent.contains(evt.target);
    if (filterInitiated && !parent.classList.contains(activeClassName)) {
      parent.classList.add(activeClassName);
    }
    if (!filterInitiated) parent.classList.remove(activeClassName);
  });
}
