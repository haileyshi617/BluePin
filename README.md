# [Blue Pin](https://satoshi-bluepin.herokuapp.com/)

https://satoshi-bluepin.herokuapp.com/

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

- **Huiwen Shi**:
  - public
    - index.html
  - src
    - community.vue
    - personal.vue
    - CommunityVis.vue
    - PersonalVis.vue
    - CommunityData.vue
    - PersonalData.vue
    - Events.vue
    - Me.vue
    - Vision.vue
    - Team.vue
    - Events.vue
    - EventList.vue
    - Gallery.vue
    - Footer.vue
    - Header.vue
    - Layout.vue
    - TripFeedAll.vue
    - TripFeedOne.vue
    - TripCard.vue
    - TeamMemberCard.vue
    - \_trip-data-table.scss
    - \_trip-feed-container.scss
    - \_text-container.scss
    - \_trip-card.scss
    - \_set_up-global.scss
    - \_status-card.scss
    - \_layout.scss
    - \_variables.scss
    - \_me.scss
    - \_team.scss
    - \_personal-vis.scss
  - schema:
    - Events.js
  - models:
    - Trips.js
    - Users.js
    - Events.js
  - routes:
    - usersWithMiddleware.js
    - tripsWithMiddleware.js
    - middleware.js
    - index.js
- **Quinn He**:
  - src
    - Signup.vue
    - PersonalData.vue
    - Notification.vue
    - AuthForm.vue
    - ChangePassword.vue
    - ChangeUsername.vue
    - DeleteAccount.vue
    - Signout.vue
    - UserProfileModal.vue
    - PostTripForm.vue
    - TripCard.vue
    - EventCard.vue
    - EventNameBtn.vue 
    - AddTripForm.vue
    - TripDataList.vue 
  - App.vue
  - models:
    - Trips.js
    - Users.js
    - Events.js
  - db:
    - db_config.js
  - schema:
    - Trip.js
    - User.js
    - Event.js
  - p5:
    - GenerativeArt.js
  - routes:
    - tripsWithMiddleware.js
    - usersWithMiddleware.js
    - eventsWithMiddleware.js
    - middleware.js
  - Boilerplate code (main.js, babel.config.js, router.js, etc.)
- **Deniz Ak**:
  - src
    - AuthForm.vue
    - Gallery.vue
    - Main.vue
    - TripFeedAll.vue
    - TripFeedOne.vue
    - TripFeed.vue
    - TripCard.vue
    - PersonalData.vue
    - calendar.vue
    - main.js
    - \_auth-form.scss
    - \_trip-feed-container.scss
    - \_layout.scss
    - \_pin-background.scss
    - \_lost-guide.scss
  - app.js
- **Max Li**:
  - public
    - index.html
  - src
    - Main.vue
    - TripCard.vue
    - CommunityData.vue
    - PersonalData.vue
    - Team.vue
  - route:
    - Index.js
  - App.vue/router.js
  - API.md
