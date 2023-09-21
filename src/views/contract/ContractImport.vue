<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-personnel></sidebar-personnel>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false">
        <div class="flex grow">
          <div class="flex items-center">
            <p class="longText p-4">Import hợp đồng</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar v-if="isLoading == false">
      <nav-feature></nav-feature>
    </template>
    <div>
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
      <div v-if="isLoading == false">
        <table-responsive :header="header" :isShow="false">
          <tr
            class="bg-white border-b text-left"
            v-for="(contract, index) in rows.value"
            :key="index"
          >
            <td class="cellTable text-center">
              {{ contract?.__rowNum__ }}
            </td>
            <td class="cellTable">{{ contract.contract_code }}</td>
            <td class="cellTable">{{ contract.personnel_code }}</td>
            <td class="cellTable">{{ contract.personnel_id }}</td>
            <td class="cellTable">{{ contract.personnel_name }}</td>
            <td class="cellTable">{{ contract.title }}</td>
            <td class="cellTable">{{ contract.work_type }}</td>
            <td class="cellTable">{{ contract.department_title }}</td>
            <td class="cellTable">{{ contract.position }}</td>
            <td class="cellTable">{{ contract.position_title }}</td>
            <td class="cellTable">{{ contract.work_place }}</td>
            <td class="cellTable">{{ contract.date_start }}</td>
            <td class="cellTable">{{ contract.date_finish }}</td>
            <td class="cellTable">{{ contract.date_reg }}</td>
            <td class="cellTable">{{ contract.date_luidation }}</td>
            <td class="cellTable">{{ contract.reason_luidation }}</td>
            <td class="cellTable">{{ contract.reason_stop_id }}</td>
            <td class="cellTable">{{ contract.status }}</td>
            <td class="cellTable">{{ contract.date_created }}</td>
            <td class="cellTable">{{ contract.created_by_id }}</td>
            <td class="cellTable">{{ contract.job_status }}</td>
            <td class="cellTable">{{ contract.contract_type }}</td>
            <td class="cellTable">{{ contract.is_last_contract }}</td>
          </tr>
        </table-responsive>
      </div>
    </div>
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="importContract()">
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
  <!-- <loading-overlay :isLoading="isLoadingLoad"></loading-overlay> -->
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarPersonnel from "@/components/sidebar/SidebarPersonnel.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { ref } from "@vue/reactivity";
import { useToast } from "vue-toastification";
import { read, utils, writeFileXLSX } from "xlsx";
import { useContract } from "@/store/modules/contract/contracts";
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
              blankrows: true,
              dateNF: "dd-mm-yyyy",
              locale: "en-US",
            });
            /* Get first worksheet */
            this.rows.value = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
              raw: false,
              dateNF: "dd-mm-yyyy",
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
      writeFileXLSX(wb, "Tat_ca_hop_dong.xlsx");
    },
  },
  setup() {
    const rows = ref([]);
    const toast = useToast();
    const contract = useContract();
    const isLoading = ref(true);
    setTimeout(() => (isLoading.value = false), 1000);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const importContract = () => {
      isLoading.value = true;
      contract.ImportContractAction({
        data: rows.value,
        toast,
        EndTimeLoading,
      });
    };
    return {
      header: [
        "STT",
        "Mã HĐ",
        "Mã nhân sự",
        "Nhân sự",
        "Tên nhân sự",
        "Tên hợp đồng",
        "Hình thức hợp đồng",
        "Phòng ban",
        "Vị trí",
        "Chức vụ",
        "Nơi làm việc",
        "Hiệu lực từ ngày",
        "Đến ngày",
        "Ngày ký",
        "Ngày thanh lý",
        "Lý do thanh lý",
        "Lý do thôi việc",
        "Tình trạng",
        "Ngày tạo",
        "Người tạo",
        "Trạng thái nhân sự",
        "Loại hợp đồng",
        "Hợp đồng hiện tại của nhân sự",
      ],
      rows,
      importContract,
      isLoading,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
