import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  CreateRecruitmentCandidateApi,
  DeleteRecruitmentCandidateApi,
  getAllRecruitmentCandidateApi,
  ShowDetailRecruitmentCandidateApi,
  UpdateRecruitmentCandidateApi,
} from "@/api/ApiRecruitment/ApiRecruitmentCandidate";
import token from "@/constants/TokenAuth";

const state = () => {
  return {
    listRecruitmentCandidate: [],
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
    CandidateDetail: {},
  };
};

const mutations = {
  ShowDetailRecruitmentCandidateMutation(state, payload) {
    state.CandidateDetail = payload.data;
  },
  getAllRecruitmentCandidateMutation(state, payload) {
    state.listRecruitmentCandidate = payload.data;
    state.listPagination.current_page = payload.current_page;
    state.listPagination.last_page = payload.last_page;
    state.listPagination.next_page_url = payload.next_page_url;
    state.listPagination.prev_page_url = payload.prev_page_url;
    state.listPagination.total = payload.total;
    state.listPagination.from = payload.from;
    state.listPagination.to = payload.to;
  },
};

const actions = {
  // Lấy tất cả danh sách ứng viên
  async getAllRecruitmentCandidateAction(context, { EndTimeLoading }) {
    getAllRecruitmentCandidateApi()
      .then((payload) => {
        if (payload.data.status == "success") {
          context.commit(
            "getAllRecruitmentCandidateMutation",
            payload.data.data
          );
          EndTimeLoading();
        } else {
          console.log("a0");
          EndTimeLoading();
        }
      })
      .catch((err) => {
        if (err.response.status == 403) {
          console.log("a!");
        }
        EndTimeLoading();
      });
  },
  async CreateRecruitmentCandidateAction(
    context,
    { data, toast, router, ActivatedButton }
  ) {
    CreateRecruitmentCandidateApi(data)
      .then((res) => {
        if (res.data.status == "failed") {
          toast.error(res.data.messages);
          ActivatedButton();
        } else {
          toast.success("Tạo mới thành công!");
          router.push(`/candidate-profile/detail/${res.data.data.ID}`);
          ActivatedButton();
        }
      })
      .catch((err) => {
        console.log(err);
        ActivatedButton();
      });
  },
  async DeleteRecruitmentCandidateAction(
    context,
    { id, toast, route, router, EndTimeLoading, handleCloseConfirm }
  ) {
    DeleteRecruitmentCandidateApi(id)
      .then((res) => {
        if (res.data.status == "delete success") {
          if (route.name == "Candidate Profile Detail") {
            router.push("/candidate-profile/all");
            EndTimeLoading();
          } else {
            context.dispatch("getAllRecruitmentCandidateAction", {
              EndTimeLoading,
            });
          }
          toast.success("Xóa thành công");
        } else {
          toast.error(res.data.messages);
        }
        handleCloseConfirm();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
        handleCloseConfirm();
      });
  },
  async EditRecruitmentCandidateAction(
    context,
    { data, toast, router, ActivatedButton }
  ) {
    UpdateRecruitmentCandidateApi(data)
      .then((res) => {
        if (res.data.status == "failed") {
          toast.error(res.data.messages);
          ActivatedButton();
        } else if (res.data.status == "update success") {
          // context.dispatch("getAllRecruitmentCandidateAction");
          toast.success("Cập nhật thành công!");
          router.push(`/candidate-profile/detail/${data.ID}`);
          ActivatedButton();
        }
      })
      .catch((err) => {
        console.log(err);
        ActivatedButton();
      });
  },
  // Chi tiết
  async ShowDetailRecruitmentCandidateAction(context, { id, EndTimeLoading }) {
    ShowDetailRecruitmentCandidateApi(id)
      .then((payload) => {
        if (payload.data.status == "success") {
          context.commit(
            "ShowDetailRecruitmentCandidateMutation",
            payload.data
          );
          EndTimeLoading();
        } else {
          console.log("Bạn không có quyền thực hiện chức năng này !!");
          EndTimeLoading();
        }
      })
      .catch((err) => {
        EndTimeLoading();
        if (err.response.status == 403) {
          console.log("Bạn không có quyền thực hiện chức năng này !!");
        }
      });
  },
  // Pagination
  async GetNextPageAction(context, { data, EndTimeLoading }) {
    NextPageApi(data, token)
      .then((payload) => {
        context.commit("getAllRecruitmentCandidateMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async GetPrevPageAction(context, { data, EndTimeLoading }) {
    PrevPageApi(data, token)
      .then((payload) => {
        context.commit("getAllRecruitmentCandidateMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
