<template>
  <div class="team-member-container">
    <div class="photo-container">{{ content.photo }}</div>
    <div class="text-card narrow">
      <h1>{{ content.name }}</h1>
      <p>{{ content.bio }}</p>
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
