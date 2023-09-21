<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-asset></sidebar-asset>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <div class="flex grow">
          <div class="flex items-center">
            <asset-add-events-vue></asset-add-events-vue>
            <p class="text-base">Sửa phiếu cấp phát tài sản</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <div class="w-full h-full">
      <div class="px-3 w-[700px]">
        <div class="grid grid-cols-1 gap-1 items-start">
          <div class="">
            <div class="border-b-[1px] pt-4 pb-1 text-left">
              <button v-on:click="isHidden = !isHidden">
                <span v-if="isHidden"
                  ><i class="" title="Click để mở rộng/thu gọn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="svg-rotate h-5 w-5 inline-block"
                      style="color: var(--color-primary)"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke-width="0"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg> </i
                ></span>
                <span v-if="!isHidden"
                  ><i class="" title="Click để mở rộng/thu gọn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 inline-block"
                      style="color: var(--color-primary)"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke-width="0"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      /></svg></i
                ></span>
              </button>
              <span class="font-medium" style="color: var(--color-primary)"
                >Thông tin cấp phát</span
              >
            </div>
          </div>
          <div class="mt-1" v-if="!isHidden">
            <div class="pl-2">
              <div class="pt-[12px]">
                <div class="grid grid-cols-2 gap-2">
                  <div class="mt-2 text-left">
                    <label for="" class="form-group-label"
                      >Ngày thực hiện</label
                    >
                    <div>
                      <date-picker
                        v-model="assetTicket.date_assign"
                      ></date-picker>
                    </div>
                  </div>
                  <div class="mt-2 text-left">
                    <label for="" class="form-group-label"
                      >Người cấp<span class="text-red-600"> *</span></label
                    >
                    <div>
                      <div class="placeholder:text-lg">
                        <v-select
                          label="name"
                          :options="listPerson"
                          :reduce="(personAssign) => personAssign.ID"
                          @input="searchPerson"
                          placeholder="Nhập mã hoặc tên"
                          class="rounded-3xl"
                          v-model="assetTicket.user_assignment"
                        >
                          <template #option="{ work_place_current, name }">
                            <div style="display: flex; align-items: baseline">
                              <strong>{{ name }}</strong>
                              <em style="margin-left: 0.5rem"
                                >- {{ work_place_current?.title }}</em
                              >
                            </div>
                          </template>
                        </v-select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <div class="mt-2 text-left">
                    <label for="" class="form-group-label"
                      >Người nhận<span class="text-red-600"> *</span></label
                    >
                    <div class="mt-2">
                      <div class="placeholder:text-lg">
                        <v-select
                          label="name"
                          :options="listPerson2"
                          :reduce="(listPerson) => listPerson.ID"
                          @input="searchPerson2"
                          @option:selected="changeInputPerson($event)"
                          placeholder="Nhập mã hoặc tên"
                          class="rounded-3xl"
                          v-model="assetTicket.user_assign"
                        >
                          <template #option="{ department, name }">
                            <div style="display: flex; align-items: baseline">
                              <strong>{{ name }}</strong>
                              <em style="margin-left: 0.5rem"
                                >- {{ department?.title }}</em
                              >
                            </div>
                          </template>
                        </v-select>
                      </div>
                    </div>
                  </div>
                  <div class="mt-2 text-left">
                    <label for="" class="form-group-label">Phòng ban</label>
                    <div class="mt-2">
                      <input
                        type="text"
                        class="disabledInput"
                        disabled
                        placeholder=""
                        title=""
                        v-model="assetTicket.user_department"
                      />
                    </div>
                  </div>
                </div>
                <!-- <div class="grid grid-cols-1 gap-2">
                  <div class="mt-2 text-left">
                    <label for="" class="form-group-label"
                      >Vị trí<span class="text-red-600"> *</span></label
                    >
                    <div class="mt-2">
                      <input
                        type="text"
                        class="form-control-input"
                        placeholder=""
                        title=""
                        v-model="title"
                      />
                    </div>
                  </div>
                </div> -->
                <div class="grid grid-cols-1">
                  <div class="mt-2 text-left">
                    <label for="" class="form-group-label">Ghi chú</label>
                    <div class="mt-2">
                      <textarea
                        class="form-control-input"
                        placeholder=""
                        title=""
                        v-model="assetTicket.description"
                        rows="3"
                      >
                      </textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="">
              <div class="py-4">
                <div class="">
                  <div class="border-b-[1px] pt-4 pb-1 text-left">
                    <button v-on:click="isHidden1 = !isHidden1">
                      <span v-if="isHidden1"
                        ><i class="" title="Click để mở rộng/thu gọn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="svg-rotate h-5 w-5 inline-block"
                            style="color: var(--color-primary)"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke-width="0"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            />
                          </svg> </i
                      ></span>
                      <span v-if="!isHidden1"
                        ><i class="" title="Click để mở rộng/thu gọn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 inline-block"
                            style="color: var(--color-primary)"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke-width="0"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            /></svg></i
                      ></span>
                    </button>
                    <span
                      class="font-medium"
                      style="color: var(--color-primary)"
                      >Thông tin tài sản</span
                    >
                  </div>
                </div>
                <div class="pl-2" v-if="!isHidden1">
                  <div class="flex">
                    <div class="grid grid-cols-2 gap-2 grow">
                      <div class="mt-2 text-left hidden">
                        <label for="" class="form-group-label"
                          >ID<span class="text-red-600"> *</span></label
                        >
                      </div>
                      <div class="mt-2 text-left">
                        <label for="" class="form-group-label"
                          >Mã tài sản<span class="text-red-600"> *</span></label
                        >
                      </div>
                      <div class="mt-2 text-left">
                        <label for="" class="form-group-label"
                          >Tên tài sản</label
                        >
                      </div>
                      <!-- <div class="mt-2 text-left">
                        <label for="" class="form-group-label">Loại</label>
                      </div> -->
                      <!-- <div class="mt-2 text-left">
                        <label for="" class="form-group-label"
                          >Tình trạng</label
                        >
                      </div> -->
                    </div>
                  </div>
                  <div
                    v-for="(item, index) in assetTicket.assets"
                    :key="index"
                    class="w-full relative"
                  >
                    <div class="grid grid-cols-2 gap-2 mt-2 grow">
                      <div class="hidden">
                        <input
                          type="text"
                          class="disabledInput"
                          disabled
                          placeholder=""
                          title=""
                          v-model="item.id"
                        />
                      </div>
                      <div class="placeholder:text-lg">
                        <v-select
                          label="code"
                          :options="listAsset"
                          :reduce="(asset) => asset.code"
                          @input="searchAssetTicket($event)"
                          @option:selected="changeInputAsset($event, index)"
                          placeholder="Nhập mã hoặc tên tài sản"
                          class="rounded-3xl"
                          v-model="item.code"
                        ></v-select>
                      </div>
                      <div class="">
                        <input
                          type="text"
                          class="disabledInput"
                          disabled
                          placeholder="Tên tài sản"
                          title=""
                          v-model="item.name"
                        />
                      </div>
                    </div>
                    <span
                      @click="removeJsonAsset(index)"
                      class="absolute"
                      style="right: -20px; top: 13px"
                    >
                      <i class="fal fa-times icon-close"></i>
                    </span>
                  </div>
                  <div class="my-2 text-left">
                    <i
                      class="fal fa-plus-circle icon-plus"
                      @click="addJsonAsset()"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="my-4 text-left" v-if="isHidden">
            <span class="text-gray-400 font-style: italic px-4"
              >Các trường đánh dấu <span class="text-red-600">*</span> là các
              trường bắt buộc</span
            >
          </div>
        </div>
      </div>
    </div>
    <template v-slot:sub_footer>
      <div
        class="flex bg-gray-100 sticky bottom-0 right-0 left-0 z-10 pb-0 h-[54px]"
      >
        <div class="flex text-left w-full py-[9px] px-2">
          <button
            class="px-4 rounded-[4px] text-white font-medium mr-4"
            style="background-color: var(--color-primary)"
            @click="updateAssetAssign()"
          >
            Cập nhật
          </button>
          <button
            class="px-4 rounded-[4px] font-medium hover:bg-slate-200"
            style="
              border: 1px solid var(--color-primary);
              color: var(--color-primary);
            "
            @click="this.$router.push({ path: '/asset', name: 'Asset' })"
          >
            Hủy bỏ
          </button>
        </div>
      </div></template
    >
  </person-layout>
</template>
<script>
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarAsset from "@/components/sidebar1/asset/sidebarAsset.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import assetAddEventsVue from "./assetAddEvents.vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { computed, reactive, ref } from "vue";
import _ from "lodash";
import { useToast } from "vue-toastification";
import datePicker from "@/components/datePicker/datePicker.vue";

export default {
  components: {
    PersonLayout,
    SidebarAsset,
    NavbarSocial,
    datePicker,
    assetAddEventsVue,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const isLoading = ref(true);
    const EndLoading = () => {
      isLoading.value = false;
    };
    const assetArray = reactive({
      id: "",
      code: "",
      title: "",
      type: "",
      status_name: "",
      array_asset: [],
    });
    store.dispatch("assetTicket/getTicketByIdAction", {
      id: route.params.ticketId,
      store,
      EndLoading: EndLoading,
    });
    // setTimeout(() => {
    //   store.dispatch("asset/SearchAssetTypeAction", "");
    //   store.dispatch("asset/SearchAssetOriginAction", "");
    //   store.dispatch("asset/SearchSupplierAction", "");
    //   store.dispatch("asset/SearchLocationAction", "");
    // }, 900);
    const changeInputPerson = (e) => {
      assetTicket.value.user_department =
        e.job_title_current?.title + " - " + e.work_place_current.title;
    };
    setTimeout(() => {
      for (let i = 0; i < assetTicket.value.assets?.length; i++) {
        assetArray.array_asset.push(assetTicket.value.assets[i]?.id);
      }
    }, 200);
    const addJsonAsset = () => {
      const data = {
        id: "",
        code: null,
        title: "",
        type: "",
        status_name: "",
      };
      assetTicket.value.assets.push(data);
    };
    const removeJsonAsset = (index) => {
      assetTicket.value.assets.splice(index, 1);
    };
    const assetTicket = computed(
      () => store.state.assetTicket.getDataTicketById
    );
    const updateAssetAssign = () => {
      const array_asset1 = [...new Set(assetArray.array_asset)];
      const data = {
        id: assetTicket.value.id,
        date_assign: assetTicket.value.date_assign,
        user_assignment: assetTicket.value.user_assignment,
        user_assign: assetTicket.value.user_assign,
        user_approval: assetTicket.value.user_approval,
        date_approval: assetTicket.value.date_approval,
        force_update: 1,
        images: assetTicket.value.images,
        assets: array_asset1,
        attachments: [],
        notes: [],
      };
      const dataUrl = {
        data: data,
        perpage: "25",
      };
      store.dispatch("assetTicket/UpdateAssetTicketAction", { dataUrl, toast });
      router.push({
        path: "/asset-ticket-assign",
        name: "Asset Ticket Assign",
      });
    };
    const searchAssetTicket = (e) => {
      const key = e.target.value;
      const status = "UNUSED";
      const ticket_type = "ASSIGN";
      store.dispatch("assetTicket/SearchAssetAction", {
        key,
        status,
        ticket_type,
      });
    };
    const searchAssetTicket1 = (e) => {
      const key = e.target.value;
      store.dispatch("assetTicket/getDataAssetByIdAction", key);
    };
    const listAsset = computed(() => store.state.assetTicket.listAsset);
    const assetDetail = computed(() => store.state.asset.dataAssetById);
    const listPerson = computed(() => store.state.asset.listPerson);
    const listPerson2 = computed(() => store.state.asset.listPerson2);
    const listAssetLocation = computed(() => store.state.asset.listLocation);
    const changeInputAsset = (e, index) => {
      assetTicket.value.assets[index].id = e.id;
      assetTicket.value.assets[index].status_name = e.status_name;
      assetTicket.value.assets[index].name = e.name;
      assetTicket.value.assets[index].type = e.group_name;
      assetArray.array_asset.push(e.id);
    };
    const UpdateAssetTicketDetail = () => {
      router.push(`/asset-update/${assetTicket.value}`);
    };
    return {
      assetTicket,
      assetArray,
      listAsset,
      assetDetail,
      listPerson,
      listPerson2,
      listAssetLocation,
      updateAssetAssign,
      searchAssetTicket,
      searchAssetTicket1,
      UpdateAssetTicketDetail,
      addJsonAsset,
      removeJsonAsset,
      changeInputAsset,
      changeInputPerson,
      EndLoading,
      isLoading,
    };
  },
  data() {
    return {
      header: ["Mã", "Tên", "Sắp xếp"],
      isModalVisible: false,
      isHidden: false,
      isHidden1: false,
    };
  },
  methods: {
    loadSelect(code) {
      console.log(code);
    },
    previewFiles() {
      this.files = this.$refs.myFiles.files;
    },
    searchPerson: _.debounce(function (e) {
      this.$store.dispatch("asset/SearchPersonAction", e.target.value);
    }, 350),
    searchPerson2: _.debounce(function (e) {
      this.$store.dispatch("asset/SearchPersonAction2", e.target.value);
    }, 350),
    searchAssetById: _.debounce(function (id) {
      this.$store.dispatch("asset/getDataAssetByIdAction", id.target.value);
    }, 350),
    checkForm() {},
  },
};
</script>
<style>
.svg-rotate {
  transform: rotate(180deg);
}
</style>
