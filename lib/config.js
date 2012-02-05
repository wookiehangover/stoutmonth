module.exports = {

  hostname: process.env.FB_URL || 'http://batman.local:3000',

  mongo_url: process.env.MONGOLAB_URI || 'mongodb://localhost/testtest',

  fb: {
    id: process.env.FB_ID,
    secret: process.env.FB_SECRET
  },

  github: {
    id: process.env.GH_ID,
    secret: process.env.GH_SECRET
  }

};
