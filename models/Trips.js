// let tripsData = [];
const Trip = require('../schema/Trip');
const User = require('../schema/User');

//TODO: Get stations by real data
let stations = ['MIT', 'Harvard', 'Central'];

/* -------------------------------------------------------------------------- */
/*                                  TRIP INFO                                 */
/* -------------------------------------------------------------------------- */

/**
 * Load a trip to the database.
 *
 * @prop {string} creatorID - user ID of freet author
 * @return {Trip} - the newly created Trip
 */

async function loadOne(creatorID) {
  // Generating dummy trip data
  function randomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }
  const date = randomDate(new Date(2021, 0, 1), new Date());
  const start = stations[Math.floor(Math.random() * stations.length)];
  const end = stations[Math.floor(Math.random() * stations.length)];
  const distance = Math.random() * 10;

  try {
    const trip = new Trip({
      date: date,
      start: start,
      end: end,
      distance: distance,
      originCreatorID: creatorID,
    });
    if (creatorID !== undefined) {
      //adding related user id to document if author isn't undefined
      const user = await User.findOne({ _id: creatorID });
      if (user) {
        const user_id = user._id;
        trip.originCreatorID = user_id;
      }
    }
    await trip.save();
    return trip;
  } catch (err) {
    return false;
  }
}

/**
 * Load a trip to the database.
 *
 * @prop {string} creatorID - user ID of freet author
 * @return {Trip} - the newly created Trip
 */

 async function loadEventOne(creatorID, eventTitle) {
  // Generating dummy trip data
  function randomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }
  const date = randomDate(new Date(2021, 0, 1), new Date());
  const start = stations[Math.floor(Math.random() * stations.length)];
  const end = stations[Math.floor(Math.random() * stations.length)];
  const distance = Math.random() * 10;
  const type = "Events: " + eventTitle;

  try {
    const trip = new Trip({
      date: date,
      start: start,
      end: end,
      distance: distance,
      type: type,
      originCreatorID: creatorID,
    });
    if (creatorID !== undefined) {
      //adding related user id to document if author isn't undefined
      const user = await User.findOne({ _id: creatorID });
      if (user) {
        const user_id = user._id;
        trip.originCreatorID = user_id;
      }
    }
    await trip.save();
    return trip;
  } catch (err) {
    return false;
  }
}

/**
 * Post a trip.
 *
 * @prop {string} content - some string of the trip content
 * @prop {string} postTripID - the tripID
 * @return {Trip} - the updated posted Trip
 */
async function postOne(postTripID, title, content) {
  try {
    const trip = await Trip.findOne({ _id: postTripID });
    trip.title = title;
    trip.content = content;
    trip.isPosted = true;
    await trip.save();
    return trip;
  } catch (err) {
    return false;
  }
}

/* --------------------------------- MODIFY --------------------------------- */
/**
 * * Update a trip [NOT NEEDED FOR NOW]
 *
 * @param {string} tripID - The trip id
 * @param {string} content - The new trip post content
 * @return {Trip | {}} - the updated trip
 */
// static updateOne(tripID, content) {
//   const trip = Trips.findTripByID(tripID);
//   trip.content = content;
//   return trip;
// }

/* --------------------------------- DELETE --------------------------------- */

/**
 * Un-Post a Trip from the collection by ID.
 *
 * @param {string} tripID - The ID of the trip to un-post
 * @return {Trip} - the un-posted trip
 */
async function unPostOne(tripID) {
  try {
    const trip = await Trip.findOne({ _id: tripID }); //We make sure that names are unique, so this will give us the short we want
    trip.isPosted = false;
    await trip.save();
    return trip;
  } catch (err) {
    return false;
  }
}

/**
 * Delete a Trip from the collection by ID.
 *
 * @param {string} tripID - The ID of the trip to un-post
 * @return {Trip} - the deleted trip
 */
async function deleteOne(tripID) {
  try {
    const trip = await Trip.deleteOne({ _id: tripID });
    return trip;
  } catch (err) {
    return false;
  }
}

/**
 * Delete an author's trips from the trip collection. (For account deletion)
 *
 * @param {string} creatorID - The ID of the author
 * @return {Trip[]} - an array of updated trips collection
 */
async function deleteAuthorAll(creatorID) {
  try {
    await Trip.deleteMany({ originCreatorID: creatorID });
    const trips = await Trip.find();
    // //perform a join on the Trip and User collections: Trip.originCreatorID corresponds to User._id
    // const trips = await Trip.aggregate([
    //   {$lookup:
    //     {
    //       from: 'users',
    //       localField: 'originCreatorID',
    //       foreignField: '_id',
    //       as: 'tripwithusers' //create a new field 'tripwithusers' in this aggregated collection: embeds documents from lookup collection into Trip collection
    //     }
    //   }
    // ]);
    return trips;
  } catch (err) {
    return false;
  }
}

/* -------------------------------------------------------------------------- */
/*                                   GETTERS                                  */
/* -------------------------------------------------------------------------- */

/* --------------------------------- FINDERS -------------------------------- */
/**
 * Find all existing trips (posted AND un-posted)
 *
 * @return {Trip[]} an array of all of the trips
 */
async function findAll() {
  try {
    // //perform a join on the Trip and User collections: Trip.originCreatorID corresponds to User._id
    // const trips = await Trip.aggregate([
    //   {$lookup:
    //     {
    //       from: 'users',
    //       localField: 'originCreatorID',
    //       foreignField: '_id',
    //       as: 'tripwithusers' //create a new field 'tripwithusers' in this aggregated collection: embeds documents from lookup collection into Trip collection
    //     }
    //   }
    // ]);
    const trips = await Trip.find();
    return trips.reverse();
  } catch (err) {
    return false;
  }
}

/**
 * Find all posted trips in a given list
 *
 * @param {list} - the trip list to filter
 * @return {Trip[]} an array of all of the trips
 */
function filterAllPosted(tripsToFilter) {
  return tripsToFilter.filter((trip) => trip.isPosted === true); // 🔴 UPDATE TO DIRECT DB QUERY LATER
}

/**
 * Find all existing trips of one user (posted AND un-posted)
 *
 * @param {string} creatorID - The creatorID of the trips to find
 * @return {Trips[] | {}} - the found trips
 */
async function findAuthorAll(creatorID) {
  try {
    // //perform a join on the Trip and User collections: Trip.originCreatorID corresponds to User._id
    // const trips = await Trip.aggregate([
    //   {$lookup:
    //     {
    //       from: 'users',
    //       localField: 'originCreatorID',
    //       foreignField: '_id',
    //       as: 'tripwithusers' //create a new field 'tripwithusers' in this aggregated collection: embeds documents from lookup collection into Trip collection
    //     }
    //   }
    // ]).
    // match({ originCreatorID: creatorID });
    const trips = await Trip.find({ originCreatorID: creatorID });
    return trips.reverse();
  } catch (err) {
    return false;
  }
}

/**
 * Find a trip by trip ID
 *
 * @param {string} tripID - the ID of the trip
 * @return {Trip | undefined} - the found trip
 */
async function findOneByID(tripID) {
  try {
    const trip = await Trip.findOne({ _id: tripID }); //We make sure that names are unique, so this will give us the short we want
    return trip;
  } catch (err) {
    return false;
  }
}

/**
 * * Find a trip by original trip ID [NOT NEEDED]
 *
 * @param {string} originTripID - the ID of the trip
 * @return {Trip | undefined} - the found trip
 */
// static findTripByOriginalID(userID, originTripID) {
//   return tripsData.filter(
//     (trip) =>
//       trip.originTripID == originTripID && trip.creatorID == userID
//   )[0];
// }

/**
 * * Find a list of freet by tripIDList [NOT NEEDED]
 *
 * @param {list} tripIDList - the IDs of the trips to find
 * @return {tripList | undefined} - the found trips list
 */
// static findTripByList(tripIDList) {
//   const tripList = [];
//   if (tripIDList.length !== 0) {
//     tripIDList.forEach((tripID) => {
//       tripList.push(Trips.findTripByID(tripID));
//     });
//   }
//   return tripList;
// }

/* -------------------------------- CHECKERS -------------------------------- */
/**
 * Checks if any user in the users collections has the given User ID
 *
 * @prop {string} userID - User ID
 * @return {Boolean} - true if some user with the id exists
 */
async function containsID(tripID) {
  try {
    await Trip.findOne({ _id: tripID });
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * * Check if user is author of this trip [NOT NEEDED]
 *
 * @param {string} authorID - The ID of the user
 * @param {string} tripID - the ID of the trip
 * @return {boolean} - if user is author of freet
 */
// static isAuthor(authorID, freetID) {
//   const trip = Trips.findTripByID(freetID);
//   return trip.creatorID === authorID;
// }

/**
 * * Check if this trip post is editable [NOT NEEDED]
 * only original, NOT re-posted can be edited
 *
 * @param {string} tripID - the ID of the trip
 * @return {boolean} - if the post can be edited
 */
// static canEdit(tripID) {
//   const trip = Trips.findTripByID(tripID);
//   return !trip.isReposted || freet.repostCounter > 0;
// }

/* -------------------------------------------------------------------------- */
/*                                   UPVOTE                                   */
/* -------------------------------------------------------------------------- */
/**
 * Upvote this trip post
 *
 * @param {string} tripID - the ID of the trip
 * @return {trip} - the updated trip
 */
async function upvote(tripID) {
  try {
    const trip = await Trip.findOne({ _id: tripID });
    trip.likeCounter += 1;
    await trip.save();
    return trip;
  } catch (err) {
    return false;
  }
}

/**
 * Un-upvote this trip post
 *
 * @param {string} tripID - the ID of the trip
 * @return {trip} - the updated trip
 */
async function downvote(tripID) {
  try {
    const trip = await Trip.findOne({ _id: tripID });
    trip.likeCounter -= 1;
    await trip.save();
    return trip;
  } catch (err) {
    return false;
  }
}

/**
 * Un-upvote many trips (caused by deleting user account)
 *
 * @param {list} tripIDList - the list of tripIDs to downvote
 */
async function downVoteMany(tripIDList) {
  try {
    if (tripIDList.length === 0) return true;

    tripIDList.forEach(async (tripID) => {
      let trip = await Trip.findOne({ _id: tripID });
      trip.likeCounter -= 1;
      await trip.save();
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
 * @param {string} tripID - the ID of the trip
 * @return {int} - the number of upvotes
 */
async function getUpvoteCount(tripID) {
  try {
    const trip = await Trip.findOne({ _id: tripID });
    return trip.likeCounter;
  } catch (err) {
    return false;
  }
}

/* -------------------------------------------------------------------------- */
/*                                   REPOST                                   */
/* -------------------------------------------------------------------------- */
/* ------------------------------- NOT NEEDED ------------------------------- */
//   /**
//    * Add a re-freet to the collection.
//    *
//    * @prop {string} content - string for freet content
//    * @prop {string} creatorID - user ID of freet author
//    * @prop {string} freetID - freetID
//    * @return {Freet} - the newly created freet
//    */
//   static addRefreet(content, creatorID, originFreetID, originCreatorID) {
//     const freetID = uuid.v4();
//     const isRefreet = true;
//     const likeCounter = 0;
//     const refreetCounter = 0;
//     const freet = {
//       content,
//       creatorID,
//       freetID,
//       isRefreet,
//       originFreetID,
//       originCreatorID,
//       likeCounter,
//       refreetCounter,
//     };
//     freetsData.unshift(freet);
//     return freet;
//   }

//   /**
//    * Refreet this freet
//    *
//    * @param {string} freetID - the ID of the freet
//    * @return {int} - the current refreet counter
//    */
//   static refreet(userID, freetID) {
//     const freet = Freets.findFreetByID(freetID);
//     Freets.addRefreet(
//       freet.content,
//       userID,
//       freet.originFreetID,
//       freet.originCreatorID
//     );
//     freet.refreetCounter += 1;
//   }

//   /**
//    * Un-refreet this freet
//    *
//    * @param {string} originFreetID - the ID of the freet
//    * @return {int} - the current refreet counter
//    */
//   static unRefreet(userID, originFreetID) {
//     const refreet = Freets.findFreetByOriginalID(userID, originFreetID);
//     const origFreet = Freets.findFreetByID(originFreetID);
//     freetsData = freetsData.filter(
//       (freet) => !(freet.freetID == refreet.freetID)
//     );
//     origFreet.refreetCounter -= 1;
//   }

//   /**
//    * Un-refreet many freets (caused by deleting user account)
//    *
//    * @param {list} freetIDList - the list of freetIDs of the freet
//    * @return {int} - the current like counter
//    */
//   static unRefreetMany(userID, freetIDList) {
//     if (freetIDList.length === 0) return;

//     freetIDList.forEach((originFreetID) => {
//       Freets.unRefreet(userID, originFreetID);
//     });
//   }

//   /* --------------------------------- GETTER --------------------------------- */

//   /**
//    * Get refreet count of freet
//    *
//    * @param {string} freetID - the ID of the freet
//    * @return {int} - the number of refreets
//    */
//   static getRefreetCount(freetID) {
//     const freet = Freets.findFreetByID(freetID);
//     return freet.refreetCounter;
//   }

module.exports = Object.freeze({
  loadOne,
  loadEventOne,
  postOne,
  unPostOne,
  deleteOne,
  deleteAuthorAll,
  findAll,
  filterAllPosted,
  findAuthorAll,
  findOneByID,
  containsID,
  upvote,
  downvote,
  downVoteMany,
  getUpvoteCount,
});
