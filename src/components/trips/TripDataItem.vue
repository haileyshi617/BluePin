<template>
  <div
    class="trip-data-item-container"
    @mouseover="mouseOver"
    @mouseleave="mouseOver"
    :class="{ active: isActive }"
  >
    <small class="date">{{ tripInfo.date }}</small>
    <small class="from">{{ tripInfo.start }}</small>
    <small class="to">{{ tripInfo.end }}</small>
    <small class="type">Trip</small>
    <small class="people"
      ><UsernameRouter :userID="tripInfo.originCreatorID"
    /></small>

    <div class="post-btn-container action">
      <small v-if="!isPosted" @click="togglePostingMode">Publish</small>
      <small v-else @click="unPostOneTrip">Unpublish</small>
      <small @click="deleteOneTrip">Delete</small>
    </div>

    <PostTripForm v-if="isPostingMode" :tripInfo="tripInfo" />
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';

import UsernameRouter from '../user/UsernameRouter.vue';
import PostTripForm from './PostTripForm.vue';

export default {
  name: 'TripDataItem',
  props: ['tripInfo'],
  components: {
    UsernameRouter,
    PostTripForm,
  },
  data() {
    return {
      isPosted: this.tripInfo.isPosted,
      isActive: false,
      isPostingMode: false,
    };
  },
  created() {
    eventBus.$on(`cancel-edit-${this.tripInfo.tripID}`, this.togglePostingMode);
    eventBus.$on(
      `trip-published-${this.tripInfo.tripID}`,
      this.togglePostState
    );
  },
  methods: {
    unPostOneTrip() {
      axios
        .put(`/api/trips/:id?tripID=${this.tripInfo.tripID}`)
        .then((response) => {
          eventBus.$emit('trip-feed-refresh');
          this.updatedTrip = response.data;
        })
        .then(() => {
          this.togglePostState();
        })
        .catch((error) =>
          eventBus.$emit('response-error', {
            data: error.response.data.error,
          })
        );
    },
    deleteOneTrip() {
      axios
        .delete(`/api/trips/:id?tripID=${this.tripInfo.tripID}`)
        .then((response) => {
          eventBus.$emit('trip-feed-refresh');
          eventBus.$emit('trip-table-refresh');
          this.updatedTrip = response.data;
        })
        .catch((error) =>
          eventBus.$emit('response-error', {
            data: error.response.data.error,
          })
        );
    },
    mouseOver() {
      this.isActive = !this.isActive;
    },
    test(message) {
      alert(message);
    },
    togglePostingMode() {
      this.isPostingMode = !this.isPostingMode;
    },
    togglePostState() {
      this.isPosted = !this.isPosted;
    },
  },
};
</script>

<style></style>
