<template>
  <div class="trip-card">
    <div class="imgContainer" :id="p5CanvasID"></div>
    <div class="trip-content-container">
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
import LikeBtn from '../logos/LikeBtn.vue';

import GenerativeArt from '../../../p5/GenerativeArt.js';

export default {
  name: 'TripCard',
  props: ['index', 'tripInfo'],
  components: {
    UsernameRouter,
    LikeBtn,
  },
  data() {
    return {
      likeCounter: 0,
      isLiked: false,
      p5CanvasID: 'p5-canvas-0',
      imgContainer: 'rect-img-container',
    };
  },
  created() {
    this.updateUpvoteState();
    this.likeCounter = this.tripInfo.likeCounter;
    this.p5CanvasID = 'p5-canvas-' + this.index;
    Math.random(1) > 0.5
      ? (this.imgContainer = 'rect-img-container')
      : (this.imgContainer = 'square-img-container');
  },
  mounted() {
    this.imgContainer == 'rect-img-container'
      ? new GenerativeArt(310, 410, this.tripInfo, this.p5CanvasID)
      : new GenerativeArt(310, 310, this.tripInfo, this.p5CanvasID);
  },
  beforeDestroy() {
    eventBus.$off(`upvote-status-changed-${this.tripInfo._id}`);
  },
  methods: {
    updateUpvoteState() {
      axios
        .get(`/api/user/upvote/:tripID?tripID=${this.tripInfo._id}`)
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
        .put(`/api/user/upvote/:tripID?tripID=${this.tripInfo._id}`)
        .then(() => {
          this.isLiked ? this.likeCounter-- : this.likeCounter++;
          this.updateUpvoteState();
          eventBus.$emit(`upvote-status-changed-${this.tripInfo._id}`);
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

<style></style>
