<template>
  <!-- Chọn lý do bảo giảm BH -->
  <v-select
    label="title"
    :options="ReasonDecrease"
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
    const ReasonDecrease = computed(
      () => store.state.personnels.ReasonDecrease
    );
    return {
      ReasonDecrease,
    };
  },
};
</script>

<style></style>
