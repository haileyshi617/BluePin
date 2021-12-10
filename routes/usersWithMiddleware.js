const express = require('express');

const Users = require('../models/Users');
const Trips = require('../models/Trips');
const Events = require('../models/Events');

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
  async (req, res) => {
    const user = await Users.addOne(req.body.username, req.body.password);
    req.session.username = req.body.username;
    req.session.userID = user._id;
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
  async (req, res) => {
    const user = await Users.findOneByName(req.body.username);
    req.session.username = req.body.username;
    req.session.userID = user._id;
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

router.delete('/', [validateThat.userIsLoggedIn], async (req, res) => {
  const userID = req.session.userID;

  // 1) revoke likes count for trips liked by the user
  const likesList = await Users.getUpvoteList(userID);
  Trips.downVoteMany(likesList);

  const joinList = await Users.getJoinedEventIDs(userID);
  Events.unJoinMany(joinList);

  // // 2) revoke refreet count for freets refreeted by the user
  // const refreetsList = Users.getRefreetList(userID);
  // Freets.unRefreetMany(userID, refreetsList);

  // 3) delete user from following/followers
  // await Users.deleteFollowStatusMany(userID); // 🔴 UPDATE AFTER USER UPDATED

  // // 4) delete user's freets(origin freets and related refreets)
  // Freets.deleteAuthorAll(userID);

  // 6) delete this user
  await Users.deleteOne(req.session.userID);

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
  async (req, res) => {
    const user = await Users.updateUsernameOne(
      req.session.userID,
      req.body.username
    );

    req.session.username = req.body.username;

    res
      .status(200)
      .json({
        username: `${user.user_name}`,
        message: `The username of your account has been updated to ${user.user_name}.`,
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
  async (req, res) => {
    const user = await Users.updatePasswordOne(
      req.session.userID,
      req.body.password
    );

    res
      .status(200)
      .json({
        message: `The password of your account ${
          user.user_name
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
router.get('/:userID?', async (req, res) => {
  const username = await Users.findNameByID(req.params.userID);
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
  async (req, res) => {
    const userID = await Users.findIDByName(req.params.username);
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
router.put('/following', [validateThat.userIsLoggedIn], async (req, res) => {
  const user = await Users.toggleFollow(req.session.userID, req.body.otherID);
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
router.get(
  '/following/:userID?',
  [validateThat.userIsLoggedIn],
  async (req, res) => {
    const following = await Users.findOneFollowing(req.params.userID);
    res.status(200).json(following).end();
  }
);

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
  async (req, res) => {
    res
      .status(200)
      .json(await Users.isFollowing(req.session.userID, req.params.userID))
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
router.get(
  '/followers/:userID?',
  [validateThat.userIsLoggedIn],
  async (req, res) => {
    const followers = await Users.findOneFollowers(req.params.userID);
    res.status(200).json(followers).end();
  }
);

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
router.put(
  '/upvote/:tripID?',
  [validateThat.userIsLoggedIn],
  async (req, res) => {
    const tripID = req.query.tripID;
    const user = await Users.findOneByID(req.session.userID);
    const userLikes = user.likes.length;

    const updatedUser = await Users.toggleUpvote(req.session.userID, tripID);
    const updatedUserLikes = updatedUser.likes.length;

    // ? Temporary solution, not pretty
    if (updatedUserLikes > userLikes) {
      await Trips.upvote(tripID);
    } else {
      await Trips.downvote(tripID);
    }
    res.status(200).json(tripID).end();
  }
);

/**
 * Get upvote status of a trip.
 *
 * @name GET /api/user/upvote/:tripID?
 *
 * @param {string} userID - The ID of the user
 * @param {string} tripID - the trip ID
 * @return {200} - successfully retrieved user status
 */
router.get('/upvote/:tripID?', async (req, res) => {
  res
    .status(200)
    .json(await Users.getUpvoteStatus(req.session.userID, req.query.tripID))
    .end();
});

/* --------------------------------- EVENTS --------------------------------- */

/**
 * Get all events the user joined
 *
 * @name GET /api/user/events
 *
 * @return {Events[]} - list of all posted trips
 * */
router.get('/join', async (req, res) => {
  const allEventsTitleByUser = await Users.getJoinedEvents(req.session.userID);
  res.status(200).json(allEventsTitleByUser);
});

/**
 * Toggle user's status of a event.
 *
 * @name PUT /api/user/events/:eventID?
 *
 * @param {string} userID - The ID of the user
 * @param {string} eventID - the event ID
 * @return {200} - successfully retrieved user status
 * @throws {401} - if the user is not logged in
 */
router.put('/join/:eventID?', [validateThat.userIsLoggedIn], async (req, res) => {
  const eventID = req.query.eventID;
  const eventTitle = req.body.eventTitle;
  const user = await Users.findOneByID(req.session.userID);
  const userEvents = user.events.length;

  const updatedUser = await Users.toggleEventStatus(req.session.userID, eventID, eventTitle);
  const updatedUserEvents = updatedUser.events.length;

  // ? Temporary solution, not pretty
  if (updatedUserEvents > userEvents) {
    await Events.join(eventID, req.session.userID);
  } else {
    await Events.unjoin(eventID, req.session.userID);
  }

  res
    .status(200)
    .json(eventID)
    .end();
});

/**
 * Get user's status of a event.
 *
 * @name GET /api/user/events/:eventID?
 *
 * @param {string} userID - The ID of the user
 * @param {string} eventID - the event ID
 * @return {200} - successfully retrieved user status
 */
router.get('/join/:eventID?', async (req, res) => {
  res
    .status(200)
    .json(await Users.getEventStatus(req.session.userID, req.query.eventID))
    .end();
});

module.exports = router;
