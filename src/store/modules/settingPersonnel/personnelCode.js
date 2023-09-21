import { GetLastCodePersonnelApi } from "@/api/ApiPersonnel/ApiPersonnel";
import {
  ChangePersonnelCodeApi,
  GetAllPersonnelCodeApi,
  GetPersonnelCodeApi,
  HideShowPersonnelCodeApi,
} from "@/api/ApiSettingPersonnel/ApiPersonnelCode";
import { defineStore } from "pinia";
export const usePersonnelCode = defineStore("PersonnelCode", {
  state: () => ({
    listPersonnelCode: [],
    checkedCode: 0,
    codePersonnel: null,
    LastCode: null,
  }),
  getters: {},
  actions: {
    setDataPersonnelCode(payload) {
      this.listPersonnelCode = payload.data;
      this.codePersonnel = payload.data.find(
        (item) => item.is_active == 1
      ).value;
    },
    setDataPersonnelCodeActive(payload) {
      if (payload.data.length > 0) {
        this.codePersonnel = payload.data[0].value;
        this.checkedCode = 1;
      } else {
        this.checkedCode = 0;
        this.codePersonnel = "";
      }
    },
    setDataLastCode(payload) {
      this.LastCode = payload + 1;
    },
    async getAllPersonnelCodeAction() {
      await GetAllPersonnelCodeApi()
        .then((payload) => {
          this.setDataPersonnelCode(payload.data);
        })
        .catch((err) => console.log(err));
    },
    async changePersonnelCodeAction({ id, toast }) {
      await ChangePersonnelCodeApi(id)
        .then((res) => {
          if (res.data?.status == "success") {
            this.getAllPersonnelCodeAction();
            toast.success("Đổi mã thành công");
          } else {
            toast.error("Thất bại");
          }
        })
        .catch((err) => console.log(err));
    },
    async GetLastCodePersonnelAction(code) {
      await GetLastCodePersonnelApi(code)
        .then((payload) => {
          this.setDataLastCode(payload.data);
        })
        .catch((err) => console.log(err));
    },
    async getPersonnelCodeAction() {
      await GetPersonnelCodeApi()
        .then((payload) => {
          this.setDataPersonnelCodeActive(payload.data);
          if (payload.data.data) {
            this.GetLastCodePersonnelAction(payload.data?.data[0]?.value);
          }
        })
        .catch((err) => console.log(err));
    },
    async hideShowPersonnelCodeAction({ data, toast }) {
      await HideShowPersonnelCodeApi(data)
        .then((res) => {
          //hien thi thong bao khi cap nhat
          if (res.data?.status == "success") {
            this.getAllPersonnelCodeAction();
            toast.success("Cập nhật thành công");
          } else {
            toast.error("Cập nhật thất bại");
          }
        })
        .catch((err) => console.log(err));
    },
  },
});
