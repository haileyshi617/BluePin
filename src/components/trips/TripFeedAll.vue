<template>
  <div>
    <PreLoader />
    <div class="feed-container">
      <p v-if="showMessage">There is no posts right now...</p>

      <masonry
        class="masonry"
        :cols="{ default: 4, 1440: 3, 1000: 2, 700: 1 }"
        :gutter="{ default: '24px', 700: '12px' }"
      >
        <TripCard
          v-for="(trip, index) in trips"
          :key="trip._id"
          :index="index"
          :tripInfo="trip"
        >
        </TripCard>
      </masonry>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';

import TripCard from './TripCard.vue';
import PreLoader from '../layout/PreLoader.vue';

export default {
  name: 'TripFeedAll', // Gallery
  props: [],
  components: { TripCard, PreLoader },

  data() {
    return {
      trips: [],
      showMessage: false,
    };
  },
  created() {
    this.getTripsFeedAll();
    eventBus.$on('trip-feed-refresh', this.getTripsFeedAll);
  },
  destroyed() {
    eventBus.$off('trip-feed-refresh', this.getTripsFeedAll);
  },
  methods: {
    getTripsFeedAll() {
      axios
        .get(`/api/trips/`)
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

<style lang="scss" scoped></style>
