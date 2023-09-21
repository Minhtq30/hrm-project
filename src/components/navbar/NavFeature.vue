<template>
  <div class="tab_header flex justify-between">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
.tab_header {
  min-height: 50px;
  background-color: #f8f9fb;
  border-bottom: 1px solid #ddd;
  align-items: center;
}
</style>
