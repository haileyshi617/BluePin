<template>
  <div class="event-list">
    <EventCard
      v-for="(event, index) in events"
      :key="event._id"
      :index="index"
      :eventInfo="event"
    />
  </div>
</template>

<script>
import EventCard from './EventCard.vue';
import axios from 'axios';
import { eventBus } from '../../main';

export default {
  name: 'EventList',
  components: { EventCard },
  data() {
    return {
      events: [],
      showMessage: false,
    };
  },
  created() {
    this.getEventsAll();
  },
  methods: {
    getEventsAll() {
      axios
        .get(`/api/events/`)
        .then((response) => {
          this.events = response.data;
        })
        .catch((error) =>
          eventBus.$emit('response-error', {
            data: error.response.data.error,
          })
        )
        .then(() => {
          this.showMessage = this.events.length === 0;
        });
    },
  },
};
</script>

<style></style>
