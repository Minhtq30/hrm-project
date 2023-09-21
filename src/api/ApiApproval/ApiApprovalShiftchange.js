import { SHIFTCHANGE_APPROVAL } from "@/constants/ApiUrl";
import { FormatTypeApiApproval } from "@/constants/FormatAll";
import httpClient from "../Repository";
const GetAllApprovalShiftchangeApi = (type, menu) => {
  if (menu == "ALL") {
    menu = "";
  }
  type = FormatTypeApiApproval(type);
  return httpClient.get(
    `/${type}?app_approval_type=${SHIFTCHANGE_APPROVAL}&app_approval_current_status=${menu}`
  );
};
const CreateApprovalShiftchangeApi = (shiftchange) => {
  return httpClient.post(
    `/approval/personnel-shift-change/create`,
    shiftchange
  );
};
const UpdateApprovalShiftchangeApi = (shiftchange) => {
  return httpClient.post(
    `/approval/personnel-shift-change/update/${shiftchange.ID}`,
    shiftchange
  );
};
const DeleteApprovalShiftchangeApi = (shiftchange) => {
  return httpClient.post(
    `/approval/personnel-shift-change/delete/${shiftchange}`
  );
};
export {
  GetAllApprovalShiftchangeApi,
  CreateApprovalShiftchangeApi,
  UpdateApprovalShiftchangeApi,
  DeleteApprovalShiftchangeApi,
};
