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
          name: 'Joe Das',
          photo: '',
          bio: 'Our project aims to make BlueBikes’ impact more tangible, engaging, and personal so more people will opt for this sustainable alternative. Studies have shown that by increasing the actual impact of sustainable behavior of the individuals, it is more likely to encourage sustainable behavior and turn it into a habit.',
        },
        {
          name: 'Mary Rei',
          photo: '',
          bio: 'Our project aims to make BlueBikes’ impact more tangible, engaging, and personal so more people will opt for this sustainable alternative. Studies have shown that by increasing the actual impact of sustainable behavior of the individuals, it is more likely to encourage sustainable behavior and turn it into a habit.',
        },
        {
          name: 'Joe Das',
          photo: '',
          bio: 'Our project aims to make BlueBikes’ impact more tangible, engaging, and personal so more people will opt for this sustainable alternative. Studies have shown that by increasing the actual impact of sustainable behavior of the individuals, it is more likely to encourage sustainable behavior and turn it into a habit.',
        },
        {
          name: 'Mary Rei',
          photo: '',
          bio: 'Our project aims to make BlueBikes’ impact more tangible, engaging, and personal so more people will opt for this sustainable alternative. Studies have shown that by increasing the actual impact of sustainable behavior of the individuals, it is more likely to encourage sustainable behavior and turn it into a habit.',
        },
      ],
    };
  },
};
</script>
