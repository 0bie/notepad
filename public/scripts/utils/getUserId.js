/**
 * Get a user's id
 * @param {string} avatarId - The element selector <data-id>
 * @returns {string}
 */

export default function getUserId(avatarId) {
  const userAvatar = document.querySelector(avatarId);
  if (!userAvatar) throw new Error('No user id!');
  const id = userAvatar.dataset.id;
  return id;
}
