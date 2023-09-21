<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-personnel></sidebar-personnel>
    </template>
    <template v-slot:navbar>
      <navbar-social
        ><div class="flex grow">
          <div class="flex items-center ml-4">
            <button-create-personnel></button-create-personnel>
            <p class="ml-2 font-medium">Danh sách nhân sự</p>
          </div>
        </div></navbar-social
      >
    </template>
    <div class="w-full">
      <div>
        <tab-nav
          :tabs="['Thông tin chung', 'Danh sách nhân sự']"
          :selected="selected"
          @selected="setSelected"
        ></tab-nav>
      </div>
      <hr style="margin-top: 0px; margin-left: 5px" />
      <div>
        <the-tab :isSelected="selected === 'Thông tin chung'">
          <div class="text-left px-4 w-full h-full">
            <div class="mt-2">
              <h4 class="form-section-title form-small">
                <span v-show="isInfor == true" @click="isInfor = !isInfor">
                  <i class="fas fa-chevron-down cursor-pointer"></i>
                </span>
                <span @click="isInfor = !isInfor" v-show="isInfor == false"
                  ><i class="fas fa-chevron-right cursor-pointer"></i
                ></span>
                Thông tin cá nhân
              </h4>
              <Transition
                ><div v-show="isInfor == true">
                  <div class="form-small" v-if="isCheck == false">
                    <div>
                      <label for="" class="form-group-label"
                        >Tên phiếu đánh giá</label
                      >
                      <div>
                        <input
                          type="text"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nguyễn Văn A"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-small" v-else>
                    <div>
                      <label for="" class="form-group-label"
                        >Mẫu đánh giá</label
                      >
                      <div>
                        <v-select></v-select>
                      </div>
                    </div>
                  </div>
                  <div class="form-small">
                    <div class="flex items-center">
                      <div>
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          class="w-5 h-5"
                          v-model="isCheck"
                        />
                      </div>
                      <label for="" class="form-group-label ml-2"
                        >Chọn từ mẫu đánh giá</label
                      >
                    </div>
                  </div>
                  <div class="form-small">
                    <div>
                      <label for="" class="form-group-label"
                        >Loại đánh giá</label
                      >
                      <div>
                        <v-select></v-select>
                      </div>
                    </div>
                  </div>
                  <div class="form-small grid grid-cols-6 gap-2">
                    <div class="col-span-2">
                      <label for="" class="form-group-label">Kỳ đánh giá</label>
                      <div>
                        <v-select></v-select>
                      </div>
                    </div>
                    <div class="col-span-4">
                      <label for="" class="form-group-label">Năm</label>
                      <div>
                        <v-select></v-select>
                      </div>
                    </div>
                  </div>
                  <div class="form-small">
                    <div>
                      <label for="" class="form-group-label"
                        >Hạn đánh giá</label
                      >
                      <div>
                        <v-date-picker
                          class="form-control-input"
                          :masks="masks"
                          :model-config="modelConfig"
                        >
                          <template
                            v-slot="{ inputValue, togglePopover, inputEvents }"
                          >
                            <div class="flex items-center">
                              <button
                                class="focus:outline-none mr-2"
                                @click="togglePopover()"
                              >
                                <i class="far fa-calendar-alt"></i>
                              </button>
                              <input
                                :value="inputValue"
                                class="focus:outline-none"
                                @click="togglePopover()"
                                placeholder="dd/mm/yyyy"
                                v-on="inputEvents"
                              />
                            </div>
                          </template>
                        </v-date-picker>
                      </div>
                    </div>
                  </div>
                  <div class="form-small">
                    <label for="" class="form-group-label">Người quản lý</label>
                    <div>
                      <v-select
                        label="code"
                        :options="listPersonnels"
                        :reduce="(personnel) => personnel.code"
                        @input="loadPersonnel($event)"
                        placeholder="Tìm mã, họ tên"
                        class="rounded-3xl"
                      >
                        <template #option="{ code, name }">
                          <div style="display: flex; align-items: baseline">
                            <strong>{{ code }}</strong>
                            <em style="margin-left: 0.5rem">- {{ name }}</em>
                          </div>
                        </template>
                        <template #selected-option="{ code, name }">
                          <div style="display: flex; align-items: baseline">
                            <strong>{{ code }}</strong>
                            <em style="margin-left: 0.5rem">- {{ name }}</em>
                          </div>
                        </template>
                      </v-select>
                    </div>
                  </div>
                  <div class="form-small">
                    <label for="" class="form-group-label"
                      >Người theo dõi</label
                    >
                    <div>
                      <v-select
                        label="code"
                        :options="listPersonnels"
                        :reduce="(personnel) => personnel.code"
                        @input="loadPersonnel($event)"
                        placeholder="Tìm mã, họ tên"
                        class="rounded-3xl"
                      >
                        <template #option="{ code, name }">
                          <div style="display: flex; align-items: baseline">
                            <strong>{{ code }}</strong>
                            <em style="margin-left: 0.5rem">- {{ name }}</em>
                          </div>
                        </template>
                        <template #selected-option="{ code, name }">
                          <div style="display: flex; align-items: baseline">
                            <strong>{{ code }}</strong>
                            <em style="margin-left: 0.5rem">- {{ name }}</em>
                          </div>
                        </template>
                      </v-select>
                    </div>
                  </div>
                </div>
              </Transition>
              <Transition>
                <div v-show="isInfor == false">
                  <h2
                    @click="isInfor = !isInfor"
                    class="cursor-pointer mt-2 form-group-label"
                  >
                    Mã nhân sự *, Mã chấm công, Mã hồ sơ, Họ và tên *, Ngày
                    sinh, Giới tính, Nơi sinh, Nguyên quán, CMT/Căn cước/Hộ
                    chiếu, Ngày cấp, Nơi cấp, Ảnh mặt tr...
                  </h2>
                </div>
              </Transition>
            </div>
            <div class="mt-2">
              <h4 class="form-section-title form-small">
                <span v-show="isPerson == true" @click="isPerson = !isPerson">
                  <i class="fas fa-chevron-down cursor-pointer"></i>
                </span>
                <span @click="isPerson = !isPerson" v-show="isPerson == false"
                  ><i class="fas fa-chevron-right cursor-pointer"></i
                ></span>
                Người đánh giá
              </h4>
              <Transition>
                <div v-show="isPerson == true" class="form-large">
                  <div v-for="(assessor, index) in assessors" :key="index">
                    <div :name="index" class="flex items-center">
                      <div class="grid grid-cols-8 gap-2 w-full">
                        <div class="col-span-4">
                          <label for="" class="form-group-label"
                            >Hội đồng đánh giá</label
                          >
                          <div>
                            <v-select
                              v-model="assessor.EvaluationCriteria"
                            ></v-select>
                          </div>
                        </div>
                        <div class="col-span-3">
                          <label for="" class="form-group-label"
                            >Người chấm</label
                          >
                          <div>
                            <v-select v-model="assessor.scores"></v-select>
                          </div>
                        </div>
                        <div class="col-span-1">
                          <label for="" class="form-group-label"
                            >Tỷ trọng</label
                          >
                          <div>
                            <input
                              type="text"
                              name=""
                              id=""
                              class="form-control-input"
                              v-model="assessor.proportion"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <span @click="removeExp(index)"
                          ><i class="fas fa-times icon-close"></i
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div class="my-2">
                    <i
                      class="bi bi-plus-circle cursor-pointer text-xl"
                      @click="createExp(infoExp)"
                    ></i>
                  </div>
                </div>
              </Transition>
            </div>
            <div class="mt-2">
              <h4 class="form-section-title form-small">
                <span
                  v-show="isContent == true"
                  @click="isContent = !isContent"
                >
                  <i class="fas fa-chevron-down cursor-pointer"></i>
                </span>
                <span
                  @click="isContent = !isContent"
                  v-show="isContent == false"
                  ><i class="fas fa-chevron-right cursor-pointer"></i
                ></span>
                Nội dung đánh giá
              </h4>
              <Transition>
                <div v-show="isContent == true" class="form-large">
                  <div v-for="(assessor, index) in assessors" :key="index">
                    <div :name="index" class="flex items-center">
                      <div class="grid grid-cols-8 gap-2 w-full">
                        <div class="col-span-4">
                          <label for="" class="form-group-label"
                            >Tiêu chí đánh giá</label
                          >
                          <div>
                            <v-select
                              v-model="assessor.EvaluationCriteria"
                            ></v-select>
                          </div>
                        </div>
                        <div class="col-span-3">
                          <label for="" class="form-group-label"
                            >Điểm yêu cầu</label
                          >
                          <div>
                            <v-select v-model="assessor.scores"></v-select>
                          </div>
                        </div>
                        <div class="col-span-1">
                          <label for="" class="form-group-label"
                            >Tỷ trọng</label
                          >
                          <div>
                            <input
                              type="text"
                              name=""
                              id=""
                              class="form-control-input"
                              v-model="assessor.proportion"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <span @click="removeExp(index)"
                          ><i class="fas fa-times icon-close"></i
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div class="my-2">
                    <i
                      class="bi bi-plus-circle cursor-pointer text-xl"
                      @click="createExp(infoExp)"
                    ></i>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </the-tab>
      </div>
      <div>
        <the-tab :isSelected="selected === 'Danh sách nhân sự'">
          <div class="text-left px-4 w-full form-plus-over">
            <div class="mt-2">
              <h4 class="form-section-title form-small">
                <span v-show="isInfor == true" @click="isInfor = !isInfor">
                  <i class="fas fa-chevron-down cursor-pointer"></i>
                </span>
                <span @click="isInfor = !isInfor" v-show="isInfor == false"
                  ><i class="fas fa-chevron-right cursor-pointer"></i
                ></span>
                Thông tin cá nhân
              </h4>
              <Transition>
                <div v-show="isInfor == true">
                  <h2>hello</h2>
                </div>
              </Transition>
              <Transition>
                <div v-show="isInfor == false">
                  <h2
                    @click="isInfor = !isInfor"
                    class="cursor-pointer mt-2 form-group-label"
                  >
                    Mã nhân sự *, Mã chấm công, Mã hồ sơ, Họ và tên *, Ngày
                    sinh, Giới tính, Nơi sinh, Nguyên quán, CMT/Căn cước/Hộ
                    chiếu, Ngày cấp, Nơi cấp, Ảnh mặt tr...
                  </h2>
                </div>
              </Transition>
            </div>
          </div>
        </the-tab>
      </div>
    </div>
    <div class="bg-slate-100 sticky right-0 bottom-0 left-0 z-10">
      <div class="p-4 text-left">
        <button class="button-modal" @click="uploadPersonnel()">
          Cập nhật
        </button>
        <button
          class="button-close-modal"
          @click="this.$router.push({ path: '/personnel', name: 'Personnel' })"
        >
          Hủy bỏ
        </button>
      </div>
    </div>
  </person-layout>
</template>

<script>
import TabNav from "@/components/tab/TabNav.vue";
import TheTab from "@/components/tab/TheTab.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarPersonnel from "@/components/sidebar/SidebarPersonnel.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreatePersonnel from "@/views/personnels/ButtonCreatePersonnel.vue";
import { useStore } from "vuex";
import { computed, reactive } from "@vue/runtime-core";
export default {
  data() {
    return {
      selected: "Thông tin chung",
      isInfor: true,
      isPerson: true,
      isContent: true,
      isCheck: false,
      masks: {
        input: "DD/MM/YYYY",
        data: "YYYY-MM-DD",
      },
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD",
      },
    };
  },
  components: {
    TabNav,
    TheTab,
    PersonLayout,
    SidebarPersonnel,
    NavbarSocial,
    ButtonCreatePersonnel,
  },
  methods: {
    setSelected(tab) {
      this.selected = tab;
    },
  },
  setup() {
    const store = useStore();
    const assessors = reactive([
      { EvaluationCriteria: "", scores: "", proportion: "" },
      { EvaluationCriteria: "", scores: "", proportion: "" },
      { EvaluationCriteria: "", scores: "", proportion: "" },
    ]);
    const loadPersonnel = (event) => {
      store.dispatch("personnels/SearchPersonnelAction", event.target.value);
    };
    const listPersonnels = computed(
      () => store.state.personnels.listPersonnels
    );
    return {
      listPersonnels: listPersonnels,
      assessors: assessors,
      loadPersonnel,
    };
  },
};
</script>

<style></style>
