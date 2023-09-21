<template>
  <!-- chọn nơi khám  -->
  <v-select
    label="title"
    :options="listPremiumPlace"
    :reduce="(place) => place.ID"
    placeholder="Chọn hình thức"
    :value="place"
  ></v-select>
</template>

<script>
import { useInsurance } from "@/store/modules/personnelView/insurance";
import { storeToRefs } from "pinia";
export default {
  props: {
    place: {
      type: null,
    },
  },
  setup() {
    const insurance = useInsurance();
    const { listPremiumPlace } = storeToRefs(insurance);
    return {
      listPremiumPlace,
    };
  },
};
</script>

<style></style>
