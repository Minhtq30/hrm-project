<template>
  <!-- Chọn cấp bậc -->
  <v-select
    label="title"
    :options="dataModelPremium"
    :reduce="(model) => model.value"
    placeholder="Chọn loại chế độ"
    :value="level"
    :searchable="false"
  ></v-select>
</template>

<script>
export default {
  props: {
    level: {
      type: null,
    },
  },
  data() {
    return {
      dataModelPremium: [
        { value: "0", title: "Chế độ thai sản" },
        { value: "1", title: "Chế độ ốm đau" },
        { value: "2", title: "Chế độ tai nạn lao động" },
        { value: "3", title: "Chế độ hưu trí" },
        { value: "4", title: "Chế độ tử xuất" },
      ],
    };
  },
};
</script>

<style></style>
