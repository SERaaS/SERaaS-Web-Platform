/**
 * Wraps User Management Service API URLs that authenticationUtils
 * uses to build their API calls.
 */

// Accessing the current host of this Web Platform
const loc = window.location,
  PORT = 4000;

/**
 * API endpoint to register a SERaaS user account in the 
 * User Management Service.
 */
function register() {
  return `${loc.protocol}//${loc.hostname}:${PORT}/authentication/register`;
};

/**
 * API endpoint to check if the given user credentials match 
 * a SERaaS user account in the User Management Service.
 */
function login() {
  return `${loc.protocol}//${loc.hostname}:${PORT}/authentication/login`;
};

/**
 * API endpoint to get a list of all of the recent API Calls'
 * timestamps made by the user from the User Management Service.
 */
function getAPICallTimestamps(userId) {
  return `${loc.protocol}//${loc.hostname}:${PORT}/authentication/data/${userId}`;
};

/**
 * API endpoint to get an individual API Call timestamp's metadata
 * made by the user from the User Management Service.
 */
function getAPICallTimestampData(userId, timestampId) {
  return `${loc.protocol}//${loc.hostname}:${PORT}/authentication/data/${userId}/${timestampId}`;
};

export default {
  register: register,
  login: login,
  getAPICallTimestamps: getAPICallTimestamps,
  getAPICallTimestampData: getAPICallTimestampData
};