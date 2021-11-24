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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Porttitor
          massa id neque aliquam vestibulum. Nunc lobortis mattis aliquam
          faucibus purus in massa tempor. Et leo duis ut diam quam nulla
          porttitor. Et netus et malesuada fames ac turpis egestas.
        </p>
        <div class="btn-container">
          <button class="btn secondary dark">Browse</button>
          <button class="btn primary dark">Create</button>
        </div>
      </div>
      <EventList />
    </Layout>
  </div>
</template>

<script>
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
};
</script>
