<template>
  <div class="grid-container">
    <PreLoader />
    <Header class="header" :sessionUserID="sessionUserID" />

    <main class="main">
      <Notification />
      <LostGuide v-if="showLostGuide && !sessionUserID" />
      <section v-else>
        <slot></slot>
      </section>
    </main>

    <div class="sidebar sidebar-left"></div>

    <div class="sidebar sidebar-right"></div>

    <Footer class="footer" :class="[showFooter, footerType]" />
  </div>
</template>

<script>
import Header from './Header.vue';
import LostGuide from './LostGuide.vue';
import Footer from './Footer.vue';
import Notification from './Notification.vue';
import PreLoader from './PreLoader.vue';

export default {
  name: 'Layout',
  props: ['sessionUserID', 'showFooter', 'footerType', 'showLostGuide'],

  components: {
    Header,
    Footer,
    LostGuide,
    Notification,
    PreLoader,
  },
};
</script>

<style lang="scss" scoped></style>
