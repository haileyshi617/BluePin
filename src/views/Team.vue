<template>
  <div>
    <Layout
      :showFooter="showFooter"
      :footerType="footerType"
      :sessionUserID="sessionUserID"
      :showLostGuide="showLostGuide"
    >
      <TitleCard><h1 class="title">Team</h1></TitleCard>
      <div class="content-container dark">
        <div class="team-grid">
          <div></div>
          <TeamMemberCard
            v-for="(memberInfo, index) in teamList"
            :key="index"
            :index="index"
            :content="memberInfo"
          />
        </div>
      </div>
    </Layout>
  </div>
</template>

<script>
import Layout from '../components/layout/Layout.vue';
import TitleCard from '../components/ui/TitleCard.vue';
import TeamMemberCard from '../components/ui/TeamMemberCard.vue';

export default {
  name: 'Team',
  props: ['sessionUserID'],
  components: {
    Layout,
    TitleCard,
    TeamMemberCard,
  },
  data() {
    return {
      showFooter: 'show',
      footerType: 'dark',
      showLostGuide: false,
      teamList: [
        {
          name: 'Huiwen Shi',
          imgPath: '/assets/avatorHuiwen.JPG',
          bio: 'h_shi@mit.edu',
        },
        {
          name: 'Quinn He',
          imgPath: '/assets/avatorQuinn.PNG',
          bio: 'quinnhe@mit.edu',
        },
        {
          name: 'Deniz Ak',
          imgPath: '/assets/avatorDeniz.JPG',
          bio: 'denizak@mit.edu',
        },
        {
          name: 'Max Li',
          imgPath: '/assets/avatorMax.JPG',
          bio: 'maxli231@mit.edu',
        },
      ],
    };
  },
};
</script>
