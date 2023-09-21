import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  GetAllAllowancesApi,
  CreateAllowancesApi,
  UpdateAllowanceApi,
  DeleteAllowanceApi,
  SearchAllowancesApi,
  GetAllAllowancesEndTimeLoadingApi,
} from "@/api/ApiSettingPersonnel/ApiAllowance";
const state = () => {
  return {
    listAllowance: [],
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

const getters = {
  getAllAllowancesActive(state) {
    return state.listAllowance.filter((item) => item.active == 1);
  },
};

const mutations = {
  GetAllAllowancesMutation(state, payload) {
    state.listAllowance = payload.data.data;
    state.listPagination.current_page = payload.data.current_page;
    state.listPagination.last_page = payload.data.last_page;
    state.listPagination.next_page_url = payload.data.next_page_url;
    state.listPagination.prev_page_url = payload.data.prev_page_url;
    state.listPagination.total = payload.data.total;
    state.listPagination.from = payload.data.from;
    state.listPagination.to = payload.data.to;
  },
};

const actions = {
  async getAllAllowancesAction(context, data) {
    GetAllAllowancesApi(data)
      .then((payload) =>
        context.commit("GetAllAllowancesMutation", payload.data)
      )
      .catch((err) => console.log(err));
  },

  async getAllAllowancesEndTimeLoadingAction(context, { EndTimeLoading }) {
    GetAllAllowancesEndTimeLoadingApi()
      .then((payload) => {
        context.commit("GetAllAllowancesMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },

  async createAllowanceAction(
    context,
    { data, toast, handleCloseDetail, EndTimeLoading }
  ) {
    CreateAllowancesApi(data)
      .then((res) => {
        if (res?.data.status == "success") {
          context.dispatch("getAllAllowancesEndTimeLoadingAction", {
            EndTimeLoading,
          });
          toast.success("Tạo bản ghi mới thành công");
          handleCloseDetail();
        } else {
          toast.error("Tạo mới thất bại");
        }
      })
      .catch((err) => console.log(err));
  },
  async updateAllowanceAction(
    context,
    { data, toast, handleCloseUpdate, EndTimeLoading }
  ) {
    UpdateAllowanceApi(data)
      .then((res) => {
        if (res.data?.status == "success") {
          context.dispatch("getAllAllowancesEndTimeLoadingAction", {
            EndTimeLoading,
          });
          toast.success("Cập nhật thành công");
          handleCloseUpdate();
        } else {
          toast.error("Cập nhật thất bại");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async deleteAllowanceAction(
    context,
    { id, toast, handleCloseConfirm, EndTimeLoading }
  ) {
    DeleteAllowanceApi(id)
      .then((res) => {
        if (res.data?.status == "success") {
          context.dispatch("getAllAllowancesEndTimeLoadingAction", {
            EndTimeLoading,
          });
          toast.success("Xóa thành công");
          handleCloseConfirm();
        } else {
          toast.error("Xóa thật bại");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async SearchAllowancesAction(context, { search, EndTimeLoading }) {
    SearchAllowancesApi(search)
      .then((payload) => {
        context.commit("GetAllAllowancesMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async GetNextPageAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    NextPageApi(data, token)
      .then((payload) => {
        context.commit("GetAllAllowancesMutation", payload);
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
        context.commit("GetAllAllowancesMutation", payload);
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
  getters,
};
