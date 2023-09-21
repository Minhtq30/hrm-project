<template>
  <!-- Input chọn phụ cấp -->
  <v-select
    label="title"
    :options="listAllowance"
    :reduce="(allowance) => allowance.ID"
    placeholder="Chọn phụ cấp"
    :value="allowance"
    @click.once="LoadAllowance"
  ></v-select>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  props: {
    allowance: {
      type: null,
    },
  },
  setup() {
    const store = useStore();
    const listAllowance = computed(
      () => store.getters["allowances/getAllAllowancesActive"]
    );
    const LoadAllowance = () => {
      if (listAllowance.value?.length == 0) {
        store.dispatch("allowances/getAllAllowancesAction", 100);
      }
    };

    return {
      listAllowance,
      LoadAllowance,
    };
  },
};
</script>

<style></style>
