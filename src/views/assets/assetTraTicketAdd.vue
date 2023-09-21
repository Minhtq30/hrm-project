<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-asset></sidebar-asset>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <div class="flex grow">
          <div class="flex items-center ml-4">
            <asset-add-events-vue></asset-add-events-vue>
            <p class="ml-2 font-medium">Báo hỏng tài sản</p>
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
                  >Thông tin báo hỏng tài sản</span
                >
              </div>
            </div>
            <div class="mt-1" v-if="!isHidden">
              <div class="w-full pl-2">
                <div class="pt-[12px]">
                  <div class="grid grid-cols-1 gap-2">
                    <div class="mt-2 text-left">
                      <label for="" class="form-group-label"
                        >Ngày hỏng<span class="text-red-600"> *</span></label
                      >
                      <div>
                        <v-date-picker
                          class="form-control-input overflow-hidden"
                          v-model="assetTicket.date_assign"
                          :masks="masks"
                          :model-config="modelConfig"
                        >
                          <template
                            v-slot="{ inputValue, togglePopover, inputEvents }"
                          >
                            <div class="flex items-center">
                              <button
                                class="focus:outline-none mr-2"
                                @click="togglePopover()"
                              >
                                <i class="far fa-calendar-alt"></i>
                              </button>
                              <input
                                placeholder="dd/mm/yyyy"
                                :value="inputValue"
                                class="focus:outline-none w-full"
                                @click="togglePopover()"
                                v-on="inputEvents"
                              />
                            </div>
                          </template>
                        </v-date-picker>
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
                          v-model="title"
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
                          v-model="title"
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
                        asset.code
                      }}</label>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 gap-4 mt-3">
                    <div class="col-span-3 text-left">
                      <label for="" class="text-[12.6px]">Tên tài sản: </label>
                    </div>
                    <div class="col-span-9 text-left">
                      <label for="" class="font-bold text-left">{{
                        asset.name
                      }}</label>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 gap-4 mt-3">
                    <div class="col-span-3 text-left">
                      <label for="" class="text-[12.6px]">Loại tài sản: </label>
                    </div>
                    <div class="col-span-9 text-left">
                      <label for="" class="font-bold text-left">{{
                        asset.group?.name
                      }}</label>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 gap-4 mt-3">
                    <div class="col-span-3 text-left">
                      <label for="" class="text-[12.6px]">Ngày mua: </label>
                    </div>
                    <div class="col-span-9 text-left">
                      <label for="" class="font-bold text-left">{{
                        asset.date_bought
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
                        asset.inventorySource?.name
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
                        asset.currentUser?.name
                      }}</label>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 gap-4 mt-3">
                    <div class="col-span-3 text-left">
                      <label for="" class="text-[12.6px]">Chức vụ: </label>
                    </div>
                    <div class="col-span-9 text-left">
                      <label for="" class="font-bold text-left">{{
                        asset.position?.title
                      }}</label>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 gap-4 mt-3">
                    <div class="col-span-3 text-left">
                      <label for="" class="text-[12.6px]">Phòng ban: </label>
                    </div>
                    <div class="col-span-9 text-left">
                      <label for="" class="font-bold text-left">{{
                        asset.department?.title
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
      ><div
        class="flex bg-gray-100 sticky bottom-0 right-0 left-0 z-10 pb-0 h-[54px]"
      >
        <div class="flex text-left w-full py-[9px] px-2">
          <button
            class="px-4 rounded-[4px] text-white font-medium mr-4"
            style="background-color: var(--color-primary)"
            @click="createAssetAssign()"
          >
            Cập nhật
          </button>
          <button
            class="px-4 rounded-[4px] font-medium hover:bg-slate-200"
            style="
              border: 1px solid var(--color-primary);
              color: var(--color-primary);
            "
            @click="
              this.$router.push({ path: '/personnel', name: 'Personnel' })
            "
          >
            Hủy bỏ
          </button>
        </div>
      </div></template
    >
  </person-layout>
  <teleport to="#app"> </teleport>
  <div>
    <context-menu :isActive="isActiveAssetTicket"
      ><ul>
        <li @click.prevent="UpdateAssetTicket()">
          <a href="#">Sửa</a>
        </li>
        <li @click.prevent="DeleteAssetTicket(assetTicketDetail)">
          <a href="#">Xóa</a>
        </li>
      </ul></context-menu
    >
  </div>
</template>
<script>
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarAsset from "@/components/sidebar1/asset/sidebarAsset.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { computed, reactive, ref } from "vue";
import assetAddEventsVue from "./assetAddEvents.vue";

export default {
  components: {
    PersonLayout,
    SidebarAsset,
    NavbarSocial,
    assetAddEventsVue,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const isActiveAssetTicket = ref(false);
    const assetTicketDetail = ref({});

    store.dispatch("asset/getDataAssetByIdAction", route.params.assetId);
    const asset = computed(() => store.state.asset.dataAssetById);
    setTimeout(() => {
      console.log(asset.value);
    }, 400);
    const AssetTicketSearch = ref("");
    const assetTicket = reactive({
      type: "",
      date_assign: "",
      user_assignment: "",
      user_assign: "",
      user_department: "",
      user_title: "",
      user_approval: "",
      date_approval: "",
      images: "",
      notes: "",
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
    const listPagination = computed(
      () => store.state.assetTicket.listPagination
    );
    const createAssetAssign = () => {
      const data = {
        type: "BROKEN",
        date_assign: assetTicket.date_assign,
        description: assetTicket.description,
        user_assign: asset.value.user_id,
        assets: [asset.value.id],
        attachments: [],
        notes: [],
      };
      const dataUrl = {
        data: data,
        perPage: "1",
      };
      store.dispatch("assetTicket/createAssetTicketAction", dataUrl);
      router.push({ path: "/asset-ticket", name: "Asset Ticket" });
    };
    const searchAssetTicket = (e) => {
      store.dispatch("assetTicket/SearchAssetTicketAction", e.target.value);
    };
    const searchPersonTicket = (e) => {
      store.dispatch("assetTicket/SearchPersonTicketAction", e.target.value);
    };
    const searchAssetType = (e) => {
      store.dispatch("asset/SearchAssetTypeAction", e.target.value);
    };
    const listAsset = computed(() => store.state.assetTicket.listAsset);
    const listPerson = computed(() => store.state.assetTicket.listPerson);
    const listAssetType = computed(() => store.state.asset.listAssetType);
    const changeInputAsset = (e, index) => {
      assetTicket.json_asset[index].id = e.id;
      assetTicket.json_asset[index].status = e.status;
      assetTicket.json_asset[index].title = e.name;
      assetTicket.json_asset[index].type = e.type_name;
      assetTicket.array_asset.push(e.id);
    };
    const changeInputPerson = (e) => {
      assetTicket.user_department = e.department.title;
      assetTicket.user_title = e.position.title;
    };
    return {
      isActiveAssetTicket: isActiveAssetTicket,
      assetTicketDetail: assetTicketDetail,
      listAssetTicket: listAssetTicket,
      asset: asset,
      assetTicket: assetTicket,
      AssetTicketSearch: AssetTicketSearch,
      listPagination: listPagination,
      listAsset,
      listPerson,
      listAssetType,
      createAssetAssign,
      searchAssetTicket,
      searchPersonTicket,
      searchAssetType,
      changeInputAsset,
      changeInputPerson,
    };
  },
  data() {
    return {
      header: ["Mã", "Tên", "Sắp xếp"],
      isModalVisible: false,
      files: [],
      isHidden: false,
      isHidden1: false,
    };
  },
  methods: {
    previewFiles() {
      this.files = this.$refs.myFiles.files;
    },
  },
};
</script>
<style>
.svg-rotate {
  transform: rotate(180deg);
}
</style>
