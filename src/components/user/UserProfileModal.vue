<template>
  <div class="modal-container" id="userProfile" v-if="isModalVisible">
    <ModalRegular>
      <template v-slot:header>
        <h1>Edit Profile</h1>
      </template>

      <template v-slot:body>
        <div class="update-form-container">
          <ChangeUsername />
          <ChangePassword />

          <DeleteAccount />

          <SignOut />
        </div>
      </template>

      <template v-slot:footer>
        <button class="btn secondary dark" @click="closeModal">Done</button>
      </template>
    </ModalRegular>
  </div>
</template>

<script>
// import { eventBus } from '../../main';

import ModalRegular from '../ui/ModalRegular.vue';
import ChangeUsername from './ChangeUsername.vue';
import ChangePassword from './ChangePassword.vue';
import SignOut from './Signout.vue';
import DeleteAccount from './DeleteAccount.vue';

export default {
  name: 'UserProfileModal',
  props: ['isModalVisible'],
  components: {
    ModalRegular,
    ChangeUsername,
    ChangePassword,
    SignOut,
    DeleteAccount,
  },
  data() {
    return {
      message: '',
      title: '',
      isWarning: false,
    };
  },
  methods: {
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
