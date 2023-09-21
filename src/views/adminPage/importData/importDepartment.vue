<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-home></sidebar-home>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false">
        <div class="flex grow">
          <div class="flex items-center">
            <button-create-admin></button-create-admin>
            <p class="longText">Import phòng ban, chi nhánh</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar v-if="isLoading == false">
      <nav-feature></nav-feature>
    </template>
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
    <div>
      <table-responsive :header="header" :isShow="false">
        <tr
          class="bg-white border-b text-left"
          v-for="(department, index) in rows.value"
          :key="index"
        >
          <td class="cellTable text-center">
            {{ department?.__rowNum__ }}
          </td>
          <td class="cellTable">{{ department?.code }}</td>
          <td class="cellTable">{{ department?.title }}</td>
          <td class="cellTable">{{ department?.parent_title }}</td>
          <td class="cellTable">
            {{ department?.bussiness_id }}
          </td>
          <td class="cellTable">
            {{ department?.company_id }}
          </td>
          <td class="cellTable">
            {{ department?.ord }}
          </td>
          <td class="cellTable">
            {{ department?.desc }}
          </td>
          <td class="cellTable">
            {{ department?.type }}
          </td>
          <td class="cellTable">
            {{ department?.tax }}
          </td>
          <td class="cellTable">
            {{ department?.address }}
          </td>
          <td class="cellTable">
            {{ department?.headoffice }}
          </td>
          <td class="cellTable">
            {{ department?.deep }}
          </td>
          <td class="cellTable">
            {{ department?.sub_ids }}
          </td>
          <td class="cellTable">
            {{ department?.ID }}
          </td>
          <td class="cellTable">
            {{ department?.parent_id }}
          </td>
        </tr>
      </table-responsive>
    </div>
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="importDepartment()">
            Cập nhật
          </button>
          <button
            class="button-close-modal"
            @click="this.$router.push('/page-department/type=ACTIVE')"
          >
            Hủy bỏ
          </button>
        </div>
      </div></template
    >
  </person-layout>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarHome from "@/components/sidebar/SidebarHome.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateAdmin from "../ButtonCreateAdmin.vue";
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import { useToast } from "vue-toastification";
import { read, utils, writeFileXLSX } from "xlsx";
export default {
  components: {
    NavFeature,
    PersonLayout,
    SidebarHome,
    NavbarSocial,
    ButtonCreateAdmin,
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
  },
  setup() {
    const rows = ref([]);
    const toast = useToast();
    const store = useStore();
    const importDepartment = () => {
      store.dispatch("departments/ImportDepartmentAction", {
        data: rows.value,
        toast,
      });
    };
    return {
      header: [
        "STT",
        "Mã",
        "Tiêu đề",
        "Phòng ban cha",
        "Khối nghiệp vụ",
        "Công ty cha",
        "Thứ tự",
        "Mô tả",
        "Cấu trúc quyền",
        "Mã số thuế",
        "Địa chỉ",
        "Địa chỉ",
        "Cấp của phòng ban",
        "IDs phòng ban con",
        "ID",
        "ID phòng ban cha",
      ],
      rows,
      importDepartment,
    };
  },
};
</script>

<style></style>
