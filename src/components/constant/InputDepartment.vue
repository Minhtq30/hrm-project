<template>
  <v-select
    label="title"
    :options="listDepartments"
    :reduce="(depart) => depart.ID"
    placeholder="Chọn phòng ban"
    :multiple="isMultiple"
    :value="arrDepartment"
  >
    <template #option="{ title, deep }">
      <div style="display: flex; align-items: baseline">
        <div>{{ formatOption(title, deep) }}</div>
      </div>
    </template>
  </v-select>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  props: {
    arrDepartment: {
      type: [Array, null],
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    formatOption(title, deep) {
      if (deep < 2) {
        return title;
      } else if (deep == 2) {
        return "─ " + title;
      } else if (deep == 3) {
        return "─ ─ " + title;
      } else if (deep == 4) {
        return "─ ─ ─ " + title;
      } else if (deep == 5) {
        return "─ ─ ─ ─ " + title;
      } else if (deep == 6) {
        return "─ ─ ─ ─ ─ " + title;
      } else if (deep == 7) {
        return "─ ─ ─ ─ ─ ─ " + title;
      }
    },
  },
  setup() {
    const store = useStore();
    const listDepartments = computed(
      () => store.getters["departments/getAllDepartmentActive"]
    );
    return {
      listDepartments,
    };
  },
};
</script>

<style></style>
