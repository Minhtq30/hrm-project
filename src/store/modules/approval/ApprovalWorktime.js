import { DeleteApprovalApi } from "@/api/ApiApproval/ApiApprovalTotal";
import {
  CreateApprovalWorktimeApi,
  GetAllApprovalWorktimeApi,
  UpdateApprovalWorktimeApi,
} from "@/api/ApiApproval/ApiApprovalWorktime";
import {
  ConfirmApprovalApi,
  RevertApprovalApi,
} from "@/api/ApiApproval/ApiConfirmApproval";
import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import { defineStore } from "pinia";
export const useApprovalWorktime = defineStore("ApprovalWorktime", {
  state: () => ({
    listApprovalWorktime: [],
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
    setDataApprovalWorktime(payload) {
      this.listApprovalWorktime = payload.data.data;
      this.CountTab = payload.detail_count;
      this.listPagination.current_page = payload.data.current_page;
      this.listPagination.last_page = payload.data.last_page;
      this.listPagination.next_page_url = payload.data.next_page_url;
      this.listPagination.prev_page_url = payload.data.prev_page_url;
      this.listPagination.total = payload.data.total;
      this.listPagination.from = payload.data.from;
      this.listPagination.to = payload.data.to;
    },
    async GetAllApprovalWorktimeAction({ type, menu, EndTimeLoading }) {
      await GetAllApprovalWorktimeApi(type, menu)
        .then((payload) => {
          this.setDataApprovalWorktime(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async createApprovalWorktimeAction({
      dataUrl,
      router,
      toast,
      EndTimeLoading,
      ActivatedButton,
    }) {
      await CreateApprovalWorktimeApi(dataUrl.data)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.error(res.data.messages);
            ActivatedButton();
            EndTimeLoading();
          } else {
            toast.success("Tạo đơn mới thành công");
            router.push(`/approval-worktime-view/detail=${res.data.parent_id}`);
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
    async deleteApprovalWorktimeAction({
      id,
      toast,
      route,
      router,
      EndTimeLoading,
      handleCloseConfirm,
    }) {
      await DeleteApprovalApi(id)
        .then((res) => {
          if (res.data.status == "success") {
            if (route.name == "Chi tiết đơn làm theo chế độ") {
              router.go(-1);
            } else {
              this.GetAllApprovalWorktimeAction({
                type: route.params.type,
                menu: route.params.menu,
                EndTimeLoading,
              });
            }
            handleCloseConfirm();
          } else {
            toast.error(res.data.messages);
            handleCloseConfirm();
          }
        })
        .catch((res) => {
          console.log(res);
          handleCloseConfirm();
        });
    },
    async updateApprovalWorktimeAction({
      data,
      router,
      toast,
      EndTimeLoading,
    }) {
      await UpdateApprovalWorktimeApi(data)
        .then((res) => {
          if (res.data?.status == "failed") {
            toast.error(res.data?.messages);
            EndTimeLoading();
          } else {
            toast.success("Cập nhật thành công thành công");
            router.push(`/approval-worktime-view/detail=${data.ID}`);
            EndTimeLoading();
          }
        })
        .catch((err) => console.log(err), EndTimeLoading());
    },
    async GetNextPageAction({ data, EndTimeLoading }) {
      const token = localStorage.getItem("TOKEN");
      NextPageApi(data, token)
        .then((payload) => {
          this.setDataApprovalWorktime(payload);
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
          this.setDataApprovalWorktime(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async ConfirmApprovalAction({
      dataApproval,
      toast,
      type,
      menu,
      EndTimeLoading,
    }) {
      await ConfirmApprovalApi(dataApproval)
        .then((payload) => {
          if (payload.data.status == "failed") {
            toast.error(payload.data.messages);
            EndTimeLoading();
          } else {
            this.GetAllApprovalWorktimeAction({ type, menu, EndTimeLoading });
            toast.success("Thành công");
          }
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async RevertApprovalAction({
      dataApproval,
      toast,
      type,
      menu,
      EndTimeLoading,
    }) {
      await RevertApprovalApi(dataApproval)
        .then((payload) => {
          if (payload.data.status == "failed") {
            toast.error(payload.data.messages);
            EndTimeLoading();
          } else {
            this.GetAllApprovalWorktimeAction({ type, menu, EndTimeLoading });
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
