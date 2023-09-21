<template>
  <div class="w-[600px]">
    <h1 class="header-modal">Tính toán nhân sự {{ userDetail.name }}</h1>
    <div class="text-left p-3">
      <div>
        <label for="" class="form-group-label"
          >Nhân sự <span class="text-red-600">*</span></label
        >
        <div>
          <input
            type="text"
            name=""
            id=""
            class="disabledInput"
            disabled
            placeholder="YMD-XXXX"
            :value="userDetail.code + ' - ' + userDetail.name"
          />
        </div>
      </div>
      <div class="mt-2">
        <label for="" class="form-group-label"
          >Tính toán lại phép cho nhân sự kể từ ngày
          <span class="text-red-600">*</span>
        </label>
        <date-picker v-model="dateParam"></date-picker>
      </div>
    </div>
    <div class="bg-button-modal">
      <button class="button-modal" @click="RecalcFurlough(userDetail.id)">
        Cập nhật
      </button>
      <button class="button-close-modal" @click="handleCloseModal">
        Hủy bỏ
      </button>
    </div>
  </div>
</template>

<script>
import datePicker from "@/components/datePicker/datePicker.vue";
import { computed } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import { useTimekeepFurlough } from "@/store/modules/timekeep/timekeepFurlough";
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
    RecalcFurlough(id) {
      this.isLoading = true;
      const data = {
        date: this.dateParam,
        personnel_id: id,
      };
      this.timekeepfurlough.RecalcFurloughMonthAction({
        data,
        toast: this.toast,
        EndTimeLoading: this.EndTimeLoading,
        handleCloseModal: this.handleCloseModal,
      });
    },
  },
  setup(props) {
    const dateNow = new Date();
    const toast = useToast();
    const isLoading = ref(true);
    const store = useStore();
    const timekeepfurlough = useTimekeepFurlough();
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const handleCloseModal = () => {
      props.closeModal();
    };
    const dateParam = new Date();

    const datePicked = computed(() => store.state.inputValue);

    return {
      dateNow,
      timekeepfurlough,
      handleCloseModal,
      datePicked,
      dateParam,
      toast,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
