<template>
  <div class="w-[600px]">
    <h1 class="header-modal">
      Export log vân tay
      <h1 class="font-bold"></h1>
    </h1>
    <div class="grid grid-cols-1 gap-1 p-[10px]">
      <div class="text-left">
        <label for="" class="form-group-label">Loại</label>
        <div class="mt-1">
          <v-select
            label="key"
            :options="typeMa"
            placeholder="Nhập loại chấm công"
            @update:modelValue="getValueType"
          >
            <template #option="{ value }">
              <div
                class="departInput"
                style="display: flex; align-items: baseline"
              >
                <strong>{{ value }}</strong>
              </div>
            </template>
            <template #selected-option="{ value }">
              <div
                class="departInput"
                style="display: flex; align-items: baseline"
              >
                <strong>{{ value }}</strong>
              </div>
            </template>
          </v-select>
        </div>
      </div>
      <div class="mt-2 text-left">
        <label for="" class="form-group-label">Từ ngày</label>
        <div class="mt-1">
          <date-picker v-model="dataDate.dateFrom" is-expanded></date-picker>
        </div>
      </div>
      <div class="mt-2 text-left">
        <label for="" class="form-group-label">Đến ngày</label>
        <div class="mt-1">
          <date-picker v-model="dataDate.dateTo" is-expanded></date-picker>
        </div>
      </div>
      <div class="mt-2 text-left">
        <label for="" class="form-group-label">Nhân sự</label>
        <div class="departInput mt-1">
          <div class="departInput placeholder:text-lg">
            <v-select
              label="name"
              :options="listPersonnels"
              :reduce="(valuePersonnel) => valuePersonnel.ID"
              @click="loadPersonnel()"
              placeholder="Nhập mã hoặc tên nhân sự"
              class="rounded-3xl"
              v-model="valuePersonnel"
              multiple
            >
              <template #option="{ code, name }">
                <div
                  class="departInput"
                  style="display: flex; align-items: baseline"
                >
                  <strong>{{ code }}-{{ name }}</strong>
                </div>
              </template>
              <template #selected-option="{ code, name }">
                <div
                  class="departInput"
                  style="display: flex; align-items: baseline"
                >
                  <strong>{{ code }}-{{ name }}</strong>
                </div>
              </template>
            </v-select>
          </div>
        </div>
      </div>
      <div class="mt-2 text-left">
        <label for="" class="form-group-label">Phòng ban</label>
        <div class="departInput mt-1">
          <div class="departInput placeholder:text-lg">
            <v-select
              label="title"
              :options="listDepartments"
              :reduce="(valueDepartment) => valueDepartment.ID"
              @click="loadDepartment()"
              placeholder="Nhập mã hoặc tên phòng ban"
              v-model="valueDepartment"
              class="rounded-3xl"
              multiple
            >
              <template #option="{ title }">
                <div
                  class="departInput"
                  style="display: flex; align-items: baseline"
                >
                  <strong>{{ title }}</strong>
                </div>
              </template>
              <template #selected-option="{ title }">
                <div
                  class="departInput"
                  style="display: flex; align-items: baseline"
                >
                  <strong>{{ title }}</strong>
                </div>
              </template>
            </v-select>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-button-modal">
      <button class="button-modal" @click="ExportLog()">Cập nhật</button>
      <button class="button-close-modal" @click="handleCloseModal">
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
import { useTimekeepAttendance } from "@/store/modules/timekeep/timekeepAttendance";
import { useToast } from "vue-toastification";
import { ref, reactive, computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { storeToRefs } from "pinia";
import { utils, writeFileXLSX } from "xlsx";
export default {
  components: {
    datePicker,
  },
  props: {
    userDetail: {
      type: Object,
    },
    closeModal: {
      type: Function,
    },
  },
  methods: {
    // formatType() {
    //   this.type.map((item) => {
    //     console.log(item.value);
    //     return item.value;
    //   });
    // },
  },

  setup(props) {
    const store = useStore();
    const dateNow = new Date("YYYY-MM-DD");
    const date_start = new Date().toISOString().substring(0, 10);
    const date_end = new Date().toISOString().substring(0, 10);
    const dataDate = reactive({
      dateFrom: date_start,
      dateTo: date_end,
    });
    const timekeepAttendance = useTimekeepAttendance();
    const toast = useToast();
    const isLoading = ref(false);
    const { listExportLog } = storeToRefs(timekeepAttendance);
    const loadDepartment = () => {
      store.dispatch("departments/getAllDepartmentsAction");
    };
    const loadPersonnel = () => {
      store.dispatch("personnels/getAllPersonnelNoPaginateAction");
    };
    const listDepartments = computed(
      () => store.state.departments.listDepartments
    );
    const listPersonnels = computed(
      () => store.state.personnels.listPersonnelNoPaginate
    );
    const valuePersonnel = ref([]);
    const valueDepartment = ref([]);
    const valueType = ref();
    // console.log(store.state);
    // console.log(listPersonnels.value);
    const typeMa = reactive([
      {
        key: "",
        value: "Tất cả",
      },
      {
        key: "approval-checkinout",
        value: "Đơn Check in/out",
      },
      {
        key: "MACHINE",
        value: "Máy chấm công",
      },

      {
        key: "MANUAL",
        value: "Thêm tay",
      },
      {
        key: "FULL_ATTENDANCE",
        value: "Tự động chấm công",
      },
      {
        key: "GPS",
        value: "Chấm công GPS",
      },
    ]);
    const listFurlough = reactive([
      {
        date: dateNow,
        time: "00:00",
        type: "MANUAL",
      },
    ]);
    // timekeepAttendance.GetLogManualAction(props.userDetail.personnel_id);
    const { oldManualLog } = storeToRefs(timekeepAttendance);
    // const addTagPersonnel = (newTag) => {
    //   const tag = {
    //     name: newTag,
    //     code: newTag,
    //   };
    //   console.log(tag);
    //   //   valuePersonnel.value.push(tag);
    // };

    const getValuePersonnel = (arr) => {
      arr.map((item) => valuePersonnel.value.push(item.ID));
      valuePersonnel.value = valuePersonnel.value.filter(
        (item, index) => valuePersonnel.value.indexOf(item) === index
      );
    };
    const getValueDepartment = (arr) => {
      arr.map((item) => valueDepartment.value.push(item.ID));
      valueDepartment.value = valueDepartment.value.filter(
        (item, index) => valueDepartment.value.indexOf(item) === index
      );
    };
    const getValueType = (arr) => {
      valueType.value = arr.key;
    };
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const removeFurlogh = (index) => {
      listFurlough.splice(index, 1);
    };
    const removeOldFurlogh = (index) => {
      oldManualLog.value.splice(index, 1);
    };
    const ExportLog = () => {
      let data = {
        department_ids: valueDepartment.value,
        personnel_ids: valuePersonnel.value,
        date_start: dataDate.dateFrom,
        date_end: dataDate.dateTo,
        from_type: valueType.value,
      };
      isLoading.value = true;
      timekeepAttendance.ExportLogAttendanceAction({
        data: data,
        handleCloseModal,
        EndTimeLoading,
        exportData,
      });
    };
    const exportData = () => {
      let Heading = [
        [
          "name",
          "department_title",
          "position_title",
          "personnel_code",
          "personnel_id",
          "time",
          "type",
          "application",
          "machine_code",
          "machine_ip",
          "data",
          // "Ngày áp dụng",
          // "Lý do",
          // "Loại đơn",
          // "Chi tiết ngày",
        ],
      ];
      console.log(listExportLog.value);
      const edata = listExportLog.value.map(function (obj) {
        return {
          name: obj.name,
          department_title: obj.department_title ? obj.department_title : "",
          position_title: obj.position_title ? obj.position_title : "",
          personnel_code: obj.personnel_code ? obj.personnel_code : "",
          personnel_id: obj.personnel_id ? obj.personnel_id : "",
          time: obj.time ? obj.time : "",
          type: obj.type ? obj.type : "",
          application: obj.application ? obj.application : "",
          machine_code: obj.machine_code ? obj.machine_code : "",
          machine_ip: obj.machine_ip ? obj.machine_ip : "",
          data: obj.data ? obj.data : "",
          // apply_date: obj.data ? obj.data.date : "",
          // reason: obj.data ? obj.data.reason : "",
          // app_sub_object: obj.app_sub_object ? obj.app_sub_object : "",
          // approval_detail: obj.data ? obj.data.approval_detail : "",
        };
      });
      const wb = utils.book_new();
      const ws = utils.json_to_sheet([]);
      utils.sheet_add_aoa(ws, Heading);
      utils.sheet_add_json(ws, edata, {
        origin: "A2",
        skipHeader: true,
      });
      utils.book_append_sheet(wb, ws, "Data");
      writeFileXLSX(
        wb,
        `${dataDate.dateFrom}` + `_${dataDate.dateTo}` + "_LogAttend.xlsx"
      );
    };
    // const createFurlough = (e) => {
    //   console.log(e);
    //   console.log(typeMa.key);
    // };
    const handleCloseModal = () => {
      props.closeModal();
    };
    const AddFingerPrint = () => {
      const attendance_data = {
        personnel_id: props.userDetail.personnel_id,
        personnel_code: props.userDetail.code,
        data: listFurlough,
      };
      isLoading.value = true;
      timekeepAttendance.AddLogManualAction({
        attendance_data,
        toast,
        EndTimeLoading: EndTimeLoading,
      });
    };
    return {
      typeMa,
      dateNow,
      isLoading,
      listFurlough,
      oldManualLog,
      listDepartments,
      listPersonnels,
      valueDepartment,
      valuePersonnel,
      valueType,
      listExportLog,
      date_start,
      date_end,
      dataDate,
      exportData,
      getValueType,
      getValuePersonnel,
      getValueDepartment,
      // addTagPersonnel,
      ExportLog,
      loadPersonnel,
      loadDepartment,
      EndTimeLoading,
      handleCloseModal,
      // createFurlough,
      removeFurlogh,
      AddFingerPrint,
      removeOldFurlogh,
    };
  },
};
</script>

<style></style>
