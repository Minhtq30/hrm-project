<template>
  <ul class="flex text-gray-400 py-3">
    <li
      class="px-4 py-[1px] hoverRouter"
      :class="{ activeRouter: checkRoute('ALL') }"
      v-if="checkRoute('ALL')"
    >
      <router-link to="/contract-personnel/contract_type=ALL"
        >Tất cả {{ formatCount(0) }}</router-link
      >
    </li>
    <li
      class="px-4 py-[1px] hoverRouter"
      v-for="(contract, index) in listContractTypes"
      :key="index"
      :class="{ activeRouter: checkRoute(`${contract.ID}`) }"
      v-show="checkRoute(`${contract.ID}`)"
    >
      <router-link :to="'/contract-personnel/contract_type=' + contract.ID"
        >{{ contract.title }} {{ formatCount(contract.ID) }}</router-link
      >
    </li>
    <li
      class="px-6 py-[1px] hover:bg-red-200 relative mr-2 rounded-lg cursor-pointer group"
    >
      <i class="fas fa-angle-down text-lg"></i>
      <div
        class="absolute z-10 left-0 top-8 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
      >
        <ul class="bg-white p-3 rounded-md">
          <li
            class="sub-item w-80"
            :class="{ activeRouter: checkRoute('ALL') }"
            v-show="!checkRoute('ALL')"
          >
            <router-link to="/contract-personnel/contract_type=ALL"
              >Tất cả {{ formatCount(0) }}</router-link
            >
          </li>
          <li
            v-for="(contract, index) in listContractTypes"
            :key="index"
            class="sub-item w-80"
            :class="{ activeRouter: checkRoute(`${contract.ID}`) }"
            v-show="!checkRoute(`${contract.ID}`)"
          >
            <router-link
              :to="'/contract-personnel/contract_type=' + contract.ID"
              >{{ contract.title }} {{ formatCount(contract.ID) }}</router-link
            >
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useContract } from "@/store/modules/contract/contracts";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const checkNav = ref(false);
    const isLoadingShow = ref();
    const contract = useContract();
    const { detailCount } = storeToRefs(contract);
    const EndTimeLoading = () => {
      isLoadingShow.value = false;
    };
    store.dispatch("contractTypes/GetAllContractTypeEndTimeLoadingAction", {
      EndTimeLoading,
    });
    const listContractTypes = computed(
      () => store.state.contractTypes.listContractTypes
    );
    const checkRoute = (index) => {
      if (index == route.params.id) {
        return true;
      } else {
        return false;
      }
    };
    const handleToContract = () => {
      checkNav.value = !checkNav.value;
    };
    const formatCount = (index) => {
      if (index == 0) {
        return "(" + detailCount.value[0] + ")";
      } else {
        return "(" + detailCount.value[index] + ")";
      }
    };
    return {
      detailCount,
      checkNav,
      isLoadingShow,
      EndTimeLoading,
      checkRoute,
      handleToContract,
      formatCount,
      listContractTypes,
    };
  },
};
</script>

<style></style>
