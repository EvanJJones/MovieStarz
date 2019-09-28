const db = require('../models');

module.exports = function (app) {
  // Get all users
  app.get('/api/user', (req, res) => {
    res.json('test');
  });

  // get most recent posts, for main feed
  app.get('/api/review', (req, res) => {
    res.json('test');
  });

  // Create a new review
  app.post('/api/review', (req, res) => {
    res.json('test');
  });

  // update a review by id
  app.put('api/review/:id', (req, res) => {
    res.json('test');
  });

  // Delete a review by id
  app.delete('/api/review/:id', (req, res) => {
    res.json('test');
  });
};
