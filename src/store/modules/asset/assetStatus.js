import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  CreateAssetStatusApi,
  DeleteAssetStatusApi,
  getAllAssetStatusApi,
  // SearchAssetStatusApi,
  UpdateAssetStatusApi,
} from "@/api/asset/ApiAssetStatus";
import token from "@/constants/TokenAuth";
const state = () => {
  return {
    listAssetStatuss: [],
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
  getAllAssetStatusMutation(state, payload) {
    state.listAssetStatus = payload.data;
    state.listPagination.current_page = payload.meta.current_page;
    state.listPagination.last_page = payload.meta.last_page;
    state.listPagination.next_page_url = payload.links.next;
    state.listPagination.prev_page_url = payload.links.prev;
    state.listPagination.total = payload.meta.total;
    state.listPagination.from = payload.meta.from;
    state.listPagination.to = payload.meta.to;
  },
};

const actions = {
  async getAllAssetStatusAction(context, perPage) {
    getAllAssetStatusApi(perPage, token)
      .then((data) => context.commit("getAllAssetStatusMutation", data))
      .catch((err) => console.log(err));
  },
  async createAssetStatusAction(context, { data, toast, handleCloseDetail }) {
    CreateAssetStatusApi(data, token)
      .then(() => {
        context.dispatch("getAllAssetStatusAction", 25);
        toast.success("Tạo mới thành công");
        handleCloseDetail();
      })
      .catch((err) => {
        if (err.response.data.success == false) {
          toast.error(err.response.data.message);
        }
      });
  },
  async DeleteAssetStatusAction(context, dataUrl) {
    DeleteAssetStatusApi(dataUrl.dataID, token)
      .then(() => context.dispatch("getAllAssetStatusAction", dataUrl.perPage))
      .catch((err) => console.log(err));
  },
  async UpdateAssetStatusAction(context, { data, toast, handleCloseUpdate }) {
    UpdateAssetStatusApi(data, token)
      .then(() => {
        context.dispatch("getAllAssetStatusAction", 25);
        toast.success("Cập nhật thành công thành công");
        handleCloseUpdate();
      })
      .catch((err) => console.log(err));
  },
  // async SearchAssetStatusAction(context, data) {
  //   console.log(data);
  //   SearchAssetStatusApi(data, token)
  //     .then((payload) => context.commit("getAllAssetStatusMutation", payload))
  //     .catch((err) => console.log(err));
  // },
  async GetNextPageAction(context, data) {
    NextPageApi(data, token)
      .then((payload) => context.commit("getAllAssetStatusMutation", payload))
      .catch((err) => console.log(err));
  },
  async GetPrevPageAction(context, data) {
    PrevPageApi(data, token)
      .then((payload) => context.commit("getAllAssetStatusMutation", payload))
      .catch((err) => console.log(err));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
