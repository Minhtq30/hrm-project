import {
  DeleteApprovalApi,
  GetAllApprovalTotalApi,
  GetShitUserByDayApi,
  ShowDetailApprovalApi,
  ExportAllApprovalApi,
} from "@/api/ApiApproval/ApiApprovalTotal";
import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import { defineStore } from "pinia";
export const useApprovalTotal = defineStore("ApprovalTotal", {
  state: () => ({
    listApprovalTotal: [],
    exportData: [],
    detailComment: null,
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
    listApproval: [
      {
        title: "Upload Posm",
        code: "approval-posm",
        urlDetail: "/approval-posm-view/detail=",
        urlEdit: "/approval-posm-edit/",
        object: "posm",
        obj: "approval-posm",
        path: "/approval-posm-view/type=private&menu=ALL",
      },
      {
        title: "Đơn xin nghỉ",
        code: "approval-leave",
        urlDetail: "/approval-leave-view/detail=",
        urlEdit: "/approval-leave-edit/",
        object: "leave",
        obj: "approval-leave-leave",
        path: "/approval-leave-view/type=private&menu=ALL",
      },
      {
        title: "Đơn đăng ký ca",
        code: "approval-shift-register",
        urlDetail: "/approval-shiftresgister-view/detail=",
        urlEdit: "/approval-shiftresgister-edit/",
        object: "shift-register",
        obj: "approval-shift-register",
        path: "/approval-shiftresgister-view/type=private&menu=ALL",
      },
      {
        title: "Đơn công tác",
        code: "approval-private-mission",
        urlDetail: "/approval-mission-view/detail=",
        urlEdit: "/approval-mission-edit/",
        object: "private-mission",
        path: "/approval-mission-view/type=private&menu=ALL",
      },
      {
        title: "Đơn vắng mặt",
        code: "approval-meeting",
        urlDetail: "/approval-absence-view/detail=",
        urlEdit: "/approval-absence-edit/",
        object: "meeting",
        path: "/approval-absence-view/type=private&menu=ALL",
      },
      {
        title: "Đơn đổi ca",
        code: "approval-shift-change",
        urlDetail: "/approval-shiftchange-view/detail=",
        urlEdit: "/approval-shiftchange-edit/",
        object: "shift-change",
        path: "/approval-shiftchange-view/type=private&menu=ALL",
      },
      {
        title: "Đơn làm thêm",
        code: "approval-overtime-application",
        urlDetail: "/approval-overtime-view/detail=",
        urlEdit: "/approval-overtime-edit/",
        object: "overtime-application",
        obj: "approval-overtime-application",
        path: "/approval-overtime-view/type=private&menu=ALL",
      },
      {
        title: "Đơn tăng ca",
        code: "approval-shift-more",
        urlDetail: "/approval-shiftmore-view/detail=",
        urlEdit: "/approval-shiftmore-edit/",
        object: "shift-more",
        path: "/approval-shiftmore-view/type=all&menu=ALL",
      },
      {
        title: "Đơn làm theo chế độ",
        code: "approval-privilege-application",
        urlDetail: "/approval-worktime-view/detail=",
        urlEdit: "/approval-worktime-edit/",
        object: "privilege-application",
        path: "/approval-worktime-view/type=private&menu=ALL",
      },
      {
        title: "Đơn checkin/out",
        code: "approval-checkinout",
        urlDetail: "/approval-inout-view/detail=",
        urlEdit: "/approval-inout-edit/",
        object: "inout",
        obj: "approval-checkinout",
        path: "/approval-inout-view/type=private&menu=ALL",
      },
      {
        title: "Đơn thôi việc",
        code: "approval-leave-application",
        urlDetail: "/approval-resign-view/detail=",
        urlEdit: "/approval-resign-edit/",
        object: "leave-application",
        path: "/approval-resign-view/type=all&menu=ALL",
      },
    ],
    approvalDetail: {},
    arrApprover: [],
    ShitUserByDay: {},
    reasonCurrent: "",
  }),
  getters: {},
  // mutations: {},
  actions: {
    setDataApprovalTotal(payload) {
      this.listApprovalTotal = payload.data.data;
      this.CountTab = payload.detail_count;
      this.listPagination.current_page = payload.data.current_page;
      this.listPagination.last_page = payload.data.last_page;
      this.listPagination.next_page_url = payload.data.next_page_url;
      this.listPagination.prev_page_url = payload.data.prev_page_url;
      this.listPagination.total = payload.data.total;
      this.listPagination.from = payload.data.from;
      this.listPagination.to = payload.data.to;
    },
    setDataExport(payload) {
      this.exportData = payload.data;
    },
    ShowDetailApproval(payload) {
      this.approvalDetail = payload.data;
      this.reasonCurrent = payload.data.reason?.title;
      this.arrApprover = payload.data.app_approval_ids;
      this.detailComment = payload.data.approval_comments;
    },
    GetShitUserByDay(payload) {
      this.ShitUserByDay = payload.data;
    },
    // Danh sách đơn từ
    async GetAllApprovalTotalAction({ key, EndTimeLoading }) {
      await GetAllApprovalTotalApi(key)
        .then((payload) => {
          this.setDataApprovalTotal(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Chi tiết đơn từ
    async ShowDetailApprovalAction({ id, EndTimeLoading }) {
      await ShowDetailApprovalApi(id)
        .then((payload) => {
          if (payload.data.status == "failed") {
            EndTimeLoading();
          } else {
            this.ShowDetailApproval(payload.data);
            EndTimeLoading();
          }
        })
        .catch((err) => {
          EndTimeLoading();
          console.log(err);
        });
    },
    // Xóa đơn từ
    async DeleteApprovalAction({
      id,
      route,
      toast,
      handleCloseConfirm,
      EndTimeLoading,
    }) {
      await DeleteApprovalApi(id)
        .then((res) => {
          if (res.data.status == "success") {
            this.GetAllApprovalTotalAction({
              key: route.params.key,
              EndTimeLoading,
            });
            toast.success("Xóa thành công");
          } else {
            toast.error(res.data.messages);
          }
          handleCloseConfirm();
        })
        .catch((err) => {
          console.log(err);
          handleCloseConfirm();
          EndTimeLoading();
        });
    },
    async DeleteApprovalDetailAction({
      id,
      toast,
      router,
      handleCloseConfirm,
    }) {
      await DeleteApprovalApi(id)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.error(res.data.messages);
          } else {
            toast.success("Xóa đơn thành công");
            router.go(-1);
          }
          handleCloseConfirm();
        })
        .catch((err) => {
          console.log(err);
          handleCloseConfirm();
        });
    },
    async ExportAllApprovalAction({ exportFunction, toast, EndTimeLoading }) {
      await ExportAllApprovalApi()
        .then((payload) => {
          if (payload.data?.status == "success") {
            this.setDataExport(payload.data);
            exportFunction();
            EndTimeLoading();
            toast.success("Export thành công");
          } else {
            toast.error("Export thất bại");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Export thất bại");
        });
    },
    // Phân trang
    async GetNextPageAction({ data, EndTimeLoading }) {
      const token = localStorage.getItem("TOKEN");
      NextPageApi(data, token)
        .then((payload) => {
          this.setDataApprovalTotal(payload);
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
          this.setDataApprovalTotal(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Lấy thông tin ca làm việc của nhân sự
    async GetShitUserByDayAction(data) {
      await GetShitUserByDayApi(data)
        .then((payload) => {
          this.GetShitUserByDay(payload.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
