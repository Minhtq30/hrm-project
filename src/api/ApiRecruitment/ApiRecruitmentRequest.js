import httpClient from "../Repository";
const getAllRecruitmentRequestApi = () => {
  return httpClient.get(`/recruitment/recruitment-request/list`);
};
const CreateRecruitmentRequestApi = (data) => {
  return httpClient.post(`/recruitment/recruitment-request/create`, data);
};
const DeleteRecruitmentRequestApi = (id) => {
  return httpClient.post(`/recruitment/recruitment-request/delete/${id}`);
};
const UpdateRecruitmentRequestApi = (request) => {
  return httpClient.post(
    `/recruitment/recruitment-request/update/${request.ID}`,
    request
  );
};
const ShowDetailRecruitmentRequestApi = (id) => {
  return httpClient.get(`/recruitment/recruitment-request/show/${id}`);
};
const SearchRecruitmentRequestApi = (search) => {
  return httpClient.get(`/recruitment/recruitment-request/list?s=${search}`);
};
export {
  getAllRecruitmentRequestApi,
  CreateRecruitmentRequestApi,
  DeleteRecruitmentRequestApi,
  UpdateRecruitmentRequestApi,
  ShowDetailRecruitmentRequestApi,
  SearchRecruitmentRequestApi,
};
