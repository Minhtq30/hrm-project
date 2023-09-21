import httpClient from "../Repository";
// Đơn xin nghỉ
const SettingApprovalLeaveApi = () => {
  return httpClient.get(`/setting/approval/get-old-data-leave`);
};
const UpdateSettingApprovalLeaveApi = (data) => {
  return httpClient.post(`/setting/approval/leave`, data);
};
const CheckDescApprovalLeaveApi = () => {
  return httpClient.get(`/setting/get-by-key?name=LEAVE_NOTE`);
};
// ****//
// Đơn làm thêm
const SettingApprovalOvertimeApi = () => {
  return httpClient.get(`/setting/approval/get-old-data-overtime`);
};
const UpdateSettingApprovalOvertimeApi = (data) => {
  return httpClient.post(`/setting/approval/overtime`, data);
};
const CheckDescApprovalOvertimeApi = () => {
  return httpClient.get(`/setting/get-by-key?name=OVERTIME_NOTE`);
};
//*** */
// Đơn check in/out
const SettingApprovalInoutApi = () => {
  return httpClient.get(`/setting/approval/get-old-data-inout`);
};
const UpdateSettingApprovalInoutApi = (data) => {
  return httpClient.post(`/setting/approval/inout`, data);
};
const CheckDescApprovalInoutApi = () => {
  return httpClient.get(`/setting/get-by-key?name=INOUT_NOTE`);
};
//*** */
// Đơn đổi ca
const SettingApprovalShiftChangeApi = () => {
  return httpClient.get(`/setting/approval/get-old-data-shift-change`);
};
const UpdateSettingApprovalShiftChangeApi = (data) => {
  return httpClient.post(`/setting/approval/shift-change`, data);
};
const CheckDescApprovalShiftChangeApi = () => {
  return httpClient.get(`/setting/get-by-key?name=SHIFTCHANGE_NOTE`);
};
//*** */
// Đơn tăng ca
const SettingApprovalShiftMoreApi = () => {
  return httpClient.get(`/setting/approval/get-old-data-shift-more`);
};
const CheckDescApprovalShiftMoreApi = () => {
  return httpClient.get(`/setting/get-by-key?name=SHIFTMORE_NOTE`);
};
const UpdateSettingApprovalShiftMoreApi = (data) => {
  return httpClient.post(`/setting/approval/shift-more`, data);
};
//*** */
// Đơn đăng kí ca
const SettingApprovalShiftRegisterApi = () => {
  return httpClient.get(`/setting/approval/get-old-data-shift-register`);
};
const CheckDescApprovalShiftRegisterApi = () => {
  return httpClient.get(`/setting/get-by-key?name=SHIFTREGISTER_NOTE`);
};
const UpdateSettingApprovalShiftRegisterApi = (data) => {
  return httpClient.post(`/setting/approval/shift-register`, data);
};
//**** */
// Đơn công tác
const SettingApprovalMissionApi = () => {
  return httpClient.get(`/setting/approval/get-old-data-private-mission`);
};
const CheckDescApprovalMissionApi = () => {
  return httpClient.get(`/setting/get-by-key?name=MISSION_NOTE`);
};
const UpdateSettingApprovalMissionApi = (data) => {
  return httpClient.post(`/setting/approval/private-mission`, data);
};
//**** */
// Đơn theo chế độ
const SettingApprovalWorktimeApi = () => {
  return httpClient.get(`/setting/approval/get-old-data-privilege-application`);
};
const CheckDescApprovalWorktimeApi = () => {
  return httpClient.get(`/setting/get-by-key?name=PRIVILEGE_NOTE`);
};
const UpdateSettingApprovalWorktimeApi = (data) => {
  return httpClient.post(`/setting/approval/privilege-application`, data);
};
//*** */
// Đơn thôi việc
const SettingApprovalResignApi = () => {
  return httpClient.get(`/setting/approval/get-old-data-leave-application`);
};
const CheckDescApprovalResignApi = () => {
  return httpClient.get(`/setting/get-by-key?name=LEAVE_APPLICATION_NOTE`);
};
const UpdateSettingApprovalResignApi = (data) => {
  return httpClient.post(`/setting/approval/leave-application`, data);
};
//*** */
// Đơn vắng mặt
const SettingApprovalAbsenceApi = () => {
  return httpClient.get(`/setting/approval/get-old-data-meeting`);
};
const CheckDescApprovalAbsenceApi = () => {
  return httpClient.get(`/setting/get-by-key?name=MEETING_NOTE`);
};
const UpdateSettingApprovalAbsenceApi = (data) => {
  return httpClient.post(`/setting/approval/meeting`, data);
};
const CheckCreateApprovalApi = () => {
  return httpClient.get(`/setting/approval/key`);
};

// Bình luận trong đơn từ
const CreateCommentApprovalApi = (data) => {
  return httpClient.post(`/approval/comment/create/${data.ID}`, data.content);
};
const EditCommentApprovalApi = (data) => {
  return httpClient.post(`/approval/comment/update/${data.ID}`, data.content);
};
const DeleteCommentApprovalApi = (dataID) => {
  return httpClient.get(`/approval/comment/delete/${dataID.ID}`);
};
export {
  SettingApprovalLeaveApi,
  UpdateSettingApprovalLeaveApi,
  CheckDescApprovalLeaveApi,
  SettingApprovalOvertimeApi,
  UpdateSettingApprovalOvertimeApi,
  CheckDescApprovalOvertimeApi,
  SettingApprovalInoutApi,
  UpdateSettingApprovalInoutApi,
  CheckDescApprovalInoutApi,
  SettingApprovalShiftChangeApi,
  UpdateSettingApprovalShiftChangeApi,
  CheckDescApprovalShiftChangeApi,
  SettingApprovalShiftMoreApi,
  CheckDescApprovalShiftMoreApi,
  UpdateSettingApprovalShiftMoreApi,
  SettingApprovalShiftRegisterApi,
  CheckDescApprovalShiftRegisterApi,
  UpdateSettingApprovalShiftRegisterApi,
  SettingApprovalMissionApi,
  CheckDescApprovalMissionApi,
  UpdateSettingApprovalMissionApi,
  SettingApprovalWorktimeApi,
  CheckDescApprovalWorktimeApi,
  UpdateSettingApprovalWorktimeApi,
  SettingApprovalResignApi,
  CheckDescApprovalResignApi,
  UpdateSettingApprovalResignApi,
  SettingApprovalAbsenceApi,
  CheckDescApprovalAbsenceApi,
  UpdateSettingApprovalAbsenceApi,
  CheckCreateApprovalApi,
  CreateCommentApprovalApi,
  EditCommentApprovalApi,
  DeleteCommentApprovalApi,
};
