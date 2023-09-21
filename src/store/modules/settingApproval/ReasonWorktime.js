import {
  CreateWorktimeApi,
  DeleteWorktimeApi,
  GetAllWorktimeApi,
  UpdateWorktimeApi,
} from "@/api/ApiSettingApproval/ApiSettingWorktime";
import { CatchError } from "@/constants/FormatAll";
import { defineStore } from "pinia";
export const useReasonWorktime = defineStore("ReasonWorktime", {
  state: () => ({
    listWorktimes: [],
  }),
  getters: {
    ReasonWorktimeActive() {
      return this.listWorktimes.filter((item) => item.active == 1);
    },
  },
  actions: {
    setDataReasonWorktime(payload) {
      this.listWorktimes = payload.data;
    },
    async GetAllWorktimesAction() {
      await GetAllWorktimeApi()
        .then((payload) => {
          this.setDataReasonWorktime(payload.data);
        })
        .catch((err) => console.log(err));
    },

    async GetAllWorktimesEndTimeLoadingAction({ EndTimeLoading }) {
      await GetAllWorktimeApi()
        .then((payload) => {
          this.setDataReasonWorktime(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },

    async createWorktimeAction({
      data,
      toast,
      handleCloseDetail,
      EndTimeLoading,
    }) {
      await CreateWorktimeApi(data)
        .then((res) => {
          if (res.data?.status == "success") {
            this.GetAllWorktimesEndTimeLoadingAction({ EndTimeLoading });
            toast.success("Tạo mới thành công");
            handleCloseDetail();
          } else {
            toast.warning(res.data?.messages);
          }
        })
        .catch((res) => {
          CatchError({ res, toast, EndTimeLoading });
        });
    },
    async updateWorktimeAction({
      data,
      toast,
      handleCloseUpdate,
      EndTimeLoading,
    }) {
      await UpdateWorktimeApi(data)
        .then((res) => {
          if (res.data?.status == "success") {
            this.GetAllWorktimesEndTimeLoadingAction({ EndTimeLoading });
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
    async deleteWorktimeAction({
      id,
      toast,
      handleCloseConfirm,
      EndTimeLoading,
    }) {
      await DeleteWorktimeApi(id)
        .then((res) => {
          if (res.data?.status == "success") {
            this.GetAllWorktimesEndTimeLoadingAction({ EndTimeLoading });
            toast.success("Xóa thành công");
            handleCloseConfirm();
          } else {
            toast.warning(res.data?.messages);
          }
        })
        .catch((res) => {
          CatchError({ res, toast, EndTimeLoading });
        });
    },
  },
});
