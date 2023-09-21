import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  CreateAssetApi,
  DeleteAssetApi,
  getAllAssetApi,
  SearchAssetApi,
  SearchPersonApi,
  SearchAssetTypeApi,
  SearchAssetOriginApi,
  SearchSupplierApi,
  SearchLocationApi,
  SearchAssetStatusApi,
  UpdateAssetApi,
  getAssetByStatusApi,
  getAllPersonApi,
  getAssetByIdApi,
  getAssetHistoryApi,
  countAssetByStatusApi,
  getAllReductionByYearApi,
  getAllReductionApi,
  getReductionByIdApi,
  SearchAssetMultiFieldApi,
  ImportAssetsApi,
} from "@/api/asset/ApiAsset";
import token from "@/constants/TokenAuth";
const state = () => {
  return {
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
    listPaginationUsing: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
    listPaginationUnused: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      from: 0,
      to: 0,
      total: 0,
    },
    listPaginationLost: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
    },
    listPaginationRepair: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
    },
    listPaginationBroken: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
    },
    listPaginationReductionByYear: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
    },
    listPaginationReduction: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
    },
    listAsset: [],
    listPerson: [],
    listPerson2: [],
    listAssetType: [],
    listAssetOrigin: [],
    listSupplier: [],
    listLocation: [],
    listAssetByStatus: [],
    listAssetUsing: [],
    listAssetUnused: [],
    listAssetLost: [],
    listAssetRepair: [],
    listAssetBroken: [],
    listAssetStatus: [],
    listAllPerson: [],
    dataAssetById: [],
    listAssetHistory: [],
    countAssetByStatus: [],
    listReductionByYear: [],
    listReduction: [],
    listReductionById: [],
  };
};
const mutations = {
  getAllAssetMutation(state, payload) {
    state.listAsset = payload.data;
    state.listAsset.total = payload.meta.total;
    state.listPagination.current_page = payload.meta.current_page;
    state.listPagination.last_page = payload.meta.last_page;
    state.listPagination.next_page_url = payload.links.next;
    state.listPagination.prev_page_url = payload.links.prev;
    state.listPagination.total = payload.meta.total;
    state.listPagination.from = payload.meta.from;
    state.listPagination.to = payload.meta.to;
  },
  getAssetByStatusMutation(state, payload) {
    state.listAssetByStatus = payload.data;
    state.listAssetByStatus.total = payload.meta.total;
    state.listPagination.current_page = payload.meta.current_page;
    state.listPagination.last_page = payload.meta.last_page;
    state.listPagination.next_page_url = payload.links.next;
    state.listPagination.prev_page_url = payload.links.prev;
    state.listPagination.total = payload.meta.total;
    state.listPagination.from = payload.meta.from;
    state.listPagination.to = payload.meta.to;
  },
  getAssetUsingMutation(state, payload) {
    state.listAssetUsing = payload.data;
    state.listAssetUsing.total = payload.meta.total;
    state.listPaginationUsing.current_page = payload.meta.current_page;
    state.listPaginationUsing.last_page = payload.meta.last_page;
    state.listPaginationUsing.next_page_url = payload.links.next;
    state.listPaginationUsing.prev_page_url = payload.links.prev;
    state.listPaginationUsing.total = payload.meta.total;
    state.listPaginationUsing.from = payload.meta.from;
    state.listPaginationUsing.to = payload.meta.to;
  },
  getAssetUnusedMutation(state, payload) {
    state.listAssetUnused = payload.data;
    state.listAssetUnused.total = payload.meta.total;
    state.listPaginationUnused.current_page = payload.meta.current_page;
    state.listPaginationUnused.last_page = payload.meta.last_page;
    state.listPaginationUnused.next_page_url = payload.links.next;
    state.listPaginationUnused.prev_page_url = payload.links.prev;
    state.listPaginationUnused.total = payload.meta.total;
    state.listPaginationUnused.from = payload.meta.from;
    state.listPaginationUnused.to = payload.meta.to;
  },
  getAssetLostMutation(state, payload) {
    state.listAssetLost = payload.data;
    state.listAssetLost.total = payload.meta.total;
    state.listPaginationLost.current_page = payload.meta.current_page;
    state.listPaginationLost.last_page = payload.meta.last_page;
    state.listPaginationLost.next_page_url = payload.links.next;
    state.listPaginationLost.prev_page_url = payload.links.prev;
    state.listPaginationLost.from = payload.meta.from;
    state.listPaginationLost.to = payload.meta.to;
  },
  getAssetRepairMutation(state, payload) {
    state.listAssetRepair = payload.data;
    state.listAssetRepair.total = payload.meta.total;
    state.listPaginationRepair.current_page = payload.meta.current_page;
    state.listPaginationRepair.last_page = payload.meta.last_page;
    state.listPaginationRepair.next_page_url = payload.links.next;
    state.listPaginationRepair.prev_page_url = payload.links.prev;
    state.listPaginationRepair.from = payload.meta.from;
    state.listPaginationRepair.to = payload.meta.to;
  },
  getAssetBrokenMutation(state, payload) {
    state.listAssetBroken = payload.data;
    state.listAssetBroken.total = payload.meta.total;
    state.listPaginationBroken.current_page = payload.meta.current_page;
    state.listPaginationBroken.last_page = payload.meta.last_page;
    state.listPaginationBroken.next_page_url = payload.links.next;
    state.listPaginationBroken.prev_page_url = payload.links.prev;
    state.listPaginationBroken.from = payload.meta.from;
    state.listPaginationBroken.to = payload.meta.to;
  },
  getReductionByYearMutation(state, payload) {
    state.listReductionByYear = payload.data;
    state.listPaginationReductionByYear.current_page =
      payload.meta.current_page;
    state.listPaginationReductionByYear.last_page = payload.meta.last_page;
    state.listPaginationReductionByYear.next_page_url = payload.links.next;
    state.listPaginationReductionByYear.prev_page_url = payload.links.prev;
    state.listPaginationReductionByYear.from = payload.meta.from;
    state.listPaginationReductionByYear.to = payload.meta.to;
  },
  getReductionMutation(state, payload) {
    state.listReduction = payload.data;
    state.listPaginationReduction.current_page = payload.meta.current_page;
    state.listPaginationReduction.last_page = payload.meta.last_page;
    state.listPaginationReduction.next_page_url = payload.links.next;
    state.listPaginationReduction.prev_page_url = payload.links.prev;
    state.listPaginationReduction.total = payload.meta.total;
    state.listPaginationReduction.from = payload.meta.from;
    state.listPaginationReduction.to = payload.meta.to;
  },
  getReductionByIdMutation(state, payload) {
    state.listReductionById = payload.data;
  },
  getPersonMutation(state, payload) {
    state.listPerson = payload;
  },
  getPersonMutation2(state, payload) {
    state.listPerson2 = payload;
  },
  getAllAssetTypeMutation(state, payload) {
    state.listAssetType = payload.data;
  },
  getAllAssetStatusMutation(state, payload) {
    state.listAssetStatus = payload.data;
  },
  getAllAssetOriginMutation(state, payload) {
    state.listAssetOrigin = payload.data;
  },
  getAllSupplierMutation(state, payload) {
    state.listSupplier = payload.data;
  },
  getAllLocationMutation(state, payload) {
    state.listLocation = payload.data;
  },
  getAllPersonMutation(state, payload) {
    state.listAllPerson = payload.data.data;
  },
  getDataAssetByIdMutation(state, payload) {
    state.dataAssetById = payload.data;
  },
  getAssetHistoryMutation(state, payload) {
    state.listAssetHistory = payload;
  },
  countAssetByStatusMutation(state, payload) {
    state.countAssetByStatus = payload;
  },
};

const actions = {
  async getAllAssetAction(context, { perPage, EndLoading }) {
    getAllAssetApi(perPage, token)
      .then((data) => {
        context.commit("getAllAssetMutation", data);
        EndLoading();
      })
      .catch((err) => {
        console.log(err);
        EndLoading();
      });
  },
  async getAssetByStatusAction(context, dataurl) {
    getAssetByStatusApi(dataurl.perPage, dataurl.status, token)
      .then((data) => context.commit("getAssetByStatusMutation", data))
      .catch((err) => console.log(err));
  },
  async getAssetUsingAction(context, dataurl) {
    getAssetByStatusApi(dataurl.perPage, dataurl.status, token)
      .then((data) => context.commit("getAssetUsingMutation", data))
      .catch((err) => console.log(err));
  },
  async getAssetUnusedAction(context, dataurl) {
    console.log(dataurl);
    getAssetByStatusApi(dataurl.perPage, dataurl.status, token)
      .then((data) => context.commit("getAssetUnusedMutation", data))
      .catch((err) => console.log(err));
  },
  async countAssetByStatusAction(context) {
    countAssetByStatusApi(token)
      .then((data) => context.commit("countAssetByStatusMutation", data))
      .catch((err) => console.log(err));
  },
  async getAssetLostAction(context, dataurl) {
    getAssetByStatusApi(dataurl.perPage, dataurl.status, token)
      .then((data) => context.commit("getAssetLostMutation", data))
      .catch((err) => console.log(err));
  },
  async getAssetRepairAction(context, dataurl) {
    getAssetByStatusApi(dataurl.perPage, dataurl.status, token)
      .then((data) => context.commit("getAssetRepairMutation", data))
      .catch((err) => console.log(err));
  },
  async getAssetBrokenAction(context, dataurl) {
    getAssetByStatusApi(dataurl.perPage, dataurl.status, token)
      .then((data) => context.commit("getAssetBrokenMutation", data))
      .catch((err) => console.log(err));
  },
  async getAssetHistoryAction(context, assetId) {
    getAssetHistoryApi(token, assetId.id)
      .then((data) => context.commit("getAssetHistoryMutation", data))
      .catch((err) => console.log(err));
  },
  async getAllPersonAction(context) {
    getAllPersonApi(token)
      .then((data) => context.commit("getAllPersonMutation", data))
      .catch((err) => console.log(err));
  },
  async getDataAssetByIdAction(context, { id, store, EndLoading }) {
    getAssetByIdApi(token, id)
      .then((data) => {
        context.commit("getDataAssetByIdMutation", data);
        store.dispatch("asset/SearchAssetTypeAction", "");
        store.dispatch("asset/SearchAssetOriginAction", "");
        store.dispatch("asset/SearchSupplierAction", "");
        store.dispatch("asset/SearchLocationAction", "");
        store.dispatch("departments/getAllDepartmentsAction");
        EndLoading();
      })
      .catch((err) => console.log(err));
  },
  async createAssetAction(
    context,
    { dataUrl, toast, EndLoading, store, router }
  ) {
    CreateAssetApi(dataUrl.data, token)
      .then((res) => {
        if (res.success == false) {
          toast.error(res.messages);
        } else {
          context.dispatch("getAllAssetAction", {
            perPage: dataUrl.perPage,
            EndLoading: EndLoading,
          });
          store.dispatch("asset/countAssetByStatusAction");
          // store.dispatch("asset/getDataAssetByIdAction", {
          //   id: res.data?.id,
          //   store,
          // });
          toast.success("Thêm mới tài sản thành công");
          router.push({
            path: `/asset-view/${res.data?.id}`,
          });
        }
      })
      .catch((res) => {
        if (res.response.data.status == "422") {
          toast.error("Lỗi không nhập đủ các trường bắt buộc");
        }
      });
  },
  async DeleteAssetAction(context, { dataUrl, toast, EndLoading, store }) {
    DeleteAssetApi(dataUrl.dataID, token)
      .then((res) => {
        if (res.success == false) {
          toast.error(res.messages);
        } else {
          context.dispatch("getAllAssetAction", {
            perPage: dataUrl.perPage,
            EndLoading: EndLoading,
          });
          store.dispatch("asset/countAssetByStatusAction");
          toast.success("Xóa tài sản thành công");
        }
      })
      .catch((res) => {
        if (res.response.data.status == "422") {
          toast.error("Lỗi xóa tài sản không thành công");
        }
      });
  },
  async UpdateAssetAction(context, { dataUrl, toast, EndLoading }) {
    UpdateAssetApi(dataUrl.data, token)
      .then((res) => {
        if (res.success == false) {
          toast.error(res.messages);
        } else {
          context.dispatch("getAllAssetAction", {
            perPage: dataUrl.perPage,
            EndLoading: EndLoading,
          });
          toast.success("Cập nhật tài sản thành công");
        }
      })
      .catch((res) => {
        if (res.response.data.status == "422") {
          toast.error("Lỗi không nhập đủ các trường bắt buộc");
        }
      });
  },
  async ImportAssetsAction(context, { dataUrl, toast, EndLoading, store }) {
    ImportAssetsApi(dataUrl.data, token)
      .then((res) => {
        if (res.success == false) {
          toast.error(res.messages);
        } else {
          context.dispatch("getAllAssetAction", {
            perPage: dataUrl.perPage,
            EndLoading: EndLoading,
          });
          store.dispatch("asset/countAssetByStatusAction");
          toast.success("Import tài sản thành công");
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
  async SearchAssetStatusAction(context, data) {
    SearchAssetStatusApi(data, token)
      .then((payload) => context.commit("getAllAssetStatusMutation", payload))
      .catch((err) => console.log(err));
  },
  async SearchMultilAssetAction(context, params) {
    SearchAssetMultiFieldApi(params, token)
      .then((payload) => context.commit("getAllAssetMutation", payload))
      .catch((err) => console.log(err));
  },

  async SearchPersonAction(context, data) {
    SearchPersonApi(data, token)
      .then((payload) => context.commit("getPersonMutation", payload))
      .catch((err) => console.log(err));
  },
  async SearchPersonAction2(context, data) {
    SearchPersonApi(data, token)
      .then((payload) => context.commit("getPersonMutation2", payload))
      .catch((err) => console.log(err));
  },
  async SearchAssetTypeAction(context, data) {
    SearchAssetTypeApi(data, token)
      .then((payload) => context.commit("getAllAssetTypeMutation", payload))
      .catch((err) => console.log(err));
  },
  async SearchAssetOriginAction(context, data) {
    SearchAssetOriginApi(data, token)
      .then((payload) => context.commit("getAllAssetOriginMutation", payload))
      .catch((err) => console.log(err));
  },
  async SearchSupplierAction(context, data) {
    SearchSupplierApi(data, token)
      .then((payload) => context.commit("getAllSupplierMutation", payload))
      .catch((err) => console.log(err));
  },
  async SearchLocationAction(context, data) {
    SearchLocationApi(data, token)
      .then((payload) => context.commit("getAllLocationMutation", payload))
      .catch((err) => console.log(err));
  },
  async GetNextPageAction(context, data) {
    NextPageApi(data, token)
      .then((payload) => context.commit("getAllAssetMutation", payload))
      .catch((err) => console.log(err));
  },
  async GetUsingNextPageAction(context, data) {
    NextPageApi(data, token)
      .then((payload) => context.commit("getAssetUsingMutation", payload))
      .catch((err) => console.log(err));
  },
  async GetUnusedNextPageAction(context, data) {
    console.log(data);
    NextPageApi(data, token)
      .then((payload) => context.commit("getAssetUnusedMutation", payload))
      .catch((err) => console.log(err));
  },
  async GetPrevPageAction(context, data) {
    PrevPageApi(data, token)
      .then((payload) => context.commit("getAllAssetMutation", payload))
      .catch((err) => console.log(err));
  },
  async GetUsingPrevPageAction(context, data) {
    PrevPageApi(data, token)
      .then((payload) => context.commit("getAssetUsingMutation", payload))
      .catch((err) => console.log(err));
  },
  async GetUnusedPrevPageAction(context, data) {
    PrevPageApi(data, token)
      .then((payload) => context.commit("getAssetUnusedMutation", payload))
      .catch((err) => console.log(err));
  },
  //Reduction
  async getReductionByYearAction(context, dataUrl) {
    getAllReductionByYearApi(token, dataUrl)
      .then((data) => context.commit("getReductionByYearMutation", data))
      .catch((err) => console.log(err));
  },
  async getReductionAction(context, dataUrl) {
    getAllReductionApi(token, dataUrl)
      .then((data) => context.commit("getReductionMutation", data))
      .catch((err) => console.log(err));
  },
  async getReductionByIdAction(context, id) {
    getReductionByIdApi(token, id)
      .then((data) => context.commit("getReductionByIdMutation", data))
      .catch((err) => console.log(err));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
