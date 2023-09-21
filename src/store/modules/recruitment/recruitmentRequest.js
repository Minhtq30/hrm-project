import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  CreateRecruitmentRequestApi,
  DeleteRecruitmentRequestApi,
  getAllRecruitmentRequestApi,
  SearchRecruitmentRequestApi,
  ShowDetailRecruitmentRequestApi,
  UpdateRecruitmentRequestApi,
} from "@/api/ApiRecruitment/ApiRecruitmentRequest";

const state = () => {
  return {
    RequestDetail: {},
    listRecruitmentRequest: [],
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
  };
};

const mutations = {
  getAllRecruitmentRequestMutation(state, payload) {
    state.listRecruitmentRequest = payload.data;
    state.listPagination.current_page = payload.current_page;
    state.listPagination.last_page = payload.last_page;
    state.listPagination.next_page_url = payload.next_page_url;
    state.listPagination.prev_page_url = payload.prev_page_url;
    state.listPagination.total = payload.total;
    state.listPagination.from = payload.from;
    state.listPagination.to = payload.to;
  },
  ShowDetailRecruitmentRequestMutation(state, payload) {
    state.RequestDetail = payload.data;
  },
};

const actions = {
  async getAllRecruitmentRequestAction(context, { EndTimeLoading }) {
    getAllRecruitmentRequestApi()
      .then((payload) => {
        if (payload.data.status == "success") {
          context.commit("getAllRecruitmentRequestMutation", payload.data.data);
          EndTimeLoading();
        } else {
          EndTimeLoading();
        }
      })
      .catch((err) => {
        if (err.response.status == 403) {
          alert("Bạn không có quyền thực hiện chức năng này");
        }
        EndTimeLoading();
      });
  },
  async CreateRecruitmentRequestAction(
    context,
    { data, toast, router, ActivatedButton }
  ) {
    CreateRecruitmentRequestApi(data)
      .then((err) => {
        if (err.data.status == "create failed") {
          toast.error(err.data.messages);
          ActivatedButton();
        } else {
          toast.success("Tạo mới thành công!");
          router.push(`/recruitment-request/detail/${err.data.data.ID}`);
          ActivatedButton();
        }
      })
      .catch((err) => {
        console.log(err);
        ActivatedButton();
        {
          if (err.response.data.error.code)
            toast.error("Tài khoản đã tồn tại!");
        }
      });
  },
  async DeleteRecruitmentRequestAction(
    context,
    { id, route, router, toast, EndTimeLoading, handleCloseConfirm }
  ) {
    DeleteRecruitmentRequestApi(id)
      .then((res) => {
        if (res.status == "delete failed") {
          toast.error(res.messages);
          EndTimeLoading();
        } else {
          if (route.name == "Recruitment Request Detail") {
            router.push("/recruitment-request/all");
            EndTimeLoading();
          } else {
            context.dispatch("getAllRecruitmentRequestAction", {
              EndTimeLoading,
            });
          }
          toast.success("Xóa thành công");
          handleCloseConfirm();
        }
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
        handleCloseConfirm();
      });
  },
  async EditRecruitmentRequestAction(
    context,
    { data, toast, router, ActivatedButton }
  ) {
    UpdateRecruitmentRequestApi(data)
      .then((err) => {
        if (err.data.status != "update success") {
          toast.error(err.data.messages);
          ActivatedButton();
        } else {
          router.push(`/recruitment-request/detail/${data.ID}`);
          toast.success("Cập nhật thành công!");
          ActivatedButton();
        }
      })
      .catch((err) => {
        console.log(err);
        ActivatedButton();
        {
          if (err.response.data.error.code)
            toast.error("Tài khoản đã tồn tại!");
        }
      });
  },
  // Chi tiết
  async ShowDetailRecruitmentRequestAction(context, { id, EndTimeLoading }) {
    ShowDetailRecruitmentRequestApi(id)
      .then((payload) => {
        if (payload.data.status == "success") {
          context.commit("ShowDetailRecruitmentRequestMutation", payload.data);
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
  // Tìm kiếm
  async SearchRecruitmentRequestAction(context, search) {
    SearchRecruitmentRequestApi(search)
      .then((payload) => {
        if (payload.data.status == "success") {
          context.commit("getAllRecruitmentRequestMutation", payload.data.data);
        } else {
          console.log("a0");
        }
      })
      .catch((err) => {
        if (err.response.status == 403) {
          console.log("a!");
        }
      });
  },
  // Pagination
  async GetNextPageAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    NextPageApi(data, token)
      .then((payload) => {
        context.commit("getAllRecruitmentRequestMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async GetPrevPageAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    PrevPageApi(data, token)
      .then((payload) => {
        context.commit("getAllRecruitmentRequestMutation", payload);
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
