<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-wage></sidebar-wage>
    </template>
    <template v-slot:navbar>
      <navbar-social
        ><div class="flex grow">
          <div class="flex items-center">
            <button-create-wage></button-create-wage>
            <p class="longText">Danh sách loại bảng lương</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div></div>
        <div class="flex">
          <div class="btn-icon group relative">
            <div class="cx">
              <i class="fal fa-file-export"></i>
            </div>
            <div class="action-label">Export</div>
            <div
              class="absolute z-10 right-0 top-10 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute drop-shadow-2xl"
            >
              <ul class="bg-white p-3 rounded-md">
                <li class="w-52 sub-item">Xuất tất cả</li>
                <li class="w-52 sub-item">Chọn trường để export</li>
              </ul>
            </div>
          </div>
        </div></nav-feature
      ></template
    >
    <div class="home w-full">
      <div>
        <table-responsive
          :header="header"
          :checkAll="checkedAllItem"
          :isCheck="checkedAll"
        >
          <tr
            class="bg-white border-b"
            v-for="payroll in listPayrollType"
            :key="payroll.ID"
            @contextmenu.prevent="rightClick($event, payroll)"
          >
            <td class="w-4 px-6 py-3">
              <div class="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox" />
                <label for="checkbox-table-search-1" class="sr-only"
                  >checkbox</label
                >
              </div>
            </td>
            <td class="cellTable">{{}}</td>
            <td class="cellTable">{{ payroll.title }}</td>
            <td class="cellTable">{{ payroll.keyword }}</td>
            <td class="cellTable">{{ payroll.deparment }}</td>
            <td class="cellTable">{{ payroll.position }}</td>
            <td class="cellTable">{{ payroll.payroll }}</td>
            <td class="cellTable">{{}}</td>
            <td class="cellTable">{{}}</td>
          </tr>
        </table-responsive>
      </div>
    </div>
  </person-layout>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarWage from "@/components/sidebar/SidebarWage.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateWage from "@/views/wages/ButtonCreateWage.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
export default {
  components: {
    PersonLayout,
    SidebarWage,
    NavbarSocial,
    ButtonCreateWage,
    NavFeature,
    TableResponsive,
  },
  methods: {},
  data() {
    return {
      header: [
        "Người tạo",
        "Tên bảng lương",
        "Từ Khóa đại diện",
        "Phòng ban áp dụng",
        "Vị trí áp dụng",
        "Bảng lương",
        "Người quản lý",
        "Người theo dõi",
      ],
      listPayrollType: [
        {
          ID: 1,
          title: "Bảng lương Công ty",
          keyword: "LUONG_PHU",
          deparment: "CHI NHÁNH MIỀN BẮC",
          position: "Tất cả",
          payroll: "Chính",
        },
      ],
    };
  },
};
</script>

<style></style>
