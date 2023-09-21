<template>
  <v-select
    label="title"
    :options="listWorkTypes"
    :reduce="(workType) => workType.ID"
    placeholder="Chọn hình thức làm việc"
    :multiple="isMultiple"
    :value="arrWorkType"
    @click.once="loadWorkType"
  ></v-select>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  props: {
    arrWorkType: {
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
    const listWorkTypes = computed(() => store.state.workTypes.listWorkTypes);

    const loadWorkType = () => {
      if (listWorkTypes.value?.length == 0) {
        store.dispatch("workTypes/GetAllWorkTypeAction", 50);
      }
    };
    if (props.loadData == true) {
      if (listWorkTypes.value?.length == 0) {
        store.dispatch("workTypes/GetAllWorkTypeAction", 50);
      }
    }

    return {
      listWorkTypes,
      loadWorkType,
    };
  },
};
</script>

<style></style>
