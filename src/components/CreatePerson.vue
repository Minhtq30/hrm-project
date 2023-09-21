<template>
  <div v-if="isHidden === false" class="flex items-center ml-4">
    <slot></slot>
  </div>
  <div v-else></div>
</template>

<script>
export default {
  data() {
    return {
      isHidden: false,
    };
  },
  created() {
    const slug = this.$route.name;
    if (slug === "Social") {
      this.isHidden = true;
    }
  },
};
</script>

<style></style>
