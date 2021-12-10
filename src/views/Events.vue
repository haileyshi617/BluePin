<template>
  <div>
    <Layout
      :showFooter="showFooter"
      :footerType="footerType"
      :sessionUserID="sessionUserID"
      :showLostGuide="showLostGuide"
    >
      <div class="event-card-container light center">
        <div class="event-title-container">
          <h1 class="title">Events</h1>
          <p class="slogan">Make a difference with BlueBikes now.</p>
        </div>
        <p>
          Riding is great. Riding together is even better! This is why BluePin
          is so much fun. Check out the events below! Join one if it seems
          interesting. You will get a chance to meet some new friends, hang out
          with old friends, and best of all, collect the piece of art unique to
          that event!
        </p>
        <br />
        <p>Sounds good? Scroll to find your event now!</p>
        <div class="btn-container">
          <button class="btn secondary dark" @click="goto('event-list')">
            Browse
          </button>
          <button class="btn primary dark" @click="onCreate">Create</button>
        </div>
      </div>
      <div ref="event-list"><EventList /></div>
    </Layout>
  </div>
</template>

<script>
import { eventBus } from '../main';

import Layout from '../components/layout/Layout.vue';
import EventList from '../components/events/EventList.vue';

export default {
  name: 'Events',
  props: ['sessionUserID'],
  components: {
    Layout,
    EventList,
  },
  data() {
    return { showFooter: 'show', footerType: 'light', showLostGuide: true };
  },
  methods: {
    goto(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;
      window.scrollTo(0, top);
    },
    onCreate() {
      eventBus.$emit('attempt-create-event');
    },
  },
};
</script>
