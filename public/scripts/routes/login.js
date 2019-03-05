import {handleTransition} from '../utils';

const registrationMessage = document.getElementById('form_message');
registrationMessage.addEventListener('click', (evt) => {
  if (!evt.target.closest('#btn_signup')) return false;
  handleTransition({
    evt,
    cta: '#btn_signup',
    activeClassName: 'form-content--active',
    inactiveClassName: 'form-content--removed',
    parent: document.getElementById('form_fields')
  });
  const messages = Array.prototype.slice.call(this.children);
  messages.forEach((message) => {
    if (message.classList.contains('revealed')) {
      message.classList.remove('revealed');
      message.classList.add('removed');
    } else {
      message.classList.add('revealed');
      message.classList.remove('removed');
    }
  });
  this.classList.add('form-footer--removed');
});

document.documentElement.classList.add('remove--menu');
