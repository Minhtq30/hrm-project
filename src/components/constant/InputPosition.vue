<template>
  <v-select
    label="title"
    :options="listPositions"
    :reduce="(position) => position.ID"
    placeholder="Chọn vị trí"
    :multiple="isMultiple"
    :value="arrPosition"
  ></v-select>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  props: {
    arrPosition: {
      type: [Array, null],
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore();
    const listPositions = computed(
      () => store.getters["positions/getAllPositionsActive"]
    );

    return {
      listPositions,
    };
  },
};
</script>

<style></style>
