<template>
  <div class="modal-container" id="notification" v-if="isModalVisible">
    <ModalWarning v-if="isWarning">
      <template v-slot:header>
        <h2>{{ title }}</h2>
      </template>

      <template v-slot:body>
        <p>{{ message }}</p>
      </template>

      <template v-slot:footer>
        <button class="btn primary warning" @click="closeModal">OK</button>
      </template>
    </ModalWarning>

    <ModalRegular v-else>
      <template v-slot:header>
        <h2>{{ title }}</h2>
      </template>

      <template v-slot:body>
        <p>{{ message }}</p>
      </template>

      <template v-slot:footer>
        <button class="btn primary dark" @click="closeModal">OK</button>
      </template>
    </ModalRegular>
  </div>
</template>

<script>
import { eventBus } from '../../main';

import ModalRegular from '../ui/ModalRegular.vue';
import ModalWarning from '../ui/ModalWarning.vue';

export default {
  name: 'Notification',
  components: { ModalRegular, ModalWarning },
  data() {
    return {
      message: '',
      title: '',
      isModalVisible: false,
      isWarning: false,
    };
  },
  created() {
    eventBus.$on('response-error', (data) => {
      this.title = 'Warning';
      this.message = data.data;
      this.turnOnWarning();
      this.openModal();
    });
    eventBus.$on('response-change', (data) => {
      if (data.status == 200 || data.status == 201) {
        this.title = 'Success';
        this.message = data.data.message;
        this.turnOffWarning();
        this.openModal();
      } else {
        this.title = 'Notification';
        this.message = data.data.message;
        this.turnOnWarning();
        this.openModal();
      }
    });
    eventBus.$on('attempt-create-event', () => {
      this.title = 'Not Available';
      this.message =
        'Right now all the events are created by the BluePin. We are working on individual events!';
      this.turnOffWarning();
      this.openModal();
    });
  },
  methods: {
    //* Backend data should include a flag for warning messages such as deletion
    turnOnWarning() {
      this.isWarning = true;
    },
    turnOffWarning() {
      this.isWarning = false;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    openModal() {
      this.isModalVisible = true;
    },
  },
  watch: {
    isModalVisible: function () {
      if (this.isModalVisible) {
        document.documentElement.style.overflow = 'hidden';
        return;
      }

      document.documentElement.style.overflowY = 'auto';
    },
  },
};
</script>

<style lang="scss" scoped></style>
