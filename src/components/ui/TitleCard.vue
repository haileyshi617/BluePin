<template>
  <div class="title-card-container dark">
    <div class="content-container">
      <slot></slot>
    </div>
    <PinTop />
  </div>
</template>

<script>
import PinTop from '../logos/PinTop.vue';

export default {
  name: 'TitleCard',
  components: { PinTop },
};
</script>

<style></style>
