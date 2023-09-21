<template>
  <v-select
    label="title"
    :options="listWorkplace"
    :reduce="(workplace) => workplace.ID"
    placeholder="Chọn nơi làm việc"
    :multiple="isMultiple"
    :value="arrWorkplace"
    @click.once="loadWorkplace"
  ></v-select>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  props: {
    arrWorkplace: {
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
    const listWorkplace = computed(() => store.state.workplace.listWorkplace);
    const loadWorkplace = () => {
      if (listWorkplace.value?.length == 0) {
        store.dispatch("workplace/getAllWorkplaceAction", 500);
      }
    };
    if (props.loadData == true) {
      loadWorkplace();
    }

    return {
      listWorkplace,
      loadWorkplace,
    };
  },
};
</script>

<style></style>
