import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  CreatePositionApi,
  DeletePositionApi,
  GetAllPositionsApi,
  SearchPositionsApi,
  UpdatePositionApi,
  ImportPositionIDApi,
  GetAllPositionsEndTimeLoadingApi,
} from "@/api/ApiSettingPersonnel/ApiPosition";

const state = () => {
  return {
    listPositions: [],
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
    positionDetail: {},
  };
};

const getters = {
  getAllPositionsActive(state) {
    return state.listPositions.filter((item) => item.status == 1);
  },
};

const mutations = {
  getAllPositionsMutation(state, payload) {
    state.listPositions = payload.data.data;
    state.listPagination.current_page = payload.data.current_page;
    state.listPagination.last_page = payload.data.last_page;
    state.listPagination.next_page_url = payload.data.next_page_url;
    state.listPagination.prev_page_url = payload.data.prev_page_url;
    state.listPagination.total = payload.data.total;
    state.listPagination.from = payload.data.from;
    state.listPagination.to = payload.data.to;
  },
  ShowPositionsMutation(state, payload) {
    state.positionDetail = payload.data.data[0].title;
  },
};

const actions = {
  async getAllPositionsAction(context, perPage) {
    GetAllPositionsApi(perPage)
      .then((payload) =>
        context.commit("getAllPositionsMutation", payload.data)
      )
      .catch((err) => console.log(err));
  },
  async getAllPositionsEndTimeLoadingAction(context, { EndTimeLoading }) {
    GetAllPositionsEndTimeLoadingApi()
      .then((payload) => {
        context.commit("getAllPositionsMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async createPositionAction(
    context,
    { data, toast, handleCloseDetail, EndTimeLoading }
  ) {
    CreatePositionApi(data)
      .then((res) => {
        if (res.data.status == "success") {
          context.dispatch("getAllPositionsEndTimeLoadingAction", {
            EndTimeLoading,
          });
          toast.success("Tạo bản ghi mới thành công");
          handleCloseDetail();
        } else {
          toast.error("Tạo mới thất bại", res.data.message);
        }
      })
      .catch((err) => console.log(err));
  },
  async deletePositionAction(
    context,
    { id, toast, handleCloseConfirm, EndTimeLoading }
  ) {
    DeletePositionApi(id)
      .then(() => {
        context.dispatch("getAllPositionsEndTimeLoadingAction", {
          EndTimeLoading,
        });
        toast.success("Xóa thành công");
        handleCloseConfirm();
      })
      .catch((err) => {
        console.log(err);
        handleCloseConfirm();
      });
  },
  async updatePositionAction(
    context,
    { data, toast, handleCloseUpdate, EndTimeLoading }
  ) {
    UpdatePositionApi(data)
      .then((res) => {
        if (res.data?.status == "success") {
          context.dispatch("getAllPositionsEndTimeLoadingAction", {
            EndTimeLoading,
          });
          toast.success("Cập nhật thành công");
          handleCloseUpdate();
        } else {
          toast.error("Cập nhật thất bại");
        }
      })
      .catch((err) => console.log(err));
  },
  async GetNextPageAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    NextPageApi(data, token)
      .then((payload) => {
        context.commit("getAllPositionsMutation", payload);
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
        context.commit("getAllPositionsMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async SearchPositionsAction(context, { search, EndTimeLoading }) {
    SearchPositionsApi(search)
      .then((payload) => {
        context.commit("getAllPositionsMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async ImportPositionIDAction(context, dataUrl) {
    const token = localStorage.getItem("TOKEN");
    ImportPositionIDApi(dataUrl.data, token)
      .then((payload) => context.commit("getAllPositionsMutation", payload))
      .catch((err) => console.log(err));
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
