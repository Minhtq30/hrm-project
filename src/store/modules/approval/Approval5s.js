import {
  //   Create5sViolationApi,
  GetAllViolation,
  GetAllStatusPersonnelOffice,
  ListPersonnelByDepartmentMapApi,
  CreateDepartmentOnMapApi,
  GetDetailMapDepartmentApi,
  UpdateDepartmentOnMapApi,
  DeleteDepartmentOnMapApi,
  //   GetFurloughDetailUserApi,
  //   Update5sViolationApi,
} from "@/api/ApiApproval/ApiApproval5s";
// import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import { defineStore } from "pinia";
export const use5sViolation = defineStore("5sViolation", {
  state: () => ({
    list5sViolation: [],
    dataStatusPersonnelOffice: {},
    dataDetailPersonnelOffice: {},
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
    UserFurlough: {},
    personnelByDepart: [],
    personnelByDepartID: [],
    // CountTab: {},
  }),
  getters: {},
  actions: {
    setData5sViolation(payload) {
      this.list5sViolation = payload.data.data;
      //   this.CountTab = payload.detail_count;
      //   this.listPagination.current_page = payload.data.current_page;
      //   this.listPagination.last_page = payload.data.last_page;
      //   this.listPagination.next_page_url = payload.data.next_page_url;
      //   this.listPagination.prev_page_url = payload.data.prev_page_url;
      //   this.listPagination.total = payload.data.total;
      //   this.listPagination.from = payload.data.from;
      //   this.listPagination.to = payload.data.to;
    },
    setPersonnelOffice(payload) {
      this.dataStatusPersonnelOffice = payload.data;
    },
    setDetailPersonnelOffice(payload) {
      this.dataDetailPersonnelOffice = payload.data;
    },
    setDataPersonnelByDepartmentMap(payload) {
      this.personnelByDepart = payload.data;
    },
    // GetFurloughDetailUser(payload) {
    //   this.UserFurlough = payload.data;
    // },
    // Danh sách phạt 5s
    async GetAll5sViolationAction({ EndTimeLoading }) {
      await GetAllViolation()
        .then((payload) => {
          this.setData5sViolation(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    //Danh sách trạng thái nhân viên trên map
    async GetAllStatusPersonnelOfficeAction({ EndTimeLoading }) {
      await GetAllStatusPersonnelOffice()
        .then((payload) => {
          this.setPersonnelOffice(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    //Chi tiết phòng ban trên map
    async GetDetailMapDepartmentAction(id) {
      await GetDetailMapDepartmentApi(id)
        .then((payload) => {
          this.setDetailPersonnelOffice(payload.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //Tạo mới phòng ban trên map
    async CreateDepartmentOnMapAction(
      data,
      toast,
      EndTimeLoading,
      handleCloseCreate
    ) {
      await CreateDepartmentOnMapApi(data)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.error(res.data.messages);
            EndTimeLoading();
          } else {
            toast.success("Tạo mới thành công");
            location.reload();
            handleCloseCreate();
            EndTimeLoading();
          }
        })
        .catch((err) => {
          toast.error("Tạo mới thất bại");
          console.log(err);
        });
    },
    //Sửa phòng ban trên map
    async UpdateDepartmentOnMapAction(
      id,
      data,
      toast,
      EndTimeLoading,
      handleCloseUpdate
    ) {
      await UpdateDepartmentOnMapApi(data, id)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.error(res.data.messages);
            EndTimeLoading();
          } else {
            toast.success("Cập nhật thành công");
            handleCloseUpdate();
            location.reload();
            EndTimeLoading();
          }
        })
        .catch((err) => {
          toast.error("Cập nhật thất bại");
          console.log(err);
        });
    },
    //Xóa phong ban trên map
    async DeleteDepartmentOnMapAction(
      id,
      toast,
      EndTimeLoading,
      handleCloseConfirm
    ) {
      await DeleteDepartmentOnMapApi(id)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.error(res.data.messages);
            EndTimeLoading();
          } else {
            toast.success("Xóa thành công");
            handleCloseConfirm();
            location.reload();
            EndTimeLoading();
          }
        })
        .catch((err) => {
          toast.error("Xóa thất bại");
          console.log(err);
        });
    },
    // Danh sách người theo phòng ban
    async ListPersonnelByDepartmentMapAction(
      arr_id,
      getPersonnelByDepartment,
      EndTimeLoading
    ) {
      await ListPersonnelByDepartmentMapApi(arr_id)
        .then((payload) => {
          this.setDataPersonnelByDepartmentMap(payload.data);
          let listId = payload.data.data.map((item) => item.ID);
          this.personnelByDepartID = listId;
          getPersonnelByDepartment(listId);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // Tạo mới posm
    // async createUploadPosmAction({ dataUrl, router, toast, ActivatedButton }) {
    //   await CreateUploadPosmApi(dataUrl.data)
    //     .then((res) => {
    //       if (res.data.status == "failed") {
    //         toast.error(res.data.messages);
    //         ActivatedButton();
    //       } else {
    //         router.push(`/approval-posm-view/detail=${res.data.parent_id}`);
    //         toast.success("Tạo mới thành công");
    //         ActivatedButton();
    //       }
    //     })
    //     .catch((err) => {
    //       toast.error("Tạo mới thất bại");
    //       console.log(err);
    //     });
    // },
    // // Cập nhật đơn POSM
    // async updateUploadPosmAction({ data, router, route, toast }) {
    //   await UpdateUploadPosmApi(data, route.params.idPosm)
    //     .then((res) => {
    //       if (res.data?.status == "failed") {
    //         toast.error(res.data?.messages);
    //       } else {
    //         toast.success("Cập nhật thành công");
    //         router.push(`/approval-posm-view/detail=${route.params.idPosm}`);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // // Phân trang
    // async GetNextPageAction({ data, EndTimeLoading }) {
    //   const token = localStorage.getItem("TOKEN");
    //   NextPageApi(data, token)
    //     .then((payload) => {
    //       this.setDataUploadPosm(payload);
    //       EndTimeLoading();
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       EndTimeLoading();
    //     });
    // },
    // async GetPrevPageAction({ data, EndTimeLoading }) {
    //   const token = localStorage.getItem("TOKEN");
    //   PrevPageApi(data, token)
    //     .then((payload) => {
    //       this.setDataUploadPosm(payload);
    //       EndTimeLoading();
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       EndTimeLoading();
    //     });
    // },
  },
});
