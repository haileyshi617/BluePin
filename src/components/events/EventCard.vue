<template>
  <div class="event-card">
    <div class="bubble-background"></div>
    <div class="hr-container"><hr /></div>
    <div class="content-container">
      <p>{{eventInfo.startDate}} - {{eventInfo.endDate}}</p>
      <h3>{{joinCounter}} people participated</h3>
      <h1 class="title">{{eventInfo.title}}</h1>
      <p>
        {{eventInfo.content}}
      </p>
      <button class="btn secondary dark" @click="toggleJoin">{{btnText}}</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';

export default {
  name: 'EventCard',
  props: ['index', 'eventInfo'],
  data() {
    return {
      btnText: 'Join',
      joinCounter: 0,
      //TODO: update data for event card
      // likeCounter: 0,
      // isLiked: false,
      // p5CanvasID: 'p5-canvas-0',
      // imgContainer: 'rect-img-container',
    };
  },
  created(){
    this.updateText();
    this.joinCounter = this.eventInfo.joinCounter;
  },
  beforeDestroy() {
    eventBus.$off(`join-status-changed-${this.eventInfo._id}`);
  },
  methods: {
    updateText() {
      // Make a GET request to backend to check the user's status
      axios
        .get(`/api/user/join/:eventID?eventID=${this.eventInfo._id}`)
        .then((response) => {
          response.data == true
            ? (this.btnText = 'Unjoin')
            : (this.btnText = 'Join');
        })
        .catch((error) => {
          eventBus.$emit('response-error', {
            data: error.response.data.error,
          });
        });
    },
    toggleJoin() {
      axios
        .put(`/api/user/join/:eventID?eventID=${this.eventInfo._id}`, {
          eventTitle: this.eventInfo.title,
        })
        .then(() => {
          this.btnText == 'Unjoin' ? this.joinCounter-- : this.joinCounter++;
          this.updateText();
          eventBus.$emit(`join-status-changed-${this.eventInfo._id}`);
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
