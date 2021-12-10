<template>
  <div class="me">
    <Layout
      :showFooter="showFooter"
      :footerType="footerType"
      :sessionUserID="sessionUserID"
      :showLostGuide="showLostGuide"
    >
      <div class="data-container">
        <TripDataTable :author="sessionUserID" />
      </div>

      <StatusCard :title="statusCard.title" :items="statusCard.items" />
      <div class="trip-feed-container">
        <h2 class="margin-left">My Pins</h2>
        <TripFeedOne :author="sessionUserID" />
      </div>
    </Layout>
  </div>
</template>

<script>
import Layout from '../components/layout/Layout.vue';
import StatusCard from '../components/datavis/StatusCard.vue';
import TripDataTable from '../components/trips/TripDataTable.vue';
import TripFeedOne from '../components/trips/TripFeedOne.vue';

export default {
  name: 'Me',
  components: {
    Layout,
    StatusCard,
    TripDataTable,
    TripFeedOne,
  },
  props: ['sessionUserID'],
  data() {
    return {
      showFooter: 'show',
      footerType: 'light',
      showLostGuide: true,

      statusCard: {
        title: 'My Status',
        items: {
          item1: { title: 'Total Pins', count: '8,912' },
          item2: { title: 'Total Likes', count: '12,082' },
          item3: { title: 'Carbon Saved', count: '23,039' },
        },
      },
    };
  },
};
</script>
