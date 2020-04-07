const exampleCode = 

`var request = require('request');
var fs = require('fs');
var options = {
  'method': 'POST',
  'url': 'http://TODO_ADD_URL_HERE/analyse/your-own-unique-user-ID-here',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  formData: {
    'file': {
      'value': fs.createReadStream('your-own-audio-file-url-here'),
      'options': {
        'filename': 'your-own-audio-file-url-here',
        'contentType': null
      }
    }
  }
};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  console.log(response.body);
});
`;

export default exampleCode;