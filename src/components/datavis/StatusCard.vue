<template>
  <div class="status-card">
    <h2>{{ title }}</h2>
    <hr />
    <div class="status-container">
      <div class="status-item">
        <p class="item-title">{{ items.item1.title }}</p>
        <p class="item-count">{{ items.item1.count }}</p>
      </div>
      <div class="status-item">
        <p class="item-title">{{ items.item2.title }}</p>
        <p class="item-count">{{ items.item2.count }}</p>
      </div>
      <div class="status-item">
        <p class="item-title">{{ items.item3.title }}</p>
        <p class="item-count">{{ items.item3.count }}</p>
      </div>
    </div>
    <div class="btn-container" v-if="isCommunity">
      <button class="btn secondary dark">
        <router-link class="router-link" to="/community-data"
          >Explore</router-link
        >
      </button>
      <button class="btn primary dark">
        <router-link class="router-link" to="/me">Create</router-link>
      </button>
    </div>
    <div class="btn-container" v-else>
      <button class="btn secondary dark">
        <router-link class="router-link" to="/personal-data"
          >Explore</router-link
        >
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatusCard',
  props: ['title', 'items'],
  data() {
    return {
      isCommunity: true,
    };
  },
  created() {
    this.updateBtn();
  },
  methods: {
    updateBtn() {
      this.title == 'Community Status'
        ? (this.isCommunity = true)
        : (this.isCommunity = false);
    },
  },
};
</script>

<style></style>
