<template>
  <div class="profile-form">
    <!-- <form v-on:submit.prevent="changeUsername"> -->
    <div>
      <ModalRegular v-if="isModalVisible">
        <template v-slot:header>
          <h2>Change Username</h2>
        </template>

        <template v-slot:body>
          <input
            class="profile"
            v-model="username"
            name="username"
            placeholder="New Username"
            required
          />
        </template>

        <template v-slot:footer>
          <div class="btn-container">
            <button
              @click="
                changeUsername();
                toggleModal();
              "
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

    <button @click="toggleModal" type="submit" class="btn primary dark profile">
      Change Username
    </button>
    <!-- </form> -->
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';
import ModalRegular from '../ui/ModalRegular.vue';

export default {
  name: 'ChangeUsername', //UserProfileModal
  components: { ModalRegular },
  data() {
    return {
      username: '',
      isModalVisible: false,
    };
  },
  methods: {
    toggleModal() {
      this.isModalVisible = !this.isModalVisible;
    },
    changeUsername() {
      axios
        .put('/api/user/username', {
          username: this.username,
        })
        .then((response) => {
          eventBus.$emit('username-updated', {
            data: response.data,
            status: response.status,
          });
        })
        .catch((error) => {
          eventBus.$emit('response-error', {
            data: error.response.data.error,
            // status: error.status,
          });
        });
      this.username = '';
    },
  },
};
</script>

<style lang="scss" scoped></style>
