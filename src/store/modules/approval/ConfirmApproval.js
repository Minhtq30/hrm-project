import { DeleteApprovalApi } from "@/api/ApiApproval/ApiApprovalTotal";
import {
  ConfirmApprovalApi,
  GetAllApprovalApi,
  SearchAllApprovalApi,
  getAllPersonnelApproveApi,
  RevertApprovalApi,
} from "@/api/ApiApproval/ApiConfirmApproval";
import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import { defineStore } from "pinia";
export const useConfirmApproval = defineStore("ConfirmApproval", {
  state: () => ({
    listApprovalApproved: [],
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
    listPersonnelApprove: [],
  }),
  getters: {},
  actions: {
    setDataConfirmApproval(payload) {
      this.listApprovalApproved = payload.data.data;
      this.CountTab = payload.detail_count;
      this.listPagination.current_page = payload.data.current_page;
      this.listPagination.last_page = payload.data.last_page;
      this.listPagination.next_page_url = payload.data.next_page_url;
      this.listPagination.prev_page_url = payload.data.prev_page_url;
      this.listPagination.total = payload.data.total;
      this.listPagination.from = payload.data.from;
      this.listPagination.to = payload.data.to;
    },
    async GetAllApprovalApproveAction({ key, EndTimeLoading }) {
      await GetAllApprovalApi(key)
        .then((payload) => {
          this.setDataConfirmApproval(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async SearchApprovalApproveAction({
      key,
      search,
      department_ids,
      position_ids,
      EndTimeLoading,
    }) {
      await SearchAllApprovalApi(key, search, department_ids, position_ids)
        .then((payload) => {
          this.setDataConfirmApproval(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async getAllPersonnelApproveAction(search, index) {
      await getAllPersonnelApproveApi(search, index)
        .then((payload) => {
          this.listPersonnelApprove = payload.data.data;
        })
        .catch((err) => {
          console.log(err);
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
            this.GetAllApprovalApproveAction({
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
    async GetNextPageAction({ data, EndTimeLoading }) {
      const token = localStorage.getItem("TOKEN");
      NextPageApi(data, token)
        .then((payload) => {
          this.setDataConfirmApproval(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async GetPrevPageAction({ data, EndTimeLoading }) {
      const token = localStorage.getItem("TOKEN");
      PrevPageApi(data, token)
        .then((payload) => {
          this.setDataConfirmApproval(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
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
            this.GetAllApprovalApproveAction({
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
    async ConfirmApprovalDetailAction({
      data,
      toast,
      total,
      ActivatedButton,
      EndTimeLoading,
    }) {
      await ConfirmApprovalApi(data)
        .then((payload) => {
          if (payload.data.status == "failed") {
            toast.error(payload.data.messages);
            ActivatedButton();
            EndTimeLoading();
          } else {
            total.ShowDetailApprovalAction({
              id: data.id,
              EndTimeLoading,
            });
            toast.success("Thành công");
            ActivatedButton();
            EndTimeLoading();
          }
        })
        .catch((err) => {
          console.log(err);
          ActivatedButton();
          EndTimeLoading();
        });
    },
    async RevertApprovalAction({ dataApproval, toast, key, EndTimeLoading }) {
      RevertApprovalApi(dataApproval)
        .then((payload) => {
          if (payload.data.status == "failed") {
            toast.error(payload.data.messages);
            EndTimeLoading();
          } else {
            this.GetAllApprovalApproveAction({
              key,
              EndTimeLoading,
            });
            toast.success("Thành công");
            EndTimeLoading();
          }
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async RevertApprovalDetailAction({
      data,
      toast,
      total,
      ActivatedButton,
      EndTimeLoading,
    }) {
      RevertApprovalApi(data)
        .then((payload) => {
          if (payload.data.status == "failed") {
            toast.error(payload.data.messages);
            ActivatedButton();
            EndTimeLoading();
          } else {
            total.ShowDetailApprovalAction({
              id: data.id,
              EndTimeLoading,
            });
            toast.success("Thành công");
            ActivatedButton();
            EndTimeLoading();
          }
        })
        .catch((err) => {
          console.log(err);
          ActivatedButton();
          EndTimeLoading();
        });
    },
  },
});
