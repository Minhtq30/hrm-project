import {
  SettingInsuranceApi,
  UpdateSettingInsuranceApi,
} from "@/api/ApiInsurance/ApiSettingInsurance";
import { defineStore } from "pinia";
export const useSettingInsurance = defineStore("SettingInsurance", {
  state: () => ({ SettingInsurance: {} }),
  getters: {},
  actions: {
    setDataSettingInsurance(payload) {
      this.SettingInsurance = payload;
    },
    async SettingInsuranceAction({ EndTimeLoading }) {
      await SettingInsuranceApi()
        .then((payload) => {
          if (payload.data?.status == "success") {
            this.setDataSettingInsurance(payload.data);
          }
          EndTimeLoading();
        })
        .catch((err) => console.log(err));
    },
    async UpdateSettingInsuranceAction({ data, toast, EndTimeLoading }) {
      await UpdateSettingInsuranceApi(data)
        .then((payload) => {
          if (payload.data?.status == "success") {
            toast.success("Cập nhật thành công");
            this.SettingInsuranceAction({ EndTimeLoading });
          }
          EndTimeLoading();
        })
        .catch((err) => console.log(err));
    },
  },
});
