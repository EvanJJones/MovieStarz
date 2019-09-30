const db = require('../models');

const isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = function (app) {
  // Route for getting some data about our user to be used client side
  app.get('/api/user_data', (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        username: req.user.username,
        id: req.user.id,
      });
    }
  });

  // Get all users and their posts
  app.get('/api/user', (req, res) => {
    db.User.findAll({
      where: {},
      attributes: ['username'],
      include: [db.Review],
    }).then((results) => {
      res.json(results);
    });
  });

  app.get('/api/user/:id', (req, res) => {
    db.Review.findAll({
      where: {
        UserId: req.params.id,
      },
      limit: 10,
      include: [{ model: db.User, required: true }, { model: db.Title, required: true }],
    }).then((results) => {
      res.json(results);
    });
  });

  // get most recent posts, for main feed
  app.get('/api/review', (req, res) => {
    db.Review.findAll({
      where: {},
      limit: 10,
      include: [{ model: db.User, required: true }, { model: db.Title, required: true }],
    }).then((results) => {
      res.json(results);
    });
  });

  // Create a new review
  // send it review_body, rating, userId, titleId
  app.post('/api/new_review', isAuthenticated, (req, res) => {
    db.Review.create(req.body).then((dbPost) => {
      res.json(dbPost);
    });
  });

  // update a review by id
  app.put('/api/review/:id', isAuthenticated, (req, res) => {
    db.Review.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then((dbPost) => {
      res.json(dbPost);
    });
  });

  // Delete a review by id
  app.delete('/api/review/:id', isAuthenticated, (req, res) => {
    db.Review.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbPost) => {
      res.json(dbPost);
    });
  });

  // creates a new title
  // send it only name
  app.post('/api/new_title', isAuthenticated, (req, res) => {
    db.Title.create(req.body).then((dbPost) => {
      res.json(dbPost);
    });
  });
};
