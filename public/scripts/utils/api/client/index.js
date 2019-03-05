export default {

  /**
   * API `GET` request
   * @param {string} url - The route/endpoint
   * @param {object} params - The request parameters
   * @returns {promise} - Response data or error
   */
  get: ({url, params}) => request('get', url, {}, params),

  /**
   * API `PUT` request
   * @param {string} url - The route/endpoint
   * @param {object} data - The request data
   * @param {object} headers - The request headers
   * @returns {undefined}
   */
  put: ({url, data, headers}) => request('put', url, data, {}, headers),

  /**
   * API `POST` request
   * @param {string} url - The route/endpoint
   * @param {object} data - The request data
   * @returns {undefined}
   */
  post: ({url, data, headers}) => request('post', url, data, {}, headers),

  /**
   * API `DELETE` request
   * @param {string} url - The route/endpoint
   */
  delete: ({url}) => request('delete', url)

};

const baseUrl = 'http://localhost:8080';

/**
 * API request
 * @param {string} method - The HTTP method
 * @param {string} url - The route/endpoint
 * @param {object} data - The request data
 * @param {object} params - The request parameters
 * @param {object} headers - The request headers
 */
function request(method, url, data = {}, params = {}, headers) {

  /**
   * Append query parameters to the `url`
   * Reference: https://bit.ly/2G1k4Pg
   */
  const route = new URL(url, baseUrl);
  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key]);
  });

  return fetch(route, {
    method,
    headers,
    mode: 'same-origin',
    credentials: 'include',
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request rejected with status ${response.status}`);
      }
      return response;
    }).catch((error) => console.error(error)); // eslint-disable-line no-console

}
