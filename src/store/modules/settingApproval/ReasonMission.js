import {
  CreateMissionApi,
  DeleteMissionApi,
  GetAllMissionsApi,
  SearchMissionsApi,
  UpdateMissionApi,
} from "@/api/ApiSettingApproval/ApiSettingMission";
import { CatchError } from "@/constants/FormatAll";
import { defineStore } from "pinia";
export const useReasonMission = defineStore("ReasonMission", {
  state: () => ({
    listMissions: [],
  }),
  getters: {
    ReasonMissionActive() {
      return this.listMissions.filter((item) => item.status == 1);
    },
  },
  actions: {
    setDataReasonMission(payload) {
      this.listMissions = payload.data;
    },
    async GetAllMissionsAction() {
      await GetAllMissionsApi()
        .then((payload) => {
          this.setDataReasonMission(payload.data);
        })
        .catch((err) => console.log(err));
    },

    async GetAllMissionsEndTimeLoadingAction({ EndTimeLoading }) {
      await GetAllMissionsApi()
        .then((payload) => {
          this.setDataReasonMission(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },

    async SearchMissionsAction(search) {
      await SearchMissionsApi(search)
        .then((payload) => {
          this.setDataReasonMission(payload.data);
        })
        .catch((err) => console.log(err));
    },
    async createMissionAction({
      data,
      toast,
      handleCloseDetail,
      EndTimeLoading,
    }) {
      await CreateMissionApi(data)
        .then((res) => {
          if (res.data.status == "success") {
            this.GetAllMissionsEndTimeLoadingAction({ EndTimeLoading });
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
    async updateMissionAction({
      data,
      toast,
      handleCloseUpdate,
      EndTimeLoading,
    }) {
      await UpdateMissionApi(data)
        .then((res) => {
          if (res.data?.status == "success") {
            this.GetAllMissionsEndTimeLoadingAction({ EndTimeLoading });
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
    async deleteMissionAction({
      id,
      toast,
      handleCloseConfirm,
      EndTimeLoading,
    }) {
      await DeleteMissionApi(id)
        .then((res) => {
          if (res.data?.status == "success") {
            this.GetAllMissionsEndTimeLoadingAction({ EndTimeLoading });
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
