import { UPLOAD_POSM } from "@/constants/ApiUrl";
import { FormatTypeApiApproval } from "@/constants/FormatAll";
import httpClient from "../Repository";
const GetAllUploadPosmApi = (type, menu) => {
  if (menu == "ALL") {
    menu = "";
  }
  type = FormatTypeApiApproval(type);
  return httpClient.get(
    `/${type}?app_approval_type=${UPLOAD_POSM}&app_approval_current_status=${menu}`
  );
};
const CreateUploadPosmApi = (data) => {
  return httpClient.post(`/approval/posm/create`, data);
};
const UpdateUploadPosmApi = (data, id) => {
  return httpClient.post(`/approval/posm/update/${id}`, data);
};
const DeleteUploadPosmApi = (leave) => {
  return httpClient.post(`/approval/personnel-leave/delete/${leave}`);
};
// Lấy dữ liệu phép năm của nhân viên
const GetFurloughDetailUserApi = (data) => {
  return httpClient.post(`/personnel/furlough-year/user-detail`, data);
};
export {
  GetAllUploadPosmApi,
  CreateUploadPosmApi,
  UpdateUploadPosmApi,
  DeleteUploadPosmApi,
  GetFurloughDetailUserApi,
};
