const https = require('https');
const env = require('../config/env');

const verifyRecaptcha = (token) => {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      secret: env.RECAPTCHA_SECRET_KEY,
      response: token,
    });

    const options = {
      hostname: 'www.google.com',
      path: `/recaptcha/api/siteverify?${params.toString()}`,
      method: 'POST',
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch {
          reject(new Error('Failed to parse reCAPTCHA response'));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
};

module.exports = { verifyRecaptcha };
