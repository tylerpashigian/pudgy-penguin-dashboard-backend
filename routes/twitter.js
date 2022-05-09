var express = require('express');
var dotenv = require('dotenv');

var { customRequest } = require('../utilities/functions');

dotenv.config();

var router = express.Router();
var pastFollowerCount = 0;

// TODO: Handle bad responses from Twitter API
router.get('/followers', async function (req, res, next) {
  const options = {
    hostname: 'api.twitter.com',
    path: '/2/users/by/username/pudgypenguins?user.fields=public_metrics',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.bearer_token}`,
    },
  };

  let profileData = await customRequest(options);
  let profileInfo = JSON.parse(profileData);

  let count = profileInfo.data.public_metrics.followers_count;
  let delta = count - pastFollowerCount;
  let change = ((delta / pastFollowerCount) * 100).toFixed(2);

  pastFollowerCount = count;

  res.json({ count: count, change: change });
});

module.exports = router;
