<template>
  <!-- Chọn mối quan hệ gia đình -->
  <v-select
    label="title"
    :options="listFamilyRelationship"
    :reduce="(relationship) => relationship.ID"
    placeholder="Chọn mối quan hệ"
    :value="relationship"
  ></v-select>
</template>

<script>
import { useFamilyRelationship } from "@/store/modules/settingPersonnel/familyRelationship";
import { storeToRefs } from "pinia";
export default {
  props: {
    relationship: {
      type: null,
    },
  },
  setup() {
    const family = useFamilyRelationship();
    const { listFamilyRelationship } = storeToRefs(family);

    if (listFamilyRelationship.value?.length == 0) {
      family.getAllFamilyRelationshipAction();
    }

    return {
      listFamilyRelationship,
    };
  },
};
</script>

<style></style>
