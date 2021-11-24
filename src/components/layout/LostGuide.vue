<template>
  <section class="lost-guide-container">
    <p>You are not signed in yet!</p>
    <p>
      Click
      <router-link class="router-link btn btn-text" to="/signup"
        >here</router-link
      >
      to sign in or sign up.
    </p>
  </section>
</template>

<script>
export default {
  name: 'LostGuide',
};
</script>

<style lang="scss" scoped></style>
