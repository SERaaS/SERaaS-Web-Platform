/**
 * Wraps caching functionality for user session handling.
 */

const CURRENT_USER_SESSION_CACHE_KEY = 'currentUser';

/**
 * Retrieves the current session user's ID.
 */
function getCurrentSession() {
  return localStorage.getItem(CURRENT_USER_SESSION_CACHE_KEY)
}

/**
 * Changes the current session user's ID.
 */
function setCurrentSession(userId) {
  localStorage.setItem(CURRENT_USER_SESSION_CACHE_KEY, userId);
}

/**
 * Removes the current session user.
 */
function removeCurrentSession() {
  localStorage.removeItem(CURRENT_USER_SESSION_CACHE_KEY);
}

export default {
  getCurrentSession: getCurrentSession,
  setCurrentSession: setCurrentSession,
  removeCurrentSession: removeCurrentSession
};