<template>
  <div class="w-full">
    <h1 class="header-modal">cập nhật lịch sử công việc</h1>
    <div
      class="text-left p-4 form-plus-over format-scroll"
      style="min-height: 300px"
    >
      <div class="form-large-plus flex items-center">
        <div class="form-mid-small px-1">
          <label for="" class="form-group-label">Từ ngày</label>
        </div>
        <div class="form-x-small px-1">
          <label for="" class="form-group-label">Trạng thái công việc</label>
        </div>
        <div class="form-x-small px-1">
          <label for="" class="form-group-label">Phòng ban</label>
        </div>
        <div class="form-x-small px-1">
          <label for="" class="form-group-label">Vị trí công việc</label>
        </div>
        <div class="form-x-small px-1">
          <label for="" class="form-group-label">Chức vụ</label>
        </div>
      </div>
      <div
        class="form-large-plus flex items-center -mt-3"
        v-for="(work, index) in HistoryWork"
        :key="index"
      >
        <div class="form-mid-small px-1">
          <date-picker
            v-model="work.date_from"
            :disable="work.type == 'CONTRACT_START'"
          ></date-picker>
        </div>
        <div class="form-x-small px-1">
          <v-select
            label="title"
            :options="StatusWork"
            :reduce="(stt) => stt.value"
            placeholder="Chọn lý do"
            :searchable="false"
            v-model="work.job_status"
            :class="{ disabledHistoryWork: work.type == 'CONTRACT_START' }"
          ></v-select>
        </div>
        <div class="form-x-small px-1">
          <input-department
            v-model="work.department_id"
            class="long_select"
            :class="{ disabledHistoryWork: work.type == 'CONTRACT_START' }"
          ></input-department>
        </div>
        <div class="form-x-small px-1">
          <input-position
            v-model="work.position_id"
            class="long_select"
            :class="{ disabledHistoryWork: work.type == 'CONTRACT_START' }"
          ></input-position>
        </div>
        <div class="form-x-small px-1">
          <input-positiontitle
            v-model="work.job_title"
            class="long_select"
            :class="{ disabledHistoryWork: work.type == 'CONTRACT_START' }"
          ></input-positiontitle>
        </div>
        <div :class="{ disabledDiv: work.type == 'CONTRACT_START' }">
          <i
            class="fal fa-times icon-close"
            @click="deleteWork(index)"
            style="margin-top: 0px"
          ></i>
        </div>
      </div>
      <div class="my-2">
        <i class="fal fa-plus-circle icon-plus" @click="createWork()"></i>
      </div>
    </div>
    <div class="bg-button-modal">
      <button class="button-modal" @click="handleUpdateWork()">Cập nhật</button>
      <button class="button-close-modal" @click="handleCloseWork()">
        Hủy bỏ
      </button>
    </div>
  </div>
</template>

<script>
import datePicker from "@/components/datePicker/datePicker.vue";
import InputDepartment from "@/components/constant/InputDepartment.vue";
import InputPosition from "@/components/constant/InputPosition.vue";
import InputPositiontitle from "@/components/constant/InputPositiontitle.vue";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
export default {
  props: {
    PersonnelDetail: {
      type: Object,
    },
    CloseWork: {
      type: Function,
    },
  },
  data() {
    return {
      StatusWork: [
        { value: "WAITING", title: "Chờ nhận việc" },
        { value: "WORKING", title: "Đang làm việc" },
        { value: "STOP_WORKING", title: "Thôi việc" },
        { value: "LEAVING", title: "Nghỉ chế độ" },
      ],
    };
  },
  components: {
    datePicker,
    InputDepartment,
    InputPosition,
    InputPositiontitle,
  },
  setup(props) {
    const store = useStore();
    const toast = useToast();
    const route = useRoute();
    const isLoading = ref();
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const personnelDetail = ref(props.PersonnelDetail);
    store.dispatch(
      "personnels/GetAllHistoryWorkAction",
      personnelDetail.value.ID
    );
    const HistoryWork = computed(() => store.state.personnels.HistoryWork);
    const handleCloseWork = () => {
      props.CloseWork();
    };
    const deleteWork = (index) => {
      HistoryWork.value.splice(index, 1);
    };
    const createWork = () => {
      const data = {
        personnel_id: personnelDetail.value.ID,
        date_from: null,
        department_id: HistoryWork.value[0]?.department_id,
        position_id: HistoryWork.value[0]?.position_id,
        job_title: HistoryWork.value[0]?.job_title,
        job_status: null,
        type: null,
      };
      HistoryWork.value.push(data);
    };
    const handleUpdateWork = () => {
      let data_work_histories = [];
      for (let i = 0; i < HistoryWork.value?.length; i++) {
        let data = {
          ID: HistoryWork.value[i].ID,
          personnel_id: personnelDetail.value.ID,
          date_from: HistoryWork.value[i].date_from,
          department_id: HistoryWork.value[i].department_id,
          position_id: HistoryWork.value[i].position_id,
          job_title: HistoryWork.value[i].job_title,
          job_status: HistoryWork.value[i].job_status,
          type: HistoryWork.value[i].type,
        };
        data_work_histories.push(data);
      }
      const data = {
        data_work_histories: data_work_histories,
      };
      store.dispatch("personnels/UpdateHistoryWorkAction", {
        data,
        route,
        id: personnelDetail.value.ID,
        toast,
        handleCloseWork,
        EndTimeLoading,
      });
    };
    return {
      handleCloseWork,
      personnelDetail,
      HistoryWork,
      isLoading,
      deleteWork,
      createWork,
      handleUpdateWork,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
