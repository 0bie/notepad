/**
 * Dismiss a notice message
 * @param {string} message - The notice message
 * @param {number} duration - The minimum duration before dismissing a notice
 * @returns {number} The timeout id
 */

export default function handleNotice({message, state, duration}) {
  const noticeContainer = document.getElementById('notice-block');
  const noticeContent = document.createElement('div');
  const noticeMessage = document.createElement('div');
  noticeContent.classList.add('notice-container');
  noticeMessage.classList.add('notice', `notice--${state}`);
  noticeMessage.innerHTML = message;
  noticeContent.appendChild(noticeMessage);
  noticeContainer.appendChild(noticeContent);
  return setTimeout(() => {
    const noticeContainer = document.querySelector('.notice-container');
    if (!noticeContainer) return null;
    noticeContainer.classList.add('notice-container--hidden');
    noticeContainer.addEventListener('transitionend', (evt) => {
      if (evt.propertyName !== 'visibility') return;
      noticeContainer.remove();
    });
  }, duration);
}
