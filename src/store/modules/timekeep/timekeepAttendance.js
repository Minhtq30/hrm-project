import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  GetAllTimekeepAttendanceApi,
  RecalculateMeritAndPenaltyApi,
  AddLogManualApi,
  GetLogManualApi,
  LockAttendanceApi,
  UnlockAttendanceApi,
  SearchTimekeepAttendanceApi,
  ShowDetailApprovalTimekeepApi,
  ShowDetailTimekeepAttendanceApi,
  GetAllTimekeepAttendanceExportApi,
  ExportLogAttendanceApi,
} from "@/api/ApiTimekeep/ApiTimekeepAttendance";
import { defineStore } from "pinia";
export const useTimekeepAttendance = defineStore("TimekeepAttendance", {
  state: () => ({
    listTimekeepAttendance: [],
    detailTimekeepAttendanceFullList: {},
    detailTimekeepAttendance: [],
    detailApprovalTimekeep: [],
    listExportLog: [],
    oldManualLog: [],
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
    listAllTimekeepAttendanceExport: [],
  }),
  getters: {},
  actions: {
    setDataTimekeepAttendance(payload) {
      this.listTimekeepAttendance = payload.data.data;
      this.listPagination.current_page = payload.data.current_page;
      this.listPagination.last_page = payload.data.last_page;
      this.listPagination.next_page_url = payload.data.next_page_url;
      this.listPagination.prev_page_url = payload.data.prev_page_url;
      this.listPagination.total = payload.data.total;
      this.listPagination.from = payload.data.from;
      this.listPagination.to = payload.data.to;
      this.detailTimekeepAttendanceFullList = payload;
    },
    setDataDetailTimekeepAttendance(payload) {
      this.detailTimekeepAttendance = payload.data;
    },
    setDataDetailApprovalTimekeep(payload) {
      this.detailApprovalTimekeep = payload.data;
    },
    setOldManualLog(payload) {
      this.oldManualLog = payload.data;
    },
    setDataTimekeepAttendanceExport(payload) {
      this.listAllTimekeepAttendanceExport = payload.data.data;
    },
    setDataExportLog(payload) {
      this.listExportLog = payload.data;
    },
    async GetAllTimekeepAttendanceAction({ data, EndTimeLoading }) {
      await GetAllTimekeepAttendanceApi(data)
        .then((payload) => {
          this.setDataTimekeepAttendance(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Export all
    async GetAllTimekeepAttendanceExportAction({
      data,
      funcitionExport,
      EndTimeLoading,
    }) {
      await GetAllTimekeepAttendanceExportApi(data)
        .then((payload) => {
          this.setDataTimekeepAttendanceExport(payload.data);
          setTimeout(() => {
            funcitionExport();
          }, 1000);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // end export all
    //Export log chấm công
    async ExportLogAttendanceAction({
      data,
      handleCloseModal,
      EndTimeLoading,
      exportData,
    }) {
      await ExportLogAttendanceApi(data)
        .then((res) => {
          this.setDataExportLog(res.data);
          exportData();
          handleCloseModal();
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async SearchTimekeepAttendanceAction({ data, EndTimeLoading }) {
      await SearchTimekeepAttendanceApi(data)
        .then((payload) => {
          this.setDataTimekeepAttendance(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async ShowDetailTimekeepAttendanceAction({ data, EndTimeLoading }) {
      await ShowDetailTimekeepAttendanceApi(data)
        .then((payload) => {
          this.setDataDetailTimekeepAttendance(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async ShowDetailApprovalTimekeepAction({ data, EndTimeLoading }) {
      await ShowDetailApprovalTimekeepApi(data)
        .then((payload) => {
          this.setDataDetailApprovalTimekeep(payload.data);
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
          this.setDataTimekeepAttendance(payload);
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
          this.setDataTimekeepAttendance(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Tính toán lại công ca
    async RecalculateMeritAndPenaltyAction({ data, toast, EndTimeLoading }) {
      await RecalculateMeritAndPenaltyApi(data)
        .then((res) => {
          if (res.data.status == "success") {
            const obj = {
              page: 1,
              year: data.year,
              month: data.month,
            };
            this.GetAllTimekeepAttendanceAction({
              data: obj,
              EndTimeLoading,
            });
            toast.success("Cập nhật thành công");
          } else {
            toast.error(res.data?.message);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(
            err.response?.data.messages ?? err.response?.data?.message
          );
          EndTimeLoading();
        });
    },
    //Thêm log chấm công
    async AddLogManualAction({ attendance_data, toast, EndTimeLoading }) {
      await AddLogManualApi(attendance_data)
        .then((res) => {
          if (res.data.status == "success") {
            toast.success("Cập nhật thành công");
            EndTimeLoading();
          } else {
            toast.error("Cập nhật thất bại");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Cập nhật thất bại");
          EndTimeLoading();
        });
    },
    ////lấy log chấm thủ công đã thêm
    async GetLogManualAction(id) {
      await GetLogManualApi(id)
        .then((payload) => {
          this.setOldManualLog(payload.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //Khóa bảng chấm công,đơn từ
    async LockAttendanceAction({ data, toast, EndTimeLoading }) {
      await LockAttendanceApi(data)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            toast.success("Khóa thành công");
            EndTimeLoading();
            window.location.reload();
          } else {
            toast.error("Khóa thất bại");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Khóa thất bại");
          EndTimeLoading();
        });
    },
    //Mở khóa bảng chấm công,đơn từ
    async UnlockAttendanceAction({ data, toast, EndTimeLoading }) {
      await UnlockAttendanceApi(data)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            toast.success("Mở khóa thành công");
            EndTimeLoading();
            window.location.reload();
          } else {
            toast.error("Khóa thất bại");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Khóa thất bại");
          EndTimeLoading();
        });
    },
  },
});
