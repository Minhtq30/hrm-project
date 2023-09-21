<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-personnel></sidebar-personnel>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false">
        <div class="flex grow">
          <div class="flex items-center">
            <button-create-personnel></button-create-personnel>
            <Transition name="slide-fade">
              <div class="longText" v-if="isLoading == false">
                {{ contractDetail.personnel_name }} ({{
                  contractDetail.contract_code
                }})
              </div>
            </Transition>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar
      ><nav-feature>
        <div class="flex items-center">
          <div>
            <tab-nav
              :tabs="['Chi tiết', 'Đính kèm']"
              :selected="selected"
              @selected="setSelected"
            >
            </tab-nav>
          </div>
        </div>
        <div class="flex">
          <div
            class="btn-icon"
            @click="changeStatusContarctToLiquidation"
            :class="{
              disabledDiv:
                contractDetail.status == 4 ||
                contractDetail.status == 3 ||
                contractDetail.status == 1,
            }"
          >
            <div class="cx">
              <i class="fal fa-sync"></i>
            </div>
            <div class="action-label">Thanh lý</div>
          </div>
          <div
            class="btn-icon"
            @click="changeStatusContarctToIsvalid"
            :class="{
              disabledDiv:
                contractDetail.status == 2 ||
                contractDetail.status == 4 ||
                contractDetail.status == 3,
            }"
          >
            <div class="cx">
              <i class="fal fa-clipboard-check"></i>
            </div>
            <div class="action-label">Có hiệu lực</div>
          </div>
          <div
            class="btn-icon"
            title="Tạo mới hợp đồng"
            @click="CreateContract"
          >
            <div class="cx">
              <i class="fal fa-file-plus"></i>
            </div>
            <div class="action-label">Tạo mới</div>
          </div>
          <div class="btn-icon relative group" title="Biểu mẫu">
            <div class="cx"><i class="fal fa-file-alt"></i></div>
            <div class="action-label">Biểu mẫu</div>
            <div
              class="absolute z-10 right-0 top-10 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute drop-shadow-2xl"
            >
              <ul class="bg-white p-1 rounded-md">
                <li
                  class="w-52 sub-item relative sub-dropdown flex justify-between items-center"
                >
                  Hợp đồng đào tạo
                  <i class="fal fa-chevron-right"></i>
                  <ul
                    class="absolute opacity-0 invisible rounded-md top-0 right-full bg-white w-full sub-dropdown-content p-1 drop-shadow-xl"
                  >
                    <li class="sub-item">Xuất file</li>
                    <li class="sub-item">Xem online hoặc in</li>
                    <li class="sub-item">Xuất file pdf</li>
                  </ul>
                </li>
                <li
                  class="w-52 sub-item relative sub-dropdown flex justify-between items-center"
                >
                  Hợp đồng thử việc<i class="fal fa-chevron-right"></i>
                  <ul
                    class="absolute opacity-0 invisible rounded-md top-0 right-full bg-white w-full sub-dropdown-content p-1 drop-shadow-xl"
                  >
                    <li class="sub-item">Xuất file</li>
                    <li class="sub-item">Xem online hoặc in</li>
                    <li class="sub-item">Xuất file pdf</li>
                  </ul>
                </li>
                <li
                  class="w-52 sub-item relative sub-dropdown flex justify-between items-center"
                >
                  Hợp đồng lao động 1 năm<i class="fal fa-chevron-right"></i>
                  <ul
                    class="absolute opacity-0 invisible rounded-md top-0 right-full bg-white w-full sub-dropdown-content p-1 drop-shadow-xl"
                  >
                    <li class="sub-item">Xuất file</li>
                    <li class="sub-item">Xem online hoặc in</li>
                    <li class="sub-item">Xuất file pdf</li>
                  </ul>
                </li>
                <li
                  class="w-52 sub-item relative sub-dropdown flex justify-between items-center"
                >
                  Hợp đồng lao động - HCM<i class="fal fa-chevron-right"></i>
                  <ul
                    class="absolute opacity-0 invisible rounded-md top-0 right-full bg-white w-full sub-dropdown-content p-1 drop-shadow-xl"
                  >
                    <li class="sub-item">Xuất file</li>
                    <li class="sub-item">Xem online hoặc in</li>
                    <li class="sub-item">Xuất file pdf</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div class="btn-icon relative group" title="Mở rộng">
            <div class="cx"><i class="fal fa-tools"></i></div>
            <div class="action-label">Mở rộng</div>
            <div
              class="absolute z-10 right-0 top-10 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute drop-shadow-2xl"
            >
              <ul class="bg-white p-1 rounded-md">
                <li class="w-44 sub-item" @click="EditContract()">
                  <i class="fal fa-edit px-2"></i>Sửa
                </li>
                <li class="w-44 sub-item" @click="handleOpenConfirm()">
                  <i class="fal fa-trash px-2"></i>Xóa
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-fade">
      <the-tab :isSelected="selected === 'Chi tiết'">
        <div class="w-full" v-if="isLoading == false">
          <div class="text-left">
            <div title="Thông tin chung">
              <div class="detail-section-title">Thông tin chung</div>
              <div class="p-2">
                <table class="w-full">
                  <tbody>
                    <tr>
                      <td class="cellTable">Mã HĐ</td>
                      <td class="cellTable">
                        {{ contractDetail.contract_code }}
                      </td>
                      <td class="cellTable">Tên nhân sự</td>
                      <td class="cellTable">
                        {{ contractDetail.personnel_name }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Tên hợp đồng</td>
                      <td class="cellTable">
                        {{ formatContractType(contractDetail.contract_type) }}
                      </td>
                      <td class="cellTable">Phòng ban</td>
                      <td class="cellTable">
                        {{ formatDepartment(contractDetail.department_id) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Vị trí</td>
                      <td class="cellTable">
                        {{ formatPosition(contractDetail.position_id) }}
                      </td>
                      <td class="cellTable">Chức vụ</td>
                      <td class="cellTable">
                        {{ formatPositionTitle(contractDetail.job_title) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Nơi làm việc</td>
                      <td class="cellTable">
                        {{ formatWorkplace(contractDetail.work_place) }}
                      </td>
                      <td class="cellTable">Hình thức hợp đồng</td>
                      <td class="cellTable">
                        {{ formatWorkType(contractDetail.work_type) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Ngach lương</td>
                      <td class="cellTable">
                        {{ formatRangeSalary(contractDetail.quantum_id) }}
                      </td>
                      <td class="cellTable">Hiệu lực từ ngày</td>
                      <td class="cellTable">
                        {{ formatDate(contractDetail.date_start) }} đến
                        {{ formatDate(contractDetail.date_finish) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Tình trạng</td>
                      <td class="cellTable">
                        <div
                          class="beacon"
                          :class="formatColorContract(contractDetail.status)"
                        >
                          {{ formatMessagesContract(contractDetail.status) }}
                        </div>
                      </td>
                      <td class="cellTable">Ghi chú</td>
                      <td class="cellTable"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              v-if="contractDetail.salaries?.length > 0"
              title="Lương và phụ cấp"
            >
              <div class="detail-section-title">Lương và phụ cấp</div>

              <div class="w-full py-2">
                <table class="w-full border">
                  <thead class="border bg-slate-50">
                    <th class="cellTable">Từ ngày</th>
                    <th class="cellTable">Ghi chú</th>
                    <th class="cellTable">Hình thức lương</th>
                    <th class="cellTable">Số tiền</th>
                    <th class="cellTable">Phụ cấp</th>
                    <th class="cellTable">Số tiền</th>
                    <th class="cellTable">Mức lương đóng bảo hiểm</th>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(salary, index) in contractDetail.salaries"
                      :key="index"
                      class="border"
                    >
                      <td class="cellTable">
                        {{ formatDate(salary.date) }}
                      </td>
                      <td class="cellTable">
                        {{ salary.desc }}
                      </td>
                      <template
                        v-for="(salaryType, inde) in salary.json_type_salary"
                        :key="inde"
                      >
                        <td class="cellTable">
                          {{ formatTypeSalary(salaryType.type_salary) }}
                        </td>
                      </template>
                      <template
                        v-for="(salaryType, inde) in salary.json_type_salary"
                        :key="inde"
                      >
                        <td class="cellTable">
                          {{ formatPrice(salaryType.money) }}
                        </td>
                      </template>
                      <template
                        v-for="(allowance, ind) in salary.json_allowances"
                        :key="ind"
                      >
                        <td class="cellTable">
                          {{ formatAllowce(allowance.allowance) }}
                        </td>
                      </template>
                      <template
                        v-for="(allowance, ind) in salary.json_allowances"
                        :key="ind"
                      >
                        <td class="cellTable">
                          {{ formatPrice(allowance.money) }}
                        </td>
                      </template>
                      <td class="cellTable">
                        {{ formatPrice(salary.premium_salary) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- <div v-else class="p-2">Không tìm thấy kết quả nào</div> -->
            </div>
            <div title="Thảo luận">
              <div class="detail-section-title">Thảo luận</div>
              <write-comment></write-comment>
            </div>
          </div>
        </div>
      </the-tab>
    </Transition>
    <the-tab :isSelected="selected === 'Đính kèm'">
      <div class="w-full text-left">
        <div class="p-2">Không tìm thấy kết quả</div>
      </div>
    </the-tab>
  </person-layout>
  <teleport to="#app">
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="deleteContract"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
  </teleport>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
  <loading-overlay :isLoading="isLoadingLoad"></loading-overlay>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarPersonnel from "@/components/sidebar/SidebarPersonnel.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreatePersonnel from "@/views/personnels/ButtonCreatePersonnel.vue";
import WriteComment from "@/components/constant/WriteComment.vue";
import TheTab from "@/components/tab/TheTab.vue";
import TabNav from "@/components/tab/TabNav.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  FormatColorContract,
  FormatDate,
  FormatPrice,
  FormatStatusContract,
  FormatTitle,
} from "@/constants/FormatAll";
import { useToast } from "vue-toastification";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { useContract } from "@/store/modules/contract/contracts";
import { storeToRefs } from "pinia";
export default {
  data() {
    return {};
  },
  components: {
    NavFeature,
    PersonLayout,
    SidebarPersonnel,
    NavbarSocial,
    ButtonCreatePersonnel,
    WriteComment,
    TheTab,
    TabNav,
  },
  methods: {
    formatContractType(id) {
      return FormatTitle(id, this.listContractTypes);
    },
    formatDepartment(id) {
      return FormatTitle(id, this.listDepartments);
    },
    formatPosition(id) {
      return FormatTitle(id, this.listPositions);
    },
    formatPositionTitle(id) {
      return FormatTitle(id, this.listPositiontitles);
    },
    formatWorkplace(id) {
      return FormatTitle(id, this.listWorkplace);
    },
    formatWorkType(id) {
      return FormatTitle(id, this.listWorkTypes);
    },
    formatRangeSalary(id) {
      return FormatTitle(id, this.listSalryRange);
    },
    formatColorContract(status) {
      return FormatColorContract(status);
    },
    formatMessagesContract(status) {
      return FormatStatusContract(status);
    },
    formatDate(date) {
      return FormatDate(date);
    },
    formatPrice(price) {
      return FormatPrice(price);
    },
    formatTypeSalary(id) {
      if (id) {
        const key = this.listTypeSalary.find((item) => item.ID == id);
        if (key) {
          return key.title;
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    formatAllowce(id) {
      return FormatTitle(id, this.listAllowance);
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const isLoading = ref(true);
    const isLoadingLoad = ref(false);
    const selected = ref("Chi tiết");
    const isOpenConfirm = ref(false);
    const profile = useUserProfile();
    const contract = useContract();
    const { contractDetail } = storeToRefs(contract);
    const { userProfile, AccountRole } = storeToRefs(profile);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EndTimeLoad = () => {
      isLoadingLoad.value = false;
    };
    contract.ShowContractDetailAction({
      id: route.params.idContract,
      EndTimeLoading: EndTimeLoading,
    });
    const listContractTypes = computed(
      () => store.getters["contractTypes/listContractTypesOn"]
    );
    const listDepartments = computed(
      () => store.state.departments.listDepartments
    );
    const listPositions = computed(
      () => store.getters["positions/getAllPositionsActive"]
    );
    const listPositiontitles = computed(
      () => store.state.positiontitles.listPositiontitles
    );
    const listWorkplace = computed(
      () => store.getters["workplace/getAllWorkplaceActive"]
    );
    const listSalryRange = computed(
      () => store.getters["salaryRange/getAllSalaryRangeActive"]
    );
    const listWorkTypes = computed(
      () => store.getters["workTypes/GetAllWorkTypeActive"]
    );
    const listTypeSalary = computed(
      () => store.state.personnels.listTypeSalary
    );
    const listAllowance = computed(
      () => store.getters["allowances/getAllAllowancesActive"]
    );
    setTimeout(() => {
      if (listDepartments.value?.length == 0) {
        store.dispatch("departments/getAllDepartmentsAction");
      }

      if (listContractTypes.value.length == 0) {
        store.dispatch("contractTypes/GetAllContractTypeAction", 50);
      }

      if (listWorkTypes.value?.length == 0) {
        store.dispatch("workTypes/GetAllWorkTypeAction", 50);
      }

      if (listPositions.value?.length == 0) {
        store.dispatch("positions/getAllPositionsAction", 500);
      }

      setTimeout(() => {
        if (listPositiontitles.value?.length == 0) {
          store.dispatch("positiontitles/getAllPositiontitlesAction", 50);
        }

        if (listWorkplace.value.length == 0) {
          store.dispatch("workplace/getAllWorkplaceAction", 500);
        }

        if (listSalryRange.value.length == 0) {
          store.dispatch("salaryRange/getAllSalaryRangeAction", 100);
        }
        if (listAllowance.value.length == 0) {
          store.dispatch("allowances/getAllAllowancesAction", 100);
        }
      });
    });
    // Start role
    const checkRole = (index) => {
      if (userProfile.value.is_admin == "yes") {
        return true;
      } else {
        if (AccountRole.value.find((item) => item == index)) {
          return true;
        } else {
          return false;
        }
      }
    };
    // End role
    const setSelected = (tab) => {
      selected.value = tab;
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const changeStatusContarctToLiquidation = () => {
      isLoadingLoad.value = true;
      contract.ChangeStatusToliquidationAction({
        id: route.params.idContract,
        toast,
        route,
        EndTimeLoading: EndTimeLoad,
      });
    };
    const changeStatusContarctToIsvalid = () => {
      contract.ChangeStatusToIsvalidAction({
        id: route.params.idContract,
        toast,
        route,
        EndTimeLoading: EndTimeLoad,
      });
    };
    const deleteContract = () => {
      contract.DeleteContractAction({
        id: route.params.idContract,
        toast,
        route,
        router,
        handleCloseConfirm,
        EndTimeLoading,
      });
    };
    const EditContract = () => {
      router.push(`/update-contract/${route.params.idContract}`);
    };
    const CreateContract = () => {
      router.push(`/add-contract/${contractDetail.value.personnel_id}`);
    };
    return {
      contractDetail,
      listDepartments,
      listPositions,
      listPositiontitles,
      listContractTypes,
      listWorkplace,
      listSalryRange,
      listWorkTypes,
      isLoading,
      listTypeSalary,
      listAllowance,
      AccountRole,
      userProfile,
      isLoadingLoad,
      selected,
      isOpenConfirm,
      deleteContract,
      checkRole,
      changeStatusContarctToLiquidation,
      changeStatusContarctToIsvalid,
      EditContract,
      EndTimeLoading,
      EndTimeLoad,
      setSelected,
      CreateContract,
      handleCloseConfirm,
      handleOpenConfirm,
    };
  },
};
</script>
