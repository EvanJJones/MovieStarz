// Requiring our models and passport as we've configured it
const db = require('../models');
const passport = require('../config/passport');

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  // send it username and password
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    // res.json(req.user);
    res.redirect('/mainfeed');
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully,
  // proceed to log the user in, otherwise send back an error
  // send it username and password
  app.post('/api/signup', (req, res) => {
    db.User.create({
      username: req.body.username,
      password: req.body.password,
    })
      .then(() => {
        res.redirect(307, '/api/login');
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });
};
