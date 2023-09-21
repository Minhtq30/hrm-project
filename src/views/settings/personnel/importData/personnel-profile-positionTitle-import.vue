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
            <p class="text-base">Import dữ liệu chức vụ</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar> <nav-feature> </nav-feature></template>
    <Transition name="slide-fade">
      <div class="home w-full">
        <div>
          <div class="w-[700px] p-5">
            <div class="grid grid-cols-12 gap-2 text-center">
              <div class="col-span-3">
                <label for="" class="form-group-label p-2"
                  >Chọn dữ liệu để import</label
                >
              </div>
              <div class="col-span-9">
                <div class="">
                  <input
                    type="file"
                    @change="onChange"
                    class="form-control-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <table-responsive :header="header" :isShow="false">
            <tr
              class="bg-white border-b text-left"
              v-for="(positionTitle, index) in rows.value"
              :key="index"
            >
              <td class="cellTable text-center">
                {{ positionTitle?.__rowNum__ }}
              </td>
              <td class="cellTable">{{ positionTitle?.title }}</td>
              <td class="cellTable">
                {{ positionTitle?.priority }}
              </td>
              <td class="cellTable">
                {{ positionTitle?.status }}
              </td>
              <td class="cellTable">
                {{ positionTitle?.desc }}
              </td>
              <td class="cellTable">
                {{ positionTitle?.created_at }}
              </td>
              <td class="cellTable">
                {{ positionTitle?.created_by_id }}
              </td>
              <td class="cellTable">
                {{ positionTitle?.updated_at }}
              </td>
              <td class="cellTable">
                {{ positionTitle?.updated_by_id }}
              </td>
            </tr>
          </table-responsive>
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="importPositionTitle()">
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
// import NavFeature from "@/components/navbar/NavFeature.vue";
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
        "ID",
        "Chức vụ",
        "Thứ tự cấp bậc",
        "Trạng thái",
        "Mô tả",
        "Ngày tạo",
        "Người tạo",
        "Ngày sửa",
        "Người sửa",
      ],
    };
  },
  components: {
    TableResponsive,
    PersonLayout,
    SidebarPerson,
    NavbarSocial,
    SearchView,
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const rows = ref([]);

    const importPositionTitle = () => {
      store.dispatch("positiontitles/ImportPositionTitleAction", {
        data: rows.value,
        toast,
      });
    };
    return {
      rows,
      importPositionTitle,
    };
  },
  methods: {
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
      if (this.file) {
        const reader = new FileReader();
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
      utils.book_append_sheet(wb, ws, "Data");
      writeFileXLSX(wb, "TAT_CA_VI_TRI.xlsx");
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
