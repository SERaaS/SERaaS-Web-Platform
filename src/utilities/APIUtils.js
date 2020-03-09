/**
 * Wraps all API endpoint calls from the Web Platform for more modular
 * implementation.
 * 
 * For defining new API endpoints, they can be exported here and then
 * used from the appropriate component, whereever required.
 */

// Axios documentation:
// https://www.npmjs.com/package/axios
const axios = require('axios');
const userManagementURLs = require('./userManagementURLS');

/**
 * API endpoint to register a SERaaS user account in the 
 * User Management Service.
 */
function register(username, password) {
  return axios.post(userManagementURLs.register(), { username, password });
};

/**
 * API endpoint to check if the given user credentials match 
 * a SERaaS user account in the User Management Service.
 */
function login() {
  return axios.post(userManagementURLs.login(), { username, password });
};

export default {
  register: register,
  login: login
};