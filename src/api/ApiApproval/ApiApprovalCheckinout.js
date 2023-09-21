import { INOUT_APPROVAL } from "@/constants/ApiUrl";
import { FormatTypeApiApproval } from "@/constants/FormatAll";
import httpClient from "../Repository";
const GetAllApprovalCheckinoutApi = (type, menu) => {
  if (menu == "ALL") {
    menu = "";
  }
  type = FormatTypeApiApproval(type);
  return httpClient.get(
    `/${type}?app_approval_type=${INOUT_APPROVAL}&app_approval_current_status=${menu}`
  );
};
const CreateApprovalCheckinoutApi = (checkinout) => {
  return httpClient.post(`/approval/personnel-checkinout/create`, checkinout);
};
const UpdateApprovalCheckinoutApi = (checkinout) => {
  return httpClient.post(
    `/approval/personnel-checkinout/update/${checkinout.ID}`,
    checkinout
  );
};
const DeleteApprovalCheckinoutApi = (checkinout) => {
  return httpClient.post(`/approval/personnel-checkinout/delete/${checkinout}`);
};
export {
  GetAllApprovalCheckinoutApi,
  CreateApprovalCheckinoutApi,
  UpdateApprovalCheckinoutApi,
  DeleteApprovalCheckinoutApi,
};
