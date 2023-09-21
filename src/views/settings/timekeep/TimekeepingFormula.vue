<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-setting-timekeep></sidebar-setting-timekeep>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <create-person>
            <div class="flex flex-col text-left">
              <div class="uppercase font-medium">chấm công</div>
              <div class="text-xs">Công thức chấm công</div>
            </div>
          </create-person>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature
        ><div>
          <tab-nav
            :tabs="[
              'Cài đặt chung',
              'TK bảng ca',
              'TK bảng ngày',
              'TK bảng đơn làm thêm',
              'TK bảng đơn côn tác',
              'TK bảng đơn vắng mặt',
              'TK bảng đơn tháng',
              'TK bảng chốt vân tay',
              'Tiền phạt',
            ]"
            :selected="selected"
            @selected="setSelected"
          >
          </tab-nav></div
      ></nav-feature>
    </template>
    <Transition duration="550" name="nested">
      <div class="w-full h-full" v-if="isLoading == false">
        <Transition name="slide-fade">
          <the-tab :isSelected="selected === 'Cài đặt chung'" class="h-full">
            <div
              class="text-left px-4 w-full form-plus-over h-full format-scroll"
            >
              <div class="mt-2" title="Công thức chấm công">
                <h4 class="form-section-title form-small">
                  <span
                    v-show="isFormula == true"
                    @click="isFormula = !isFormula"
                  >
                    <i class="fas fa-chevron-down cursor-pointer"></i>
                  </span>
                  <span
                    @click="isFormula = !isFormula"
                    v-show="isFormula == false"
                    ><i class="fas fa-chevron-right cursor-pointer"></i
                  ></span>
                  Công thức chấm công
                </h4>
                <Transition name="slide-fade">
                  <div v-show="isFormula == true">
                    <div class="form-supper-plus flex items-center">
                      <div class="form-x-small px-1">
                        <label for="" class="form-group-label">Bảng</label>
                      </div>
                      <div class="form-x-small px-1">
                        <label for="" class="form-group-label">Thay đổi</label>
                      </div>
                      <div class="form-x-small px-1">
                        <label for="" class="form-group-label">Tên cột/ô</label>
                      </div>
                      <div class="form-x-small px-1">
                        <label for="" class="form-group-label">Từ khóa</label>
                      </div>
                      <div class="form-extra-small px-1">
                        <label for="" class="form-group-label"
                          >Công thức/giá trị</label
                        >
                      </div>
                      <div class="form-x-small px-1">
                        <label for="" class="form-group-label">Kết quả</label>
                      </div>
                      <div class="form-extra-small px-1">
                        <label for="" class="form-group-label">Mô tả</label>
                      </div>
                    </div>
                    <div
                      class="form-supper-plus flex items-center -mt-2"
                      v-for="(item, index) in TimeekeepFormula"
                      :key="index"
                    >
                      <div class="form-x-small px-1">
                        <v-select v-model="item.key1"></v-select>
                      </div>
                      <div class="form-x-small px-1">
                        <v-select v-model="item.key2"></v-select>
                      </div>
                      <div class="form-x-small px-1">
                        <input
                          type="text"
                          class="form-control-input"
                          v-model="item.key3"
                        />
                      </div>
                      <div class="form-x-small px-1">
                        <input
                          type="text"
                          class="form-control-input"
                          v-model="item.key4"
                        />
                      </div>
                      <div class="form-extra-small px-1">
                        <input
                          type="text"
                          class="form-control-input"
                          v-model="item.key5"
                        />
                      </div>
                      <div class="form-x-small px-1">
                        <input
                          type="text"
                          class="form-control-input"
                          v-model="item.key6"
                        />
                      </div>
                      <div class="form-extra-small px-1">
                        <input
                          type="text"
                          class="form-control-input"
                          v-model="item.key7"
                        />
                      </div>
                      <div>
                        <i
                          class="fal fa-times icon-close"
                          @click="removeTimekeepFormula(index)"
                          style="margin-top: 0px"
                        ></i>
                      </div>
                    </div>
                    <div class="my-2">
                      <i
                        class="fal fa-plus-circle icon-plus"
                        @click="createTimekeepFormula()"
                      ></i>
                    </div>
                  </div>
                </Transition>
                <Transition name="slide-fade">
                  <div v-show="isFormula == false">
                    <h2
                      @click="isFormula = !isFormula"
                      class="cursor-pointer mt-2 form-group-label"
                    >
                      Bảng, Thay đổi, Tên cột/ô, Từ khóa, Công thức/ giá trị,
                      Kết quả, Mô tả
                    </h2>
                  </div>
                </Transition>
              </div>
              <div class="mt-2" title="Công chuẩn">
                <h4 class="form-section-title form-small">
                  <span
                    v-show="isStandard == true"
                    @click="isStandard = !isStandard"
                  >
                    <i class="fas fa-chevron-down cursor-pointer"></i>
                  </span>
                  <span
                    @click="isStandard = !isStandard"
                    v-show="isStandard == false"
                    ><i class="fas fa-chevron-right cursor-pointer"></i
                  ></span>
                  Công chuẩn
                </h4>
                <Transition name="slide-fade">
                  <div v-show="isStandard == true">
                    <div class="form-plus flex items-center">
                      <div class="form-extra-small px-1">
                        <label for="" class="form-group-label">Cách tính</label>
                      </div>
                      <div class="form-extra-small px-1">
                        <label for="" class="form-group-label">Giá trị</label>
                      </div>
                      <div class="form-extra-small px-1">
                        <label for="" class="form-group-label">Phòng ban</label>
                      </div>
                      <div class="form-extra-small px-1">
                        <label for="" class="form-group-label">Vị trí</label>
                      </div>
                    </div>
                    <div
                      class="form-plus flex items-center -mt-2"
                      v-for="(standard, index) in StandardWork"
                      :key="index"
                    >
                      <div class="form-extra-small px-1">
                        <v-select
                          v-model="standard.setting_type"
                          placeholder="Chọn cách tính"
                          title="Cách tính công chuẩn"
                        ></v-select>
                      </div>
                      <div class="form-extra-small px-1">
                        <input
                          type="text"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập công thức"
                          v-model="standard.formula_value"
                          title="Công thức tính công chuẩn"
                        />
                      </div>
                      <div class="form-extra-small px-1">
                        <v-select
                          label="title"
                          :options="listDepartments"
                          :reduce="(department) => department.ID"
                          v-model="standard.department_ids"
                          placeholder="Tất cả"
                          title="Phòng ban"
                          multiple
                        ></v-select>
                      </div>
                      <div class="form-extra-small px-1">
                        <v-select
                          label="title"
                          :options="listPositions"
                          :reduce="(position) => position.ID"
                          v-model="standard.position_ids"
                          placeholder="Tất cả"
                          title="Vị trí"
                          multiple
                        ></v-select>
                      </div>
                      <div>
                        <i
                          class="fal fa-times icon-close"
                          @click="removeFormula(index)"
                          style="margin-top: 0px"
                        ></i>
                      </div>
                    </div>
                    <div class="my-2">
                      <i
                        class="fal fa-plus-circle icon-plus"
                        @click="createFormula()"
                      ></i>
                    </div>
                  </div>
                </Transition>
                <Transition name="slide-fade">
                  <div v-show="isStandard == false">
                    <h2
                      @click="isStandard = !isStandard"
                      class="cursor-pointer mt-2 form-group-label"
                    >
                      Cách tính, Giá trị, Phòng ban, Vị trí
                    </h2>
                  </div>
                </Transition>
              </div>
            </div>
          </the-tab>
        </Transition>
        <Transition name="slide-fade">
          <the-tab :isSelected="selected === 'Tiền phạt'" class="h-full">
            <div class="text-left px-2 py-4">
              <div class="form-small">
                <div>
                  <label for="" class="form-group-label"
                    >Tiền phạt đi muộn</label
                  >
                  <div>
                    <input
                      type="number"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Nhập số tiền"
                    />
                  </div>
                </div>
              </div>
              <div class="form-small">
                <div>
                  <label for="" class="form-group-label"
                    >Tiền phạt về sớm</label
                  >
                  <div>
                    <input
                      type="number"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Nhập số tiền"
                    />
                  </div>
                </div>
              </div>
            </div>
          </the-tab>
        </Transition>
      </div>
    </Transition>
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button
            v-if="selected === 'Cài đặt chung'"
            class="button-modal"
            @click="UpdateTimekeepWorkStandard()"
          >
            Cập nhật
          </button>
          <button v-if="selected === 'Tiền phạt'" class="button-modal">
            Cập nhật
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
import CreatePerson from "@/components/CreatePerson.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import TabNav from "@/components/tab/TabNav.vue";
import TheTab from "@/components/tab/TheTab.vue";
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { useToast } from "vue-toastification";
export default {
  components: {
    PersonLayout,
    SidebarSettingTimekeep,
    NavbarSocial,
    CreatePerson,
    NavFeature,
    TabNav,
    TheTab,
  },
  setup() {
    const store = useStore();
    const isLoading = ref(true);
    const isFormula = ref(true);
    const isStandard = ref(true);
    const toast = useToast();
    let date = new Date();
    const selected = ref("Cài đặt chung");
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("departments/getAllDepartmentsAction");
    store.dispatch("positions/getAllPositionsAction", 500);
    store.dispatch("timekeepWorkStandard/GetTimekeepWorkStandardAction", {
      EndTimeLoading,
    });
    const TimeekeepFormula = reactive([
      {
        key1: null,
        key2: null,
        key3: null,
        key4: null,
        key5: null,
        key6: null,
        key7: null,
      },
    ]);
    const listPositions = computed(
      () => store.getters["positions/getAllPositionsActive"]
    );
    const listDepartments = computed(
      () => store.state.departments.listDepartments
    );
    const StandardWork = computed(
      () => store.state.timekeepWorkStandard.StandardWork.value
    );
    const setSelected = (tab) => {
      selected.value = tab;
    };
    const removeFormula = (index) => {
      StandardWork.value.splice(index, 1);
    };
    const createFormula = () => {
      const data = {
        department_ids: null,
        position_ids: null,
        setting_type: null,
        formula_value: null,
      };
      StandardWork.value.push(data);
    };
    const removeTimekeepFormula = (index) => {
      TimeekeepFormula.splice(index, 1);
    };
    const createTimekeepFormula = () => {
      const data = {
        key1: null,
        key2: null,
        key3: null,
        key4: null,
        key5: null,
        key6: null,
        key7: null,
      };
      TimeekeepFormula.push(data);
    };
    const UpdateTimekeepWorkStandard = () => {
      const data = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        detail: StandardWork.value,
      };
      store.dispatch("timekeepWorkStandard/UpdateTimekeepWorkStandardAction", {
        data,
        toast,
        EndTimeLoading,
      });
    };
    return {
      selected,
      date,
      isLoading,
      isFormula,
      isStandard,
      listPositions,
      listDepartments,
      StandardWork,
      TimeekeepFormula,
      setSelected,
      removeFormula,
      createFormula,
      UpdateTimekeepWorkStandard,
      EndTimeLoading,
      removeTimekeepFormula,
      createTimekeepFormula,
    };
  },
};
</script>
