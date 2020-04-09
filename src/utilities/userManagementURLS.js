/**
 * Wraps User Management Service API URLs that authenticationUtils
 * uses to build their API calls.
 * 
 * This is used as the URLs will change during usage in development
 * and production.
 */

const PORT = 4000;
const HOST = 'localhost'

/**
 * API endpoint to register a SERaaS user account in the 
 * User Management Service.
 */
function register() {
  return `http://${HOST}:${PORT}/authentication/register`;
};

/**
 * API endpoint to check if the given user credentials match 
 * a SERaaS user account in the User Management Service.
 */
function login() {
  return `http://${HOST}:${PORT}/authentication/login`;
};

/**
 * API endpoint to get a list of all of the recent API Calls'
 * timestamps made by the user in the User Management Service.
 */
function getAPICallTimestamps(userId) {
  return `http://${HOST}:${PORT}/authentication/data/${userId}`;
};

export default {
  register: register,
  login: login,
  getAPICallTimestamps: getAPICallTimestamps
};