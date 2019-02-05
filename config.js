require('dotenv').load()

const config = {
  facebook: {
    baseUrl: 'https://www.facebook.com',
    groups: [
      'https://www.facebook.com/groups/2259202384294436/'
    ],
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    postUrl: process.env.POST_URL,
    commentText: process.env.COMMENT_TEXT
  }
}

module.exports = {
  config
}
