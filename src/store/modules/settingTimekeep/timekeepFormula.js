import {
  OldSettingCompensatoryApi,
  UpdateSettingCompensatoryApi,
} from "@/api/ApiSettingTimekeep/ApiSettingTimekeep";
import { defineStore } from "pinia";
export const useTimekeepFormula = defineStore("TimekeepFormula", {
  state: () => ({
    OldSettingCompensatory: {},
  }),
  getters: {},
  actions: {
    setDataSettingCompensatory(payload) {
      this.OldSettingCompensatory = payload;
    },
    async OldSettingCompensatoryAction({ EndTimeLoading }) {
      await OldSettingCompensatoryApi()
        .then((payload) => {
          this.setDataSettingCompensatory(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async UpdateSettingCompensatoryAction({ data, toast, EndTimeLoading }) {
      await UpdateSettingCompensatoryApi(data)
        .then(() => {
          this.OldSettingCompensatoryAction({ EndTimeLoading });
          toast.success("Cập nhật thành công");
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
  },
});
