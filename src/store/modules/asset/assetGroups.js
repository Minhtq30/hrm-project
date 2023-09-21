import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  CreateAssetGroupApi,
  DeleteAssetGroupApi,
  // getAllAssetGroupsApi,
  getAllAssetTypesApi,
  getAllAssetGroupsApi1,
  // SearchAssetGroupApi,
  UpdateAssetGroupApi,
} from "@/api/asset/ApiAssetGroup";
import token from "@/constants/TokenAuth";
const state = () => {
  return {
    listAssetGroups: [],
    listAssetGroups1: [],
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
  getAllAssetGroupsMutation(state, payload) {
    state.listAssetGroups = payload.data;
    state.listPagination.current_page = payload.meta.current_page;
    state.listPagination.last_page = payload.meta.last_page;
    state.listPagination.next_page_url = payload.links.next;
    state.listPagination.prev_page_url = payload.links.prev;
    state.listPagination.total = payload.meta.total;
    state.listPagination.from = payload.meta.from;
    state.listPagination.to = payload.meta.to;
  },
  getAllAssetTypesMutation(state, payload) {
    state.listAssetTypes = payload.data;
  },
  getAllAssetGroupsMutation1(state, payload) {
    state.listAssetGroups1 = payload.data;
  },
};

const actions = {
  async getAllAssetGroupsAction(context) {
    getAllAssetGroupsApi1(token)
      .then((data) => context.commit("getAllAssetGroupsMutation1", data))
      .catch((err) => console.log(err));
  },
  async getAllAssetTypesAction(context, perPage) {
    getAllAssetTypesApi(perPage, token)
      .then((data) => context.commit("getAllAssetTypesMutation", data))
      .catch((err) => console.log(err));
  },
  async createAssetGroupAction(context, dataUrl) {
    CreateAssetGroupApi(dataUrl.data, token)
      .then(() => context.dispatch("getAllAssetGroupsAction", dataUrl.perPage))
      .catch((err) => console.log(err));
  },
  async DeleteAssetGroupAction(context, dataUrl) {
    DeleteAssetGroupApi(dataUrl.dataID, token)
      .then(() => context.dispatch("getAllAssetGroupsAction", dataUrl.perPage))
      .catch((err) => console.log(err));
  },
  async UpdateAssetGroupAction(context, dataUrl) {
    UpdateAssetGroupApi(dataUrl.data, token)
      .then(() => context.dispatch("getAllAssetGroupsAction", dataUrl.perPage))
      .catch((err) => console.log(err));
  },
  // async SearchAssetGroupAction(context, data) {
  //   console.log(data);
  //   SearchAssetGroupApi(data, token)
  //     .then((payload) => context.commit("getAllAssetGroupsMutation", payload))
  //     .catch((err) => console.log(err));
  // },
  async GetNextPageAction(context, data) {
    NextPageApi(data, token)
      .then((payload) => context.commit("getAllAssetGroupsMutation", payload))
      .catch((err) => console.log(err));
  },
  async GetPrevPageAction(context, data) {
    PrevPageApi(data, token)
      .then((payload) => context.commit("getAllAssetGroupsMutation", payload))
      .catch((err) => console.log(err));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
