<template>
  <v-select
    label="title"
    :options="listContractTypes"
    :reduce="(contract) => contract.ID"
    placeholder="Chọn loại hợp đồng"
    :multiple="isMultiple"
    :value="arrContractType"
  ></v-select>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  props: {
    arrContractType: {
      type: [Array, null],
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore();
    const listContractTypes = computed(
      () => store.state.contractTypes.listContractTypes
    );
    return {
      listContractTypes,
    };
  },
};
</script>

<style></style>
