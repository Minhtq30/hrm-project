import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  GetAllAttendanceShiftregisterApi,
  SearchAttendanceShiftregisterApi,
} from "@/api/ApiTimekeep/ApiTimekeepAttendanceShiftregister";
import { defineStore } from "pinia";
export const useAttendanceShiftregister = defineStore(
  "AttendanceShiftregister",
  {
    state: () => ({
      listTimekeepShiftregister: [],
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
      setDataTimekeepShiftregister(payload) {
        this.listTimekeepShiftregister = payload.data.data;
        this.listPagination.current_page = payload.data.current_page;
        this.listPagination.last_page = payload.data.last_page;
        this.listPagination.next_page_url = payload.data.next_page_url;
        this.listPagination.prev_page_url = payload.data.prev_page_url;
        this.listPagination.total = payload.data.total;
        this.listPagination.from = payload.data.from;
        this.listPagination.to = payload.data.to;
      },
      async GetAllTimekeepShiftregisterAction({ data, EndTimeLoading }) {
        await GetAllAttendanceShiftregisterApi(data)
          .then((payload) => {
            this.setDataTimekeepShiftregister(payload.data);
            EndTimeLoading();
          })
          .catch((err) => {
            EndTimeLoading();
            console.log(err);
          });
      },
      async SearchAttendanceShiftregisterAction(data) {
        await SearchAttendanceShiftregisterApi(data)
          .then((payload) => {
            this.setDataTimekeepShiftregister(payload.data);
          })
          .catch((err) => console.log(err));
      },
      async GetNextPageAction({ data, EndTimeLoading }) {
        const token = localStorage.getItem("TOKEN");
        NextPageApi(data, token)
          .then((payload) => {
            this.setDataTimekeepShiftregister(payload);
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
            this.setDataTimekeepShiftregister(payload);
            EndTimeLoading();
          })
          .catch((err) => {
            console.log(err);
            EndTimeLoading();
          });
      },
    },
  }
);
