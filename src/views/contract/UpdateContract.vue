<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-personnel></sidebar-personnel>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center">
            <button-create-personnel></button-create-personnel>
            <p class="longText">Cập nhật hợp đồng</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature
        ><div>
          <tab-nav
            :tabs="['Hợp đồng', 'Đính kèm']"
            :selected="selected"
            @selected="setSelected"
          >
          </tab-nav></div
      ></nav-feature>
    </template>
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <div title="Hợp đồng">
          <Transition name="slide-fade">
            <the-tab :isSelected="selected === 'Hợp đồng'">
              <div class="text-left p-4">
                <div>
                  <h4
                    class="form-section-title form-small cursor-pointer"
                    @click="isContract = !isContract"
                  >
                    <span v-show="isContract == true"
                      ><i class="fas fa-chevron-down cursor-pointer"></i
                    ></span>
                    <span v-show="isContract == false"
                      ><i class="fas fa-chevron-right cursor-pointer"></i
                    ></span>
                    Thông tin chung
                  </h4>
                  <Transition name="slide-fade">
                    <div v-show="isContract == true" class="mt-2">
                      <div class="form-small grid grid-cols-2 gap-2">
                        <div>
                          <label for="" class="form-group-label"
                            >Tên nhân sự</label
                          >
                          <div>
                            <input
                              type="text"
                              name=""
                              id=""
                              class="disabledInput"
                              disabled
                              placeholder="Nhập mã"
                              v-model="contractDetail.personnel_name"
                            />
                          </div>
                        </div>
                        <div>
                          <label for="" class="form-group-label"
                            >Mã nhân sự</label
                          >
                          <div>
                            <input
                              type="text"
                              name=""
                              id=""
                              class="disabledInput"
                              disabled
                              placeholder="Nhập mã"
                              v-model="contractDetail.personnel_code"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="grid grid-cols-6 gap-2 form-small">
                        <div class="col-span-2">
                          <label for="" class="form-group-label"
                            >Mã hợp đồng<span class="text-red-600">*</span
                            ><span class="text-orange-300"
                              ><i
                                class="bi bi-question-circle"
                                style="font-size: 10px"
                              ></i></span
                          ></label>
                          <div>
                            <input
                              type="text"
                              name=""
                              id=""
                              class="form-control-input"
                              placeholder="Nhập mã"
                              v-model="contractDetail.contract_code"
                            />
                          </div>
                        </div>
                        <div class="col-span-4">
                          <label for="" class="form-group-label"
                            >Hợp đồng<span class="text-red-600">*</span></label
                          >
                          <div>
                            <input-contract-type
                              v-model="contractDetail.contract_type"
                              class="long_select"
                            ></input-contract-type>
                          </div>
                        </div>
                      </div>
                      <div class="form-small">
                        <div>
                          <label for="" class="form-group-label"
                            >Phòng ban</label
                          >
                          <div>
                            <input-department
                              v-model="contractDetail.department_id"
                            ></input-department>
                          </div>
                        </div>
                      </div>
                      <div class="form-small">
                        <div>
                          <label for="" class="form-group-label"
                            >Hình thức</label
                          >
                          <div>
                            <input-work-type
                              v-model="contractDetail.work_type"
                            ></input-work-type>
                          </div>
                        </div>
                      </div>
                      <div class="form-small">
                        <div>
                          <label for="" class="form-group-label">Vị trí</label>
                          <div>
                            <input-position
                              v-model="contractDetail.position_id"
                            ></input-position>
                          </div>
                        </div>
                      </div>
                      <div class="form-small">
                        <div>
                          <label for="" class="form-group-label">Chức vụ</label>
                          <div>
                            <input-positiontitle
                              v-model="contractDetail.job_title"
                            ></input-positiontitle>
                          </div>
                        </div>
                      </div>
                      <div class="form-small">
                        <div>
                          <label for="" class="form-group-label"
                            >Nơi làm việc</label
                          >
                          <div>
                            <input-workplace
                              v-model="contractDetail.work_place"
                            ></input-workplace>
                          </div>
                        </div>
                      </div>
                      <div class="form-small">
                        <div>
                          <label for="" class="form-group-label"
                            >Ngạch lương</label
                          >
                          <div>
                            <input-salary-range
                              v-model="contractDetail.quantum_id"
                            ></input-salary-range>
                          </div>
                        </div>
                      </div>
                      <div class="grid grid-cols-2 gap-2 form-small">
                        <div>
                          <label for="" class="form-group-label"
                            >Hiệu lực từ ngày<span class="text-red-600"
                              >*</span
                            ></label
                          >
                          <div>
                            <date-picker
                              v-model="contractDetail.date_start"
                            ></date-picker>
                          </div>
                        </div>
                        <div>
                          <label for="" class="form-group-label"
                            >Đến ngày</label
                          >
                          <div>
                            <date-picker
                              v-model="contractDetail.date_finish"
                            ></date-picker>
                          </div>
                        </div>
                      </div>
                      <div class="grid grid-cols-2 gap-2 form-small">
                        <div>
                          <label for="" class="form-group-label">Ngày ký</label>
                          <div>
                            <date-picker
                              v-model="contractDetail.date_reg"
                            ></date-picker>
                          </div>
                        </div>
                        <div>
                          <label for="" class="form-group-label"
                            >Người ký</label
                          >
                          <div>
                            <input
                              type="text"
                              name=""
                              id=""
                              class="form-control-input"
                              placeholder="Nhập người ký"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Transition>
                  <div v-show="isContract == false">
                    <h2
                      @click="isContract = !isContract"
                      class="cursor-pointer mt-2 text-sm"
                    >
                      Mã hợp đồng *, Hợp đồng *, Phòng ban, Hình thức, Vị trí,
                      Chức vụ, Nơi làm việc, Ngạch lương, Hiệu lực từ ngày *,
                      Đến ngày, Ngày ký, Người ký
                    </h2>
                  </div>
                  <div>
                    <h4
                      class="form-section-title form-small cursor-pointer"
                      @click="isSalary = !isSalary"
                    >
                      <span v-show="isSalary == true"
                        ><i class="fas fa-chevron-down cursor-pointer"></i
                      ></span>
                      <span v-show="isSalary == false"
                        ><i class="fas fa-chevron-right cursor-pointer"></i
                      ></span>
                      Thông tin lương và phụ cấp
                    </h4>
                    <Transition name="slide-fade">
                      <div v-show="isSalary == true" class="form-small">
                        <div
                          v-for="(salary, index) in contractDetail.salaries"
                          :key="index"
                        >
                          <div class="flex items-center">
                            <div class="grid grid-cols-5 gap-2 w-full">
                              <div class="col-span-2">
                                <label for="" class="form-group-label"
                                  >Từ ngày</label
                                >
                                <div>
                                  <date-picker
                                    v-model="salary.date"
                                  ></date-picker>
                                </div>
                              </div>
                              <div class="col-span-3">
                                <label for="" class="form-group-label"
                                  >Ghi chú</label
                                >
                                <div>
                                  <input
                                    type="text"
                                    name=""
                                    id=""
                                    class="form-control-input"
                                    placeholder="Nhập ghi chú"
                                    v-model="salary.desc"
                                  />
                                </div>
                              </div>
                            </div>
                            <span @click="removeSalary(index)">
                              <i
                                class="fal fa-times icon-close"
                                style="margin-top: 40px"
                              ></i>
                            </span>
                          </div>
                          <div class="ml-8">
                            <div
                              class="flex items-center"
                              v-for="(
                                salaryType, inde
                              ) in salary.json_type_salary"
                              :key="inde"
                            >
                              <div class="grid grid-cols-5 gap-4 mt-2">
                                <div class="col-span-3">
                                  <label for="" class="form-group-label"
                                    >Hình thức lương</label
                                  >
                                  <div>
                                    <input-type-salary
                                      v-model="salaryType.type_salary"
                                    ></input-type-salary>
                                  </div>
                                </div>
                                <div class="col-span-2">
                                  <label for="" class="form-group-label"
                                    >Số tiền</label
                                  >
                                  <div>
                                    <CurrencyInput v-model="salaryType.money" />
                                  </div>
                                </div>
                              </div>
                              <span @click="removeTypesalary(index, inde)">
                                <i
                                  class="fal fa-times icon-close"
                                  style="margin-top: 40px"
                                ></i>
                              </span>
                            </div>
                            <div @click="addTypesalary(index)">
                              <span
                                ><i
                                  class="fal fa-plus-circle icon-plus mt-2"
                                ></i
                              ></span>
                            </div>
                          </div>
                          <div class="ml-8 mt-2">
                            <div
                              class="flex items-center"
                              v-for="(allowance, ind) in salary.json_allowances"
                              :key="ind"
                            >
                              <div class="grid grid-cols-5 gap-4 mt-2">
                                <div class="col-span-3">
                                  <label for="" class="form-group-label"
                                    >Phụ cấp</label
                                  >
                                  <div>
                                    <input-allowance
                                      v-model="allowance.allowance"
                                    ></input-allowance>
                                  </div>
                                </div>
                                <div class="col-span-2">
                                  <label for="" class="form-group-label"
                                    >Số tiền</label
                                  >
                                  <div>
                                    <CurrencyInput v-model="allowance.money" />
                                  </div>
                                </div>
                              </div>
                              <span @click="removeAllowance(index, ind)">
                                <i
                                  class="fal fa-times icon-close"
                                  style="margin-top: 40px"
                                ></i>
                              </span>
                            </div>
                            <div>
                              <span @click="addAllowance(index)"
                                ><i
                                  class="fal fa-plus-circle icon-plus mt-2"
                                ></i
                              ></span>
                            </div>
                          </div>
                          <div class="ml-8 mt-2">
                            <label for="" class="form-group-label"
                              >Mức lương đóng bảo hiểm</label
                            >
                            <div>
                              <CurrencyInput v-model="salary.premium_salary" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <span @click="addSalary"
                            ><i class="fal fa-plus-circle icon-plus mt-2"></i
                          ></span>
                        </div>
                      </div>
                    </Transition>
                    <div v-show="isSalary == false">
                      <h2
                        @click="isSalary = !isSalary"
                        class="cursor-pointer mt-2 text-sm"
                      >
                        Mã hợp đồng *, Hợp đồng *, Phòng ban, Hình thức, Vị trí,
                        Chức vụ, Nơi làm việc, Ngạch lương, Hiệu lực từ ngày *,
                        Đến ngày, Ngày ký, Người ký
                      </h2>
                    </div>
                  </div>
                  <div class="form-small">
                    <label for="" class="form-group-label">Ghi chú</label>
                    <div>
                      <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="5"
                        class="form-control-input mt-2"
                        v-model="contractDetail.desc"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </the-tab>
          </Transition>
        </div>
        <div>
          <Transition name="slide-fade">
            <the-tab :isSelected="selected === 'Đính kèm'">
              <div class="text-left p-4 form-small">
                <attach-file></attach-file>
              </div>
            </the-tab>
          </Transition>
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer
      ><div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="updateContract()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="this.$router.go(-1)">
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
import TheTab from "@/components/tab/TheTab.vue";
import TabNav from "@/components/tab/TabNav.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarPersonnel from "@/components/sidebar/SidebarPersonnel.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreatePersonnel from "@/views/personnels/ButtonCreatePersonnel.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import datePicker from "@/components/datePicker/datePicker.vue";
import InputDepartment from "@/components/constant/InputDepartment.vue";
import InputPosition from "@/components/constant/InputPosition.vue";
import InputPositiontitle from "@/components/constant/InputPositiontitle.vue";
import InputWorkplace from "@/components/constant/InputWorkplace.vue";
import InputContractType from "@/components/constant/InputContractType.vue";
import InputWorkType from "@/components/constant/InputWorkType.vue";
import InputSalaryRange from "@/components/constant/InputSalaryRange.vue";
import AttachFile from "@/components/constant/AttachFile.vue";
import CurrencyInput from "@/components/CurrencyInput.vue";
import InputTypeSalary from "@/components/constant/TotalInput/InputTypeSalary.vue";
import InputAllowance from "@/components/constant/TotalInput/InputAllowance.vue";
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { FormatDate } from "@/constants/FormatAll";
import { useToast } from "vue-toastification";
import { useContract } from "@/store/modules/contract/contracts";
import { storeToRefs } from "pinia";
export default {
  components: {
    TheTab,
    TabNav,
    PersonLayout,
    SidebarPersonnel,
    NavbarSocial,
    ButtonCreatePersonnel,
    NavFeature,
    datePicker,
    InputDepartment,
    InputPosition,
    InputPositiontitle,
    InputWorkplace,
    InputContractType,
    InputWorkType,
    InputSalaryRange,
    AttachFile,
    CurrencyInput,
    InputTypeSalary,
    InputAllowance,
  },
  data() {
    return {
      isContract: true,
      isSalary: true,
      img_3: null,
      multiFile: [],
    };
  },
  methods: {
    formatdate(date) {
      return FormatDate(date);
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const isLoading = ref(true);
    const selected = ref("Hợp đồng");
    const contract = useContract();
    const { contractDetail } = storeToRefs(contract);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    contract.ShowContractDetailAction({
      id: route.params.contractID,
      EndTimeLoading: EndTimeLoading,
    });
    const setSelected = (tab) => {
      selected.value = tab;
    };
    const json_salaries = reactive([
      {
        date: "",
        desc: "",
        json_type_salary: [
          {
            type_salary: null,
            money: null,
          },
        ],
        json_allowances: [
          {
            allowance: null,
            money: null,
          },
        ],
      },
    ]);
    const addSalary = () => {
      if (contractDetail.value.salaries == null) {
        contractDetail.value.salaries = [];
      }
      const data = {
        date: "",
        desc: "",
        json_type_salary: [
          {
            type_salary: null,
            money: null,
          },
        ],
        json_allowances: [
          {
            allowance: null,
            money: null,
          },
        ],
        premium_salary: null,
      };
      contractDetail.value.salaries.push(data);
    };
    const removeSalary = (index) => {
      contractDetail.value.salaries.splice(index, 1);
    };
    const addTypesalary = (index) => {
      const data = {
        type_salary: null,
        money: null,
      };
      contractDetail.value.salaries[index].json_type_salary.push(data);
    };
    const removeTypesalary = (index, num) => {
      contractDetail.value.salaries[index].json_type_salary.splice(num, 1);
    };
    const addAllowance = (index) => {
      const data = {
        allowance: null,
        money: null,
      };
      contractDetail.value.salaries[index].json_allowances.push(data);
    };
    const removeAllowance = (index, num) => {
      contractDetail.value.salaries[index].json_allowances.splice(num, 1);
    };
    const listPersonnels = computed(
      () => store.state.personnels.listPersonnels
    );
    const listMissions = computed(
      () => store.getters["allowances/getAllAllowancesActive"]
    );
    const listTypeSalary = computed(
      () => store.state.personnels.listTypeSalary
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
    const listContractTypes = computed(
      () => store.state.contractTypes.listContractTypes
    );
    const listWorkTypes = computed(() => store.state.workTypes.listWorkTypes);
    const listWorkplace = computed(() => store.state.workplace.listWorkplace);
    const listSalryRange = computed(
      () => store.state.salaryRange.listSalryRange
    );
    const listAllowance = computed(
      () => store.getters["allowances/getAllAllowancesActive"]
    );

    if (listDepartments.value?.length == 0) {
      store.dispatch("departments/getAllDepartmentsAction");
    }
    if (listPositions.value?.length == 0) {
      store.dispatch("positions/getAllPositionsAction", 500);
    }
    if (listPositiontitles.value?.length == 0) {
      store.dispatch("positiontitles/getAllPositiontitlesAction", 100);
    }
    if (listContractTypes.value?.length == 0) {
      store.dispatch("contractTypes/GetAllContractTypeAction", 50);
    }
    if (listWorkTypes.value?.length == 0) {
      store.dispatch("workTypes/GetAllWorkTypeAction", 50);
    }
    if (listAllowance.value?.length == 0) {
      store.dispatch("allowances/getAllAllowancesAction", 100);
    }
    if (listWorkplace.value?.length == 0) {
      store.dispatch("workplace/getAllWorkplaceAction", 500);
    }
    if (listSalryRange.value?.length == 0) {
      store.dispatch("salaryRange/getAllSalaryRangeAction", 100);
    }
    const updateContract = () => {
      const data = {
        ID: contractDetail.value.ID,
        personnel_id: contractDetail.value.personnel_id,
        personnel_code: contractDetail.value.personnel_code,
        personnel_name: contractDetail.value.personnel_name,
        contract_code: contractDetail.value.contract_code,
        contract_type: contractDetail.value.contract_type,
        date_reg: contractDetail.value.date_reg,
        date_start: contractDetail.value.date_start,
        date_finish: contractDetail.value.date_finish,
        work_type: contractDetail.value.work_type,
        department_id: contractDetail.value.department_id,
        position_id: contractDetail.value.position_id,
        job_title: contractDetail.value.job_title,
        work_place: contractDetail.value.work_place,
        quantum_id: contractDetail.value.quantum_id,
        desc_contract: contractDetail.value.desc,
        json_salaries: contractDetail.value.salaries,
      };
      contract.updateContractAction({
        data: data,
        router,
        toast,
        EndTimeLoading,
      });
    };
    return {
      contractDetail,
      selected,
      listPersonnels,
      updateContract,
      setSelected,
      isLoading,
      listMissions,
      json_salaries,
      EndTimeLoading,
      addSalary,
      addTypesalary,
      addAllowance,
      removeSalary,
      removeTypesalary,
      removeAllowance,
      listTypeSalary,
      listDepartments,
      listPositions,
      listPositiontitles,
      listContractTypes,
      listWorkTypes,
      listWorkplace,
      listSalryRange,
      listAllowance,
    };
  },
};
</script>
<style>
.disabledInput {
  background-color: rgb(240, 240, 240);
}
</style>
