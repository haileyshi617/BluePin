<template>
  <div class="trip-form-control">
    <p v-if="showMessage">There is to post right now...</p>
    <div v-else class="trip-data-list-container">
      <TripDataItem
        v-for="(trip, index) in trips"
        :key="trip._id"
        :index="index"
        :tripInfo="trip"
      />
    </div>
    <AddTripForm :events="events" />
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';

import TripDataItem from './TripDataItem.vue';
import AddTripForm from './AddTripForm.vue';

export default {
  name: 'TripDataList',
  components: { TripDataItem, AddTripForm },
  props: ['author'],
  data() {
    return {
      showMessage: false,
      trips: [],
      events: [],
    };
  },
  created() {
    this.getTripsDataByOne();
    this.getEventsByOne();

    eventBus.$on('trip-table-refresh', this.getTripsDataByOne);
  },
  destroyed() {
    eventBus.$off('trip-table-refresh', this.getTripsDataByOne);
  },
  methods: {
    getEventsByOne() {
      axios
        .get(`/api/events/title`)
        .then((response) => {
          this.events = response.data;
        })
        .catch((error) =>
          eventBus.$emit('response-error', {
            data: error.response.data.error,
          })
        )
    },

    getTripsDataByOne() {
      axios
        .get(`/api/trips/load/:author?author=${this.author}`)
        .then((response) => {
          this.trips = response.data;
        })
        .catch((error) =>
          eventBus.$emit('response-error', {
            data: error.response.data.error,
          })
        )
        .then(() => {
          this.showMessage = this.trips.length === 0;
        });
    },
  },
};
</script>

<style></style>
