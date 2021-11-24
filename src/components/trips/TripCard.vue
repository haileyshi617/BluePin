<template>
  <div class="trip-card">
    <div class="img-container"></div>
    <div class="trip-content-container">
      <DeleteTripForm />
      <p class="trip-title">{{ tripInfo.title }}</p>
      <p>{{ tripInfo.content }}</p>
    </div>
    <div class="trip-footer">
      <div class="user-container">
        <div class="user-icon-container"></div>
        <small><UsernameRouter :userID="tripInfo.originCreatorID" /></small>
      </div>
      <div class="likes-container" @click="toggleUpvote">
        <LikeBtn @click="toggleUpvote" :isLiked="isLiked" />
        <small>{{ likeCounter }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';

import UsernameRouter from '../user/UsernameRouter.vue';
import DeleteTripForm from './DeleteTripForm.vue';
import LikeBtn from '../logos/LikeBtn.vue';

export default {
  name: 'TripCard',
  props: ['index', 'tripInfo'],
  components: {
    UsernameRouter,
    DeleteTripForm,
    LikeBtn,
  },
  data() {
    return {
      likeCounter: 0,
      isLiked: false,
    };
  },
  created() {
    this.updateUpvoteState();
    this.likeCounter = this.tripInfo.likeCounter;
  },
  beforeDestroy() {
    eventBus.$off(`upvote-status-changed-${this.tripInfo.tripID}`);
  },
  methods: {
    updateUpvoteState() {
      axios
        .get(`/api/user/upvote/:tripID?tripID=${this.tripInfo.tripID}`)
        .then((response) => {
          response.data == true
            ? (this.isLiked = true)
            : (this.isLiked = false);
        })
        .catch((error) => {
          eventBus.$emit('response-error', {
            data: error.response.data.error,
          });
        });
    },
    toggleUpvote() {
      axios
        .put(`/api/user/upvote/:tripID?tripID=${this.tripInfo.tripID}`)
        .then(() => {
          this.isLiked ? this.likeCounter-- : this.likeCounter++;
          this.updateUpvoteState();
          eventBus.$emit(`upvote-status-changed-${this.tripInfo.tripID}`);
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

<style>
.trip-container {
  width: 400px;
}
</style>
