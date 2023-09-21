<template>
  <!-- Chọn hình thức lương -->
  <v-select
    label="title"
    :options="listTypeSalary"
    :reduce="(type) => type.ID"
    placeholder="Chọn hình thức lương"
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
    const listTypeSalary = computed(
      () => store.state.personnels.listTypeSalary
    );
    return {
      listTypeSalary,
    };
  },
};
</script>

<style></style>
