import Quill from '../entry/post';
import api from '../utils/api';
import {handleNotice} from '../utils';

const container = document.getElementById('post_editor');
const editor = new Quill(container, {
  modules: {
    toolbar: [
      ['bold', 'italic'],
      ['link', 'blockquote'],
      [{list: 'ordered'}, {list: 'bullet'}]
    ]
  },
  scrollingContainer: '#container_editor',
  placeholder: 'Compose an epic...',
  theme: 'snow'
});

/**
 * Post a note
 * @param {string} id - The <form> id
 * @param {string} evtType - The event type
 * @returns {undefined}
 */
function postNote(id, evtType) {

  const form = document.getElementById(id);
  if (!form) return;

  form.addEventListener(evtType, async (evt) => {
    evt.preventDefault();
    const note = {};
    const noteData = new FormData(form);
    for (const [key, value] of noteData.entries()) {
      if (key === 'tags') {
        const noteTags = [...value.split(', ')].map((tag) => ({label: tag}));
        note[key] = noteTags;
      } else {
        note[key] = value;
      }
    }
    note['text'] = editor.getText().trim();
    if (evt.target.closest('.form-actions')) {
      const response = await api.postNote(note);
      if (response.ok) {
        form.reset();
        editor.setContents([]);
        handleNotice({
          state: 'success',
          duration: 5000,
          message: 'Visit your dashboard to publish new notes.',
        });
      }
    }
  });

}
postNote('form_note', 'click');

document.documentElement.classList.add('remove--menu');
