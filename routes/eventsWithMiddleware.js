const express = require('express');

const Users = require('../models/Users');
const Trips = require('../models/Trips');
const Events = require('../models/Events');

const validateThat = require('./middleware');

const router = express.Router();

/**
 * Get all events
 *
 * @name GET /api/events
 *
 * @return {Events[]} - list of all posted trips
 * */
router.get('/', async (req, res) => {
  const allEvents = await Events.findAll();
  res.status(200).json(allEvents).end();
});

// /**
//  * Get a event title with given eventID
//  *
//  * @name GET /api/events/title/:eventID?
//  *
//  * @return {200} - the found username
//  * @throws {401} - if the user is not already logged in
//  */
// router.get('/:eventID?', async (req, res) => {
//   const eventName = await Events.findTitleByID(req.params.userID);
//   res.status(200).json(eventName);
// });

/**
 * Get all events with given userID
 *
 * @name GET /api/events/title/:eventID?
 *
 * @return {200} - the found username
 * @throws {401} - if the user is not already logged in
 */
router.get('/title', async (req, res) => {
  const events = await Events.findUserAll(req.session.userID);
  res.status(200).json(events).end();
});

/* --------------------------------- JOIN --------------------------------- */

/**
 * Get join of a event post.
 *
 * @name GET /api/events/join/:id?
 *
 * @param {string} eventID - eventID
 * @return {200} - successfully retrieved trip upvote count
 * @throws {404} - if the trip with that ID is not found
 */
 router.get('/join/:id?', [validateThat.eventIDIsValid], async (req, res) => {
  const joinCounter = await Events.getJoinCount(req.params.eventID);
  res.status(200).json(joinCounter).end();
});

module.exports = router;