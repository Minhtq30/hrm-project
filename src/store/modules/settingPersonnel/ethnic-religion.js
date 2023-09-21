import {
  GetAllEthnicsApi,
  GetAllReligionApi,
} from "@/api/ApiSettingPersonnel/ApiEthnics";
import { defineStore } from "pinia";
export const useEthinicReligion = defineStore("EthinicReligion", {
  state: () => ({
    listEthnics: [],
    listReligions: [],
    listLevelSchool: [
      {
        title: "1/12",
        value: "1",
      },
      {
        title: "2/12",
        value: "2",
      },
      {
        title: "3/12",
        value: "3",
      },
      {
        title: "4/12",
        value: "4",
      },
      {
        title: "5/12",
        value: "5",
      },
      {
        title: "6/12",
        value: "6",
      },
      {
        title: "7/12",
        value: "7",
      },
      {
        title: "8/12",
        value: "8",
      },
      {
        title: "9/12",
        value: "9",
      },
      {
        title: "10/12",
        value: "10",
      },
      {
        title: "11/12",
        value: "11",
      },
      {
        title: "12/12",
        value: "12",
      },
    ],
  }),
  getters: {},
  actions: {
    // Start Dân tộc
    async GetAllEthnicsAction() {
      await GetAllEthnicsApi()
        .then((payload) => {
          this.listEthnics = payload.data;
        })
        .catch((err) => console.log(err));
    },
    // End
    // Start Tôn giáo
    async GetAllReligionAction() {
      await GetAllReligionApi()
        .then((payload) => {
          this.listReligions = payload.data;
        })
        .catch((err) => console.log(err));
    },
    // End
  },
});
