<template>
  <div class="w-full">
    <h1 class="header-modal">thêm kiêm nhiệm</h1>
    <div
      class="text-left p-4 form-plus-over format-scroll"
      style="min-height: 400px"
    >
      <div
        class="form-large-plus flex items-center"
        v-if="personnelDetail.concurrents?.length"
      >
        <div class="form-mid-small px-1">
          <label for="" class="form-group-label">Ngày bắt đầu</label>
        </div>
        <div class="form-mid-small px-1">
          <label for="" class="form-group-label">Ngày kết thúc</label>
        </div>
        <div class="form-x-small px-1">
          <label for="" class="form-group-label">Phòng ban kiêm nhiệm</label>
        </div>
        <div class="form-x-small px-1">
          <label for="" class="form-group-label">Vị trí</label>
        </div>
        <div class="form-x-small px-1">
          <label for="" class="form-group-label">Chức vụ</label>
        </div>
      </div>
      <div v-else class="text-left w-[800px]">Không tìm thấy kết quả</div>
      <div
        class="form-large-plus flex items-center -mt-3"
        v-for="(concur, index) in personnelDetail.concurrents"
        :key="index"
      >
        <div class="form-mid-small px-1">
          <date-picker v-model="concur.date_start"></date-picker>
        </div>
        <div class="form-mid-small px-1">
          <date-picker v-model="concur.date_end"></date-picker>
        </div>
        <div class="form-x-small px-1">
          <input-department
            v-model="concur.department_id"
            class="long_select"
          ></input-department>
        </div>
        <div class="form-x-small px-1">
          <input-position
            v-model="concur.position_id"
            class="long_select"
          ></input-position>
        </div>
        <div class="form-x-small px-1">
          <input-positiontitle
            v-model="concur.job_title"
            class="long_select"
          ></input-positiontitle>
        </div>
        <div>
          <i
            class="fal fa-times icon-close"
            @click="deleteConcurrently(index)"
            style="margin-top: 0px"
          ></i>
        </div>
      </div>
      <div class="my-2">
        <i
          class="fal fa-plus-circle icon-plus"
          @click="createConcurrently()"
        ></i>
      </div>
    </div>
    <div class="bg-button-modal">
      <button class="button-modal" @click="handleUpdateConcurrently()">
        Cập nhật
      </button>
      <button class="button-close-modal" @click="handleCloseConcurrently()">
        Hủy bỏ
      </button>
    </div>
  </div>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import datePicker from "@/components/datePicker/datePicker.vue";
import InputDepartment from "@/components/constant/InputDepartment.vue";
import InputPosition from "@/components/constant/InputPosition.vue";
import InputPositiontitle from "@/components/constant/InputPositiontitle.vue";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import { computed } from "vue";
export default {
  props: {
    PersonnelDetail: {
      type: Object,
    },
    CloseConcurrently: {
      type: Function,
    },
  },
  data() {
    return {};
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
    const isLoading = ref(false);
    const handleCloseConcurrently = () => {
      props.CloseConcurrently();
    };
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("personnels/getPersonnelDetailAction", {
      id: props.PersonnelDetail.ID,
      EndTimeLoading: EndTimeLoading,
    });
    const personnelDetail = computed(
      () => store.state.personnels.personnelDetail
    );
    const listDepartments = computed(
      () => store.getters["departments/getAllDepartmentActive"]
    );
    const listPositions = computed(
      () => store.getters["positions/getAllPositionsActive"]
    );
    const listPositiontitles = computed(
      () => store.state.positiontitles.listPositiontitles
    );
    if (listDepartments.value?.length == 0) {
      store.dispatch("departments/getAllDepartmentsAction");
    }
    if (listPositions.value?.length == 0) {
      store.dispatch("positions/getAllPositionsAction", 500);
    }
    if (listPositiontitles.value?.length == 0) {
      store.dispatch("positiontitles/getAllPositiontitlesAction", 100);
    }
    // const Concurrently = ref([
    //   {
    //     personnel_id: personnelDetail.value.ID,
    //     date_start: null,
    //     date_end: null,
    //     department_id: null,
    //     position_id: null,
    //     job_title: null,
    //   },
    // ]);
    const deleteConcurrently = (index) => {
      personnelDetail.value.concurrents.splice(index, 1);
    };
    const createConcurrently = () => {
      const dataObj = {
        personnel_id: personnelDetail.value.ID,
        date_start: null,
        date_end: null,
        department_id: null,
        position_id: null,
        job_title: null,
      };
      let ArrConcurents = personnelDetail.value.concurrents;
      ArrConcurents.push(dataObj);
    };
    const handleUpdateConcurrently = () => {
      const data = {
        data_concurrent: personnelDetail.value.concurrents,
      };
      store.dispatch("personnels/UpdateConcurrentlyAction", {
        data,
        toast,
        handleCloseConcurrently,
      });
    };
    return {
      handleCloseConcurrently,
      isLoading,
      personnelDetail,
      listDepartments,
      listPositions,
      listPositiontitles,
      EndTimeLoading,
      deleteConcurrently,
      createConcurrently,
      handleUpdateConcurrently,
    };
  },
};
</script>

<style></style>
