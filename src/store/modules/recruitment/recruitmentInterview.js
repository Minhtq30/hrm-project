import { SearchPersonnelApi } from "@/api/ApiPersonnel/ApiPersonnel";
import { SearchRecruitmentCampaignApi } from "@/api/ApiRecruitment/ApiRecruitmentCampaign";
import {
  CreateRecruitmentInterviewApi,
  getAllRecruitmentInterviewApi,
} from "@/api/ApiRecruitment/ApiRecruitmentInterview";

const state = () => {
  return {
    listRecruitmentInterview: [],
    InterviewDetail: {},
    listCampaignInterview: [],
    listInterviewer: [],
  };
};

const mutations = {
  getAllRecruitmentInterviewMutation(state, payload) {
    state.listRecruitmentInterview = payload.data;
  },
  SearchCampaignTodoInterviewMutation(state, payload) {
    state.listCampaignInterview = payload.data;
  },
  SearchInterviewerMutation(state, payload) {
    state.listInterviewer = payload.data;
  },
};

const actions = {
  // Lấy danh sách tất cả lịch phỏng vấn
  async getAllRecruitmentInterviewAction(context, { EndTimeLoading }) {
    getAllRecruitmentInterviewApi()
      .then((payload) => {
        if (payload.data.status == "success") {
          context.commit(
            "getAllRecruitmentInterviewMutation",
            payload.data.data
          );
          EndTimeLoading();
        } else {
          console.log("a0");
          EndTimeLoading();
        }
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  // Tạo mới lịch phỏng vấn
  async CreateRecruitmentInterviewAction(
    context,
    { data, toast, router, handleCloseInterviewSchedule }
  ) {
    CreateRecruitmentInterviewApi(data)
      .then((err) => {
        if (err.data.status == "failed") {
          toast.error(err.data.messages);
        } else {
          toast.success("Tạo mới thành công!");
          router.push("/candidate-profile/all");
          handleCloseInterviewSchedule();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // Tìm kiếm chiến dịch để tạo lịch phỏng vấn
  async SearchCampaignTodoInterviewAction(context, { search, loading }) {
    SearchRecruitmentCampaignApi(search)
      .then((payload) => {
        if (payload.status == "success") {
          context.commit(
            "SearchCampaignTodoInterviewMutation",
            payload.data.data
          );
          loading(false);
        } else {
          loading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        loading(false);
      });
  },
  // Tìm kiếm người phỏng vấn
  async SearchInterviewerAction(context, data) {
    SearchPersonnelApi(data)
      .then((payload) =>
        context.commit("SearchInterviewerMutation", payload.data.data)
      )
      .catch((err) => console.log(err));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
