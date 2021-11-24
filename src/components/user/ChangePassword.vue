<template>
  <div class="profile-form">
    <!-- <form @submit.prevent="changePassword"> -->
      <div>
        <ModalRegular v-if="isModalVisible">
          <template v-slot:header>
            <h2>Change Password</h2>
          </template>

          <template v-slot:body>
            <!-- <label for="password">Password:</label> -->
            <input
              class="profile"
              v-model="password"
              name="password"
              type="password"
              placeholder="New Password"
              required
            />
          </template>

          <template v-slot:footer>
            <div class="btn-container">
              <button
                @click="changePassword(); toggleModal()"
                type="submit"
                class="btn primary dark modal"
              >
                Confirm
              </button>
              <button
                @click="toggleModal"
                type="submit"
                class="btn secondary dark modal"
              >
                Cancel
              </button>
            </div>
          </template>
        </ModalRegular>
      </div>
      <button
        @click="toggleModal"
        type="submit"
        class="btn primary dark profile"
      >
        Change Password
      </button>
    <!-- </form> -->
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';
import ModalRegular from '../ui/ModalRegular.vue';

export default {
  name: 'ChangePassword', //UserProfileModal
  components: { ModalRegular },
  data() {
    return {
      password: '',
      isModalVisible: false,
    };
  },
  methods: {
    toggleModal() {
      this.isModalVisible = !this.isModalVisible;
    },
    changePassword() {
      axios
      .put('/api/user/password', {
        password: this.password,
      })
      .then((response) =>
        eventBus.$emit('response-change', {
          data: response.data,
          status: response.status,
        })
      )
      .catch((error) =>
        eventBus.$emit('response-error', {
          data: error.response.data.error,
          // status: error.status,
        })
      );
      this.password = '';
    },
  },
};
</script>

<style lang="scss" scoped></style>
