require("dotenv").config();

const {TwitterApi} = require('twitter-api-v2');

const client = new TwitterApi({
    appKey: process.env.TT_APP_KEY,
    appSecret: process.env.TT_APP_SEC,
    accessToken: process.env.TT_ACC_TOK,
    accessSecret: process.env.TT_ACC_SEC,
});

const rwClient = client.readWrite

module.exports = rwClient;