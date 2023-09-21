<template>
  <!-- Input chọn quốc tịch -->
  <v-select
    label="title"
    :options="listCountry"
    :reduce="(country) => country.ID"
    placeholder="Chọn nơi cấp"
    :searchable="false"
    :value="nationality"
  ></v-select>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  props: {
    nationality: {
      type: null,
    },
  },
  setup() {
    const store = useStore();
    const listCountry = computed(() => store.state.places.listCountry);
    return {
      listCountry,
    };
  },
};
</script>

<style></style>
