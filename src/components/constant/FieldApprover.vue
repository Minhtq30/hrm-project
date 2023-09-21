<template>
  <div v-for="(item, index) in ArrayApprover" :key="index" class="">
    <label for="" class="form-group-label px-1"
      >Người duyệt {{ index + 1 }}:</label
    >
    <div class="form-small px-1 flex items-center">
      <div class="grow">
        <!-- <selector-approver-view
          :final="arr"
          :Placeholder="'Tìm người duyệt'"
          :Num="index"
        >
          <template v-slot:selectedOption="{ item }">
            <div class="flex flex-col text-left">
              <div class="flex">
                <div class="font-medium">{{ item.code }}</div>
                <div>&nbsp;- {{ item.fullname }}</div>
              </div>
            </div>
          </template>
          <template v-slot:selected="{ item }">
            <div v-if="item == undefined" class="flex">
              <div></div>
            </div>
            <div v-else class="flex">
              <div class="font-medium">{{ item.code }}</div>
              <div>&nbsp;- {{ item.fullname }}</div>
            </div>
          </template>
        </selector-approver-view> -->
        <v-select
          label="fullname"
          :options="listPersonnelApprove"
          :reduce="(approval) => approval.ID"
          class="rounded-3xl"
          placeholder="Chọn người duyệt"
          v-model="arr[index]"
        >
          <template #option="{ code, fullname }">
            <div class="flex flex-col">
              <div class="font-medium">{{ code }} - {{ fullname }}</div>
              <div class="text-xs">{{ position?.title }}</div>
              <div class="text-xs">
                {{ department?.title }}
              </div>
            </div>
          </template>
          <template #selected-option="{ code, fullname }">
            <div style="display: flex; align-items: baseline">
              <strong>{{ code }}</strong>
              <em>-{{ fullname }}</em>
            </div>
          </template>
        </v-select>
      </div>
      <div @click="removeApprover(index)">
        <i class="fal fa-times icon-close" style="margin-top: 10px"></i>
      </div>
    </div>
  </div>
  <div>
    <span @click="addApprover()"
      ><i class="fal fa-plus-circle icon-plus"></i
    ></span>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
// import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
// import { useRoute } from "vue-router";
// import SelectorApproverView from "../selector/SelectorApproverView.vue";
import { useConfirmApproval } from "@/store/modules/approval/ConfirmApproval";
import { storeToRefs } from "pinia";
export default {
  components: {
    // SelectorApproverView,
  },
  props: {
    ArrayApprover: {
      type: Array,
    },
  },
  setup(props) {
    const confirm = useConfirmApproval();
    const arr = computed(() => props.ArrayApprover);
    const { listPersonnelApprove } = storeToRefs(confirm);
    confirm.getAllPersonnelApproveAction("", 1);
    // const total = useApprovalTotal();
    // const route = useRoute();
    // const isLoading = ref(true);
    // const { approvalDetail } = storeToRefs(total);
    // const EndTimeLoading = () => {
    //   isLoading.value = false;
    // };
    // total.ShowDetailApprovalAction({
    //   id: route.params.idApproval,
    //   EndTimeLoading,
    // });
    const addApprover = () => {
      const data = null;
      arr.value.push(data);
      console.log(arr.value);
    };
    const removeApprover = (index) => {
      arr.value.splice(index, 1);
    };
    return {
      // isLoading,
      arr,
      listPersonnelApprove,
      addApprover,
      removeApprover,
      // approvalDetail,
    };
  },
};
</script>

<style></style>
