<template>
  <div class="w-[900px]">
    <h1 class="header-modal">Cập nhật thông tin bảo hiểm</h1>
    <div class="text-left h-[500px] overflow-auto format-scroll">
      <div class="text-left px-4 w-full mt-2">
        <h4
          class="form-section-title form-small cursor-pointer"
          @click="isInsurance = !isInsurance"
        >
          <span v-show="isInsurance == true"
            ><i class="fas fa-chevron-down cursor-pointer"></i
          ></span>
          <span v-show="isInsurance == false"
            ><i class="fas fa-chevron-right cursor-pointer"></i
          ></span>
          Thông tin bảo hiểm
        </h4>
        <Transition name="slide-up">
          <div v-show="isInsurance == true" class="mt-2">
            <div class="grid grid-cols-2 gap-2 form-small">
              <div>
                <label for="" class="form-group-label">Số sổ BH</label>
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập mã"
                    v-model="personnelDetail.premium_number"
                  />
                </div>
              </div>
              <div>
                <label for="" class="form-group-label">Trạng thái sổ</label>
                <div>
                  <input-status-insurance
                    v-model="personnelDetail.premium_insurance_status"
                  ></input-status-insurance>
                </div>
              </div>
            </div>
            <div class="form-small">
              <div>
                <label for="" class="form-group-label">Pháp nhân đóng</label>
                <div>
                  <input-data-premium
                    v-model="personnelDetail.premium_personnel"
                  ></input-data-premium>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 form-small">
              <div>
                <label for="" class="form-group-label">Số thẻ BHYT</label>
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập mã"
                    v-model="personnelDetail.premium_card"
                  />
                </div>
              </div>
              <div>
                <label for="" class="form-group-label">Mã tỉnh cấp</label>
                <div>
                  <input-premium-code
                    v-model="personnelDetail.premium_code"
                  ></input-premium-code>
                </div>
              </div>
            </div>
            <div class="form-small">
              <div>
                <label for="" class="form-group-label">ĐK khám chữa bệnh</label>
                <div>
                  <input-premium-place
                    v-model="personnelDetail.premium_place"
                  ></input-premium-place>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <div v-show="isInsurance == false">
          <h2
            @click="isInsurance = !isInsurance"
            class="cursor-pointer mt-2 form-group-label"
          >
            Mã hợp đồng *, Hợp đồng *, Phòng ban, Hình thức, Vị trí, Chức vụ,
            Nơi làm việc, Ngạch lương, Hiệu lực từ ngày *, Đến ngày, Ngày ký,
            Người ký
          </h2>
        </div>

        <h4
          class="form-section-title form-small cursor-pointer"
          @click="isIncrease = !isIncrease"
        >
          <span v-show="isIncrease == true"
            ><i class="fas fa-chevron-down cursor-pointer"></i
          ></span>
          <span v-show="isIncrease == false"
            ><i class="fas fa-chevron-right cursor-pointer"></i
          ></span>
          Nghiệp vụ báo tăng
        </h4>
        <Transition name="slide-up">
          <div v-show="isIncrease == true" class="mt-2">
            <div class="grid grid-cols-2 gap-2 form-small">
              <div>
                <label for="" class="form-group-label">NV hoàn thiện HS</label>
                <div>
                  <date-picker
                    v-model="personnelDetail.insup_date_get"
                  ></date-picker>
                </div>
              </div>
              <div>
                <label for="" class="form-group-label">NS hoàn thiện HS</label>
                <div>
                  <date-picker
                    v-model="personnelDetail.insup_date_complete"
                  ></date-picker>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 form-small">
              <div>
                <label for="" class="form-group-label"
                  >Ngày nhận thẻ BHYT</label
                >
                <div>
                  <date-picker
                    v-model="personnelDetail.insup_date_close"
                  ></date-picker>
                </div>
              </div>
              <div>
                <label for="" class="form-group-label">Ngày trả thẻ BHYT</label>
                <div>
                  <date-picker
                    v-model="personnelDetail.insup_date_return"
                  ></date-picker>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <div v-show="isIncrease == false">
          <h2
            @click="isIncrease = !isIncrease"
            class="cursor-pointer mt-2 form-group-label"
          >
            Mã hợp đồng
          </h2>
        </div>

        <h4
          class="form-section-title form-small cursor-pointer"
          @click="isReduce = !isReduce"
        >
          <span v-show="isReduce == true"
            ><i class="fas fa-chevron-down cursor-pointer"></i
          ></span>
          <span v-show="isReduce == false"
            ><i class="fas fa-chevron-right cursor-pointer"></i
          ></span>
          Nghiệp vụ báo giảm
        </h4>
        <Transition name="slide-up">
          <div v-show="isReduce == true" class="mt-2">
            <div class="grid grid-cols-2 gap-2 form-small">
              <div>
                <label for="" class="form-group-label"
                  >Ngày nhận sổ BH từ NLĐ</label
                >
                <div>
                  <date-picker
                    v-model="personnelDetail.insdown_date_close"
                  ></date-picker>
                </div>
              </div>
              <div>
                <label for="" class="form-group-label">NS hoàn thiện HS</label>
                <div>
                  <date-picker
                    v-model="personnelDetail.insdown_date_complete"
                  ></date-picker>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 form-small">
              <div>
                <label for="" class="form-group-label"
                  >Ngày nhận số BH đã chốt</label
                >
                <div>
                  <date-picker
                    v-model="personnelDetail.insdown_date_return"
                  ></date-picker>
                </div>
              </div>
              <div>
                <label for="" class="form-group-label"
                  >Ngày trả sổ cho NLĐ</label
                >
                <div>
                  <date-picker
                    v-model="personnelDetail.insdown_date_get"
                  ></date-picker>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <div v-show="isReduce == false">
          <h2
            @click="isReduce = !isReduce"
            class="cursor-pointer mt-2 form-group-label"
          >
            Mã hợp đồng
          </h2>
        </div>

        <h4
          class="form-section-title form-small cursor-pointer"
          @click="isInsuranceHistory = !isInsuranceHistory"
        >
          <span v-show="isInsuranceHistory == true"
            ><i class="fas fa-chevron-down cursor-pointer"></i
          ></span>
          <span v-show="isInsuranceHistory == false"
            ><i class="fas fa-chevron-right cursor-pointer"></i
          ></span>
          Lịch sử đóng bảo hiểm
        </h4>
        <Transition name="slide-up">
          <div v-show="isInsuranceHistory == true" class="">
            <div class="form-plus">
              <div
                class="grid grid-cols-12 gap-2"
                v-if="personnelDetail.personnel_premium_history?.length"
              >
                <div class="col-span-1">
                  <label for="" class="form-group-label">Từ tháng</label>
                </div>
                <div class="col-span-2">
                  <label for="" class="form-group-label">Hình thức</label>
                </div>
                <div class="col-span-3">
                  <label for="" class="form-group-label">Lý do</label>
                </div>
                <div class="col-span-2">
                  <label for="" class="form-group-label">Pháp nhân đóng</label>
                </div>
                <div class="col-span-2">
                  <label for="" class="form-group-label"
                    >Mức đóng bảo hiểm</label
                  >
                </div>
                <div>
                  <label for="" class="form-group-label">CT đóng</label>
                </div>
                <div>
                  <label for="" class="form-group-label">NLĐ đóng</label>
                </div>
              </div>
              <div
                class="flex items-center mt-2"
                v-for="(
                  item, index
                ) in personnelDetail.personnel_premium_history"
                :key="index"
              >
                <div class="grid grid-cols-12 gap-2">
                  <div class="col-span-1">
                    <date-picker v-model="item.date_from"></date-picker>
                  </div>
                  <div class="col-span-2">
                    <input-type-premium
                      v-model="item.type"
                    ></input-type-premium>
                  </div>
                  <div class="col-span-3">
                    <input-reason-increase
                      v-model="item.reason"
                      v-if="item.type == 'up'"
                    ></input-reason-increase>
                    <input-reason-decrease
                      v-model="item.reason"
                      v-else-if="item.type == 'down'"
                    ></input-reason-decrease>
                    <v-select v-else></v-select>
                  </div>
                  <div class="col-span-2">
                    <input-data-premium
                      v-model="item.object_legal"
                    ></input-data-premium>
                  </div>
                  <div class="col-span-2">
                    <CurrencyInput v-model="item.salary_premium_base" />
                  </div>
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input disabledInput"
                      disabled
                      v-model="item.salary_premium_company"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input disabledInput"
                      disabled
                      v-model="item.salary_premium_person"
                    />
                  </div>
                </div>
                <span @click="removePremiumHistory(index)"
                  ><i
                    class="fal fa-times icon-close mr-4"
                    style="margin-top: 15px"
                  ></i
                ></span>
              </div>
              <div>
                <span @click="createPremiumHistory()"
                  ><i class="fal fa-plus-circle icon-plus mt-2"></i
                ></span>
              </div>
            </div>
          </div>
        </Transition>

        <div v-show="isInsuranceHistory == false">
          <h2
            @click="isInsuranceHistory = !isInsuranceHistory"
            class="cursor-pointer mt-2 form-group-label"
          >
            Mã hợp đồng
          </h2>
        </div>

        <h4
          class="form-section-title form-small cursor-pointer"
          @click="isRegimeHistory = !isRegimeHistory"
        >
          <span v-show="isRegimeHistory == true"
            ><i class="fas fa-chevron-down cursor-pointer"></i
          ></span>
          <span v-show="isRegimeHistory == false"
            ><i class="fas fa-chevron-right cursor-pointer"></i
          ></span>
          Lịch sử giải quyết chế độ
        </h4>
        <Transition name="slide-up">
          <div v-show="isRegimeHistory == true" class="">
            <div class="form-plus">
              <div
                class="grid grid-cols-12 gap-2"
                v-if="personnelDetail.personnel_insurance_solve_history?.length"
              >
                <div class="col-span-3">
                  <label for="" class="form-group-label">Loại chế độ</label>
                </div>
                <div class="col-span-2">
                  <label for="" class="form-group-label">Ngày nhận hồ sơ</label>
                </div>
                <div class="col-span-2">
                  <label for="" class="form-group-label"
                    >Ngày hoàn thiện TC</label
                  >
                </div>
                <div class="col-span-2">
                  <label for="" class="form-group-label"
                    >Ngày nhận tiền BH trả</label
                  >
                </div>
                <div class="col-span-2">
                  <label for="" class="form-group-label">Ngày nhận hồ sơ</label>
                </div>
                <div>
                  <label for="" class="form-group-label">Số tiền</label>
                </div>
              </div>
              <div
                class="flex items-center mt-2"
                v-for="(
                  item, index
                ) in personnelDetail.personnel_insurance_solve_history"
                :key="index"
              >
                <div class="grid grid-cols-12 gap-2">
                  <div class="col-span-3">
                    <input-model-premium
                      v-model="item.model"
                    ></input-model-premium>
                  </div>
                  <div class="col-span-2">
                    <date-picker v-model="item.premium_date_get"></date-picker>
                  </div>
                  <div class="col-span-2">
                    <date-picker
                      v-model="item.premium_date_complete"
                    ></date-picker>
                  </div>
                  <div class="col-span-2">
                    <date-picker
                      v-model="item.premium_date_close"
                    ></date-picker>
                  </div>
                  <div class="col-span-2">
                    <date-picker
                      v-model="item.premium_date_return"
                    ></date-picker>
                  </div>
                  <div>
                    <CurrencyInput v-model="item.price" />
                  </div>
                </div>
                <span @click="removeSolveHistory(index)"
                  ><i
                    class="fal fa-times icon-close mr-4"
                    style="margin-top: 15px"
                  ></i
                ></span>
              </div>
              <div>
                <span @click="createSolveHistory()"
                  ><i class="fal fa-plus-circle icon-plus mt-2"></i
                ></span>
              </div>
            </div>
          </div>
        </Transition>

        <div v-show="isRegimeHistory == false">
          <h2
            @click="isRegimeHistory = !isRegimeHistory"
            class="cursor-pointer mt-2 form-group-label"
          >
            Mã hợp đồng
          </h2>
        </div>
      </div>
    </div>
    <div class="bg-button-modal">
      <button class="button-modal" @click="handleUpdateConcurrently()">
        Cập nhật
      </button>
      <button class="button-close-modal" @click="closeModalUpdate()">
        Hủy bỏ
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import datePicker from "@/components/datePicker/datePicker.vue";
import InputStatusInsurance from "@/components/constant/TotalInput/InputStatusInsurance.vue";
import InputDataPremium from "@/components/constant/TotalInput/InputDataPremium.vue";
import InputPremiumCode from "@/components/constant/TotalInput/InputPremiumCode.vue";
import InputPremiumPlace from "@/components/constant/TotalInput/InputPremiumPlace.vue";
import InputTypePremium from "@/components/constant/TotalInput/InputTypePremium.vue";
import InputReasonIncrease from "@/components/constant/TotalInput/InputReasonIncrease.vue";
import InputReasonDecrease from "@/components/constant/TotalInput/InputReasonDecrease.vue";
import InputModelPremium from "@/components/constant/TotalInput/InputModelPremium.vue";
import CurrencyInput from "@/components/CurrencyInput.vue";
export default {
  components: {
    datePicker,
    InputStatusInsurance,
    InputDataPremium,
    InputPremiumCode,
    InputPremiumPlace,
    InputTypePremium,
    InputReasonIncrease,
    InputReasonDecrease,
    InputModelPremium,
    CurrencyInput,
  },
  data() {
    return {
      isInsurance: true,
      isIncrease: true,
      isReduce: true,
      isInsuranceHistory: true,
      isRegimeHistory: true,
      isSalary: true,
    };
  },
  props: {
    PersonnelDetail: {
      type: Object,
    },
    CloseInsurance: {
      type: Function,
    },
  },
  setup(props) {
    const personnelDetail = ref(props.PersonnelDetail);
    const createPremiumHistory = () => {
      const data = {
        date_from: null,
        type: "up",
        reason: null,
        object_legal: null,
        salary_premium_base: null,
        salary_premium_company: 0,
        salary_premium_person: 0,
      };
      if (personnelDetail.value.personnel_premium_history == null) {
        personnelDetail.value.personnel_premium_history = [];
        personnelDetail.value.personnel_premium_history.push(data);
        console.log(personnelDetail.value.personnel_premium_history);
        // personnelDetail.value.personnel_premium_history = [data];
      } else {
        personnelDetail.value.personnel_premium_history.push(data);
        console.log(personnelDetail.value.personnel_premium_history);
      }
    };
    const removePremiumHistory = (index) => {
      personnelDetail.value.personnel_premium_history.splice(index, 1);
    };
    // end premium_history
    // start personnel_insurance_solve_history
    const createSolveHistory = () => {
      const data = {
        model: null,
        premium_date_get: null,
        premium_date_complete: null,
        premium_date_close: null,
        premium_date_return: null,
        price: null,
      };
      personnelDetail.value.personnel_insurance_solve_history.push(data);
    };
    const removeSolveHistory = (index) => {
      personnelDetail.value.personnel_insurance_solve_history.splice(index, 1);
    };
    const closeModalUpdate = () => {
      props.CloseInsurance();
    };
    return {
      personnelDetail,
      createPremiumHistory,
      removePremiumHistory,
      createSolveHistory,
      removeSolveHistory,
      closeModalUpdate,
    };
  },
};
</script>

<style></style>
