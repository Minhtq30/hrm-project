import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  GetAllTimekeepFurloughMonthApi,
  GetAllTimekeepFurloughYearApi,
  SearchTimekeepFurloughDepartmentApi,
  SearchTimekeepFurloughMonthApi,
  SearchTimekeepFurloughYearApi,
  SearchTimekeepFurloughYearDepartmentApi,
  ShowDetailPersonnelFurloughApi,
  ImportTimekeepFurloughApi,
  RecalcFurloughMonthApi,
  getDataExportAllFurloughYearApi,
} from "@/api/ApiTimekeep/ApiTimekeepFurlough/ApiTimekeepFurlough";
import { defineStore } from "pinia";
export const useTimekeepFurlough = defineStore("TimekeepFurlough", {
  state: () => ({
    listTimekeepFurloughMonth: [],
    listTimekeepFurloughYear: [],
    listDataExportFurloughYear: [],
    recalcData: null,
    UserFurloughYears: null,
    UserFurloughMonths: null,
    UserFurloughHistory: null,
    UserPersonnel: null,
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
    listPaginationYear: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
  }),
  getters: {},

  actions: {
    setDataTimekeepFurloughMonth(payload) {
      this.listTimekeepFurloughMonth = payload.data;
      this.listPagination.current_page = payload.meta.current_page;
      this.listPagination.last_page = payload.meta.last_page;
      this.listPagination.next_page_url = payload.links.next;
      this.listPagination.prev_page_url = payload.links.prev;
      this.listPagination.total = payload.meta.total;
      this.listPagination.from = payload.meta.from;
      this.listPagination.to = payload.meta.to;
    },
    setDataTimekeepFurloughYear(payload) {
      this.listTimekeepFurloughYear = payload.data;
      this.listPaginationYear.current_page = payload.meta.current_page;
      this.listPaginationYear.last_page = payload.meta.last_page;
      this.listPaginationYear.next_page_url = payload.links.next;
      this.listPaginationYear.prev_page_url = payload.links.prev;
      this.listPaginationYear.total = payload.meta.total;
      this.listPaginationYear.from = payload.meta.from;
      this.listPaginationYear.to = payload.meta.to;
    },
    setDataRecalc(payload) {
      this.recalcData = payload.data;
    },
    setDataDetailPersonnelFurlough(payload) {
      this.UserFurloughYears = payload.years;
      this.UserFurloughMonths = payload.months;
      this.UserFurloughHistory = payload.transactions;
      this.UserPersonnel = payload.personnel;
    },
    setDataExportFurloughYear(payload) {
      this.listDataExportFurloughYear = payload.data;
    },
    // Month
    async GetAllTimekeepFurloughMonthAction({ data, EndTimeLoading }) {
      await GetAllTimekeepFurloughMonthApi(data)
        .then((payload) => {
          this.setDataTimekeepFurloughMonth(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async SearchTimekeepFurloughMonthAction({ data, EndTimeLoading }) {
      await SearchTimekeepFurloughMonthApi(data)
        .then((payload) => {
          this.setDataTimekeepFurloughMonth(payload.data);
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
          this.setDataTimekeepFurloughMonth(payload);
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
          this.setDataTimekeepFurloughMonth(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },

    // Year
    async GetAllTimekeepFurloughYearAction({ data, EndTimeLoading }) {
      await GetAllTimekeepFurloughYearApi(data)
        .then((payload) => {
          this.setDataTimekeepFurloughYear(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async SearchTimekeepFurloughYearAction({
      data,
      EndTimeLoading,
      handleCloseSearch,
    }) {
      await SearchTimekeepFurloughYearApi(data)
        .then((payload) => {
          this.setDataTimekeepFurloughYear(payload.data);
          handleCloseSearch();
          EndTimeLoading();
        })
        .catch((err) => {
          handleCloseSearch();
          console.log(err);
          EndTimeLoading();
        });
    },
    async GetNextPageYearAction({ data, EndTimeLoading }) {
      const token = localStorage.getItem("TOKEN");
      NextPageApi(data, token)
        .then((payload) => {
          this.setDataTimekeepFurloughYear(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async GetPrevPageYearAction({ data, EndTimeLoading }) {
      const token = localStorage.getItem("TOKEN");
      PrevPageApi(data, token)
        .then((payload) => {
          this.setDataTimekeepFurloughYear(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Chi tiết
    async ShowDetailPersonnelFurloughAction({ id, EndTimeLoading }) {
      await ShowDetailPersonnelFurloughApi(id)
        .then((payload) => {
          this.setDataDetailPersonnelFurlough(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Tìm kiếm theo phòng ban
    async SearchTimekeepFurloughDepartmentAction({ data, EndTimeLoading }) {
      await SearchTimekeepFurloughDepartmentApi(data)
        .then((payload) => {
          this.setDataTimekeepFurloughMonth(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async SearchTimekeepFurloughYearDepartmentAction({ data, EndTimeLoading }) {
      await SearchTimekeepFurloughYearDepartmentApi(data)
        .then((payload) => {
          this.setDataTimekeepFurloughYear(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // import quản lý phép
    async ImportTimekeepFurloughAction(data) {
      await ImportTimekeepFurloughApi(data.data)
        .then((payload) => {
          console.log(data, payload);
          // this.setDataTimekeepFurloughMonth(payload.data);
        })
        .catch((err) => console.log(err));
    },
    // tính toán lại công tháng
    async RecalcFurloughMonthAction({
      data,
      EndTimeLoading,
      toast,
      handleCloseModal,
    }) {
      await RecalcFurloughMonthApi(data)
        .then((payload) => {
          if (payload.data.message == "Success") {
            this.setDataRecalc(payload?.data);
            toast.success("Cập nhật thành công");
            EndTimeLoading();
            handleCloseModal();
          } else {
            toast.error(payload.data?.messages);
          }
        })
        .catch((err) => {
          console.log(err);
          // toast.warning(err.data?.messages);
          EndTimeLoading();
        });
    },
    async getDataExportAllFurloughYearAction({
      year,
      funcitionExport,
      EndTimeLoading,
    }) {
      await getDataExportAllFurloughYearApi(year)
        .then((payload) => {
          this.setDataExportFurloughYear(payload.data);
          setTimeout(() => {
            funcitionExport();
          }, 1000);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
  },
});
