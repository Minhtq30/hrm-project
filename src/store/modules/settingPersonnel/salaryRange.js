import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  CreateSalaryRangeApi,
  DeleteSalaryRangeApi,
  GetAllSalaryRangeApi,
  GetAllSalaryRangeEndTimeLoadingApi,
  SearchSalaryRangeApi,
  UpdateSalaryRangeApi,
} from "@/api/ApiSettingPersonnel/ApiSalaryRange";

const state = () => {
  return {
    listSalryRange: [],
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

const getters = {
  getAllSalaryRangeActive(state) {
    return state.listSalryRange.filter((item) => item.is_active == 1);
  },
};

const mutations = {
  GetAllSalaryRangeMutation(state, payload) {
    state.listSalryRange = payload.data.data;
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
  async getAllSalaryRangeAction(context, data) {
    GetAllSalaryRangeApi(data)
      .then((payload) =>
        context.commit("GetAllSalaryRangeMutation", payload.data)
      )
      .catch((err) => console.log(err));
  },

  async getAllSalaryRangeEndTimeLoadingAction(context, { EndTimeLoading }) {
    GetAllSalaryRangeEndTimeLoadingApi()
      .then((payload) => {
        context.commit("GetAllSalaryRangeMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },

  async createSalaryRangeAction(
    context,
    { data, toast, handleCloseDetail, EndTimeLoading }
  ) {
    CreateSalaryRangeApi(data)
      .then((res) => {
        if (res.data.status == "success") {
          context.dispatch("getAllSalaryRangeEndTimeLoadingAction", {
            EndTimeLoading,
          });
          toast.success("Tạo mới thành công");
          handleCloseDetail();
        } else {
          toast.error(res.data.messages);
        }
      })
      .catch((err) => console.log(err));
  },
  async updateSalaryRangeAction(
    context,
    { data, toast, handleCloseUpdate, EndTimeLoading }
  ) {
    UpdateSalaryRangeApi(data)
      .then((res) => {
        if (res.data?.status == "success") {
          context.dispatch("getAllSalaryRangeEndTimeLoadingAction", {
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
  async deleteSalaryRangeAction(
    context,
    { id, toast, handleCloseConfirm, EndTimeLoading }
  ) {
    DeleteSalaryRangeApi(id)
      .then(() => {
        {
          context.dispatch("getAllSalaryRangeEndTimeLoadingAction", {
            EndTimeLoading,
          });
          toast.success("Xóa thành công");
          handleCloseConfirm();
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  },
  async GetNextPageAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    NextPageApi(data, token)
      .then((payload) => {
        context.commit("GetAllSalaryRangeMutation", payload);
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
        context.commit("GetAllSalaryRangeMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async SearchSalaryRangeAction(context, { search, EndTimeLoading }) {
    SearchSalaryRangeApi(search)
      .then((payload) => {
        context.commit("GetAllSalaryRangeMutation", payload.data);
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
