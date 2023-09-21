<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-asset></sidebar-asset>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false">
        <div class="flex grow">
          <div class="flex items-center">
            <asset-add-events-vue></asset-add-events-vue>
            <p class="text-base">Phiếu điều chuyển tài sản</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <div class="w-full h-full">
      <div class="px-3">
        <div class="grid grid-cols-3 gap-4 items-start">
          <div class="input">
            <div class="w-full">
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
                  >Thông tin điều chuyển tài sản</span
                >
              </div>
            </div>
            <div class="mt-1" v-if="!isHidden">
              <div class="w-full pl-2">
                <div class="pt-[12px]">
                  <div class="grid grid-cols-1 gap-2">
                    <div class="mt-2 text-left">
                      <label for="" class="form-group-label"
                        >Ngày điều chuyển<span class="text-red-600 ml-1"
                          >*</span
                        ></label
                      >
                      <div>
                        <date-picker
                          v-model="assetTicket.date_assign"
                        ></date-picker>
                      </div>
                    </div>
                  </div>
                  <div class="grid grid-cols-1 gap-2">
                    <div class="mt-2 text-left">
                      <label for="" class="form-group-label"
                        >Người nhận<span class="text-red-600 ml-1"
                          >*</span
                        ></label
                      >
                      <div class="mt-2">
                        <div class="placeholder:text-lg">
                          <v-select
                            label="name"
                            :options="listPerson"
                            :reduce="(person) => person.ID"
                            @input="searchPerson"
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
                  </div>
                  <div class="grid grid-cols-1">
                    <div class="mt-2 text-left">
                      <label for="" class="text-[12.6px]">Lý do</label>
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
                  <div class="grid grid-cols-1 gap-2">
                    <div class="mt-2 text-left">
                      <label for="" class="text-[12.6px]"
                        >Tài liệu đính kèm</label
                      >
                      <div class="mt-2">
                        <input
                          type="text"
                          class="form-control-input"
                          placeholder=""
                          title=""
                          v-model="assetTicket.attachments"
                        />
                      </div>
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
          <div class="info">
            <div class="w-[600px]">
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
                  >Thông tin tài sản</span
                >
              </div>
            </div>
            <div class="mt-1" v-if="!isHidden">
              <div class="w-full pl-4">
                <div class="pt-[12px]">
                  <div class="grid grid-cols-12 gap-4 mt-3">
                    <div class="col-span-3 text-left">
                      <label for="" class="text-[12.6px]">Mã tài sản: </label>
                    </div>
                    <div class="col-span-9 text-left">
                      <label for="" class="font-bold text-left">{{
                        asset?.code
                      }}</label>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 gap-4 mt-3">
                    <div class="col-span-3 text-left">
                      <label for="" class="text-[12.6px]">Tên tài sản: </label>
                    </div>
                    <div class="col-span-9 text-left">
                      <label for="" class="font-bold text-left">{{
                        asset?.name
                      }}</label>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 gap-4 mt-3">
                    <div class="col-span-3 text-left">
                      <label for="" class="text-[12.6px]">Loại tài sản: </label>
                    </div>
                    <div class="col-span-9 text-left">
                      <label for="" class="font-bold text-left">{{
                        asset?.group_name
                      }}</label>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 gap-4 mt-3">
                    <div class="col-span-3 text-left">
                      <label for="" class="text-[12.6px]">Ngày mua: </label>
                    </div>
                    <div class="col-span-9 text-left">
                      <label for="" class="font-bold text-left">{{
                        asset?.date_bought
                      }}</label>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 gap-4 mt-3">
                    <div class="col-span-3 text-left">
                      <label for="" class="text-[12.6px]">Số serial: </label>
                    </div>
                    <div class="col-span-9 text-left">
                      <label for="" class="font-bold text-left">{{
                        asset.serial_number
                      }}</label>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 gap-4 mt-3">
                    <div class="col-span-3 text-left">
                      <label for="" class="text-[12.6px]">Quy cách: </label>
                    </div>
                    <div class="col-span-9 text-left">
                      <label for="" class="font-bold text-left">{{
                        asset?.description
                      }}</label>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 gap-4 mt-3">
                    <div class="col-span-3 text-left">
                      <label for="" class="text-[12.6px]">Vị trí: </label>
                    </div>
                    <div class="col-span-9 text-left">
                      <label for="" class="font-bold text-left">{{
                        asset?.inventory_source_name
                      }}</label>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 gap-4 mt-3">
                    <div class="col-span-3 text-left">
                      <label for="" class="text-[12.6px]"
                        >Người sử dụng:
                      </label>
                    </div>
                    <div class="col-span-9 text-left">
                      <label for="" class="font-bold text-left">{{
                        asset.current_personnel_name
                      }}</label>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 gap-4 mt-3">
                    <div class="col-span-3 text-left">
                      <label for="" class="text-[12.6px]">Chức vụ: </label>
                    </div>
                    <div class="col-span-9 text-left">
                      <label for="" class="font-bold text-left">{{
                        asset?.position_name
                      }}</label>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 gap-4 mt-3">
                    <div class="col-span-3 text-left">
                      <label for="" class="text-[12.6px]">Phòng ban: </label>
                    </div>
                    <div class="col-span-9 text-left">
                      <label for="" class="font-bold text-left">{{
                        asset?.department_name
                      }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-slot:sub_footer
      ><div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="createAssetTicket()">
            Cập nhật
          </button>
          <button
            class="button-close-modal"
            @click="this.$router.push({ path: '/asset', name: 'Asset' })"
          >
            Hủy bỏ
          </button>
        </div>
      </div></template
    >
  </person-layout>
  <teleport to="#app"> </teleport>
</template>
<script>
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarAsset from "@/components/sidebar1/asset/sidebarAsset.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { computed, reactive, ref } from "vue";
import assetAddEventsVue from "./assetAddEvents.vue";
import { useToast } from "vue-toastification";
import datePicker from "@/components/datePicker/datePicker.vue";
import _ from "lodash";

export default {
  components: {
    PersonLayout,
    SidebarAsset,
    NavbarSocial,
    assetAddEventsVue,
    datePicker,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const isLoading = ref(true);
    const toast = useToast();
    const EndLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("asset/getDataAssetByIdAction", {
      id: route.params.assetId,
      store,
      EndLoading: EndLoading,
    });
    const asset = computed(() => store.state.asset.dataAssetById);
    const assetTicket = reactive({
      type: "",
      date_assign: new Date(),
      user_assignment: null,
      user_assign: null,
      user_department: "",
      user_title: "",
      user_approval: "",
      date_approval: "",
      description: "",
      attachments: [],
      json_asset: [
        {
          id: null,
          code: null,
          title: "",
          type: null,
          status: null,
        },
      ],
      array_asset: [],
    });

    const listAssetTicket = computed(
      () => store.state.assetTicket.listAssetTicket
    );
    const createAssetTicket = () => {
      const data = {
        type: "TRANSFER",
        user_assignment: assetTicket.user_assignment,
        date_assign: assetTicket.date_assign,
        description: assetTicket.description,
        user_assign: assetTicket.user_assign,
        assets: [asset.value.id],
        attachments: assetTicket.attachments,
        notes: assetTicket.notes,
      };
      const dataUrl = {
        data: data,
        perPage: "25",
        id: route.params.assetId,
      };
      store.dispatch("assetTicket/createAssetTicketAction", {
        dataUrl,
        toast,
        EndLoading: EndLoading,
        store,
      });
      router.push({ path: "/asset", name: "Asset" });
    };

    const listAsset = computed(() => store.state.assetTicket.listAsset);
    const listPerson = computed(() => store.state.asset.listPerson);

    return {
      listAssetTicket,
      asset,
      assetTicket,
      listAsset,
      listPerson,
      createAssetTicket,
      EndLoading,
    };
  },
  data() {
    return {
      header: ["Mã", "Tên", "Sắp xếp"],
      isModalVisible: false,
      files: [],
      isHidden: false,
      isHidden1: false,
      masks: {
        input: "DD/MM/YYYY",
        data: "YYYY-MM-DD",
      },
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD",
      },
    };
  },
  methods: {
    searchPerson: _.debounce(function (e) {
      this.$store.dispatch("asset/SearchPersonAction", e.target.value);
    }, 350),
  },
};
</script>
<style>
.svg-rotate {
  transform: rotate(180deg);
}
</style>
