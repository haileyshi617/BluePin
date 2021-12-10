```js
/* ---------------------------------- Users ---------------------------------- */
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


/**
 * Sign out a user.
 *
 * @name DELETE /api/user/session
 *
 * @param {string} userID - userID in the session
 * @throws {403} - if the user is not logged in
 */


/**
 * Delete a user.
 *
 * @name DELETE /api/user/
 *
 * @param {string} userID - user ID in the session
 * @return {200} - successfully updated user
 * @throws {403} - if the user is not logged in
 */


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


/* --------------------------------- GETTER --------------------------------- */
/**
 * Get a username in the session
 *
 * @name GET /api/user/session
 *
 * @return {200} - user name in the session
 * @throws {401} - if the user is not already logged in
 */

/**
 * Get a userID in the session
 *
 * @name GET /api/userID/session
 *
 * @return {200} - user ID in the session
 * @throws {401} - if the user is not already logged in
 */

/**
 * Get a username with given userID
 *
 * @name GET /api/user/username/:userID?
 *
 * @return {200} - the found username
 * @throws {401} - if the user is not already logged in
 */

/**
 * Get an userID with given username
 *
 * @name GET /api/user/userID/:username?
 *
 * @throws {401} - if the user is not already logged in
 */


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

/**
 * Get upvote status of a freet.
 *
 * @name GET /api/user/upvote/:tripID?
 *
 * @param {string} userID - The ID of the user
 * @param {string} tripID - the trip ID
 * @return {200} - successfully retrieved user status
 */


/* --------------------------------- Trips -------------------------------- */
/* --------------------------------- GETTERS -------------------------------- */

/**
 * Get all POSTED trips
 *
 * @name GET /api/trips
 *
 * @return {Trip[]} - list of all posted trips
 * */

/**
 * Get all trips (POSTED & UN-POSTED)
 *
 * @name GET /api/trips/load
 *
 * @return {Trip[]} - list of posted and un-posted trips
 * */

/**
 * Get all POSTED trips by one
 *
 * @name GET /api/trips/:author?
 * @param {string} author - author ID to filter by (query parameter, required)
 *
 * @return {Trip[]} - list of posted trips with given author
 * */

/**
 * Get all trips by one (POSTED & UN-POSTED)
 *
 * @name GET /api/trips/load/:author?
 * @param {string} authorID - author ID to filter by (query parameter, required)
 *
 * @return {Trip[]} - list of posted and un-posted trips with given author
 * */


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

/* --------------------------------- Events -------------------------------- */
/* --------------------------------- GETTERS -------------------------------- */

/**
 * Get all POSTED trips
 *
 * @name GET /api/trips
 *
 * @return {Trip[]} - list of all posted trips
 * */

```
