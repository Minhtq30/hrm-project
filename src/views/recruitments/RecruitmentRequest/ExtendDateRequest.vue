<template>
  <div class="w-[500px]">
    <h1 class="header-modal">gia hạn đề xuất tuyển dụng</h1>
    <div class="text-left p-2">
      <div class="grid grid-cols-2 gap-2">
        <div>
          <label for="" class="form-group-label">Hạn tuyển cũ</label>
          <div>
            <date-picker
              v-model="requestDetail.deadline"
              :disable="true"
            ></date-picker>
          </div>
        </div>
        <div>
          <label for="" class="form-group-label">Hạn tuyển mới</label>
          <div>
            <date-picker v-model="requestDetail.deadline"></date-picker>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-button-modal">
      <button class="button-modal">Cập nhật</button>
      <button class="button-close-modal" @click="handleCloseExtend()">
        Hủy bỏ
      </button>
    </div>
  </div>
</template>

<script>
import datePicker from "@/components/datePicker/datePicker.vue";
import { ref } from "@vue/reactivity";
export default {
  props: {
    RequestDetail: {
      type: Object,
    },
    CloseExtend: {
      type: Function,
    },
  },
  components: {
    datePicker,
  },
  setup(props) {
    const requestDetail = ref(props.RequestDetail);
    const handleCloseExtend = () => {
      props.CloseExtend();
    };
    return { requestDetail, handleCloseExtend };
  },
};
</script>

<style></style>
