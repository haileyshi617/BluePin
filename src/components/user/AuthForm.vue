<template>
  <div class="auth-form-container">
    <div class="form-container">
      <h1>Create account.</h1>

      <div class="social-container">
        <small># Social Media Icons Goes Here</small>
      </div>

      <form
        id="create-user"
        @submit.prevent="createUser"
        class="input-container"
      >
        <span>Or use your own account</span>
        <input
          v-model="usernameCreate"
          id="usernameCreate"
          name="usernameCreate"
          placeholder="Username"
          required
        />
        <input
          v-model="passwordCreate"
          id="passwordCreate"
          name="passwordCreate"
          type="password"
          placeholder="Password"
          required
        />
        <button class="btn primary dark">Sign Up</button>
      </form>
    </div>

    <div class="form-container">
      <h1>Sign in.</h1>

      <div class="social-container">
        <small># Social Media Icons Goes Here</small>
      </div>

      <form id="sign-in" @submit.prevent="signIn" class="input-container">
        <span>Or use your own account</span>
        <input
          v-model="username"
          id="username"
          name="username"
          placeholder="Username"
          required
        />
        <input
          v-model="password"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <button class="btn primary dark">Sign In</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';

export default {
  name: 'AuthForm',
  data() {
    return {
      username: '',
      password: '',
      usernameCreate: '',
      passwordCreate: '',
    };
  },
  methods: {
    createUser() {
      axios
        .post('/api/user/', {
          username: this.usernameCreate,
          password: this.passwordCreate,
        })
        .then((response) => {
          eventBus.$emit('login-success', {
            data: response.data,
            // status: response.status,
          });
          this.$router.push('/');
        })
        .catch((error) =>
          eventBus.$emit('response-error', {
            data: error.response.data.error,
            // status: error.status,
          })
        );
      this.username = '';
      this.password = '';
    },

    signIn() {
      axios
        .post('/api/user/session', {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          eventBus.$emit('login-success', {
            data: response.data,
          });
          this.$router.push('/');
        })
        .catch((error) => {
          eventBus.$emit('response-error', {
            data: error.response.data.error,
          });
        });
      this.username = '';
      this.password = '';
    },
  },
};
</script>

<style scoped></style>
