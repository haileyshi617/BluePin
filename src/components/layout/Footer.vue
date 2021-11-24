<template>
  <footer>
    <PinBottom />
    <div class="footer-text-container">
      <div><small>Blue Pin © 2021</small></div>
      <div>
        <p class="strong">Follow Us</p>
        <ul>
          <li><small>twitter</small></li>
          <li><small>facebook</small></li>
          <li><small>instagram</small></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import PinBottom from '../logos/PinBottom.vue';

export default {
  name: 'Footer',
  components: { PinBottom },
};
</script>
<style lang="scss" scoped></style>
