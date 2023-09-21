<template>
  <div id="contextMenu" class="context-menu" :class="{ isActive: isActive }">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    isActive: {
      type: Boolean,
    },
  },
  created() {
    document.onclick = hideMenu;
    function hideMenu() {
      let context = document.getElementById("contextMenu");
      context.style.display = "none";
    }
  },
};
</script>

<style></style>
