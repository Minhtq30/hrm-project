<template>
  <!-- Input chọn trình độ phổ thông -->
  <v-select
    label="title"
    :options="listLevelSchool"
    :reduce="(level) => level.value"
    placeholder="Chọn trình độ phổ thông"
    :searchable="false"
    :value="level"
  ></v-select>
</template>

<script>
import { useEthinicReligion } from "@/store/modules/settingPersonnel/ethnic-religion";
import { storeToRefs } from "pinia";
export default {
  props: {
    level: {
      type: null,
    },
  },
  setup() {
    const EthinicReligion = useEthinicReligion();
    const { listLevelSchool } = storeToRefs(EthinicReligion);

    return {
      listLevelSchool,
    };
  },
};
</script>

<style></style>
