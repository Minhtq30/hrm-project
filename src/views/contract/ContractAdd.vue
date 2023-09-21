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
            <p class="longText">Tạo mới hợp đồng</p>
          </div>
        </div></navbar-social
      >
    </template>
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoadingPage == false">
        <div class="text-left px-4 py-2">
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
            <Transition name="slide-up">
              <div v-show="isContract == true" class="mt-2 outer">
                <div class="form-small">
                  <div>
                    <label for="" class="form-group-label">Nhân sự</label>
                    <div v-if="this.$route.params.idPersonnel == 'add'">
                      <v-select
                        label="name"
                        :options="listPersonnels"
                        :reduce="(personnel) => personnel.ID"
                        @input="loadPersonnel($event)"
                        @option:selected="changeInputPersonnel($event)"
                        placeholder="Tìm mã, họ tên"
                        :filterable="false"
                      >
                        <template
                          #option="{ code, name, department, position }"
                        >
                          <div class="flex flex-col text-left">
                            <div class="flex">
                              <div class="font-medium">{{ code }}</div>
                              <div>&nbsp;- {{ name }}</div>
                            </div>
                            <div class="flex text-xs">
                              <div v-if="position">
                                {{ position }}&nbsp;-&nbsp;
                              </div>
                              <div>{{ department }}</div>
                            </div>
                          </div>
                        </template>
                        <template #selected-option="{ code, name }">
                          <div class="flex">
                            <div class="font-medium">{{ code }}</div>
                            <div>&nbsp;- {{ name }}</div>
                          </div>
                        </template>
                      </v-select>
                    </div>
                    <div v-else>
                      <input
                        type="text"
                        name=""
                        id=""
                        class="disabledInput"
                        disabled
                        :value="infoPersonnel.code + ` - ` + infoPersonnel.name"
                      />
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-2 form-small">
                  <div class="col-span-3">
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
                        v-model="contractCode"
                      />
                    </div>
                  </div>
                  <div class="col-span-9">
                    <label for="" class="form-group-label"
                      >Tên hợp đồng<span class="text-red-600">*</span></label
                    >
                    <div>
                      <input-contract-type
                        v-model="personnelContractDetail.contract_type"
                        class="long_select"
                      ></input-contract-type>
                    </div>
                  </div>
                </div>
                <div class="form-small">
                  <div>
                    <label for="" class="form-group-label">Phòng ban</label>
                    <div>
                      <input-department
                        v-model="personnelContractDetail.department_id"
                      ></input-department>
                    </div>
                  </div>
                </div>
                <div class="form-small">
                  <div>
                    <label for="" class="form-group-label">Hình thức</label>
                    <div>
                      <input-work-type
                        v-model="personnelContractDetail.work_type"
                      ></input-work-type>
                    </div>
                  </div>
                </div>
                <div class="form-small">
                  <div>
                    <label for="" class="form-group-label">Vị trí</label>
                    <div>
                      <input-position
                        v-model="personnelContractDetail.position_id"
                      ></input-position>
                    </div>
                  </div>
                </div>
                <div class="form-small">
                  <div>
                    <label for="" class="form-group-label">Chức vụ</label>
                    <div>
                      <input-positiontitle
                        v-model="personnelContractDetail.job_title"
                      ></input-positiontitle>
                    </div>
                  </div>
                </div>
                <div class="form-small">
                  <div>
                    <label for="" class="form-group-label">Nơi làm việc</label>
                    <div>
                      <input-workplace
                        v-model="personnelContractDetail.work_place"
                      ></input-workplace>
                    </div>
                  </div>
                </div>
                <div class="form-small">
                  <div>
                    <label for="" class="form-group-label">Ngạch lương</label>
                    <div>
                      <input-salary-range
                        v-model="personnelContractDetail.quantum_id"
                      ></input-salary-range>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4 form-small">
                  <div>
                    <label for="" class="text-sm"
                      >Hiệu lực từ ngày<span class="text-red-600"
                        >*</span
                      ></label
                    >
                    <div>
                      <date-picker v-model="dateFrom"></date-picker>
                    </div>
                  </div>
                  <div>
                    <label for="" class="text-sm">Đến ngày</label>
                    <div>
                      <date-picker v-model="dateTo"></date-picker>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4 form-small">
                  <div>
                    <label for="" class="text-sm">Ngày ký</label>
                    <div>
                      <date-picker v-model="dateSign"></date-picker>
                    </div>
                  </div>
                  <div>
                    <label for="" class="text-sm">Người ký</label>
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
                class="cursor-pointer form-group-label"
              >
                Mã hợp đồng *, Hợp đồng *, Phòng ban, Hình thức, Vị trí, Chức
                vụ, Nơi làm việc, Ngạch lương, Hiệu lực từ ngày *, Đến ngày,
                Ngày ký, Người ký
              </h2>
            </div>
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
            <Transition name="slide-up">
              <div v-show="isSalary == true" class="form-small outer">
                <div v-if="json_salaries">
                  <div
                    v-for="(salary, index) in json_salaries"
                    :key="index"
                    class="mt-2"
                  >
                    <div class="flex items-center">
                      <div class="grid grid-cols-5 gap-2 w-full">
                        <div class="col-span-2">
                          <label for="" class="form-group-label">Từ ngày</label>
                          <div>
                            <date-picker></date-picker>
                          </div>
                        </div>
                        <div class="col-span-3">
                          <label for="" class="form-group-label">Ghi chú</label>
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
                        class="grid grid-cols-5 gap-2 mt-2"
                        v-if="salary.json_type_salary?.length"
                      >
                        <div class="col-span-3">
                          <label for="" class="form-group-label"
                            >Hình thức lương</label
                          >
                        </div>
                        <div class="col-span-2">
                          <label for="" class="form-group-label">Số tiền</label>
                        </div>
                      </div>
                      <div
                        class="flex items-center"
                        v-for="(salaryType, inde) in salary.json_type_salary"
                        :key="inde"
                      >
                        <div class="grid grid-cols-5 gap-2 mt-1">
                          <div class="col-span-3">
                            <input-type-salary
                              v-model="salaryType.type_salary"
                            ></input-type-salary>
                          </div>
                          <div class="col-span-2">
                            <CurrencyInput v-model="salaryType.money" />
                          </div>
                        </div>
                        <span @click="removeTypesalary(index, inde)">
                          <i
                            class="fal fa-times icon-close"
                            style="margin-top: 15px"
                          ></i>
                        </span>
                      </div>
                      <div>
                        <span @click="addTypesalary(index)"
                          ><i class="fal fa-plus-circle icon-plus mt-2"></i
                        ></span>
                      </div>
                    </div>
                    <div class="ml-8 mt-2">
                      <div
                        class="grid grid-cols-5 gap-2 mt-2"
                        v-if="salary.json_allowances?.length"
                      >
                        <div class="col-span-3">
                          <label for="" class="form-group-label">Phụ cấp</label>
                        </div>
                        <div class="col-span-2">
                          <label for="" class="form-group-label">Số tiền</label>
                        </div>
                      </div>
                      <div
                        class="flex items-center"
                        v-for="(allowance, ind) in salary.json_allowances"
                        :key="ind"
                      >
                        <div class="grid grid-cols-5 gap-2 mt-1">
                          <div class="col-span-3">
                            <input-allowance
                              v-model="allowance.allowance"
                            ></input-allowance>
                          </div>
                          <div class="col-span-2">
                            <CurrencyInput v-model="allowance.money" />
                          </div>
                        </div>
                        <span @click="removeAllowance(index, ind)">
                          <i
                            class="fal fa-times icon-close"
                            style="margin-top: 15px"
                          ></i>
                        </span>
                      </div>
                      <div>
                        <span @click="addAllowance(index)"
                          ><i class="fal fa-plus-circle icon-plus mt-2"></i
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
                </div>
                <div v-else class="text-left p-2">Không tìm thấy kết quả</div>
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
                Mã hợp đồng *, Hợp đồng *, Phòng ban, Hình thức, Vị trí, Chức
                vụ, Nơi làm việc, Ngạch lương, Hiệu lực từ ngày *, Đến ngày,
                Ngày ký, Người ký
              </h2>
            </div>
          </div>
          <div class="mt-2">
            <label for="" class="form-group-label">Ghi chú</label>
            <div class="form-small">
              <textarea
                name=""
                id=""
                cols="30"
                rows="5"
                class="form-control-input mt-2"
                v-model="personnelContractDetail.desc"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer
      ><div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="createContract()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="this.$router.go(-1)">
            Hủy bỏ
          </button>
        </div>
      </div></template
    >
  </person-layout>
  <loading-overlay :isLoading="isLoading"></loading-overlay>
  <loading-overlay :isLoading="isLoadingPage"></loading-overlay>
</template>

<script>
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarPersonnel from "@/components/sidebar/SidebarPersonnel.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreatePersonnel from "@/views/personnels/ButtonCreatePersonnel.vue";
import datePicker from "@/components/datePicker/datePicker.vue";
import InputDepartment from "@/components/constant/InputDepartment.vue";
import InputPosition from "@/components/constant/InputPosition.vue";
import InputPositiontitle from "@/components/constant/InputPositiontitle.vue";
import InputWorkplace from "@/components/constant/InputWorkplace.vue";
import InputContractType from "@/components/constant/InputContractType.vue";
import InputWorkType from "@/components/constant/InputWorkType.vue";
import InputSalaryRange from "@/components/constant/InputSalaryRange.vue";
import InputTypeSalary from "@/components/constant/TotalInput/InputTypeSalary.vue";
import InputAllowance from "@/components/constant/TotalInput/InputAllowance.vue";
import CurrencyInput from "@/components/CurrencyInput.vue";
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { FormatDate } from "@/constants/FormatAll";
import { useToast } from "vue-toastification";
import { useContract } from "@/store/modules/contract/contracts";
import _ from "lodash";
export default {
  components: {
    PersonLayout,
    SidebarPersonnel,
    NavbarSocial,
    ButtonCreatePersonnel,
    datePicker,
    InputDepartment,
    InputPosition,
    InputPositiontitle,
    InputWorkplace,
    InputContractType,
    InputWorkType,
    InputSalaryRange,
    CurrencyInput,
    InputTypeSalary,
    InputAllowance,
  },
  data() {
    return {
      isContract: true,
      isSalary: true,
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
    const toast = useToast();
    const route = useRoute();
    const personnelID = ref();
    const contractCode = ref();
    const isLoading = ref(false);
    const isLoadingPage = ref(true);
    const dateContract = new Date().toISOString().substring(0, 10);
    const dateFrom = ref();
    const dateTo = ref();
    const dateSign = ref();
    const contract = useContract();
    setTimeout(() => {
      isLoadingPage.value = false;
    }, 500);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const json_salaries = reactive([
      // {
      //   date: dateContract,
      //   desc: "",
      //   json_type_salary: [
      //     {
      //       type_salary: null,
      //       money: null,
      //     },
      //   ],
      //   json_allowances: [
      //     {
      //       allowance: null,
      //       money: null,
      //     },
      //   ],
      //   premium_salary: null,
      // },
    ]);
    const loadPersonnel = _.debounce((event) => {
      store.dispatch("personnels/SearchPersonnelAction", event.target.value);
    }, 400);
    const changeInputPersonnel = (event) => {
      isLoading.value = true;
      contract.ShowContractByIDAction({
        id: event.ID,
        EndTimeLoading,
      });
      personnelID.value = event.ID;
      // store.dispatch("personnels/SearchPersonnelAction", event.ID);
    };
    if (route.params.idPersonnel != "add") {
      changeInputPersonnel({ ID: route.params.idPersonnel });
    }
    const personnelContractDetail = computed(() => contract.ContractByID);
    const infoPersonnel = computed(() => contract.infoPersonnel);
    const listPersonnels = computed(
      () => store.state.personnels.SearchPersonnel
    );
    const listTypeSalary = computed(
      () => store.state.personnels.listTypeSalary
    );
    const listAllowance = computed(
      () => store.getters["allowances/getAllAllowancesActive"]
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
    // const SelectMultiDate = () => {
    //   const end = new Date(dateFrom);
    //   const final = new Date();
    //   if (personnelContractDetail.value.contract_type != 37) {
    //     const type = listContractTypes.value.find(
    //       (item) => item.ID == personnelContractDetail.value.contract_type
    //     );
    //     if (type.unit == "MONTH") {
    //       const day = type.count * 30;
    //       final.setDate(end.getDate() + day);
    //       dateTo.value = final;
    //     }
    //     if (type.unit == "DAY") {
    //       const day = type.count;
    //       final.setDate(end.getDate() + day);
    //       dateTo.value = final;
    //     }
    //   }
    // };
    const addSalary = () => {
      const data = {
        date: dateContract,
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
      };
      json_salaries.push(data);
    };
    const removeSalary = (index) => {
      json_salaries.splice(index, 1);
    };
    const addTypesalary = (index) => {
      const data = {
        type_salary: null,
        money: null,
      };
      json_salaries[index].json_type_salary.push(data);
    };
    const removeTypesalary = (index, num) => {
      json_salaries[index].json_type_salary.splice(num, 1);
    };
    const addAllowance = (index) => {
      const data = {
        allowance: null,
        money: null,
      };
      json_salaries[index].json_allowances.push(data);
    };
    const removeAllowance = (index, num) => {
      json_salaries[index].json_allowances.splice(num, 1);
    };
    const createContract = () => {
      const data = {
        personnel_id: personnelID.value,
        contract_code: contractCode.value,
        contract_type: personnelContractDetail.value.contract_type,
        date_reg: dateSign.value,
        date_start: dateFrom.value,
        date_finish: dateTo.value,
        work_type: personnelContractDetail.value.work_type,
        department_id: personnelContractDetail.value.department_id,
        position_id: personnelContractDetail.value.position_id,
        job_title: personnelContractDetail.value.job_title,
        work_place: personnelContractDetail.value.work_place,
        quantum_id: personnelContractDetail.value.quantum_id,
        json_salaries: json_salaries,
        desc_contract: personnelContractDetail.value.desc,
      };
      if (contractCode.value.length > 0) {
        if (personnelContractDetail.value.contract_type != null) {
          contract.createContractAction({
            data: data,
            router,
            toast,
            EndTimeLoading,
          });
        } else {
          toast.error("Vui lòng chọn loại hợp đồng");
        }
      } else {
        toast.error("Vui lòng nhập mã hợp đồng");
      }
    };
    return {
      listPersonnels,
      personnelContractDetail: personnelContractDetail,
      isLoadingPage,
      dateContract,
      json_salaries,
      personnelID,
      loadPersonnel,
      infoPersonnel,
      contractCode,
      createContract,
      changeInputPersonnel,
      addSalary,
      removeSalary,
      addTypesalary,
      removeTypesalary,
      addAllowance,
      removeAllowance,
      EndTimeLoading,
      // SelectMultiDate,
      isLoading,
      listTypeSalary,
      listAllowance,
      listDepartments,
      listPositions,
      listPositiontitles,
      listContractTypes,
      listWorkTypes,
      listWorkplace,
      listSalryRange,
      dateFrom,
      dateTo,
      dateSign,
    };
  },
};
</script>
<style>
.disabledInput {
  background-color: rgb(240, 240, 240);
}
</style>
