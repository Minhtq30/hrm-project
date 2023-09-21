<template>
  <!-- Chọn hình thức đào tạo -->
  <v-select
    label="title"
    :options="TypeTraining"
    :reduce="(type) => type.ID"
    placeholder="Chọn hình thức"
    :searchable="false"
    :value="type"
  ></v-select>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  props: {
    type: {
      type: null,
    },
  },
  setup() {
    const store = useStore();
    const TypeTraining = computed(() => store.state.personnels.TypeTraining);
    return {
      TypeTraining,
    };
  },
};
</script>

<style></style>
