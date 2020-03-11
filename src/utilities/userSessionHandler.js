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

export default {
  getCurrentSession: getCurrentSession,
  setCurrentSession: setCurrentSession
};