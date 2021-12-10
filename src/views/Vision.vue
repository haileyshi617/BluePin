<template>
  <div>
    <Layout
      :showFooter="showFooter"
      :footerType="footerType"
      :sessionUserID="sessionUserID"
      :showLostGuide="showLostGuide"
    >
      <TitleCard><h1 class="title">Vision</h1></TitleCard>
      <div class="content-container dark">
        <div class="text-card">
          <h1>Make a difference.</h1>
          <p>
            Our project, Blue Pin, serves as a software that aims to enhance the
            BlueBikes experience for its users to promote sustainable behaviors.
            BlueBikes is a great sustainable alternative as a sharing mobility
            tool. It provides opportunities for more people to take advantage of
            the public transportation system instead of driving private cars. It
            provides a solution for the last mile problem in public
            transportation and encourages effective resource utilization as a
            sharing platform. However, there is room for improvement. Though
            BlueBikes brands itself as a sharing tool, it still remains a shy
            service provider. BlueBikes has provided data visualization of their
            contribution on their website. But since the data is collected in
            and represented in a general, rather than personal way, it could be
            distancing for individual users.
          </p>
        </div>

        <div class="text-card">
          <h1>Join the community.</h1>
          <p>
            Our project aims to make BlueBikes’ impact more tangible, engaging,
            and personal so more people will opt for this sustainable
            alternative. Studies have shown that by increasing the actual impact
            of sustainable behavior of the individuals, it is more likely to
            encourage sustainable behavior and turn it into a habit. Also, a
            sense of community would be beneficial to motivate people. Hence,
            for our Blue Pin project, we will use two primary strategies:
            gamification and community building.
          </p>
        </div>

        <div class="btn-container">
          <button class="btn secondary light">
            <router-link class="router-link" to="/gallery"
              >Join Now</router-link
            >
          </button>
        </div>
      </div>
    </Layout>
  </div>
</template>

<script>
import Layout from '../components/layout/Layout.vue';
import TitleCard from '../components/ui/TitleCard.vue';

export default {
  name: 'Vision',
  props: ['sessionUserID'],
  data() {
    return {
      showFooter: 'show',
      footerType: 'dark',
      showLostGuide: false,
    };
  },
  components: {
    Layout,
    TitleCard,
  },
};
</script>

<style lang="scss"></style>
