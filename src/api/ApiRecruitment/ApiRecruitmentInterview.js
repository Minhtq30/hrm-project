import httpClient from "../Repository";
const getAllRecruitmentInterviewApi = () => {
  return httpClient.get(`/recruitment/recruitment-interview/list`);
};
const CreateRecruitmentInterviewApi = (data) => {
  return httpClient.post(`/recruitment/recruitment-interview/list`, data);
};
const DeleteRecruitmentInterviewApi = (id) => {
  return httpClient.post(`/recruitment/recruitment-interview/delete/${id}`);
};
const UpdateRecruitmentInterviewApi = (Candidate) => {
  return httpClient.post(
    `/recruitment/recruitment-interview/update/${Candidate.ID}`,
    Candidate
  );
};
const ShowDetailRecruitmentInterviewApi = (id) => {
  return httpClient.get(`/recruitment/recruitment-interview/show/${id}`);
};

export {
  getAllRecruitmentInterviewApi,
  CreateRecruitmentInterviewApi,
  DeleteRecruitmentInterviewApi,
  UpdateRecruitmentInterviewApi,
  ShowDetailRecruitmentInterviewApi,
};
