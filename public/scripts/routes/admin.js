import api from '../utils/api';
import {
  getUserId,
  findNoteItem,
  togglePublish,
  stringToBoolean,
  updateNoteCount
} from '../utils';
import {handleNotice} from '../utils';

updateInfo('form_info', 'click');
document.documentElement.classList.add('remove--menu');

const parent = document.getElementById('note_list');
parent.addEventListener('click', (evt) => {

  if (!evt.target.closest('button')) return;
  const noteItem = findNoteItem(evt);
  const id = noteItem.dataset.id;

  if (evt.target.closest('[data-publish]')) {
    const data = {
      published: !stringToBoolean(noteItem.dataset.published)
    };
    publishNote({id, data, evt, noteItem});
  }

  if (evt.target.closest('[data-delete]')) {
    deleteNote({id, noteItem});
  }

});

/**
 * Publish/Unpublish a note
 * @param {string} id - The note id
 * @param {object} data - The note data
 * @param {HTMLElement} noteItem - The note <li>
 * @param {object} - The `Event` object
 * @returns {undefined}
 */
async function publishNote({id, data, noteItem, evt}) {
  const response = await api.updateNote(id, data);
  if (response.ok) {
    togglePublish({
      evt,
      primaryClassName: 'btn--primary',
      disabledClassName: 'btn--disabled',
      parent: noteItem.querySelector('div[data-publish]')
    });
    handleNotice({
      duration: 5000,
      state: 'success',
      message: 'Note successfully updated.',
    });
  }
}

/**
 * Delete a note
 * @param {string} id - The note id
 * @param {HTMLElement} noteItem - The note <li>
 * @returns {undefined}
 */
async function deleteNote({id, noteItem}) {
  const response = await api.deleteNote(id);
  if (response.ok) {
    noteItem.classList.add('list-item--deleted');
    noteItem.addEventListener('transitionend', () => {
      return this.remove();
    });
    updateNoteCount('note_list', 'note_count');
    handleNotice({
      duration: 5000,
      state: 'success',
      message: 'Note successfully deleted.',
    });
  }
}

/**
 * Update user info
 * @param {string} id - The user id
 * @param {string} evtType - The event type
 * @returns {undefined}
 */
function updateInfo(id, evtType) {

  const form = document.getElementById(id);
  if (!form) return;

  form.addEventListener(evtType, async (evt) => {
    evt.preventDefault();
    const info = {};
    const infoData = new FormData(form);
    for (const [key, value] of infoData.entries()) {
      if (value.length > 0) {
        info[key] = value;
      }
    }
    if (evt.target.closest('.form-actions')) {
      const userId = getUserId('.avatar[data-id]');
      const response = await api.updateUser(userId, info);
      if (response.ok) {
        form.reset();
        handleNotice({
          duration: 5000,
          state: 'success',
          message: 'Information successfully updated.',
        });
      }
    }
  });

}
