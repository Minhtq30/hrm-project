<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-setting-approval></sidebar-setting-approval>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center">
            <div
              class="button-create"
              @click="handleOpenDetail"
              title="Tạo mới lý làm việc theo chế độ"
            ></div>
            <p class="longText">Danh sách lý do thôi việc</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar
      ><nav-feature>
        <div class="flex">
          <div class="btn-icon" title="Import">
            <div class="cx"><i class="fal fa-file-import"></i></div>
            <div class="action-label">Import</div>
          </div>
          <div
            class="btn-icon"
            title="Xóa"
            @click="RemoveWorktime"
            v-if="checkWorktime.length > 0"
          >
            <div class="cx"><i class="fal fa-trash"></i></div>
            <div class="action-label">Xóa</div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-fade">
      <div class="home w-full" v-if="isLoading == false">
        <table-responsive
          :header="header"
          :checkAll="checkedAllItem"
          :isCheck="checkedAll"
        >
          <tr
            class="bg-white border-b"
            v-for="worktime in listWorktimes"
            :key="worktime.ID"
            @contextmenu.prevent="rightClick($event, worktime)"
            :class="{
              isCheck: CheckedBox(worktime.ID),
            }"
          >
            <td class="w-4 px-6 py-3">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  v-model="checkWorktime"
                  :value="worktime.ID"
                />
                <label for="checkbox-table-search-1" class="sr-only"
                  >checkbox</label
                >
              </div>
            </td>
            <th
              scope="row"
              class="p-3 text-left font-medium text-gray-900 dark:text-white whitespace-nowrap"
            >
              {{ worktime.title }}
            </th>
            <td class="p-3 text-left">{{ worktime.max_soon }}</td>
            <td class="p-3 text-left">{{ worktime.max_late }}</td>
            <td class="p-3 text-left">{{ worktime.max_total }}</td>
            <td class="p-3 text-left">
              {{ formatActive(worktime.active) }}
            </td>
          </tr>
        </table-responsive>
      </div>
    </Transition>
  </person-layout>
  <teleport to="#app">
    <modal-view :isOpen="isOpenDetail" :handleCloseDetail="handleCloseDetail">
      <div>
        <h1 class="header-modal">tạo mới lý do</h1>
        <div class="text-left p-4">
          <div class="form-large">
            <label for="">Lý do</label>
            <div class="mt-1">
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập tên lý do"
                v-model="worktime.title"
              />
            </div>
          </div>
          <div class="form-large grid grid-cols-3 gap-2">
            <div>
              <label for="">Về sớm tối đa</label>
              <div class="mt-1">
                <input
                  type="time"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Ký hiệu"
                  v-model="worktime.max_soon"
                />
              </div>
            </div>
            <div>
              <label for="">Đi muộn tối đa</label>
              <div class="mt-1">
                <input
                  type="time"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập số lần"
                  v-model="worktime.max_late"
                />
              </div>
            </div>
            <div>
              <label for="">Tổng giờ tối đa</label>
              <div class="mt-1">
                <input
                  type="time"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập số lần"
                  v-model="worktime.max_total"
                />
              </div>
            </div>
          </div>
          <div class="form-large flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="worktime.active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">
              <span v-if="worktime.active == true">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="createWorktime()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseDetail">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
  <teleport to="#app">
    <modal-view :isOpen="isOpenUpdate" :handleCloseDetail="handleCloseUpdate">
      <div>
        <h1 class="header-modal">tạo mới loại phụ cấp</h1>
        <div class="text-left p-4">
          <div class="form-large">
            <label for="">Lý do</label>
            <div class="mt-1">
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập tên lý do"
                v-model="worktimeDetail.title"
              />
            </div>
          </div>
          <div class="form-large grid grid-cols-3 gap-2">
            <div>
              <label for="">Về sớm tối đa</label>
              <div class="mt-1">
                <input
                  type="time"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Ký hiệu"
                  v-model="worktimeDetail.max_soon"
                />
              </div>
            </div>
            <div>
              <label for="">Đi muộn tối đa</label>
              <div class="mt-1">
                <input
                  type="time"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập số lần"
                  v-model="worktimeDetail.max_late"
                />
              </div>
            </div>
            <div>
              <label for="">Tổng giờ tối đa</label>
              <div class="mt-1">
                <input
                  type="time"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập số lần"
                  v-model="worktimeDetail.max_total"
                />
              </div>
            </div>
          </div>
          <div class="form-large flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="worktimeDetail.active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">
              <span v-if="worktimeDetail.active == true">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="updateWorktime(worktimeDetail)">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseUpdate">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
  <div>
    <context-menu :isActive="isActive">
      <ul>
        <li @click.prevent="handleOpenUpdate()">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="deleteWorktime(worktimeDetail.ID)">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
      </ul>
    </context-menu>
  </div>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>
<script>
import "@/assets/checkBox.css";
import TableResponsive from "@/components/table/TableResponsive.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarSettingApproval from "@/components/sidebar/SidebarSettingApproval.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { useStore } from "vuex";
import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { FormatStatus, FormatTrueFalse } from "@/constants/FormatAll";
import { useToast } from "vue-toastification";
export default {
  components: {
    TableResponsive,
    NavFeature,
    PersonLayout,
    SidebarSettingApproval,
    NavbarSocial,
  },
  data() {
    return {
      header: [
        "Lý do",
        "Về sớm tối đa",
        "Đi muộn tối đa",
        "Tổng tối đa",
        "Trạng thái",
      ],
    };
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const isLoading = ref(true);
    const isOpenDetail = ref(false);
    const isOpenUpdate = ref(false);
    const isActive = ref(false);
    const checkedAll = ref(false);
    const checkWorktime = ref([]);
    const worktimeDetail = ref({});
    setTimeout(() => {
      isLoading.value = false;
    }, 800);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("worktimes/GetAllWorktimesAction");

    const listWorktimes = computed(() => store.state.worktimes.listWorktimes);

    const worktime = reactive({
      title: "",
      max_soon: "",
      max_late: "",
      max_total: "",
      active: 0,
    });
    const handleOpenDetail = () => {
      isOpenDetail.value = true;
    };
    const handleCloseDetail = () => {
      isOpenDetail.value = false;
      worktime.title = "";
      worktime.max_soon = "";
      worktime.max_late = "";
      worktime.max_total = "";
      worktime.active = 0;
    };
    const handleOpenUpdate = () => {
      isOpenUpdate.value = true;
    };
    const handleCloseUpdate = () => {
      isOpenUpdate.value = false;
    };
    const rightClick = (e, worktime) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
        worktimeDetail.value = worktime;
      }
    };
    const CheckedBox = (index) => {
      if (index == checkWorktime.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listWorktimes.value) {
          checkWorktime.value.push(listWorktimes.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkWorktime.value.splice(0, checkWorktime.value.length);
      }
    };

    const createWorktime = () => {
      const data = {
        title: worktime.title,
        max_soon: worktime.max_soon,
        max_late: worktime.max_late,
        max_total: worktime.max_total,
        active: worktime.active,
      };
      store.dispatch("worktimes/createWorktimeAction", {
        data,
        toast,
        handleCloseDetail,
      });
    };
    const updateWorktime = (data) => {
      store.dispatch("worktimes/updateWorktimeAction", {
        data,
        toast,
        handleCloseUpdate,
      });
    };
    const deleteWorktime = (id) => {
      store.dispatch("worktimes/deleteWorktimeAction", id);
    };
    const RemoveWorktime = () => {
      for (var i = 0; i < checkWorktime.value.length; i++) {
        store.dispatch(
          "worktimes/deleteWorktimeAction",
          checkWorktime.value[i]
        );
      }
    };
    // Start format all
    const formatActive = (status) => {
      return FormatStatus(status);
    };
    const formatTrueFalse = (status) => {
      return FormatTrueFalse(status);
    };
    const formatTime = (time) => {
      let t = new Date(time);
      if (t.getHours > 0) {
        return t.getHours + "giờ";
      }
    };
    // End format all
    return {
      checkWorktime,
      checkedAll,
      listWorktimes,
      worktime,
      isOpenDetail,
      isOpenUpdate,
      isActive,
      worktimeDetail,
      isLoading,
      EndTimeLoading,
      handleOpenDetail,
      handleCloseDetail,
      handleOpenUpdate,
      handleCloseUpdate,
      CheckedBox,
      formatActive,
      formatTrueFalse,
      createWorktime,
      updateWorktime,
      deleteWorktime,
      RemoveWorktime,
      checkedAllItem,
      rightClick,
      formatTime,
    };
  },
};
</script>
