<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-timekeep></sidebar-timekeep>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <template v-slot:search>
          <search-view :handleSearch="handleSearch"></search-view>
        </template>
        <div class="flex grow">
          <div class="flex items-center">
            <button-create-timekeep></button-create-timekeep>
            <p class="sm:longText max-sm:hidden">Import phân ca làm việc</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar> </template>
    <Transition name="slide-fade">
      <div class="p-2 text-left">
        <div class="form-group-label">
          Chú ý: Chọn các trường dữ liệu tương ứng từ file bạn có để thực hiện
          import hàng loạt.
        </div>
        <div class="form-file form-input form-small" v="form.upload">
          <input type="file" name="file" @change="onChange" />
          <div class="form-file-label">Đính kèm file excel .xlsx</div>
          <div class="form-file-btn icon-upload"></div>
        </div>
      </div>
    </Transition>
    <Transition name="slide-fade">
      <div class="p-2 text-left">
        <div class="form-group-label">Tải file mẫu</div>
        <button
          type="button"
          class="button-modal ml-3"
          style="background-color: var(--color-primary)"
          @click="downloadFile()"
        >
          Download File
        </button>
      </div>
    </Transition>
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="importTimekeepAttendance()">
            Cập nhật
          </button>
          <button
            class="button-close-modal"
            @click="this.$router.push('/timekeep-furlough-furlough')"
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
import SidebarTimekeep from "@/components/sidebar/SidebarTimekeep.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateTimekeep from "@/views/timekeep/ButtonCreateTimekeep.vue";
// import navbarAssign from "@/views/timekeep/attendance-assign/navbar-attendance-assign.vue";
// import NavFeature from "@/components/navbar/NavFeature.vue";
// import TableResponsive from "@/components/table/TableResponsive.vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { read, utils, writeFileXLSX } from "xlsx";
import SearchView from "@/components/search/SearchView.vue";
import { ref } from "@vue/runtime-core";
import { FormatDate } from "@/constants/FormatAll";
import { useTimekeepAttendance } from "@/store/modules/timekeep/timekeepAttendance";
export default {
  components: {
    PersonLayout,
    SidebarTimekeep,
    NavbarSocial,
    ButtonCreateTimekeep,
    SearchView,
  },
  methods: {
    onChange(event) {
      const validate = event.target.value.split(".");
      if (validate[1] == "xlsx") {
        this.file = event.target.files ? event.target.files[0] : null;
        if (this.file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = read(bstr, {
              type: "binary",
              cellDates: true,
              dateNF: "dd-mm-yyyy",
            });
            /* Get first worksheet */
            this.listTimekeepAttendance.value = utils.sheet_to_json(
              wb.Sheets[wb.SheetNames[0]],
              {
                raw: false,
              }
            );
            //delete header
            // this.listTimekeepAttendance.value.splice(0, 1);
          };
          reader.readAsBinaryString(this.file);
        }
      } else {
        alert("Định dạng file không đúng");
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
      utils.sheet_add_aoa(ws, Heading);
      utils.sheet_add_json(ws, this.listTimekeepAttendance.value, {
        origin: "A2",
        skipHeader: true,
      });
      utils.book_append_sheet(wb, ws, "Data");
      writeFileXLSX(wb, "Quan Ly Nghi phep.xlsx");
    },

    downloadFile() {
      axios({
        url: "../excelTemplate/Phan_ca.xlsx",
        method: "GET",
        responseType: "arraybuffer",
      })
        .then((response) => {
          const blob = new Blob([response.data]);
          const fileLink = document.createElement("a");
          fileLink.href = URL.createObjectURL(blob);
          fileLink.setAttribute("download", "Phan_ca.xlsx");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(console.error);
    },

    formatDate(date) {
      if (date == null) {
        return "";
      } else {
        return FormatDate(date);
      }
    },
  },
  setup() {
    const isLoading = ref(true);
    const listTimekeepAttendance = ref([]);
    const toast = useToast();
    const data = useTimekeepAttendance();
    const importTimekeepAttendance = () => {
      data.ImportTimekeepAttendanceAction({
        data: listTimekeepAttendance.value,
        toast,
      });
    };
    return {
      header: [
        "STT",
        "Mã nhân viên",
        "Tên nhân viên",
        "Vị trí",
        "Phòng ban",
        "Tổng tồn",
        "Tổng",
        "Sử dụng",
        "Hết hạn",
        "Tồn cuối",
        "",
        "Tổng",
        "Sử dụng",
        "Hết hạn",
        "Tồn cuối",
        "Tổng",
        "Sử dụng",
        "Tồn cuối",
        "Tổng",
        "Sử dụng",
        "Tồn cuối",
        "Năm",
      ],
      listTimekeepAttendance,
      importTimekeepAttendance,
      isLoading,
      toast,
    };
  },
};
</script>

<style></style>
