import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  CreateSupplierApi,
  DeleteSupplierApi,
  getAllSuppliersApi,
  // SearchSupplierApi,
  UpdateSupplierApi,
} from "@/api/asset/ApiAssetSupplier";
import token from "@/constants/TokenAuth";
const state = () => {
  return {
    listSuppliers: [],
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
    },
  };
};

const mutations = {
  getAllSuppliersMutation(state, payload) {
    state.listSuppliers = payload.data;
    state.listPagination.current_page = payload.meta.current_page;
    state.listPagination.last_page = payload.meta.last_page;
    state.listPagination.next_page = payload.links.next;
    state.listPagination.prev_page = payload.links.prev;
  },
};

const actions = {
  async getAllSuppliersAction(context, perPage) {
    getAllSuppliersApi(perPage, token)
      .then((data) => context.commit("getAllSuppliersMutation", data))
      .catch((err) => console.log(err));
  },
  async CreateSupplierAction(context, { dataUrl, toast }) {
    CreateSupplierApi(dataUrl.data, token)
      .then((res) => {
        if (res.success == false) {
          console.log(res.success);
          toast.error(res.messages);
        } else {
          context.dispatch("getAllSuppliersAction", dataUrl.perPage);
          toast.success("Thêm mới nhà cung cấp thành công");
        }
      })
      .catch((res) => {
        console.log(res.response.data);
        if (res.response.data.status == "422") {
          toast.error("Lỗi không nhập đủ các trường bắt buộc");
        }
      });
  },
  async DeleteSupplierAction(context, { dataUrl, toast }) {
    DeleteSupplierApi(dataUrl.dataID, token)
      // .then(() => context.dispatch("getAllSuppliersAction", dataUrl.perPage))
      // .catch((err) => console.log(err));
      .then((res) => {
        if (res.success == false) {
          console.log(res.success);
          toast.error(res.messages);
        } else {
          context.dispatch("getAllSuppliersAction", dataUrl.perPage);
          toast.success("Xóa nhà cung cấp thành công");
        }
      })
      .catch((err) => console.log(err));
  },
  async UpdateSupplierAction(context, dataUrl) {
    UpdateSupplierApi(dataUrl.data, token)
      .then(() => context.dispatch("getAllSuppliersAction", dataUrl.perPage))
      .catch((err) => console.log(err));
  },
  // async SearchSupplierAction(context, data) {
  //   console.log(data);
  //   SearchSupplierApi(data, token)
  //     .then((payload) => context.commit("getAllSuppliersMutation", payload))
  //     .catch((err) => console.log(err));
  // },
  async GetNextPageAction(context, data) {
    NextPageApi(data, token)
      .then((payload) => context.commit("getAllSuppliersMutation", payload))
      .catch((err) => console.log(err));
  },
  async GetPrevPageAction(context, data) {
    PrevPageApi(data, token)
      .then((payload) => context.commit("getAllSuppliersMutation", payload))
      .catch((err) => console.log(err));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
