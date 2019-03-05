import {tagItem} from './index';

export default function noteContent({title, tags, text}) {

  return (
    `<header class="note-header">
      <h3 class="title">
        <span class="title-text">${title}</span>
      </h3>
      <div class="note-actions">
        <button class="btn btn--xs btn--hover" title="Favorite this note" data-favorite>
          <span class="text--sr">favorite this note</span>
          <svg class="icon icon--sm icon--favorite vert--mid" viewBox="0 0 8 8" width="8" height="8">
            <title>Favorite ${title}</title>
            <path d="M4 0l-1 3h-3l2.5 2-1 3 2.5-2 2.5 2-1-3 2.5-2h-3l-1-3z"></path>
          </svg>
        </button>
      </div>
    </header>
    <div class="note-tags">
      ${tags.map(tagItem).join('')}
    </div>
    <div class="note-body">
      <div class="note-content">
        <div class="mb--xxxxl" id="note_content">${text}</div>
      </div>
    </div>`
  );

}
