<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-setting-timekeep></sidebar-setting-timekeep>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false">
        <div class="flex grow">
          <div class="flex items-center">
            <div
              class="button-create"
              @click="handleOpenDetail"
              title="Tạo mới ca làm việc"
            ></div>
            <p class="longText">Cập nhật ca làm việc</p>
          </div>
        </div></navbar-social
      >
    </template>
    <Transition name="slide-down">
      <div class="home w-full" v-if="isLoading == false">
        <div class="text-left px-4 py-2">
          <!-- Start Thông tin chung -->
          <h4
            class="form-section-title form-small cursor-pointer"
            @click="isInfor = !isInfor"
          >
            <span v-show="isInfor == true">
              <i class="fas fa-chevron-down cursor-pointer"></i>
            </span>
            <span v-show="isInfor == false"
              ><i class="fas fa-chevron-right cursor-pointer"></i
            ></span>
            Thông tin chung
          </h4>
          <Transition name="slide-fade">
            <div v-show="isInfor == true">
              <div class="grid grid-cols-2 gap-2 form-small">
                <div>
                  <label for="" class="form-group-label"
                    >Mã ca<span class="text-red-600">*</span></label
                  >
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Nhập mã"
                      v-model="shiftDetail.code"
                    />
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label"
                    >Kiểu ca<span class="text-red-600">*</span></label
                  >
                  <div>
                    <v-select
                      label="title"
                      :options="TypeShift"
                      :reduce="(type) => type.value"
                      placeholder="Chọn kiểu ca"
                      v-model="shiftDetail.type"
                      :searchable="false"
                    >
                    </v-select>
                  </div>
                </div>
              </div>
              <div class="form-small">
                <label for="" class="form-group-label"
                  >Tên ca làm việc<span class="text-red-600">*</span></label
                >
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập tên"
                    v-model="shiftDetail.title"
                  />
                </div>
              </div>
              <div class="grid grid-cols-12 gap-2 form-small">
                <div class="col-span-3">
                  <label for="" class="form-group-label">Giờ vào</label>
                  <div>
                    <hour-picker v-model="shiftDetail.time_start"></hour-picker>
                  </div>
                </div>
                <div class="col-span-3">
                  <label for="" class="form-group-label">Giờ ra</label>
                  <div>
                    <hour-picker v-model="shiftDetail.time_end"></hour-picker>
                  </div>
                </div>
                <div class="col-span-6">
                  <label for="" class="form-group-label">Qua ngày</label>
                  <div>
                    <select
                      name=""
                      id=""
                      class="form-control-select"
                      v-model="shiftDetail.is_over_day"
                    >
                      <option value="0">Không</option>
                      <option value="1">Có</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 form-small">
                <div>
                  <label for="" class="form-group-label">Giờ nghỉ</label>
                  <div>
                    <hour-picker
                      v-model="shiftDetail.time_break_start"
                    ></hour-picker>
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">Kết thúc nghỉ</label>
                  <div>
                    <hour-picker
                      v-model="shiftDetail.time_break_end"
                    ></hour-picker>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-12 gap-2 form-small">
                <!-- <div class="col-span-6">
                  <label for="" class="form-group-label">Giờ linh hoạt</label>
                  <div>
                    <hour-picker
                      v-model="shiftDetail.time_change"
                    ></hour-picker>
                  </div>
                </div> -->
                <div class="col-span-6">
                  <label for="" class="form-group-label">Tổng số giờ</label>
                  <div>
                    <input
                      type="number"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="8"
                    />
                  </div>
                </div>
                <div class="col-span-6">
                  <label for="" class="form-group-label">Tổng công</label>
                  <div>
                    <input
                      type="number"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Nhập tên"
                      v-model="shiftDetail.number_work"
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 form-small">
                <div>
                  <label for="" class="form-group-label">Check in trước</label>
                  <div>
                    <hour-picker
                      v-model="shiftDetail.time_start_interval"
                    ></hour-picker>
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">Check in sau</label>
                  <div>
                    <hour-picker
                      v-model="shiftDetail.time_end_interval"
                    ></hour-picker>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
          <div v-show="isInfor == false">
            <h2
              @click="isInfor = !isInfor"
              class="cursor-pointer mt-2 form-group-label"
            >
              Mã nhân sự *, Mã chấm công, Mã hồ sơ, Họ và tên *, Ngày sinh, Giới
              tính, Nơi sinh,
            </h2>
          </div>
          <!-- End Thông tin chung -->
          <!-- Start Linh hoạt ca -->
          <h4
            class="form-section-title form-small cursor-pointer"
            @click="isFlexible = !isFlexible"
          >
            <span v-show="isFlexible == true">
              <i class="fas fa-chevron-down cursor-pointer"></i>
            </span>
            <span v-show="isFlexible == false"
              ><i class="fas fa-chevron-right cursor-pointer"></i
            ></span>
            Linh hoạt ca
          </h4>
          <Transition name="slide-fade">
            <div v-show="isFlexible == true">
              <div class="form-small flex justify-start items-center mt-1">
                <div class="check">
                  <input
                    id="flexible"
                    type="checkbox"
                    true-value="1"
                    false-value="0"
                    v-model="shiftDetail.is_multiple_interval"
                    @input="getValue($event)"
                  />
                  <label for=""></label>
                </div>
                <label
                  for="flexible"
                  class="cursor-pointer ml-1 form-group-label mt-[6px]"
                  >Áp dụng ca linh hoạt</label
                >
              </div>
              <div class="form-large">
                <div>
                  <label for="" class="form-group-label"
                    >Áp dụng giờ linh hoạt</label
                  >
                  <div>
                    <v-select
                      placeholder="Áp dụng"
                      label="title"
                      :options="DataFlexible"
                      :reduce="(data) => data.value"
                      :searchable="false"
                      v-model="shiftDetail.type_change_apply"
                    >
                      <template #option="{ title, sub }">
                        <div class="flex flex-col">
                          <div class="font-medium">{{ title }}</div>
                          <div
                            class="text-xs whitespace-normal"
                            v-html="sub"
                          ></div>
                        </div>
                      </template>
                    </v-select>
                  </div>
                </div>
              </div>
              <div class="form-large">
                <div>
                  <label for="" class="form-group-label"
                    >Áp dụng loại giờ linh hoạt</label
                  >
                  <div>
                    <v-select
                      placeholder="Áp dụng"
                      label="title"
                      :options="DataTypeFlex"
                      :reduce="(data) => data.value"
                      :searchable="false"
                      v-model="shiftDetail.type_change"
                    >
                      <template #option="{ title }">
                        <div class="flex flex-col">
                          <div class="font-medium">{{ title }}</div>
                        </div>
                      </template>
                    </v-select>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 form-small">
                <div>
                  <label for="" class="form-group-label"
                    >Thời gian linh động</label
                  >
                  <div>
                    <hour-picker
                      v-model="shiftDetail.time_change"
                    ></hour-picker>
                  </div>
                </div>
                <!-- <div>
                  <label for="" class="form-group-label">Giờ kết thúc</label>
                  <div>
                    <hour-picker v-model="shift.time_break_end"></hour-picker>
                  </div>
                </div> -->
              </div>
              <div class="form-small flex justify-start items-center mt-1">
                <div class="check">
                  <input
                    id="flexible"
                    type="checkbox"
                    true-value="1"
                    false-value="0"
                  />
                  <label for=""></label>
                </div>
                <label
                  for="flexible"
                  class="cursor-pointer ml-1 form-group-label mt-[6px]"
                  >Tính toán lại phép dựa theo giờ linh hoạt</label
                >
              </div>
            </div>
          </Transition>
          <div v-show="isFlexible == false">
            <h2
              @click="isFlexible = !isFlexible"
              class="cursor-pointer mt-2 form-group-label"
            >
              Linh hoạt ca
            </h2>
          </div>
          <!-- End Linh hoạt ca -->
          <!-- Start Tự động nhân biết ca -->
          <h4
            class="form-section-title form-small cursor-pointer"
            @click="isAuto = !isAuto"
          >
            <span v-show="isAuto == true">
              <i class="fas fa-chevron-down cursor-pointer"></i>
            </span>
            <span v-show="isAuto == false"
              ><i class="fas fa-chevron-right cursor-pointer"></i
            ></span>
            Tự động nhận biết ca và đối tượng
          </h4>
          <Transition name="slide-fade">
            <div v-show="isAuto == true">
              <div class="form-small flex justify-start items-center mt-1">
                <div class="check">
                  <input
                    id="autoDepart"
                    type="checkbox"
                    true-value="1"
                    false-value="0"
                    v-model="shift.auto_depart_position"
                  />
                  <label for=""></label>
                </div>
                <label
                  for="autoDepart"
                  class="cursor-pointer ml-1 form-group-label mt-1"
                  >Tự động nhận biết theo phòng ban, vị trí</label
                >
              </div>
              <Transition name="slide-fade">
                <div class="form-large" v-if="shift.auto_depart_position == 1">
                  <div class="grid grid-cols-12 gap-2">
                    <label class="form-group-label col-span-6">Phòng ban</label>
                    <label class="form-group-label col-span-3">Vị trí</label>
                    <label class="form-group-label col-span-3">Chức vụ</label>
                  </div>
                  <div
                    class="flex mt-1"
                    v-for="(item, index) in shift.arr_auto_depart_position"
                    :key="index"
                  >
                    <div class="grid grid-cols-12 gap-2 grow">
                      <div class="col-span-6">
                        <v-select
                          v-model="item.department"
                          placeholder="Tất cả"
                        ></v-select>
                      </div>
                      <div class="col-span-3">
                        <v-select
                          v-model="item.position"
                          placeholder="Tất cả"
                        ></v-select>
                      </div>
                      <div class="col-span-3">
                        <v-select
                          v-model="item.job_title"
                          placeholder="Tất cả"
                        ></v-select>
                      </div>
                    </div>
                    <div>
                      <i
                        class="fal fa-times icon-close"
                        @click="removeAutoDepartPosition(index)"
                        style="margin-top: 15px"
                      ></i>
                    </div>
                  </div>
                  <div class="my-2">
                    <i
                      class="fal fa-plus-circle icon-plus"
                      @click="createAutoDepartPosition()"
                    ></i>
                  </div>
                </div>
              </Transition>
              <div class="form-small flex justify-start items-center mt-1">
                <div class="check">
                  <input
                    id="autoHoliday"
                    type="checkbox"
                    true-value="1"
                    false-value="0"
                  />
                  <label for=""></label>
                </div>
                <label
                  for="autoHoliday"
                  class="cursor-pointer ml-1 form-group-label mt-1"
                  >Ca tự động áp dụng cho ngày nghỉ lễ</label
                >
              </div>
              <div class="form-small flex justify-start items-center mt-1">
                <div class="check">
                  <input
                    id="check_is_auto_shift"
                    type="checkbox"
                    v-model="shiftDetail.is_auto_shift"
                    true-value="1"
                    false-value="0"
                  />
                  <label for="check_is_auto_shift"></label>
                </div>
                <label
                  for="check"
                  class="cursor-pointer ml-1 form-group-label mt-1"
                  >Chấm công tự động</label
                >
              </div>
              <div class="form-small flex justify-start items-center mt-1">
                <div class="check">
                  <input
                    id="autoCheckPosition"
                    type="checkbox"
                    v-model="shift.is_checkinout_auto"
                    true-value="1"
                    false-value="0"
                  />
                  <label for=""></label>
                </div>
                <label
                  for="autoCheckPosition"
                  class="cursor-pointer ml-1 form-group-label mt-1"
                  >Checkout tự động áp dụng cho vị trí</label
                >
              </div>
              <Transition name="slide-fade">
                <div
                  class="form-small"
                  v-if="shift.auto_checkout_position == 1"
                >
                  <div>
                    <label for="" class="form-group-label">Vị trí</label>
                    <div>
                      <input-position></input-position>
                    </div>
                  </div>
                </div>
              </Transition>
              <div class="form-large">
                <div>
                  <label for="" class="form-group-label"
                    >Đối tượng áp dụng</label
                  >
                  <div>
                    <input-department :isMultiple="true"></input-department>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
          <div v-show="isAuto == false">
            <h2
              @click="isAuto = !isAuto"
              class="cursor-pointer mt-2 form-group-label"
            >
              Tự động nhận biết ca và đối tượng
            </h2>
          </div>
          <!-- End Tự động nhận biết ca -->
          <!-- Start cài đặt giữa ca -->
          <h4
            class="form-section-title form-small cursor-pointer"
            @click="isSetting = !isSetting"
          >
            <span v-show="isSetting == true">
              <i class="fas fa-chevron-down cursor-pointer"></i>
            </span>
            <span v-show="isSetting == false"
              ><i class="fas fa-chevron-right cursor-pointer"></i
            ></span>
            Cài đặt giữa ca
          </h4>
          <Transition name="slide-fade">
            <div v-show="isSetting == true">
              <div class="form-small flex justify-start items-center mt-1">
                <div class="check">
                  <input
                    id="check2"
                    type="checkbox"
                    true-value="1"
                    false-value="0"
                  />
                  <label for=""></label>
                </div>
                <label
                  for="check2"
                  class="cursor-pointer ml-1 form-group-label mt-1"
                  >Bắt buộc chấm giữa ca</label
                >
              </div>
              <div class="form-small">
                <div>
                  <label for="" class="form-group-label"
                    >Giờ làm thêm giữa ca</label
                  >
                  <div class="flex items-center">
                    <div class="flex items-center">
                      <input
                        id="default-radio-1"
                        type="radio"
                        value=""
                        name="default-radio"
                        class="format-radio"
                      />
                      <label
                        for="default-radio-1"
                        class="form-group-label ml-1 mt-1 cursor-pointer"
                        >Không chấp nhận</label
                      >
                    </div>
                    <div class="flex items-center ml-4">
                      <input
                        id="default-radio-2"
                        type="radio"
                        value=""
                        name="default-radio"
                        class="format-radio"
                      />
                      <label
                        for="default-radio-2"
                        class="form-group-label ml-1 mt-1 cursor-pointer"
                        >Tự động tính</label
                      >
                    </div>
                    <div class="flex items-center ml-4">
                      <input
                        id="default-radio-3"
                        type="radio"
                        value=""
                        name="default-radio"
                        class="format-radio"
                      />
                      <label
                        for="default-radio-3"
                        class="form-group-label ml-1 mt-1 cursor-pointer"
                        >Tính theo đơn làm thêm</label
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-small flex justify-start items-center mt-1">
                <div class="check">
                  <input
                    id="check3"
                    type="checkbox"
                    true-value="1"
                    false-value="0"
                    v-model="shift.late_early"
                  />
                  <label for=""></label>
                </div>
                <label
                  for="check3"
                  class="cursor-pointer ml-1 form-group-label mt-1"
                  >Tính thời gian đi muộn, về sớm giữa ca</label
                >
              </div>
              <div class="grid grid-cols-2 gap-2 form-small">
                <div :class="{ disabledDiv: shift.late_early == 0 }">
                  <label for="" class="form-group-label"
                    >Check out cuối ca đầu</label
                  >
                  <div>
                    <hour-picker v-model="time"></hour-picker>
                  </div>
                </div>
                <div :class="{ disabledDiv: shift.late_early == 0 }">
                  <label for="" class="form-group-label"
                    >Check in đầu ca sau</label
                  >
                  <div>
                    <hour-picker v-model="time"></hour-picker>
                  </div>
                </div>
              </div>
              <div class="form-small">
                <div>
                  <label for="" class="form-group-label">Ghi chú</label>
                  <div>
                    <textarea
                      name=""
                      id=""
                      cols="10"
                      rows="5"
                      class="form-control-input"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
          <div v-show="isSetting == false">
            <h2
              @click="isSetting = !isSetting"
              class="cursor-pointer mt-2 form-group-label"
            >
              Mã nhân sự *, Mã chấm công, Mã hồ sơ, Họ và tên *, Ngày sinh, Giới
              tính, Nơi sinh,
            </h2>
          </div>
          <!-- End cài đặt giữa ca -->
          <h4
            class="form-section-title form-small cursor-pointer"
            @click="isGPS = !isGPS"
          >
            <span v-show="isGPS == true">
              <i class="fas fa-chevron-down cursor-pointer"></i>
            </span>
            <span v-show="isGPS == false"
              ><i class="fas fa-chevron-right cursor-pointer"></i
            ></span>
            Chấm công qua định vị GPS
          </h4>
          <Transition name="slide-fade">
            <div v-show="isGPS == true">
              <div class="form-large">
                <div>
                  <label for="" class="form-group-label">Vị trí định vị</label>
                  <div>
                    <selector-gps-view
                      :Placeholder="'Chọn vị trí định vị'"
                      :listOption="listGPSLocation"
                      :listFinal="shiftDetail.gps_location_ids"
                      :searchOption="loadGpsLocation"
                      :listSearch="listSearch"
                    >
                      <template v-slot:selectedOption="{ item }">
                        <div class="text-left">
                          <div class="flex">
                            <div>{{ item.title }}</div>
                          </div>
                        </div>
                      </template>
                      <template v-slot:selected="{ item }">
                        <div class="flex">
                          <div>{{ item.title }}</div>
                        </div>
                      </template>
                    </selector-gps-view>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
          <div v-show="isGPS == false">
            <h2
              @click="isGPS = !isGPS"
              class="cursor-pointer mt-2 form-group-label"
            >
              Chấm công qua định vị GPS
            </h2>
          </div>
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="updateShift()">Cập nhật</button>
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
import "@/assets/checkBox.css";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarSettingTimekeep from "@/components/sidebar/SidebarSettingTimekeep.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import hourPicker from "@/components/datePicker/hourPicker.vue";
import SelectorGpsView from "@/components/selector/SelectorGpsView.vue";
import { reactive, ref } from "@vue/reactivity";
import { useToast } from "vue-toastification";
import InputPosition from "@/components/constant/InputPosition.vue";
import InputDepartment from "@/components/constant/InputDepartment.vue";
import { useRoute, useRouter } from "vue-router";
import { useShifts } from "@/store/modules/settingTimekeep/shifts";
import { useGpsLocation } from "@/store/modules/settingTimekeep/gpslocation";
import { storeToRefs } from "pinia";
import _ from "lodash";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  components: {
    PersonLayout,
    SidebarSettingTimekeep,
    NavbarSocial,
    hourPicker,
    SelectorGpsView,
    InputPosition,
    InputDepartment,
  },
  data() {
    return {
      isInfor: true,
      isSetting: true,
      isFlexible: true,
      isAuto: true,
      isGPS: true,
      TypeShift: [
        { title: "Hành chính", value: "HC" },
        { title: "Ca kíp", value: "CC" },
      ],
      // DataFlexible: [
      //   {
      //     title: "Không áp dụng",
      //     value: "0",
      //     sub: "Khi không áp dung linh hoạt thì giờ checkin không thay đổi",
      //   },
      //   {
      //     title: "Áp dụng cho giờ vào và giờ nghỉ",
      //     value: "1",
      //     sub: "Linhh hoạt sau 30 phút, ban đến lúc 08:20 thì giờ ca làm viêc sẽ chuyển thành 08:20 - 17:50 nghỉ giữa giờ là 12:20 - 13:50",
      //   },
      //   {
      //     title: "Chỉ áp dụng cho giờ vào của ca",
      //     value: "2",
      //     sub: "Linh hoạt sau 30 phút, bạn đến lúc 08:20 thì giờ ca làm việc sẽ chuyển thành 08:20 - 17:50. Linh hoạt trước 30 phút, bạn đến lúc 07:50 thì giờ ca làm việc sẽ chuyển thành 07:50 - 17:20",
      //   },
      // ],
    };
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const router = useRouter();
    const route = useRoute();
    const isLoading = ref(true);
    const isLoadingReload = ref(false);
    const isOpenDetail = ref(false);
    const isOpenUpdate = ref(false);
    const isActive = ref(false);
    const checkedAll = ref(false);
    const checkShift = ref([]);
    const isOpenConfirm = ref(false);
    const listSearch = ref([]);
    const time = ref("00:00");
    const tk_shift = useShifts();
    const gps = useGpsLocation();
    const { listGPSLocation } = storeToRefs(gps);
    const { listShifts, shiftDetail } = storeToRefs(tk_shift);
    const EndTimeLoading = () => {
      isLoading.value = false;
      tk_shift.ShowDetailShiftAction(route.params.idShift);
    };
    const EndLoad = () => {
      isLoading.value = false;
    };
    const getValue = (e) => {
      console.log(e.target.checked);
      if (e.target.checked == true) {
        shift.is_multiple_interval = "1";
      } else {
        shift.is_multiple_interval = "0";
      }
    };
    const DataTypeFlex = reactive([
      {
        title: "Sau",
        value: "AFTER",
      },
      {
        title: "Trước",
        value: "BEFORE",
      },
      {
        title: "Cả trước và sau",
        value: "ALL",
      },
    ]);
    const DataFlexible = reactive([
      {
        title: "Áp dụng cho giờ vào và giờ nghỉ",
        value: "IN_BREAK",
        sub: "Ví dụ ca làm việc từ 08:00 - 17:30, nghỉ giữa giờ 12:00 - 13:30</br> Linh hoạt sau 30 phút, bạn đến lúc 08:20 thì giờ ca làm viêc sẽ chuyển thành 08:20 - 17:50 nghỉ giữa giờ là 12:20 - 13:50",
      },
      {
        title: "Chỉ áp dụng cho giờ vào của ca",
        value: "IN_FIRST",
        sub: "Ví dụ ca làm việc từ 08:00 - 17:30</br>Linh hoạt sau 30 phút, bạn đến lúc 08:20 thì giờ ca làm việc sẽ chuyển thành 08:20 - 17:50</br> Linh hoạt trước 30 phút, bạn đến lúc 07:50 thì giờ ca làm việc sẽ chuyển thành 07:50 - 17:20",
      },
    ]);
    const listDepartments = computed(
      () => store.getters["departments/getAllDepartmentActive"]
    );
    if (listDepartments.value?.length == 0) {
      store.dispatch("departments/getAllDepartmentsAction");
    }
    if (listShifts.value?.length == 0) {
      tk_shift.GetAllShiftsEndTimeLoadingAction({
        EndTimeLoading,
      });
    } else {
      EndTimeLoading();
    }
    gps.GetAllGPSLocationAction();
    if (isLoading.value == false) {
      shiftDetail.value.gps_location_ids = JSON.parse(
        shiftDetail.value.gps_location_ids
      );
      for (let i = 0; i < shiftDetail.value.gps_location_ids?.length; i++) {
        let key = listGPSLocation.value.find(
          (item) => item.ID == shiftDetail.value.gps_location_ids[i]
        );
        if (key) {
          listSearch.value.push(key);
        }
      }
    }
    const shift = reactive({
      type: null,
      title: "",
      code: "",
      time_start: "00:00",
      time_end: "00:00",
      is_over_day: 0,
      time_change: "00:00",
      time_break_start: "00:00",
      time_break_end: "00:00",
      position_ids: null,
      number_work: 1,
      is_checkinout_auto: 0,
      is_auto_shift: 0,
      time_start_interval: "00:00",
      time_end_interval: "00:00",
      gps_location_ids: [],
      auto_checkout_position: 0,
      is_multiple_interval: "0",
      auto_depart_position: 0,
      arr_auto_depart_position: [
        {
          department: null,
          position: null,
          job_title: null,
        },
      ],
      late_early: 0,
    });
    const createAutoDepartPosition = () => {
      const data = {
        department: null,
        position: null,
        job_title: null,
      };
      shift.arr_auto_depart_position.push(data);
    };
    const removeAutoDepartPosition = (index) => {
      shift.arr_auto_depart_position.splice(index, 1);
    };
    const loadGpsLocation = _.debounce((e) => {
      gps.searchGPSAction({ search: e.target.value, EndTimeLoading: EndLoad });
    }, 300);
    const updateShift = () => {
      if (shiftDetail.value.title.length > 0) {
        tk_shift.updateShiftAction({
          data: shiftDetail.value,
          toast,
          router,
        });
      } else {
        toast.error("Vui lòng nhập tên ca làm viêc");
      }
    };
    return {
      listSearch,
      time,
      checkShift,
      checkedAll,
      listShifts,
      shift,
      isOpenDetail,
      isOpenUpdate,
      isActive,
      shiftDetail,
      listGPSLocation,
      isLoading,
      isOpenConfirm,
      loadGpsLocation,
      listDepartments,
      EndTimeLoading,
      EndLoad,
      isLoadingReload,
      updateShift,
      DataTypeFlex,
      DataFlexible,
      getValue,
      createAutoDepartPosition,
      removeAutoDepartPosition,
    };
  },
};
</script>

<style></style>
