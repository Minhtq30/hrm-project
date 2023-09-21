<template>
  <!-- Chọn cấp bậc -->
  <v-select
    label="title"
    :options="dataLevel"
    :reduce="(level) => level.value"
    placeholder="Chọn cấp bậc"
    :searchable="false"
    :value="level"
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
      dataLevel: [
        {
          value: 1,
          title: "Cấp 1",
        },
        {
          value: 2,
          title: "Cấp 2",
        },
        {
          value: 3,
          title: "Cấp 3",
        },
        {
          value: 4,
          title: "Cấp 4",
        },
      ],
    };
  },
};
</script>

<style></style>
