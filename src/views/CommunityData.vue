<template>
  <div>
    <Layout
      :showFooter="showFooter"
      :footerType="footerType"
      :sessionUserID="sessionUserID"
      :showLostGuide="showLostGuide"
    >
      <h1>Community Data Viz</h1>
      <router-link class="router-link" to="/gallery">Back</router-link>
    </Layout>
  </div>
</template>

<script>
import Layout from '../components/layout/Layout.vue';

export default {
  name: 'CommunityData',
  props: ['sessionUserID'],
  components: {
    Layout,
  },
  data() {
    return {
      showFooter: 'show',
      footerType: 'light',
      showLostGuide: true,
    };
  },
};
</script>
