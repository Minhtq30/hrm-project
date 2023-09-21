<template>
  <!-- Chọn hình thức (đảng viên) -->
  <v-select
    label="title"
    :options="dataTypeCommunist"
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
      dataTypeCommunist: [
        {
          value: "0",
          title: "Dự bị",
        },
        {
          value: "1",
          title: "Chính thức",
        },
        {
          value: "2",
          title: "Điều chuyển",
        },
      ],
    };
  },
};
</script>

<style></style>
