<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
        <router-view :key="key"/>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    }
  }
};
</script>

<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 100px);
  width: 100%;
  min-width: 1080px;
  position: relative;
  overflow: hidden;
  background-color: #f9f9f9;
}
</style>

