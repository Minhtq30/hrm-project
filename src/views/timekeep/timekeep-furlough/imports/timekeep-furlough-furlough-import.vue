<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-timekeep></sidebar-timekeep>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false">
        <div class="flex grow">
          <div class="flex items-center">
            <p class="longText p-4">Import quản lý phép</p>
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
    <div class="home w-full">
      <table-responsive :header="header" :isShow="false">
        <tr
          class="bg-white border-b text-left"
          v-for="(furlough, index) in listTimekeepFurloughYear.value"
          :key="index"
        >
          <td class="cellTable text-center">
            {{ furlough?.__rowNum__ }}
          </td>
          <td class="cellTable">{{ furlough.code }}</td>
          <td class="cellTable">{{ furlough.name }}</td>
          <td class="cellTable">{{ furlough.position_id }}</td>
          <td class="cellTable">{{ furlough.department_id }}</td>
          <td class="cellTable">{{ furlough.furlough_total_closed_more }}</td>
          <td class="cellTable">{{ furlough.furlough_total_open }}</td>
          <td class="cellTable">{{ furlough.furlough_total_used }}</td>
          <td class="cellTable">{{ furlough.furlough_total_expired }}</td>
          <td class="cellTable">{{ furlough.furlough_total_closed }}</td>
          <td class="cellTable">{{ furlough.furlough_add }}</td>
          <td class="cellTable">{{ furlough.furlough_accumulation_open }}</td>
          <td class="cellTable">{{ furlough.furlough_accumulation_used }}</td>
          <td class="cellTable">
            {{ furlough.furlough_accumulation_expired }}
          </td>
          <td class="cellTable">{{ furlough.furlough_accumulation_closed }}</td>
          <td class="cellTable">{{ furlough.furlough_year_open }}</td>
          <td class="cellTable">{{ furlough.furlough_year_used }}</td>
          <td class="cellTable">{{ furlough.furlough_year_closed }}</td>
          <td class="cellTable">{{ furlough.furlough_seniority_open }}</td>
          <td class="cellTable">{{ furlough.furlough_seniority_used }}</td>
          <td class="cellTable">{{ furlough.furlough_seniority_closed }}</td>
          <td class="cellTable">{{ furlough.year }}</td>
        </tr>
      </table-responsive>
    </div>
    <!-- <div class="home w-full">
      <table
        class="h-full whitespace-nowrap border divide-gray-300 w-full relative"
        border="1"
      >
        <thead>
          <tr>
            <th
              class="headerTableTimekeepZ10 left-0"
              style="width: 1%; min-width: 40px"
              rowspan="2"
            >
              TT
            </th>
            <th
              class="headerTableTimekeepZ10"
              rowspan="2"
              style="width: 2%; min-width: 95px; left: 65px"
            >
              Mã NV
            </th>
            <th
              class="headerTableTimekeepZ10"
              rowspan="2"
              style="width: 4%; min-width: 210px; left: 160px"
            >
              Họ và tên
            </th>
            <th
              class="headerTableTimekeepZ10"
              rowspan="2"
              style="width: 6%; min-width: 305px; left: 370px"
            >
              Phòng ban
            </th>
            <th
              class="headerTableTimekeepZ10"
              rowspan="2"
              style="width: 1%; min-width: 40px; left: 675px"
            >
              Tổng tồn
            </th>
            <th class="headerTableTimekeepZ5" colspan="4">Tổng phép</th>
            <th class="headerTableTimekeepZ5" rowspan="2">Phép ứng</th>
            <th class="headerTableTimekeepZ5" colspan="4">Phép lũy kế</th>
            <th class="headerTableTimekeepZ5" colspan="3">Phép thâm niên</th>
            <th class="headerTableTimekeepZ5" colspan="3">Phép năm</th>
          </tr>
          <tr>
            <th class="headerTableTimekeepZ5T46">Tổng</th>
            <th class="headerTableTimekeepZ5T46">Sử dụng</th>
            <th class="headerTableTimekeepZ5T46">Hết hạn</th>
            <th class="headerTableTimekeepZ5T46">Tồn cuối</th>
            <th class="headerTableTimekeepZ5T46">Tổng</th>
            <th class="headerTableTimekeepZ5T46">Sử dụng</th>
            <th class="headerTableTimekeepZ5T46">Hết hạn</th>
            <th class="headerTableTimekeepZ5T46">Tồn cuối</th>
            <th class="headerTableTimekeepZ5T46">Tổng</th>
            <th class="headerTableTimekeepZ5T46">Sử dụng</th>
            <th class="headerTableTimekeepZ5T46">Tồn cuối</th>
            <th class="headerTableTimekeepZ5T46">Tổng</th>
            <th class="headerTableTimekeepZ5T46">Sử dụng</th>
            <th class="headerTableTimekeepZ5T46">Tồn cuối</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(furlough, index) in listTimekeepFurloughYear.value"
            :key="index"
            class="border"
          >
            <td
              class="cellTableTimekeepZ6 text-center"
              style="width: 1%; min-width: 40px"
            >
              {{ furlough.__rowNum__ }}
            </td>
            <td
              class="cellTableTimekeepZ6 cursor-pointer"
              style="width: 2%; min-width: 95px; left: 65px"
            >
              {{ furlough.code }}
            </td>
            <td
              class="cellTableTimekeepZ6 cursor-pointer"
              style="width: 4%; min-width: 210px; left: 160px"
            >
              {{ furlough.name }}
            </td>
            <td
              class="cellTableTimekeepZ6 cursor-pointer"
              style="width: 6%; min-width: 305px; left: 370px"
            >
              {{ furlough.department_id }}
            </td>
            <td
              class="cellTableTimekeepZ6 text-center text-[#008000]"
              style="width: 1%; min-width: 40px; left: 675px"
            >
              {{ Number(furlough.furlough_total_closed_more) }}
            </td>
            <td class="cellTableTimekeepNoIndex text-center bg-[#fff7f6]">
              {{ Number(furlough.furlough_total_open) }}
            </td>
            <td class="cellTableTimekeepNoIndex text-center bg-[#fff7f6]">
              {{ Number(furlough.furlough_total_used) }}
            </td>
            <td class="cellTableTimekeepNoIndex text-center bg-[#fff7f6]">
              {{ Number(furlough.furlough_total_expired) }}
            </td>
            <td class="cellTableTimekeepNoIndex text-center bg-[#fff7f6]">
              {{ Number(furlough.furlough_total_closed) }}
            </td>
            <td class="cellTableTimekeepNoIndex text-center">
              {{ Number(furlough.furlough_add) }}
            </td>
            <td class="cellTableTimekeepNoIndex text-center bg-[#fafafa]">
              {{ Number(furlough.furlough_accumulation_open) }}
            </td>
            <td class="cellTableTimekeepNoIndex text-center bg-[#fafafa]">
              {{ Number(furlough.furlough_accumulation_used) }}
            </td>
            <td class="cellTableTimekeepNoIndex text-center bg-[#fafafa]">
              {{ Number(furlough.furlough_accumulation_expired) }}
            </td>
            <td class="cellTableTimekeepNoIndex text-center bg-[#fafafa]">
              {{ Number(furlough.furlough_accumulation_closed) }}
            </td>
            <td class="cellTableTimekeepNoIndex text-center bg-[#f7f5f4]">
              {{ Number(furlough.furlough_seniority_open) }}
            </td>
            <td class="cellTableTimekeepNoIndex text-center bg-[#f7f5f4]">
              {{ Number(furlough.furlough_seniority_used) }}
            </td>
            <td class="cellTableTimekeepNoIndex text-center bg-[#f7f5f4]">
              {{ Number(furlough.furlough_seniority_closed) }}
            </td>
            <td class="cellTableTimekeepNoIndex text-center bg-[#fffbef]">
              {{ Number(furlough.furlough_year_open) }}
            </td>
            <td class="cellTableTimekeepNoIndex text-center bg-[#fffbef]">
              {{ Number(furlough.furlough_year_used) }}
            </td>
            <td class="cellTableTimekeepNoIndex text-center bg-[#fffbef]">
              {{ Number(furlough.furlough_year_closed) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div> -->
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="importTimekeepFurlough()">
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
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import SidebarTimekeep from "@/components/sidebar/SidebarTimekeep.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { ref } from "@vue/reactivity";
import { useToast } from "vue-toastification";
import { read, utils, writeFileXLSX } from "xlsx";
import { FormatDate } from "@/constants/FormatAll";
import { useTimekeepFurlough } from "@/store/modules/timekeep/timekeepFurlough";
export default {
  components: {
    NavFeature,
    PersonLayout,
    SidebarTimekeep,
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
            this.listTimekeepFurloughYear.value = utils.sheet_to_json(
              wb.Sheets[wb.SheetNames[0]],
              {
                raw: false,
              }
            );
            //delete header
            this.listTimekeepFurloughYear.value.splice(0, 1);
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
      utils.sheet_add_json(ws, this.listTimekeepFurloughYear.value, {
        origin: "A2",
        skipHeader: true,
      });
      utils.book_append_sheet(wb, ws, "Data");
      writeFileXLSX(wb, "Quan Ly Nghi phep.xlsx");
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
    const listTimekeepFurloughYear = ref([]);
    const toast = useToast();
    const furlough = useTimekeepFurlough();
    const importTimekeepFurlough = () => {
      furlough.ImportTimekeepFurloughAction({
        data: listTimekeepFurloughYear.value,
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
      listTimekeepFurloughYear,
      importTimekeepFurlough,
      isLoading,
      toast,
    };
  },
};
</script>

<style></style>
