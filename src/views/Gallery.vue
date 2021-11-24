<template>
  <div>
    <Layout
      :showFooter="showFooter"
      :footerType="footerType"
      :sessionUserID="sessionUserID"
      :showLostGuide="showLostGuide"
    >
      <StatusCard :title="statusCard.title" :items="statusCard.items" />
      <div class="trip-feed-container">
        <TripFeedAll :tripList="tripList" />
      </div>
    </Layout>
  </div>
</template>

<script>
import Layout from '../components/layout/Layout.vue';
import StatusCard from '../components/datavis/StatusCard.vue';
import TripFeedAll from '../components/trips/TripFeedAll.vue';

export default {
  name: 'Gallery',
  components: {
    Layout,
    StatusCard,
    TripFeedAll,
  },
  props: ['sessionUserID'],
  data() {
    return {
      showFooter: 'show',
      footerType: 'light',
      showLostGuide: true,

      statusCard: {
        title: 'Community Status',
        items: {
          item1: { title: 'Total Pins', count: '8,912' },
          item2: { title: 'Creators', count: '12,082' },
          item3: { title: 'Carbon Saved', count: '23,039' },
        },
      },
    };
  },
};
</script>
