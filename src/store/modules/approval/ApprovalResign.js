import {
  CreateApprovalResignApi,
  GetAllApprovalResignApi,
  GetAllReasonLeaveApi,
  UpdateApprovalResignApi,
} from "@/api/ApiApproval/ApiApprovalResign";
import { DeleteApprovalApi } from "@/api/ApiApproval/ApiApprovalTotal";
import {
  ConfirmApprovalApi,
  RevertApprovalApi,
} from "@/api/ApiApproval/ApiConfirmApproval";
import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import { defineStore } from "pinia";
export const useApprovalResign = defineStore("ApprovalResign", {
  state: () => ({
    listApprovalResign: [],
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
    ReasonResign: [],
  }),
  getters: {},
  actions: {
    setDataApprovalResign(payload) {
      this.listApprovalResign = payload.data.data;
      this.CountTab = payload.detail_count;
      this.listPagination.current_page = payload.data.current_page;
      this.listPagination.last_page = payload.data.last_page;
      this.listPagination.next_page_url = payload.data.next_page_url;
      this.listPagination.prev_page_url = payload.data.prev_page_url;
      this.listPagination.total = payload.data.total;
      this.listPagination.from = payload.data.from;
      this.listPagination.to = payload.data.to;
    },
    setDataAllReasonResign(payload) {
      this.ReasonResign = payload.data;
    },
    // Danh sách đơn xin thôi việc
    async GetAllApprovalResignAction({ type, menu, EndTimeLoading }) {
      await GetAllApprovalResignApi(type, menu)
        .then((payload) => {
          this.setDataApprovalResign(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Tạo mới đơn thôi việc
    async createApprovalResignAction({
      dataUrl,
      router,
      toast,
      EndTimeLoading,
      ActivatedButton,
    }) {
      await CreateApprovalResignApi(dataUrl.data)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.error(res.data.messages);
            ActivatedButton();
            EndTimeLoading();
          } else {
            toast.success("Tạo mới thành công");
            router.push(`/approval-resign-view/detail=${res.data.parent_id}`);
            ActivatedButton();
            EndTimeLoading();
          }
        })
        .catch((err) => console.log(err), EndTimeLoading());
    },
    // Xóa đơn thôi việc
    async deleteApprovalResignAction({
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
            if (route.name == "Chi tiết đơn thôi việc") {
              router.go(-1);
            } else {
              this.GetAllApprovalResignAction({
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
          EndTimeLoading();
          handleCloseConfirm();
        });
    },
    // Cập nhật đơn thôi việc
    async updateApprovalResignAction({ data, router, toast, EndTimeLoading }) {
      await UpdateApprovalResignApi(data)
        .then((res) => {
          if (res.data?.status == "failed") {
            toast.error(res.data?.messages);
            EndTimeLoading();
          } else {
            toast.success("Cập nhật thành công");
            router.push(`/approval-resign-view/detail=${data.ID}`);
            EndTimeLoading();
          }
        })
        .catch((err) => console.log(err), EndTimeLoading());
    },
    // Phân trang
    async GetNextPageAction(data) {
      const token = localStorage.getItem("TOKEN");
      NextPageApi(data, token)
        .then((payload) => this.setDataApprovalResign(payload))
        .catch((err) => console.log(err));
    },
    async GetPrevPageAction(data) {
      const token = localStorage.getItem("TOKEN");
      PrevPageApi(data, token)
        .then((payload) => this.setDataApprovalResign(payload))
        .catch((err) => console.log(err));
    },
    // Duyệt, Không duyệt đơn từ
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
            this.GetAllApprovalResignAction({ type, menu, EndTimeLoading });
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
      RevertApprovalApi(dataApproval)
        .then((payload) => {
          if (payload.data.status == "failed") {
            toast.error(payload.data.messages);
            EndTimeLoading();
          } else {
            this.GetAllApprovalResignAction({ type, menu, EndTimeLoading });
            toast.success("Thành công");
          }
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Danh sách lý do thôi việc
    async GetAllReasonResignAction() {
      await GetAllReasonLeaveApi()
        .then((payload) => this.setDataAllReasonResign(payload.data))
        .catch((err) => console.log(err));
    },
  },
});
