<template>
  <div>
    <div class="feed-container">
      <p v-if="showMessage">There is no posts right now...</p>
      <masonry
        :cols="{ default: 4, 1440: 3, 1000: 2, 700: 1 }"
        :gutter="{ default: '30px', 700: '15px' }"
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

export default {
  name: 'FreetListOne',
  props: ['author'], // Me
  components: { TripCard },
  data() {
    return {
      trips: [],
      showMessage: false,
    };
  },
  created() {
    this.getTripsFeedByOne();
    eventBus.$on('trip-feed-refresh', this.getTripsFeedByOne);
  },
  destroyed() {
    eventBus.$off('trip-feed-refresh', this.getTripsFeedByOne);
  },
  methods: {
    getTripsFeedByOne() {
      axios
        .get(`/api/trips/:author?author=${this.author}`)
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
