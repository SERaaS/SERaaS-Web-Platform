const exampleCode = 

`import requests

url = "${window.location.protocol}//${window.location.hostname}/analyse/your-own-unique-user-ID-here"

payload = {}
files = [
  ('file', open('your-own-audio-file-local-url-here','rb'))
]
headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

response = requests.request("POST", url, headers=headers, data = payload, files = files)

print(response.text.encode('utf8'))
`;

export default exampleCode;