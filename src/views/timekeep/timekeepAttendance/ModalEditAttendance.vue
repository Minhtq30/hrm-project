<template>
  <div class="w-[550px]">
    <h1 class="header-modal">
      Cập nhật công <b>{{ attendanceDetail.name }}</b
      >, ngày
      {{ formatDate(attendanceDetail?.detail) }}
    </h1>
    <div class="text-left p-4 h-[400px] overflow-y-auto format-scroll">
      <!-- <div class="flex items-center">
        <div class="check">
          <input
            id="check-LEAVE_NOREASON"
            type="checkbox"
            :true-value="1"
            :false-value="0"
            name="LEAVE_NOREASON"
            v-model="formData.leave_noreason"
          />
          <label for="check"></label>
        </div>
        <p class="form-group-label ml-1">Nghỉ không lý do</p>
      </div> -->
      <div class="grid grid-cols-12 gap-2 mt-2">
        <!-- Số lần đi muộn
        <div class="col-span-8">
          <input
            type="text"
            class="disabledInput p-3 w-full"
            value="Số lần đi muộn"
            disabled
            style="border-radius: 4px"
          />
        </div>
        <div class="col-span-4">
          <input
            type="number"
            class="form-control-input"
            placeholder="nhập số"
            v-model="formData.late"
          />
        </div>
        -->
        <!-- Số lần về sớm
        <div class="col-span-8">
          <input
            type="text"
            class="disabledInput p-3 w-full"
            value="Số lần về sớm"
            disabled
            style="border-radius: 4px"
          />
        </div>
        <div class="col-span-4">
          <input
            type="number"
            class="form-control-input"
            placeholder="nhập số"
            v-model="formData.soon"
          />
        </div>
        -->
        <div class="col-span-8">
          <input
            type="text"
            class="disabledInput p-3 w-full"
            value="Giờ vào"
            disabled
            style="border-radius: 4px"
          />
        </div>
        <div class="col-span-4">
          <input
            type="time"
            v-model="formData.checkin"
            class="form-control-input"
          />
        </div>

        <div class="col-span-8">
          <input
            type="text"
            class="disabledInput p-3 w-full"
            value="Giờ ra"
            disabled
            style="border-radius: 4px"
          />
        </div>
        <div class="col-span-4">
          <input
            type="time"
            v-model="formData.checkout"
            class="form-control-input"
          />
        </div>
        <!-- Số phút đi muộn -->
        <div class="col-span-8">
          <input
            type="text"
            class="disabledInput p-3 w-full"
            value="Số phút đi muộn"
            disabled
            style="border-radius: 4px"
          />
        </div>
        <div class="col-span-4">
          <input
            type="number"
            class="form-control-input"
            placeholder="nhập số"
            v-model="formData.result_minute_late"
          />
        </div>
        <!-- Số phút về sớm -->
        <div class="col-span-8">
          <input
            type="text"
            class="disabledInput p-3 w-full"
            value="Số phút về sớm"
            disabled
            style="border-radius: 4px"
          />
        </div>
        <div class="col-span-4">
          <input
            type="number"
            class="form-control-input"
            placeholder="nhập số"
            v-model="formData.result_minute_soon"
          />
        </div>
        <!-- Công làm việc trong ngày -->
        <div class="col-span-8">
          <input
            type="text"
            class="disabledInput p-3 w-full"
            value="Công làm việc trong ngày"
            disabled
            style="border-radius: 4px"
          />
        </div>
        <div class="col-span-4">
          <input
            type="number"
            class="form-control-input"
            placeholder="nhập số"
            v-model="formData.number_work_real_in_day"
          />
        </div>
        <!-- Giờ làm việc thực tính -->
        <div class="col-span-8">
          <input
            type="text"
            class="disabledInput p-3 w-full"
            value="Giờ làm việc thực tính"
            disabled
            style="border-radius: 4px"
          />
        </div>
        <div class="col-span-4">
          <input
            type="number"
            class="form-control-input"
            placeholder="nhập số"
            v-model="formData.number_time_work_real_in_day_no_use_round"
          />
        </div>
        <!-- Công của ca làm việc
        <div class="col-span-8">
          <input
            type="text"
            class="disabledInput p-3 w-full"
            value="Công của ca làm việc"
            disabled
            style="border-radius: 4px"
          />
        </div>
        <div class="col-span-4">
          <input
            type="number"
            class="form-control-input"
            placeholder="nhập số"
            v-model="formData.time_work_in_day"
          />
        </div>
        -->
        <!-- Công làm thêm trong ngày -->
        <div class="col-span-8">
          <input
            type="text"
            class="disabledInput p-3 w-full"
            value="Công làm thêm trong ngày"
            disabled
            style="border-radius: 4px"
          />
        </div>
        <div class="col-span-4">
          <input
            type="number"
            class="form-control-input"
            placeholder="nhập số"
            v-model="formData.total_overtime_in_day"
          />
        </div>
        <!-- Công làm thêm ban đêm
        <div class="col-span-8">
          <input
            type="text"
            class="disabledInput p-3 w-full"
            value="Công làm thêm ban đêm"
            disabled
            style="border-radius: 4px"
          />
        </div>
        <div class="col-span-4">
          <input
            type="number"
            class="form-control-input"
            placeholder="nhập số"
            v-model="formData.total_overtime_in_night"
          />
        </div>
        -->
        <!-- Giờ làm thêm trong ngày lễ
        <div class="col-span-8">
          <input
            type="text"
            class="disabledInput p-3 w-full"
            value="Giờ làm thêm trong ngày lễ"
            disabled
            style="border-radius: 4px"
          />
        </div>
        <div class="col-span-4">
          <input
            type="number"
            class="form-control-input"
            placeholder="nhập số"
            v-model="formData.hour_overtime_holiday"
          />
        </div>
        -->
        <!-- Giờ làm thêm trong ngày nghỉ tuần -->
        <div class="col-span-8">
          <input
            type="text"
            class="disabledInput p-3 w-full"
            value="Giờ làm thêm trong ngày nghỉ tuần"
            disabled
            style="border-radius: 4px"
          />
        </div>
        <div class="col-span-4">
          <input
            type="number"
            class="form-control-input"
            placeholder="nhập số"
            v-model="formData.total_hour_overtime_in_weekoff"
          />
        </div>
        <!-- Giờ làm thêm trong ngày đi làm -->
        <div class="col-span-8">
          <input
            type="text"
            class="disabledInput p-3 w-full"
            value="Giờ làm thêm trong ngày"
            disabled
            style="border-radius: 4px"
          />
        </div>
        <div class="col-span-4">
          <input
            type="number"
            class="form-control-input"
            placeholder="nhập số"
            v-model="formData.total_hour_overtime_in_day"
          />
        </div>
        <!-- Công ăn
        <div class="col-span-8">
          <input
            type="text"
            class="disabledInput p-3 w-full"
            value="Công ăn"
            disabled
            style="border-radius: 4px"
          />
        </div>
        <div class="col-span-4">
          <input
            type="number"
            class="form-control-input"
            placeholder="nhập số"
            v-model="formData.meal_day"
          />
        </div>
        -->
        <!-- Tiền phạt đi muộn -->
        <div class="col-span-8">
          <input
            type="text"
            class="disabledInput p-3 w-full"
            value="Tiền phạt đi muộn"
            disabled
            style="border-radius: 4px"
          />
        </div>
        <div class="col-span-4">
          <input
            type="number"
            class="form-control-input"
            placeholder="nhập số"
            v-model="formData.result_money_late"
          />
        </div>
        <!-- Tiền phạt đi sớm -->
        <div class="col-span-8">
          <input
            type="text"
            class="disabledInput p-3 w-full"
            value="Tiền phạt về sớm"
            disabled
            style="border-radius: 4px"
          />
        </div>
        <div class="col-span-4">
          <input
            type="number"
            class="form-control-input"
            placeholder="nhập số"
            v-model="formData.result_money_soon"
          />
        </div>
        <!-- Tiền phạt quên check in/out
        <div class="col-span-8">
          <input
            type="text"
            class="disabledInput p-3 w-full"
            value="Tiền phạt quên check in/out"
            disabled
            style="border-radius: 4px"
          />
        </div>
        <div class="col-span-4">
          <input
            type="number"
            class="form-control-input"
            placeholder="nhập số"
            v-model="formData.fine_no_checkinout"
          />
        </div>
        -->
        <!-- Công phạt đi muộn -->
        <div class="col-span-8">
          <input
            type="text"
            class="disabledInput p-3 w-full"
            value="Công phạt đi muộn"
            disabled
            style="border-radius: 4px"
          />
        </div>
        <div class="col-span-4">
          <input
            type="number"
            class="form-control-input"
            placeholder="nhập số"
            v-model="formData.result_punish_late"
          />
        </div>
        <!-- Công phạt về sớm -->
        <div class="col-span-8">
          <input
            type="text"
            class="disabledInput p-3 w-full"
            value="Công phạt về sớm"
            disabled
            style="border-radius: 4px"
          />
        </div>
        <div class="col-span-4">
          <input
            type="number"
            class="form-control-input"
            placeholder="nhập số"
            v-model="formData.result_punish_soon"
          />
        </div>
      </div>
      <div class="mt-2">
        <label for="" class="form-group-label">Ghi chú</label>
        <div class="">
          <textarea
            cols="30"
            rows="2"
            class="form-control-input"
            v-model="formData.note"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="bg-button-modal justify-between">
      <div>
        <button class="button-modal" @click="handleUpdateWork()">
          Cập nhật
        </button>
        <button class="button-close-modal" @click="CloseEdit()">Hủy bỏ</button>
      </div>
      <button
        class="button-modal button-danger text-red-600"
        @click="handleDeleteManualWork()"
      >
        Xóa dữ liệu tùy chỉnh
      </button>
    </div>
    <ConfirmDialog></ConfirmDialog>
    <Dialog
      v-model:visible="dialog_visible"
      modal
      header=""
      :closable="false"
      :style="{ width: '250px' }"
    >
      <div class="d-flex flex items-center justify-start">
        <ProgressSpinner
          label="Đang cập nhật dữ liệu, vui lòng chờ..."
          style="width: 30px; height: 30px; margin-left: 0; margin-right: 5px"
          class="mr-2"
        />
        <span>Đang cập nhật dữ liệu, vui lòng chờ...</span>
      </div>
      <!--
      <ProgressBar :value="progress_value"></ProgressBar>
      -->
      <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
    </Dialog>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { FormatDate } from "@/constants/FormatAll";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

// import Calendar from "primevue/calendar";
import ConfirmDialog from "primevue/confirmdialog";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import ProgressBar from "primevue/progressbar";
import ProgressSpinner from "primevue/progressspinner";
import { useConfirm } from "primevue/useconfirm";

const formData = reactive({
  personnel_id: 0,
  detail: "", // Ngày cần sửa
  // late: 0, // Số lần đi muộn
  // soon: 0, // Số lần về sớm
  // leave_noreason: 0, // Nghỉ ko lý do
  // total_overtime_in_night: 0, // Công làm thêm ban đêm
  // hour_overtime_holiday: 0, // Giờ làm thêm Lễ
  // hour_overtime_shiftday: 0, // Giờ làm thêm ngày đi làm
  // fine_no_checkinout: 0, // Phạt ko checkin/out
  // workday_late: 0, // Công phạt đi muộn
  // workday_soon: 0, // Công phạt về sớm
  //
  number_work_real_in_day: 0, // Công được tính trong ngày
  number_time_work_real_in_day_no_use_round: 0, // Giờ làm việc thực tính
  // time_work_in_day: 0, // Công của ca làm việc
  total_overtime_in_day: 0, // Công làm thêm trong ngày
  // meal_day: 0, // Công ăn
  //sửa checkin
  checkin: "",
  //sửa checkout
  checkout: "",
  //sửa thời gian đi muộn
  result_minute_late: 0,
  //sửa thời gian về sớm
  result_minute_soon: 0,
  //sửa số tiền phạt đi muộn
  result_money_late: 0,
  //sửa số tiền phạt về sớm
  result_money_soon: 0,
  //sửa phạt công đi muộn
  result_punish_late: 0,
  //sửa phạt công về sớm
  result_punish_soon: 0,
  //sửa số giờ làm thêm trong ngày
  total_hour_overtime_in_day: 0,
  //sửa số giờ làm thêm trong ngày nghỉ
  total_hour_overtime_in_weekoff: 0,
});

export default {
  components: {
    ConfirmDialog,
    Dialog,
    ProgressBar,
    ProgressSpinner,
    // Calendar,
  },
  props: {
    AttendanceDetail: {
      type: Object,
    },
    closeEdit: {
      type: Function,
    },
  },
  methods: {
    formatDate(date) {
      return FormatDate(date);
    },
  },
  setup(props) {
    const dialog_visible = ref(false);
    const progress_value = ref(0);
    const interval = ref();
    const store = useStore();
    const toast = useToast();
    const confirm = useConfirm();
    const attendanceDetail = ref(props.AttendanceDetail);

    let cin = attendanceDetail.value?.time_checkin;
    let cout = attendanceDetail.value?.time_checkout;
    cin = cin ? cin.match(/\d+:\d+/g) : "";
    cout = cout ? cout.match(/\d+:\d+/g) : "";
    formData.checkin = cin[0] ?? "";
    formData.checkout = cout[0] ?? "";
    formData.result_minute_late =
      attendanceDetail.value?.checktime?.minute_late;
    formData.result_minute_soon =
      attendanceDetail.value?.checktime?.minute_soon;
    formData.result_money_late = attendanceDetail.value?.checktime?.money_late;
    formData.result_money_soon = attendanceDetail.value?.checktime?.money_soon;
    formData.result_punish_late =
      attendanceDetail.value?.checktime?.punish_late;
    formData.result_punish_soon =
      attendanceDetail.value?.checktime?.punish_soon;
    formData.total_hour_overtime_in_day =
      attendanceDetail.value?.checktime?.total_hour_overtime_in_day;
    formData.total_overtime_in_day =
      attendanceDetail.value?.checktime?.total_overtime_in_day;
    formData.total_hour_overtime_in_weekoff =
      attendanceDetail.value?.checktime?.total_hour_overtime_in_weekoff ?? 0;

    for (let key in attendanceDetail.value) {
      if (key in formData) {
        formData[key] = attendanceDetail.value[key];
      }
    }
    const CloseEdit = () => {
      props.closeEdit();
    };

    const handleUpdateWork = () => {
      showDialog();
      store.dispatch("personnels/UpdatePersonnelWorkDay", {
        data: formData,
        props: props,
        toast: toast,
      });
    };
    const handleDeleteManualWork = () => {
      let msg = ref("");
      let header = ref("");
      msg.value = "Xác nhận xóa dữ liệu tùy chỉnh?";
      header.value = "Xác nhận";
      confirm.require({
        message: msg.value,
        header: header.value,
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Xác nhận",
        rejectLabel: "Hủy",
        acceptClass: "",
        accept: () => {
          store.dispatch("personnels/DeleteManualPersonnelWorkDay", {
            data: {
              personnel_id: formData.personnel_id,
              detail: formData.detail,
            },
            props: props,
            toast: toast,
          });
        },
        reject: () => {
          console.log("Reject");
        },
      });
    };

    const startProgress = () => {
      interval.value = setInterval(() => {
        let newValue =
          progress_value.value + Math.floor(Math.random() * 10) + 1;
        if (newValue >= 100) {
          newValue = 100;
          // endProgress();
        }
        progress_value.value = newValue;
      }, 2000);
    };
    const endProgress = () => {
      clearInterval(interval.value);
      interval.value = null;
      dialog_visible.value = false;
    };

    const showDialog = () => {
      dialog_visible.value = true;
      startProgress();
    };

    return {
      attendanceDetail,
      CloseEdit,
      formData,
      handleUpdateWork,

      dialog_visible,
      showDialog,
      endProgress,
      startProgress,
      toast,
      handleDeleteManualWork,
      ConfirmDialog,
      Button,
      Dialog,
      ProgressBar,
      ProgressSpinner,
    };
  },
};
</script>

<style></style>
