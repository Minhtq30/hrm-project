import httpClient from "../Repository";
const getAllRecruitmentCandidateApi = () => {
  return httpClient.get(`/recruitment/recruitment-candidate/list`);
};
const CreateRecruitmentCandidateApi = (data) => {
  return httpClient.post(`/recruitment/recruitment-candidate/create`, data);
};
const DeleteRecruitmentCandidateApi = (id) => {
  return httpClient.post(`/recruitment/recruitment-candidate/delete/${id}`);
};
const UpdateRecruitmentCandidateApi = (Candidate) => {
  return httpClient.post(
    `/recruitment/recruitment-candidate/update/${Candidate.ID}`,
    Candidate
  );
};
const ShowDetailRecruitmentCandidateApi = (id) => {
  return httpClient.get(`/recruitment/recruitment-candidate/show/${id}`);
};
export {
  getAllRecruitmentCandidateApi,
  CreateRecruitmentCandidateApi,
  DeleteRecruitmentCandidateApi,
  UpdateRecruitmentCandidateApi,
  ShowDetailRecruitmentCandidateApi,
};
