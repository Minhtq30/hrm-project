<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-timekeep></sidebar-timekeep>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center">
            <button-create-timekeep></button-create-timekeep>
            <p class="longText">Tạo mới ngày nghỉ</p>
          </div>
        </div></navbar-social
      >
    </template>
    <Transition duration="550" name="nested">
      <div
        class="w-full h-full text-left px-4 py-2 form-plus-over"
        v-if="isLoading == false"
      >
        <div title="Thông tin chung" class="outer">
          <h4
            class="form-section-title form-small cursor-pointer"
            @click="isInfor = !isInfor"
          >
            <span v-if="isInfor"
              ><i class="fas fa-chevron-down cursor-pointer"></i
            ></span>
            <span v-else
              ><i class="fas fa-chevron-right cursor-pointer"></i
            ></span>
            Thông tin chung
          </h4>
          <Transition name="slide-up">
            <div v-show="isInfor == true" class="mt-2">
              <div class="form-small">
                <label for="" class="form-group-label"
                  >Lý do<span class="text-red-600">*</span></label
                >
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Lý do nghỉ"
                    v-model="attendanceDesist.reason"
                  />
                </div>
              </div>
              <div class="form-small">
                <label for="" class="form-group-label"
                  >Loại nghỉ<span class="text-red-600">*</span></label
                >
                <div>
                  <v-select
                    label="title"
                    :options="dataTypeHoliday"
                    :reduce="(day) => day.value"
                    placeholder="Chọn loại nghỉ"
                    v-model="attendanceDesist.typeHoliday"
                    :searchable="false"
                  ></v-select>
                </div>
              </div>
            </div>
          </Transition>
          <div v-show="isInfor == false">
            <h2
              @click="isInfor = !isInfor"
              class="cursor-pointer form-group-label"
            >
              Lý do *, Loại nghỉ *
            </h2>
          </div>
        </div>
        <div title="Danh sách ngày nghỉ" class="inner">
          <h4
            class="form-section-title form-small cursor-pointer"
            @click="isList = !isList"
          >
            <span v-if="isList"
              ><i class="fas fa-chevron-down cursor-pointer"></i
            ></span>
            <span v-else
              ><i class="fas fa-chevron-right cursor-pointer"></i
            ></span>
            Danh sách ngày nghỉ
          </h4>
          <Transition name="slide-up">
            <div v-show="isList == true" class="mt-2">
              <div v-if="attendanceDesist.typeHoliday == 0">
                <div class="form-large-plus grid grid-cols-11 gap-2">
                  <div class="col-span-2">
                    <label for="" class="form-group-label"
                      >Ngày nghỉ<span class="text-red-600">*</span></label
                    >
                  </div>
                  <div class="col-span-1">
                    <label for="" class="form-group-label">Tính công</label>
                  </div>
                  <div class="col-span-2">
                    <label for="" class="form-group-label">Lặp</label>
                  </div>
                  <div class="col-span-3">
                    <label for="" class="form-group-label">Phòng ban</label>
                  </div>
                  <div class="col-span-3">
                    <label for="" class="form-group-label">Vị trí</label>
                  </div>
                </div>
                <div
                  class="flex items-center"
                  v-for="(item, index) in attendanceDesist.listHoliday"
                  :key="index"
                >
                  <div class="form-large-plus grid grid-cols-11 gap-2">
                    <div class="col-span-2">
                      <date-picker v-model="item.dateHoliday"></date-picker>
                    </div>
                    <div class="col-span-1">
                      <select
                        name=""
                        id=""
                        class="form-control-select"
                        v-model="item.has_attendance"
                        disabled
                      >
                        <option value="1">Có</option>
                        <option value="0">Không</option>
                      </select>
                    </div>
                    <div class="col-span-2">
                      <select
                        name=""
                        id=""
                        class="form-control-select"
                        v-model="item.isRepeat"
                      >
                        <option value="1">Hàng năm</option>
                        <option value="0">Không lặp</option>
                      </select>
                    </div>
                    <div class="col-span-3">
                      <v-select
                        label="title"
                        :options="listDepartments"
                        :reduce="(depart) => depart.ID"
                        placeholder="Tất cả"
                        v-model="item.departments"
                        multiple
                      ></v-select>
                    </div>
                    <div class="col-span-3">
                      <v-select
                        label="title"
                        :options="listPositions"
                        :reduce="(position) => position.ID"
                        placeholder="Tất cả"
                        v-model="item.positions"
                        multiple
                      ></v-select>
                    </div>
                  </div>
                  <div>
                    <span
                      ><i
                        class="fal fa-times icon-close"
                        style="margin-top: -10px"
                        @click="RemoveHoliday(index)"
                      ></i
                    ></span>
                  </div>
                </div>
                <div>
                  <span
                    ><i
                      class="fal fa-plus-circle icon-plus"
                      @click="AddHoliday()"
                    ></i
                  ></span>
                </div>
              </div>
              <div v-else-if="attendanceDesist.typeHoliday == 1">
                <div class="form-large grid grid-cols-10 gap-2">
                  <div class="col-span-2">
                    <label for="" class="form-group-label">Ngày nghỉ</label>
                  </div>
                  <div class="col-span-2">
                    <label for="" class="form-group-label">Tính công</label>
                  </div>
                  <div class="col-span-3">
                    <label for="" class="form-group-label">Phòng ban</label>
                  </div>
                  <div class="col-span-3">
                    <label for="" class="form-group-label">Vị trí</label>
                  </div>
                </div>
                <div
                  class="flex items-center"
                  v-for="(item, index) in attendanceDesist.listHoliday"
                  :key="index"
                >
                  <div class="form-large grid grid-cols-10 gap-2">
                    <div class="col-span-2">
                      <date-picker v-model="item.dateHoliday"></date-picker>
                    </div>
                    <div class="col-span-2">
                      <select
                        name=""
                        id=""
                        class="form-control-select"
                        v-model="item.has_attendance"
                      >
                        <option value="1">Có</option>
                        <option value="0">Không</option>
                      </select>
                    </div>
                    <div class="col-span-3">
                      <v-select
                        label="title"
                        :options="listDepartments"
                        :reduce="(depart) => depart.ID"
                        placeholder="Tất cả"
                        v-model="item.departments"
                        multiple
                      ></v-select>
                    </div>
                    <div class="col-span-3">
                      <v-select
                        label="title"
                        :options="listPositions"
                        :reduce="(position) => position.ID"
                        placeholder="Chọn vị trí"
                        v-model="item.positions"
                        multiple
                      ></v-select>
                    </div>
                  </div>
                  <div>
                    <span
                      ><i
                        class="fal fa-times icon-close"
                        style="margin-top: 0px"
                        @click="RemoveHoliday(index)"
                      ></i
                    ></span>
                  </div>
                </div>
                <div>
                  <span
                    ><i
                      class="fal fa-plus-circle icon-plus"
                      @click="AddHoliday()"
                    ></i
                  ></span>
                </div>
              </div>
              <div v-else-if="attendanceDesist.typeHoliday == 2">
                <div class="form-large-plus grid grid-cols-12 gap-2">
                  <div class="col-span-2">
                    <label for="" class="form-group-label">Ngày nghỉ</label>
                  </div>
                  <div>
                    <label for="" class="form-group-label">Từ giờ</label>
                  </div>
                  <div>
                    <label for="" class="form-group-label">Đến giờ</label>
                  </div>
                  <div class="col-span-2">
                    <label for="" class="form-group-label">Tính công</label>
                  </div>
                  <div class="col-span-3">
                    <label for="" class="form-group-label">Phòng ban</label>
                  </div>
                  <div class="col-span-3">
                    <label for="" class="form-group-label">Vị trí</label>
                  </div>
                </div>
                <div
                  class="flex items-center"
                  v-for="(item, index) in attendanceDesist.listHoliday"
                  :key="index"
                >
                  <div class="form-large-plus grid grid-cols-12 gap-2">
                    <div class="col-span-2">
                      <date-picker v-model="item.dateHoliday"></date-picker>
                    </div>
                    <div>
                      <hour-picker v-model="item.time_start"></hour-picker>
                    </div>
                    <div>
                      <hour-picker v-model="item.time_start"></hour-picker>
                    </div>
                    <div class="col-span-2">
                      <select
                        name=""
                        id=""
                        class="form-control-select"
                        v-model="item.has_attendance"
                      >
                        <option value="1">Có</option>
                        <option value="0">Không</option>
                      </select>
                    </div>
                    <div class="col-span-3">
                      <v-select
                        label="title"
                        :options="listDepartments"
                        :reduce="(depart) => depart.ID"
                        placeholder="Tất cả"
                        v-model="item.departments"
                        multiple
                      ></v-select>
                    </div>
                    <div class="col-span-3">
                      <v-select
                        label="title"
                        :options="listPositions"
                        :reduce="(position) => position.ID"
                        placeholder="Tất cả"
                        v-model="item.positions"
                        multiple
                      ></v-select>
                    </div>
                  </div>
                  <div>
                    <span
                      ><i
                        class="fal fa-times icon-close"
                        style="margin-top: 0px"
                        @click="RemoveHoliday(index)"
                      ></i
                    ></span>
                  </div>
                </div>
                <div>
                  <span
                    ><i
                      class="fal fa-plus-circle icon-plus"
                      @click="AddHoliday()"
                    ></i
                  ></span>
                </div>
              </div>
              <div v-else>
                <div class="form-group-label text-red-500">
                  Vui lòng chọn loại nghỉ
                </div>
              </div>
            </div>
          </Transition>
          <div v-show="isList == false">
            <h2
              @click="isList = !isList"
              class="cursor-pointer form-group-label"
            >
              Chi tiết ngày nghỉ,..
            </h2>
          </div>
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="createDateHoliday()">
            Cập nhật
          </button>
          <button
            class="button-close-modal"
            @click="this.$router.push('/timekeep-attendance-desist/holiday')"
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </template>
  </person-layout>
  <loading-overlay :isLoading="isLoading"></loading-overlay>
</template>

<script>
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarTimekeep from "@/components/sidebar/SidebarTimekeep.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateTimekeep from "@/views/timekeep/ButtonCreateTimekeep.vue";
import datePicker from "@/components/datePicker/datePicker.vue";
import hourPicker from "@/components/datePicker/hourPicker.vue";
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  components: {
    PersonLayout,
    SidebarTimekeep,
    NavbarSocial,
    ButtonCreateTimekeep,
    hourPicker,
    datePicker,
  },
  data() {
    return {
      isInfor: true,
      isList: true,
      dataTypeHoliday: [
        {
          value: "0",
          title: "Nghỉ lễ",
        },
        {
          value: "1",
          title: "Nghỉ sự kiện, nghỉ bù",
        },
        {
          value: "2",
          title: "Nghỉ bất thường",
        },
      ],
    };
  },
  setup() {
    const store = useStore();
    const isLoading = ref(true);
    store.dispatch("departments/getAllDepartmentsAction");
    store.dispatch("positions/getAllPositionsAction", 500);
    const listPositions = computed(
      () => store.getters["positions/getAllPositionsActive"]
    );
    const listDepartments = computed(
      () => store.state.departments.listDepartments
    );
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
    const attendanceDesist = reactive({
      reason: "",
      typeHoliday: "0",
      listHoliday: [
        {
          dateHoliday: "",
          has_attendance: "1",
          time_start: "00:00",
          time_end: "00:00",
          isRepeat: "0",
          departments: [],
          positions: [],
        },
      ],
    });
    const RemoveHoliday = (index) => {
      attendanceDesist.listHoliday.splice(index, 1);
    };
    const AddHoliday = () => {
      const data = {
        dateHoliday: "",
        has_attendance: "1",
        time_start: "00:00",
        time_end: "00:00",
        isRepeat: "0",
        departments: [],
        positions: [],
      };
      attendanceDesist.listHoliday.push(data);
    };
    const createDateHoliday = () => {
      const data = {
        reason: attendanceDesist.reason,
        typeHoliday: attendanceDesist.typeHoliday,
        listHoliday: attendanceDesist.listHoliday,
      };
      console.log(data);
    };
    return {
      attendanceDesist,
      isLoading,
      listPositions,
      listDepartments,
      RemoveHoliday,
      AddHoliday,
      createDateHoliday,
    };
  },
};
</script>

<style></style>
