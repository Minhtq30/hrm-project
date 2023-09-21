import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  ConfirmAttendanceAssignApi,
  CreateAttendanceAssignApi,
  DeleteAttendanceAssignApi,
  GetAllAttendanceAssignApi,
  SearchAllAttendanceAssignApi,
  ListPersonnelByDepartmentApi,
  ReturnAttendanceAssignApi,
  ShowDetailAttendanceAssignApi,
  UpdateAttendanceAssignApi,
} from "@/api/ApiTimekeep/ApiTimekeepAttendanceAssign";
import { defineStore } from "pinia";
export const useShiftAssign = defineStore("ShiftAssign", {
  state: () => ({
    listShiftAssign: [],
    assignDetail: {},
    CountTab: {},
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
    personnelByDepart: [],
  }),
  getters: {},
  actions: {
    setDataShiftAssign(payload) {
      this.listShiftAssign = payload.data.data;
      this.CountTab = payload.data_count;
      this.listPagination.current_page = payload.data.current_page;
      this.listPagination.last_page = payload.data.last_page;
      this.listPagination.next_page_url = payload.data.next_page_url;
      this.listPagination.prev_page_url = payload.data.prev_page_url;
      this.listPagination.total = payload.data.total;
      this.listPagination.from = payload.data.from;
      this.listPagination.to = payload.data.to;
    },
    setDataDetailShiftAssign(payload) {
      this.assignDetail = payload.data;
    },
    setDataPersonnelByDepartment(payload) {
      this.personnelByDepart = payload.data;
    },
    async GetAllShiftAssignAction({ key, EndTimeLoading }) {
      await GetAllAttendanceAssignApi(key)
        .then((payload) => {
          this.setDataShiftAssign(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async SearchAllShiftAssignAction({ data, EndTimeLoading }) {
      await SearchAllAttendanceAssignApi(data)
        .then((payload) => {
          this.setDataShiftAssign(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Phân ca cho phòng ban, vị trí
    // Tạo mới phân ca
    async createShiftAssignAction({ data, router, toast, ActivatedButton }) {
      await CreateAttendanceAssignApi(data)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.error(res.data.messages);
            ActivatedButton();
          } else {
            router.push(
              `/timekeep-attendance-assign-detail/${res.data.data.ID}`
            );
            toast.success("Tạo mới thành công!!!");
            ActivatedButton();
          }
        })
        .catch((err) => {
          console.log(err);
          ActivatedButton();
        });
    },
    // Cập nhật phân ca
    async updateShiftAssignAction({ data, router, toast, ActivatedButton }) {
      await UpdateAttendanceAssignApi(data)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.warning(res.data.messages);
            ActivatedButton();
          } else {
            router.push(`/timekeep-attendance-assign-detail/${data.ID}`);
            toast.success("Cập nhật thành công");
            ActivatedButton();
          }
        })
        .catch((err) => {
          console.log(err);
          ActivatedButton();
        });
    },
    // Xóa phân ca
    async deleteShiftAssignAction({
      data,
      route,
      router,
      toast,
      EndTimeLoading,
      handleCloseConfirm,
    }) {
      DeleteAttendanceAssignApi(data)
        .then((res) => {
          if (res.data?.status == "failed") {
            toast.error(res.data?.messages);
          } else {
            if (route.name == "Chi tiết phân ca") {
              router.go(-1);
            } else {
              this.GetAllShiftAssignAction({
                key: route.params.key,
                EndTimeLoading,
              });
            }
            toast.success("Xóa thành công");
            handleCloseConfirm();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // Chi tiết phân ca
    async showShiftAssignAction({ id, EndTimeLoading }) {
      await ShowDetailAttendanceAssignApi(id)
        .then((payload) => {
          this.setDataDetailShiftAssign(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Duyệt/Không duyệt phân ca
    async ConfirmAttendanceAssignAction({
      dataAssign,
      toast,
      ActivatedButton,
      EndTimeLoading,
    }) {
      await ConfirmAttendanceAssignApi(dataAssign)
        .then((res) => {
          if (res.data?.status == "failed") {
            toast.error(res.data.messages);
          } else {
            this.showShiftAssignAction({
              id: dataAssign.id,
              EndTimeLoading,
            });
            toast.success("Thành công");
          }
          ActivatedButton();
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          ActivatedButton();
          EndTimeLoading();
        });
    },
    // Hoàn duyệt phân ca
    async RevertAttendanceAssignAction({
      dataAssign,
      toast,
      ActivatedButton,
      EndTimeLoading,
    }) {
      await ReturnAttendanceAssignApi(dataAssign)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.error(res.data.messages);
          } else {
            this.showShiftAssignAction({
              id: dataAssign.id,
              EndTimeLoading,
            });
            toast.success("Hoàn duyệt thành công");
          }
          ActivatedButton();
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          ActivatedButton();
          EndTimeLoading();
        });
    },
    // Start Pagination
    async GetNextPageAction({ data, EndTimeLoading }) {
      const token = localStorage.getItem("TOKEN");
      NextPageApi(data, token)
        .then((payload) => {
          this.setDataShiftAssign(payload);
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
          this.setDataShiftAssign(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Phân ca cho phòng ban,vị trí
    async ConfirmAttendanceAssignListAction({
      dataAssign,
      toast,
      key,
      EndTimeLoading,
    }) {
      await ConfirmAttendanceAssignApi(dataAssign)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.error(res.data.messages);
            EndTimeLoading();
          } else {
            this.GetAllShiftAssignAction({
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
    async RevertAttendanceAssignListAction({
      dataAssign,
      toast,
      key,
      EndTimeLoading,
    }) {
      await ReturnAttendanceAssignApi(dataAssign)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.error(res.data.messages);
            EndTimeLoading();
          } else {
            this.GetAllShiftAssignAction({
              key,
              EndTimeLoading,
            });
            toast.success("Hoàn duyệt thành công");

            EndTimeLoading();
          }
        })
        .catch((err) => {
          console.log(err);

          EndTimeLoading();
        });
    },
    // Phân ca cho cá nhân
    // Danh sách người theo phòng ban
    async ListPersonnelByDepartmentAction(arr_id) {
      await ListPersonnelByDepartmentApi(arr_id)
        .then((payload) => {
          this.setDataPersonnelByDepartment(payload.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
