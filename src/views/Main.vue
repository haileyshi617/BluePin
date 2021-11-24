<template>
  <div class="main">
    <Layout
      :showFooter="showFooter"
      :footerType="footerType"
      :sessionUserID="sessionUserID"
      :showLostGuide="showLostGuide"
    >
      <div class="container">
        <div class="title-container">
          <h1 class="title">Better BlueBike</h1>
          <h1 class="title">Better Boston</h1>
        </div>
        <p>
          Create and share your
          <router-link class="router-link" to="/me">BluePin</router-link> right
          now.
        </p>
      </div>
    </Layout>
  </div>
</template>

<script>
import Layout from '../components/layout/Layout.vue';

export default {
  name: 'Home',
  props: ['sessionUserID'],
  data() {
    return { showFooter: 'hide', footerType: 'dark', showLostGuide: false };
  },
  components: {
    Layout,
  },
};
</script>
