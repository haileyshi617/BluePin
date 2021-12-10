<template>
  <div>
    <p v-if="showMessage">There is no posts right now...</p>
    <VuejsHeatmap
      :entries="tripArray"
      :color-range="['#c9ecec', '#1349d3']"
      :tooltip-enabled="true"
      :max="1"
    />
  </div>
</template>

<script>
import VuejsHeatmap from 'vuejs-heatmap';
import axios from 'axios';
import { eventBus } from '../../main';

export default {
  name: 'Calendar',
  props: ['author'],
  components: {
    VuejsHeatmap,
  },
  data() {
    return {
      tripArray: [
        { counting: '1', created_at: '2021-07-14' },
        { counting: '1', created_at: '2021-06-08' },
        { counting: '2', created_at: '2021-03-21' },
        { counting: '3', created_at: '2021-10-24' },
        { counting: '1', created_at: '2021-11-06' },
      ],
    };
  },
  created() {
    this.getTripsDataByOne();
  },
  methods: {
    getTripsDataByOne() {
      axios
        .get(`/api/trips/load/:author?author=${this.author}`)
        .then((response) => {
          this.tripArray.push = {
            counting: '1',
            created_at: response.data.date,
          };
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
