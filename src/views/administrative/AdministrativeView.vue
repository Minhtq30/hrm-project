<template>
  <person-layout>
    <template v-slot:sidebar>
      <SideBarAdministrative></SideBarAdministrative>
    </template>
    <template v-slot:navbar>
      <navbar-social
        ><div class="flex grow">
          <div class="flex items-center">
            <div class="flex items-center">
              <Transition name="slide-fade">
                <div
                  class="button-create relative group"
                  title="Tạo mới đơn từ"
                >
                  <div
                    class="text-black text-sm absolute w-48 z-10 bg-white left-0 top-full rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible p-2 drop-shadow-xl before:content-[''] before:h-5 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
                  >
                    <ul>
                      <li
                        class="p-[10px] hover:bg-slate-100 hover:rounded-lg flex justify-between items-center relative sub-dropdown"
                      >
                        Tạo mới đơn phạt 5s
                      </li>
                      <li
                        class="p-[10px] hover:bg-slate-100 hover:rounded-lg flex justify-between items-center relative sub-dropdown"
                      >
                        Tạo mới đơn thưởng 5s
                      </li>
                    </ul>
                  </div>
                </div>
              </Transition>
              <p class="longText">Minimap</p>
              <div class="icon-filter-approval relative group"></div>
            </div>
          </div></div
      ></navbar-social>
    </template>
    <!-- <template v-slot:sub_navbar
      ><nav-feature>
        <div class="flex items-center justify-between w-full">
          <div>
            <navbar-approval></navbar-approval>
          </div>
          <div>
            <div
              class="btn-icon"
              title="Xóa"
              v-if="checkTotal?.length > 0"
              @click="handleOpenConfirm()"
            >
              <div class="cx"><i class="fal fa-trash"></i></div>
              <div class="action-label">Xóa</div>
            </div>
            <div class="btn-icon group relative">
              <div class="cx">
                <i class="fal fa-file-export"></i>
              </div>
              <div class="action-label">Export</div>
              <div
                class="absolute z-10 right-0 top-full invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute drop-shadow-2xl"
              >
                <ul class="bg-white p-3 rounded-md">
                  <li class="w-44 sub-item">Xuất tất cả</li>
                  <li class="w-44 sub-item">Chọn trường để export</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav-feature></template
    > -->
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <table-responsive
          :header="header"
          :checkAll="checkedAllItem"
          :isCheck="checkedAll"
          v-if="list5sViolation?.length"
          ><tr
            class="bg-white border-b"
            v-for="total in list5sViolation"
            :key="total.ID"
            @contextmenu.prevent="rightClick($event, total)"
            :class="{
              isCheck: CheckedBox(total.ID),
            }"
          >
            <td class="w-4 px-6 py-3">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  v-model="checkTotal"
                  :value="total.ID"
                />
                <label for="checkbox-table-search-1" class="sr-only"
                  >checkbox</label
                >
              </div>
            </td>
            <td class="cellTable">
              <avatar-created :Approval="total"></avatar-created>
            </td>
            <td class="cellTable cursor-pointer" @click="showDetail(total)">
              {{ total.personnel_code }}
            </td>
            <td class="cellTable cursor-pointer" @click="showDetail(total)">
              {{ total.fullname }}
            </td>
            <!-- <td class="cellTable">
              <div
                class="beacon"
                :class="formatColor(total.app_approval_status)"
              >
                {{ formatStatus(total.app_approval_status) }}
              </div>
            </td> -->
            <td class="cellTable">{{ total.department?.title }}</td>
            <td class="cellTable">{{ total.position?.title }}</td>
            <td class="cellTable">
              <div
                class="w-[150px] whitespace-normal overflow-hidden longContent !text-[14px]"
              >
                {{ total.desc }}
              </div>
            </td>
            <td class="cellTable">{{ formatDate(total.created_at) }}</td>
          </tr></table-responsive
        >
        <div v-else class="p-2 flex flex-col justify-center">
          <h2>Không tìm thấy kết quả</h2>
          <div class="flex justify-center">
            <img :src="imgNoData" alt="" class="w-[300px] h-[300px]" />
          </div>
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer v-if="listApprovalTotal?.length">
      <div class="flex justify-between items-center">
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
        <li @click.prevent="EditApproval()" v-if="isCreated">
          <i class="fal fa-edit"></i> <a href="#">Sửa</a>
        </li>
        <li @click.prevent="handleOpenConfirm()" v-if="isCreated">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
        <li><i class="fal fa-paste"></i><a href="#">Biểu mẫu</a></li>
      </ul>
    </context-menu>
  </div>
  <teleport to="#app">
    <!-- Start xác nhận xóa -->
    <modal-delete
      v-if="checkTotal?.length == 0"
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="handleDeleteApproval"
    >
    </modal-delete>
    <modal-delete
      v-else
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="removeDeleteApproval"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
  </teleport>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
// import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SideBarAdministrative from "@/components/sidebar/SideBarAdministrative.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
// import ButtonCreateApproval from "@/views/approvals/AllButton/ButtonCreateApproval.vue";
// import NavbarApproval from "@/views/approvals/approvalTotal/NavbarApproval.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import PaginationView from "@/components/pagination/PaginationView.vue";
// import ButtonExtendApproval from "@/views/approvals/AllButton/ButtonExtendPrivateApproval.vue";
import AvatarCreated from "@/components/constant/AvatarCreated.vue";
import noData from "@/assets/images/noData.png";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import {
  CheckUserCreateApproval,
  // FormatColorApproval,
  FormatDate,
  FormatModalX,
  FormatModalY,
  // FormatStatusApproval,
} from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { use5sViolation } from "@/store/modules/approval/Approval5s";
import { useReasonLeave } from "@/store/modules/settingApproval/ReasonLeave";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
export default {
  components: {
    // NavFeature,
    PersonLayout,
    SideBarAdministrative,
    NavbarSocial,
    // ButtonCreateApproval,
    // NavbarApproval,
    TableResponsive,
    PaginationView,
    // ButtonExtendApproval,
    AvatarCreated,
  },
  data() {
    return {
      header: [
        "Người tạo",
        "Mã NV",
        "Họ và tên",
        // "Trạng thái",
        "Phòng ban",
        "Vị trí",
        "Mô tả",
        "Ngày tạo",
      ],
      imgNoData: noData,
    };
  },
  methods: {
    formatApproval(title) {
      const arr = this.listApproval.find((item) => item.code == title);
      if (arr) {
        return arr.title;
      } else {
        return "";
      }
    },
    formatDate(date) {
      return FormatDate(date);
    },
    // formatReason(total) {
    //   if (total.app_sub_object == "approval-leave-application") {
    //     const arr = this.ReasonLeavesActive.find(
    //       (item) => item.ID == total.data.reason
    //     );
    //     if (arr) {
    //       return arr.title;
    //     } else {
    //       return "";
    //     }
    //   } else {
    //     return "";
    //   }
    // },
    // formatStatus(status) {
    //   return FormatStatusApproval(status);
    // },
    // formatColor(status) {
    //   return FormatColorApproval(status);
    // },
    formatDesc(total) {
      if (total.data.desc == null) {
        return total.data.content;
      } else {
        return total.data.desc;
      }
    },
  },
  setup() {
    const router = useRouter();
    const toast = useToast();
    const route = useRoute();
    const isActive = ref(false);
    const checkedAll = ref(false);
    const checkTotal = ref([]);
    const totalDetail = ref();
    const isLoading = ref(true);
    const isOpenQuickView = ref(false);
    const isCreated = ref(false);
    const isOpenConfirm = ref(false);
    const total = useApprovalTotal();
    const administrative = use5sViolation();
    const reasonLeave = useReasonLeave();
    const profile = useUserProfile();
    const { userProfile } = storeToRefs(profile);
    const { ReasonLeavesActive } = storeToRefs(reasonLeave);
    const { listApprovalTotal, listPagination, listApproval } =
      storeToRefs(total);
    const { list5sViolation, dataStatusPersonnelOffice } =
      storeToRefs(administrative);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    administrative.GetAll5sViolationAction({ EndTimeLoading });
    console.log(list5sViolation.value);
    total.GetAllApprovalTotalAction({ key: route.params.key, EndTimeLoading });
    watch(route, (to) => {
      isLoading.value = true;
      if (to.path == `/approval-approval-private/type=${to.params.key}`) {
        total.GetAllApprovalTotalAction({ key: to.params.key, EndTimeLoading });
      }
    });
    if (ReasonLeavesActive.value.length == 0) {
      reasonLeave.GetAllLeavesAction();
    }
    const handleOpenQuickView = () => {
      isOpenQuickView.value = true;
    };
    const handleCloseQuickView = () => {
      isOpenQuickView.value = false;
    };
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      total.GetNextPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      total.GetPrevPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listApprovalTotal.value) {
          checkTotal.value.push(listApprovalTotal.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkTotal.value.splice(0, checkTotal.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkTotal.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const rightClick = (e, total) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        totalDetail.value = total;
        isCreated.value = CheckUserCreateApproval(total, userProfile.value);
      }
    };

    const formatUrlDetail = (obj) => {
      const arr = listApproval.value.find(
        (item) => item.code == obj.app_sub_object
      );
      return arr.urlDetail;
    };
    const FormatUrlEdit = (obj) => {
      const arr = listApproval.value.find(
        (item) => item.code == obj.app_sub_object
      );
      return arr.urlEdit;
    };
    const showDetail = (obj) => {
      router.push(`${formatUrlDetail(obj)}` + `${obj.ID}`);
    };
    const EditApproval = () => {
      router.push(
        `${FormatUrlEdit(totalDetail.value)}` + `${totalDetail.value.ID}`
      );
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const handleDeleteApproval = () => {
      total.DeleteApprovalAction({
        id: totalDetail.value.ID,
        route,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
    };
    const removeDeleteApproval = () => {
      for (let i = 0; i < checkTotal.value?.length; i++) {
        total.DeleteApprovalAction({
          id: checkTotal.value[i],
          route,
          toast,
          handleCloseConfirm,
          EndTimeLoading,
        });
      }
      checkTotal.value.length = 0;
    };
    return {
      listPagination,
      listApprovalTotal,
      listApproval,
      isActive,
      checkedAll,
      checkTotal,
      ReasonLeavesActive,
      totalDetail,
      isLoading,
      isOpenQuickView,
      isCreated,
      isOpenConfirm,
      userProfile,
      administrative,
      list5sViolation,
      dataStatusPersonnelOffice,
      NextPage,
      PrevPage,
      checkedAllItem,
      CheckedBox,
      rightClick,
      EditApproval,
      handleOpenQuickView,
      handleCloseQuickView,
      formatUrlDetail,
      showDetail,
      FormatUrlEdit,
      EndTimeLoading,
      handleOpenConfirm,
      handleCloseConfirm,
      handleDeleteApproval,
      removeDeleteApproval,
    };
  },
};
</script>

<style></style>
