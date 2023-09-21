import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  CreateAssetOriginApi,
  DeleteAssetOriginApi,
  getAllAssetOriginsApi,
  SearchAssetOriginsApi,
  UpdateAssetOriginApi,
} from "@/api/asset/ApiAssetOrigin";
import token from "@/constants/TokenAuth";
const state = () => {
  return {
    listAssetOrigins: [],
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
  getAllAssetOriginMutation(state, payload) {
    state.listAssetOrigins = payload.data;
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
  async getAllAssetOriginsAction(context, perPage) {
    getAllAssetOriginsApi(token, perPage)
      .then((data) => context.commit("getAllAssetOriginMutation", data))
      .catch((err) => console.log(err));
  },
  async createAssetOriginAction(context, { data, toast, handleCloseDetail }) {
    CreateAssetOriginApi(data, token)
      .then((res) => {
        if (res.success == true) {
          context.dispatch("getAllAssetOriginsAction", 25);
          toast.success("Tạo mới thành công");
          handleCloseDetail();
        }
      })
      .catch((err) => {
        if (err.response.data.success == false) {
          toast.error(err.response.data.message);
        }
      });
  },
  async DeleteAssetOriginAction(context, id) {
    DeleteAssetOriginApi(id, token)
      .then(() => context.dispatch("getAllAssetOriginsAction", 25))
      .catch((err) => console.log(err));
  },
  async UpdateAssetOriginAction(context, { data, toast, handleCloseUpdate }) {
    UpdateAssetOriginApi(data, token)
      .then(() => {
        context.dispatch("getAllAssetOriginsAction", 25);
        toast.success("Cập nhật thành công");
        handleCloseUpdate();
      })
      .catch((err) => console.log(err));
  },
  async SearchAssetOriginAction(context, search) {
    SearchAssetOriginsApi(token, search)
      .then((payload) => context.commit("getAllAssetOriginMutation", payload))
      .catch((err) => console.log(err));
  },
  async GetNextPageAction(context, data) {
    NextPageApi(data, token)
      .then((payload) => context.commit("getAllAssetOriginMutation", payload))
      .catch((err) => console.log(err));
  },
  async GetPrevPageAction(context, data) {
    PrevPageApi(data, token)
      .then((payload) => context.commit("getAllAssetOriginMutation", payload))
      .catch((err) => console.log(err));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
