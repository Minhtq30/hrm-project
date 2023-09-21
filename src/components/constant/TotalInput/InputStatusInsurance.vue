<template>
  <!-- Chọn trạng thái sổ -->
  <v-select
    label="title"
    :options="statusInsurance"
    :reduce="(status) => status.ID"
    placeholder="Trạng thái"
    :searchable="false"
    :value="stt"
  ></v-select>
</template>

<script>
import { useInsurance } from "@/store/modules/personnelView/insurance";
import { storeToRefs } from "pinia";
export default {
  props: {
    stt: {
      type: null,
    },
  },
  setup() {
    const insurance = useInsurance();
    const { statusInsurance } = storeToRefs(insurance);
    return { statusInsurance };
  },
};
</script>

<style></style>
