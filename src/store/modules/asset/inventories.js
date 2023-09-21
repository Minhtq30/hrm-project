import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  CreateInventoryApi,
  DeleteInventoryApi,
  getAllInventoriesApi,
  SearchInventoryApi,
  UpdateInventoryApi,
} from "@/api/asset/ApiInventory";
import token from "@/constants/TokenAuth";
const state = () => {
  return {
    listInventories: [],
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
  getAllInventoriesMutation(state, payload) {
    state.listInventories = payload.data;
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
  async getAllInventoriesAction(context, perPage) {
    getAllInventoriesApi(perPage, token)
      .then((data) => context.commit("getAllInventoriesMutation", data))
      .catch((err) => console.log(err));
  },
  async createInventoryAction(context, dataUrl) {
    CreateInventoryApi(dataUrl.data, token)
      .then(() => context.dispatch("getAllInventoriesAction", dataUrl.perPage))
      .catch((err) => console.log(err));
  },
  async DeleteInventoryAction(context, dataUrl) {
    DeleteInventoryApi(dataUrl.dataID, token)
      .then(() => context.dispatch("getAllInventoriesAction", dataUrl.perPage))
      .catch((err) => console.log(err));
  },
  async UpdateInventoryAction(context, dataUrl) {
    UpdateInventoryApi(dataUrl.data, token)
      .then(() => context.dispatch("getAllInventoriesAction", dataUrl.perPage))
      .catch((err) => console.log(err));
  },
  async SearchInventoryAction(context, data) {
    console.log(data);
    SearchInventoryApi(data, token)
      .then((payload) => context.commit("getAllInventoriesMutation", payload))
      .catch((err) => console.log(err));
  },
  async GetNextPageAction(context, data) {
    NextPageApi(data, token)
      .then((payload) => context.commit("getAllInventoriesMutation", payload))
      .catch((err) => console.log(err));
  },
  async GetPrevPageAction(context, data) {
    PrevPageApi(data, token)
      .then((payload) => context.commit("getAllInventoriesMutation", payload))
      .catch((err) => console.log(err));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
