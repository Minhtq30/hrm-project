<template>
  <div class="w-[600px]">
    <h1 class="header-modal">cập nhật trạng thái công việc</h1>
    <div class="text-left p-4">
      <div class="grid grid-cols-12 gap-2">
        <div class="col-span-6">
          <label for="" class="form-group-label">Trạng thái</label>
          <div>
            <v-select
              label="title"
              :options="StatusWork"
              :reduce="(stt) => stt.value"
              placeholder="Chọn lý do"
              :searchable="false"
              v-model="personnelDetail.job_status"
            ></v-select>
          </div>
        </div>
        <div class="col-span-3">
          <label for="" class="form-group-label">Từ ngày</label>
          <div>
            <date-picker v-model="date"></date-picker>
          </div>
        </div>
        <div class="col-span-3">
          <label for="" class="form-group-label">Đến ngày</label>
          <div>
            <date-picker v-model="date"></date-picker>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-button-modal">
      <button class="button-modal" @click="handleUpdateWork()">Cập nhật</button>
      <button class="button-close-modal" @click="handleCloseStatus()">
        Hủy bỏ
      </button>
    </div>
  </div>
</template>

<script>
import datePicker from "@/components/datePicker/datePicker.vue";
import { ref } from "@vue/reactivity";
export default {
  components: {
    datePicker,
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
  props: {
    PersonnelDetail: {
      type: Object,
    },
    CloseStatus: {
      type: Function,
    },
  },
  setup(props) {
    const personnelDetail = ref(props.PersonnelDetail);
    const date = new Date();
    const handleCloseStatus = () => {
      props.CloseStatus();
    };
    return {
      handleCloseStatus,
      personnelDetail,
      date,
    };
  },
};
</script>

<style></style>
