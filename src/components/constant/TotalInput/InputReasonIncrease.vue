<template>
  <!-- Chọn lý do báo tăng BH -->
  <v-select
    label="title"
    :options="ReasonIncrease"
    :reduce="(increase) => increase.ID"
    placeholder="Chọn lý do"
    :searchable="false"
    :value="reason"
  ></v-select>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  props: {
    reason: {
      type: null,
    },
  },
  setup() {
    const store = useStore();
    const ReasonIncrease = computed(
      () => store.state.personnels.ReasonIncrease
    );
    return {
      ReasonIncrease,
    };
  },
};
</script>

<style></style>
