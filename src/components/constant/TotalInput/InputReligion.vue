<template>
  <!-- Input chọn tôn giáo -->
  <v-select
    label="title"
    :options="listReligions"
    :reduce="(religion) => religion.ID"
    placeholder="Chọn tôn giáo"
    :value="religion"
  ></v-select>
</template>

<script>
import { useEthinicReligion } from "@/store/modules/settingPersonnel/ethnic-religion";
import { storeToRefs } from "pinia";
export default {
  props: {
    religion: {
      type: null,
    },
  },
  setup() {
    const EthinicReligion = useEthinicReligion();
    const { listReligions } = storeToRefs(EthinicReligion);
    if (listReligions.value?.length == 0) {
      EthinicReligion.GetAllReligionAction();
    }
    return {
      listReligions,
    };
  },
};
</script>

<style></style>
