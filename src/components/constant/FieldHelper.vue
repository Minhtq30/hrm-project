<template>
  <div>
    <label for="" class="form-group-label">Nhân sự</label>
    <div>
      <v-select
        label="code"
        :options="listPersonnels"
        :reduce="(personnel) => personnel.ID"
        @search="loadPersonnel"
        :filterable="false"
        placeholder="Tìm mã, họ tên nhân sự"
        v-model="helper.personnel_id"
        @option:selected="changeInputPersonnel($event)"
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
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import _ from "lodash";
import { useRoute } from "vue-router";
import { useApprovalLeave } from "@/store/modules/approval/ApprovalLeaves";
export default {
  props: {
    Helper: { type: Object },
  },
  setup(props) {
    const helper = ref(props.Helper);
    const store = useStore();
    const route = useRoute();
    const leave = useApprovalLeave();
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
    const changeInputPersonnel = (e) => {
      console.log(store);
      store.dispatch("ApprovalAbsence/setIdUserCreateApprovalAction", e.ID);
      if (route.path == "/approval-leave/help") {
        let date = new Date();
        const data = {
          personnel_id: e.ID,
          date: date.getFullYear(),
        };
        leave.GetFurloughDetailUserAction(data);
      }
    };
    return {
      helper,
      loadPersonnel,
      listPersonnels,
      changeInputPersonnel,
    };
  },
};
</script>

<style></style>
