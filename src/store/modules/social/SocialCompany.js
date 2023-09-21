import {
  GetAllNoticesCompanyApi,
  GetAllPostCompanyApi,
} from "@/api/ApiSocial/ApiSocialCompany";
import { CreateSocialNewApi } from "@/api/ApiSocial/ApiSocialNew";
import { defineStore } from "pinia";
export const useSocialCompany = defineStore("SocialCompany", {
  state: () => ({
    listPostCompany: [],
    listNoticesCompany: [],
  }),
  getters: {},
  actions: {
    SetPostCompanyMutation(payload) {
      this.listPostCompany = payload.data;
    },
    SetNoticesCompanyMutation(payload) {
      this.listNoticesCompany = payload.data;
    },
    async GetAllPostCompanyAction(count) {
      await GetAllPostCompanyApi(count)
        .then((payload) => {
          this.SetPostCompanyMutation(payload.data);
        })
        .catch((err) => console.log(err));
    },
    async GetAllNoticesCompanyAction() {
      const token = localStorage.getItem("TOKEN");
      await GetAllNoticesCompanyApi(token)
        .then((payload) => {
          this.SetNoticesCompanyMutation(payload.data);
        })
        .catch((err) => console.log(err));
    },
    async CreatePostCompanyAction(context, { data, toast, closeModal, count }) {
      await CreateSocialNewApi(data)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.error(res.data.messages);
          } else {
            this.GetAllPostCompanyAction(count);
            closeModal();
            toast.success("Tạo mới thành công");
          }
        })
        .catch((err) => {
          if (err.response.data?.error) toast.error("That bai");
        });
    },
  },
});
