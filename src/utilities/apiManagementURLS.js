/**
 * Wraps the main SERaaS API Service URLs that APIUtils
 * uses to build their API calls.
 * 
 * This is used as the URLs will change during usage in development
 * and production.
 */

const PORT = 5000;

/**
 * API endpoint to output emotions from a given audio file.
 */
function query(userId, emotions, period) {
  let url = `http://localhost:${PORT}/analyse/${userId}/`;

  if (emotions.length > 0) {
    emotions.forEach(function(emotion, i) {
      if (i > 0) { url += "," };
      url += emotion;
    });
  } else {
    url += "all";
  };

  if (period !== null) {
    url += `/${period}`;
  };

  return url;
};

export default {
  query: query
};