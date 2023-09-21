<template>
  <div class="w-full relative mt-1" v-if="isLoading == false">
    <table-responsive
      :header="header"
      :checkAll="checkedAllItem"
      :isCheck="checkedAll"
      v-if="AllOtherApproval?.length"
      ><tr
        class="bg-white border-b"
        v-for="total in AllOtherApproval"
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
          {{ total.personnel_name }}
        </td>
        <td class="cellTable">
          <div class="beacon" :class="formatColor(total.app_approval_status)">
            {{ formatStatus(total.app_approval_status) }}
          </div>
        </td>
        <td class="cellTable">
          {{ formatApproval(total.app_sub_object) }}
        </td>
        <td class="cellTable">{{ total.department_title }}</td>
        <td class="cellTable">{{ total.position_title }}</td>
        <td class="cellTable">
          <div class="w-[150px] whitespace-normal overflow-hidden">
            {{ formatDesc(total) }}
          </div>
        </td>
        <td class="cellTable">{{ formatDate(total.created_at) }}</td>
      </tr></table-responsive
    >
    <div v-else class="p-2 text-left">Không tìm thấy kết quả</div>
    <div
      class="sticky top-0 right-0 z-20 w-full bg-white"
      v-if="AllOtherApproval?.length"
    >
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
        </div>
      </div>
    </div>
  </div>
  <div>
    <context-menu :isActive="isActive">
      <ul>
        <li @click.prevent="EditApproval()" v-if="isCreated">
          <i class="fal fa-edit"></i> <a href="#">Sửa</a>
        </li>
        <li @click.prevent="handleOpenConfirm()" v-if="isCreated">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
        <li @click.prevent="ConfirmApproval()" v-if="isApproved">
          <i class="fal fa-check"></i><a href="#">Duyệt đơn</a>
        </li>
        <li @click.prevent="ReturnApproval()" v-if="showRevert">
          <i class="fal fa-undo"></i> <a href="#">Hoàn duyệt</a>
        </li>
        <li @click.prevent="UnconfirmApproval()" v-if="isApproved">
          <i class="fal fa-ban"></i><a href="#">Không duyệt</a>
        </li>
        <li><i class="fal fa-paste"></i><a href="#">Biểu mẫu</a></li>
      </ul>
    </context-menu>
  </div>
  <teleport to="#app">
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="handleDeleteApproval"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
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
import TableResponsive from "@/components/table/TableResponsive.vue";
import PaginationView from "@/components/pagination/PaginationView.vue";
import AvatarCreated from "@/components/constant/AvatarCreated.vue";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import {
  CheckUserCreateApproval,
  FormatColorApproval,
  FormatDate,
  FormatModalX,
  FormatModalY,
  FormatStatusApproval,
  HideShowFunctionContextmenu,
  ShowRevertApproval,
} from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { useOtherApproval } from "@/store/modules/approval/OtherApproval";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { useReasonLeave } from "@/store/modules/settingApproval/ReasonLeave";
import { storeToRefs } from "pinia";
export default {
  props: {
    Personnel: { type: Object },
  },
  components: {
    TableResponsive,
    PaginationView,
    AvatarCreated,
  },
  data() {
    return {
      header: [
        "Người tạo",
        "Mã NV",
        "Họ và tên",
        "Trạng thái",
        "Loại đơn",
        "Phòng ban",
        "Vị trí",
        "Mô tả",
        "Ngày tạo",
      ],
    };
  },
  methods: {
    formatApproval(title) {
      const arr = this.listApproval.find((item) => item.code == title);
      return arr.title;
    },
    formatDate(date) {
      return FormatDate(date);
    },
    formatReason(total) {
      if (total.app_sub_object == "approval-leave-application") {
        const arr = this.ReasonLeavesActive.find(
          (item) => item.ID == total.data.reason
        );
        if (arr) {
          return arr.title;
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    formatStatus(status) {
      return FormatStatusApproval(status);
    },
    formatColor(status) {
      return FormatColorApproval(status);
    },
    formatDesc(total) {
      if (total.data.desc == null) {
        return this.formatReason(total);
      } else {
        return total.data.desc;
      }
    },
  },
  setup(props) {
    const router = useRouter();
    const toast = useToast();
    const route = useRoute();
    const idPerson = ref(props.Personnel);
    const isActive = ref(false);
    const checkedAll = ref(false);
    const checkTotal = ref([]);
    const totalDetail = ref();
    const isLoading = ref(true);
    const isLoadingShow = ref(false);
    const isOpenQuickView = ref(false);
    const isApproved = ref(true);
    const isCreated = ref(false);
    const showRevert = ref(true);
    const isOpenConfirm = ref(false);
    const total = useApprovalTotal();
    const other = useOtherApproval();
    const profile = useUserProfile();
    const reasonLeave = useReasonLeave();
    const { ReasonLeavesActive } = storeToRefs(reasonLeave);
    const { userProfile } = storeToRefs(profile);
    const { listApproval } = storeToRefs(total);
    const { AllOtherApproval, listPagination } = storeToRefs(other);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EndTimeLoadingShow = () => {
      isLoadingShow.value = false;
    };
    other.GetAllOtherApprovalAction({
      id: idPerson.value.personnel_id,
      EndTimeLoading,
    });
    watch(idPerson.value, (to) => {
      isLoading.value = true;
      other.GetAllOtherApprovalAction({
        id: to.personnel_id,
        EndTimeLoading,
      });
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
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      other.GetNextPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      other.GetPrevPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in AllOtherApproval.value) {
          checkTotal.value.push(AllOtherApproval.value[item].ID);
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
        isApproved.value = HideShowFunctionContextmenu(
          total,
          userProfile.value
        );
        showRevert.value = ShowRevertApproval(total, userProfile.value);
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
      other.deleteOtherApprovalAction({
        id: totalDetail.value.ID,
        idPerson: idPerson.value.personnel_id,
        handleCloseConfirm,
        EndTimeLoading,
      });
    };
    const removeDeleteApproval = () => {
      for (let i = 0; i < checkTotal.value?.length; i++) {
        other.deleteOtherApprovalAction({
          id: checkTotal.value[i],
          route,
          toast,
          handleCloseConfirm,
          EndTimeLoading,
        });
      }
      checkTotal.value.length = 0;
    };
    const ConfirmApproval = () => {
      isLoadingShow.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "APPROVED",
      };
      const dataApproval = {
        id: totalDetail.value.ID,
        data: data,
      };
      other.ConfirmApprovalAction({
        dataApproval,
        toast,
        id: idPerson.value.personnel_id,
        EndTimeLoading: EndTimeLoadingShow,
      });
    };
    const UnconfirmApproval = () => {
      isLoadingShow.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "NO_APPROVED",
      };
      const dataApproval = {
        id: totalDetail.value.ID,
        data: data,
      };
      other.ConfirmApprovalAction({
        dataApproval,
        toast,
        id: idPerson.value.personnel_id,
        EndTimeLoading: EndTimeLoadingShow,
      });
    };
    const ReturnApproval = () => {
      isLoadingShow.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "REVERT",
      };
      const dataApproval = {
        id: totalDetail.value.ID,
        data: data,
      };
      other.RevertApprovalAction({
        dataApproval,
        toast,
        id: idPerson.value.personnel_id,
        EndTimeLoading: EndTimeLoadingShow,
      });
    };
    return {
      listPagination,
      AllOtherApproval,
      listApproval,
      isActive,
      checkedAll,
      checkTotal,
      ReasonLeavesActive,
      totalDetail,
      isLoading,
      isOpenQuickView,
      isApproved,
      isOpenConfirm,
      idPerson,
      isCreated,
      showRevert,
      userProfile,
      isLoadingShow,
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
      ConfirmApproval,
      UnconfirmApproval,
      ReturnApproval,
      EndTimeLoadingShow,
    };
  },
};
</script>

<style></style>
