import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  GetAllAttendanceMonthApi,
  SearchAttendanceMonthApi,
} from "@/api/ApiTimekeep/ApiTimekeepAttendanceMonth";
import { defineStore } from "pinia";
export const useShiftMonth = defineStore("ShiftMonth", {
  state: () => ({
    listShiftMonth: [],
    listPagination: {
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
    setDataShiftMonth(payload) {
      this.listShiftMonth = payload.data.data;
      this.listPagination.current_page = payload.data.current_page;
      this.listPagination.last_page = payload.data.last_page;
      this.listPagination.next_page_url = payload.data.next_page_url;
      this.listPagination.prev_page_url = payload.data.prev_page_url;
      this.listPagination.total = payload.data.total;
      this.listPagination.from = payload.data.from;
      this.listPagination.to = payload.data.to;
    },
    async GetAllShiftMonthAction({ data, EndTimeLoading }) {
      await GetAllAttendanceMonthApi(data)
        .then((payload) => {
          this.setDataShiftMonth(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async SearchShiftMonthAction(data) {
      await SearchAttendanceMonthApi(data)
        .then((payload) => {
          this.setDataShiftMonth(payload.data);
        })
        .catch((err) => console.log(err));
    },
    async GetNextPageAction({ data, EndTimeLoading }) {
      const token = localStorage.getItem("TOKEN");
      NextPageApi(data, token)
        .then((payload) => {
          this.setDataShiftMonth(payload);
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
          this.setDataShiftMonth(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
  },
});
