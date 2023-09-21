<template>
  <div class="button-create relative group" title="Tạo mới">
    <div
      class="text-sm absolute w-60 z-10 bg-white left-0 top-full rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible p-2 drop-shadow-xl before:content-[''] before:h-5 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
    >
      <ul>
        <li
          class="p-[10px] sub-item"
          @click="this.$router.push('/wage-template/add')"
        >
          Loại bảng lương
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
