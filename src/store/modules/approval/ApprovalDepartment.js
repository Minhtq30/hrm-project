import {
  DeleteApprovalApi,
  GetAllApprovalDepartmentApi,
} from "@/api/ApiApproval/ApiApprovalTotal";
import {
  ConfirmApprovalApi,
  RevertApprovalApi,
} from "@/api/ApiApproval/ApiConfirmApproval";
import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import token from "@/constants/TokenAuth";
import { defineStore } from "pinia";
export const useApprovalDepartment = defineStore("ApprovalDepartment", {
  state: () => ({
    listApprovalDepartment: [],
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
    CountTab: {},
  }),
  getters: {},
  actions: {
    setDataApprovalDepartment(payload) {
      this.listApprovalDepartment = payload.data.data;
      this.CountTab = payload.detail_count;
      this.listPagination.current_page = payload.data.current_page;
      this.listPagination.last_page = payload.data.last_page;
      this.listPagination.next_page_url = payload.data.next_page_url;
      this.listPagination.prev_page_url = payload.data.prev_page_url;
      this.listPagination.total = payload.data.total;
      this.listPagination.from = payload.data.from;
      this.listPagination.to = payload.data.to;
    },
    async GetAllApprovalDepartmentAction({ key, search, EndTimeLoading }) {
      await GetAllApprovalDepartmentApi(key, search)
        .then((payload) => {
          this.setDataApprovalDepartment(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async DeleteApprovalAction({
      id,
      route,
      toast,
      handleCloseConfirm,
      EndTimeLoading,
    }) {
      await DeleteApprovalApi(id)
        .then((res) => {
          if (res.data.status == "success") {
            this.GetAllApprovalDepartmentAction({
              key: route.params.key,
              EndTimeLoading,
            });
            toast.success("Xóa thành công");
          } else {
            toast.error(res.data.messages);
          }
          handleCloseConfirm();
        })
        .catch((err) => {
          console.log(err);
          handleCloseConfirm();
          EndTimeLoading();
        });
    },
    async ConfirmApprovalAction({ dataApproval, toast, key, EndTimeLoading }) {
      await ConfirmApprovalApi(dataApproval)
        .then((payload) => {
          if (payload.data.status == "failed") {
            toast.error(payload.data.messages);
            EndTimeLoading();
          } else {
            this.GetAllApprovalDepartmentAction({
              key,
              EndTimeLoading,
            });
            toast.success("Thành công");
          }
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async RevertApprovalAction({ dataApproval, toast, key, EndTimeLoading }) {
      await RevertApprovalApi(dataApproval)
        .then((payload) => {
          if (payload.data.status == "failed") {
            toast.error(payload.data.messages);
            EndTimeLoading();
          } else {
            this.GetAllApprovalDepartmentAction({
              key,
              EndTimeLoading,
            });
            toast.success("Thành công");
          }
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async GetNextPageAction({ data, EndTimeLoading }) {
      NextPageApi(data, token)
        .then((payload) => {
          this.setDataApprovalDepartment(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async GetPrevPageAction({ data, EndTimeLoading }) {
      PrevPageApi(data, token)
        .then((payload) => {
          this.setDataApprovalDepartment(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
  },
});
