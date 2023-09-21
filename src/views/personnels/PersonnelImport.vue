<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-personnel></sidebar-personnel>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false">
        <div class="flex grow">
          <div class="flex items-center">
            <p class="longText p-4">Import hồ sơ nhân sự</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar v-if="isLoading == false">
      <nav-feature></nav-feature>
    </template>

    <div v-if="isLoading == false">
      <Transition name="slide-fade">
        <div class="px-2 text-left">
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
      <div>
        <table-responsive :header="header" :isShow="false">
          <tr
            class="bg-white border-b text-left"
            v-for="(personnel, index) in rows.value"
            :key="index"
          >
            <td class="cellTable text-center">
              {{ personnel?.__rowNum__ }}
            </td>
            <td class="cellTable">{{ personnel.ID }}</td>
            <td class="cellTable">{{ personnel.code }}</td>
            <td class="cellTable">{{ personnel.attendance_code }}</td>
            <td class="cellTable">{{ personnel.code_contract }}</td>
            <td class="cellTable">{{ personnel.name }}</td>
            <td class="cellTable">{{ personnel.department_name }}</td>
            <td class="cellTable">{{ personnel.department_id }}</td>
            <td class="cellTable">{{ personnel.position_name }}</td>
            <td class="cellTable">{{ personnel.position_id }}</td>
            <td class="cellTable">{{ personnel.position_title }}</td>
            <td class="cellTable">{{ personnel.position_title_id }}</td>
            <td class="cellTable">{{ formatDate(personnel.job_date_join) }}</td>
            <td class="cellTable">{{ personnel.job_reldate_join }}</td>
            <td class="cellTable">{{ personnel.date_activated_account }}</td>
            <td class="cellTable">{{ personnel.job_status }}</td>
            <td class="cellTable">{{ personnel.job_date_out }}</td>
            <td class="cellTable">{{ personnel.job_out_reason }}</td>
            <td class="cellTable">{{ formatDate(personnel.birthday) }}</td>
            <td class="cellTable">{{ personnel.gender }}</td>
            <td class="cellTable">{{ personnel.place_of_birthday }}</td>
            <td class="cellTable">{{ personnel.origin_state }}</td>
            <td class="cellTable">{{ personnel.marital_status }}</td>
            <td class="cellTable">{{ personnel.nationality }}</td>
            <td class="cellTable">{{ personnel.people }}</td>
            <td class="cellTable">{{ personnel.religious }}</td>
            <td class="cellTable">{{ personnel.private_code }}</td>
            <td class="cellTable">{{ personnel.private_code_date }}</td>
            <td class="cellTable">{{ personnel.private_code_place }}</td>
            <td class="cellTable">{{ personnel.place_home_address }}</td>
            <td class="cellTable">{{ personnel.place_current }}</td>
            <td class="cellTable">{{ personnel.place_home }}</td>
            <td class="cellTable">{{ personnel.place_current_address }}</td>
            <td class="cellTable">{{ personnel.date_leave_from }}</td>
            <td class="cellTable">{{ personnel.date_leave_to }}</td>
            <td class="cellTable">{{ personnel.job_tax }}</td>
            <td class="cellTable">{{ personnel.level_academic }}</td>
            <td class="cellTable">{{ personnel.level_school }}</td>
            <td class="cellTable">{{ personnel.mobile }}</td>
            <td class="cellTable">{{ personnel.personal_email }}</td>
            <td class="cellTable">{{ personnel.job_bank_account }}</td>
            <td class="cellTable">{{ personnel.job_bank_account_name }}</td>
            <td class="cellTable">{{ personnel.job_bank_id }}</td>
            <td class="cellTable">{{ personnel.job_bank_desc }}</td>
            <td class="cellTable">{{ personnel.type_contract }}</td>
            <td class="cellTable">{{ personnel.salary_premium_base }}</td>
            <td class="cellTable">{{ personnel.salary_real }}</td>
            <td class="cellTable">{{ personnel.salary_allowances }}</td>
            <td class="cellTable">{{ personnel.updated_at }}</td>
            <td class="cellTable">{{ personnel.user_id }}</td>
            <td class="cellTable">{{ personnel.date_activated_account }}</td>
          </tr>
        </table-responsive>
      </div>
    </div>
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="importPersonnel()">
            Cập nhật
          </button>
          <button
            class="button-close-modal"
            @click="this.$router.push('/page-department')"
          >
            Hủy bỏ
          </button>
        </div>
      </div></template
    >
  </person-layout>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarPersonnel from "@/components/sidebar/SidebarPersonnel.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import axios from "axios";
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import { useToast } from "vue-toastification";
import { read, utils, writeFileXLSX } from "xlsx";
import { FormatDate } from "@/constants/FormatAll";
export default {
  components: {
    NavFeature,
    PersonLayout,
    SidebarPersonnel,
    NavbarSocial,
    TableResponsive,
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
            this.rows.value = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
              raw: false,
            });
            //delete header
            this.rows.value.splice(0, 1);
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

    downloadFile() {
      axios({
        url: "../excelTemplate/HSNS.xlsx",
        method: "GET",
        responseType: "arraybuffer",
      })
        .then((response) => {
          const blob = new Blob([response.data]);
          const fileLink = document.createElement("a");
          fileLink.href = URL.createObjectURL(blob);
          fileLink.setAttribute("download", "hsns.xlsx");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(console.error);
    },
  },
  setup() {
    const rows = ref([]);
    const toast = useToast();
    const store = useStore();
    const isLoading = ref(true);

    setTimeout(() => (isLoading.value = false), 1000);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const importPersonnel = () => {
      isLoading.value = true;
      store.dispatch("personnels/ImportPersonnelAction", {
        data: rows.value,
        toast: toast,
        EndTimeLoading,
      });
    };
    return {
      header: [
        "STT",
        "ID",
        "Mã NS",
        "Mã chấm công",
        "Mã hợp đồng ",
        "Họ và tên",
        "Phòng ban",
        "Mã phòng ban",
        "Vị trí",
        "mã vị trí",
        "Chức vụ",
        "mã chức vụ",
        "Ngày vào",
        "Ngày ký HĐLĐ chính thức",
        "Ngày tạo TK 1Office",
        "Trạng thái",
        "Ngày nghỉ việc",
        "Lý do nghỉ",
        "Ngày sinh",
        "Giới tính",
        "Nơi sinh",
        "Nguyên quán",
        "Tình trạng hôn nhân",
        "Quốc tịch",
        "Dân tộc",
        "Tôn giáo",
        "CMT/Căn cước/Hộ chiếu",
        "Ngày cấp",
        "Nơi cấp",
        "[Thường trú] Địa chỉ",
        "[Thường trú] Mã phường xã",
        "[Chỗ ở hiện nay] Số nhà",
        "[Chỗ ở hiện nay] Địa chỉ",
        "Nghỉ việc từ ngày",
        "Nghỉ việc đến ngày",
        "Mã số thuế cá nhân",
        "Trình độ học vấn cao nhất",
        "Trình độ phổ thông",
        "Điện thoại",
        "Email",
        "Số tài khoản",
        "Tên tài khoản",
        "Ngân hàng",
        "Chi nhánh",
        "Tên hợp đồng",
        "Mức đóng bảo hiểm",
        "Lương vị trí",
        "Phụ cấp",
        "Ngày sửa hồ sơ",
        "Tài khoản 1Office",
        "Ngày tạo",
      ],
      rows,
      importPersonnel,
      EndTimeLoading,
      isLoading,
    };
  },
};
</script>

<style></style>
