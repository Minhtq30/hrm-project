import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  GetAllTimekeepCompensatoryMonthApi,
  GetAllTimekeepCompensatoryYearApi,
  ShowDetailPersonnelCompensatoryApi,
  UpdateCompensatoryPersonnelApi,
  SearchTimekeepFurloughApi,
  getDataExportAllCompensatoryYearApi,
} from "@/api/ApiTimekeep/ApiTimekeepCompensatory";
import {
  SearchTimekeepFurloughDepartmentApi,
  SearchTimekeepFurloughYearDepartmentApi,
  ImportTimekeepFurloughApi,
} from "@/api/ApiTimekeep/ApiTimekeepFurlough/ApiTimekeepFurlough";
import { defineStore } from "pinia";
export const useTimekeepCompensatory = defineStore("TimekeepCompensatory", {
  state: () => ({
    listTimekeepCompensatoryMonth: [],
    listTimekeepCompensatoryYear: [],
    listDataExportCompensatoryYear: [],
    personnelDetail: null,
    UserCompensatoryYears: null,
    UserCompensatoryMonths: null,
    UserCompensatoryHistory: null,
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
    setDataTimekeepCompensatoryMonth(payload) {
      this.listTimekeepCompensatoryMonth = payload.data;
      this.listPagination.current_page = payload.meta.current_page;
      this.listPagination.last_page = payload.meta.last_page;
      this.listPagination.next_page_url = payload.links.next;
      this.listPagination.prev_page_url = payload.links.prev;
      this.listPagination.total = payload.meta.total;
      this.listPagination.from = payload.meta.from;
      this.listPagination.to = payload.meta.to;
    },
    setDataTimekeepCompensatoryYear(payload) {
      this.listTimekeepCompensatoryYear = payload.data;
      this.listPaginationYear.current_page = payload.meta.current_page;
      this.listPaginationYear.last_page = payload.meta.last_page;
      this.listPaginationYear.next_page_url = payload.links.next;
      this.listPaginationYear.prev_page_url = payload.links.prev;
      this.listPaginationYear.total = payload.meta.total;
      this.listPaginationYear.from = payload.meta.from;
      this.listPaginationYear.to = payload.meta.to;
    },
    setDataTimekeepCompensatory(payload) {
      this.listTimekeepCompensatoryYear = payload.data;
      this.listPaginationYear.current_page = payload.meta.current_page;
      this.listPaginationYear.last_page = payload.meta.last_page;
      this.listPaginationYear.next_page_url = payload.links.next;
      this.listPaginationYear.prev_page_url = payload.links.prev;
      this.listPaginationYear.total = payload.meta.total;
      this.listPaginationYear.from = payload.meta.from;
      this.listPaginationYear.to = payload.meta.to;
    },
    setDataDetailPersonnelCompensatory(payload) {
      this.personnelDetail = payload.personnel;
      this.UserCompensatoryYears = payload.years;
      this.UserCompensatoryMonths = payload.months;
      this.UserCompensatoryHistory = payload.transactions;
    },
    setDataExportCompensatoryYear(payload) {
      this.listDataExportCompensatoryYear = payload.data;
    },
    // Month
    async GetAllTimekeepCompensatoryMonthAction({ data, EndTimeLoading }) {
      await GetAllTimekeepCompensatoryMonthApi(data)
        .then((payload) => {
          this.setDataTimekeepCompensatoryMonth(payload.data);
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
          this.setDataTimekeepCompensatoryMonth(payload);
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
          this.setDataTimekeepCompensatoryMonth(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },

    // Year
    async GetAllTimekeepCompensatoryYearAction({ data, EndTimeLoading }) {
      await GetAllTimekeepCompensatoryYearApi(data)
        .then((payload) => {
          this.setDataTimekeepCompensatoryYear(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async GetNextPageYearAction({ data, EndTimeLoading }) {
      const token = localStorage.getItem("TOKEN");
      NextPageApi(data, token)
        .then((payload) => {
          this.setDataTimekeepCompensatoryYear(payload);
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
          this.setDataTimekeepCompensatoryYear(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Chi tiết
    async ShowDetailPersonnelCompensatoryAction({ id, EndTimeLoading }) {
      await ShowDetailPersonnelCompensatoryApi(id)
        .then((payload) => {
          if (payload.status == 200) {
            this.setDataDetailPersonnelCompensatory(payload.data);
          }
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
          this.setDataTimekeepCompensatoryMonth(payload.data);
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
          this.setDataTimekeepCompensatoryYear(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    //tìm kiếm
    async SearchTimekeepFurloughAction({ data, EndTimeLoading }) {
      await SearchTimekeepFurloughApi(data)
        .then((payload) => {
          this.setDataTimekeepCompensatory(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Cập nhật nghỉ bù
    async UpdateCompensatoryPersonnelAction({
      data,
      toast,
      handleCloseModal,
      EndTimeLoading,
    }) {
      await UpdateCompensatoryPersonnelApi(data)
        .then((res) => {
          if (res.data?.success == true) {
            toast.success("Cập nhật thành công");
            this.setDataDetailPersonnelCompensatory({
              id: data.personnel_id,
              EndTimeLoading,
            });
            handleCloseModal();
          } else {
            toast.error(res.data?.message);
          }
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // import quản lý phép
    async ImportTimekeepFurloughAction(dataUrl) {
      await ImportTimekeepFurloughApi(dataUrl.data)
        .then((payload) => this.setDataTimekeepCompensatoryMonth(payload))
        .catch((err) => console.log(err));
    },
    //export bảng nghỉ bù
    async getDataExportAllCompensatoryYearAction({
      year,
      funcitionExport,
      EndTimeLoading,
    }) {
      await getDataExportAllCompensatoryYearApi(year)
        .then((payload) => {
          this.setDataExportCompensatoryYear(payload.data);
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
