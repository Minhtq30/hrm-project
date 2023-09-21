<template>
  <!-- Input chọn dân tộc -->
  <v-select
    label="title"
    :options="listEthnics"
    :reduce="(people) => people.ID"
    placeholder="Chọn dân tộc"
    :value="people"
  ></v-select>
</template>

<script>
import { useEthinicReligion } from "@/store/modules/settingPersonnel/ethnic-religion";
import { storeToRefs } from "pinia";
export default {
  props: {
    people: {
      type: null,
    },
  },
  setup() {
    const EthinicReligion = useEthinicReligion();
    const { listEthnics } = storeToRefs(EthinicReligion);
    if (listEthnics.value?.length == 0) {
      EthinicReligion.GetAllEthnicsAction();
    }
    return {
      listEthnics,
    };
  },
};
</script>

<style></style>
