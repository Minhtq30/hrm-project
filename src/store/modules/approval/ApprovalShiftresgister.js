import {
  CreateApprovalShiftresgisterApi,
  GetAllApprovalShiftresgisterApi,
  UpdateApprovalShiftresgisterApi,
} from "@/api/ApiApproval/ApiApprovalShiftresgister";
import { DeleteApprovalApi } from "@/api/ApiApproval/ApiApprovalTotal";
import {
  ConfirmApprovalApi,
  RevertApprovalApi,
} from "@/api/ApiApproval/ApiConfirmApproval";
import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import { defineStore } from "pinia";
export const useApprovalShiftresgister = defineStore("ApprovalShiftresgister", {
  state: () => ({
    listApprovalShiftresgister: [],
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
    CountTab: {},
  }),
  getters: {},
  actions: {
    setDataApprovalShiftresgister(payload) {
      this.listApprovalShiftresgister = payload.data.data;
      this.CountTab = payload.detail_count;
      this.listPagination.current_page = payload.data.current_page;
      this.listPagination.last_page = payload.data.last_page;
      this.listPagination.next_page_url = payload.data.next_page_url;
      this.listPagination.prev_page_url = payload.data.prev_page_url;
      this.listPagination.total = payload.data.total;
      this.listPagination.from = payload.data.from;
      this.listPagination.to = payload.data.to;
    },
    async GetAllApprovalShiftresgisterAction({ type, menu, EndTimeLoading }) {
      await GetAllApprovalShiftresgisterApi(type, menu)
        .then((payload) => {
          this.setDataApprovalShiftresgister(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async createApprovalShiftresgisterAction({
      dataUrl,
      router,
      toast,
      EndTimeLoading,
      ActivatedButton,
    }) {
      await CreateApprovalShiftresgisterApi(dataUrl.data)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.error(res.data.messages);
            ActivatedButton();
            EndTimeLoading();
          } else {
            toast.success("Tạo mới thành công");
            router.push(
              `/approval-shiftresgister-view/detail=${res.data.parent_id}`
            );
            ActivatedButton();
            EndTimeLoading();
          }
        })
        .catch((err) => {
          if (err.response.data.messages) {
            toast.error("Vui lòng chọn ca");
          }
          ActivatedButton();
          EndTimeLoading();
        });
    },
    async deleteApprovalShiftresgisterAction({
      id,
      toast,
      route,
      router,
      EndTimeLoading,
      handleCloseConfirm,
    }) {
      await DeleteApprovalApi(id)
        .then((res) => {
          if (res.data.status == "success") {
            if (route.name == "Chi tiết đơn đăng ký ca") {
              router.go(-1);
            } else {
              this.GetAllApprovalShiftresgisterAction({
                type: route.params.type,
                menu: route.params.menu,
                EndTimeLoading,
              });
            }
            toast.success("Xóa đơn thành công");
            handleCloseConfirm();
          } else {
            toast.error(res.data.messages);
            handleCloseConfirm();
          }
        })
        .catch((res) => {
          console.log(res);
          handleCloseConfirm();
        });
    },
    async updateApprovalShiftresgisterAction({
      data,
      router,
      toast,
      EndTimeLoading,
    }) {
      await UpdateApprovalShiftresgisterApi(data)
        .then((res) => {
          if (res.data?.status == "failed") {
            toast.error(res.data?.messages);
            EndTimeLoading();
          } else {
            toast.success("Cập nhật thành công");
            router.push(`/approval-shiftresgister-view/detail=${data.ID}`);
            EndTimeLoading();
          }
        })
        .catch((err) => console.log(err), EndTimeLoading());
    },
    async GetNextPageAction({ data, EndTimeLoading }) {
      const token = localStorage.getItem("TOKEN");
      NextPageApi(data, token)
        .then((payload) => {
          this.setDataApprovalShiftresgister(payload);
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
          this.setDataApprovalShiftresgister(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Duyệt,Hoàn và Không duyệt
    async ConfirmApprovalAction({
      dataApproval,
      toast,
      type,
      menu,
      EndTimeLoading,
    }) {
      await ConfirmApprovalApi(dataApproval)
        .then((payload) => {
          if (payload.data.status == "failed") {
            toast.error(payload.data.messages);
            EndTimeLoading();
          } else {
            this.GetAllApprovalShiftresgisterAction({
              type,
              menu,
              EndTimeLoading,
            });
            toast.success("Thành công");
          }
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async RevertApprovalAction({
      dataApproval,
      toast,
      type,
      menu,
      EndTimeLoading,
    }) {
      await RevertApprovalApi(dataApproval)
        .then((payload) => {
          if (payload.data.status == "failed") {
            toast.error(payload.data.messages);
            EndTimeLoading();
          } else {
            this.GetAllApprovalShiftresgisterAction({
              type,
              menu,
              EndTimeLoading,
            });
            toast.success("Thành công");
          }
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
  },
});
