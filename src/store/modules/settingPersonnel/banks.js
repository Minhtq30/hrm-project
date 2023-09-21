import { GetAllBanksApi } from "@/api/ApiSettingPersonnel/ApiBanks";
import { defineStore } from "pinia";
export const useBanks = defineStore("Banks", {
  state: () => ({ listBanks: [] }),
  getters: {},
  actions: {
    async GetAllBanksAction() {
      await GetAllBanksApi()
        .then((payload) => {
          this.listBanks = payload.data;
        })
        .catch((err) => console.log(err));
    },
  },
});
