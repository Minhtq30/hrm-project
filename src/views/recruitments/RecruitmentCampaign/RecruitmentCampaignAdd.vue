<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-recruitment></sidebar-recruitment>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center">
            <buttton-create-recruitment></buttton-create-recruitment>
            <p class="longText">Tạo mới chiến dịch tuyển dụng</p>
          </div>
        </div></navbar-social
      >
    </template>
    <Transition name="slide-fade">
      <div
        class="w-full h-full text-left px-4 py-2 form-plus-over format-scroll"
        v-if="isLoading == false"
      >
        <div title="Thông tin chung">
          <h4
            class="form-section-title cursor-pointer form-small"
            @click="isInfor = !isInfor"
          >
            <span v-show="isInfor == true">
              <i class="fas fa-chevron-down cursor-pointer"></i>
            </span>
            <span v-show="isInfor == false"
              ><i class="fas fa-chevron-right cursor-pointer"></i
            ></span>
            Thông tin chiến dịch
          </h4>
          <Transition name="slide-up">
            <div v-show="isInfor == true">
              <div
                class="form-small"
                v-if="RecruitmentCampaign.from_request == 0"
              >
                <label for="" class="form-group-label">Tên chiến dịch</label>
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập tên chiến dịch"
                    v-model="RecruitmentCampaign.title"
                  />
                </div>
              </div>
              <div class="form-small" v-else>
                <label for="" class="form-group-label"
                  >Đề xuất tuyển dụng</label
                >
                <div>
                  <v-select
                    label="title"
                    :options="listRecruitmentRequest"
                    :reduce="(request) => request.title"
                    placeholder="Chọn chiến dịch"
                    @click.once="loadRecruitmentRequest()"
                    v-model="RecruitmentCampaign.title"
                  ></v-select>
                </div>
              </div>
              <div class="form-small flex items-center">
                <div class="check flex items-center">
                  <input
                    id="check"
                    type="checkbox"
                    true-value="1"
                    false-value="0"
                    v-model="RecruitmentCampaign.from_request"
                  />
                  <label
                    for="check"
                    class="form-group-label cursor-pointer ml-1 mt-2"
                    >Từ đề xuất tuyển dụng</label
                  >
                </div>
              </div>
              <div class="form-small">
                <label for="" class="form-group-label">Người phụ trách</label>
                <div>
                  <selector-view-vue
                    :Placeholder="'Nhập người phụ trách'"
                    :listOption="listPersonnels"
                    :listFinal="RecruitmentCampaign.manager_ids"
                    :searchOption="loadPersonnel"
                  >
                    <template v-slot:selectedOption="{ item }">
                      <div class="flex flex-col text-left">
                        <div class="flex">
                          <div class="font-medium">{{ item.code }}</div>
                          <div>&nbsp;- {{ item.name }}</div>
                        </div>
                        <div class="flex text-xs">
                          <div v-if="item.position">
                            {{ item.position }}&nbsp;-&nbsp;
                          </div>
                          <div>{{ item.department }}</div>
                        </div>
                      </div>
                    </template>
                    <template v-slot:selected="{ item }">
                      <div class="flex">
                        <div class="font-medium">{{ item.code }}</div>
                        <div>&nbsp;- {{ item.name }}</div>
                      </div>
                    </template>
                  </selector-view-vue>
                </div>
              </div>
              <div class="form-small">
                <label for="" class="form-group-label">Người theo dõi</label>
                <div>
                  <selector-view-vue
                    :Placeholder="'Nhập người theo dõi'"
                    :listOption="listPersonnels"
                    :listFinal="RecruitmentCampaign.follower_ids"
                    :searchOption="loadPersonnel"
                  >
                    <template v-slot:selectedOption="{ item }">
                      <div class="flex flex-col text-left">
                        <div class="flex">
                          <div class="font-medium">{{ item.code }}</div>
                          <div>&nbsp;- {{ item.name }}</div>
                        </div>
                        <div class="flex text-xs">
                          <div v-if="item.position">
                            {{ item.position }}&nbsp;-&nbsp;
                          </div>
                          <div>{{ item.department }}</div>
                        </div>
                      </div>
                    </template>
                    <template v-slot:selected="{ item }">
                      <div class="flex">
                        <div class="font-medium">{{ item.code }}</div>
                        <div>&nbsp;- {{ item.name }}</div>
                      </div>
                    </template>
                  </selector-view-vue>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 form-small">
                <div>
                  <label for="" class="form-group-label">Số lượng tuyển</label>
                  <div>
                    <input
                      type="number"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Nhập số lượng"
                      v-model="RecruitmentCampaign.amount"
                    />
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">Chi phí dự kiến</label>
                  <div>
                    <input
                      type="number"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Nhập chi phí"
                      v-model="RecruitmentCampaign.price"
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 form-small">
                <div>
                  <label for="" class="form-group-label">Ngày bắt đầu</label>
                  <div>
                    <date-picker
                      v-model="RecruitmentCampaign.date_start"
                    ></date-picker>
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">Ngày kết thúc</label>
                  <div>
                    <date-picker
                      v-model="RecruitmentCampaign.date_end"
                    ></date-picker>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
          <div v-show="isInfor == false">
            <h2 @click="isInfor = true" class="cursor-pointer form-group-label">
              Chiến dịch tuyển dụng, Mã UV *, Nguồn *, Người giới thiệu, Họ và
              tên *, Ngày sinh, Giới tính, Nơi sinh, Nguyên quán, CMT/Căn
              cước/Hộ chiếu, Ngày cấp.
            </h2>
          </div>
        </div>
        <div title="Thông tin vị trí tuyển">
          <h4
            class="form-section-title form-small cursor-pointer"
            @click="isContact = !isContact"
          >
            <span v-show="isContact == true">
              <i class="fas fa-chevron-down cursor-pointer"></i>
            </span>
            <span v-show="isContact == false"
              ><i class="fas fa-chevron-right cursor-pointer"></i
            ></span>
            Thông tin vị trí tuyển
          </h4>
          <Transition name="slide-up">
            <div v-show="isContact == true">
              <div class="form-small">
                <label for="" class="form-group-label">Vị trí</label>
                <div>
                  <v-select
                    label="title"
                    :options="listPositions"
                    :reduce="(position) => position.ID"
                    placeholder="Chọn vị trí"
                    v-model="RecruitmentCampaign.position_id"
                    @click.once="LoadPosition()"
                  ></v-select>
                </div>
              </div>
              <div class="form-small">
                <label for="" class="form-group-label"
                  >Hình thức làm việc</label
                >
                <div>
                  <v-select
                    label="title"
                    :options="listWorkTypes"
                    :reduce="(workType) => workType.ID"
                    placeholder="Chọn hình thức làm việc"
                    v-model="RecruitmentCampaign.type_id"
                  ></v-select>
                </div>
              </div>
              <div class="form-small">
                <label for="" class="form-group-label">Nơi làm việc</label>
                <div>
                  <v-select
                    label="title"
                    :options="listCity"
                    :reduce="(city) => city.ID"
                    placeholder="Chọn nơi làm việc"
                    v-model="RecruitmentCampaign.place"
                    @click.once="LoadWorkPlace()"
                    multiple
                  ></v-select>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 form-small">
                <div>
                  <label for="" class="form-group-label">Mức lương(từ)</label>
                  <div>
                    <input
                      type="number"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Từ"
                      v-model="RecruitmentCampaign.salary_from"
                    />
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">Mức lương(đến)</label>
                  <div>
                    <input
                      type="number"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Đến"
                      v-model="RecruitmentCampaign.salary_to"
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 form-small">
                <div>
                  <label for="" class="form-group-label">Hạn tuyển</label>
                  <div>
                    <date-picker
                      v-model="RecruitmentCampaign.deadline"
                    ></date-picker>
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">Số lượng tuyển</label>
                  <div>
                    <input
                      type="number"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Đến"
                      v-model="RecruitmentCampaign.amount_candidate"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Transition>
          <div v-show="isContact == false">
            <h2
              @click="isContact = !isContact"
              class="cursor-pointer form-group-label"
            >
              Điện thoại, Email, Thường trú, Địa chỉ, Chỗ ở hiện nay, Địa chỉ
            </h2>
          </div>
        </div>
        <div title="Yêu cầu ứng viên" class="inner">
          <h4
            class="form-section-title form-small cursor-pointer"
            @click="isExp = !isExp"
          >
            <span v-show="isExp == true">
              <i class="fas fa-chevron-down cursor-pointer"></i>
            </span>
            <span v-show="isExp == false"
              ><i class="fas fa-chevron-right cursor-pointer"></i
            ></span>
            Yêu cầu ứng viên
          </h4>
          <Transition name="slide-up">
            <div v-show="isExp == true">
              <div class="grid grid-cols-2 gap-2 form-small">
                <div>
                  <label for="" class="form-group-label">Trình độ</label>
                  <div>
                    <v-select
                      label="title"
                      :options="listAcademic"
                      :reduce="(level) => level.ID"
                      placeholder="Chọn trình độ"
                      v-model="RecruitmentCampaign.degree_id"
                    ></v-select>
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">Chuyên ngành</label>
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Nhập chuyên ngành"
                      v-model="RecruitmentCampaign.specialization"
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 form-small">
                <div>
                  <label for="" class="form-group-label">Kinh nghiệm</label>
                  <div>
                    <v-select
                      label="title"
                      :options="dataExpRecruitment"
                      :reduce="(exp) => exp.value"
                      placeholder="Chọn kinh nghiệm"
                      v-model="RecruitmentCampaign.experience"
                      :searchable="false"
                    ></v-select>
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">Ngoại ngữ</label>
                  <div>
                    <v-select
                      label="title"
                      :options="dataLanguageRecruitment"
                      :reduce="(lan) => lan.value"
                      placeholder="Chọn ngôn ngữ"
                      v-model="RecruitmentCampaign.language"
                      :searchable="false"
                    ></v-select>
                  </div>
                </div>
              </div>
              <div class="form-small grid grid-cols-4 gap-2">
                <div>
                  <label for="" class="form-group-label">Độ tuổi</label>
                  <div>
                    <input
                      type="number"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Từ"
                      v-model="RecruitmentCampaign.age_from"
                    />
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">&nbsp;</label>
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Đến"
                      v-model="RecruitmentCampaign.age_to"
                    />
                  </div>
                </div>
                <div class="col-span-2">
                  <label for="" class="form-group-label">Giới tính</label>
                  <div>
                    <v-select
                      label="title"
                      :options="dataGenderRecruitment"
                      :reduce="(gender) => gender.value"
                      placeholder="Chọn giới tính"
                      v-model="RecruitmentCampaign.gender"
                      :searchable="false"
                    ></v-select>
                  </div>
                </div>
              </div>
              <div class="form-small grid grid-cols-4 gap-2">
                <div>
                  <label for="" class="form-group-label">Chiều cao</label>
                  <div>
                    <input
                      type="number"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Từ"
                      v-model="RecruitmentCampaign.height"
                    />
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">&nbsp;</label>
                  <div>
                    <input
                      type="number"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Đến"
                      v-model="RecruitmentCampaign.height_to"
                    />
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">Cân nặng</label>
                  <div>
                    <input
                      type="number"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Từ"
                      v-model="RecruitmentCampaign.weight"
                    />
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">&nbsp;</label>
                  <div>
                    <input
                      type="number"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Đến"
                      v-model="RecruitmentCampaign.weight_to"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Transition>
          <div v-show="isExp == false">
            <h2 @click="isExp = !isExp" class="cursor-pointer form-group-label">
              Điện thoại, Email, Thường trú, Địa chỉ, Chỗ ở hiện nay, Địa chỉ
            </h2>
          </div>
        </div>
        <div title="Ghi chú">
          <div class="form-small">
            <label for="" class="form-group-label">Ghi chú</label>
            <div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="5"
                class="form-control-input"
                v-model="RecruitmentCampaign.desc"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <template v-slot:sub_footer
      ><div class="bg-slate-100">
        <div class="p-4 text-left">
          <button
            class="button-modal"
            @click="CreateNewCampaign()"
            :class="{ disabledButtonCreated: isCreated }"
          >
            Cập nhật
          </button>
          <button
            class="button-close-modal"
            @click="this.$router.push('/recruitment-campaign/all')"
          >
            Hủy bỏ
          </button>
        </div>
      </div></template
    >
  </person-layout>
  <loading-overlay :isLoading="isLoading"></loading-overlay>
</template>

<script>
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarRecruitment from "@/components/sidebar/SidebarRecruitment.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButttonCreateRecruitment from "@/views/recruitments/ButttonCreateRecruitment.vue";
import datePicker from "@/components/datePicker/datePicker.vue";
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import SelectorViewVue from "@/components/selector/SelectorView.vue";
import _ from "lodash";

export default {
  components: {
    PersonLayout,
    SidebarRecruitment,
    NavbarSocial,
    ButttonCreateRecruitment,
    datePicker,
    SelectorViewVue,
  },
  data() {
    return {
      isInfor: true,
      isContact: true,
      isExp: true,
    };
  },
  methods: {},
  setup() {
    const store = useStore();
    const toast = useToast();
    const isLoading = ref(true);
    const isCreated = ref(false);
    const router = useRouter();
    const RecruitmentCampaign = reactive({
      title: null,
      from_request: 0,
      manager_ids: [],
      follower_ids: [],
      amount_candidate: null,
      price: null,
      date_start: null,
      date_end: null,
      position_id: null,
      type_id: null,
      place: [],
      salary_from: null,
      salary_to: null,
      deadline: null,
      amount: null,
      degree_id: null,
      specialization: null,
      experience: null,
      language: null,
      age_from: null,
      age_to: null,
      gender: null,
      height: null,
      height_to: null,
      weight: null,
      weight_to: null,
      desc: null,
    });
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const dataExpRecruitment = computed(
      () => store.state.constant.dataExpRecruitment
    );
    const dataLanguageRecruitment = computed(
      () => store.state.constant.dataLanguageRecruitment
    );
    const dataGenderRecruitment = computed(
      () => store.state.constant.dataGenderRecruitment
    );
    const loadRecruitmentRequest = () => {
      store.dispatch("recruitmentRequest/getAllRecruitmentRequestAction");
    };
    const LoadPosition = () => {
      store.dispatch("positions/getAllPositionsAction", 500);
    };
    const LoadWorkPlace = () => {
      store.dispatch("places/getAllCityAction");
    };
    const loadPersonnel = _.debounce((event) => {
      store.dispatch(
        "recruitmentCampaign/SearchPersonnelInChargeAction",
        event.target.value
      );
    }, 300);
    store.dispatch("workTypes/GetAllWorkTypeAction", 50);
    store.dispatch("academics/GetAllAcademicsAction");
    const listRecruitmentRequest = computed(
      () => store.state.recruitmentRequest.listRecruitmentRequest
    );
    const listCity = computed(() => store.state.places.listCity);

    const TypeTraining = computed(() => store.state.personnels.TypeTraining);
    const listAcademic = computed(() => store.state.academics.listAcademic);
    const listPositions = computed(
      () => store.getters["positions/getAllPositionsActive"]
    );
    const listWorkTypes = computed(
      () => store.getters["workTypes/GetAllWorkTypeActive"]
    );
    const listPersonnels = computed(
      () => store.state.recruitmentCampaign.listPersonnelInCharge
    );
    const ActivatedButton = () => {
      isCreated.value = false;
    };
    const compareDate = (start, end) => {
      let date1 = new Date(start);
      let date2 = new Date(end);
      if (date1 <= date2) {
        return true;
      } else {
        return false;
      }
    };
    //
    const CreateNewCampaign = () => {
      isCreated.value = true;
      const data = {
        title: RecruitmentCampaign.title,
        from_request: RecruitmentCampaign.from_request,
        manager_ids: RecruitmentCampaign.manager_ids,
        follower_ids: RecruitmentCampaign.follower_ids,
        amount_candidate: RecruitmentCampaign.amount_candidate,
        price: RecruitmentCampaign.price,
        date_start: RecruitmentCampaign.date_start,
        date_end: RecruitmentCampaign.date_end,
        position_id: RecruitmentCampaign.position_id,
        type_id: RecruitmentCampaign.type_id,
        place: RecruitmentCampaign.place,
        salary_from: RecruitmentCampaign.salary_from,
        salary_to: RecruitmentCampaign.salary_to,
        deadline: RecruitmentCampaign.deadline,
        amount: RecruitmentCampaign.amount,
        degree_id: RecruitmentCampaign.degree_id,
        specialization: RecruitmentCampaign.specialization,
        experience: RecruitmentCampaign.experience,
        language: RecruitmentCampaign.language,
        age_from: RecruitmentCampaign.age_from,
        age_to: RecruitmentCampaign.age_to,
        gender: RecruitmentCampaign.gender,
        height: RecruitmentCampaign.height,
        height_to: RecruitmentCampaign.height_to,
        weight: RecruitmentCampaign.weight,
        weight_to: RecruitmentCampaign.weight_to,
        desc: RecruitmentCampaign.desc,
      };
      if (RecruitmentCampaign.title != null) {
        if (RecruitmentCampaign.manager_ids?.length != 0) {
          if (
            compareDate(
              RecruitmentCampaign.date_start,
              RecruitmentCampaign.date_end
            )
          ) {
            if (RecruitmentCampaign.position_id != null) {
              store.dispatch(
                "recruitmentCampaign/CreateRecruitmentCampaignAction",
                {
                  data: data,
                  toast,
                  router,
                  ActivatedButton,
                  EndTimeLoading,
                }
              );
            } else {
              toast.error("Vui lòng chọn vị trí cần tuyển");
            }
          } else {
            isCreated.value = false;
            toast.error("Ngày bắt đầu lớn hơn ngày kết thúc chiến dịch");
          }
        } else {
          isCreated.value = false;
          toast.error("Vui lòng chọn người phụ trách");
        }
      } else {
        isCreated.value = false;
        toast.error("Vui lòng nhập tên chiến dịch");
      }
    };
    return {
      isLoading,
      RecruitmentCampaign,
      listCity,
      TypeTraining,
      listAcademic,
      listPositions,
      listWorkTypes,
      listRecruitmentRequest,
      isCreated,
      listPersonnels,
      dataExpRecruitment,
      dataLanguageRecruitment,
      dataGenderRecruitment,
      loadRecruitmentRequest,
      CreateNewCampaign,
      ActivatedButton,
      LoadPosition,
      LoadWorkPlace,
      loadPersonnel,
      compareDate,
    };
  },
};
</script>

<style></style>
