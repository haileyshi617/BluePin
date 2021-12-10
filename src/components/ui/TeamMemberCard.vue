<template>
  <div class="team-member-container">
    <div class="photo-container">
      <img :src="content.imgPath" alt="Team Member Logo" />
    </div>
    <div class="text-card narrow center">
      <h1>{{ content.name }}</h1>
      <p>Email: {{ content.bio }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamMemberCard',
  props: ['index', 'content'],
};
</script>

<style></style>
