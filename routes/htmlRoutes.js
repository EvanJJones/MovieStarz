const db = require('../models');

module.exports = function (app) {
  // Load index page
  app.get('/', (req, res) => {
    // If user has account send them one place otherwise redirect to login
    if (req.user) {
      res.redirect('/mainfeed');
    }
    res.redirect('/login');
  });

  // page for logging in
  app.get('/login', (req, res) => {
    res.render('login', {
      msg: 'Welcome!',
    });
  });

  // main page that has feed of most recent posts
  app.get('/mainfeed', (req, res) => {
    db.Review.findAll({
      where: {},
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [{ model: db.User, required: true }, { model: db.Title, required: true }],
    }).then((results) => {
      res.render('mainfeed', { reviews: results });
    });
  });

  // load a user page
  app.get('/user/:id', (req, res) => {
    db.Review.findAll({
      where: {
        userId: req.params.id,
      },
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [{ model: db.User, required: true }, { model: db.Title, required: true }],
    }).then((results) => {
      res.render('user', { reviews: results });
    });
  });

  // load the post review page
  app.get('/post', (req, res) => {
    res.render('post', {
      msg: 'Welcome!',
    });
  });

  // Route for logging user out
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });

  // Render 404 page for any unmatched routes
  app.get('*', (req, res) => {
    res.render('404');
  });
};
