import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  CreateTaxApi,
  DeleteTaxApi,
  getAllTaxsApi,
  UpdateTaxApi,
} from "@/api/asset/ApiTax";
import token from "@/constants/TokenAuth";
const state = () => {
  return {
    listTaxs: [],
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
  getAllTaxsMutation(state, payload) {
    state.listTaxs = payload.data.data;
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
  async getAllTaxsAction(context, perPage) {
    getAllTaxsApi(perPage, token)
      .then((data) => context.commit("getAllTaxsMutation", data))
      .catch((err) => console.log(err));
  },
  async createTaxAction(context, dataUrl) {
    CreateTaxApi(dataUrl.data, token)
      .then(() => context.dispatch("getAllTaxsAction", dataUrl.perPage))
      .catch((err) => console.log(err));
  },
  async DeleteTaxAction(context, dataUrl) {
    DeleteTaxApi(dataUrl.dataID, token)
      .then(() => context.dispatch("getAllTaxsAction", dataUrl.perPage))
      .catch((err) => console.log(err));
  },
  async UpdateTaxAction(context, dataUrl) {
    UpdateTaxApi(dataUrl.data, token)
      .then(() => context.dispatch("getAllTaxsAction", dataUrl.perPage))
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
