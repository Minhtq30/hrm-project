<template>
  <div class="w-[500px]">
    <h1 class="header-modal">Gia hạn tuyển</h1>
    <div class="text-left p-2">
      <div class="grid grid-cols-2 gap-2">
        <div>
          <label for="" class="form-group-label">Hạn tuyển</label>
          <div>
            <date-picker v-model="campaignDetail.date_end"></date-picker>
          </div>
        </div>
        <div>
          <label for="" class="form-group-label">Hạn đề xuất TD</label>
          <div>
            <date-picker
              v-model="campaignDetail.deadline"
              :disable="true"
            ></date-picker>
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
    CampaignDetail: {
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
    const campaignDetail = ref(props.CampaignDetail);
    const handleCloseExtend = () => {
      props.CloseExtend();
    };
    return {
      campaignDetail,
      handleCloseExtend,
    };
  },
};
</script>

<style></style>
