<template>
  <div class="button-create relative group" title="Tạo mới">
    <div
      class="text-sm absolute w-60 z-10 bg-white left-0 top-full rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible p-2 drop-shadow-xl before:content-[''] before:h-5 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
    >
      <ul>
        <li
          class="p-[10px] sub-item"
          @click="this.$router.push('/recruitment-candidate/add')"
        >
          Hồ sơ ứng viên
        </li>
        <li
          class="p-[10px] sub-item"
          @click="this.$router.push('/recruitment-campaign/add')"
        >
          Chiến dịch tuyển dụng
        </li>
        <li class="p-[10px] sub-item" @click="handleOpenInterviewSchedule()">
          Lịch phỏng vấn
        </li>
        <li class="p-[10px] sub-item">Mẫu đánh giá</li>
        <li class="p-[10px] sub-item">Tiêu chí đánh giá</li>
        <li
          class="p-[10px] sub-item"
          @click="this.$router.push('/recruitment-request/add')"
        >
          Đề xuất tuyển dụng
        </li>
        <li class="p-[10px] sub-item">Kế hoạch định biên</li>
      </ul>
    </div>
  </div>
  <teleport to="#app">
    <modal-view
      :isOpen="isOpenInterviewSchedule"
      :handleCloseDetail="handleCloseInterviewSchedule"
    >
      <div class="w-[550px]">
        <h1 class="header-modal">tạo mới lịch phỏng vấn</h1>
        <div
          class="text-left px-4 py-2 max-h-[500px] overflow-auto format-scroll"
        >
          <div title="Thông tin chung">
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
              Thông tin cá nhân
            </h4>
            <Transition name="slide-up">
              <div v-show="isInfor == true">
                <div class="form-small">
                  <label for="" class="form-group-label"
                    >Chiến dịch tuyển dụng</label
                  >
                  <div>
                    <v-select
                      label="title"
                      :options="listCampaignInterview"
                      :reduce="(interview) => interview.ID"
                      @search="loadCampaign"
                      :filterable="false"
                      placeholder="Chọn chiến dịch"
                      v-model="InterviewSchedule.campaign_id"
                    ></v-select>
                  </div>
                </div>
                <div class="form-small">
                  <label for="" class="form-group-label"
                    >Tên lịch phỏng vấn</label
                  >
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Nhập tên lịch phỏng vấn"
                      v-model="InterviewSchedule.campaign_title"
                    />
                  </div>
                </div>
                <div class="grid grid-cols-3 gap-2 form-small">
                  <div>
                    <label for="" class="form-group-label"
                      >Ngày phỏng vấn</label
                    >
                    <div>
                      <date-picker
                        v-model="InterviewSchedule.date_start"
                      ></date-picker>
                    </div>
                  </div>
                  <div>
                    <label for="" class="form-group-label">Từ giờ</label>
                    <div>
                      <hour-picker
                        v-model="InterviewSchedule.time_start"
                      ></hour-picker>
                    </div>
                  </div>
                  <div>
                    <label for="" class="form-group-label">Đến giờ</label>
                    <div>
                      <hour-picker
                        v-model="InterviewSchedule.time_end"
                      ></hour-picker>
                    </div>
                  </div>
                </div>
                <div class="form-small">
                  <label for="" class="form-group-label">Người phỏng vấn</label>
                  <div>
                    <selector-view-vue
                      :Placeholder="'Tìm người phỏng vấn'"
                      :listOption="listInterviewer"
                      :listFinal="InterviewSchedule.view_ids"
                      :searchOption="loadInterviewer"
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
                  <label for="" class="form-group-label"
                    >Địa điểm phỏng vấn</label
                  >
                  <div>
                    <v-select
                      label="title"
                      :options="dataPlaceinterview"
                      :reduce="(place) => place.value"
                      placeholder="Chọn kinh nghiệm"
                      v-model="InterviewSchedule.room_id"
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
                Tên lịch phỏng vấn, Ngày phỏng vấn, Thời gian, Người phỏng vấn,
                Địa điểm phỏng vấn.
              </h2>
            </div>
          </div>
          <div title="Danh sách ứng viên tham gia">
            <h4
              class="form-section-title form-small cursor-pointer"
              @click="isCandidates = !isCandidates"
            >
              <span v-show="isCandidates == true">
                <i class="fas fa-chevron-down cursor-pointer"></i>
              </span>
              <span v-show="isCandidates == false"
                ><i class="fas fa-chevron-right cursor-pointer"></i
              ></span>
              Danh sách ứng viên tham gia
            </h4>
            <div v-show="isCandidates == true" class="form-small">
              <div
                class="w-full grid grid-cols-4 gap-2"
                v-if="InterviewSchedule.json_details?.length"
              >
                <div class="col-span-2">
                  <label for="" class="form-group-label">Họ và tên</label>
                </div>
                <div class="">
                  <label for="" class="form-group-label">Số điện thoại</label>
                </div>
                <div class="">
                  <label for="" class="form-group-label">Giờ phỏng vấn</label>
                </div>
              </div>
              <div
                class="flex items-center w-full"
                v-for="(candidate, index) in InterviewSchedule.json_details"
                :key="index"
                :name="index"
              >
                <div class="grid grid-cols-4 mt-1 gap-2">
                  <div class="col-span-2">
                    <v-select
                      label="fullName"
                      :options="listCandidate"
                      :reduce="(candidate) => candidate.id"
                      @option:selected="changeCandidate($event, index)"
                      placeholder="Nguyễn Văn A"
                      v-model="candidate.candidate_id"
                    ></v-select>
                  </div>
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="disabledInput"
                      disabled
                      placeholder="0987..."
                      :value="candidate.phone"
                    />
                  </div>
                  <div>
                    <hour-picker v-model="candidate.at"></hour-picker>
                  </div>
                </div>
                <div>
                  <i
                    class="fal fa-times icon-close"
                    @click="removeCandidate(index)"
                    style="margin-top: 15px"
                  ></i>
                </div>
              </div>
              <div class="my-2">
                <i
                  class="fal fa-plus-circle icon-plus"
                  @click="createCandidate()"
                ></i>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="createNewInterviewSchedule()">
            Cập nhật
          </button>
          <button
            class="button-close-modal"
            @click="handleCloseInterviewSchedule()"
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { useToast } from "vue-toastification";
import datePicker from "@/components/datePicker/datePicker.vue";
import hourPicker from "@/components/datePicker/hourPicker.vue";
import SelectorViewVue from "@/components/selector/SelectorView.vue";
import _ from "lodash";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
export default {
  data() {
    return {
      isInfor: true,
      isCandidates: true,
      listCandidate: [
        {
          id: 1,
          fullName: "Nguyễn Văn A",
          phone: "0987654322",
        },
        {
          id: 2,
          fullName: "Nguyễn Văn B",
          phone: "0987654333",
        },
        {
          id: 3,
          fullName: "Nguyễn Văn C",
          phone: "0987654444",
        },
        {
          id: 4,
          fullName: "Nguyễn Văn D",
          phone: "0987655555",
        },
      ],
    };
  },
  components: {
    datePicker,
    hourPicker,
    SelectorViewVue,
  },
  setup() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();
    const isOpenInterviewSchedule = ref(false);
    const InterviewSchedule = reactive({
      campaign_id: null,
      campaign_title: null,
      date_start: null,
      time_start: "00:00",
      time_end: "00:00",
      view_ids: [],
      room_id: null,
      json_details: [
        {
          candidate_id: null,
          phone: null,
          at: "00:00",
        },
      ],
    });
    const handleOpenInterviewSchedule = () => {
      isOpenInterviewSchedule.value = true;
    };
    const handleCloseInterviewSchedule = () => {
      isOpenInterviewSchedule.value = false;
    };
    const createCandidate = () => {
      const data = {
        candidate_id: null,
        phone: null,
        at: "00:00",
      };
      InterviewSchedule.json_details.push(data);
    };
    const removeCandidate = (index) => {
      InterviewSchedule.json_details.splice(index, 1);
    };
    const changeCandidate = (e, index) => {
      InterviewSchedule.json_details[index].phone = e.phone;
    };
    const loadCampaign = _.debounce((search, loading) => {
      if (search.length > 0) {
        loading(true);
        store.dispatch(
          "recruitmentInterview/SearchCampaignTodoInterviewAction",
          {
            search: search,
            loading,
          }
        );
      }
    }, 300);
    const loadInterviewer = _.debounce((event) => {
      store.dispatch(
        "recruitmentInterview/SearchInterviewerAction",
        event.target.value
      );
    }, 300);
    const listCampaignInterview = computed(
      () => store.state.recruitmentInterview.listCampaignInterview
    );
    const listInterviewer = computed(
      () => store.state.recruitmentInterview.listInterviewer
    );
    const dataPlaceinterview = computed(
      () => store.state.constant.dataPlaceinterview
    );
    const createNewInterviewSchedule = () => {
      const data = {
        campaign_id: InterviewSchedule.campaign_id,
        campaign_title: InterviewSchedule.campaign_title,
        date_start: InterviewSchedule.date_start,
        time_start: InterviewSchedule.time_start,
        time_end: InterviewSchedule.time_end,
        view_ids: InterviewSchedule.view_ids,
        room_id: InterviewSchedule.room_id,
        json_details: InterviewSchedule.json_details,
      };
      store.dispatch("recruitmentInterview/CreateRecruitmentInterviewAction", {
        data,
        toast,
        router,
        handleCloseInterviewSchedule,
      });
    };
    return {
      isOpenInterviewSchedule,
      InterviewSchedule,
      handleOpenInterviewSchedule,
      handleCloseInterviewSchedule,
      createCandidate,
      removeCandidate,
      createNewInterviewSchedule,
      changeCandidate,
      loadCampaign,
      listCampaignInterview,
      loadInterviewer,
      listInterviewer,
      dataPlaceinterview,
    };
  },
};
</script>

<style></style>
