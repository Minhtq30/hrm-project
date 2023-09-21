import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  CreateCurrencyApi,
  DeleteCurrencyApi,
  getAllCurrenciesApi,
  UpdateCurrencyApi,
} from "@/api/asset/ApiCurrency";
import token from "@/constants/TokenAuth";
const state = () => {
  return {
    listCurrencies: [],
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
    },
  };
};

const mutations = {
  getAllCurrenciesMutation(state, payload) {
    state.listCurrencies = payload.data.data;
    (state.listPagination.current_page = payload.data.current_page),
      (state.listPagination.last_page = payload.data.last_page),
      (state.listPagination.next_page_url = payload.data.next_page_url),
      (state.listPagination.prev_page_url = payload.data.prev_page_url);
  },
};

const actions = {
  async getAllCurrenciesAction(context, perPage) {
    getAllCurrenciesApi(perPage, token)
      .then((data) => context.commit("getAllCurrenciesMutation", data))
      .catch((err) => console.log(err));
  },
  async createCurrencyAction(context, dataUrl) {
    CreateCurrencyApi(dataUrl.data, token)
      .then(() => context.dispatch("getAllCurrenciesAction", dataUrl.perPage))
      .catch((err) => console.log(err));
  },
  async DeleteCurrencyAction(context, dataUrl) {
    DeleteCurrencyApi(dataUrl.dataID, token)
      .then(() => context.dispatch("getAllCurrenciesAction", dataUrl.perPage))
      .catch((err) => console.log(err));
  },
  async UpdateCurrencyAction(context, dataUrl) {
    UpdateCurrencyApi(dataUrl.data, token)
      .then(() => context.dispatch("getAllCurrenciesAction", dataUrl.perPage))
      .catch((err) => console.log(err));
  },
  async GetNextPageAction(context, data) {
    NextPageApi(data, token)
      .then((payload) => context.commit("getAllCurrenciesMutation", payload))
      .catch((err) => console.log(err));
  },
  async GetPrevPageAction(context, data) {
    PrevPageApi(data, token)
      .then((payload) => context.commit("getAllCurrenciesMutation", payload))
      .catch((err) => console.log(err));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
