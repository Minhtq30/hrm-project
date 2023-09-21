import { MISSION_APPROVAL } from "@/constants/ApiUrl";
import { FormatTypeApiApproval } from "@/constants/FormatAll";
import httpClient from "../Repository";
const GetAllApprovalMissionApi = (type, menu) => {
  if (menu == "ALL") {
    menu = "";
  }
  type = FormatTypeApiApproval(type);
  return httpClient.get(
    `/${type}?app_approval_type=${MISSION_APPROVAL}&app_approval_current_status=${menu}`
  );
};
const CreateApprovalMissionApi = (checkinout) => {
  return httpClient.post(
    `/approval/personnel-private-mission/create`,
    checkinout
  );
};
const UpdateApprovalMissionApi = (mission) => {
  return httpClient.post(
    `/approval/personnel-private-mission/update/${mission.ID}`,
    mission
  );
};
const DeleteApprovalMissionApi = (mission) => {
  return httpClient.post(
    `/approval/personnel-private-mission/delete/${mission}`
  );
};
export {
  GetAllApprovalMissionApi,
  CreateApprovalMissionApi,
  UpdateApprovalMissionApi,
  DeleteApprovalMissionApi,
};
