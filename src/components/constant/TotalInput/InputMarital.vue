<template>
  <!-- Input chọn tình trạng hôn nhân -->
  <v-select
    label="title"
    :options="dataMarital"
    :reduce="(marital) => marital.value"
    placeholder="Chọn tình trạng hôn nhân"
    :searchable="false"
    :value="marital"
  ></v-select>
</template>

<script>
export default {
  props: {
    marital: {
      type: null,
    },
  },
  data() {
    return {
      dataMarital: [
        {
          value: 0,
          title: "Độc thân",
        },
        {
          value: 1,
          title: "Kết hôn",
        },
        {
          value: 2,
          title: "Ly thân",
        },
      ],
    };
  },
};
</script>

<style></style>
