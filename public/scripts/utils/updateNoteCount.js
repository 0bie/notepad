/**
 * Update total count of notes
 * @param {string} listId - The `id` attribute of the note list
 * @param {string} countId - The `id` attribute of the total count
 * @returns {undefined}
 */

export default function updateNoteCount(listId, countId) {
  const noteList = document.getElementById(listId);
  const noteCount = document.getElementById(countId);
  noteCount.innerHTML = noteList.childElementCount - 1;
  if ((noteList.childElementCount - 1) == 0) {
    noteList.innerHTML = 'There\'s no published content yet.';
  }
}
