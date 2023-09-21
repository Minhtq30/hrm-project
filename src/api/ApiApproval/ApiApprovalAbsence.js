import { ABSENCE_APPROVAL } from "@/constants/ApiUrl";
import { FormatTypeApiApproval } from "@/constants/FormatAll";
import httpClient from "../Repository";
const GetAllApprovalAbsenceApi = (type, menu) => {
  if (menu == "ALL") {
    menu = "";
  }
  type = FormatTypeApiApproval(type);
  return httpClient.get(
    `/${type}?app_approval_type=${ABSENCE_APPROVAL}&app_approval_current_status=${menu}`
  );
};
const CreateApprovalAbsenceApi = (absence) => {
  return httpClient.post(`/approval/personnel-meeting/create`, absence);
};
const UpdateApprovalAbsenceApi = (absence) => {
  return httpClient.post(
    `/approval/personnel-meeting/update/${absence.ID}`,
    absence
  );
};
const DeleteApprovalAbsenceApi = (absence) => {
  return httpClient.post(`/approval/personnel-meeting/delete/${absence}`);
};
const DetailsCompensatoryUserApi = (data) => {
  return httpClient.post(`/compensatory/user-detail`, data);
};
export {
  GetAllApprovalAbsenceApi,
  CreateApprovalAbsenceApi,
  UpdateApprovalAbsenceApi,
  DeleteApprovalAbsenceApi,
  DetailsCompensatoryUserApi,
};
