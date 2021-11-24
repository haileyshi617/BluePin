<template>
  <div class="trip-table-container">
    <h2>My Trips</h2>
    <div class="trip-data-table">
      <hr />
      <div class="trip-data-item-container header">
        <p class="date">Date</p>
        <p class="from">From</p>
        <p class="to">To</p>
        <p class="type">Type</p>
        <p class="people">Participants</p>
        <p class="action">Actions</p>
      </div>
      <hr />
      <TripDataList :author="author" />
    </div>
  </div>
</template>

<script>
import TripDataList from './TripDataList.vue';

export default {
  name: 'TripDataTable',
  props: ['author'],
  components: { TripDataList },
};
</script>

<style></style>
