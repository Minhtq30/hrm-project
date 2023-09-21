import {
  GetAllInsuranceApi,
  GetAllInsuranceIncreaseApi,
  GetAllInsuranceReducedApi,
  GetAllPremiumCodeApi,
  GetAllPremiumPlaceApi,
  UpdateInsuranceApi,
} from "@/api/ApiInsurance/ApiInsurance";
import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import { defineStore } from "pinia";
export const useInsurance = defineStore("Insurance", {
  state: () => ({
    statusInsurance: [
      {
        ID: 1,
        title: "Trả",
      },
      {
        ID: 2,
        title: "Sửa",
      },
      {
        ID: 3,
        title: "Chốt",
      },
      {
        ID: 4,
        title: "Xin cấp",
      },
      {
        ID: 5,
        title: "Gộp",
      },
      {
        ID: 6,
        title: "Công ty giữ sổ",
      },
      {
        ID: 7,
        title: "NLĐ giữ sổ",
      },
    ],
    listPremiumCode: [],
    listPremiumPlace: [],
    listInsurances: [],
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
    listInsuranceIncrease: [],
    listInsuranceReduced: [],
  }),
  getters: {},
  actions: {
    setDataAllCodePremium(payload) {
      this.listPremiumCode = payload.data;
    },
    setDataAllPlacePremium(payload) {
      this.listPremiumPlace = payload.data;
    },
    setDataAllInsurance(payload) {
      this.listInsurances = payload.data.data;
      this.listPagination.current_page = payload.data.current_page;
      this.listPagination.last_page = payload.data.last_page;
      this.listPagination.next_page_url = payload.data.next_page_url;
      this.listPagination.prev_page_url = payload.data.prev_page_url;
      this.listPagination.total = payload.data.total;
      this.listPagination.from = payload.data.from;
      this.listPagination.to = payload.data.to;
    },
    setDataAllInsuranceIncrease(payload) {
      this.listInsuranceIncrease = payload.data.data;
      this.listPagination.current_page = payload.data.current_page;
      this.listPagination.last_page = payload.data.last_page;
      this.listPagination.next_page_url = payload.data.next_page_url;
      this.listPagination.prev_page_url = payload.data.prev_page_url;
      this.listPagination.total = payload.data.total;
      this.listPagination.from = payload.data.from;
      this.listPagination.to = payload.data.to;
    },
    setDataAllInsuranceReduced(payload) {
      this.listInsuranceReduced = payload.data.data;
      this.listPagination.current_page = payload.data.current_page;
      this.listPagination.last_page = payload.data.last_page;
      this.listPagination.next_page_url = payload.data.next_page_url;
      this.listPagination.prev_page_url = payload.data.prev_page_url;
      this.listPagination.total = payload.data.total;
      this.listPagination.from = payload.data.from;
      this.listPagination.to = payload.data.to;
    },
    async GetAllPremiumCodeAction() {
      await GetAllPremiumCodeApi()
        .then((payload) => this.setDataAllCodePremium(payload.data))
        .catch((err) => console.log(err));
    },
    async GetAllPremiumPlaceAction(id) {
      await GetAllPremiumPlaceApi(id)
        .then((payload) => this.setDataAllPlacePremium(payload.data))
        .catch((err) => console.log(err));
    },
    async GetAllInsuranceAction({ data, EndTimeLoading }) {
      GetAllInsuranceApi(data)
        .then((payload) => {
          this.setDataAllInsurance(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async GetNextPageAction({ data, EndTimeLoading }) {
      const token = localStorage.getItem("TOKEN");
      NextPageApi(data, token)
        .then((payload) => {
          this.setDataAllInsurance(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async GetPrevPageAction({ data, EndTimeLoading }) {
      const token = localStorage.getItem("TOKEN");
      PrevPageApi(data, token)
        .then((payload) => {
          this.setDataAllInsurance(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async GetAllInsuranceIncreaseAction({ data, EndTimeLoading }) {
      await GetAllInsuranceIncreaseApi(data)
        .then((payload) => {
          this.setDataAllInsuranceIncrease(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async GetAllInsuranceReducedAction({ data, EndTimeLoading }) {
      await GetAllInsuranceReducedApi(data)
        .then((payload) => {
          this.setDataAllInsuranceReduced(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async UpdateInsuranceAction(data) {
      UpdateInsuranceApi(data)
        .then((res) => this.setDataAllInsurance(res.data))
        .catch((err) => console.log(err));
    },
  },
});
// const mutations = {
//   GetAllPremiumCodeMutation(this, payload) {
//     state.listPremiumCode = payload.data;
//   },
//   GetAllPremiumPlaceMutation(state, payload) {
//     state.listPremiumPlace = payload.data;
//   },
//   GetAllInsuranceMutation(state, payload) {
//     state.listInsurances = payload.data.data;
//     state.listPagination.current_page = payload.data.current_page;
//     state.listPagination.last_page = payload.data.last_page;
//     state.listPagination.next_page_url = payload.data.next_page_url;
//     state.listPagination.prev_page_url = payload.data.prev_page_url;
//     state.listPagination.total = payload.data.total;
//     state.listPagination.from = payload.data.from;
//     state.listPagination.to = payload.data.to;
//   },
//   GetAllInsuranceIncreaseMutation(state, payload) {
//     state.listInsuranceIncrease = payload.data.data;
//     state.listPagination.current_page = payload.data.current_page;
//     state.listPagination.last_page = payload.data.last_page;
//     state.listPagination.next_page_url = payload.data.next_page_url;
//     state.listPagination.prev_page_url = payload.data.prev_page_url;
//     state.listPagination.total = payload.data.total;
//     state.listPagination.from = payload.data.from;
//     state.listPagination.to = payload.data.to;
//   },
//   GetAllInsuranceReducedMutation(state, payload) {
//     state.listInsuranceReduced = payload.data.data;
//     state.listPagination.current_page = payload.data.current_page;
//     state.listPagination.last_page = payload.data.last_page;
//     state.listPagination.next_page_url = payload.data.next_page_url;
//     state.listPagination.prev_page_url = payload.data.prev_page_url;
//     state.listPagination.total = payload.data.total;
//     state.listPagination.from = payload.data.from;
//     state.listPagination.to = payload.data.to;
//   },
// };

// const actions = {
//   async GetAllPremiumCodeAction(context) {
//     GetAllPremiumCodeApi()
//       .then((payload) =>
//         context.commit("GetAllPremiumCodeMutation", payload.data)
//       )
//       .catch((err) => console.log(err));
//   },
//   async GetAllPremiumPlaceAction(context, id) {
//     GetAllPremiumPlaceApi(id)
//       .then((payload) =>
//         context.commit("GetAllPremiumPlaceMutation", payload.data)
//       )
//       .catch((err) => console.log(err));
//   },
//   async GetAllInsuranceAction(context, { data, EndTimeLoading }) {
//     GetAllInsuranceApi(data)
//       .then((payload) => {
//         context.commit("GetAllInsuranceMutation", payload.data);
//         EndTimeLoading();
//       })
//       .catch((err) => {
//         console.log(err);
//         EndTimeLoading();
//       });
//   },
//   async GetNextPageAction(context, { data, EndTimeLoading }) {
//     const token = localStorage.getItem("TOKEN");
//     NextPageApi(data, token)
//       .then((payload) => {
//         context.commit("GetAllInsuranceMutation", payload);
//         EndTimeLoading();
//       })
//       .catch((err) => {
//         console.log(err);
//         EndTimeLoading();
//       });
//   },
//   async GetPrevPageAction(context, { data, EndTimeLoading }) {
//     const token = localStorage.getItem("TOKEN");
//     PrevPageApi(data, token)
//       .then((payload) => {
//         context.commit("GetAllInsuranceMutation", payload);
//         EndTimeLoading();
//       })
//       .catch((err) => {
//         console.log(err);
//         EndTimeLoading();
//       });
//   },
//   async GetAllInsuranceIncreaseAction(context, { data, EndTimeLoading }) {
//     GetAllInsuranceIncreaseApi(data)
//       .then((payload) => {
//         context.commit("GetAllInsuranceIncreaseMutation", payload.data);
//         EndTimeLoading();
//       })
//       .catch((err) => {
//         console.log(err);
//         EndTimeLoading();
//       });
//   },
//   async GetAllInsuranceReducedAction(context, { data, EndTimeLoading }) {
//     GetAllInsuranceReducedApi(data)
//       .then((payload) => {
//         context.commit("GetAllInsuranceReducedMutation", payload.data);
//         EndTimeLoading();
//       })
//       .catch((err) => {
//         console.log(err);
//         EndTimeLoading();
//       });
//   },
//   async UpdateInsuranceAction(context, data) {
//     UpdateInsuranceApi(data)
//       .then((res) => context.dispatch("GetAllInsuranceMutation", res.data))
//       .catch((err) => console.log(err));
//   },
// };

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions,
// };
