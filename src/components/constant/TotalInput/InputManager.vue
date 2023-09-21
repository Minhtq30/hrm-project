<template>
  <!-- Chọn người quản lý -->
  <v-select
    label="code"
    :options="listPersonnels"
    :reduce="(personnel) => personnel.ID"
    @search="loadPersonnel"
    :filterable="false"
    placeholder="Tìm mã, họ tên nhân sự"
    :value="manager"
  >
    <template #option="{ code, name, department, position }">
      <div class="flex flex-col text-left">
        <div class="flex">
          <div class="font-medium">{{ code }}</div>
          <div>&nbsp;- {{ name }}</div>
        </div>
        <div class="flex text-xs">
          <div v-if="position">{{ position }}&nbsp;-&nbsp;</div>
          <div>{{ department }}</div>
        </div>
      </div>
    </template>
    <template #selected-option="{ code, name }">
      <div class="flex">
        <div class="font-medium">{{ code }}</div>
        <div>&nbsp;- {{ name }}</div>
      </div>
    </template>
  </v-select>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import _ from "lodash";
export default {
  props: {
    manager: { type: null },
  },
  setup() {
    const store = useStore();
    const loadPersonnel = _.debounce((search, loading) => {
      if (search.length > 0) {
        loading(true);
        store.dispatch("personnels/SearchPersonnelCreateApprovalAction", {
          search: search,
          loading,
        });
      }
    }, 300);
    const listPersonnels = computed(
      () => store.state.personnels.PersonnelCreateApproval
    );
    return {
      loadPersonnel,
      listPersonnels,
    };
  },
};
</script>

<style></style>
