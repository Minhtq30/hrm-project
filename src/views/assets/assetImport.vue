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
            <p class="ml-2 font-bold">IMPORT DỮ LIỆU TÀI SẢN</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar
      ><div>
        <nav-feature> </nav-feature></div
    ></template>

    <div class="w-full h-full">
      <div class="flex items-end justify-between">
        <div class="p-4">
          <div class="mt-2 text-left">
            <label for="" class="form-group-label"
              >Chọn dữ liệu để import</label
            >
            <div class="mt-2">
              <input
                type="file"
                @change="onChange"
                @input="showFullLoading"
                class="form-control-input"
              />
            </div>
          </div>
        </div>

        <div class="p-4">
          <Transition name="slide-fade">
            <div class="text-left">
              <button
                type="button"
                class="button-close-modal"
                @click="downloadFile()"
              >
                <i class="fal fa-cloud-download"></i>
                Tải file mẫu
              </button>
            </div>
          </Transition>
        </div>
      </div>
      <!-- <button @click="exportFile">Export XLSX</button> -->
      <div ref="target" id="target" class="hover">
        <div class="w-full">
          <table-responsive :header="header" :isShow="false"
            ><tr
              class="bg-white border-b text-left"
              v-for="(asset, index) in rows.value"
              :key="index"
            >
              <td class="p-3 pl-5">{{ index + 1 }}</td>
              <td class="p-3">{{ asset.code }}</td>
              <td class="p-3">{{ asset.name }}</td>
              <td class="p-3">{{ asset.type_name }}</td>
              <td class="p-3">{{ asset.group_name }}</td>
              <td class="p-3">{{ formatDate(asset.date_bought) }}</td>
              <td class="p-3">
                <div
                  style="
                    max-width: 350px;
                    min-width: 250px;
                    white-space: normal;
                  "
                >
                  {{ asset.description }}
                </div>
              </td>
              <td class="p-3">{{ asset?.origin_price }}</td>
              <td class="p-3">{{ asset?.supplier_name }}</td>
              <td class="p-3">{{ asset?.warranty }}</td>
              <td class="p-3">{{ asset?.status }}</td>
              <td class="p-3">{{ asset.personnel_name }}</td>
              <td class="p-3">{{ asset.department_name }}</td>

              <td class="p-3"></td>
            </tr>
          </table-responsive>
          <loading-overlay
            :isLoading="isLoading"
            :handleEndLoading="EndTimeLoading"
          ></loading-overlay>
        </div>
      </div>
    </div>
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <ConfirmDialog></ConfirmDialog>
          <Dialog
            v-model:visible="dialog_visible"
            modal
            header=""
            :closable="false"
            :style="{ width: '30vw' }"
          >
            <div class="d-flex flex items-center justify-start">
              <ProgressSpinner
                label="Đang import dữ liệu, vui lòng chờ..."
                style="
                  width: 30px;
                  height: 30px;
                  margin-left: 0;
                  margin-right: 5px;
                "
                class="mr-2"
              />
              <span>Đang import dữ liệu, vui lòng chờ...</span>
            </div>
            <!--
            <ProgressBar :value="progress_value"></ProgressBar>
            -->
            <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
          </Dialog>
          <Button
            @click="confirmImport()"
            class="mr-2"
            icon="pi pi-check"
            label="Cập nhật"
            size="small"
          ></Button>

          <button
            class="button-close-modal"
            @click="this.$router.push({ path: '/asset', name: 'Asset' })"
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </template>
  </person-layout>
  <teleport to="#app"></teleport>
</template>
<script>
import TableResponsive from "@/components/table/TableResponsive.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarAsset from "@/components/sidebar1/asset/sidebarAsset.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { useStore } from "vuex";
// import { useRouter } from "vue-router";
import { ref, reactive } from "vue";
import assetAddEventsVue from "./assetAddEvents.vue";
// import * as XLSX from "xlsx";
import { read, utils, writeFileXLSX } from "xlsx";
import { useToast } from "vue-toastification";
import { FormatDate } from "@/constants/FormatAll";
// import CurrencyInput from "@/components/CurrencyInput.vue";
import ConfirmDialog from "primevue/confirmdialog";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import ProgressBar from "primevue/progressbar";
import ProgressSpinner from "primevue/progressspinner";
import axios from "axios";

export default {
  components: {
    PersonLayout,
    SidebarAsset,
    NavbarSocial,
    assetAddEventsVue,
    TableResponsive,
    ConfirmDialog,
    Button,
    Dialog,
    ProgressBar,
    ProgressSpinner,
    // CurrencyInput,
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    // const router = useRouter();
    // const route = useRoute();
    const rows = ref([]);
    const isLoading = ref(false);
    // store.dispatch("asset/ImportAssetsAction", {
    //   id: route.params.assetId,
    //   store,
    // });
    const EndLoading = () => {
      isLoading.value = false;
      endProgress();
    };

    const EndTimeLoading = () => {
      isLoading.value = false;
    };

    const isLoadingShow = ref(false);
    const isLoadingHide = ref(false);
    const dialog_visible = ref(false);
    const asset = reactive({
      code: "",
      name: "",
    });

    const progress_value = ref(0);
    const row_quantity = ref(0);
    const interval = ref();

    const showDialog = () => {
      if (row_quantity.value == 0) {
        console.log("Không có gì để import");
      } else {
        dialog_visible.value = true;
        startProgress();
      }
    };

    const showFullLoading = () => {
      isLoading.value = true;
    };

    const importAssets = () => {
      if (row_quantity.value == 0) {
        console.log("Không có gì để import");
      } else {
        const dataUrl = {
          data: rows.value,
          perPage: "1",
        };
        console.log("formsLength", row_quantity);

        showDialog();
        store.dispatch("asset/ImportAssetsAction", {
          dataUrl,
          toast,
          EndLoading: EndLoading,
          store,
        });
        // router.push({ path: "/asset", name: "Asset" });
      }
    };

    const startProgress = () => {
      interval.value = setInterval(() => {
        let newValue =
          progress_value.value + Math.floor(Math.random() * 10) + 1;
        if (newValue >= 100) {
          newValue = 100;
          // endProgress();
        }
        progress_value.value = newValue;
      }, 2000);
    };
    const endProgress = () => {
      clearInterval(interval.value);
      interval.value = null;
      dialog_visible.value = false;
    };

    const downloadFile = () => {
      axios({
        url: "../excelTemplate/asset_import.xlsx",
        method: "GET",
        responseType: "arraybuffer",
      })
        .then((response) => {
          const blob = new Blob([response.data]);
          const fileLink = document.createElement("a");
          fileLink.href = URL.createObjectURL(blob);
          fileLink.setAttribute("download", "asset_import_template.xlsx");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(console.error);
    };

    return {
      asset,
      rows,
      importAssets,
      dialog_visible,
      startProgress,
      endProgress,
      showDialog,
      progress_value,
      row_quantity,
      isLoading,
      isLoadingShow,
      isLoadingHide,
      showFullLoading,
      downloadFile,
      EndTimeLoading,
    };
  },
  data() {
    return {
      header: [
        "STT",
        "Mã",
        "Tên tài sản",
        "Loại",
        "Nhóm",
        "Ngày mua",
        "diễn giải",
        "Nguyên giá",
        "Nhà cung cấp",
        "Bảo hành",
        "Trạng thái",
        "Người sử dụng",
        "Phòng ban",
      ],
      // dialog_visible: false,
      // progress_value: 0,
      interval: null,
    };
  },
  methods: {
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
      if (this.file) {
        const reader = new FileReader();
        // const arrayBuffer = new arrayBuffer();
        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          // const wb = read(bstr);
          const wb = read(bstr, {
            type: "binary",
            cellDates: true,
            dateNF: "dd/mm/yyyy",
            locale: "vi-VN",
            raw: false,
          });
          /* Get first worksheet */
          this.rows.value = utils
            .sheet_to_json(wb.Sheets[wb.SheetNames[0]])
            .filter((x, i) => i > 1 && x?.code?.length > 0);

          this.row_quantity = this.rows.value?.length;
          this.isLoading = false;
        };
        reader.readAsBinaryString(this.file);
      }
    },
    exportFile() {
      // const ws = utils.json_to_sheet(this.rows.value);
      // const wb = utils.book_new();
      // utils.book_append_sheet(wb, ws, "Data", {
      //   header: this.header,
      // });

      let Heading = [
        ["Nhóm tài sản", "Loại tài sản", "Mã tài sản", "Tên tài sản", "Mô tả"],
      ];

      const wb = utils.book_new();
      const ws = utils.json_to_sheet([]);
      ws["!cols"] = [
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 50 },
        { width: 50 },
      ];
      // let objectMaxLength = [];

      // this.rows.value.map((jsonData) => {
      //   Object.entries(jsonData).map(([, v], idx) => {
      //     let columnValue = v;
      //     objectMaxLength[idx] =
      //       objectMaxLength[idx] >= columnValue.length
      //         ? objectMaxLength[idx]
      //         : columnValue.length;
      //   });
      // });
      // const wscols = objectMaxLength.map((w) => ({ width: w }));
      utils.sheet_add_aoa(ws, Heading);
      utils.sheet_add_json(ws, this.rows.value, {
        origin: "A2",
        skipHeader: true,
      });
      utils.book_append_sheet(wb, ws, "Asset_all");
      writeFileXLSX(wb, "Tat_ca_tai_san.xlsx");
    },
    formatDate(date) {
      if (date == null) {
        return "";
      } else {
        return FormatDate(date);
      }
    },

    confirmImport() {
      const msg = ref("");
      const header = ref("");
      if (this.row_quantity == 0) {
        msg.value = "Không có dữ liệu để import.";
        header.value = "Thông báo";
      } else {
        msg.value = "Bạn có chắc chắn thực hiện cập nhật?";
        header.value = "Xác nhận";
      }
      this.$confirm.require({
        message: msg.value,
        header: header.value,
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Xác nhận",
        rejectLabel: "Hủy",
        acceptClass: this.row_quantity > 0 ? "" : "hidden",
        accept: () => {
          if (this.row_quantity > 0) {
            this.importAssets();
          }
        },
        reject: () => {
          console.log("Reject");
        },
      });
    },
    // startProgress() {
    //   this.interval = setInterval(() => {
    //     let newValue = this.progress_value + Math.floor(Math.random() * 10) + 1;
    //
    //     if (newValue >= 100) {
    //       newValue = 100;
    //
    //       this.endProgress();
    //     }
    //
    //     this.progress_value = newValue;
    //   }, 2000);
    // },
    // endProgress() {
    //   clearInterval(this.interval);
    //   this.interval = null;
    // },
  },
};
</script>
<style>
.svg-rotate {
  transform: rotate(180deg);
}
</style>
