import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  CreateContractTypeApi,
  DeleteContractTypeApi,
  GetAllContractTypeApi,
  GetAllContractTypeEndTimeLoadingApi,
  GetShowContractTypeApi,
  SearchContractTypeApi,
  UpdateContractTypeApi,
} from "@/api/ApiSettingPersonnel/ApiContractType";

const state = () => {
  return {
    listContractTypes: [],
    contractTypeDetail: {},
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
  GetAllContractTypeMutation(state, payload) {
    state.listContractTypes = payload.data.data;
    state.listPagination.current_page = payload.data.current_page;
    state.listPagination.last_page = payload.data.last_page;
    state.listPagination.next_page_url = payload.data.next_page_url;
    state.listPagination.prev_page_url = payload.data.prev_page_url;
    state.listPagination.total = payload.data.total;
    state.listPagination.from = payload.data.from;
    state.listPagination.to = payload.data.to;
  },
  GetShowContractTypeMutation(state, payload) {
    state.contractTypeDetail = payload.data;
  },
};
const getters = {
  listContractTypesOn(state) {
    return state.listContractTypes;
  },
};
const actions = {
  async GetAllContractTypeAction(context, data) {
    GetAllContractTypeApi(data)
      .then((payload) =>
        context.commit("GetAllContractTypeMutation", payload.data)
      )
      .catch((err) => console.log(err));
  },

  async GetAllContractTypeEndTimeLoadingAction(context, { EndTimeLoading }) {
    GetAllContractTypeEndTimeLoadingApi()
      .then((payload) => {
        context.commit("GetAllContractTypeMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },

  async createContractTypeAction(
    context,
    { data, toast, handleCloseDetail, EndTimeLoading }
  ) {
    CreateContractTypeApi(data)
      .then((res) => {
        if (res.data.status == "success") {
          context.dispatch("GetAllContractTypeEndTimeLoadingAction", {
            EndTimeLoading,
          });
          toast.success("Tạo mới thành công");
          handleCloseDetail();
        } else {
          toast.error(res.data.messages);
        }
      })
      .catch((err) => console.log(err));
  },
  async deleteContractTypeAction(
    context,
    { id, toast, handleCloseConfirm, EndTimeLoading }
  ) {
    DeleteContractTypeApi(id)
      .then(() => {
        context.dispatch("GetAllContractTypeEndTimeLoadingAction", {
          EndTimeLoading,
        });
        toast.success("Xóa thành công");
        handleCloseConfirm();
      })
      .catch((err) => console.log(err));
  },
  async updateContractTypeAction(
    context,
    { data, toast, handleCloseUpdate, EndTimeLoading }
  ) {
    UpdateContractTypeApi(data)
      .then((res) => {
        if (res.data?.status == "success") {
          context.dispatch("GetAllContractTypeEndTimeLoadingAction", {
            EndTimeLoading,
          });
          toast.success("Cập nhật thành công");
          handleCloseUpdate();
        } else {
          toast.error(res.data?.messages);
        }
      })
      .catch((err) => console.log(err));
  },
  async GetShowContractTypeAction(context, data) {
    GetShowContractTypeApi(data)
      .then((payload) =>
        context.commit("GetShowContractTypeMutation", payload.data)
      )
      .catch((err) => console.log(err));
  },
  async GetNextPageAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    NextPageApi(data, token)
      .then((payload) => {
        context.commit("GetAllContractTypeMutation", payload);
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
        context.commit("GetAllContractTypeMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async SearchContractTypeAction(context, data) {
    SearchContractTypeApi(data)
      .then((payload) =>
        context.commit("GetAllContractTypeMutation", payload.data)
      )
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
