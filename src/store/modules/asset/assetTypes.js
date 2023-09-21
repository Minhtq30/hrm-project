import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  CreateAssetTypeApi,
  DeleteAssetTypeApi,
  getAllAssetTypesApi,
  SearchAssetTypesApi,
  UpdateAssetTypeApi,
} from "@/api/asset/ApiAssetType";
import token from "@/constants/TokenAuth";
const state = () => {
  return {
    listAssetTypes: [],
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
  getAllAssetTypesMutation(state, payload) {
    state.listAssetTypes = payload.data;
    state.listPagination.current_page = payload.meta.current_page;
    state.listPagination.last_page = payload.meta.last_page;
    state.listPagination.next_page = payload.links.next;
    state.listPagination.prev_page = payload.links.prev;
    state.listPagination.total = payload.meta.total;
    state.listPagination.from = payload.meta.from;
    state.listPagination.to = payload.meta.to;
  },
};

const actions = {
  async getAllAssetTypesAction(context, perPage) {
    getAllAssetTypesApi(perPage, token)
      .then((data) => context.commit("getAllAssetTypesMutation", data))
      .catch((err) => console.log(err));
  },
  async createAssetTypeAction(context, { data, toast, handleCloseDetail }) {
    CreateAssetTypeApi(data, token)
      .then(() => {
        context.dispatch("getAllAssetTypesAction", 25);
        toast.success("Tạo mới thành công");
        handleCloseDetail();
      })
      .catch((err) => {
        if (err.response.data.success == false) {
          toast.error(err.response.data.message);
        }
      });
  },
  async DeleteAssetTypeAction(context, dataUrl) {
    DeleteAssetTypeApi(dataUrl.dataID, token)
      .then(() => context.dispatch("getAllAssetTypesAction", dataUrl.perPage))
      .catch((err) => console.log(err));
  },
  async UpdateAssetTypeAction(context, dataUrl) {
    UpdateAssetTypeApi(dataUrl.data, token)
      .then(() => context.dispatch("getAllAssetTypesAction", dataUrl.perPage))
      .catch((err) => console.log(err));
  },
  async SearchAssetTypeAction(context, search) {
    SearchAssetTypesApi(token, search)
      .then((payload) => context.commit("getAllAssetTypesMutation", payload))
      .catch((err) => console.log(err));
  },
  async GetNextPageAction(context, data) {
    NextPageApi(data, token)
      .then((payload) => context.commit("getAllAssetTypesMutation", payload))
      .catch((err) => console.log(err));
  },
  async GetPrevPageAction(context, data) {
    PrevPageApi(data, token)
      .then((payload) => context.commit("getAllAssetTypesMutation", payload))
      .catch((err) => console.log(err));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
