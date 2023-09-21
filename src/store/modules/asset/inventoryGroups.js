import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  CreateInventoryGroupApi,
  DeleteInventoryGroupApi,
  getAllInventoryGroupsApi,
  SearchInventoryGroupApi,
  UpdateInventoryGroupApi,
} from "@/api/asset/ApiInventoryGroup";
import token from "@/constants/TokenAuth";
const state = () => {
  return {
    listInventoryGroups: [],
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
  getAllInventoryGroupsMutation(state, payload) {
    state.listInventoryGroups = payload.data;
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
  async getAllInventoryGroupsAction(context, perPage) {
    getAllInventoryGroupsApi(perPage, token)
      .then((data) => context.commit("getAllInventoryGroupsMutation", data))
      .catch((err) => console.log(err));
  },
  async createInventoryGroupAction(context, dataUrl) {
    CreateInventoryGroupApi(dataUrl.data, token)
      .then(() =>
        context.dispatch("getAllInventoryGroupsAction", dataUrl.perPage)
      )
      .catch((err) => console.log(err));
  },
  async DeleteInventoryGroupAction(context, dataUrl) {
    DeleteInventoryGroupApi(dataUrl.dataID, token)
      .then(() =>
        context.dispatch("getAllInventoryGroupsAction", dataUrl.perPage)
      )
      .catch((err) => console.log(err));
  },
  async UpdateInventoryGroupAction(context, dataUrl) {
    UpdateInventoryGroupApi(dataUrl.data, token)
      .then(() =>
        context.dispatch("getAllInventoryGroupsAction", dataUrl.perPage)
      )
      .catch((err) => console.log(err));
  },
  async SearchInventoryGroupAction(context, data) {
    console.log(data);
    SearchInventoryGroupApi(data, token)
      .then((payload) =>
        context.commit("getAllInventoryGroupsMutation", payload)
      )
      .catch((err) => console.log(err));
  },
  async GetNextPageAction(context, data) {
    NextPageApi(data, token)
      .then((payload) =>
        context.commit("getAllInventoryGroupsMutation", payload)
      )
      .catch((err) => console.log(err));
  },
  async GetPrevPageAction(context, data) {
    PrevPageApi(data, token)
      .then((payload) =>
        context.commit("getAllInventoryGroupsMutation", payload)
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
