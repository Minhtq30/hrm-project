import {
  CreateLeaveApi,
  DeleteLeaveApi,
  GetAllLeavesApi,
  SearchLeavesApi,
  UpdateLeaveApi,
} from "@/api/ApiSettingApproval/ApiSettingLeave";
import { CatchError } from "@/constants/FormatAll";
import { defineStore } from "pinia";
export const useReasonLeave = defineStore("ReasonLeave", {
  state: () => ({
    listLeaves: [],
    typeDay: [
      {
        value: "WEEK",
        name: "Ngày / Tuần",
      },
      {
        value: "MONTH",
        name: "Ngày / Tháng",
      },
      {
        value: "YEAR",
        name: "Ngày / Năm",
      },
    ],
  }),
  getters: {
    ReasonLeavesActive() {
      return this.listLeaves.filter((item) => item.active == 1);
    },
  },
  actions: {
    setDataReasonLeave(payload) {
      this.listLeaves = payload.data;
    },
    async GetAllLeavesAction() {
      await GetAllLeavesApi()
        .then((payload) => {
          this.setDataReasonLeave(payload.data);
        })
        .catch((err) => console.log(err));
    },
    async GetAllLeavesEndTimeLoadingAction({ EndTimeLoading }) {
      await GetAllLeavesApi()
        .then((payload) => {
          this.setDataReasonLeave(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async SearchLeavesAction(search) {
      await SearchLeavesApi(search)
        .then((payload) => {
          this.setDataReasonLeave(payload.data);
        })
        .catch((err) => console.log(err));
    },
    async createLeaveAction({
      data,
      toast,
      handleCloseDetail,
      EndTimeLoading,
    }) {
      await CreateLeaveApi(data)
        .then((res) => {
          if (res.data.status == "success") {
            this.GetAllLeavesEndTimeLoadingAction({ EndTimeLoading });
            toast.success("Tạo mới thành công");
            handleCloseDetail();
          } else {
            toast.warning(res.data.messages);
          }
        })
        .catch((res) => {
          CatchError({ res, toast, EndTimeLoading });
        });
    },
    async updateLeaveAction({
      data,
      toast,
      handleCloseUpdate,
      EndTimeLoading,
    }) {
      await UpdateLeaveApi(data)
        .then((res) => {
          if (res.data?.status == "success") {
            this.GetAllLeavesEndTimeLoadingAction({ EndTimeLoading });
            toast.success("Cập nhật thành công");
            handleCloseUpdate();
          } else {
            toast.warning(res.data?.messages);
          }
        })
        .catch((res) => {
          CatchError({ res, toast, EndTimeLoading });
        });
    },
    async deleteLeaveAction({ id, toast, handleCloseConfirm, EndTimeLoading }) {
      DeleteLeaveApi(id)
        .then((res) => {
          if (res.data?.status == "success") {
            this.GetAllLeavesEndTimeLoadingAction({ EndTimeLoading });
            toast.success("Xóa thành công");
            handleCloseConfirm();
          }
        })
        .catch((res) => {
          CatchError({ res, toast, EndTimeLoading });
        });
    },
  },
});
