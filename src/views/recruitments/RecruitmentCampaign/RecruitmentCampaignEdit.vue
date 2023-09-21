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
            <p class="text-base">Cập nhật chiến dịch tuyển dụng</p>
          </div>
        </div></navbar-social
      >
    </template>
    <Transition name="slide-fade">
      <div
        class="w-full h-full text-left px-4 form-plus-over format-scroll"
        v-if="isLoading == false"
      >
        <div title="Thông tin chung" class="mt-2">
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
              <div class="form-small" v-if="CampaignDetail.from_request == 0">
                <label for="" class="form-group-label">Tên chiến dịch</label>
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập tên chiến dịch"
                    v-model="CampaignDetail.title"
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
                    v-model="CampaignDetail.title"
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
                    v-model="CampaignDetail.from_request"
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
                  <v-select
                    multiple
                    v-model="CampaignDetail.manager_ids"
                    placeholder="Nhập tên người cần tìm"
                    label="name"
                    :options="listPersonnels"
                    :reduce="(personnel) => personnel.ID"
                    @input="loadPersonnel($event)"
                    :filterable="false"
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
                    </template></v-select
                  >
                </div>
              </div>
              <div class="form-small">
                <label for="" class="form-group-label">Người theo dõi</label>
                <div>
                  <v-select
                    multiple
                    v-model="CampaignDetail.follower_ids"
                    placeholder="Nhập tên người cần tìm"
                    label="name"
                    :options="listPersonnels"
                    :reduce="(personnel) => personnel.ID"
                    @input="loadPersonnel($event)"
                    :filterable="false"
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
                      v-model="CampaignDetail.amount"
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
                      v-model="CampaignDetail.price"
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 form-small">
                <div>
                  <label for="" class="form-group-label">Ngày bắt đầu</label>
                  <div>
                    <date-picker
                      v-model="CampaignDetail.date_start"
                    ></date-picker>
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">Ngày kết thúc</label>
                  <div>
                    <date-picker
                      v-model="CampaignDetail.date_end"
                    ></date-picker>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
          <div v-show="isInfor == false">
            <h2
              @click="isInfor = true"
              class="cursor-pointer mt-2 form-group-label"
            >
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
                    v-model="CampaignDetail.position_id"
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
                    v-model="CampaignDetail.type_id"
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
                    v-model="CampaignDetail.place"
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
                      v-model="CampaignDetail.salary_from"
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
                      v-model="CampaignDetail.salary_to"
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 form-small">
                <div>
                  <label for="" class="form-group-label">Hạn tuyển</label>
                  <div>
                    <date-picker
                      v-model="CampaignDetail.deadline"
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
                      v-model="CampaignDetail.amount_candidate"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Transition>
          <div v-show="isContact == false">
            <h2
              @click="isContact = !isContact"
              class="cursor-pointer mt-2 form-group-label"
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
                      v-model="CampaignDetail.degree_id"
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
                      v-model="CampaignDetail.specialization"
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
                      :options="dataExp"
                      :reduce="(exp) => exp.value"
                      placeholder="Chọn kinh nghiệm"
                      v-model="CampaignDetail.experience"
                      :searchable="false"
                    ></v-select>
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">Ngoại ngữ</label>
                  <div>
                    <v-select
                      label="title"
                      :options="dataLanguage"
                      :reduce="(lan) => lan.value"
                      placeholder="Chọn ngôn ngữ"
                      v-model="CampaignDetail.language"
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
                      v-model="CampaignDetail.age_from"
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
                      v-model="CampaignDetail.age_to"
                    />
                  </div>
                </div>
                <div class="col-span-2">
                  <label for="" class="form-group-label">Giới tính</label>
                  <div>
                    <v-select
                      label="title"
                      :options="dataGender"
                      :reduce="(gender) => gender.value"
                      placeholder="Chọn giới tính"
                      v-model="CampaignDetail.gender"
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
                      v-model="CampaignDetail.height"
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
                      v-model="CampaignDetail.height_to"
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
                      v-model="CampaignDetail.weight"
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
                      v-model="CampaignDetail.weight_to"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Transition>
          <div v-show="isExp == false">
            <h2
              @click="isExp = !isExp"
              class="cursor-pointer mt-2 form-group-label"
            >
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
                v-model="CampaignDetail.desc"
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
            @click="EditCampaign()"
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
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    PersonLayout,
    SidebarRecruitment,
    NavbarSocial,
    ButttonCreateRecruitment,
    datePicker,
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
    const route = useRoute();
    const isLoading = ref(true);
    const isCreated = ref(false);
    const router = useRouter();
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("recruitmentCampaign/ShowDetailRecruitmentCampaignAction", {
      id: route.params.idCampaign,
      EndTimeLoading,
    });
    const CampaignDetail = computed(
      () => store.state.recruitmentCampaign.CampaignDetail
    );

    store.dispatch("recruitmentRequest/getAllRecruitmentRequestAction", {
      EndTimeLoading,
    });

    store.dispatch("positions/getAllPositionsAction", 500);

    store.dispatch("places/getAllCityAction");

    const loadPersonnel = (event) => {
      store.dispatch("personnels/SearchPersonnelAction", event.target.value);
    };
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
      () => store.state.personnels.SearchPersonnel
    );
    const dataExp = computed(() => store.state.constant.dataExp);
    const dataLanguage = computed(() => store.state.constant.dataLanguage);
    const dataGender = computed(() => store.state.constant.dataGender);
    const ActivatedButton = () => {
      isCreated.value = false;
    };
    //
    const EditCampaign = () => {
      isCreated.value = true;
      const data = {
        ID: CampaignDetail.value.ID,
        title: CampaignDetail.value.title,
        from_request: CampaignDetail.value.from_request,
        manager_ids: CampaignDetail.value.manager_ids,
        follower_ids: CampaignDetail.value.follower_ids,
        amount_candidate: CampaignDetail.value.amount_candidate,
        price: CampaignDetail.value.price,
        date_start: CampaignDetail.value.date_start,
        date_end: CampaignDetail.value.date_end,
        position_id: CampaignDetail.value.position_id,
        type_id: CampaignDetail.value.type_id,
        place: CampaignDetail.value.place,
        salary_from: CampaignDetail.value.salary_from,
        salary_to: CampaignDetail.value.salary_to,
        deadline: CampaignDetail.value.deadline,
        amount: CampaignDetail.value.amount,
        degree_id: CampaignDetail.value.degree_id,
        specialization: CampaignDetail.value.specialization,
        experience: CampaignDetail.value.experience,
        language: CampaignDetail.value.language,
        age_from: CampaignDetail.value.age_from,
        age_to: CampaignDetail.value.age_to,
        gender: CampaignDetail.value.gender,
        height: CampaignDetail.value.height,
        height_to: CampaignDetail.value.height_to,
        weight: CampaignDetail.value.weight,
        weight_to: CampaignDetail.value.weight_to,
        desc: CampaignDetail.value.desc,
      };
      store.dispatch("recruitmentCampaign/UpdateRecruitmentCampaignAction", {
        data: data,
        toast,
        router,
        ActivatedButton,
        EndTimeLoading,
      });
    };
    return {
      isLoading,
      listCity,
      TypeTraining,
      listAcademic,
      listPositions,
      listWorkTypes,
      listRecruitmentRequest,
      isCreated,
      CampaignDetail,
      listPersonnels,
      dataExp,
      dataLanguage,
      dataGender,
      EditCampaign,
      ActivatedButton,
      loadPersonnel,
    };
  },
};
</script>

<style></style>
