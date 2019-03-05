/**
 * Toggle primary state between a button set
 * @param {HTMLElement} parent - The parent element of the button set
 * @param {string} primaryClassName - The `class` attribute of primary button
 * @param {string} disabledClassName - The `class` attribute of disabled button
 * @returns {undefined}
 */

export default function togglePublish({evt, parent, primaryClassName, disabledClassName}) {
  const buttonCollection = Array.prototype.slice.call(parent.children);
  buttonCollection.forEach(function handler(button) {
    if (evt.target.closest('button')) {
      if (button.classList.contains(primaryClassName)) {
        button.classList.remove(primaryClassName);
        button.classList.add(disabledClassName);
      }
      if (button !== evt.target.closest('button')) {
        button.classList.remove(disabledClassName);
        button.classList.add(primaryClassName);
      }
    }
  });
}
