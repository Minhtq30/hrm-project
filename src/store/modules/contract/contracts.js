import {
  ChangeStatusToIsvalidApi,
  ChangeStatusToliquidationApi,
  CreateContractApi,
  GetAllContractApi,
  SearchContractApi,
  SearchContractsApi,
  ShowContractDetailApi,
  UpdateContractApi,
  ImportContractApi,
  DeleteContractApi,
} from "@/api/ApiContract/ApiContract";
import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  GetShowDetailPersonnelApi,
  SearchPersonnelInputApi,
} from "@/api/ApiPersonnel/ApiPersonnel";
import { CatchError } from "@/constants/FormatAll";
import { defineStore } from "pinia";
export const useContract = defineStore("Contract", {
  state: () => ({
    listContracts: [],
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
    contractDetail: {},
    PersonnelCreateContract: [],
    ContractByID: {},
    infoPersonnel: {
      code: null,
      name: null,
    },
    detailCount: {},
  }),
  getters: {},
  actions: {
    setDataAllContracts(payload) {
      this.listContracts = payload.data.data;
      this.detailCount = payload.detail_count;
      this.listPagination.current_page = payload.data.current_page;
      this.listPagination.last_page = payload.data.last_page;
      this.listPagination.next_page_url = payload.data.next_page_url;
      this.listPagination.prev_page_url = payload.data.prev_page_url;
      this.listPagination.total = payload.data.total;
      this.listPagination.from = payload.data.from;
      this.listPagination.to = payload.data.to;
    },
    setDataSearchContract(payload) {
      this.contractDetail = payload.data.data[0];
    },
    setDataShowContractDetail(payload) {
      this.contractDetail = payload.data;
    },
    setDataSearchPersonnelCreateContract(payload) {
      this.PersonnelCreateContract = payload;
    },
    setDataShowContractByID(payload) {
      const key = payload.data.personnel_contracts.find(
        (item) => item.is_last_contract == 1
      );
      this.infoPersonnel.code = payload.data.code;
      this.infoPersonnel.name = payload.data.name;
      if (payload.data.personnel_contracts?.length > 0) {
        if (key) {
          this.ContractByID = key;
        } else {
          this.ContractByID =
            payload.data.personnel_contracts[
              payload.data.personnel_contracts?.length - 1
            ];
        }
      } else {
        this.ContractByID = {
          personnel_id: payload.data.ID,
          contract_code: null,
          contract_type: null,
          date_reg: null,
          date_start: null,
          date_finish: null,
          work_type: null,
          department_id: null,
          position_id: null,
          job_title: null,
          work_place: null,
          quantum_id: null,
          json_salaries: null,
          desc_contract: null,
        };
      }
    },
    // Lấy danh sách hợp đồng
    async GetAllContractsAction({ type, EndTimeLoading }) {
      await GetAllContractApi(type)
        .then((payload) => {
          if (payload.data.status == "success") {
            this.setDataAllContracts(payload.data);
            EndTimeLoading();
          } else {
            EndTimeLoading();
          }
        })
        .catch((err) => {
          if (err.response.status == 403) {
            alert("Bạn không có quyền thực hiện chức năng này!!!!");
          }
          EndTimeLoading();
        });
    },
    // Tạo mới hợp đồng
    async createContractAction({ data, router, toast, EndTimeLoading }) {
      await CreateContractApi(data)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.error(res.data.messages);
          } else if (res.data.status == "success") {
            router.push(`/contract-detail/${res.data.data.ID}`);
            toast.success("Tạo mới hợp đồng thành công");
          }
        })
        .catch((res) => {
          if (res.response.status == 422) {
            if (res.response.data?.messages?.contract_code) {
              toast.error("Mã hợp đồng đã tồn tại");
            }
            if (res.response.data?.messages?.date_start) {
              toast.error("Vui lòng nhập ngày bắt đầu hiệu lực hợp đồng");
            }
            if (res.response.data?.messages?.date_end) {
              toast.error("Vui lòng nhập ngày hết hiệu lực");
            }
            if (res.response.data?.messages?.date_reg) {
              toast.error("Vui lòng nhập ngày ký hợp đồng");
            }

            EndTimeLoading();
          } else {
            CatchError({ res, toast, EndTimeLoading });
          }
        });
    },
    // Cập nhật hợp đồng
    async updateContractAction({ data, router, toast, EndTimeLoading }) {
      await UpdateContractApi(data)
        .then((payload) => {
          if (payload.data.status == "failed") {
            toast.error(payload.data.messages);
          } else {
            router.push(`/contract-detail/${data.ID}`);
            toast.success("Cập nhật hợp đồng thành công");
          }
        })
        .catch((res) => {
          if (res.response.status == 422) {
            if (res.response.data?.messages?.contract_code) {
              toast.error("Mã hợp đồng đã tồn tại");
            }
            if (res.response.data?.messages?.date_start) {
              toast.error("Vui lòng nhập ngày bắt đầu hiệu lực hợp đồng");
            }
            if (res.response.data?.messages?.date_end) {
              toast.error("Vui lòng nhập ngày hết hiệu lực");
            }
            if (res.response.data?.messages?.date_reg) {
              toast.error("Vui lòng nhập ngày ký hợp đồng");
            }

            EndTimeLoading();
          } else {
            CatchError({ res, toast, EndTimeLoading });
          }
        });
    },
    // Xóa hợp đồng
    async DeleteContractAction({
      id,
      toast,
      route,
      router,
      handleCloseConfirm,
      EndTimeLoading,
    }) {
      await DeleteContractApi(id)
        .then((res) => {
          if (res.data.status != "failed") {
            if (route.name == "Hợp đồng") {
              this.GetAllContractsAction({
                type: route.params.id,
                EndTimeLoading,
              });
            } else {
              router.push({
                path: "/contract-personnel",
                name: "Hợp đồng",
              });
            }
          }
          toast.success("Xóa thành công");
          handleCloseConfirm();
        })
        .catch((err) => console.log(err));
    },
    // Tìm kiếm hợp đồng
    async SearchContractAction(id) {
      await SearchContractApi(id)
        .then((payload) => this.setDataSearchContract(payload.data))
        .catch((err) => console.log(err));
    },
    async SearchContractsAction({ search, type, EndTimeLoading }) {
      await SearchContractsApi(search, type)
        .then((payload) => {
          this.setDataAllContracts(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Chi tiết hợp đồng
    async ShowContractDetailAction({ id, EndTimeLoading }) {
      await ShowContractDetailApi(id)
        .then((payload) => {
          if (payload.data.status == "success") {
            this.setDataShowContractDetail(payload.data);
            EndTimeLoading();
          } else {
            EndTimeLoading();
          }
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Pagination
    async GetNextPageAction({ data, EndTimeLoading }) {
      const token = localStorage.getItem("TOKEN");
      NextPageApi(data, token)
        .then((payload) => {
          this.setDataAllContracts(payload);
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
          this.setDataAllContracts(payload);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // Chuyển trạng thái hợp đồng sang thanh lý
    async ChangeStatusToliquidationAction({
      id,
      toast,
      route,
      EndTimeLoading,
    }) {
      await ChangeStatusToliquidationApi(id)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.error(res.data.messages);
          } else {
            if (route.name == "Contract Detail") {
              this.ShowContractDetailAction({
                id,
                EndTimeLoading,
              });
            } else {
              this.GetAllContractsAction({
                type: route.params.id,
                EndTimeLoading,
              });
            }
            toast.success("Cập nhật trạng thái thành công");
          }
        })
        .catch((res) => {
          CatchError({ res, toast, EndTimeLoading });
        });
    },
    // Chuyển trạng thái hợp đồng sang có hiệu lực
    async ChangeStatusToIsvalidAction({ id, toast, route, EndTimeLoading }) {
      ChangeStatusToIsvalidApi(id)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.error(res.data.messages);
          } else {
            if (route.name == "Contract Detail") {
              this.ShowContractDetailAction({
                id,
                EndTimeLoading,
              });
            } else {
              this.GetAllContractsAction({
                type: route.params.id,
                EndTimeLoading,
              });
            }
            toast.success("Cập nhật trạng thái thành công");
          }
        })
        .catch((res) => {
          CatchError({ res, toast, EndTimeLoading });
        });
    },
    // Tìm kiếm nhân sự => Tạo hợp đồng mới
    async SearchPersonnelCreateContractAction({ search, loading }) {
      await SearchPersonnelInputApi(search)
        .then((payload) => {
          this.setDataSearchPersonnelCreateContract(payload.data);
          loading(false);
        })
        .catch((err) => {
          console.log(err);
          loading(false);
        });
    },
    // Chi tiết hợp đồng của nhân sự theo ID
    async ShowContractByIDAction({ id, EndTimeLoading }) {
      await GetShowDetailPersonnelApi(id)
        .then((payload) => {
          this.setDataShowContractByID(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // import hợp đồng
    async ImportContractAction({ dataUrl, toast, EndTimeLoading }) {
      console.log(dataUrl);
      ImportContractApi(dataUrl.data)
        .then((payload) => {
          this.setDataSearchPersonnelCreateContract(payload.data);
          toast.success("Import thành công");
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Import thất bại");
          EndTimeLoading();
        });
    },
  },
});
