import { GetAllAcademicsApi } from "@/api/ApiPersonnel/ApiAcademic";
import { defineStore } from "pinia";
export const useAcademic = defineStore("academic", {
  state: () => ({ listAcademic: [] }),
  getters: {},
  actions: {
    async GetAllAcademicsAction() {
      await GetAllAcademicsApi()
        .then((payload) => {
          this.listAcademic = payload.data;
        })
        .catch((err) => console.log(err));
    },
  },
});
