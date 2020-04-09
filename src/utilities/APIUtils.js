/**
 * Wraps all API endpoint calls from the Web Platform for more modular
 * implementation.
 * 
 * For defining new API endpoints, they can be exported here and then
 * used from the appropriate component, whereever required.
 */

// Axios documentation:
// https://www.npmjs.com/package/axios
import axios from 'axios';

// Wrapper for main API and User Management Service endpoint URLs
import apiManagementURLS from './apiManagementURLS';
import userManagementURLS from './userManagementURLS';

/**
 * API endpoint to output emotions from a given audio file.
 */
function query(audioFile, userId, emotions, period) {
  return axios.post(apiManagementURLS.query(userId, emotions, period), audioFile, { headers: { 'Content-Type': 'multipart/form-data' } });
};

/**
 * API endpoint to register a SERaaS user account in the 
 * User Management Service.
 */
function register(username, password) {
  return axios.post(userManagementURLS.register(), { username, password });
};

/**
 * API endpoint to check if the given user credentials match 
 * a SERaaS user account in the User Management Service.
 */
function login(username, password) {
  return axios.post(userManagementURLS.login(), { username, password });
};

/**
 * API endpoint to get a list of all of the recent API Calls'
 * timestamps made by the user in the User Management Service.
 */
function getAPICallTimestamps(userId) {
  return axios.get(userManagementURLS.getAPICallTimestamps(userId));
};

export default {
  query: query,
  register: register,
  login: login,
  getAPICallTimestamps: getAPICallTimestamps
};