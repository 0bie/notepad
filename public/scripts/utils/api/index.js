import client from './client';

export default {

  /**
   * Get all notes
   * @returns {Promise}
   */
  getNotes(tagId) {
    if (tagId) return fetch(`/api/v1/notes/tags/${tagId}`);
    return fetch('/api/v1/notes');
  },

  /**
   * Get a note
   * @returns {Promise}
   */
  getNote(id) {
    return fetch(`/api/v1/notes/${id}`);
  },

  /**
   * Update a note
   * @param {string} id - The note id
   * @returns {Promise}
   */
  updateNote(id, data) {
    return client.put({
      url: `/api/v1/notes/${id}`,
      data: {note: data},
      headers: new Headers({'Content-Type': 'application/json'})
    });
  },

  /**
   * Post a note
   * @param {string} id - The note id
   * @returns {Promise}
   */
  postNote(data) {
    return client.post({
      url: '/api/v1/notes/',
      data: {note: data},
      headers: new Headers({'Content-Type': 'application/json'})
    });
  },

  /**
   * Delete a note
   * @param {string} id - The note id
   * @returns {Promise}
   */
  deleteNote(id) {
    return client.delete({url: `/api/v1/notes/${id}`});
  },

  /**
   * Favorite a note
   * @returns {Promise}
   */
  addFavorite(id, data) {
    return client.post({
      data,
      url: `/api/v1/users/${id}/favorites`,
      headers: new Headers({'Content-Type': 'application/json'})
    });
  },

  /**
   * Get all notes
   * @returns {Promise}
   */
  getFavorites(id) {
    return fetch(`/api/v1/users/${id}/favorites`);
  },

  /**
   * Update a user
   * @param {string} id - The user id
   * @returns {Promise}
   */
  updateUser(id, data) {
    return client.put({
      url: `/api/v1/users/${id}`,
      data: {info: data},
      headers: new Headers({'Content-Type': 'application/json'})
    });
  },

};
