<template>
  <div>
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
              <h2>Your Contribution</h2>
              <router-link class="router-link" to="/me">Back</router-link>
            </div>
            <hr />
            <p>Thank you for being in the BlueBike community 🎉</p>
            <br />
            <p>
              We celebrate your progress and document every little contribution
              that you have made. By riding bikes and sharing your data with the
              community,
              <strong
                >you are helping to make a better Boston by bettering
                BlueBikes!</strong
              >
            </p>
            <br />
            <p>Scroll to explore your contribution below 👇🏼</p>
            <br />
            <PersonalVis />
            <p> Take a look at your riding history 👇🏼</p>
            <Calendar :author="sessionUserID"/>
          </div> 
        </div>      
      </div>
    </Layout>
  </div>
</template>

<script>
import Layout from '../components/layout/Layout.vue';
import PersonalVis from '../components/datavis/PersonalVis.vue';
import Calendar from '../components/datavis/calendar.vue';

export default {
  name: 'PersonalData',
  props: ['sessionUserID'],
  components: {
    Layout,
    PersonalVis,
    Calendar
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
