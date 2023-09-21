<template>
  <!-- Chọn hình thức bảo hiểm -->
  <v-select
    label="title"
    :options="dataTypePremium"
    :reduce="(type) => type.value"
    placeholder="Chọn hình thức"
    :searchable="false"
    :value="type"
  ></v-select>
</template>

<script>
export default {
  props: {
    type: {
      type: null,
    },
  },
  data() {
    return {
      dataTypePremium: [
        { value: "up", title: "Báo tăng" },
        { value: "down", title: "Báo giảm" },
      ],
    };
  },
};
</script>

<style></style>
