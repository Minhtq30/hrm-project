import {
  CreateApprovalOvertimeApi,
  GetAllApprovalOvertimeApi,
  UpdateApprovalOvertimeApi,
} from "@/api/ApiApproval/ApiApprovalOvertime";
import { DeleteApprovalApi } from "@/api/ApiApproval/ApiApprovalTotal";
import {
  ConfirmApprovalApi,
  RevertApprovalApi,
} from "@/api/ApiApproval/ApiConfirmApproval";
import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import { defineStore } from "pinia";
export const useApprovalOvertime = defineStore("ApprovalOvertime", {
  state: () => ({
    listApprovalOvertime: [],
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
    overtimeDetail: {},
    CountTab: {},
  }),
  getters: {},
  actions: {
    setDataApprovalOvertime(payload) {
      this.listApprovalOvertime = payload.data.data;
      this.CountTab = payload.detail_count;
      this.listPagination.current_page = payload.data.current_page;
      this.listPagination.last_page = payload.data.last_page;
      this.listPagination.next_page_url = payload.data.next_page_url;
      this.listPagination.prev_page_url = payload.data.prev_page_url;
      this.listPagination.total = payload.data.total;
      this.listPagination.from = payload.data.from;
      this.listPagination.to = payload.data.to;
    },
    // Danh sách đơn làm thêm
    async GetAllApprovalOvertimeAction({ type, menu, EndTimeLoading }) {
      await GetAllApprovalOvertimeApi(type, menu)
        .then((payload) => {
          this.setDataApprovalOvertime(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Tạo mới đơn làm thêm
    async createApprovalOvertimeAction({
      dataUrl,
      router,
      toast,
      EndTimeLoading,
      ActivatedButton,
    }) {
      await CreateApprovalOvertimeApi(dataUrl.data)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.error(res.data.messages);
            ActivatedButton();
            EndTimeLoading();
          } else {
            toast.success("Tạo mới thành công");
            router.push(`/approval-overtime-view/detail=${res.data.parent_id}`);
            ActivatedButton();
            EndTimeLoading();
          }
        })
        .catch((err) => {
          console.log(err);
          ActivatedButton();
          EndTimeLoading();
        });
    },
    // Xóa đơn
    async deleteApprovalOvertimeAction({
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
            if (route.name == "Chi tiết đơn làm thêm") {
              router.go(-1);
            } else {
              this.GetAllApprovalOvertimeAction({
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
          EndTimeLoading();
        });
    },
    // Cập nhật đơn làm thêm
    async updateApprovalOvertimeAction({
      data,
      router,
      toast,
      EndTimeLoading,
    }) {
      UpdateApprovalOvertimeApi(data)
        .then((res) => {
          if (res.data?.status == "failed") {
            toast.error(res.data?.messages);
            EndTimeLoading();
          } else {
            toast.success("Cập nhật thành công");
            router.push(`/approval-overtime-view/detail=${data.ID}`);
            EndTimeLoading();
          }
        })
        .catch((err) => console.log(err), EndTimeLoading());
    },
    // Phân trang
    async GetNextPageAction(data) {
      const token = localStorage.getItem("TOKEN");
      NextPageApi(data, token)
        .then((payload) => {
          this.setDataApprovalOvertime(payload);
        })
        .catch((err) => console.log(err));
    },
    async GetPrevPageAction(data) {
      const token = localStorage.getItem("TOKEN");
      PrevPageApi(data, token)
        .then((payload) => {
          this.setDataApprovalOvertime(payload);
        })
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
            this.GetAllApprovalOvertimeAction({ type, menu, EndTimeLoading });
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
            this.GetAllApprovalOvertimeAction({ type, menu, EndTimeLoading });
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
