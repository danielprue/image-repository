var express = require('express');
var router = express.Router();

// send username/password, add new user to database and return the object
router.post('/api/register', (req, res, next) => {
  res.send('API is working!');
});

// send username/password, match against table data, then login if valid/error if invalid
router.post('/api/login', (req, res, next) => {
  res.send('');
});

// returns list of photo ids from specified user
router.get('/api/users/:userid/photos', (req, res, next) => {
  res.send('');
});

// deletes a user and all photos uploaded by them
router.delete('/api/users/:userid', (req, res, next) => {
  res.send('');
});

module.exports = router;
