const express = require('express');

const Trips = require('../models/Trips');
const validateThat = require('./middleware');

const router = express.Router();

/* --------------------------------- GETTERS -------------------------------- */

/**
 * Get all POSTED trips
 *
 * @name GET /api/trips
 *
 * @return {Trip[]} - list of all posted trips
 * */
router.get('/', async (req, res) => {
  const allTrips = await Trips.findAll();
  const allPosts = Trips.filterAllPosted(allTrips);
  res.status(200).json(allPosts).end();
});

/**
 * Get all trips (POSTED & UN-POSTED)
 *
 * @name GET /api/trips/load
 *
 * @return {Trip[]} - list of posted and un-posted trips
 * */
router.get('/load', async (req, res) => {
  const allTrips = await Trips.findAll();
  res.status(200).json(allTrips).end();
});

/**
 * Get all POSTED trips by one
 *
 * @name GET /api/trips/:author?
 * @param {string} author - author ID to filter by (query parameter, required)
 *
 * @return {Trip[]} - list of posted trips with given author
 * */
router.get('/:author?', async (req, res) => {
  const allTripsByOne = await Trips.findAuthorAll(req.query.author);
  const allPostsByOne = Trips.filterAllPosted(allTripsByOne);
  res.status(200).json(allPostsByOne).end();
});

/**s
 * Get all trips by one (POSTED & UN-POSTED)
 *
 * @name GET /api/trips/load/:author?
 * @param {string} authorID - author ID to filter by (query parameter, required)
 *
 * @return {Trip[]} - list of posted and un-posted trips with given author
 * */
router.get('/load/:author?', async (req, res) => {
  const allTripsByOne = await Trips.findAuthorAll(req.query.author);
  res.status(200).json(allTripsByOne).end();
});

/* ---------------------------------- POST ---------------------------------- */

/**
 * Load a trip data (must signed in first)
 * Generate dummy data for now
 *
 * @name POST /api/trips/load
 *
 * @param {string} originCreatorID - authorID (req.session.userID)
 * @return {trip} - the loaded (generated) trip
 * @throws {401} - if the user is not logged in
 * @throws {400} - if content is not filled
 * */
router.post('/load', [validateThat.userIsLoggedIn], async (req, res) => {
  const trip = await Trips.loadOne(req.session.userID);
  res.status(201).json(trip).end();
});

/**
 * Load a event data (must signed in first)
 * Generate dummy data for now
 *
 * @name POST /api/trips/load
 *
 * @param {string} originCreatorID - authorID (req.session.userID)
 * @return {trip} - the loaded (generated) trip
 * @throws {401} - if the user is not logged in
 * @throws {400} - if content is not filled
 * */
 router.post('/loadEvent', [validateThat.userIsLoggedIn], async (req, res) => {
  const trip = await Trips.loadEventOne(req.session.userID, req.body.eventTitle);
  res.status(201).json(trip).end();
});

/**
 * Post a trip (must signed in first)
 *
 * @name POST /api/trip/:id?
 *
 * @param {string} postTripID - postTripID (query parameter, required)
 * @param {string} title - title of trip (1-30)
 * @param {string} content - content of trip (1-300)
 * @return {trip} - the posted trip
 * @throws {401} - if the user is not logged in
 * @throws {400} - if title or content fails to meet the requirements
 * */
router.post(
  '/:id?',
  [
    validateThat.userIsLoggedIn,
    validateThat.postTitleIsFilled,
    validateThat.postTitleIsValid,
    validateThat.postContentIsFilled,
    validateThat.postContentIsValid,
  ],
  async (req, res) => {
    const trip = await Trips.postOne(
      req.query.tripID,
      req.body.title,
      req.body.content
    );
    res.status(201).json(trip).end();
  }
);

/* ---------------------------------- EDIT ---------------------------------- */
/**
 * * Edit a trip [NOT NEEDED FOR NOW]
 *
 * @name PUT /api/trips/:id?
 *
 * @param {string} tripID - tripID
 * @param {string} content - content of trip post
 * @return {200} - the updated trip post
 * @throws {401} - if the user is not logged in
 * @throws {404} - if the trip with that ID is not found
 * @throws {400} - if content does not meet the requirements
 */

// router.put(
//   '/:id?',
//   [
//     validateThat.userIsLoggedIn,
//     validateThat.tripIDIsValid,
//     validateThat.postContentIsValid,
//   ],
//   (req, res) => {
//     res
//       .status(200)
//       .json(
//         Trips.updateOne(req.params.tripID, req.body.content, req.session.userID)
//       )
//       .end();
//   }
// );

/* --------------------------------- DELETE --------------------------------- */

/**
 * Un-post a trip (must login).
 *
 * @name PUT /api/trips/:tripID?
 *
 * @param {string} tripID - tripID
 * @return {200} - the trip has been un-posted
 * @throws {401} - if the user is not logged in
 * @throws {404} - if the trip post is not found
 */
router.put(
  '/:id?',
  // [validateThat.userIsLoggedIn, validateThat.tripIDIsValid],
  async (req, res) => {
    const trip = await Trips.unPostOne(req.query.tripID);
    res.status(200).json(trip).end();
  }
);

/**
 * Delete a trip (must login).
 *
 * @name DELETE /api/trips/:id?
 *
 * @param {string} tripID - tripID
 * @return {200} - the trip has been un-posted
 * @throws {401} - if the user is not logged in
 * @throws {404} - if the trip post is not found
 */
router.delete(
  '/:id?',
  // [validateThat.userIsLoggedIn, validateThat.tripIDIsValid],
  async (req, res) => {
    await Trips.unPostOne(req.query.tripID);
    const tripToDelete = await Trips.deleteOne(req.query.tripID);
    res.status(200).json(tripToDelete).end();
  }
);

/* --------------------------------- UPVOTE --------------------------------- */

/**
 * Get upvotes of a trip post.
 *
 * @name GET /api/trips/upvotes/:id?
 *
 * @param {string} tripID - tripID
 * @return {200} - successfully retrieved trip upvote count
 * @throws {404} - if the trip with that ID is not found
 */
router.get('/upvotes/:id?', [validateThat.tripIDIsValid], async (req, res) => {
  const likeCounter = await Trips.getUpvoteCount(req.params.tripID);
  res.status(200).json(likeCounter).end();
});

/* --------------------------------- RE-POST -------------------------------- */

/**
 * * Get repost count of a freet [NOT NEEDED]
 *
 * @name GET /api/trips/repost/:id?
 *
 * @param {string} id - tripID (req.body.id)
 * @return {200} - successfully retrieved freet repost count
 * @throws {401} - if the user is not logged in
 * @throws {404} - if the freetID is not found
 */

// router.get('/repost/:id?', [validateThat.userIsLoggedIn], (req, res) => {
//   res.status(200).json(Trips.getRefreetCount(req.params.id)).end();
// });

module.exports = router;
