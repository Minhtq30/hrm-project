import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  CreateWorkTypeApi,
  DeleteWorkTypeApi,
  GetAllWorkTypeApi,
  GetAllWorkTypeEndTimeLoadingApi,
  SearchWorkTypeApi,
  UpdateWorkTypeApi,
} from "@/api/ApiSettingPersonnel/ApiWorkTpye";

const state = () => {
  return {
    listWorkTypes: [],
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
  GetAllWorkTypeActive(state) {
    return state.listWorkTypes.filter((item) => item.status == 1);
  },
};

const mutations = {
  GetAllWorkTypeMutation(state, payload) {
    state.listWorkTypes = payload.data.data;
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
  async GetAllWorkTypeAction(context, data) {
    GetAllWorkTypeApi(data)
      .then((payload) => context.commit("GetAllWorkTypeMutation", payload.data))
      .catch((err) => console.log(err));
  },

  async GetAllWorkTypeEndTimeLoadingAction(context, { EndTimeLoading }) {
    GetAllWorkTypeEndTimeLoadingApi()
      .then((payload) => {
        context.commit("GetAllWorkTypeMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },

  async createWorkTypeAction(
    context,
    { data, toast, handleCloseDetail, EndTimeLoading }
  ) {
    CreateWorkTypeApi(data)
      .then((res) => {
        if (res.data.status == "success") {
          context.dispatch("GetAllWorkTypeEndTimeLoadingAction", {
            EndTimeLoading,
          }),
            toast.success("Tạo mới thành công");
          handleCloseDetail();
        } else {
          toast.error(res.data.messages);
        }
      })
      .catch((err) => console.log(err));
  },
  async deleteWorkTypeAction(
    context,
    { data, toast, handleCloseConfirm, EndTimeLoading }
  ) {
    DeleteWorkTypeApi(data)
      .then(() => {
        context.dispatch("GetAllWorkTypeEndTimeLoadingAction", {
          EndTimeLoading,
        });
        toast.success("Xóa thành công");
        handleCloseConfirm();
      })
      .catch((err) => console.log(err));
  },
  async updateWorkTypeAction(
    context,
    { data, toast, handleCloseUpdate, EndTimeLoading }
  ) {
    UpdateWorkTypeApi(data)
      .then((res) => {
        if (res.data?.status == "success") {
          context.dispatch("GetAllWorkTypeEndTimeLoadingAction", {
            EndTimeLoading,
          }),
            toast.success("Tạo mới thành công");
          handleCloseUpdate();
        } else {
          toast.error(res.data?.messages);
        }
      })
      .catch((err) => console.log(err));
  },
  async GetNextPageAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    NextPageApi(data, token)
      .then((payload) => {
        context.commit("GetAllWorkTypeMutation", payload);
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
        context.commit("GetAllWorkTypeMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async SearchWorkTypeAction(context, data) {
    SearchWorkTypeApi(data)
      .then((payload) => context.commit("GetAllWorkTypeMutation", payload.data))
      .catch((err) => console.log(err));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
