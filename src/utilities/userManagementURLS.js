/**
 * Wraps User Management Service API URLs that authenticationUtils
 * uses to build their API calls.
 * 
 * This is used as the URLs will change during usage in development
 * and production.
 */

const PORT = 4000;

/**
 * API endpoint to register a SERaaS user account in the 
 * User Management Service.
 */
function register() {
  return `http://localhost:${PORT}/authentication/register`
};

/**
 * API endpoint to check if the given user credentials match 
 * a SERaaS user account in the User Management Service.
 */
function login() {
  return `http://localhost:${PORT}/authentication/login`
};

export default {
  register: register,
  login: login
};