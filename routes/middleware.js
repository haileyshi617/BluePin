const Trips = require('../models/Trips');
const Users = require('../models/Users');

/* -------------------------------------------------------------------------- */
/*                                    USER                                    */
/* -------------------------------------------------------------------------- */

/* ---------------------------------- AUTH ---------------------------------- */

// Check if the user is not logged in
const userIsNotLoggedIn = (req, res, next) => {
  if (req.session.username !== undefined) {
    res
      .status(400)
      .json({
        error: `You are already signed in.`,
      })
      .end();
    return;
  }
  next();
};

// Check if the user is logged in
const userIsLoggedIn = (req, res, next) => {
  if (req.session.userID === undefined) {
    res
      .status(403)
      .json({
        error: `You must be logged in first!`,
      })
      .end();
    return;
  }
  next();
};

/* ---------------------------------- NAME ---------------------------------- */

// Check if the given username exists
const usernameDoesNotAlreadyExist = (req, res, next) => {
  if (Users.findOneByName(req.body.username) !== undefined) {
    res
      .status(409)
      .json({
        error: `Username ${req.body.username} already exists.`,
      })
      .end();
    return;
  }
  next();
};

// Check if the username is above 1 char
const usernameIsValid = (req, res, next) => {
  if (req.body.username.length === 0) {
    res
      .status(400)
      .json({
        error: `The username must be at least 1 character.`,
      })
      .end();
    return;
  }
  next();
};

// Check if the target username exists
const usernameExists = (req, res, next) => {
  if (Users.findOneByName(req.body.username) === undefined) {
    res
      .status(404)
      .json({
        error: `Username ${req.body.username} does not exist.`,
      })
      .end();
    return;
  }
  next();
};

// check if the author username is empty
const creatorNameIsNotEmpty = (req, res, next) => {
  if (req.params.author === undefined) {
    res
      .status(400)
      .json({
        error: `You need to provide a author name.`,
      })
      .end();
    return;
  }
  next();
};

// Check if the creator name is valid
const creatorNameIsValid = (req, res, next) => {
  if (Users.findOne(req.params.username) === undefined) {
    res
      .status(404)
      .json({
        error: `Author ${req.params.username} does not exist.`,
      })
      .end();
    return;
  }
  next();
};

// Check if the creatorID is valid
const creatorIDIsValid = (req, res, next) => {
  const targetID = req.params.originCreatorID;
  if (!Users.containsID(targetID)) {
    res
      .status(400)
      .json({
        error: `CreatorID is not valid.`,
      })
      .end();
    return;
  }
  next();
};

/* -------------------------------- PASSWORD -------------------------------- */

// Check if the password is above 1 char
const passwordIsValid = (req, res, next) => {
  if (req.body.password.length === 0) {
    res
      .status(400)
      .json({
        error: `The password must be at least 1 character.`,
      })
      .end();
    return;
  }
  next();
};

// Check if the password is the same as the old one

const passwordIsNew = (req, res, next) => {
  if (Users.findOneByID(req.session.userID).password === req.body.password) {
    res
      .status(409)
      .json({
        error: `The new password must be different from the old one.`,
      })
      .end();
    return;
  }
  next();
};

// Check if the target password matches
const passwordIsCorrect = (req, res, next) => {
  if (!Users.checkPassword(req.body.username, req.body.password)) {
    res
      .status(403)
      .json({
        error: `Incorrect password.`,
      })
      .end();
    return;
  }
  next();
};

/* -------------------------------------------------------------------------- */
/*                                    TRIPS                                   */
/* -------------------------------------------------------------------------- */

// Check if the title is filled
const postTitleIsFilled = (req, res, next) => {
  if (!req.body.title) {
    res
      .status(400)
      .json({
        error: `Post title must be at the size of 1 - 30 characters.`,
      })
      .end();
    return;
  }
  next();
};

// Check if the title is below 30
const postTitleIsValid = (req, res, next) => {
  if (req.body.title.length > 30) {
    res
      .status(400)
      .json({
        error: `Post title must be at the size of 1 - 30 characters.`,
      })
      .end();
    return;
  }
  next();
};

// Check if the content is filled
const postContentIsFilled = (req, res, next) => {
  if (!req.body.content) {
    res
      .status(400)
      .json({
        error: `Post content must be at the size of 1 - 300 characters.`,
      })
      .end();
    return;
  }
  next();
};

// Check if the content is below 300
const postContentIsValid = (req, res, next) => {
  if (req.body.content.length > 300) {
    res
      .status(400)
      .json({
        error: `Post content must be at the size of 1 - 300 characters.`,
      })
      .end();
    return;
  }
  next();
};

// Check if the tripID is valid
const tripIDIsValid = (req, res, next) => {
  const targetID = req.query.tripID;
  if (!Trips.containsID(targetID)) {
    res
      .status(400)
      .json({
        error: `TripID is not valid.`,
      })
      .end();
    return;
  }
  next();
};

module.exports = Object.freeze({
  userIsNotLoggedIn,
  userIsLoggedIn,

  usernameIsValid,
  usernameDoesNotAlreadyExist,
  usernameExists,

  creatorNameIsNotEmpty,
  creatorNameIsValid,
  creatorIDIsValid,

  passwordIsValid,
  passwordIsNew,
  passwordIsCorrect,

  postTitleIsFilled,
  postTitleIsValid,
  postContentIsFilled,
  postContentIsValid,
  tripIDIsValid,
});
