<template>
  <div class="w-[800px]">
    <h1 class="header-modal">cập nhật thủ tục tiếp nhận</h1>
    <div class="text-left p-4">
      <div class="grid grid-cols-6 gap-4">
        <div
          class="flex items-center mt-1 col-span-2"
          v-for="receive in listReceives"
          :key="receive.ID"
        >
          <div>
            <input
              type="checkbox"
              name=""
              :id="receive.ID"
              :value="receive"
              :checked="checkReceives(receive.ID)"
              @change="change($event)"
            />
          </div>
          <label
            :for="receive.ID"
            class="cursor-pointer ml-1 form-group-label"
            >{{ receive.title }}</label
          >
        </div>
      </div>
    </div>
    <div class="bg-button-modal">
      <button class="button-modal" @click="handleUpdateReceive()">
        Cập nhật
      </button>
      <button class="button-close-modal" @click="handleCloseReceive()">
        Hủy bỏ
      </button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  props: {
    PersonnelDetail: {
      type: Object,
    },
    CloseReceive: {
      type: Function,
    },
  },
  setup(props) {
    const store = useStore();
    const isLoadingShow = ref(false);
    const EndTimeLoading = () => {
      isLoadingShow.value = false;
    };
    const personnelDetail = ref(props.PersonnelDetail);
    const listReceives = computed(
      () => store.getters["categories/getAllReceivesActive"]
    );
    const personnel = computed(() => store.state.personnels.personnelDetail);
    if (listReceives.value?.length == 0) {
      store.dispatch("categories/getAllReceiveAction", 100);
    }
    if (personnelDetail.value?.receives == undefined) {
      store.dispatch("personnels/getPersonnelDetailAction", {
        id: personnelDetail.value.ID,
        EndTimeLoading: EndTimeLoading,
      });
      setTimeout(() => {
        personnelDetail.value = personnel.value;
      }, 800);
    }
    const handleCloseReceive = () => {
      props.CloseReceive();
    };
    const checkReceives = (id) => {
      if (personnelDetail.value.receives?.length) {
        const key = personnelDetail.value.receives.find(
          (item) => item.ID == id
        );
        if (key) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };
    const handleUpdateReceive = () => {
      console.log(personnelDetail.value.receives);
    };
    const change = (e) => {
      if (personnelDetail.value.receives != null) {
        const arr = personnelDetail.value.receives.map((item) => item.title);
        const key = personnelDetail.value.receives.find(
          (item) => item.ID == e.target._value.ID
        );
        if (key) {
          personnelDetail.value.receives.splice(arr.indexOf(key.title), 1);
        } else {
          personnelDetail.value.receives.push(e.target._value);
        }
      } else {
        personnelDetail.value.receives = [];
        personnelDetail.value.receives.push(e.target._value);
      }
    };
    return {
      listReceives,
      personnelDetail,
      isLoadingShow,
      personnel,
      handleCloseReceive,
      checkReceives,
      handleUpdateReceive,
      change,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
