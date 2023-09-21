import {
  CreateAbsencesApi,
  DeleteAbsenceApi,
  GetAllAbsencesApi,
  SearchAbsencesApi,
  UpdateAbsenceApi,
} from "@/api/ApiSettingApproval/ApiSettingAbsence";
import { CatchError } from "@/constants/FormatAll";
import { defineStore } from "pinia";
export const useReasonAbsences = defineStore("ReasonAbsences", {
  state: () => ({
    listAbsences: [],
    typeAbsences: [
      {
        name: "Tuần",
        value: "week",
      },
      {
        name: "Tháng",
        value: "month",
      },
      {
        name: "Năm",
        value: "year",
      },
    ],
  }),
  getters: {
    ReasonAbsencesActive() {
      return this.listAbsences.filter((item) => item.active == 1);
    },
  },
  actions: {
    setDataReasonAbsences(payload) {
      this.listAbsences = payload.data;
    },
    async GetAllAbsencesAction() {
      await GetAllAbsencesApi()
        .then((payload) => {
          this.setDataReasonAbsences(payload.data);
        })
        .catch((err) => console.log(err));
    },

    async GetAllAbsencesEndTimeLoadingAction({ EndTimeLoading }) {
      await GetAllAbsencesApi()
        .then((payload) => {
          this.setDataReasonAbsences(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },

    async SearchAbsencesAction(search) {
      await SearchAbsencesApi(search)
        .then((payload) => {
          this.setDataReasonAbsences(payload.data);
        })
        .catch((err) => console.log(err));
    },
    async createAbsenceAction({
      data,
      toast,
      handleCloseDetail,
      EndTimeLoading,
    }) {
      await CreateAbsencesApi(data)
        .then((res) => {
          if (res.data.status == "success") {
            this.GetAllAbsencesEndTimeLoadingAction({ EndTimeLoading });
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
    async updateAbsenceAction({
      data,
      toast,
      handleCloseUpdate,
      EndTimeLoading,
    }) {
      await UpdateAbsenceApi(data)
        .then((res) => {
          if (res.data?.status == "success") {
            this.GetAllAbsencesEndTimeLoadingAction({ EndTimeLoading });
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
    async deleteAbsenceAction({
      id,
      toast,
      handleCloseConfirm,
      EndTimeLoading,
    }) {
      await DeleteAbsenceApi(id)
        .then((res) => {
          if (res.data?.status == "success") {
            this.GetAllAbsencesEndTimeLoadingAction({ EndTimeLoading });
            toast.success("Xóa thành công");
            handleCloseConfirm();
          } else {
            toast.error(res.data?.messages);
          }
        })
        .catch((res) => {
          CatchError({ res, toast, EndTimeLoading });
        });
    },
  },
});
