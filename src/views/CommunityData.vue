<template>
  <div class="community">
    <Layout
      :showFooter="showFooter"
      :footerType="footerType"
      :sessionUserID="sessionUserID"
      :showLostGuide="showLostGuide"
    >
      <div class="container white">
        <div class="data-vis-content-container">
          <div class="data-text-container">
            <div class="title-container">
              <h2>Our Contribution</h2>
              <router-link class="router-link" to="/gallery">Back</router-link>
            </div>
            <hr />
            <p>This is BlueBike community's data center 🎉</p>
            <br />
            <p>
              We celebrate our progress and document every little contribution
              that you have made. By riding bikes and sharing your data with the
              community,
              <strong
                >you are helping to make a better Boston by bettering
                BlueBikes!</strong
              >
            </p>
            <br />
            <p>
              Scroll to explore our
              <strong>top contributors of the week</strong> below 👇🏼
            </p>
            <br />
          </div>

          <CommunityVis />
        </div>
      </div>
    </Layout>
  </div>
</template>

<script>
import Layout from '../components/layout/Layout.vue';
import CommunityVis from '../components/datavis/CommunityVis.vue';

export default {
  name: 'CommunityData',
  props: ['sessionUserID'],
  components: {
    Layout,
    CommunityVis,
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
