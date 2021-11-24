<template>
  <div>
    <!-- <button @click="signOut" class="btn profile">Signout</button> -->
    <button @click="signOut" class="btn profile">Signout</button>
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';

export default {
  name: 'SignOut',
  methods: {
    signOut() {
      axios
        .delete('/api/user/session')
        .then((response) => {
          eventBus.$emit('response-change', {
            data: response.data,
          });
          eventBus.$emit('signout-success');
          this.$router.push('/');
        })
        .catch((error) => {
          eventBus.$emit('response-error', {
            data: error.response.data.error,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
