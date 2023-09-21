import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import { SearchPersonnelApi } from "@/api/ApiPersonnel/ApiPersonnel";
import {
  CreateAttendanceFullApi,
  DeleteAttendanceFullApi,
  GetAllTimekeepAttendanceFullApi,
  UpdateAttendanceFullApi,
} from "@/api/ApiTimekeep/ApiTimekeepAttendanceFull";
import { defineStore } from "pinia";
export const useAttendanceFull = defineStore("AttendanceFull", {
  state: () => ({
    listAttendanceFull: [],
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
    listPersonnelsAttendanceFull: [],
  }),
  getters: {},
  actions: {
    setDataAttendanceFull(payload) {
      this.listAttendanceFull = payload.data.data;
      this.listPagination.current_page = payload.data.current_page;
      this.listPagination.last_page = payload.data.last_page;
      this.listPagination.next_page_url = payload.data.next_page_url;
      this.listPagination.prev_page_url = payload.data.prev_page_url;
      this.listPagination.total = payload.data.total;
      this.listPagination.from = payload.data.from;
      this.listPagination.to = payload.data.to;
    },
    setDataPersonnelsAttendanceFull(payload) {
      this.listPersonnelsAttendanceFull = payload.data;
    },
    async GetAllAttendanceFullAction({ EndTimeLoading }) {
      await GetAllTimekeepAttendanceFullApi()
        .then((payload) => {
          this.setDataAttendanceFull(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async CreateAttendanceFullAction({
      data,
      handleCloseDetail,
      EndTimeLoading,
      router,
      toast,
      ActivatedButton,
    }) {
      await CreateAttendanceFullApi(data)
        .then((res) => {
          if (res.data.status == "success") {
            this.GetAllAttendanceFullAction({ EndTimeLoading });
            handleCloseDetail();
            toast.success("Tạo mới thành công");
            router.push("/timekeep-attendance-full");
            ActivatedButton();
          } else {
            toast.warning(res.data.messages);
            ActivatedButton();
          }
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
          ActivatedButton();
        });
    },
    async DeleteAttendanceFullAction({
      id,
      toast,
      handleCloseConfirm,
      EndTimeLoading,
    }) {
      await DeleteAttendanceFullApi(id)
        .then((res) => {
          if (res.data.status == "success") {
            this.GetAllAttendanceFullAction({ EndTimeLoading });
            toast.success("Xóa thành công");
            handleCloseConfirm();
          } else {
            toast.error(res.data?.messages);
          }
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async UpdateAttendanceFullAction({
      data,
      toast,
      EndTimeLoading,
      handleCloseEdit,
    }) {
      await UpdateAttendanceFullApi(data)
        .then((res) => {
          if (res.data.status == "success") {
            this.GetAllAttendanceFullAction({ EndTimeLoading });
            toast.success("Cập nhật thành công");
            handleCloseEdit();
          } else {
            toast.error(res.data?.messages);
          }
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
          this.setDataAttendanceFull(payload);
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
          this.setDataAttendanceFull(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Tìm kiếm người tự động chấm công
    async SearchPersonnelsAttendanceFullAction({ data, loading }) {
      await SearchPersonnelApi(data)
        .then((payload) => {
          this.setDataPersonnelsAttendanceFull(payload.data.data);
          loading(false);
        })
        .catch((err) => {
          console.log(err);
          loading(false);
        });
    },
    async SearchAttendanceFullAction(data) {
      await SearchPersonnelApi(data)
        .then((payload) => {
          this.setDataPersonnelsAttendanceFull(payload.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
