const Event = require('../schema/Event');
// const User = require('../schema/User');

// // Need ability to generate random IDs (primary/foreign keys)
// const uuid = require('uuid');

// /**
//    * @typedef Events
//    *
//    * @prop {string} eventID - eventID
//    * @prop {string} originCreatorID - initiator of the event (init as null for now)
//    * @prop {list} participants - userID of participants
//    * @prop {string} title - title
//    * @prop {string} content - content description of the event
//    * 
//    * @prop {string} startDate - the starting date of the event
//    * @prop {string} endDate - the ending date of the event
  
//    * @prop {boolean} isRecruiting - if the event is allowing new joint user
//    */

// class Events {
//   /**
//    * Add a user to the event.
//    *
//    * @return {Event} - the newly created Event
//    */

//   static addOneUser(creatorID = null) {
//     //TODO:
//   }

//   /* --------------------------------- GETTERS -------------------------------- */
//   /**
//    * Find all events.
//    *
//    * @return {Events[]} - all events
//    */
//   static findAll() {
//     //TODO:
//   }

//   /**
//    * Find all joined events for one user.
//    *
//    * @return {Events[]} - all events joined by the user
//    */
//   static findUserAll() {
//     //TODO:
//   }

//   /**
//    * Find if the user has joined the event.
//    *
//    * @return {Event} - the newly created Event
//    */
//   static isJoined(userId) {
//     //TODO:
//   }
// }

/* -------------------------------------------------------------------------- */
/*                                   GETTERS                                  */
/* -------------------------------------------------------------------------- */

/* --------------------------------- FINDERS -------------------------------- */
/**
 * Find all existing events
 *
 * @return {Event[]} an array of all of the events
 */
 async function findAll() {
  try {
    const events = await Event.find();
    return events;
  } catch (err) {
    return false;
  }
}

/**
 * * Find a list of events by userID
 *
 * @param {list} userID
 * @return {eventList | false} - the found events list
 */
 async function findUserAll(userID) {
  try {
    const events = await Event.find({
      $expr: {
        $in: [userID, "$participants"]
      }
    });
    return events;
  } catch (err) {
    return false;
  }
  // try {
  //   const events = await Event.find();
  //   return events;
  // } catch (err) {
  //   return false;
  // }
}

/**
 * * Find a list of events by eventIDList
 *
 * @param {list} eventIDList - the IDs of the trips to find
 * @return {eventList | false} - the found trips list
 */
 async function findEventByList(eventIDList) {
  try {
    const events = [];
    if (eventIDList.length !== 0) {
      eventIDList.forEach(async(eventID) => {
        let event = await Event.findOne({ _id: eventID });
        events.push(event);
    });
  }
    return events;
  } catch (err) {
    return false;
  }
}

/**
 * Find a title based on given eventID
 *
 * @param {string} eventID - the ID of the event
 * @return {title | false} - title
 */
 async function findTitleByID(eventID) {
  try {
    const event = await User.findOne({ _id: eventID });
    return event.title;
  } catch (err) {
    return false;
  }
}

/* -------------------------------- CHECKERS -------------------------------- */
/**
 * Checks if any user in the users collections has the given event ID
 *
 * @prop {string} userID - User ID
 * @return {Boolean} - true if some user with the id exists
 */
 async function containsID(eventID) {
  try {
    await Event.findOne({ _id: eventID });
    return true;
  } catch (err) {
    return false;
  }
}

/* -------------------------------------------------------------------------- */
/*                                   JOIN                                   */
/* -------------------------------------------------------------------------- */
/**
 * Join this event
 *
 * @param {string} eventID - the ID of the event
 * @return {event} - the updated event
 */
 async function join(eventID, userID) {
  try {
    const event = await Event.findOne({ _id: eventID });
    event.joinCounter += 1;
    event.participants.push(userID);
    await event.save();
    return event;
  } catch (err) {
    return false;
  }
}

/**
 * Un-join this event
 *
 * @param {string} eventID - the ID of the event
 * @return {event} - the updated event
 */
 async function unjoin(eventID, userID) {
  try {
    const event = await Event.findOne({ _id: eventID });
    event.joinCounter -= 1;
    event.participants.splice(event.participants.indexOf(userID), 1);
    await event.save();
    return event;
  } catch (err) {
    return false;
  }
}

/**
 * Un-join many events (caused by deleting user account)
 *
 * @param {list} eventIDList - the list of eventIDs to unjoin
 */
async function unJoinMany(eventIDList, userID) {
  try {
    if (eventIDList.length === 0) return true;

    eventIDList.forEach(async (eventID) => {
      let event = await Event.findOne({ _id: eventID });
      event.joinCounter -= 1;
      event.participants.splice(event.participants.indexOf(userID), 1);
      await event.save();
    });
    return true;
  } catch (err) {
    return false;
  }
}

/* --------------------------------- GETTER --------------------------------- */
/**
 * Get upvote count of trip post
 *
 * @param {string} eventID - the ID of the trip
 * @return {int} - the number of upvotes
 */
 async function getEventCount(eventID) {
  try {
    const event = await Event.findOne({ _id: eventID });
    return event.joinCounter;
  } catch (err) {
    return false;
  }
}



module.exports = Object.freeze({
  findAll,
  findUserAll,
  findEventByList,
  findTitleByID,
  containsID,
  join,
  unjoin,
  unJoinMany,
  getEventCount,
});