<template>
  <div class="w-[600px]">
    <h1 class="header-modal">Tính toán cho nhiều nhân sự</h1>
    <div class="text-left p-3">
      <div>
        <label for="" class="form-group-label"
          >Nhân sự <span class="text-red-600">*</span></label
        >
        <div>
          <v-select
            label="name"
            :options="listPersonnels"
            :reduce="(personnel) => personnel.ID"
            :filterable="false"
            @input="loadPersonnel($event)"
            @option:selected="changeInputPersonnel($event)"
            placeholder="Chọn nhân sự"
            multiple
          ></v-select>
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
      <button class="button-modal" @click="RecalcFurlough()">Cập nhật</button>
      <button class="button-close-modal" @click="handleCloseModal">
        Hủy bỏ
      </button>
    </div>
  </div>
</template>

<script>
import datePicker from "@/components/datePicker/datePicker.vue";
import { computed } from "@vue/runtime-core";
import { ref, reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import { useTimekeepFurlough } from "@/store/modules/timekeep/timekeepFurlough";
import _ from "lodash";
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
    // RecalcFurlough() {
    //   this.isLoading = true;
    //   const data = {
    //     date: this.dateParam,
    //     personnel_id: this.selectedPersonnel,
    //   };
    //   this.timekeepfurlough.RecalcFurloughMonthAction({
    //     data,
    //     toast: this.toast,
    //     EndTimeLoading: this.EndTimeLoading,
    //     handleCloseModal: this.handleCloseModal,
    //   });
    // },
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
    let selectedPersonnel = reactive([]);
    const loadPersonnel = _.debounce((event) => {
      store.dispatch("personnels/SearchPersonnelAction", event.target.value);
    }, 400);
    const listPersonnels = computed(
      () => store.state.personnels.SearchPersonnel
    );
    const changeInputPersonnel = (event) => {
      selectedPersonnel = event.map((item) => item.ID);
      // store.dispatch("personnels/SearchPersonnelAction", event.ID);
    };
    const handleCloseModal = () => {
      props.closeModal();
    };
    const RecalcFurlough = () => {
      isLoading.value = true;
      const data = {
        date: dateParam,
        personnel_id: selectedPersonnel,
      };
      timekeepfurlough.RecalcFurloughMonthAction({
        data,
        toast: toast,
        EndTimeLoading: EndTimeLoading,
        handleCloseModal: handleCloseModal,
      });
    };
    const dateParam = new Date().toISOString().substring(0, 10);

    const datePicked = computed(() => store.state.inputValue);

    return {
      dateNow,
      timekeepfurlough,
      listPersonnels,
      handleCloseModal,
      changeInputPersonnel,
      RecalcFurlough,
      selectedPersonnel,
      loadPersonnel,
      datePicked,
      dateParam,
      toast,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
