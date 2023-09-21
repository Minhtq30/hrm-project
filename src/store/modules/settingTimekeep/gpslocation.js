import {
  CreateGPSLocationApi,
  DeleteGPSLocationApi,
  GetAllGPSLocationApi,
  SearchGPSLocationApi,
  UpdateGPSLocationApi,
} from "@/api/ApiSettingTimekeep/ApiSettingGPSLocation";
import { defineStore } from "pinia";
export const useGpsLocation = defineStore("GpsLocation", {
  state: () => ({
    listGPSLocation: [],
    searchGPSLocation: [],
  }),
  getters: {},
  actions: {
    setDataGpsLocation(payload) {
      this.listGPSLocation = payload.data;
    },
    setDataSearchGPSLocation(payload) {
      this.searchGPSLocation = payload.data;
    },
    async GetAllGPSLocationAction() {
      await GetAllGPSLocationApi()
        .then((payload) => {
          this.setDataGpsLocation(payload.data);
        })
        .catch((err) => console.log(err));
    },

    async GetAllGPSLocationEndTimeLoadingAction({ EndTimeLoading }) {
      await GetAllGPSLocationApi()
        .then((payload) => {
          this.setDataGpsLocation(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },

    async createGPSLocationAction({
      data,
      toast,
      handleCloseDetail,
      EndTimeLoading,
    }) {
      await CreateGPSLocationApi(data)
        .then((res) => {
          if (res.data.status == "success") {
            toast.success("Tạo mới thành công");
            this.GetAllGPSLocationEndTimeLoadingAction({ EndTimeLoading });
            handleCloseDetail();
          } else {
            toast.error(res.data.messages);
          }
        })
        .catch((err) => console.log(err));
    },
    async updateGPSLocationAction({
      data,
      toast,
      handleCloseUpdate,
      EndTimeLoading,
    }) {
      await UpdateGPSLocationApi(data)
        .then((res) => {
          if (res.data?.status == "success") {
            this.GetAllGPSLocationEndTimeLoadingAction({ EndTimeLoading });
            toast.success("Cập nhật thành công");
            handleCloseUpdate();
          } else {
            toast.error(res.data?.messages);
          }
        })
        .catch((err) => console.log(err));
    },
    async deleteGPSLocationAction({
      id,
      toast,
      handleCloseConfirm,
      EndTimeLoading,
    }) {
      await DeleteGPSLocationApi(id)
        .then((res) => {
          if (res.data?.status == "success") {
            this.GetAllGPSLocationEndTimeLoadingAction({ EndTimeLoading });
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
    async searchGPSLocationAction(search) {
      await SearchGPSLocationApi(search)
        .then((payload) => {
          this.setDataSearchGPSLocation(payload.data);
        })
        .catch((err) => console.log(err));
    },
    async searchGPSAction({ search, EndTimeLoading }) {
      await SearchGPSLocationApi(search)
        .then((payload) => {
          this.setDataGpsLocation(payload.data);
          EndTimeLoading();
        })
        .catch((err) => console.log(err));
    },
  },
});
