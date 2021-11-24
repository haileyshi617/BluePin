<template>
  <div>
    <header class="header-container">
      <div class="logo-container">
        <router-link class="router-link" to="/"
          ><img src="../../assets/logo.png" alt=""
        /></router-link>
      </div>

      <nav class="nav-container">
        <ul class="tab-list">
          <li>
            <router-link class="router-link" to="/vision">Vision</router-link>
          </li>
          <li>
            <router-link class="router-link" to="/team">Team</router-link>
          </li>
          |
          <li>
            <router-link class="router-link" to="/gallery">Gallery</router-link>
          </li>
          <li>
            <router-link class="router-link" to="/events">Events</router-link>
          </li>
          <li><router-link class="router-link" to="/me">Me</router-link></li>
        </ul>
      </nav>

      <div class="user-info-container">
        <div class="hide">{{ sessionUserID }}</div>

        <div class="profile-img-container"></div>

        <li v-if="isSignedIn">
          <button class="btn nav" @click="showModal">
            <UsernameRouter :userID="sessionUserID" />
          </button>
        </li>
        <li v-else>
          <router-link class="router-link" to="/signup">Log in</router-link>
        </li>
      </div>
    </header>
    <UserProfileModal :isModalVisible="isModalVisible" />
  </div>
</template>

<script>
import { eventBus } from '../../main';

import UserProfileModal from '../user/UserProfileModal.vue';
import UsernameRouter from '../user/UsernameRouter.vue';

export default {
  name: 'Header',
  props: ['sessionUserID'],
  components: {
    UserProfileModal,
    UsernameRouter,
  },
  data() {
    return {
      isSignedIn: false,
      isModalVisible: false,
    };
  },
  created() {
    this.checkSignedIn();

    eventBus.$on('login-success', () => {
      this.isSignedIn = true;
    });

    eventBus.$on('signout-success', () => {
      this.isSignedIn = false;
      this.showModal();
    });
  },
  updated() {
    this.checkSignedIn();
  },
  methods: {
    showModal() {
      this.isModalVisible = !this.isModalVisible;
    },

    checkSignedIn() {
      this.sessionUserID === ''
        ? (this.isSignedIn = false)
        : (this.isSignedIn = true);
    },
  },
};
</script>
