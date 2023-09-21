<template>
  <div class="w-[600px]">
    <h1 class="header-modal">
      Chốt vân tay nhân sự
      <h1 class="font-bold">{{ userDetail.name }}-{{ userDetail.code }}</h1>
    </h1>
    <div class="text-left p-3 max-h-[600px] overflow-auto">
      <div class="grid grid-cols-12 gap-2">
        <label for="" class="form-group-label col-span-4">Ngày</label
        ><label for="" class="form-group-label col-span-6">Thời gian</label
        ><label for="" class="form-group-label col-span-2">Loại </label>
      </div>
      <div
        v-for="(item, index) in listFurloughAll"
        :key="index"
        class="flex items-center mt-1"
      >
        <div class="grid grid-cols-12 gap-2">
          <div class="col-span-4">
            <date-picker v-model="item.date"></date-picker>
          </div>
          <div class="col-span-2">
            <hour-picker v-model="item.time"></hour-picker>
          </div>
          <div class="col-span-6">
            <input
              type="text"
              name=""
              id=""
              class="disabledInput p-3 w-full"
              :value="formatType(item.type)"
              disabled
            />
          </div>
        </div>
        <span @click="removeOldFurlogh(index)"
          ><i class="fal fa-times icon-close" style="margin-top: 15px"></i
        ></span>
      </div>
      <div
        v-for="(item, index) in listFurlough"
        :key="index"
        class="flex items-center mt-1"
      >
        <div class="grid grid-cols-12 gap-2">
          <div class="col-span-4">
            <date-picker v-model="item.date"></date-picker>
          </div>
          <div class="col-span-2">
            <hour-picker v-model="item.time"></hour-picker>
          </div>
          <div class="col-span-6">
            <input
              type="text"
              name=""
              id=""
              class="disabledInput p-3 w-full"
              :value="formatType(item.type)"
              disabled
            />
          </div>
        </div>
        <span @click="removeFurlogh(index)"
          ><i class="fal fa-times icon-close" style="margin-top: 15px"></i
        ></span>
      </div>
      <span @click="createFurlough()"
        ><i class="fal fa-plus-circle icon-plus mt-2"></i
      ></span>
    </div>
    <div class="bg-button-modal">
      <button class="button-modal" @click="AddFingerPrint()">Cập nhật</button>
      <button class="button-close-modal" @click="handleCloseModal()">
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
import hourPicker from "@/components/datePicker/hourPicker.vue";
import { useTimekeepAttendance } from "@/store/modules/timekeep/timekeepAttendance";
import { useToast } from "vue-toastification";
import { ref, reactive } from "@vue/reactivity";
// import { storeToRefs } from "pinia";
export default {
  components: {
    datePicker,
    hourPicker,
  },
  props: {
    userDetail: {
      type: Object,
    },
    oldLog: {
      type: Object,
    },
    closeModal: {
      type: Function,
    },
  },
  methods: {
    formatType(type) {
      //chưa thêm type
      if (type == "MANUAL") {
        return "Chốt vân tay";
      }
    },
  },
  setup(props) {
    const dateNow = new Date().toISOString().substring(0, 10);
    const timekeepAttendance = useTimekeepAttendance();
    const toast = useToast();
    const isLoading = ref(false);
    let listFurlough = reactive([
      // {
      //   date: dateNow,
      //   time: "00:00",
      //   type: "MANUAL",
      // },
    ]);
    let listFurloughAll = reactive([]);
    timekeepAttendance.GetLogManualAction(props.userDetail.personnel_id);
    // const { oldManualLog } = storeToRefs(timekeepAttendance);
    const oldLogPersonnel = ref(props.oldLog);
    if (oldLogPersonnel.value.length > 0) {
      oldLogPersonnel.value.map((item) => {
        const dataOld = {
          date: item.detail_date,
          time: item.detail_time,
          type: item.from_type,
        };
        listFurloughAll.push(dataOld);
      });
    }
    const handleCloseModal = () => {
      props.closeModal();
    };
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const removeFurlogh = (index) => {
      listFurlough.splice(index, 1);
    };
    const removeOldFurlogh = (index) => {
      listFurloughAll.splice(index, 1);
    };
    const createFurlough = () => {
      const data = {
        date: dateNow,
        time: "00:00",
        type: "MANUAL",
      };
      listFurlough.push(data);
    };
    const AddFingerPrint = () => {
      let list = listFurloughAll.concat(listFurlough);
      const attendance_data = {
        personnel_id: props.userDetail.personnel_id,
        personnel_code: props.userDetail.code,
        data: list,
      };
      isLoading.value = true;
      timekeepAttendance.AddLogManualAction({
        attendance_data,
        toast,
        EndTimeLoading: EndTimeLoading,
      });
    };
    return {
      dateNow,
      isLoading,
      listFurlough,
      listFurloughAll,
      oldLogPersonnel,
      EndTimeLoading,
      handleCloseModal,
      createFurlough,
      removeFurlogh,
      AddFingerPrint,
      removeOldFurlogh,
    };
  },
};
</script>

<style></style>
