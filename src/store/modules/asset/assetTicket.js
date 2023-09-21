import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  CreateAssetTicketApi,
  DeleteAssetTicketApi,
  getAllAssetTicketApi,
  getAllAssetTicketTypeApi,
  getAllAssetTicketStatusApi,
  SearchAssetApi,
  SearchPersonTicketApi,
  UpdateAssetTicketApi,
  getAssetByIdApi,
  getAssetTicketByIdApi,
} from "@/api/asset/ApiAssetTicket";
import token from "@/constants/TokenAuth";
const state = () => {
  return {
    listAssetTickets: [],
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
    },
    listAsset: [],
    listPerson: [],
    listTicketType: [],
    listTicketStatus: [],
    listAssetById: [],
    getDataTicketById: [],
    deleteStatus: [],
  };
};
const mutations = {
  getAllAssetTicketMutation(state, payload) {
    state.listAssetTicket = payload.data;
    state.listPagination.current_page = payload.meta.current_page;
    state.listPagination.last_page = payload.meta.last_page;
    state.listPagination.next_page_url = payload.links.next;
    state.listPagination.prev_page_url = payload.links.prev;
    state.listPagination.total = payload.meta.total;
    state.listPagination.from = payload.meta.from;
    state.listPagination.to = payload.meta.to;
    state.isLoading = false;
  },
  getAllAssetMutation(state, payload) {
    state.listAsset = payload.data;
  },
  getAllPersonMutation(state, payload) {
    state.listPerson = payload;
  },
  getAllTicketTypeMutation(state, payload) {
    state.listTicketType = payload;
  },
  getAllTicketStatusMutation(state, payload) {
    state.listTicketStatus = payload;
  },
  getAssetByIdMutation(state, payload) {
    state.listAssetById = payload.data;
  },
  getTicketByIdMutation(state, payload) {
    state.getDataTicketById = payload.data;
  },
  deleteMutation(state, payload) {
    state.deleteStatus = payload.data;
  },
};
const actions = {
  async getAllAssetTicketAction(context, params) {
    getAllAssetTicketApi(params, token)
      .then((data) => context.commit("getAllAssetTicketMutation", data))
      .catch((err) => console.log(err));
  },
  async getAllAssetTicketTypeAction(context, dataUrl) {
    getAllAssetTicketTypeApi(token, dataUrl)
      .then((data) => context.commit("getAllTicketTypeMutation", data))
      .catch((err) => console.log(err));
  },
  async getTicketByIdAction(context, { id, store, EndLoading }) {
    getAssetTicketByIdApi(token, id)
      .then((data) => {
        store.dispatch(
          "asset/SearchPersonAction",
          data.data?.user_assignment_name
        );
        store.dispatch(
          "asset/SearchPersonAction2",
          data.data?.user_assign_name
        );
        store.dispatch("asset/SearchSupplierAction", "");
        store.dispatch("asset/getDataAssetByIdAction", {
          id: data.data.assets[0]?.id,
          store,
          EndLoading: EndLoading,
        });
        context.commit("getTicketByIdMutation", data);
      })
      .catch((err) => console.log(err));
  },
  async getAllAssetTicketStatusAction(context) {
    getAllAssetTicketStatusApi(token)
      .then((data) => context.commit("getAllTicketStatusMutation", data))
      .catch((err) => console.log(err));
  },
  async getAssetByIdAction(context, id) {
    getAssetByIdApi(id, token)
      .then((data) => context.commit("getAssetByIdMutation", data))
      .catch((err) => console.log(err));
  },
  async createAssetTicketAction(
    context,
    { dataUrl, toast, EndLoading, store }
  ) {
    CreateAssetTicketApi(dataUrl.data, token)
      .then((res) => {
        if (res.success == false) {
          toast.error(res.messages);
        } else {
          store.dispatch("asset/getDataAssetByIdAction", {
            id: dataUrl.id,
            store,
          });
          store.dispatch("asset/getAssetHistoryAction", { id: dataUrl.id });
          store.dispatch("asset/getAllAssetAction", {
            perPage: dataUrl.perPage,
            EndLoading: EndLoading,
          });
          context.dispatch("getAllAssetTicketAction", dataUrl.perPage);
          toast.success("Thêm mới phiếu thành công");
          EndLoading();
        }
      })
      .catch((res) => {
        if (res.response.data.status == "422") {
          toast.error("Lỗi không nhập đủ các trường bắt buộc");
        }
      });
  },
  async DeleteAssetTicketAction(context, dataUrl) {
    DeleteAssetTicketApi(dataUrl.dataID, token)
      .then(() => context.dispatch("deleteMutation", dataUrl.perPage))
      .catch((err) => console.log(err));
  },
  async UpdateAssetTicketAction(context, { dataUrl, toast }) {
    UpdateAssetTicketApi(dataUrl.data, token)
      .then((res) => {
        if (res.success == false) {
          toast.error(res.messages);
        } else {
          context.dispatch("getAllAssetTicketAction", dataUrl);
          toast.success("Cập nhật phiếu thành công");
        }
      })
      .catch((res) => {
        if (res.response.data.status == "422") {
          toast.error("Lỗi không nhập đủ các trường bắt buộc");
        }
      });
  },
  async SearchAssetAction(context, data) {
    SearchAssetApi(data, token)
      .then((payload) => context.commit("getAllAssetMutation", payload))
      .catch((err) => console.log(err));
  },
  async SearchPersonTicketAction(context, data) {
    SearchPersonTicketApi(data, token)
      .then((payload) => context.commit("getAllPersonMutation", payload))
      .catch((err) => console.log(err));
  },
  async GetNextPageAction(context, data) {
    const EndTimeLoading = data.EndTimeLoading;
    NextPageApi(data, token)
      .then((payload) => {
        context.commit("getAllAssetTicketMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => console.log(err));
  },
  async GetPrevPageAction(context, data) {
    PrevPageApi(data, token)
      .then((payload) => context.commit("getAllAssetTicketMutation", payload))
      .catch((err) => console.log(err));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
