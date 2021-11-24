const express = require('express');

const Users = require('../models/Users');
const Trips = require('../models/Trips');

const validateThat = require('./middleware');

const router = express.Router();

/* ---------------------------------- AUTH ---------------------------------- */

/**
 * Create a user
 *
 * @name POST /api/user/
 *
 * @param {string} username - username
 * @param {string} password - password
 * @return {201} - successfully updated user
 * @throws {400} - if the user is already logged in
 * @throws {400} - if username or password is not filled
 * @throws {409} - if the username is already taken
 *  */
router.post(
  '/',
  [
    validateThat.usernameDoesNotAlreadyExist,
    validateThat.usernameIsValid,
    validateThat.passwordIsValid,
  ],
  (req, res) => {
    const user = Users.addOne(req.body.username, req.body.password);
    req.session.username = req.body.username;
    req.session.userID = user.userID;
    // hide password but show the length of it for user to double check
    res
      .status(201)
      .json({ username: req.session.username, userID: req.session.userID })
      .end();
  }
);

/**
 * Sign in a user
 *
 * @name POST/ api/user/session
 *
 * @param {string} username - username
 * @param {string} password - password
 * @return {201} - successfully updated user
 * @throws {403} - if the user is already logged in
 * @throws {400} - if username or password is not filled
 * @throws {404} - if the username is not found
 * @throws {401} - if the password does not match
 */
router.post(
  '/session',
  [
    validateThat.usernameIsValid,
    validateThat.passwordIsValid,
    validateThat.usernameExists,
    validateThat.passwordIsCorrect,
  ],
  (req, res) => {
    req.session.username = req.body.username;
    req.session.userID = Users.findOneByName(req.body.username).userID;
    res
      .status(201)
      .json({ username: req.session.username, userID: req.session.userID });
  }
);

/**
 * Sign out a user.
 *
 * @name DELETE /api/user/session
 *
 * @param {string} userID - userID in the session
 * @throws {403} - if the user is not logged in
 */
router.delete('/session', [validateThat.userIsLoggedIn], (req, res) => {
  req.session.username = undefined;
  req.session.userID = undefined;
  res.status(200).json({ message: 'You are signed out.' });
});

/**
 * Delete a user.
 *
 * @name DELETE /api/user/
 *
 * @param {string} userID - user ID in the session
 * @return {200} - successfully updated user
 * @throws {403} - if the user is not logged in
 */

router.delete('/', [validateThat.userIsLoggedIn], (req, res) => {
  const userID = req.session.userID;

  // 1) revoke likes count for trips liked by the user
  const likesList = Users.getUpvoteList(userID);
  Trips.downVoteMany(likesList);

  // // 2) revoke refreet count for freets refreeted by the user
  // const refreetsList = Users.getRefreetList(userID);
  // Freets.unRefreetMany(userID, refreetsList);

  // 3) delete user from following/followers
  Users.deleteFollowStatusMany(userID);

  // // 4) delete user's freets(origin freets and related refreets)
  // Freets.deleteAuthorAll(userID);

  // 6) delete this user
  Users.deleteOne(req.session.userID);

  // 7) sign out
  req.session.username = undefined;
  req.session.userID = undefined;
  res.status(200).json({
    message: 'The account is deleted and you are automatically logged out.',
  });
});

/* --------------------------------- UPDATE --------------------------------- */
/**
 * Change a user's name.
 *
 * @name PUT /api/user/username
 *
 * @param {string} userID - the ID of the old username to update
 * @param {string} currUsername - The new username to associate with the user
 * @return {200} - successfully updated user
 * @throws {403} - if the user is not logged in
 * @throws {400} - if username is not filled
 * @throws {409} - if the username is already taken
 */
router.put(
  '/username',
  [
    validateThat.userIsLoggedIn,
    validateThat.usernameDoesNotAlreadyExist,
    validateThat.usernameIsValid,
  ],
  (req, res) => {
    const user = Users.updateUsernameOne(req.session.userID, req.body.username);

    req.session.username = req.body.username;

    res
      .status(200)
      .json({
        username: `${user.username}`,
        message: `The username of your account has been updated to ${user.username}.`,
      })
      .end();
  }
);

/**
 * Change a user's password.
 *
 * @name PUT /api/user/password
 *
 * @param {string} userID - The ID of the user to update
 * @param {string} password - password
 * @return {200} - successfully updated user
 * @throws {401} - if the user is not logged in
 * @throws {400} - if password is not filled
 * @throws {409} - if the password is the same
 */
router.put(
  '/password',
  [
    validateThat.userIsLoggedIn,
    validateThat.passwordIsValid,
    validateThat.passwordIsNew,
  ],
  (req, res) => {
    const user = Users.updatePasswordOne(req.session.userID, req.body.password);

    res
      .status(200)
      .json({
        message: `The password of your account ${
          user.username
        } has been updated to ${'*'.repeat(user.password.length)}.`,
      })
      .end();
  }
);

/* --------------------------------- GETTER --------------------------------- */
/**
 * ?Get a username in the session
 *
 * @name GET /api/user/session
 *
 * @return {200} - user name in the session
 * @throws {401} - if the user is not already logged in
 */
router.get('/session', [validateThat.userIsLoggedIn], (req, res) => {
  res.status(200).json({ username: req.session.username });
});

/**
 * ?Get a userID in the session
 *
 * @name GET /api/userID/session
 *
 * @return {200} - user ID in the session
 * @throws {401} - if the user is not already logged in
 */
router.get('/session', [validateThat.userIsLoggedIn], (req, res) => {
  res.status(200).json({ userID: req.session.userID });
});

/**
 * Get a username with given userID
 *
 * @name GET /api/user/username/:userID?
 *
 * @return {200} - the found username
 * @throws {401} - if the user is not already logged in
 */
router.get('/:userID?', (req, res) => {
  const username = Users.findNameByID(req.params.userID);
  res.status(200).json(username);
});

/**
 * Get an userID with given username
 *
 * @name GET /api/user/userID/:username?
 *
 * @throws {401} - if the user is not already logged in
 */
router.get(
  '/userID/:username?',
  [validateThat.userIsLoggedIn, validateThat.creatorNameIsValid],
  (req, res) => {
    const userID = Users.findIDByName(req.params.username);
    res.status(200).json(userID);
  }
);

/* --------------------------------- FOLLOW --------------------------------- */
/**
 * Toggle if the user follows someone
 *
 * @name PUT /api/user/following
 *
 * @param {string} userID - The ID of the user to update
 * @param {string} otherID - The ID of the user to follow
 * @return {200} - successfully updated user
 * @throws {401} - if the user is not logged in
 */
router.put('/following', [validateThat.userIsLoggedIn], (req, res) => {
  const user = Users.toggleFollow(req.session.userID, req.body.otherID);
  res.status(200).json(user).end();
});

/**
 * Get user's following'
 *
 * @name GET /api/user/following
 *
 * @param {string} userID - The ID of the user
 * @return {200} - successfully updated user
 * @throws {401} - if the user is not logged in
 */
router.get('/following/:userID?', [validateThat.userIsLoggedIn], (req, res) => {
  const following = Users.findOneFollowing(req.params.userID);
  res.status(200).json(following).end();
});

/**
 * Get follow status of one user to another
 *
 * @name GET /api/user/followingStatus/:userID?
 *
 * @param {string} userID - The ID of the user
 * @return {200} - successfully updated user
 * @throws {401} - if the user is not logged in
 */
router.get(
  '/followingStatus/:userID?',
  [validateThat.userIsLoggedIn],
  (req, res) => {
    res
      .status(200)
      .json(Users.isFollowing(req.session.userID, req.params.userID))
      .end();
  }
);

/**
 * Get user's followers'
 *
 * @name GET /api/user/followers
 *
 * @param {string} userID - The ID of the user
 * @return {200} - successfully updated user
 * @throws {401} - if the user is not logged in
 */
router.get('/followers/:userID?', [validateThat.userIsLoggedIn], (req, res) => {
  const followers = Users.findOneFollowers(req.params.userID);
  res.status(200).json(followers).end();
});

/* --------------------------------- UPVOTE --------------------------------- */

/**
 * Toggle if the user upvotes/un-upvotes a freet
 *
 * @name PUT /api/user/upvote/:tripID?
 *
 * @param {string} userID - The ID of the user
 * @param {string} tripID - the trip ID
 * @return {200} - successfully updated user
 * @throws {401} - if the user is not logged in
 */
router.put('/upvote/:tripID?', [validateThat.userIsLoggedIn], (req, res) => {
  const tripID = req.query.tripID;
  const user = Users.findOneByID(req.session.userID);
  const userLikes = user.likes.size;

  const updatedUser = Users.toggleUpvote(req.session.userID, tripID);
  const updatedUserLikes = updatedUser.likes.size;

  // ? Temporary solution, not pretty
  if (updatedUserLikes > userLikes) {
    Trips.upvote(tripID);
  } else {
    Trips.downvote(tripID);
  }
  res.status(200).json(tripID).end();
});

/**
 * Get upvote status of a freet.
 *
 * @name GET /api/user/upvote/:tripID?
 *
 * @param {string} userID - The ID of the user
 * @param {string} tripID - the trip ID
 * @return {200} - successfully retrieved user status
 */
router.get('/upvote/:tripID?', (req, res) => {
  console.log(req.session.userID);
  res
    .status(200)
    .json(Users.getUpvoteStatus(req.session.userID, req.query.tripID))
    .end();
});

/* --------------------------------- REPOST --------------------------------- */
/* ------------------------------- NOT NEEDED ------------------------------- */

// /**
//  * Toggle if the user refreets/un-refreets a freet
//  *
//  * @name PUT /api/user/refreet/:id?
//  *
//  * @param {string} userID - The ID of the user
//  * @param {string} id - the freet ID
//  * @return {200} - successfully updated user
//  * @throws {401} - if the user is not logged in
//  * @throws {404} - if the freetID is not found
//  */
// router.put(
//   '/refreet/:id?',
//   [validateThat.userIsLoggedIn, validateThat.idIsValid],
//   (req, res) => {
//     const user = Users.findOneByID(req.session.userID);
//     const userRefreets = user.refreets.size;

//     const updatedUser = Users.toggleRefreet(req.session.userID, req.params.id);
//     const updatedUserRefreets = updatedUser.refreets.size;

//     if (updatedUserRefreets > userRefreets) {
//       Freets.refreet(req.session.userID, req.params.id);
//     } else {
//       Freets.unRefreet(req.session.userID, req.params.id);
//     }
//     res.status(200).json(updatedUser).end();
//   }
// );

// /**
//  * Get refreet status of a freet.
//  *
//  * @name GET /api/user/refreetStatus/:id?
//  *
//  * @param {string} userID - The ID of the user
//  * @param {string} id - the freet ID
//  * @return {200} - successfully retrieved user status
//  * @throws {401} - if the user is not logged in
//  * @throws {404} - if the freetID is not found
//  */
// router.get(
//   '/refreetStatus/:id?',
//   [validateThat.userIsLoggedIn, validateThat.idIsValid],
//   (req, res) => {
//     res
//       .status(200)
//       .json(Users.getRefreetStatus(req.session.userID, req.params.id))
//       .end();
//   }
// );

module.exports = router;
