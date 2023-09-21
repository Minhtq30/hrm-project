<template>
  <v-select
    label="title"
    :options="listPositiontitles"
    :reduce="(positionTitle) => positionTitle.ID"
    placeholder="Chọn chức vụ"
    :multiple="isMultiple"
    :value="arrPositiontitle"
  ></v-select>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  props: {
    arrPositiontitle: {
      type: [Array, null],
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore();
    const listPositiontitles = computed(
      () => store.state.positiontitles.listPositiontitles
    );

    return {
      listPositiontitles,
    };
  },
};
</script>

<style></style>
