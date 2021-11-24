<template>
  <div>
    <ModalWarning v-if="isModalVisible">
      <template v-slot:header>
        <h2>Sure to Delete?</h2>
      </template>

      <template v-slot:body>
        <p>You CANNOT get it back once deleted!</p>
      </template>

      <template v-slot:footer>
        <div class="btn-container">
          <button class="btn primary warning" @click="deleteAccount(); toggleModal()">
            Delete
          </button>
          <button class="btn primary" @click="toggleModal">Cancel</button>
        </div>
      </template>
    </ModalWarning>

    <button @click="toggleModal" class="btn secondary warning profile">
      Delete Account
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';
import ModalWarning from '../ui/ModalWarning.vue';

export default {
  name: 'DeleteAccount', //UserProfileModal
  components: { ModalWarning },
  data() {
    return {
      username: '',
      password: '',
      isModalVisible: false,
    };
  },
  methods: {
    toggleModal() {
      this.isModalVisible = !this.isModalVisible;
    },
    deleteAccount() {
      axios
      .delete('/api/user')
      .then((response) => {
        eventBus.$emit('response-change', {
          data: response.data,
        });
        eventBus.$emit('deleteAccount-success');
        eventBus.$emit('signout-success');
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
