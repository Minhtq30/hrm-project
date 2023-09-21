<template>
  <div class="w-[550px]">
    <h1 class="header-modal">tạo mới lịch phỏng vấn</h1>
    <div class="text-left px-4 py-2 max-h-[500px] overflow-auto format-scroll">
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
          Thông tin chung
        </h4>
        <Transition name="slide-up">
          <div v-show="isInfor == true">
            <div class="form-small">
              <label for="" class="form-group-label">Tên lịch phỏng vấn</label>
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập tên lịch phỏng vấn"
                  v-model="interviewDetail.title"
                />
              </div>
            </div>
            <div class="grid grid-cols-3 gap-2 form-small">
              <div>
                <label for="" class="form-group-label">Ngày phỏng vấn</label>
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
              <label for="" class="form-group-label">Địa điểm phỏng vấn</label>
              <div>
                <v-select
                  label="title"
                  :options="dataPlaceinterview"
                  :reduce="(place) => place.value"
                  placeholder="Chọn kinh nghiệm"
                  :searchable="false"
                  v-model="InterviewSchedule.room_id"
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
            Tên lịch phỏng vấn, Ngày phỏng vấn, Thời gian, Người phỏng vấn, Địa
            điểm phỏng vấn.
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
          <div class="w-full grid grid-cols-4 gap-2">
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
          <!-- <div
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
                <hour-picker></hour-picker>
              </div>
            </div>
            <div>
              <i
                class="fal fa-times icon-close"
                @click="removeCandidate(index)"
                style="margin-top: 15px"
              ></i>
            </div>
          </div> -->
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
      <button class="button-modal" @click="createNewInterview()">
        Cập nhật
      </button>
      <button class="button-close-modal" @click="handleCloseInterview()">
        Hủy bỏ
      </button>
    </div>
  </div>
</template>

<script>
import datePicker from "@/components/datePicker/datePicker.vue";
import hourPicker from "@/components/datePicker/hourPicker.vue";
import SelectorViewVue from "@/components/selector/SelectorView.vue";
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import _ from "lodash";
import { computed } from "@vue/runtime-core";
export default {
  data() {
    return {
      isInfor: true,
      isCandidates: true,
    };
  },
  props: {
    InterviewDetail: {
      type: Object,
    },
    closeInterview: {
      type: Function,
    },
  },
  components: {
    datePicker,
    hourPicker,
    SelectorViewVue,
  },
  setup(props) {
    const store = useStore();
    const interviewDetail = ref(props.InterviewDetail);
    const InterviewSchedule = reactive({
      title: props.InterviewDetail.title,
      date_start: null,
      time_start: "00:00",
      time_end: "00:00",
      view_ids: [],
      room_id: null,
    });
    const handleCloseInterview = () => {
      props.closeInterview();
    };
    const loadInterviewer = _.debounce((event) => {
      store.dispatch(
        "recruitmentInterview/SearchInterviewerAction",
        event.target.value
      );
    }, 300);
    const listInterviewer = computed(
      () => store.state.recruitmentInterview.listInterviewer
    );
    const dataPlaceinterview = computed(
      () => store.state.constant.dataPlaceinterview
    );
    const createNewInterview = () => {
      console.log(InterviewSchedule);
    };
    return {
      interviewDetail,
      InterviewSchedule,
      listInterviewer,
      loadInterviewer,
      dataPlaceinterview,
      handleCloseInterview,
      createNewInterview,
    };
  },
};
</script>

<style></style>
