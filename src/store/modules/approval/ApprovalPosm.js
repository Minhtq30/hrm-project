import {
  CreateUploadPosmApi,
  GetAllUploadPosmApi,
  //   GetFurloughDetailUserApi,
  UpdateUploadPosmApi,
} from "@/api/ApiApproval/UploadPosm";
// import { DeleteApprovalApi } from "@/api/ApiApproval/ApiApprovalTotal";
// import {
//   ConfirmApprovalApi,
//   RevertApprovalApi,
// } from "@/api/ApiApproval/ApiConfirmApproval";
import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import { defineStore } from "pinia";
export const useUploadPosm = defineStore("UploadPosm", {
  state: () => ({
    listUploadPosm: [],
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
    UserFurlough: {},
    CountTab: {},
  }),
  getters: {},
  actions: {
    setDataUploadPosm(payload) {
      this.listUploadPosm = payload.data.data;
      this.CountTab = payload.detail_count;
      this.listPagination.current_page = payload.data.current_page;
      this.listPagination.last_page = payload.data.last_page;
      this.listPagination.next_page_url = payload.data.next_page_url;
      this.listPagination.prev_page_url = payload.data.prev_page_url;
      this.listPagination.total = payload.data.total;
      this.listPagination.from = payload.data.from;
      this.listPagination.to = payload.data.to;
    },
    GetFurloughDetailUser(payload) {
      this.UserFurlough = payload.data;
    },
    // Danh sách posm
    async GetAllUploadPosmAction({ type, menu, EndTimeLoading }) {
      await GetAllUploadPosmApi(type, menu)
        .then((payload) => {
          this.setDataUploadPosm(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Tạo mới posm
    async createUploadPosmAction({ dataUrl, router, toast, ActivatedButton }) {
      await CreateUploadPosmApi(dataUrl.data)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.error(res.data.messages);
            ActivatedButton();
          } else {
            router.push(`/approval-posm-view/detail=${res.data.parent_id}`);
            toast.success("Tạo mới thành công");
            ActivatedButton();
          }
        })
        .catch((err) => {
          toast.error("Tạo mới thất bại");
          console.log(err);
        });
    },
    // Xóa đơn xin nghỉ
    // async deleteUploadPosmAction({
    //   id,
    //   toast,
    //   route,
    //   router,
    //   EndTimeLoading,
    //   handleCloseConfirm,
    // }) {
    //   await DeleteApprovalApi(id)
    //     .then((res) => {
    //       if (res.data.status == "success") {
    //         if (route.name == "Chi tiết đơn xin nghỉ") {
    //           router.go(-1);
    //         } else {
    //           this.GetAllUploadPosmAction({
    //             type: route.params.type,
    //             menu: route.params.menu,
    //             EndTimeLoading,
    //           });
    //         }
    //         toast.success("Xóa đơn thành công");
    //         handleCloseConfirm();
    //       } else {
    //         toast.error(res.data.messages);
    //         handleCloseConfirm();
    //       }
    //     })
    //     .catch((res) => {
    //       console.log(res);
    //       handleCloseConfirm();
    //     });
    // },
    // Cập nhật đơn POSM
    async updateUploadPosmAction({ data, router, route, toast }) {
      await UpdateUploadPosmApi(data, route.params.idPosm)
        .then((res) => {
          if (res.data?.status == "failed") {
            toast.error(res.data?.messages);
          } else {
            toast.success("Cập nhật thành công");
            router.push(`/approval-posm-view/detail=${route.params.idPosm}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // Chi tiết nghỉ phép của nhân sự
    // async GetFurloughDetailUserAction(data) {
    //   await GetFurloughDetailUserApi(data)
    //     .then((res) => {
    //       this.GetFurloughDetailUser(res.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // Phân trang
    async GetNextPageAction({ data, EndTimeLoading }) {
      const token = localStorage.getItem("TOKEN");
      NextPageApi(data, token)
        .then((payload) => {
          this.setDataUploadPosm(payload);
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
          this.setDataUploadPosm(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Duyệt,Hoàn và Không duyệt
    // async ConfirmApprovalAction({
    //   dataApproval,
    //   toast,
    //   type,
    //   menu,
    //   EndTimeLoading,
    // }) {
    //   await ConfirmApprovalApi(dataApproval)
    //     .then((payload) => {
    //       if (payload.data.status == "failed") {
    //         if (payload.data.messages == "forbidden") {
    //           toast.error("Bạn không có quyền thực hiện chức năng này!");
    //         } else {
    //           toast.error(payload.data.messages);
    //         }
    //         EndTimeLoading();
    //       } else {
    //         this.GetAllUploadPosmAction(type, menu, EndTimeLoading);
    //         toast.success("Thành công");
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       EndTimeLoading();
    //     });
    // },
    // async RevertApprovalAction({
    //   dataApproval,
    //   toast,
    //   type,
    //   menu,
    //   EndTimeLoading,
    // }) {
    //   RevertApprovalApi(dataApproval)
    //     .then((payload) => {
    //       if (payload.data.status == "failed") {
    //         if (payload.data.messages == "forbidden") {
    //           toast.error("Bạn không có quyền thực hiện chức năng này!");
    //         } else {
    //           toast.error(payload.data.messages);
    //         }
    //         EndTimeLoading();
    //       } else {
    //         this.GetAllUploadPosmAction(type, menu, EndTimeLoading);
    //         toast.success("Thành công");
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       EndTimeLoading();
    //     });
    // },
  },
});
