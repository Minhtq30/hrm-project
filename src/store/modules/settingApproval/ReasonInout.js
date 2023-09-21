import {
  CreateInoutApi,
  DeleteInoutApi,
  GetAllInoutApi,
  SearchInoutApi,
  UpdateInoutApi,
} from "@/api/ApiSettingApproval/ApiSettingInout";
import { CatchError } from "@/constants/FormatAll";
import { defineStore } from "pinia";
export const useReasonInout = defineStore("ReasonInout", {
  state: () => ({
    listInout: [],
    typeInout: [
      {
        name: "Tuần",
        value: "week",
      },
      {
        name: "Tháng",
        value: "month",
      },
      {
        name: "Năm",
        value: "year",
      },
    ],
  }),
  getters: {
    ReasonInoutActive() {
      return this.listInout.filter((item) => item.active == 1);
    },
  },
  actions: {
    setDataReasonInout(payload) {
      this.listInout = payload.data;
    },
    async GetAllInoutAction() {
      await GetAllInoutApi()
        .then((payload) => {
          this.setDataReasonInout(payload.data);
        })
        .catch((err) => console.log(err));
    },
    async GetAllInoutEndTimeLoadingAction({ EndTimeLoading }) {
      await GetAllInoutApi()
        .then((payload) => {
          this.setDataReasonInout(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async SearchInoutAction(search) {
      await SearchInoutApi(search)
        .then((payload) => {
          this.setDataReasonInout(payload.data);
        })
        .catch((err) => console.log(err));
    },
    async createInoutAction({
      data,
      toast,
      handleCloseDetail,
      EndTimeLoading,
    }) {
      await CreateInoutApi(data)
        .then((res) => {
          if (res.data.status == "success") {
            this.GetAllInoutEndTimeLoadingAction({
              EndTimeLoading,
            });
            toast.success("Tạo mới thành công");
            handleCloseDetail();
          } else {
            toast.warning(res.data.messages);
          }
        })
        .catch((res) => {
          CatchError({ res, toast, EndTimeLoading });
        });
    },
    async updateInoutAction({
      data,
      toast,
      handleCloseUpdate,
      EndTimeLoading,
    }) {
      await UpdateInoutApi(data)
        .then((res) => {
          if (res.data?.status == "success") {
            this.GetAllInoutEndTimeLoadingAction({
              EndTimeLoading,
            });
            toast.success("Cập nhật thành công");
            handleCloseUpdate();
          } else {
            toast.warning(res.data?.messages);
          }
        })
        .catch((res) => {
          CatchError({ res, toast, EndTimeLoading });
        });
    },
    async deleteInoutAction({ id, toast, handleCloseConfirm, EndTimeLoading }) {
      await DeleteInoutApi(id)
        .then((res) => {
          if (res.data?.status == "success") {
            this.GetAllInoutEndTimeLoadingAction({
              EndTimeLoading,
            });
            toast.success("Xóa thành công");
            handleCloseConfirm();
          } else {
            toast.success(res.data?.messages);
          }
        })
        .catch((res) => {
          CatchError({ res, toast, EndTimeLoading });
        });
    },
  },
});
// const state = () => {
//   return {
//     listInout: [],
//     listType: [
//       {
//         name: "Tuần",
//         value: "week",
//       },
//       {
//         name: "Tháng",
//         value: "month",
//       },
//       {
//         name: "Năm",
//         value: "year",
//       },
//     ],
//   };
// };

// const getters = {
//   getAllInoutActive(state) {
//     return state.listInout.filter((item) => item.active == 1);
//   },
// };

// const mutations = {
//   GetAllInoutMutation(state, payload) {
//     state.listInout = payload.data;
//   },
// };

// const actions = {
//   async GetAllInoutAction(context) {
//     GetAllInoutApi()
//       .then((payload) => context.commit("GetAllInoutMutation", payload.data))
//       .catch((err) => console.log(err));
//   },

//   async GetAllInoutEndTimeLoadingAction(context, { EndTimeLoading }) {
//     GetAllInoutApi()
//       .then((payload) => {
//         context.commit("GetAllInoutMutation", payload.data);
//         EndTimeLoading();
//       })
//       .catch((err) => {
//         console.log(err);
//         EndTimeLoading();
//       });
//   },

//   async SearchInoutAction(context, search) {
//     SearchInoutApi(search)
//       .then((payload) => context.commit("GetAllInoutMutation", payload.data))
//       .catch((err) => console.log(err));
//   },
//   async createInoutAction(
//     context,
//     { data, toast, handleCloseDetail, EndTimeLoading }
//   ) {
//     CreateInoutApi(data)
//       .then((res) => {
//         if (res.data.status == "success") {
//           context.dispatch("GetAllInoutEndTimeLoadingAction", {
//             EndTimeLoading,
//           });
//           toast.success("Tạo mới thành công");
//           handleCloseDetail();
//         } else {
//           toast.warning(res.data.messages);
//         }
//       })
//       .catch((res) => {
//         CatchError({ res, toast, EndTimeLoading });
//       });
//   },
//   async updateInoutAction(
//     context,
//     { data, toast, handleCloseUpdate, EndTimeLoading }
//   ) {
//     UpdateInoutApi(data)
//       .then((res) => {
//         if (res.data?.status == "success") {
//           context.dispatch("GetAllInoutEndTimeLoadingAction", {
//             EndTimeLoading,
//           });
//           toast.success("Cập nhật thành công");
//           handleCloseUpdate();
//         } else {
//           toast.warning(res.data?.messages);
//         }
//       })
//       .catch((res) => {
//         CatchError({ res, toast, EndTimeLoading });
//       });
//   },
//   async deleteInoutAction(
//     context,
//     { id, toast, handleCloseConfirm, EndTimeLoading }
//   ) {
//     DeleteInoutApi(id)
//       .then((res) => {
//         if (res.data?.status == "success") {
//           context.dispatch("GetAllInoutEndTimeLoadingAction", {
//             EndTimeLoading,
//           });
//           toast.success("Xóa thành công");
//           handleCloseConfirm();
//         } else {
//           toast.success(res.data?.messages);
//         }
//       })
//       .catch((res) => {
//         CatchError({ res, toast, EndTimeLoading });
//       });
//   },
// };

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions,
//   getters,
// };
