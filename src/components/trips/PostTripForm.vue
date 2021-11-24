<template>
  <div class="trip-post-form-container">
    <ModalRegular>
      <template v-slot:header>
        <!-- <h2>Posting</h2> -->
      </template>

      <template v-slot:body>
        <div class="img-container"></div>
        <input
          v-model="title"
          placeholder="title"
          class="title-input"
          maxlength="30"
          required
        />
        <textarea
          v-model="content"
          placeholder="content"
          class="content-input"
          required
          maxlength="300"
        ></textarea>
      </template>

      <template v-slot:footer>
        <button class="btn primary dark" @click="postOneTrip">Post</button>
        <button class="btn secondary dark" @click="onCancelEdit">Cancel</button>
      </template>
    </ModalRegular>
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';

import ModalRegular from '../ui/ModalRegular.vue';
export default {
  name: 'PostTripForm',
  components: { ModalRegular },
  props: ['tripInfo'],
  data() {
    return {
      title: '',
      content: '',
    };
  },
  methods: {
    postOneTrip() {
      axios
        .post(`/api/trips/:id?tripID=${this.tripInfo.tripID}`, {
          title: this.title,
          content: this.content,
        })
        .then((response) => {
          eventBus.$emit(`trip-published-${this.tripInfo.tripID}`);
          eventBus.$emit(`trip-feed-refresh`);
          this.updatedTrip = response.data;
          this.onCancelEdit();
        })
        .catch((error) =>
          eventBus.$emit('response-error', {
            data: error.response.data.error,
          })
        );
    },
    onCancelEdit() {
      eventBus.$emit(`cancel-edit-${this.tripInfo.tripID}`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
