import {
  CheckCreateApprovalApi,
  CheckDescApprovalAbsenceApi,
  CheckDescApprovalInoutApi,
  CheckDescApprovalLeaveApi,
  CheckDescApprovalMissionApi,
  CheckDescApprovalOvertimeApi,
  CheckDescApprovalResignApi,
  CheckDescApprovalShiftChangeApi,
  CheckDescApprovalShiftMoreApi,
  CheckDescApprovalShiftRegisterApi,
  CheckDescApprovalWorktimeApi,
  SettingApprovalAbsenceApi,
  SettingApprovalInoutApi,
  SettingApprovalLeaveApi,
  SettingApprovalMissionApi,
  SettingApprovalOvertimeApi,
  SettingApprovalResignApi,
  SettingApprovalShiftChangeApi,
  SettingApprovalShiftMoreApi,
  SettingApprovalShiftRegisterApi,
  SettingApprovalWorktimeApi,
  UpdateSettingApprovalAbsenceApi,
  UpdateSettingApprovalInoutApi,
  UpdateSettingApprovalLeaveApi,
  UpdateSettingApprovalMissionApi,
  UpdateSettingApprovalOvertimeApi,
  UpdateSettingApprovalResignApi,
  UpdateSettingApprovalShiftChangeApi,
  UpdateSettingApprovalShiftMoreApi,
  UpdateSettingApprovalShiftRegisterApi,
  UpdateSettingApprovalWorktimeApi,
  CreateCommentApprovalApi,
  EditCommentApprovalApi,
  DeleteCommentApprovalApi,
} from "@/api/ApiSettingApproval/ApiSettingAllApproval";
import { defineStore } from "pinia";
export const useSettingApproval = defineStore("SettingApproval", {
  state: () => ({
    SettingApprovalLeave: {},
    SettingApprovalOvertime: {},
    SettingApprovalInout: {},
    SettingApprovalShiftChange: {},
    SettingApprovalShiftMore: {},
    SettingApprovalShiftRegister: {},
    SettingApprovalMission: {},
    SettingApprovalWorktime: {},
    SettingApprovalResign: {},
    SettingApprovalAbsence: {},
    CheckCreateApproval: null,
    CheckDescApprovalLeave: null,
    CheckDescApprovalOvertime: null,
    CheckDescApprovalInout: null,
    CheckDescApprovalShiftChange: null,
    CheckDescApprovalShiftMore: null,
    CheckDescApprovalShiftRegister: null,
    CheckDescApprovalMission: null,
    CheckDescApprovalWorktime: null,
    CheckDescApprovalResign: null,
    CheckDescApprovalAbsence: null,
  }),
  getters: {},
  actions: {
    // Kiểm tra quyền tạo đơn
    async CheckCreateApprovalAction({ EndTimeLoading }) {
      await CheckCreateApprovalApi()
        .then((payload) => {
          this.CheckCreateApproval = payload.data.data;
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    // ******///
    // Đơn xin nghỉ
    async SettingApprovalLeaveAction() {
      await SettingApprovalLeaveApi()
        .then((payload) => {
          this.SettingApprovalLeave = payload.data;
        })
        .catch((err) => console.log(err));
    },
    async CheckDescApprovalLeaveAction() {
      await CheckDescApprovalLeaveApi()
        .then((payload) => {
          this.CheckDescApprovalLeave = payload.data.data;
        })
        .catch((err) => console.log(err));
    },
    async UpdateApprovalLeaveAction({ data, toast, EndTimeLoading }) {
      await UpdateSettingApprovalLeaveApi(data)
        .then(() => {
          this.SettingApprovalLeaveAction();
          this.CheckCreateApprovalAction({ EndTimeLoading });
          this.CheckDescApprovalLeaveAction();
          toast.success("Cập nhật thành công");
        })
        .catch((err) => console.log(err));
    },
    // ****//
    // Đơn làm thêm
    async SettingApprovalOvertimeAction() {
      await SettingApprovalOvertimeApi()
        .then((payload) => {
          this.SettingApprovalOvertime = payload.data;
        })
        .catch((err) => console.log(err));
    },
    async CheckDescApprovalOvertimeAction() {
      await CheckDescApprovalOvertimeApi()
        .then((payload) => {
          this.CheckDescApprovalOvertime = payload.data.data;
        })
        .catch((err) => console.log(err));
    },
    async UpdateSettingApprovalOvertimeAction({ data, toast, EndTimeLoading }) {
      await UpdateSettingApprovalOvertimeApi(data)
        .then(() => {
          this.SettingApprovalOvertimeAction();
          this.CheckCreateApprovalAction({ EndTimeLoading });
          this.CheckDescApprovalOvertimeAction();
          toast.success("Cập nhật thành công");
        })
        .catch((err) => console.log(err));
    },
    // ****//
    // Đơn check in/out
    async SettingApprovalInoutAction() {
      await SettingApprovalInoutApi()
        .then((payload) => {
          this.SettingApprovalInout = payload.data;
        })
        .catch((err) => console.log(err));
    },
    async CheckDescApprovalInoutAction() {
      await CheckDescApprovalInoutApi()
        .then((payload) => {
          this.CheckDescApprovalInout = payload.data.data;
        })
        .catch((err) => console.log(err));
    },
    async UpdateSettingApprovalInoutAction({ data, toast, EndTimeLoading }) {
      await UpdateSettingApprovalInoutApi(data)
        .then(() => {
          this.SettingApprovalInoutAction();
          this.CheckCreateApprovalAction({ EndTimeLoading });
          this.CheckDescApprovalInoutAction();
          toast.success("Cập nhật thành công");
        })
        .catch((err) => console.log(err));
    },
    // ****//
    // Đơn đổi ca
    async SettingApprovalShiftChangeAction() {
      await SettingApprovalShiftChangeApi()
        .then((payload) => {
          this.SettingApprovalShiftChange = payload.data;
        })
        .catch((err) => console.log(err));
    },
    async CheckDescApprovalShiftChangeAction() {
      await CheckDescApprovalShiftChangeApi()
        .then((payload) => {
          this.CheckDescApprovalShiftChange = payload.data.data;
        })
        .catch((err) => console.log(err));
    },
    async UpdateSettingApprovalShiftChangeAction({
      data,
      toast,
      EndTimeLoading,
    }) {
      await UpdateSettingApprovalShiftChangeApi(data)
        .then(() => {
          this.SettingApprovalShiftChangeAction();
          this.CheckCreateApprovalAction({ EndTimeLoading });
          this.CheckDescApprovalShiftChangeAction();
          toast.success("Cập nhật thành công");
        })
        .catch((err) => console.log(err));
    },
    // ****//
    // Đơn tăng ca
    async SettingApprovalShiftMoreAction() {
      await SettingApprovalShiftMoreApi()
        .then((payload) => {
          this.SettingApprovalShiftMore = payload.data;
        })
        .catch((err) => console.log(err));
    },
    async CheckDescApprovalShiftMoreAction() {
      await CheckDescApprovalShiftMoreApi()
        .then((payload) => {
          this.CheckDescApprovalShiftMore = payload.data.data;
        })
        .catch((err) => console.log(err));
    },
    async UpdateSettingApprovalShiftMoreAction({
      data,
      toast,
      EndTimeLoading,
    }) {
      await UpdateSettingApprovalShiftMoreApi(data)
        .then(() => {
          this.SettingApprovalShiftMoreAction();
          this.CheckCreateApprovalAction({ EndTimeLoading });
          this.CheckDescApprovalShiftMoreAction();
          toast.success("Cập nhật thành công");
        })
        .catch((err) => console.log(err));
    },
    // ****//
    // Đơn đăng kí ca
    async SettingApprovalShiftRegisterAction() {
      await SettingApprovalShiftRegisterApi()
        .then((payload) => {
          this.SettingApprovalShiftRegister = payload.data;
        })
        .catch((err) => console.log(err));
    },
    async CheckDescApprovalShiftRegisterAction() {
      await CheckDescApprovalShiftRegisterApi()
        .then((payload) => {
          this.CheckDescApprovalShiftRegister = payload.data.data;
        })
        .catch((err) => console.log(err));
    },
    async UpdateSettingApprovalShiftRegisterAction({
      data,
      toast,
      EndTimeLoading,
    }) {
      await UpdateSettingApprovalShiftRegisterApi(data)
        .then(() => {
          this.SettingApprovalShiftRegisterAction();
          this.CheckCreateApprovalAction({ EndTimeLoading });
          this.CheckDescApprovalShiftRegisterAction();
          toast.success("Cập nhật thành công");
        })
        .catch((err) => console.log(err));
    },
    // ****//
    // Đơn công tác
    async SettingApprovalMissionAction() {
      await SettingApprovalMissionApi()
        .then((payload) => {
          this.SettingApprovalMission = payload.data;
        })
        .catch((err) => console.log(err));
    },
    async CheckDescApprovalMissionAction() {
      await CheckDescApprovalMissionApi()
        .then((payload) => {
          this.CheckDescApprovalMission = payload.data.data;
        })
        .catch((err) => console.log(err));
    },
    async UpdateSettingApprovalMissionAction({ data, toast, EndTimeLoading }) {
      await UpdateSettingApprovalMissionApi(data)
        .then(() => {
          this.SettingApprovalMissionAction();
          this.CheckCreateApprovalAction({ EndTimeLoading });
          toast.success("Cập nhật thành công");
        })
        .catch((err) => console.log(err));
    },
    // ****//
    // Đơn làm theo chế độ
    async SettingApprovalWorktimeAction() {
      await SettingApprovalWorktimeApi()
        .then((payload) => {
          this.SettingApprovalWorktime = payload.data;
        })
        .catch((err) => console.log(err));
    },
    async CheckDescApprovalWorktimeAction() {
      await CheckDescApprovalWorktimeApi()
        .then((payload) => {
          this.CheckDescApprovalWorktime = payload.data.data;
        })
        .catch((err) => console.log(err));
    },
    async UpdateSettingApprovalWorktimeAction({ data, toast, EndTimeLoading }) {
      await UpdateSettingApprovalWorktimeApi(data)
        .then(() => {
          this.SettingApprovalWorktimeAction();
          this.CheckCreateApprovalAction({ EndTimeLoading });
          toast.success("Cập nhật thành công");
        })
        .catch((err) => console.log(err));
    },
    // ****//
    // Đơn thôi việc
    async SettingApprovalResignAction() {
      await SettingApprovalResignApi()
        .then((payload) => {
          this.SettingApprovalResign = payload.data;
        })
        .catch((err) => console.log(err));
    },
    async CheckDescApprovalResignAction() {
      await CheckDescApprovalResignApi()
        .then((payload) => {
          this.CheckDescApprovalResign = payload.data.data;
        })
        .catch((err) => console.log(err));
    },
    async UpdateSettingApprovalResignAction({ data, toast, EndTimeLoading }) {
      await UpdateSettingApprovalResignApi(data)
        .then(() => {
          this.SettingApprovalResignAction();
          this.CheckCreateApprovalAction({ EndTimeLoading });
          toast.success("Cập nhật thành công");
        })
        .catch((err) => console.log(err));
    },
    // ****//
    // Đơn vắng mặt
    async SettingApprovalAbsenceAction() {
      await SettingApprovalAbsenceApi()
        .then((payload) => {
          this.SettingApprovalAbsence = payload.data;
        })
        .catch((err) => console.log(err));
    },
    async CheckDescApprovalAbsenceAction() {
      await CheckDescApprovalAbsenceApi()
        .then((payload) => {
          this.CheckDescApprovalAbsence = payload.data.data;
        })
        .catch((err) => console.log(err));
    },
    async UpdateSettingApprovalAbsenceAction({ data, toast, EndTimeLoading }) {
      await UpdateSettingApprovalAbsenceApi(data)
        .then(() => {
          this.SettingApprovalAbsenceAction();
          this.CheckCreateApprovalAction({ EndTimeLoading });
          toast.success("Cập nhật thành công");
        })
        .catch((err) => console.log(err));
    },
    async CreateCommentApprovalAction({ data, toast, EndTimeLoading }) {
      CreateCommentApprovalApi(data)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.error(res.data.messages);
            EndTimeLoading();
          } else {
            toast.success("Tạo mới thành công");
            location.reload();
            EndTimeLoading();
          }
        })
        .catch((err) => {
          if (err.response.data?.error)
            toast.error("Xảy ra lỗi,vui lòng thử lại");
        });
    },
    async EditCommentApprovalAction({ data, toast, EndTimeLoading }) {
      EditCommentApprovalApi(data)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.error(res.data.messages);
            EndTimeLoading();
          } else {
            toast.success("Cập nhật thành công");
            location.reload();
            EndTimeLoading();
          }
        })
        .catch((err) => {
          if (err.response.data?.error)
            toast.error("Xảy ra lỗi,vui lòng thử lại");
        });
    },
    async DeleteCommentApprovalAction({ dataID, toast, EndTimeLoading }) {
      DeleteCommentApprovalApi(dataID)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.error(res.data.messages);
            EndTimeLoading();
          } else {
            toast.success("Xóa thành công");
            location.reload();
            EndTimeLoading();
          }
        })
        .catch((err) => {
          if (err.response.data?.error)
            toast.error("Xảy ra lỗi,vui lòng thử lại");
        });
    },
    // **** ///
  },
});
