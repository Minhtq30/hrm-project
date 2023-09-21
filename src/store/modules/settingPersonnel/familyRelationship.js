import { getAllFamilyRelationshipApi } from "@/api/ApiSettingPersonnel/ApiFamilyRelationship";
import { defineStore } from "pinia";
export const useFamilyRelationship = defineStore("FamilyRelationship", {
  state: () => ({ listFamilyRelationship: [] }),
  getters: {},
  actions: {
    async getAllFamilyRelationshipAction() {
      await getAllFamilyRelationshipApi()
        .then((payload) => {
          this.listFamilyRelationship = payload.data.data;
        })
        .catch((err) => console.log(err));
    },
  },
});
