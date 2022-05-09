const https = require('https');

exports.customRequest = (options) => {
  return new Promise((resolve, reject) => {
    https
      .get(options, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
          data += chunk;
        });

        resp.on('end', () => {
          resolve(data);
        });
      })
      .on('error', (err) => {
        console.log('Error: ' + err.message);
        reject(err.message);
      });
  });
}