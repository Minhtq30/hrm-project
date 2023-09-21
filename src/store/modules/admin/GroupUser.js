import {
  CreateAdminGroupApi,
  DeleteAdminGroupApi,
  getAllAdminGroupsApi,
  getAllAdminGroupsEndTimeLoadingApi,
  ShowDetailGroupApi,
  UpdateAdminGroupApi,
} from "@/api/ApiAdmin/ApiAdminGroup";
import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import { defineStore } from "pinia";
export const useGroupUser = defineStore("GroupUser", {
  state: () => ({
    listGroupUsers: [],
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
    GroupDetail: [],
  }),
  getters: {},
  actions: {
    setDataAdminGroups(payload) {
      this.listGroupUsers = payload.data.data.data;
      this.listPagination.current_page = payload.data.data.current_page;
      this.listPagination.last_page = payload.data.data.last_page;
      this.listPagination.next_page_url = payload.data.data.next_page_url;
      this.listPagination.prev_page_url = payload.data.data.prev_page_url;
      this.listPagination.total = payload.data.data.total;
      this.listPagination.from = payload.data.data.from;
      this.listPagination.to = payload.data.data.to;
    },
    // Danh sách nhóm
    async getAllAdminGroupsAction(perPage) {
      await getAllAdminGroupsApi(perPage)
        .then((payload) => this.setDataAdminGroups(payload))
        .catch((err) => console.log(err));
    },
    // Danh sách tất cả nhóm người dùng (EndTimeLoading)
    async getAllAdminGroupsEndTimeLoadingAction({ EndTimeLoading }) {
      await getAllAdminGroupsEndTimeLoadingApi()
        .then((payload) => {
          this.setDataAdminGroups(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Chi tiết group
    async ShowDetailGroupAction({ id, EndTimeLoading }) {
      await ShowDetailGroupApi(id)
        .then((payload) => {
          this.GroupDetail = payload.data.data;
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Tạo mới nhóm
    async createAdminGroupAction({ data, router, toast }) {
      await CreateAdminGroupApi(data)
        .then((res) => {
          if (res.data.status == "success") {
            router.push(`/admin-group-detail/${res.data.data.ID}`);
            toast.success("Tạo mới thành công");
          } else {
            toast.warning(res.data.messages.title);
          }
        })
        .catch((err) => {
          if (err.response.status == 403) {
            toast.warning("Bạn không có quyền thực hiện chức năng này");
          } else if (err.response.status == 422) {
            console.log(err.response);
            toast.warning(err.response.data.error?.title[0]);
          }
        });
    },
    // Cập nhật nhóm
    async UpdateAdminGroupAction({ data, router, toast }) {
      await UpdateAdminGroupApi(data)
        .then((res) => {
          if (res.data?.status == "success") {
            router.push(`/admin-group-detail/${data.ID}`);
            toast.success("Cập nhật thành công");
          } else {
            toast.warning(res.data?.messages);
          }
        })
        .catch((err) => console.log(err));
    },
    // Xóa nhóm
    async DeleteAdminGroupAction({
      id,
      toast,
      route,
      router,
      EndTimeLoading,
      handleCloseConfirm,
    }) {
      await DeleteAdminGroupApi(id)
        .then((res) => {
          if (res.data.status == "success") {
            if (route.name != "Chi tiết nhóm người dùng") {
              this.getAllAdminGroupsEndTimeLoadingAction({ EndTimeLoading });
            } else {
              router.push("/admin-group");
            }
          }
          toast.success(`Xóa nhóm thành công ${res.data.data.title}`);
          handleCloseConfirm();
        })
        .catch((err) => console.log(err));
    },
    // Pagination
    async getNextPageAction({ data, EndTimeLoading }) {
      const token = localStorage.getItem("TOKEN");
      await NextPageApi(data, token)
        .then((payload) => {
          this.setDataAdminGroups(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async getPrevPageAction({ data, EndTimeLoading }) {
      const token = localStorage.getItem("TOKEN");
      await PrevPageApi(data, token)
        .then((payload) => {
          this.setDataAdminGroups(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
  },
});
