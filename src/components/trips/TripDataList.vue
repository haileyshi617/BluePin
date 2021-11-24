<template>
  <div class="trip-form-control">
    <p v-if="showMessage">There is to post right now...</p>
    <div v-else class="trip-data-list-container">
      <TripDataItem
        v-for="(trip, index) in trips"
        :key="trip.tripID"
        :index="index"
        :tripInfo="trip"
      />
    </div>
    <button id="add-trip" @click="loadOneTrip">Add Trip</button>
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';

import TripDataItem from './TripDataItem.vue';

export default {
  name: 'TripDataList',
  components: { TripDataItem },
  props: ['author'],
  data() {
    return {
      showMessage: false,
      trips: [],
    };
  },
  created() {
    this.getTripsDataByOne();
    eventBus.$on('trip-table-refresh', this.getTripsDataByOne);
  },
  destroyed() {
    eventBus.$off('trip-table-refresh', this.getTripsDataByOne);
  },
  methods: {
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
    loadOneTrip() {
      axios
        .post('/api/trips/load')
        .then(() => {
          this.getTripsDataByOne();
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
