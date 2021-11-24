<template>
  <div class="event-list"><EventCard /><EventCard /><EventCard /></div>
</template>

<script>
import EventCard from './EventCard.vue';

export default {
  name: 'EventList',
  components: { EventCard },
};
</script>

<style></style>
