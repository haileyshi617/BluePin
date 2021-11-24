<template>
  <div class="username">
    {{ username }}
    <!-- <button @click="takeToProfile" class="btn btn-username">
      {{ username }}
    </button> -->
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';

export default {
  name: 'UsernameRouter',
  props: ['userID'],
  data() {
    return { username: '' };
  },
  created() {
    this.updateUsername();
  },
  updated() {
    eventBus.$on('username-updated', () => {
      this.updateUsername();
    });
  },
  methods: {
    updateUsername() {
      axios
        .get('/api/user/' + this.userID)
        .then((response) => {
          this.username = response.data;
        })
        .catch((error) =>
          eventBus.$emit('response-error', {
            data: error.response.data.error,
          })
        );
    },
  },
};
</script>

<style lang="scss" scoped>
.username {
  font: inherit;
}
</style>
