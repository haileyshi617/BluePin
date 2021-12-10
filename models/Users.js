// let userData = [];
const User = require('../schema/User');
const bcrypt = require('bcryptjs');

/* -------------------------------------------------------------------------- */
/*                                  USER INFO                                 */
/* -------------------------------------------------------------------------- */

/**
 * Add a user to users list.
 *
 * @prop {string} username - username
 * @prop {string} password - password
 *
 * @prop {list} events -list of eventIDs that the user joined
 *
 * @return {User | false} - the newly created user
 */
async function addOne(username, password) {
  // Hash password
  const salt = bcrypt.genSaltSync(10);
  hash = bcrypt.hashSync(password, salt);

  // Insert entry to db
  const user = new User({
    user_name: username,
    password: hash,
    events: [], //TODO: NOT SURE IF THIS IS THE RIGHT WAY
  });
  try {
    await user.save();
    return user;
  } catch (err) {
    return false;
  }
}

/**
 * Update a user's name.
 *
 * @param {string} userID - the ID of the user to update
 * @param {string} newUsername - The new username to associate with the user
 * @return {User | false} - The updated user
 */
async function updateUsernameOne(userID, newUsername) {
  try {
    const user = await User.findOne({ _id: userID });
    user.user_name = newUsername;
    await user.save();
    return user;
  } catch (err) {
    return false;
  }
}

/**
 * Update a user's password.
 *
 * @param {string} userID - The ID of the user to update
 * @param {string} newPassword - The new password to associate with the user
 * @return {User | false} - The updated user
 */
async function updatePasswordOne(userID, newPassword) {
  try {
    const user = await User.findOne({ _id: userID });
    const salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(newPassword, salt);
    user.password = hash;
    await user.save();
    return user;
  } catch (err) {
    return false;
  }
}

/**
 * Delete a user from the collection.
 *
 * @param {string} userID - ID of User to delete
 * @return {User | false} - deleted User
 */
async function deleteOne(userID) {
  try {
    const user = await User.deleteOne({ _id: userID });
    return user;
  } catch (err) {
    return false;
  }
}

/* --------------------------------- GETTERS -------------------------------- */

/**
 * Find a user by name.
 *
 * @param {string} username - The name of the user to find
 * @return {User | false} - the found user with above name
 */
async function findOneByName(name) {
  try {
    const user = await User.findOne({ user_name: name });
    return user;
  } catch (err) {
    return false;
  }
}

/**
 * Find a user by ID.
 *
 * @param {string} userID - The ID of the user to find
 * @return {User | false} - the found user with above ID
 */
async function findOneByID(userID) {
  try {
    const user = await User.findOne({ _id: userID });
    return user;
  } catch (err) {
    return false;
  }
}

/**
 * Find a username based on given userID
 *
 * @param {string} userID - the ID of the user to update
 * @return {username | false} - username
 */
async function findNameByID(userID) {
  try {
    const user = await User.findOne({ _id: userID });
    return user.user_name;
  } catch (err) {
    return 'unknown';
  }
}

/**
 * Find a userID based on given username
 *
 * @param {string} username - the username of the user
 * @return {userID | false} - username
 */
async function findIDByName(username) {
  try {
    const user = await User.findOne({ user_name: username });
    return user._id;
  } catch (err) {
    return false;
  }
}

/* -------------------------------- CHECKERS -------------------------------- */

/**
 * Check if username matches password
 *
 * @param {string} username - username
 * @param {string} password - password
 * @return {true | false} - boolean result
 */
async function checkPassword(username, password) {
  try {
    const user = await User.findOne({ user_name: username });
    return bcrypt.compareSync(password, user.password);
    // const salt = await bcrypt.genSalt(10);
    // password = await bcrypt.hash(password, salt);
    // if (user.password === password){
    //   return true;
    // }
    // return false;
  } catch (err) {
    return false;
  }
}

/**
 * Checks if any user in the users collections has the given User ID
 *
 * @prop {string} userID - User ID
 * @return {Boolean} - true if some user with the id exists
 */
async function containsID(userID) {
  try {
    const user = await User.findOne({ _id: userID });
    return true;
  } catch (err) {
    return false;
  }
}

/* -------------------------------------------------------------------------- */
/*                                   UPVOTE                                   */
/* -------------------------------------------------------------------------- */

/**
 * Add or remove tripID to user's likes(Set)
 *
 * @param {string} userID - The ID of the user to update
 * @param {string} tripID - The tripID
 * @return {User | false} - The updated user
 */
async function toggleUpvote(userID, tripID) {
  try {
    const user = await User.findOne({ _id: userID });
    user.likes.includes(tripID)
      ? user.likes.splice(user.likes.indexOf(tripID), 1)
      : user.likes.push(tripID);
    await user.save();
    return user;
  } catch (err) {
    return false;
  }
}

/* --------------------------------- GETTERS -------------------------------- */

/**
 * Get user's upvote list
 *
 * @param {string} userID - The ID of the user
 * @return {array | false} - The list of tripIDs liked by this user
 */
async function getUpvoteList(userID) {
  try {
    const user = await User.findOne({ _id: userID });
    return user.likes;
  } catch (err) {
    return false;
  }
}

/**
 * Get user's upvote status of a trip
 *
 * @param {string} userID - The ID of the user
 * @param {string} tripID - The tripID
 * @return {true | false} - if the trip is liked by the user
 */
async function getUpvoteStatus(userID, tripID) {
  try {
    const user = await User.findOne({ _id: userID });
    return user.likes.includes(tripID);
  } catch (err) {
    return false;
  }
}

/* -------------------------------------------------------------------------- */
/*                                   EVENTS                                   */
/* -------------------------------------------------------------------------- */

/**
 * Toggle user's status of a event
 *
 * @param {string} userID - The ID of the user
 * @param {string} eventID - The eventID
 * @return {true | false} - if the eventID is joined by the user
 */
async function toggleEventStatus(userID, eventID, eventTitle) {
  // TODO: toggle user's event status
  // add if not joined, remove if joined
  try {
    const user = await User.findOne({ _id: userID });
    user.events.includes(eventID)
      ? user.events.splice(user.events.indexOf(eventID), 1)
      : user.events.push(eventID);
    user.eventsTitle.includes(eventTitle)
      ? user.eventsTitle.splice(user.eventsTitle.indexOf(eventTitle), 1)
      : user.eventsTitle.push(eventTitle);
    await user.save();
    return user;
  } catch (err) {
    return false;
  }
}

/**
 * Get user's status of a event
 *
 * @param {string} userID - The ID of the user
 * @param {string} eventID - The eventID
 * @return {true | false} - if the eventID is joined by the user
 */
async function getEventStatus(userID, eventID) {
  // TODO: get user's event status
  try {
    const user = await User.findOne({ _id: userID });
    return user.events.includes(eventID);
  } catch (err) {
    return false;
  }
}

/**
 * Get user's joined event titles
 *
 * @param {string} userID - The ID of the user
 * @return {eventIDList | false} - all the eventIDs joined by this user
 */
async function getJoinedEvents(userID) {
  try {
    const user = await User.findOne({ _id: userID });
    return user.eventsTitle;
  } catch (err) {
    return false;
  }
}

/**
 * Get user's joined eventIDs
 *
 * @param {string} userID - The ID of the user
 * @return {eventIDList | false} - all the eventIDs joined by this user
 */
 async function getJoinedEventIDs(userID) {
  try {
    const user = await User.findOne({ _id: userID });
    return user.events;
  } catch (err) {
    return false;
  }
}

module.exports = Object.freeze({
  addOne,
  updateUsernameOne,
  updatePasswordOne,
  deleteOne,
  findOneByName,
  findOneByID,
  findNameByID,
  findIDByName,
  checkPassword,
  containsID,
  toggleUpvote,
  getUpvoteList,
  getUpvoteStatus,
  toggleEventStatus,
  getEventStatus,
  getJoinedEvents,
  getJoinedEventIDs,
});
