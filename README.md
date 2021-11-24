
# [Blue Pin](https://bluepin-version1.herokuapp.com/)
https://bluepin-version1.herokuapp.com/
## [satoshi]
### Purpose and Functionality
Our project, Blue Pin, aims to enhance the BlueBikes experience for its users by creating a tangible and engaging platform. Some of its key functionalities include:
1. Share personal **Trips** with generative art and messages as **Pins** that other users can upvote
2. **Profile** of each user’s trip statistics
3. **Visualization** of the cumulative contributions of the user community
4. **Events** to promote user engagement and sustainable behaviors

### Instructions to Run Locally:
In command line:
```console
$ npm i
$ npm run serve
```
In a separate shell:
```console
$ npm start
```
then you will find the application at `localhost:8080` in the browser

### Authorship:
* **Huiwen Shi**:
  * src
    * CommunityData.vue
    * EVents.vue
    * Me.vue
    * Vision.vue
    * Team.vue
    * Events.vue
    * EventList.vue
    * Footer.vue
    * Header.vue
    * Layout.vue
  * App.vue
  * models:
    * Trips.js
    * Users.js
  * routes:
    * usersWithMiddleware.js
    * tripsWithMiddleware.js
    * middleware.js
    * index.js
* **Quinn He**:
  * src
    * Signup.vue
    * PersonalData.vue
    * Notification.vue
    * AuthForm.vue
    * ChangePassword.vue
    * ChangeUsername.vue
    * DeleteAccount.vue
    * Signout.vue
    * UserProfileModal.vue
  * models:
    * Users.js
  * routes:
    * middleware.js
  * Boilerplate code (main.js, babel.config.js, router.js, etc.)
* **Deniz Ak**:
  * src
    * Gallrey.vue
    * Main.vue
    * TripFeed.vue
    * TripCard.vue
  * app.js
  * models:
    * Trips.js
  * routes:
    * middleware.js
    * index.js
* **Max Li**:
  * public
    * index.html
  * src
    * Main.vue
    * TripCard.vue
  * models:
    * Trips.js
    * Users.js
  * routes:
    * usersWithMiddleware.js
    * tripsWithMiddleware.js
  * App.vue/router.js
