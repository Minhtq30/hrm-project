import {
  CreateShiftApi,
  DeleteShiftApi,
  GetAllShiftsApi,
  ReplicationShiftApi,
  SearchShiftsApi,
  UpdateShiftApi,
} from "@/api/ApiSettingTimekeep/ApiSettingShift";
import { defineStore } from "pinia";
export const useShifts = defineStore("Shifts", {
  state: () => ({
    listShifts: [],
    searchShifts: [],
    shiftDetail: {},
  }),
  getters: {
    AllShiftsActive() {
      return this.listShifts.filter((item) => item.active == 1);
    },
  },
  actions: {
    setDataShifts(payload) {
      this.listShifts = payload.data;
    },
    setDataSearchShifts(payload) {
      this.searchShifts = payload.data;
    },
    ShowDetailShift(id) {
      const final = this.listShifts.find((item) => item.ID == id);
      this.shiftDetail = final;
    },
    async GetAllShiftsAction() {
      await GetAllShiftsApi()
        .then((payload) => {
          this.setDataShifts(payload.data);
        })
        .catch((err) => console.log(err));
    },
    async GetAllShiftsEndTimeLoadingAction({ EndTimeLoading }) {
      await GetAllShiftsApi()
        .then((payload) => {
          this.setDataShifts(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async SearchShiftsAction(search) {
      await SearchShiftsApi(search)
        .then((payload) => {
          this.setDataSearchShifts(payload.data);
        })
        .catch((err) => console.log(err));
    },
    async SearchShiftAction({ search, EndTimeLoading }) {
      await SearchShiftsApi(search)
        .then((payload) => {
          this.setDataShifts(payload.data);
          EndTimeLoading();
        })
        .catch((err) => console.log(err));
    },
    async createShiftAction({ data, toast, router }) {
      await CreateShiftApi(data)
        .then((res) => {
          if (res.data.status == "success") {
            router.push("/timekeep-setting-shift");
            toast.success("Tạo mới thành công");
          } else {
            toast.error(res.data.messages);
          }
        })
        .catch((err) => console.log(err));
    },
    async updateShiftAction({ data, toast, router }) {
      await UpdateShiftApi(data)
        .then((res) => {
          if (res.data?.status == "success") {
            router.push("/timekeep-setting-shift");
            toast.success("Tạo mới thành công");
          } else {
            toast.error("Cập nhật thất bại");
          }
        })
        .catch((err) => console.log(err));
    },
    async deleteShiftAction({ id, toast, handleCloseConfirm, EndTimeLoading }) {
      await DeleteShiftApi(id)
        .then((res) => {
          if (res.data?.status == "success") {
            this.GetAllShiftsEndTimeLoadingAction({ EndTimeLoading });
            toast.success("Xóa thành công");
            handleCloseConfirm();
          } else {
            toast.error(res.data?.messages);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async ReplicationShiftAction({ id, toast, EndTimeLoading }) {
      await ReplicationShiftApi(id)
        .then((res) => {
          if (res.data?.status == "success") {
            this.GetAllShiftsEndTimeLoadingAction({ EndTimeLoading });
            toast.success("Nhân bản thành công");
          } else {
            toast.error(res.data?.messages);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ShowDetailShiftAction(id) {
      this.ShowDetailShift(id);
    },
  },
});
