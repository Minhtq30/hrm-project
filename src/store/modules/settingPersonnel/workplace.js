import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  getAllWorkplacesApi,
  CreateWorkplaceApi,
  DeleteWorkplaceApi,
  UpdateWorkplaceApi,
  SearchWorkplacesApi,
  getAllWorkplacesEndTimeLoadingApi,
} from "@/api/ApiSettingPersonnel/ApiWorkplace";
const state = () => {
  return {
    listWorkplace: [],
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
    workplaceDetail: {},
  };
};

const getters = {
  getAllWorkplaceActive(state) {
    return state.listWorkplace.filter((item) => item.status == 1);
  },
};

const mutations = {
  getAllWorkplaceMutation(state, payload) {
    state.listWorkplace = payload.data.data;
    state.listPagination.current_page = payload.data.current_page;
    state.listPagination.last_page = payload.data.last_page;
    state.listPagination.next_page_url = payload.data.next_page_url;
    state.listPagination.prev_page_url = payload.data.prev_page_url;
    state.listPagination.total = payload.data.total;
    state.listPagination.from = payload.data.from;
    state.listPagination.to = payload.data.to;
  },
  showDetailWorkplaceMutation(state, payload) {
    state.workplaceDetail = payload.data.data[0];
  },
};
const actions = {
  async getAllWorkplaceAction(context, data) {
    getAllWorkplacesApi(data).then((payload) =>
      context.commit("getAllWorkplaceMutation", payload.data)
    );
  },
  async getAllWorkplaceEndTimeLoadingAction(context, { EndTimeLoading }) {
    getAllWorkplacesEndTimeLoadingApi()
      .then((payload) => {
        context.commit("getAllWorkplaceMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },

  async createWorkplaceAction(
    context,
    { data, toast, handleCloseDetail, EndTimeLoading }
  ) {
    CreateWorkplaceApi(data)
      .then((res) => {
        if (res.data.status == "success") {
          context.dispatch("getAllWorkplaceEndTimeLoadingAction", {
            EndTimeLoading,
          });
          toast.success("Tạo mới thành công");
          handleCloseDetail();
        } else {
          toast.error(res.data.messages);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async deleteWorkplaceAction(
    context,
    { id, toast, handleCloseConfirm, EndTimeLoading }
  ) {
    DeleteWorkplaceApi(id)
      .then(() => {
        context.dispatch("getAllWorkplaceEndTimeLoadingAction", {
          EndTimeLoading,
        });
        toast.success("Xóa thành công");
        handleCloseConfirm();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async updateWorkplaceAction(
    context,
    { data, toast, handleCloseUpdate, EndTimeLoading }
  ) {
    UpdateWorkplaceApi(data)
      .then((res) => {
        if (res.data?.status == "success") {
          context.dispatch("getAllWorkplaceEndTimeLoadingAction", {
            EndTimeLoading,
          });
          toast.success("Cập nhật thành công");
          handleCloseUpdate();
        } else {
          toast.error(res.data?.messages);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async GetNextPageAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    NextPageApi(data, token)
      .then((payload) => {
        context.commit("getAllWorkplaceMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async GetPrevPageAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    PrevPageApi(data, token)
      .then((payload) => {
        context.commit("getAllWorkplaceMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async SearchWorkplaceAction(context, { search, EndTimeLoading }) {
    SearchWorkplacesApi(search)
      .then((payload) => {
        context.commit("getAllWorkplaceMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
