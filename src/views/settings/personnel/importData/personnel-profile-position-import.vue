<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-person></sidebar-person>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <template v-slot:search>
          <search-view :handleSearch="handleSearch"></search-view>
        </template>
        <div class="flex grow">
          <div class="flex items-center">
            <div
              class="button-create"
              @click="handleOpenDetail"
              title="Tạo mới vị trí công việc"
            ></div>
            <p class="text-base">Import dữ liệu</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar> <nav-feature> </nav-feature></template>
    <Transition name="slide-fade">
      <div class="home w-full">
        <div>
          <div class="w-[500px] p-5">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label"
                >Chọn dữ liệu để import</label
              >
              <div class="mt-2">
                <input
                  type="file"
                  @change="onChange"
                  class="form-control-input"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <table-responsive :header="header" :isShow="false">
            <tr
              class="bg-white border-b text-left"
              v-for="(position, index) in rows.value"
              :key="index"
            >
              <td class="cellTable text-center">{{ position?.__rowNum__ }}</td>
              <td class="cellTable">{{ position?.title }}</td>
              <td class="cellTable">
                {{ position?.desc }}
              </td>
              <td class="cellTable">
                {{ position?.position_title_id }}
              </td>
              <td class="cellTable">
                {{ position?.status }}
              </td>
              <td class="cellTable">
                {{ position?.created_at }}
              </td>
              <td class="cellTable">
                {{ position?.created_by_id }}
              </td>
              <td class="cellTable">
                {{ position?.updated_at }}
              </td>
              <td class="cellTable">
                {{ position?.updated_by_id }}
              </td>
            </tr>
          </table-responsive>
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="importPosition()">
            Cập nhật
          </button>
          <button class="button-close-modal">Hủy bỏ</button>
        </div>
      </div></template
    >
  </person-layout>

  <div></div>
  <!-- End right click -->
  <loading-overlay :isLoading="isLoading"></loading-overlay>
</template>

<script>
import "@/assets/checkBox.css";
import TableResponsive from "@/components/table/TableResponsive.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarPerson from "@/components/sidebar/SidebarPerson.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import SearchView from "@/components/search/SearchView.vue";
import { useStore } from "vuex";
import { ref } from "vue";
import { read, utils, writeFileXLSX } from "xlsx";
import { FormatDate } from "@/constants/FormatAll";
import { useToast } from "vue-toastification";
export default {
  data() {
    return {
      header: [
        "STT",
        "Mã vị trí",
        "Vị trí",
        "Chức vụ",
        "Trạng thái",
        "Ngày tạo",
        "Người tạo",
        "Ngày sửa",
        "Người sửa",
      ],
    };
  },
  components: {
    TableResponsive,
    NavFeature,
    PersonLayout,
    SidebarPerson,
    NavbarSocial,
    SearchView,
  },
  //   methods: {
  //     formatPositionTitle(id) {
  //       if (id) {
  //         const arr = this.listPositiontitles.find((item) => item.ID == id);
  //         if (arr) {
  //           return arr.title;
  //         } else {
  //           return "";
  //         }
  //       } else {
  //         return "";
  //       }
  //     },
  //   },
  setup() {
    const store = useStore();
    const toast = useToast();
    const rows = ref([]);

    const importPosition = () => {
      store.dispatch("positions/ImportPositionIDAction", {
        data: rows.value,
        toast,
      });
      // router.push({ path: "/asset", name: "Asset" });
    };
    return {
      rows,
      importPosition,
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
          });
          /* Get first worksheet */
          this.rows.value = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
          //delete header
          this.rows.value.splice(0, 1);
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
      utils.sheet_add_aoa(ws, Heading);
      utils.sheet_add_json(ws, this.rows.value, {
        origin: "A2",
        skipHeader: true,
      });
      utils.book_append_sheet(wb, ws, "Data");
      writeFileXLSX(wb, "Tat_ca_chuc_vu.xlsx");
    },
    formatDate(date) {
      if (date == null) {
        return "";
      } else {
        return FormatDate(date);
      }
    },
  },
};
</script>

<style></style>
