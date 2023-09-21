import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  CreateUnitApi,
  DeleteUnitApi,
  getAllUnitsApi,
  UpdateUnitApi,
} from "@/api/asset/ApiUnit";
import token from "@/constants/TokenAuth";
const state = () => {
  return {
    listUnits: [],
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
  getAllUnitsMutation(state, payload) {
    state.listUnits = payload.data.data;
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
  async getAllUnitsAction(context, perPage) {
    getAllUnitsApi(perPage, token)
      .then((data) => context.commit("getAllUnitsMutation", data))
      .catch((err) => console.log(err));
  },
  async createUnitAction(context, dataUrl) {
    CreateUnitApi(dataUrl.data, token)
      .then(() => context.dispatch("getAllUnitsAction", dataUrl.perPage))
      .catch((err) => console.log(err));
  },
  async DeleteUnitAction(context, dataUrl) {
    DeleteUnitApi(dataUrl.dataID, token)
      .then(() => context.dispatch("getAllUnitsAction", dataUrl.perPage))
      .catch((err) => console.log(err));
  },
  async UpdateUnitAction(context, dataUrl) {
    UpdateUnitApi(dataUrl.data, token)
      .then(() => context.dispatch("getAllUnitsAction", dataUrl.perPage))
      .catch((err) => console.log(err));
  },
  async GetNextPageAction(context, data) {
    NextPageApi(data, token)
      .then((payload) => context.commit("getAllTaxsMutation", payload))
      .catch((err) => console.log(err));
  },
  async GetPrevPageAction(context, data) {
    PrevPageApi(data, token)
      .then((payload) => context.commit("getAllTaxsMutation", payload))
      .catch((err) => console.log(err));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
