/**
 * Get the article item
 * @param {object} evt - The `Event` object
 * @return {HTMLElement} - The list item
 */

export default function findNoteItem(evt) {
  const item = evt.target.closest('li');
  if (!item) {
    console.error('No item element found!'); // eslint-disable-line
  }
  return item;
}
