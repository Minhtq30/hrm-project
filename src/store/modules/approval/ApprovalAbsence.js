import {
  CreateApprovalAbsenceApi,
  DetailsCompensatoryUserApi,
  GetAllApprovalAbsenceApi,
  UpdateApprovalAbsenceApi,
} from "@/api/ApiApproval/ApiApprovalAbsence";
import { defineStore } from "pinia";
import { DeleteApprovalApi } from "@/api/ApiApproval/ApiApprovalTotal";
import {
  ConfirmApprovalApi,
  RevertApprovalApi,
} from "@/api/ApiApproval/ApiConfirmApproval";
import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
export const useApprovalAbsence = defineStore("ApprovalAbsence", {
  state: () => ({
    listApprovalAbsence: [],
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
    DetailsCompensatoryUser: null,
    idUserCreate: null,
    CountTab: {},
  }),
  getters: {},
  actions: {
    setDataApprovalAbsence(payload) {
      this.listApprovalAbsence = payload.data.data;
      this.CountTab = payload.detail_count;
      this.listPagination.current_page = payload.data.current_page;
      this.listPagination.last_page = payload.data.last_page;
      this.listPagination.next_page_url = payload.data.next_page_url;
      this.listPagination.prev_page_url = payload.data.prev_page_url;
      this.listPagination.total = payload.data.total;
      this.listPagination.from = payload.data.from;
      this.listPagination.to = payload.data.to;
    },
    DetailsCompensatorybyUser(payload) {
      this.DetailsCompensatoryUser = payload;
    },
    // Danh sách đơn vắng mặt
    async GetAllApprovalAbsenceAction({ type, menu, EndTimeLoading }) {
      await GetAllApprovalAbsenceApi(type, menu)
        .then((payload) => {
          this.setDataApprovalAbsence(payload.data);

          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Tạo mới đơn vắng mặt
    async createApprovalAbsenceAction({
      dataUrl,
      router,
      toast,
      EndTimeLoading,
      ActivatedButton,
    }) {
      await CreateApprovalAbsenceApi(dataUrl.data)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.error(res.data.messages);
            ActivatedButton();
            EndTimeLoading();
          } else {
            toast.success("Tạo mới thành công");
            router.push(`/approval-absence-view/detail=${res.data.parent_id}`);
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
    // Xóa đơn vắng mặt
    async deleteApprovalAbsenceAction({
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
            if (route.name == "Chi tiết đơn vắng mặt") {
              router.go(-1);
            } else {
              this.GetAllApprovalAbsenceAction({
                type: route.params.type,
                menu: route.params.menu,
                EndTimeLoading,
              });
            }
            toast.success("Xóa đơn thành công");
            handleCloseConfirm();
          } else {
            toast.error(res.data.messages);
            handleCloseConfirm();
          }
        })
        .catch((res) => {
          console.log(res);
          EndTimeLoading();
          handleCloseConfirm();
        });
    },
    // Cập nhật đơn vắng mặt
    async updateApprovalAbsenceAction({
      dataUrl,
      router,
      toast,
      EndTimeLoading,
    }) {
      await UpdateApprovalAbsenceApi(dataUrl)
        .then((res) => {
          if (res.data?.status == "failed") {
            toast.error(res.data?.messages);
            EndTimeLoading();
          } else {
            toast.success("Cập nhật thành công");
            router.push(`/approval-absence-view/detail=${dataUrl.ID}`);
            EndTimeLoading();
          }
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Chi tiết nghỉ bù của 1 nhân sự
    async DetailsCompensatoryUserAction(data_compensatory) {
      await DetailsCompensatoryUserApi(data_compensatory)
        .then((res) => {
          if (res.data.status == "success") {
            this.DetailsCompensatorybyUser(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setIdUserCreateApprovalAction(id) {
      this.idUserCreate = id;
    },
    // Phân trang
    async GetNextPageAction({ data, EndTimeLoading }) {
      const token = localStorage.getItem("TOKEN");
      await NextPageApi(data, token)
        .then((payload) => {
          this.setDataApprovalAbsence(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async GetPrevPageAction({ data, EndTimeLoading }) {
      const token = localStorage.getItem("TOKEN");
      await PrevPageApi(data, token)
        .then((payload) => {
          this.setDataApprovalAbsence(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Duyệt,Hoàn và Không duyệt
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
            this.GetAllApprovalAbsenceAction({
              type,
              menu,
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
            this.GetAllApprovalAbsenceAction({
              type,
              menu,
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
