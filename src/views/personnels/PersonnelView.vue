<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-personnel></sidebar-personnel>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <template v-slot:search>
          <search-view :handleSearch="handleSearch"></search-view>
        </template>
        <div class="flex grow">
          <div class="flex items-center">
            <div>
              <button-create-personnel></button-create-personnel>
            </div>
            <div class="longText">Danh sách nhân sự</div>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar
      ><nav-feature>
        <div
          v-if="checkRole(['PERSONNEL_PROFILE'])"
          class="flex justify-between w-full"
        >
          <div class="flex items-center" v-if="checkPersonnels.length < 1">
            <div>
              <navbar-personnel></navbar-personnel>
            </div>
          </div>
          <div class="flex">
            <!-- <div
              class="btn-icon"
              title="Nhãn"
              v-if="checkPersonnels.length < 1"
            >
              <div class="cx"><i class="fal fa-tag"></i></div>
              <div class="action-label">Nhãn</div>
            </div> -->
            <!-- <div
              class="btn-icon"
              title="Phòng ban"
              v-if="checkPersonnels.length < 1"
            >
              <div class="cx"><i class="fal fa-sitemap"></i></div>
              <div class="action-label">Phòng ban</div>
            </div> -->
            <!-- <div class="btn-icon relative group" title="Email/SMS">
              <div class="cx"><i class="fal fa-envelope"></i></div>
              <div class="action-label">Email/SMS</div>
              <div
                class="absolute z-10 left-0 top-14 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
              >
                <ul class="bg-white p-3 rounded-md">
                  <li class="w-28 sub-item">SMS+</li>
                  <li class="w-28 sub-item">Email</li>
                </ul>
              </div>
            </div> -->

            <!-- <div
              class="btn-icon relative group"
              title="Biểu mẫu"
              v-if="checkPersonnels.length > 0"
            >
              <div class="cx"><i class="fal fa-scroll"></i></div>
              <div class="action-label">Biểu mẫu</div>
              <div
                class="absolute z-10 -left-16 top-14 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
              >
                <ul class="bg-white p-3 rounded-md">
                  <li class="w-44 sub-item">Xuất tất cả</li>
                  <li class="w-44 sub-item">Chọn trường để export</li>
                </ul>
              </div>
            </div> -->
            <div class="btn-icon relative group" title="Export">
              <div class="cx"><i class="fal fa-file-export"></i></div>
              <div class="action-label">Export</div>
              <div
                class="absolute z-10 -left-16 top-14 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
              >
                <ul class="bg-white p-3 rounded-md">
                  <li class="w-44 sub-item" @click="AllExport()">
                    Xuất tất cả
                  </li>
                  <li class="w-44 sub-item" @click="showModalExport()">
                    Chọn trường để export
                  </li>
                </ul>
              </div>
            </div>
            <div class="btn-icon relative group" title="Import">
              <div class="cx"><i class="fal fa-file-import"></i></div>
              <div class="action-label">Import</div>
              <div
                class="absolute z-10 right-0 top-12 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
              >
                <ul class="bg-white p-2 rounded-md">
                  <li
                    class="w-60 sub-item"
                    @click="this.$router.push('/personnel-import')"
                  >
                    Import hồ sơ nhân sự
                  </li>
                  <li class="w-60 sub-item">Import lương, phụ cấp nhân sự</li>
                  <li class="w-60 sub-item">
                    Xem lịch sử import hồ sơ nhân sự
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav-feature></template
    >
    <div v-if="checkRole(['PERSONNEL_PROFILE'])">
      <Transition name="slide-fade">
        <div class="w-full" v-if="isLoading == false">
          <div v-if="listPersonnels?.length">
            <table-responsive
              :header="header"
              :checkAll="checkedAllItem"
              :isCheck="checkedAll"
              ><tr
                class="bg-white border-b"
                v-for="personnel in listPersonnels"
                :key="personnel.ID"
                @contextmenu.prevent="rightClick($event, personnel)"
                :class="{
                  isCheck: CheckedBox(personnel.ID),
                }"
              >
                <td class="w-4 px-6 py-3">
                  <div class="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      v-model="checkPersonnels"
                      :value="personnel.ID"
                    />
                    <label for="checkbox-table-search-1" class="sr-only"
                      >checkbox</label
                    >
                  </div>
                </td>
                <td
                  class="cellTable cursor-pointer"
                  @click="ShowDetail(personnel.ID)"
                >
                  {{ personnel.code }}
                </td>
                <td class="cellTable">{{ personnel.attendace_code }}</td>
                <td
                  class="cellTable cursor-pointer"
                  @click="ShowDetail(personnel.ID)"
                >
                  {{ personnel.name }}
                </td>
                <td class="cellTable">
                  {{ personnel.department }}
                </td>
                <td class="cellTable">
                  {{ personnel.position }}
                </td>
                <td class="cellTable">
                  {{ personnel.job_title_current }}
                </td>
                <td class="cellTable">
                  {{ formatdate(personnel.job_date_join) }}
                </td>
                <td class="cellTable">
                  {{ formatdate(personnel.birthday) }}
                </td>
                <td class="cellTable">
                  {{ formatGender(personnel.gender) }}
                </td>
                <td class="cellTable">
                  <div
                    class="beacon"
                    :class="formatColorWork(personnel?.job_status)"
                  >
                    {{ formatStatusWork(personnel?.job_status) }}
                  </div>
                </td>
                <td class="cellTable">
                  {{ formatDateCreateAcc(personnel.date_activated_account) }}
                </td>
              </tr></table-responsive
            >
          </div>
          <div v-else class="p-2 flex flex-col justify-center">
            <h2>Không tìm thấy kết quả</h2>
            <div class="flex justify-center">
              <img :src="imgNoData" alt="" class="w-[300px] h-[300px]" />
            </div>
          </div>
        </div>
      </Transition>
    </div>
    <div v-else class="p-2 flex flex-col justify-center">
      <h2>Không tìm thấy kết quả</h2>
      <div class="flex justify-center">
        <img :src="imgNoData" alt="" class="w-[300px] h-[300px]" />
      </div>
    </div>
    <template v-slot:sub_footer v-if="listPersonnels?.length"
      ><div class="flex justify-between items-center">
        <div class="p-4 text-sm">
          Hiển thị {{ listPagination.from }} - {{ listPagination.to }} trong số
          {{ listPagination.total }} bản ghi
        </div>
        <div class="flex justify-end p-4">
          <pagination-view
            :listPagination="listPagination"
            :NextPage="NextPage"
            :PrevPage="PrevPage"
          ></pagination-view>
        </div></div
    ></template>
  </person-layout>
  <div>
    <context-menu :isActive="isActive">
      <ul>
        <li
          @click.prevent="updatePersonnel()"
          v-if="checkRole(['PERSONNEL_PROFILE_UPDATE'])"
        >
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li
          @click.prevent="handleOpenConfirm()"
          v-if="checkRole(['PERSONNEL_PROFILE_DELETE'])"
        >
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
        <hr />
        <li
          @click.prevent="handleOpenCreateAccount()"
          v-if="
            isShowCreateAccount &&
            checkRole([
              'PERSONNEL_PROFILE_MANAGE_ALL',
              'PERSONNEL_PROFILE_MANAGE_DEPARTMENT',
              'PERSONNEL_PROFILE_MANAGE_COMPANY',
              'PERSONNEL_PROFILE_MANAGE_BRANCH',
            ])
          "
        >
          <i class="fal fa-check"></i><a href="#">Tạo tài khoản</a>
        </li>
        <li
          @click.prevent="handleBlockAccount()"
          v-if="
            !isShowCreateAccount &&
            checkRole([
              'PERSONNEL_PROFILE_MANAGE_ALL',
              'PERSONNEL_PROFILE_MANAGE_DEPARTMENT',
              'PERSONNEL_PROFILE_MANAGE_COMPANY',
              'PERSONNEL_PROFILE_MANAGE_BRANCH',
            ])
          "
        >
          <i class="fal fa-user-lock"></i><a href="#">Khóa tài khoản</a>
        </li>
        <li
          @click.prevent="handleCreateContract()"
          v-if="
            checkRole([
              'PERSONNEL_PROFILE_MANAGE_ALL',
              'PERSONNEL_PROFILE_MANAGE_DEPARTMENT',
              'PERSONNEL_PROFILE_MANAGE_COMPANY',
              'PERSONNEL_PROFILE_MANAGE_BRANCH',
            ])
          "
        >
          <i class="fal fa-file-contract"></i><a href="#">Tạo mới hợp đồng</a>
        </li>
        <hr />
        <li @click.prevent="handleOpenWork()" title="Cập nhật công việc">
          <i class="fal fa-tasks"></i><a href="#">Cập nhật công việc</a>
        </li>
        <li @click.prevent="handleOpenReceive()" title="Cập nhật tiếp nhận">
          <i class="fal fa-list-alt"></i><a href="#">Cập nhật tiếp nhận</a>
        </li>
        <!-- yêu cầu tạm ẩn -->
        <!-- <li
          @click.prevent="handleOpenStatus()"
          title="Cập nhật trạng thái hồ sơ"
        >
          <i class="fal fa-sync"></i><a href="#">Cập nhật trạng thái hồ sơ</a>
        </li> -->
        <li @click.prevent="handleOpenConcurrently()" title="Kiêm nhiệm">
          <i class="fal fa-vote-yea"></i><a href="#">Kiêm nhiệm</a>
        </li>
        <li title="Lịch sử hoạt động" @click.prevent="handleOpenInsurance()">
          <i class="fal fa-notes-medical"></i>Cập nhật bảo hiểm
        </li>
      </ul>
    </context-menu>
  </div>
  <teleport to="#app">
    <!-- Start Tạo tài khoản  -->
    <modal-view
      :isOpen="isOpenCreateAccount"
      :handleCloseDetail="handleCloseCreateAccount"
    >
      <form-create-user
        :userID="CreateAccountPersonnel"
        :closeModal="handleCloseCreateAccount"
      ></form-create-user>
    </modal-view>
    <!-- End tạo tài khoản -->
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="deletePersonnel"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
    <!-- Start Cập nhật tiếp nhận -->
    <modal-view :isOpen="isOpenReceive" :handleCloseDetail="handleCloseReceive">
      <update-receive-vue
        :PersonnelDetail="CreateAccountPersonnel"
        :CloseReceive="handleCloseReceive"
      ></update-receive-vue>
    </modal-view>
    <!-- End Cập nhật tiếp nhận -->
    <!-- Start cập nhật công việc -->
    <modal-view :isOpen="isOpenWork" :handleCloseDetail="handleCloseWork">
      <update-work-vue
        :PersonnelDetail="detailPersonnel"
        :CloseWork="handleCloseWork"
      >
      </update-work-vue>
    </modal-view>
    <!-- End cập nhật công việc -->
    <!-- Start cập nhật trạng thái -->
    <modal-view :isOpen="isOpenStatus" :handleCloseDetail="handleCloseStatus">
      <update-status-vue
        :PersonnelDetail="detailPersonnel"
        :CloseStatus="handleCloseStatus"
      >
      </update-status-vue>
    </modal-view>
    <!-- End cập nhật trạng thái -->
    <!-- Start kiêm nhiệm -->
    <modal-view
      :isOpen="isOpenConcurrently"
      :handleCloseDetail="handleCloseConcurrently"
    >
      <update-concurrently
        :PersonnelDetail="detailPersonnel"
        :CloseConcurrently="handleCloseConcurrently"
      >
      </update-concurrently>
    </modal-view>
    <!-- End kiêm nhiệm -->
    <!-- Start bảo hiểm -->
    <modal-view
      :isOpen="isOpenInsurance"
      :handleCloseDetail="handleCloseInsurance"
    >
      <update-insurance
        :PersonnelDetail="personnelDetail"
        :CloseInsurance="handleCloseInsurance"
      ></update-insurance>
    </modal-view>
    <!-- End bảo hiểm -->
    <!-- Start bảo hiểm -->
    <div>
      <ModalView1 v-show="isModalVisibleExport" @close="closeModalExport">
        <template v-slot:header><div class="p-1">Xuất dữ liệu</div></template>
        <template v-slot:body>
          <div class="grid grid-cols-1 gap-1 mt-2 w-[450px]">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Chọn trường</label>
              <div class="departInput mt-1">
                <div class="departInput placeholder:text-lg">
                  <v-select
                    label="name"
                    :options="ExportField"
                    :reduce="(status) => status.code"
                    @option:selected="changeInputExport($event, index)"
                    multiple
                    append-to-body
                    placeholder="Chọn nhiều"
                    class="rounded-3xl"
                    v-model="fieldArr"
                  >
                    <template #option="{ name }">
                      <div
                        class=""
                        style="display: flex; align-items: baseline"
                      >
                        <strong>{{ name }}</strong>
                      </div>
                    </template>
                  </v-select>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <div class="w-full text-right">
            <button
              type="button"
              class="btn-green"
              style="background-color: var(--color-primary)"
              @click="CustomExport()"
            >
              Export
            </button>
            <button
              type="button"
              class="btn-green ml-2"
              style="background-color: var(--color-primary)"
              @click="closeModalExport()"
              aria-label="Đóng"
            >
              Hủy bỏ
            </button>
          </div>
        </template>
      </ModalView1>
    </div>
  </teleport>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
  <loading-overlay
    :isLoading="isLoadingShow"
    :handleEndLoading="EndTimeLoadingShow"
  ></loading-overlay>
</template>
<script>
import NavbarPersonnel from "./NavbarPersonnel.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import PaginationView from "@/components/pagination/PaginationView.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarPersonnel from "@/components/sidebar/SidebarPersonnel.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreatePersonnel from "@/views/personnels/ButtonCreatePersonnel.vue";
import SearchView from "@/components/search/SearchView.vue";
import noData from "@/assets/images/noData.png";
import UpdateReceiveVue from "./UpdateModal/UpdateReceive.vue";
import UpdateWorkVue from "./UpdateModal/UpdateWork.vue";
import UpdateStatusVue from "./UpdateModal/UpdateStatus.vue";
import UpdateConcurrently from "./UpdateModal/UpdateConcurrently.vue";
import UpdateInsurance from "./UpdateModal/UpdateInsurance.vue";
import FormCreateUser from "@/views/adminPage/pageUser/FormCreateUser.vue";
import ModalView1 from "@/components/modal/ModalView1.vue";
import { useStore } from "vuex";
import { utils, writeFileXLSX } from "xlsx";
import { computed, ref, watch, reactive } from "vue";
import {
  FormatDate,
  FormatGender,
  FormatStatusWork,
  FormatModalX,
  FormatModalY,
  FormatRole,
  FormatTrueFalse,
  FormatColorWork,
} from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
export default {
  data() {
    return {
      header: [
        "Mã NS",
        "Mã chấm công",
        "Họ và tên",
        "Phòng ban",
        "Vị trí",
        "Chức vụ",
        "Ngày vào",
        "Ngày sinh",
        "Giới tính",
        "Trạng thái",
        "Ngày tạo TK",
      ],
      personDetail: {},
      imgNoData: noData,
    };
  },
  components: {
    TableResponsive,
    NavFeature,
    PaginationView,
    PersonLayout,
    SidebarPersonnel,
    NavbarSocial,
    ButtonCreatePersonnel,
    NavbarPersonnel,
    SearchView,
    UpdateReceiveVue,
    UpdateWorkVue,
    UpdateStatusVue,
    FormCreateUser,
    UpdateConcurrently,
    UpdateInsurance,
    ModalView1,
  },
  methods: {
    importPersonnels() {},
    formatStatus(st) {
      return FormatTrueFalse(st);
    },
    formatdate(date) {
      return FormatDate(date);
    },
    formatDateCreateAcc(date) {
      if (date == null) {
        return "";
      } else {
        return FormatDate(date);
      }
    },
    formatGender(gender) {
      return FormatGender(gender);
    },
    formatColorWork(stt) {
      return FormatColorWork(stt);
    },
    formatStatusWork(stt) {
      return FormatStatusWork(stt);
    },
    formatSpace(text) {
      return text
        .split(" ")
        .join("")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
    },
    // export dữ liệu sang file excel
    exportCustomField() {
      // console.log(array);
      // let Heading = [
      //   [
      //     "Mã nhân viên",
      //     "Tên nhân viên",
      //     "Phòng ban",
      //     "Vị trí",
      //     "Chức vụ",
      //     "Ngày vào",
      //     "Sinh nhật",
      //     "Giới tính",
      //     "Ngày kích hoạt",
      //   ],
      // ];

      const wb = utils.book_new();

      const ws = utils.json_to_sheet([]);
      ws["!cols"] = [
        { width: 20 },
        { width: 30 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 30 },
        { width: 20 },
        { width: 30 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 30 },
        { width: 20 },
        { width: 30 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 30 },
        { width: 20 },
        { width: 30 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 60 },
        { width: 60 },
        { width: 30 },
      ];

      // utils.sheet_add_aoa(ws, Heading);
      utils.sheet_add_json(ws, this.listPersonnelExport, {
        origin: "A1",
        skipHeader: false,
      });
      utils.book_append_sheet(wb, ws, "Data");
      // const max_width = edata.reduce((w, r) => Math.max(w, r.name.length), 10);
      // ws["!cols"] = [{ wch: max_width }];
      writeFileXLSX(wb, "Personnels.xlsx");
    },
    // export dữ liệu sang file excel
    exportFile() {
      let Heading = [
        [
          "Mã nhân sự",
          "Tên nhân viên",
          "Mã chấm công",
          "Mã hợp đồng",
          "Loại hợp đồng",
          "Sinh nhật",
          "Email cá nhân",
          "Giới tính",
          "Tình trạng hôn nhân",
          "Số CMND/CCCD",
          "Ngày đăng kí CMND/CCCD",
          "Nơi đăng kí CMND/CCCD",
          "Số điện thoại",
          "Email công ty",
          "Dân tộc",
          "Tôn giáo",
          "Quốc tịch",
          "Vị trí",
          "Phòng ban",
          "Trình độ học vấn",
          "Trình độ phổ thông",
          "Chức vụ",
          "Nơi làm việc",
          "Số tài khoản ngân hàng",
          "Tên ngân hàng",
          "Tên chủ tài khoản",
          "Trạng thái làm việc",
          "Ngày nghỉ việc",
          "Ngày nhận việc",
          "Ngày vào chính thức",
          "Ngày bắt đầu nghỉ chế độ",
          "Ngày kết thúc nghỉ chế độ",
          "Ngày kích hoạt tài khoản",
          "Nơi sinh",
          "Nguyên quán",
          "Địa chỉ thường trú",
          "Địa chỉ hiện tại",
          "Số điện thoại tại công ty",
        ],
      ];

      const wb = utils.book_new();
      const ws = utils.json_to_sheet([]);
      // if (!ws["!merges"]) ws["!merges"] = [];
      // ws["!merges"].push(utils.decode_range("A1:E1"));
      ws["!cols"] = [
        { width: 20 },
        { width: 30 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 30 },
        { width: 20 },
        { width: 30 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 30 },
        { width: 20 },
        { width: 30 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 30 },
        { width: 20 },
        { width: 30 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 60 },
        { width: 60 },
        { width: 30 },
      ];
      const edata = this.listAllPersonnelExport.map(function (obj) {
        return {
          ma_nhan_su: obj.ma_nhan_su,
          ten: obj.ten,
          ma_cham_cong: obj.ma_cham_cong,
          ma_hop_dong: obj.ma_hop_dong,
          loai_hop_dong: obj.loai_hop_dong,
          ngay_sinh: obj.ngay_sinh,
          email_ca_nhan: obj.email_ca_nhan,
          gioi_tinh: obj.gioi_tinh,
          tinh_trang_hon_nhan: obj.tinh_trang_hon_nhan,
          cmnn_cccd: obj.cmnn_cccd,
          ngay_dang_ky_cccd: obj.ngay_dang_ky_cccd,
          noi_dang_ky_cccd: obj.noi_dang_ky_cccd,
          so_dien_thoai: obj.so_dien_thoai,
          email_congty: obj.email_congty,
          dan_toc: obj.dan_toc,
          ton_giao: obj.ton_giao,
          quoc_tich: obj.quoc_tich,
          vi_tri: obj.vi_tri,
          phong_ban: obj.phong_ban,
          trinh_do_hoc_van: obj.trinh_do_hoc_van,
          thpt: obj.thpt,
          chuc_vu: obj.chuc_vu,
          noi_lam_viec: obj.noi_lam_viec,
          so_tai_khoan_ngan_hang: obj.so_tai_khoan_ngan_hang,
          ten_ngan_hang: obj.ten_ngan_hang,
          ten_chu_tai_khoan: obj.ten_chu_tai_khoan,
          trang_thai_lam_viec: obj.trang_thai_lam_viec,
          ngay_nghi_viec: obj.ngay_nghi_viec,
          ngay_nhan_viec: obj.ngay_nhan_viec,
          ngay_vao_chinh_thuc: obj.ngay_vao_chinh_thuc,
          ngay_bat_dau_nghi_che_do: obj.ngay_bat_dau_nghi_che_do,
          ngay_ket_thuc_nghi_che_do: obj.ngay_ket_thuc_nghi_che_do,
          ngay_kich_hoat_tai_khoan: obj.ngay_kich_hoat_tai_khoan,
          noi_sinh: obj.noi_sinh,
          nguyen_quan: obj.nguyen_quan,
          dia_chi_thuong_tru: obj.dia_chi_thuong_tru,
          dia_chi_hien_tai: obj.dia_chi_hien_tai,
          so_dien_thoai_tai_cong_ty: obj.so_dien_thoai_tai_cong_ty,
        };
      });

      for (let item of Object.keys(edata)) {
        if (edata[item].job_status == "WORKING") {
          edata[item].job_status = "Đang làm việc";
        } else if (edata[item].job_status == "STOP_WORKING") {
          edata[item].job_status = "Nghỉ việc";
        } else if (edata[item].job_status == "LEAVING") {
          edata[item].job_status = "Nghỉ chế độ";
        } else if (edata[item].gender == "1") {
          edata[item].gender = "Nam";
        } else if (edata[item].gender == "0") {
          edata[item].gender = "Nữ";
        }
        if (edata[item].gender == "1") {
          edata[item].gender = "Nam";
        } else if (edata[item].gender == "0") {
          edata[item].gender = "Nữ";
        }
      }
      utils.sheet_add_aoa(ws, Heading);
      utils.sheet_add_json(ws, edata, {
        origin: "A2",
        skipHeader: true,
      });
      utils.book_append_sheet(wb, ws, "Data");
      // const max_width = edata.reduce((w, r) => Math.max(w, r.name.length), 10);
      // ws["!cols"] = [{ wch: max_width }];
      writeFileXLSX(wb, "Personnels.xlsx");
    },
    CustomExport() {
      const obj = this.fieldArr;
      const array = Object.values(obj);
      this.$store.dispatch("personnels/getCustomPersonnelExportAction", {
        perPage: 50000,
        array: array,
        exportFuncition: this.exportCustomField,
      });
      this.isModalVisibleExport = false;
    },

    AllExport() {
      this.$store.dispatch("personnels/ExportAllPersonnelAction", {
        exportFuncition: this.exportFile,
      });
    },

    showModalExport() {
      this.isModalVisibleExport = true;
    },
    closeModalExport() {
      this.isModalVisibleExport = false;
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const toast = useToast();
    const route = useRoute();
    const checkedAll = ref(false);
    const isModalVisibleExport = ref(false);
    const checkPersonnels = ref([]);
    const checkPersonnelRow = ref();
    const isActive = ref(false);
    const personnelID = ref("");
    const detailPersonnel = ref("");
    const CreateAccountPersonnel = ref();
    const perPage = ref(50);
    const isOpenDetail = ref(false);
    const isOpenCreateAccount = ref(false);
    const isLoading = ref(true);
    const isShowCreateAccount = ref(false);
    const isLoadingShow = ref(false);
    const isOpenConfirm = ref(false);
    const isOpenReceive = ref(false);
    const isOpenWork = ref(false);
    const isOpenStatus = ref(false);
    const isOpenConcurrently = ref(false);
    const isOpenInsurance = ref(false);
    const profile = useUserProfile();
    const { userProfile } = storeToRefs(profile);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EndTimeLoadingShow = () => {
      isLoadingShow.value = false;
    };

    const dataExport = reactive({});

    const fieldArr = ref([]);
    const fieldArrName = ref([]);

    let ExportField = [
      {
        stt: "1",
        code: "ma_nhan_su",
        name: "Mã nhân sự",
      },
      {
        stt: "2",
        code: "ten",
        name: "Tên nhân sự",
      },
      {
        stt: "3",
        code: "ma_cham_cong",
        name: "Mã chấm công",
      },
      {
        stt: "4",
        code: "ma_hop_dong",
        name: "Mã hợp đồng",
      },
      {
        stt: "5",
        code: "loai_hop_dong",
        name: "Loại hợp đồng",
      },
      {
        stt: "6",
        code: "ngay_sinh",
        name: "Sinh nhật",
      },
      {
        stt: "7",
        code: "email_ca_nhan",
        name: "Email cá nhân",
      },
      {
        stt: "8",
        code: "gioi_tinh",
        name: "Giới tính",
      },
      {
        stt: "9",
        code: "tinh_trang_hon_nhan",
        name: "Tình trạng hôn nhân",
      },
      {
        stt: "10",
        code: "cmnn_cccd",
        name: "Số CMND/CCCD",
      },
      {
        stt: "11",
        code: "ngay_dang_ky_cccd",
        name: "Ngày đăng kí CMND/CCCD",
      },
      {
        stt: "12",
        code: "noi_dang_ky_cccd",
        name: "Nơi đăng kí CMND/CCCD",
      },
      {
        stt: "13",
        code: "so_dien_thoai",
        name: "Số điện thoại",
      },
      {
        stt: "14",
        code: "email_congty",
        name: "Email công ty",
      },
      {
        stt: "15",
        code: "dan_toc",
        name: "Dân tộc",
      },
      {
        stt: "16",
        code: "ton_giao",
        name: "Tôn giáo",
      },
      {
        stt: "17",
        code: "quoc_tich",
        name: "Quốc tịch",
      },
      {
        stt: "18",
        code: "vi_tri",
        name: "Vị trí",
      },
      {
        stt: "19",
        code: "phong_ban",
        name: "Phòng ban",
      },
      {
        stt: "20",
        code: "trinh_do_hoc_van",
        name: "Trình độ học vấn",
      },
      {
        stt: "21",
        code: "thpt",
        name: "Trình độ phổ thông",
      },
      {
        stt: "22",
        code: "chuc_vu",
        name: "Ngày tạo TK",
      },
      {
        stt: "23",
        code: "noi_lam_viec",
        name: "Nơi làm việc",
      },
      {
        stt: "24",
        code: "so_tai_khoan_ngan_hang",
        name: "Tên ngân hàng",
      },
      {
        stt: "25",
        code: "ten_ngan_hang",
        name: "Vị trí",
      },
      {
        stt: "26",
        code: "ten_chu_tai_khoan",
        name: "Tên chủ tài khoản",
      },
      {
        stt: "27",
        code: "trang_thai_lam_viec",
        name: "Ngày vào",
      },
      {
        stt: "28",
        code: "ngay_nghi_viec",
        name: "Ngày nghỉ việc",
      },
      {
        stt: "29",
        code: "ngay_nhan_viec",
        name: "Ngày nhận việc",
      },
      {
        stt: "30",
        code: "ngay_vao_chinh_thuc",
        name: "Ngày vào chính thức",
      },
      {
        stt: "31",
        code: "ngay_bat_dau_nghi_che_do",
        name: "Ngày bắt đầu nghỉ chế độ",
      },
      {
        stt: "32",
        code: "ngay_ket_thuc_nghi_che_do",
        name: "Ngày kết thúc nghỉ chế độ",
      },
      {
        stt: "33",
        code: "ngay_kich_hoat_tai_khoan",
        name: "Ngày kích hoạt tài khoản",
      },
      {
        stt: "34",
        code: "noi_sinh",
        name: "Nơi sinh",
      },
      {
        stt: "35",
        code: "nguyen_quan",
        name: "Nguyên quán",
      },
      {
        stt: "36",
        code: "dia_chi_thuong_tru",
        name: "Địa chỉ thường trú",
      },
      {
        stt: "37",
        code: "dia_chi_hien_tai",
        name: "Địa chỉ hiện tại",
      },
      {
        stt: "38",
        code: "so_dien_thoai_tai_cong_ty",
        name: "Số điện thoại tại công ty",
      },
    ];

    const changeInputExport = (e) => {
      fieldArrName.value.push(e.name);
    };

    store.dispatch("personnels/getAllPersonnelEndTimeLoadingAction", {
      key: route.params.key,
      EndTimeLoading,
    });
    watch(route, (to) => {
      isLoading.value = true;
      if (to.path == `/personnel/type=${to.params.key}`) {
        store.dispatch("personnels/getAllPersonnelEndTimeLoadingAction", {
          key: to.params.key,
          EndTimeLoading,
        });
      }
    });
    const rightClick = (e, personnel) => {
      if (isActive.value === true) {
        checkPersonnelRow.value = 0;
        isActive.value = false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        personnelID.value = personnel.ID;
        detailPersonnel.value = personnel;
        CreateAccountPersonnel.value = personnel;
        checkPersonnelRow.value = personnel.ID;
      }
      if (CreateAccountPersonnel.value.date_activated_account == null) {
        isShowCreateAccount.value = true;
      } else {
        isShowCreateAccount.value = false;
      }
    };
    const ShowDetail = (id) => {
      router.push(`/personnelDetail/${id}`);
    };
    const handleCloseDetail = () => {
      isOpenDetail.value = false;
    };
    const handleOpenCreateAccount = () => {
      isOpenCreateAccount.value = true;
    };
    const handleCloseCreateAccount = () => {
      isOpenCreateAccount.value = false;
    };
    const listPersonnels = computed(
      () => store.state.personnels.listPersonnels
    );
    const listPagination = computed(
      () => store.state.personnels.listPagination
    );
    const listDepartments = computed(
      () => store.getters["departments/getAllDepartmentActive"]
    );
    const listPositions = computed(
      () => store.getters["positions/getAllPositionsActive"]
    );
    const listPositiontitles = computed(
      () => store.state.positiontitles.listPositiontitles
    );
    const listPersonnelExport = computed(
      () => store.state.personnels.listPersonnelExport
    );
    const listAllPersonnelExport = computed(
      () => store.state.personnels.listAllPersonnelExport
    );
    // Start role
    const checkRole = (index) => {
      for (let i = 0; i < index?.length; i++) {
        if (FormatRole(index[i], userProfile.value) == true) {
          return true;
        }
      }
    };
    // End role
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      isLoading.value = true;
      store.dispatch("personnels/GetNextPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      isLoading.value = true;
      store.dispatch("personnels/GetNextPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const handleCloseReceive = () => {
      isOpenReceive.value = false;
    };
    const handleOpenReceive = () => {
      isOpenReceive.value = true;
    };
    const handleCloseWork = () => {
      isOpenWork.value = false;
    };
    const showModal = () => {
      isOpenWork.value = true;
    };
    const handleCloseInsurance = () => {
      isOpenInsurance.value = false;
    };
    const handleOpenInsurance = () => {
      isLoadingShow.value = true;
      store.dispatch("personnels/getPersonnelDetailInListAction", {
        id: personnelID.value,
        EndTimeLoading: EndTimeLoadingShow,
        showModal: (isOpenInsurance.value = true),
      });
    };
    const handleOpenWork = () => {
      isOpenWork.value = true;
      if (listDepartments.value?.length == 0) {
        store.dispatch("departments/getAllDepartmentsAction");
      }
      if (listPositions.value?.length == 0) {
        store.dispatch("positions/getAllPositionsAction", 500);
      }
      if (listPositiontitles.value?.length == 0) {
        store.dispatch("positiontitles/getAllPositiontitlesAction", 100);
      }
    };
    const personnelDetail = computed(
      () => store.state.personnels.personnelDetail
    );
    const handleCloseStatus = () => {
      isOpenStatus.value = false;
    };
    const handleOpenStatus = () => {
      isOpenStatus.value = true;
    };
    const handleCloseConcurrently = () => {
      isOpenConcurrently.value = false;
    };
    const handleOpenConcurrently = () => {
      isOpenConcurrently.value = true;
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listPersonnels.value) {
          checkPersonnels.value.push(listPersonnels.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkPersonnels.value.splice(0, checkPersonnels.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (
        index == checkPersonnels.value.find((item) => item === index) ||
        index == checkPersonnelRow.value
      ) {
        return true;
      } else {
        return false;
      }
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      const data = {
        key: route.params.key,
        search: dataSearch.wordSearch,
        department_ids: dataSearch.department_ids,
        position_ids: dataSearch.position_ids,
      };
      store.dispatch("personnels/SearchPersonnelsAction", {
        data: data,
        EndTimeLoading,
      });
    };
    const updatePersonnel = () => {
      router.push({
        path: `/personnel-profile-edit/${personnelID.value}`,
      });
    };
    const deletePersonnel = () => {
      store.dispatch("personnels/deletePersonnelAction", {
        id: personnelID.value,
        route,
        router,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
    };
    // Start Format data
    const handleToCreatePersonnel = () => {
      router.push("/personnel-profile-create");
    };
    const handleToCreateContract = () => {
      router.push("/add-contract");
    };
    // End Format data
    const handleBlockAccount = () => {
      store.dispatch("users/BlockAccountAction", {
        id: personnelID.value,
        route,
        router,
        toast,
        EndTimeLoading,
      });
    };
    const handleCreateContract = () => {
      router.push(`/add-contract/${personnelID.value}`);
    };
    // custom export
    // const personnelExport = () => {
    //   console.log("field", fieldArr.value);
    //   const obj = fieldArr.value;

    //   const array = Object.values(obj);
    //   store.dispatch("personnels/getCustomPersonnelExportAction", array);

    //   let Heading = [
    //     [
    //       "Mã nhân viên",
    //       "Tên nhân viên",
    //       "Phòng ban",
    //       "Vị trí",
    //       "Chức vụ",
    //       "Ngày vào",
    //       "Sinh nhật",
    //       "Giới tính",
    //       "Ngày kích hoạt",
    //     ],
    //   ];

    //   const wb = utils.book_new();

    //   const ws = utils.json_to_sheet([]);
    //   ws["!cols"] = [
    //     { width: 20 },
    //     { width: 30 },
    //     { width: 20 },
    //     { width: 20 },
    //     { width: 20 },
    //     { width: 20 },
    //     { width: 20 },
    //     { width: 20 },
    //     { width: 30 },
    //   ];

    //   console.log("data", listPersonnelExport);
    //   utils.sheet_add_aoa(ws, Heading);
    //   utils.sheet_add_json(ws, listPersonnelExport, {
    //     origin: "A2",
    //     skipHeader: true,
    //   });
    //   utils.book_append_sheet(wb, ws, "Data");
    //   // const max_width = edata.reduce((w, r) => Math.max(w, r.name.length), 10);
    //   // ws["!cols"] = [{ wch: max_width }];
    //   writeFileXLSX(wb, "Personnels.xlsx");
    // };
    return {
      isShowCreateAccount,
      isLoadingShow,
      checkPersonnelRow,
      listPersonnels,
      isLoading,
      listPagination,
      checkedAll,
      checkPersonnels,
      isActive,
      personnelID,
      perPage,
      isOpenDetail,
      CreateAccountPersonnel,
      isOpenCreateAccount,
      userProfile,
      isOpenConfirm,
      isOpenReceive,
      isOpenWork,
      isOpenStatus,
      personnelDetail,
      detailPersonnel,
      isOpenConcurrently,
      listDepartments,
      listPositions,
      listPositiontitles,
      isOpenInsurance,
      isModalVisibleExport,
      showModal,
      EndTimeLoading,
      EndTimeLoadingShow,
      checkRole,
      deletePersonnel,
      NextPage,
      PrevPage,
      checkedAllItem,
      CheckedBox,
      rightClick,
      updatePersonnel,
      handleCloseDetail,
      handleToCreatePersonnel,
      handleToCreateContract,
      ShowDetail,
      handleOpenCreateAccount,
      handleCloseCreateAccount,
      handleSearch,
      handleBlockAccount,
      handleCreateContract,
      handleCloseConfirm,
      handleOpenConfirm,
      handleCloseReceive,
      handleOpenReceive,
      handleCloseWork,
      handleOpenWork,
      handleCloseStatus,
      handleOpenStatus,
      handleCloseConcurrently,
      handleOpenConcurrently,
      handleCloseInsurance,
      handleOpenInsurance,
      fieldArr,
      ExportField,
      dataExport,
      listPersonnelExport,
      changeInputExport,
      listAllPersonnelExport,
    };
  },
};
</script>
