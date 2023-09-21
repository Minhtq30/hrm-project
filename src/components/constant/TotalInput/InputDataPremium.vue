<template>
  <!-- Chọn pháp nhân đóng -->
  <v-select
    label="title"
    :options="dataPremium"
    :reduce="(premium) => premium.value"
    placeholder="Chọn pháp nhân đóng"
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
      dataPremium: [
        {
          value: "0",
          title: "Công ty cổ phần đầu tư thương mại bách tường phát",
        },
        {
          value: "1",
          title: "-Chi nhánh miền Bắc",
        },
        {
          value: "2",
          title: "-Chi nhánh miền Nam",
        },
      ],
    };
  },
};
</script>

<style></style>
