<template>
  <button class="btn primary event" @click="loadOneTrip">
    {{ eventName }}
  </button>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';

export default {
  name: 'EventNameBtn',
  props: ['index', 'eventName'],
  data() {
    return {};
  },
  created() {
    // this.updateEventName();
  },
  updated() {
    // eventBus.$on('eventname-updated', () => {
    //   this.updateEventName();
    // });
  },
  methods: {
    // updateEventName() {
    //   axios
    //     .get('/api/events/' + this.eventID)
    //     .then((response) => {
    //       this.eventName = response.data;
    //     })
    //     .catch((error) =>
    //       eventBus.$emit('response-error', {
    //         data: error.response.data.error,
    //       })
    //     );
    // },
    loadOneTrip() {
      axios
        .post('/api/trips/loadEvent', {
          eventTitle: this.eventName,
        })
        .then(() => {
          eventBus.$emit('event-added');
          eventBus.$emit('trip-feed-refresh');
          eventBus.$emit('trip-table-refresh');
        })
        .catch((error) =>
          eventBus.$emit('response-error', {
            data: error.response.data.error,
          })
        );
    },
  },
};
</script>

<style></style>
