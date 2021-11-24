let userData = [];

// Need ability to generate random IDs (primary/foreign keys)
const uuid = require('uuid');

/**
 * @typedef User
 * @prop {string} username - username
 * @prop {string} password - password
 * @prop {string} userID - userid
 *
 * @prop {Set} likes - set of tripIDs that this user upvoted
 *
 * @prop {Set} following - set of usernames that this user follows
 * @prop {Set} followers - set of usernames that follow this user
 *
 * @prop {Set} refreets - set of freetIDs that this user refreeted [NOT NEEDED]
 */

class Users {
  /* -------------------------------------------------------------------------- */
  /*                                  USER INFO                                 */
  /* -------------------------------------------------------------------------- */

  /**
   * Add a user to users list.
   *
   * @prop {string} username - username
   * @prop {string} password - password
   * @prop {string} userID - userid
   * @prop {Set} likes - set of tripIDs that this user upvoted
   * * @prop {Set} reposts - set of tripIDs that this user refreeted [NOT NEEDED]
   * @prop {Set} following - set of usernames that this user follows
   * @return {User \ undefined} - the newly created user
   */
  static addOne(username, password) {
    const userID = uuid.v4();

    const likes = new Set();
    const following = new Set();
    const followers = new Set();

    const user = {
      username,
      password,
      userID,

      likes,
      following,
      followers,
    };
    userData.push(user);
    return user;
  }

  /**
   * Update a user's name.
   *
   * @param {string} userID - the ID of the user to update
   * @param {string} newUsername - The new username to associate with the user
   * @return {User | undefined} - The updated user
   */
  static updateUsernameOne(userID, newUsername) {
    const user = Users.findOneByID(userID);
    user.username = newUsername;
    return user;
  }

  /**
   * Update a user's password.
   *
   * @param {string} userID - The ID of the user to update
   * @param {string} newPassword - The new password to associate with the user
   * @return {User | undefined} - The updated user
   */
  static updatePasswordOne(userID, newPassword) {
    const user = Users.findOneByID(userID);
    user.password = newPassword;
    return user;
  }

  /**
   * Delete a user from the collection.
   *
   * @param {string} userID - ID of User to delete
   * @return {User | undefined} - deleted User
   */
  static deleteOne(userID) {
    const user = Users.findOneByID(userID);
    userData = userData.filter((user) => user.userID !== userID);
    return user;
  }

  /* --------------------------------- GETTERS -------------------------------- */
  /**
   * Find a user by name.
   *
   * @param {string} username - The name of the user to find
   * @return {User | undefined} - the found user with above name
   */
  static findOneByName(username) {
    return userData.filter((user) => user.username === username)[0];
  }

  /**
   * Find a user by ID.
   *
   * @param {string} userID - The ID of the user to find
   * @return {User | undefined} - the found user with above ID
   */
  static findOneByID(userID) {
    return userData.filter((user) => user.userID === userID)[0];
  }

  /**
   * Find a username based on given userID
   *
   * @param {string} userID - the ID of the user to update
   * @return {username | undefined} - username
   */
  static findNameByID(userID) {
    const user = Users.findOneByID(userID);
    return user.username;
  }

  /**
   * Find a userID based on given username
   *
   * @param {string} username - the username of the user
   * @return {userID | undefined} - username
   */
  static findIDByName(username) {
    const user = Users.findOneByName(username);
    return user.userID;
  }

  /* -------------------------------- CHECKERS -------------------------------- */

  /**
   * Check if username matches password
   *
   * @param {string} username - username
   * @param {string} password - password
   * @return {True | False} - boolean result
   */
  static checkPassword(username, password) {
    return Users.findOneByName(username).password === password;
  }

  /**
   * Checks if any user in the users collections has the given User ID
   *
   * @prop {string} userID - User ID
   * @return {Boolean} - true if some user with the id exists
   */
  static containsID(userID) {
    return Users.findOneByID(userID).length > 0;
  }

  /* -------------------------------------------------------------------------- */
  /*                                   UPVOTE                                   */
  /* -------------------------------------------------------------------------- */

  /**
   * Add or remove tripID to user's likes(Set)
   *
   * @param {string} userID - The ID of the user to update
   * @param {string} tripID - The tripID
   * @return {User | undefined} - The updated user
   */
  static toggleUpvote(userID, tripID) {
    const user = Users.findOneByID(userID);

    Users.getUpvoteStatus(userID, tripID)
      ? user.likes.delete(tripID)
      : user.likes.add(tripID);

    return user;
  }

  /* --------------------------------- GETTERS -------------------------------- */

  /**
   * Get user's upvote list
   *
   * @param {string} userID - The ID of the user
   * @return {list} - The list of tripIDs liked by this user
   */
  static getUpvoteList(userID) {
    const user = Users.findOneByID(userID);
    return user.likes;
  }

  /**
   * Get user's upvote status of a trip
   *
   * @param {string} userID - The ID of the user
   * @param {string} tripID - The tripID
   * @return {boolean} - if the trip is liked by the user
   */
  static getUpvoteStatus(userID, tripID) {
    const user = Users.findOneByID(userID);
    return user.likes.has(tripID);
  }

  /* -------------------------------------------------------------------------- */
  /*                                   FOLLOW                                   */
  /* -------------------------------------------------------------------------- */

  // * NOT NEEDED FOR NOW
  /**
   * Add or remove userID to user's follow(Set)
   *
   * @param {string} userID - The ID of the user to update
   * @param {string} otherID - The ID of the user to follow(target user)
   * @return {User | undefined} - The updated target user
   */
  static toggleFollow(userID, otherID) {
    const thisUser = Users.findOneByID(userID);
    const otherUser = Users.findOneByID(otherID);

    if (thisUser.following.has(otherID)) {
      thisUser.following.delete(otherID);
      otherUser.followers.delete(userID);
    } else {
      thisUser.following.add(otherID);
      otherUser.followers.add(userID);
    }

    return otherUser;
  }

  /**
   * Remove user from other's following list (triggered by deleting a user)
   * Remove user from other's follow list
   *
   * @param {string} userID - The ID of the user to update
   * @return {User | undefined} - The updated user
   */
  static deleteFollowStatusMany(userID) {
    const followingUserList = Users.findOneFollowing(userID);

    if (followingUserList.length !== 0) {
      followingUserList.forEach((otherUserID) => {
        const otherUser = Users.findOneByID(otherUserID);
        otherUser.followers.delete(userID);
      });
    }

    const followerUserList = Users.findOneFollowers(userID);
    if (followerUserList !== 0) {
      followerUserList.forEach((otherUserID) => {
        const otherUser = Users.findOneByID(otherUserID);
        otherUser.following.delete(userID);
      });
    }

    return Users.findOneByID(userID);
  }

  /* --------------------------------- GETTERS -------------------------------- */
  /**
   * Check if this user is following another user
   *
   * @param {string} userID - The ID of the user
   * @param {string} otherID - The ID of the other user
   * @return {boolean} - if the user is following the other user
   */
  static isFollowing(userID, otherID) {
    const user = Users.findOneByID(userID);
    const otherUser = Users.findOneByID(otherID);
    return otherUser.followers.has(userID) && user.following.has(otherID);
  }

  /**
   * Find a user's following
   *
   * @param {string} userID - userID
   * @return {following | undefined} - set of following userIDs
   */
  static findOneFollowing(userID) {
    return Array.from(Users.findOneByID(userID).following);
  }

  /**
   * Find a user's followers
   *
   * @param {string} userID - userID
   * @return {followers | undefined} - set of follower's userIDs
   */
  static findOneFollowers(userID) {
    return Array.from(Users.findOneByID(userID).followers);
  }

  /* -------------------------------------------------------------------------- */
  /*                                   REFREET                                  */
  /* -------------------------------------------------------------------------- */

  /**
   * * Add or remove freetID to user's refreets(Set) [NOT NEEDED]
   *
   * @param {string} userID - The ID of the user to update
   * @param {string} freetID - The original freetID (Not the refreet)
   * @return {User | undefined} - The updated user
   */

  // static toggleRefreet(userID, freetID) {
  //   const user = Users.findOneByID(userID);

  //   user.refreets.has(freetID)
  //     ? user.refreets.delete(freetID)
  //     : user.refreets.add(freetID);

  //   return user;
  // }

  /* --------------------------------- GETTERS -------------------------------- */
  /**
   * * Get user's refreets [NOT NEEDED]
   *
   * @param {string} userID - The ID of the user
   * @return {list} - the user's refreets (origin freetID)
   */

  // static getRefreetList(userID) {
  //   const user = Users.findOneByID(userID);
  //   return user.refreets;
  // }

  /**
   * * Get user's refreet status of freet [NOT NEEDED]
   *
   * @param {string} userID - The ID of the user
   * @param {string} freetID - The freetID
   * @return {boolean} - if the freet is liked by the user
   */

  // static getRefreetStatus(userID, freetID) {
  //   const user = Users.findOneByID(userID);
  //   return user.refreets.has(freetID);
  // }
}

module.exports = Users;
