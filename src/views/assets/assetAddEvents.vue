<template>
  <div class="icon-slider button-create relative group">
    <div
      class="text-sm absolute w-48 z-10 bg-white left-0 top-full rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible p-2 drop-shadow-xl before:content-[''] before:h-5 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
    >
      <ul>
        <li class="sub-item" @click="this.$router.push('/asset-add')">
          <span class="ml-4">Thêm tài sản</span>
        </li>
        <!-- <li class="sub-item" @click="this.$router.push('/asset-assign')">
          <span class="ml-4">Thêm nhà cung cấp</span>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>

<style></style>
