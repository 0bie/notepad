import {parseDate, tagItem} from './index';

/**
 * Render a note item
 * @param {string} title - The note title
 * @param {string} timestamp - The note timestamp
 * @param {array} tags - The note tags
 * @returns {string} Note item markup
 */

export default function noteItem({_id, title, created_date, tags}) {

  return (
    `<li class="note-item" data-id=${_id}>
      <header>
        <h3 class="note-title">
          <span class="title-text">${title}</span>
        </h3>
        <div class="note-timestamp">
          <span class="note-date">${parseDate(created_date)}</span>
        </div>
      </header>
      ${noteFooter(tags)}
    </li>`
  );

}

function noteFooter(tags) {
  const noLabel = !tags[0] || !tags[0].label;
  if (noLabel) return '';
  return (
    `<footer class="note-footer">
      <div class="footer-content">
        ${tags.map(tagItem).join('')}
      </div>
    </footer>`
  );
}
