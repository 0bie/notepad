import api from '../utils/api';
import {noteItem, noteContent} from './utils';
import {handleNotice, toggleFilter} from '../utils';


handleSidebar('main', 'click');
handleListToggle({
  evtType: 'click',
  parentId: 'sidebar',
  labelId: 'taglist_label',
  containerId: 'sublist_container'
});
handleTagList('sidebar', 'click');
handleNoteContent('list_container', 'click');
handleFavList('click');
handleDefaultList('click');
handleNoteFavorite('click');
handleNoteCount();

function handleNoteContent(parentId, evtType) {

  const container = document.getElementById(parentId);
  if (!container) return;

  container.addEventListener(evtType, async function handler(evt) {

    const note = evt.target.closest('.note-item[data-id]');
    if (!note) return;
    evt.preventDefault();

    let noteResponse;
    const noteId = note.dataset.id;
    const noteContainer = document.getElementById('note_container');
    if (noteContainer.dataset.id === noteId) {
      return false;
    }

    const noteData = await api.getNote(noteId);
    if (noteData.ok) {
      noteResponse = await noteData.json();
    }

    const noteContents = noteContent(noteResponse.note);
    noteContainer.dataset.id = noteId;
    noteContainer.dataset.note = JSON.stringify(noteResponse.note);
    noteContainer.innerHTML = noteContents;

  });

}

function handleTagList(parentId, evtType) {

  const sidebar = document.getElementById(parentId);
  if (!sidebar) return;
  sidebar.addEventListener(evtType, async function handler(evt) {

    const dataTag = evt.target.closest('[data-tag]');
    const noteList = document.getElementById('note_list');
    if (!dataTag) return;
    evt.preventDefault();

    if (noteList.dataset.notes === dataTag.dataset.tag) {
      return false;
    }

    let noteResponse;
    const tagId = dataTag.dataset.tag;
    const notes = await api.getNotes(tagId);
    if (notes.ok) {
      noteResponse = await notes.json();
    }

    if (dataTag) {
      toggleFilter({
        evt,
        parentClassName: '.sidebar-item',
        activeClassName: 'sidebar-item--active'
      });
    }

    const noteItems = noteResponse.notes.map(noteItem).join('');

    noteList.dataset.notes = tagId;
    noteList.innerHTML = noteItems;
  });

}

function handleFavList(evtType) {

  const button = document.querySelector('[data-notes="favorites"]');
  if (!button) return;
  button.addEventListener(evtType, async function handler(evt) {

    const action = evt.target.closest('[data-notes]');
    const noteList = document.getElementById('note_list');
    if (!action) return;
    evt.preventDefault();

    if (noteList.dataset.notes === action.dataset.notes) {
      return false;
    }

    const admin = document.querySelector('[data-user]');
    if (!admin) {
      handleNotice({
        state: 'error',
        duration: 5000,
        message: 'Sign in or Create an account to bookmark notes.',
      });
      return;
    }

    const id = JSON.parse(admin.dataset.user)._id;
    const notes = await api.getFavorites(id);
    let noteResponse;
    if (notes.ok) {
      noteResponse = await notes.json();
    }

    if (!noteResponse.length > 0) {
      const notice = document.createElement('p');
      notice.classList.add('bookmark-message');
      notice.innerHTML = 'Hey there! Favorite some notes to update your bookmark list.';
      noteList.innerHTML = '';
      noteList.appendChild(notice);
    } else {
      const noteItems = noteResponse.map(noteItem).join('');
      noteList.dataset.notes = action.dataset.notes;
      noteList.innerHTML = noteItems;
    }

  });

}

function handleDefaultList(evtType) {

  const button = document.querySelector('[data-notes="all"]');
  if (!button) return;
  button.addEventListener(evtType, async function handler(evt) {

    const action = evt.target.closest('[data-notes]');
    const noteList = document.getElementById('note_list');
    if (!action) return;
    evt.preventDefault();

    if (noteList.dataset.notes === action.dataset.notes) {
      return false;
    }

    let noteResponse;
    const notes = await api.getNotes();

    if (notes.ok) {
      noteResponse = await notes.json();
    }
    const noteItems = noteResponse.notes.map(noteItem).join('');
    noteList.dataset.notes = action.dataset.notes;
    noteList.innerHTML = noteItems;

  });

}

function handleNoteFavorite(evtType) {

  const parent = document.getElementById('note_container');
  const button = document.querySelector('button[data-favorite]');
  if (!button) return;

  parent.addEventListener(evtType, async (evt) => {

    if (!evt.target.closest('[data-favorite]')) return;
    evt.preventDefault();
    const user = document.querySelector('[data-user]');
    if (!user) {
      handleNotice({
        state: 'error',
        duration: 5000,
        message: 'Sign In or Create an account to bookmark notes.',
      });
      return;
    }

    const id = JSON.parse(user.dataset.user)._id;
    const noteContainer = evt.target.closest('#note_container');
    const noteData = JSON.parse(noteContainer.dataset.note);

    let noteResponse; // eslint-disable-line no-unused-vars
    const favoriteNote = await api.addFavorite(id, {noteId: noteData._id});

    if (favoriteNote.ok) {
      noteResponse = await favoriteNote.json();
      handleNotice({
        state: 'success',
        duration: 5000,
        message: 'Note was successfully bookmarked.',
      });
    }

    evt.target.closest('[data-favorite]').classList.add('is-active');
  });

}

function handleNoteCount() {
  const parent = document.getElementById('tag_list');
  const tags = parent.querySelectorAll('[data-tag]');
  const tagsArr = [...tags];
  tagsArr.map(async (tag) => {
    let response;
    const request = await api.getNotes(tag.dataset.tag);
    if (request.ok) {
      response = await request.json();
    }
    const tagCount = tag.querySelector('.tag-count');
    if (tagCount) tagCount.innerHTML = response.notes.length;
  });
}

function handleSidebar(parentId, evtType) {

  const parent = document.getElementById(parentId);
  const sidebar = parent.querySelector('#sidebar');
  if (!sidebar) return;

  parent.addEventListener(evtType, function handler(evt) {
    const filterInitiated = evt.target.closest('[data-notes]');
    const toggleInitiated = evt.target.closest('#sidebar_toggle');

    if (toggleInitiated) {
      sidebar.classList.toggle('sidebar--active');
    }

    if (filterInitiated) {
      toggleFilter({
        evt,
        parentClassName: '.sidebar-item',
        activeClassName: 'sidebar-item--active'
      });
    }
  });

  document.addEventListener(evtType, function handler(evt) {
    const closeInitiated = !evt.target.closest('#sidebar') &&
                           !evt.target.closest('#sidebar_toggle');
    if (closeInitiated) {
      sidebar.classList.remove('sidebar--active');
    }
  });

}

function handleListToggle({parentId, labelId, containerId, evtType}) {

  const parent = document.getElementById(parentId);
  if (!parent) return false;

  const label = parent.querySelector(`#${labelId}`);
  const container = parent.querySelector(`#${containerId}`);

  parent.addEventListener(evtType, function handler(evt) {

    const key = evt.keyCode || evt.which;
    if (evt.type === 'keypress' && key !== 13) return null;

    const list = container.firstElementChild;
    const toggled = label.contains(evt.target);
    const toggleInitiated = !label.classList.contains('is-visible') && toggled;

    if (toggled) {
      setTimeout(() => {
        container.setAttribute('style', `height: ${toggleInitiated ? list.clientHeight + 'px' : 0}`);
      }, 100);
      container.style.height = list.clientHeight + 'px';
      label.classList.toggle('is-visible');
      list.setAttribute('aria-hidden', (toggleInitiated ? 'false' : 'true'));
      container.addEventListener('transitionend', function handler() {
        const listIsOpen = container.style.height === list.clientHeight;
        const listIsClosed = container.style.height < list.clientHeight || container.style.height === '0px';
        if (listIsClosed) return false;
        if (!listIsOpen && !listIsClosed) container.style.height = 'auto';
      });
    }

  });
  label.click();

}
