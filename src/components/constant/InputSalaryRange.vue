<template>
  <v-select
    label="title"
    :options="listSalryRange"
    :reduce="(salary) => salary.ID"
    placeholder="Chọn nơi ngạch lương"
    :multiple="isMultiple"
    :value="arrSalaryRange"
    @click.once="loadSalaryRange"
  ></v-select>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  props: {
    arrSalaryRange: {
      type: [Array, null],
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
    loadData: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const store = useStore();
    const listSalryRange = computed(
      () => store.state.salaryRange.listSalryRange
    );
    const loadSalaryRange = () => {
      if (listSalryRange.value?.length == 0) {
        store.dispatch("salaryRange/getAllSalaryRangeAction", 100);
      }
    };
    if (props.loadData == true) {
      if (listSalryRange.value?.length == 0) {
        store.dispatch("salaryRange/getAllSalaryRangeAction", 100);
      }
    }

    return {
      listSalryRange,
      loadSalaryRange,
    };
  },
};
</script>

<style></style>
