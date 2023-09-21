<template>
  <v-select
    label="title"
    :options="dataGender"
    :reduce="(gender) => gender.value"
    placeholder="Chọn giới tính"
    :value="gender"
    :searchable="false"
  ></v-select>
</template>

<script>
export default {
  props: {
    gender: {
      type: null,
    },
  },
  data() {
    return {
      dataGender: [
        {
          value: "0",
          title: "Nữ",
        },
        {
          value: "1",
          title: "Nam",
        },
        {
          value: "2",
          title: "Khác",
        },
      ],
    };
  },
};
</script>

<style></style>
