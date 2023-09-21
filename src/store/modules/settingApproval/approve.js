import {
  CreateApproveApi,
  DeleteApproveApi,
  GetAllApproveApi,
  ShowDetailApproveApi,
  UpdateApproveApi,
} from "@/api/ApiSettingApproval/ApiSettingApprove";
import { defineStore } from "pinia";
export const useApprovers = defineStore("Approvers", {
  state: () => ({
    listApprove: [],
    ApproveDetail: {},
    moduleApprove: [{ title: "Duyệt đơn từ", value: "ROLE_APPROVAL" }],
  }),
  getters: {},
  actions: {
    setDataApprover(payload) {
      this.listApprove = payload.data;
    },
    setDataDetailApprover(payload) {
      this.ApproveDetail = payload.data;
    },
    async GetAllApproveAction({ EndTimeLoading }) {
      await GetAllApproveApi()
        .then((payload) => {
          this.setDataApprover(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async CreateApproveAction({ data, toast, router }) {
      await CreateApproveApi(data)
        .then((res) => {
          if (res.data.status == "success") {
            router.push(`/approval-approve-setting/detail=${res.data.data.ID}`);
            toast.success("Tạo mới thành công");
          } else {
            toast.warning(res.data.messages);
          }
        })
        .catch((res) => {
          console.log(res);
        });
    },
    async ShowDetailApproveAction({ id, EndTimeLoading }) {
      await ShowDetailApproveApi(id)
        .then((res) => {
          if (res.data.status == "success") {
            this.setDataDetailApprover(res.data);
          } else {
            console.log(res);
          }
          EndTimeLoading();
        })
        .catch((res) => {
          console.log(res);
        });
    },
    async UpdateApproveApi({ id, data, toast, router }) {
      await UpdateApproveApi(id, data)
        .then((res) => {
          if (res.data?.status == "success") {
            toast.success("Cập nhật thành công");
            router.push(`/approval-approve-setting/detail=${id}`);
          } else {
            toast.warning(res.data?.messages);
          }
        })
        .catch((res) => {
          console.log(res);
        });
    },
    async DeleteApproveAction({
      id,
      toast,
      handleCloseConfirm,
      EndTimeLoading,
    }) {
      await DeleteApproveApi(id)
        .then((res) => {
          if (res.data?.status == "success") {
            this.GetAllApproveAction({ EndTimeLoading });
            toast.success("Xóa thành công");
            handleCloseConfirm();
          } else {
            toast.success(res.data?.messages);
          }
        })
        .catch((res) => {
          console.log(res);
        });
    },
  },
});
// const state = () => {
//   return {
//     listApprove: [],
//     ApproveDetail: {},
//     moduleApprove: [{ title: "Duyệt đơn từ", value: "ROLE_APPROVAL" }],
//   };
// };

// const mutations = {
//   GetAllApproveMutation(state, payload) {
//     state.listApprove = payload.data;
//   },
//   ShowDetailApproveMutation(state, payload) {
//     state.ApproveDetail = payload.data;
//   },
// };

// const actions = {
//   async GetAllApproveAction(context, { EndTimeLoading }) {
//     GetAllApproveApi()
//       .then((payload) => {
//         context.commit("GetAllApproveMutation", payload.data);
//         EndTimeLoading();
//       })
//       .catch((err) => {
//         console.log(err);
//         EndTimeLoading();
//       });
//   },
//   async CreateApproveAction(context, { data, toast, router }) {
//     CreateApproveApi(data)
//       .then((res) => {
//         if (res.data.status == "success") {
//           router.push(`/approval-approve-setting`);
//           toast.success("Tạo mới thành công");
//         } else {
//           toast.warning(res.data.messages);
//         }
//       })
//       .catch((res) => {
//         console.log(res);
//       });
//   },
//   async ShowDetailApproveAction(context, { id, EndTimeLoading }) {
//     ShowDetailApproveApi(id)
//       .then((res) => {
//         if (res.data.status == "success") {
//           context.commit("ShowDetailApproveMutation", res.data);
//         } else {
//           console.log(res);
//         }
//         EndTimeLoading();
//       })
//       .catch((res) => {
//         console.log(res);
//       });
//   },
//   async UpdateApproveApi(context, { id, data, toast, router }) {
//     UpdateApproveApi(id, data)
//       .then((res) => {
//         if (res.data?.status == "success") {
//           toast.success("Cập nhật thành công");
//           router.push(`/approval-approve-setting/detail=${id}`);
//         } else {
//           toast.warning(res.data?.messages);
//         }
//       })
//       .catch((res) => {
//         console.log(res);
//       });
//   },
//   async DeleteApproveAction(
//     context,
//     { id, toast, handleCloseConfirm, EndTimeLoading }
//   ) {
//     DeleteApproveApi(id)
//       .then((res) => {
//         if (res.data?.status == "success") {
//           context.dispatch("GetAllApproveAction", {
//             EndTimeLoading,
//           });
//           toast.success("Xóa thành công");
//           handleCloseConfirm();
//         } else {
//           toast.success(res.data?.messages);
//         }
//       })
//       .catch((res) => {
//         console.log(res);
//       });
//   },
// };

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions,
// };
