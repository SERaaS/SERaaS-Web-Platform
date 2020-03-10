/**
 * Simplifies management of cache storage and retrieval.
 */

/**
 * Retrieving existing JSON data from cache based on the given
 * key.
 * 
 * This function will automatically destringify JSON data from
 * cache.
 */
function retrieve(key) {

};

/**
 * Stores the given JSON data from cache associated with the given
 * key.
 * 
 * This function will automatically stringify JSON data.
 */
function store(key, value) {

};

export default {
  retrieve: retrieve,
  store: store
};