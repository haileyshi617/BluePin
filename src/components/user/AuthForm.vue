<template>
  <div class="auth-form-container" id="container">
    <div class="form-modal">
      <div class="form-container sign-up-container">
        <form
          id="create-user"
          @submit.prevent="createUser"
          v-if="!isAuthTypeSignIn"
        >
          <h1>Create Account</h1>
          <div class="social-container">
            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          <div class="input-container">
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
          </div>
          <button class="btn primary dark">Sign Up</button>
        </form>

        <div class="placeholder-container left" v-if="isAuthTypeSignIn">
          <h1>Hello, welcome!</h1>
          <p>
            BlueBike is great. We can make it even better! Join us to continue
            your BluePin journey!
          </p>
          <button class="btn secondary light" @click="toggleAuthType">
            Sign Up
          </button>
        </div>
      </div>

      <div class="form-container sign-in-container">
        <form id="sign-in" @submit.prevent="signIn" v-if="isAuthTypeSignIn">
          <h1>Sign in</h1>
          <div class="social-container">
            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your email</span>
          <div class="input-container">
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
          </div>
          <button class="btn primary dark">Sign In</button>
        </form>

        <div class="placeholder-container right" v-if="!isAuthTypeSignIn">
          <h1>Welcome back!</h1>
          <p>
            BluePin is a place of creation! Log in to continue your BluePin
            journey!
          </p>
          <button class="btn secondary light" @click="toggleAuthType">
            Sign In
          </button>
        </div>
      </div>
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
      isAuthTypeSignIn: true,
    };
  },
  created() {
    this.isAuthTypeSignIn = true;
  },
  methods: {
    toggleAuthType() {
      this.isAuthTypeSignIn = !this.isAuthTypeSignIn;
    },
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
          this.$router.push('/gallery');
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
          this.$router.push('/gallery');
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
