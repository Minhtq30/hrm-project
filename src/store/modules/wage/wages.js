import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import { GetAllWagesApi } from "@/api/ApiWage/ApiWage";

const state = () => {
  return {
    listWages: [],
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
  GetAllWageMutation(state, payload) {
    state.listWages = payload.data.data;
    state.listPagination.current_page = payload.data.current_page;
    state.listPagination.last_page = payload.data.last_page;
    state.listPagination.next_page_url = payload.data.next_page_url;
    state.listPagination.prev_page_url = payload.data.prev_page_url;
    state.listPagination.total = payload.data.total;
    state.listPagination.from = payload.data.from;
    state.listPagination.to = payload.data.to;
  },
  //   showShiftAssignMutation(state, payload) {
  //     state.assignDetail = payload.data;
  //   },
};

const actions = {
  async GetAllWageAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    GetAllWagesApi(token, data)
      .then((payload) => {
        context.commit("GetAllWageMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err), EndTimeLoading();
      });
  },
  //   async SearchShiftMonthAction(context, data) {
  //     const token = localStorage.getItem("TOKEN");
  //     SearchAttendanceMonthApi(token, data)
  //       .then((payload) => context.commit("GetAllShiftMonthMutation", payload))
  //       .catch((err) => console.log(err));
  //   },
  async GetNextPageAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    NextPageApi(data, token)
      .then((payload) => {
        context.commit("GetAllWageMutation", payload);
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
        context.commit("GetAllWageMutation", payload);
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
};
