import {
  DeleteApprovalApi,
  GetAllOtherApprovalApi,
} from "@/api/ApiApproval/ApiApprovalTotal";
import {
  ConfirmApprovalApi,
  RevertApprovalApi,
} from "@/api/ApiApproval/ApiConfirmApproval";
import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import token from "@/constants/TokenAuth";
import { defineStore } from "pinia";
export const useOtherApproval = defineStore("OtherApproval", {
  state: () => ({
    AllOtherApproval: [],
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
    setDataOtherApproval(payload) {
      this.AllOtherApproval = payload.data.data;
      this.CountTab = payload.detail_count;
      this.listPagination.current_page = payload.data.current_page;
      this.listPagination.last_page = payload.data.last_page;
      this.listPagination.next_page_url = payload.data.next_page_url;
      this.listPagination.prev_page_url = payload.data.prev_page_url;
      this.listPagination.total = payload.data.total;
      this.listPagination.from = payload.data.from;
      this.listPagination.to = payload.data.to;
    },
    async GetAllOtherApprovalAction({ id, EndTimeLoading }) {
      await GetAllOtherApprovalApi(id)
        .then((payload) => {
          this.setDataOtherApproval(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async deleteOtherApprovalAction({
      id,
      idPerson,
      EndTimeLoading,
      handleCloseConfirm,
    }) {
      await DeleteApprovalApi(id)
        .then(() => {
          this.GetAllOtherApprovalAction({
            idPerson,
            EndTimeLoading,
          });
          handleCloseConfirm();
        })
        .catch((res) => {
          console.log(res);
          EndTimeLoading();
          handleCloseConfirm();
        });
    },
    async GetNextPageAction({ data, EndTimeLoading }) {
      NextPageApi(data, token)
        .then((payload) => {
          this.setDataOtherApproval(payload);
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
          this.setDataOtherApproval(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Duyệt,Hoàn và Không duyệt
    async ConfirmApprovalAction({ dataApproval, toast, id, EndTimeLoading }) {
      await ConfirmApprovalApi(dataApproval)
        .then((payload) => {
          if (payload.data.status == "failed") {
            toast.error(payload.data.messages);
            EndTimeLoading();
          } else {
            this.GetAllOtherApprovalAction({
              id,
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
    async RevertApprovalAction({ dataApproval, toast, id, EndTimeLoading }) {
      await RevertApprovalApi(dataApproval)
        .then((payload) => {
          if (payload.data.status == "failed") {
            toast.error(payload.data.messages);
            EndTimeLoading();
          } else {
            this.GetAllOtherApprovalAction({
              id,
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
  },
});
