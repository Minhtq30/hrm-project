<template>
  <div class="w-[600px]">
    <h1 class="header-modal">Sửa phép {{ userDetail.name }}</h1>
    <div class="text-left p-3">
      <div class="grid grid-cols-12 gap-2">
        <label for="" class="form-group-label col-span-4">Từ ngày</label
        ><label for="" class="form-group-label col-span-6">Loại phép</label
        ><label for="" class="form-group-label col-span-2">Số lượng </label>
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
          <div class="col-span-6">
            <v-select v-model="item.type"></v-select>
          </div>
          <div class="col-span-2">
            <input
              type="number"
              class="form-control-input"
              v-model="item.count"
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
      <button class="button-modal" @click="CreateAllowance()">Cập nhật</button>
      <button class="button-close-modal" @click="handleCloseModal">
        Hủy bỏ
      </button>
    </div>
  </div>
</template>

<script>
import datePicker from "@/components/datePicker/datePicker.vue";
import { reactive } from "@vue/reactivity";
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
  setup(props) {
    const dateNow = new Date();
    const listFurlough = reactive([
      {
        date: dateNow,
        type: null,
        count: 0,
      },
    ]);
    const handleCloseModal = () => {
      props.closeModal();
    };
    const removeFurlogh = (index) => {
      listFurlough.splice(index, 1);
    };
    const createFurlough = () => {
      const data = {
        date: dateNow,
        type: null,
        count: 0,
      };
      listFurlough.push(data);
    };
    return {
      dateNow,
      listFurlough,
      handleCloseModal,
      createFurlough,
      removeFurlogh,
    };
  },
};
</script>

<style></style>
