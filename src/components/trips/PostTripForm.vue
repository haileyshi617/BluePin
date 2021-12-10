<template>
  <div class="trip-post-form-container">
    <ModalRegular>
      <template v-slot:header>
        <!-- <h2>Posting</h2> -->
      </template>

      <template v-slot:body>
        <div :class="imgContainer" :id="p5CanvasID"></div>
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

import GenerativeArt from "../../../p5/GenerativeArt.js";
export default {
  name: 'PostTripForm',
  components: { ModalRegular },
  props: ['tripInfo'],
  data() {
    return {
      title: '',
      content: '',
      p5CanvasID: 'p5-canvas-0',
      imgContainer: 'rect-img-container',
    };
  },
  created(){
    this.p5CanvasID = 'p5-canvas-' + this.index;
    Math.random(1)>0.5
      ? this.imgContainer = 'rect-img-container'
      : this.imgContainer = 'square-img-container';
  },
  mounted() {
    this.imgContainer == 'rect-img-container'
      ? new GenerativeArt(310, 410, this.tripInfo, this.p5CanvasID)
      : new GenerativeArt(310, 310, this.tripInfo, this.p5CanvasID);
  },
  methods: {
    postOneTrip() {
      axios
        .post(`/api/trips/:id?tripID=${this.tripInfo._id}`, {
          title: this.title,
          content: this.content,
        })
        .then((response) => {
          eventBus.$emit(`trip-published-${this.tripInfo._id}`);
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
      eventBus.$emit(`cancel-edit-${this.tripInfo._id}`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
