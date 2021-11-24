<template>
  <div>
    <router-view :sessionUserID="sessionUserID" :response="response">
    </router-view>
  </div>
</template>

<script>
import { eventBus } from './main';
import axios from 'axios';

export default {
  name: 'app',
  components: {},
  data() {
    return {
      sessionUserID: '',
      response: '',
    };
  },
  created() {
    axios
      .get('/api/user/session')
      .then(() => {
        let authenticated = this.$cookie.get('bluepin-auth');
        if (authenticated) {
          this.sessionUserID = authenticated;
        }
      })
      .catch(() => {
        this.$cookie.set('bluepin-auth', '');
      });
  },
  updated() {
    eventBus.$on('login-success', (data) => {
      this.$cookie.set('bluepin-auth', data.data.userID);
      this.sessionUserID = data.data.userID;
    });
    eventBus.$on('signout-success', () => {
      this.$cookie.set('bluepin-auth', '');
      this.sessionUserID = '';
    });
    eventBus.$on('deleteAccount-success', () => {
      this.$cookie.set('bluepin-auth', '');
      this.sessionUserID = '';
    });
  },
};
</script>

<style></style>
