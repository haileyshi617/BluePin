let tripsData = [];

//? Get stations by real data
let stations = ['MIT', 'Harvard', 'Central'];

// Need ability to generate random IDs (primary/foreign keys)
const uuid = require('uuid');

/**
 * @typedef Trips
 *
 * @prop {string} tripID - tripID
 * @prop {string} originCreatorID - userID
 *
 * @prop {string} title - some string for trip title
 * @prop {string} content - some string for trip content
 * @prop {boolean} isPosted - if the trip has been posted (initialize to false)
 * @prop {int} likeCounter - counter of likes this trip post has (initialize to 0)
 *
 * @prop {string} start - the starting station of the trip
 * @prop {string} end - the ending station of the trip
 * @prop {double} distance - the distance of the trip
 *
 *
 * * ONLY NEEDED FOR REPOST
 * @prop {boolean} isRefreet - flag whether is a refreet
 * @prop {int} refreetCounter - counter of refreets this freet has
 * @prop {string} originFreetID - freetID of mother freet(will be the same as freetID if !isRefreet)
 * @prop {string} originCreatorID - creatorID of mother freet
 *
 */

class Trips {
  /**
   * Load a trip to the database.
   *
   * @prop {string} creatorID - user ID of freet author
   * @return {Trip} - the newly created Trip
   */

  // ? could be loading multiple at once?
  static loadOne(creatorID) {
    const tripID = uuid.v4();
    const originCreatorID = creatorID; // leave room for re-post

    // Initialize related values(will be changed when postOne)
    const likeCounter = 0;
    const isPosted = false;
    const content = '';
    const title = '';

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

    const trip = {
      tripID,
      originCreatorID,

      date,
      isPosted,
      likeCounter,
      title,
      content,

      start,
      end,
      distance,
    };

    tripsData.unshift(trip);
    return trip;
  }

  /**
   * Post a trip.
   *
   * @prop {string} content - some string of the trip content
   * @prop {string} postTripID - the tripID
   * @return {Trip} - the updated posted Trip
   */
  static postOne(postTripID, title, content) {
    const trip = tripsData.find((t) => t.tripID == postTripID);

    trip.title = title;
    trip.content = content;
    trip.isPosted = true;

    return trip;
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
  static unPostOne(tripID) {
    const trip = Trips.findOneByID(tripID);
    trip.isPosted = false;
    return trip;
  }

  /**
   * Delete a Trip from the collection by ID.
   *
   * @param {string} tripID - The ID of the trip to un-post
   * @return {Trip} - the deleted trip
   */
  static deleteOne(tripID) {
    const tripToDelete = Trips.findOneByID(tripID);
    tripsData = tripsData.filter((trip) => !(trip.tripID === tripID));
    return tripToDelete;
  }

  /**
   * Delete an author's trips from the trip collection. (For account deletion)
   *
   * @param {string} creatorID - The ID of the author
   * @return {Trip[]} - an array of updated trips collection
   */
  static deleteAuthorAll(creatorID) {
    tripsData = tripsData.filter(
      (trip) => !(trip.originCreatorID === creatorID)
    );
    return tripsData;
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
  static findAll() {
    return tripsData;
  }

  /**
   * Find all posted trips in a given list
   *
   * @param {list} - the trip list to filter
   * @return {Trip[]} an array of all of the trips
   */
  static filterAllPosted(tripsToFilter) {
    return tripsToFilter.filter((trip) => trip.isPosted === true);
  }

  /**
   * Find all existing trips of one user (posted AND un-posted)
   *
   * @param {string} creatorID - The creatorID of the trips to find
   * @return {Trips[] | {}} - the found trips
   */
  static findAuthorAll(creatorID) {
    return tripsData.filter((trip) => trip.originCreatorID === creatorID);
  }

  /**
   * Find a trip by trip ID
   *
   * @param {string} tripID - the ID of the trip
   * @return {Trip | undefined} - the found trip
   */
  static findOneByID(tripID) {
    return tripsData.filter((trip) => trip.tripID == tripID)[0];
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
  static containsID(userID) {
    return Trips.findOneByID(userID).length > 0;
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
  static upvote(tripID) {
    const trip = Trips.findOneByID(tripID);
    trip.likeCounter += 1;
    return trip;
  }

  /**
   * Un-upvote this freet
   *
   * @param {string} tripID - the ID of the trip
   * @return {freet} - the updated freet
   */
  static downvote(tripID) {
    const trip = Trips.findOneByID(tripID);
    trip.likeCounter -= 1;
    return trip;
  }

  /**
   * Un-upvote many trips (caused by deleting user account)
   *
   * @param {list} tripIDList - the list of tripIDs to downvote
   */
  static downVoteMany(tripIDList) {
    if (tripIDList.length === 0) return;

    tripIDList.forEach((tripID) => {
      Trips.downvote(tripID);
    });
  }

  /* --------------------------------- GETTER --------------------------------- */
  /**
   * Get upvote count of trip post
   *
   * @param {string} tripID - the ID of the trip
   * @return {int} - the number of upvotes
   */
  static getUpvoteCount(tripID) {
    const trip = Trips.findOneByID(tripID);
    return trip.likeCounter;
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
}

module.exports = Trips;
