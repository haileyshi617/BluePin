<template>
  <transition name="fade">
    <div class="page-loader" v-if="!isLoaded">
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
    </div>
  </transition>
</template>

<script>
export default {
  //TODO: added preloader

  data: () => {
    return {
      isLoaded: false,
    };
  },

  mounted() {
    this.showToggle();
    // document.onreadystatechange = () => {
    //   if (document.readyState === 'complete') {
    //     this.isLoaded = true;
    //   }
    // };
  },
  methods: {
    showToggle() {
      setTimeout(() => {
        this.isLoaded = true;
      }, 700);
    },
  },
};
</script>

<style lang="scss" scoped>
$colors: #023e8a, #0077b6, #00b4d8, #90e0ef;

// -----------------------------------------------------

.page-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  z-index: 999;
}

// -----------------------------------------------------

.cube {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 50%;

  @for $i from 1 through length($colors) {
    &:nth-child(#{$i}) {
      background-color: nth($colors, $i);
    }
  }

  &:first-child {
    animation: left 1s infinite;
  }

  &:last-child {
    animation: right 1s infinite 0.5s;
  }
}

// -----------------------------------------------------

@keyframes left {
  40% {
    transform: translateX(-60px);
  }
  50% {
    transform: translateX(0);
  }
}

@keyframes right {
  40% {
    transform: translateX(60px);
  }
  50% {
    transform: translateX(0);
  }
}
</style>
