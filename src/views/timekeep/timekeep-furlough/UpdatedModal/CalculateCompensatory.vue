<template>
  <div class="w-[900px]">
    <h1 class="header-modal">Thêm lịch sử nghỉ bù</h1>
    <div class="text-left p-3">
      <div class="grid grid-cols-12 gap-2">
        <label for="" class="form-group-label col-span-2">Kiểu</label
        ><label for="" class="form-group-label col-span-4">Lý do</label
        ><label for="" class="form-group-label col-span-1">Số giờ</label>
        <label for="" class="form-group-label col-span-2">Ngày tính</label>
        <label for="" class="form-group-label col-span-3">Ghi chú</label>
      </div>
      <div
        v-for="(item, index) in CalculateCompensatory"
        :key="index"
        class="flex items-center mt-1"
      >
        <div class="grid grid-cols-12 gap-2">
          <div class="col-span-2">
            <v-select
              label="title"
              :options="type"
              :reduce="(ty) => ty.value"
              placeholder="Chọn kiểu"
              :searchable="false"
              v-model="item.action"
            ></v-select>
          </div>
          <div class="col-span-4">
            <v-select
              label="title"
              :options="reason"
              :reduce="(ty) => ty.value"
              placeholder="Chọn lý do"
              :searchable="false"
              v-model="item.reason"
            ></v-select>
          </div>
          <div class="col-span-1">
            <input
              type="number"
              class="form-control-input"
              placeholder="Nhập số giờ"
              v-model="item.amount_hour"
            />
          </div>
          <div class="col-span-2">
            <date-picker v-model="item.date"></date-picker>
          </div>
          <div class="col-span-3">
            <input
              type="text"
              class="form-control-input"
              v-model="item.desc"
              placeholder="Ghi chú"
            />
          </div>
        </div>
        <span @click="removeCompensatory(index)"
          ><i class="fal fa-times icon-close" style="margin-top: 15px"></i
        ></span>
      </div>
      <span @click="createCompensatory()"
        ><i class="fal fa-plus-circle icon-plus mt-2"></i
      ></span>
    </div>
    <div class="bg-button-modal">
      <button class="button-modal" @click="UpdateCompensatory()">
        Cập nhật
      </button>
      <button class="button-close-modal" @click="handleCloseModal">
        Hủy bỏ
      </button>
    </div>
  </div>
  <loading-overlay
    :isLoading="isLoadingShow"
    :handleEndLoading="EndTimeLoadingShow"
  ></loading-overlay>
</template>

<script>
import datePicker from "@/components/datePicker/datePicker.vue";
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
export default {
  data() {
    return {
      type: [
        { value: "ADD", title: "Tăng" },
        { value: "USE", title: "Sử dụng" },
      ],
      reason: [
        { value: "MANUAL", title: "Thủ công" },
        { value: "ATTENDANCE", title: "Chấm công" },
        { value: "LEAVE", title: "Đơn nghỉ bù" },
        { value: "ABSENCE", title: "Đơn vắng mặt" },
        { value: "OVERTIME", title: "Đơn làm thêm" },
        { value: "SHIFTMORE", title: "Đơn tăng ca" },
        { value: "OTHER", title: "Khác" },
      ],
    };
  },
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
  setup(props) {
    const store = useStore();
    const toast = useToast();
    const isLoadingShow = ref(false);
    const dateNow = new Date();
    const EndTimeLoadingShow = () => {
      isLoadingShow.value = false;
    };
    const CalculateCompensatory = reactive([
      {
        date: null,
        action: null,
        reason: null,
        amount_hour: null,
        desc: null,
      },
    ]);
    const removeCompensatory = (index) => {
      CalculateCompensatory.splice(index, 1);
    };
    const createCompensatory = () => {
      const data = {
        date: null,
        action: null,
        reason: null,
        amount_hour: null,
        desc: null,
      };
      CalculateCompensatory.push(data);
    };
    const handleCloseModal = () => {
      props.closeModal();
    };
    const UpdateCompensatory = () => {
      isLoadingShow.value = true;
      const data = {
        personnel_id: props.userDetail.id,
        data: CalculateCompensatory,
      };
      store.dispatch("timekeepCompensatory/UpdateCompensatoryPersonnelAction", {
        data: data,
        toast,
        handleCloseModal,
        EndTimeLoading: EndTimeLoadingShow,
      });
    };
    return {
      dateNow,
      handleCloseModal,
      CalculateCompensatory,
      removeCompensatory,
      createCompensatory,
      UpdateCompensatory,
      isLoadingShow,
      EndTimeLoadingShow,
    };
  },
};
</script>

<style></style>
