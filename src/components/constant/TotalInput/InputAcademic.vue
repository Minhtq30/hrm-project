<template>
  <!-- Chọn trình độ học vấn cao nhất -->
  <v-select
    label="title"
    :options="listAcademic"
    :reduce="(academic) => academic.ID"
    placeholder="Chọn trình độ"
    :value="academic"
  ></v-select>
</template>

<script>
import { useAcademic } from "@/store/modules/personnelView/academics";
import { storeToRefs } from "pinia";

export default {
  props: {
    academic: {
      type: null,
    },
  },
  setup() {
    const academic = useAcademic();
    const { listAcademic } = storeToRefs(academic);
    return {
      listAcademic,
    };
  },
};
</script>

<style></style>
