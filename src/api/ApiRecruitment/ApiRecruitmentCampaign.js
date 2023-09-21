import httpClient from "../Repository";
const getAllRecruitmentCampaignApi = () => {
  return httpClient.get(`/recruitment/recruitment-campaign/list`);
};
const CreateRecruitmentCampaignApi = (data) => {
  return httpClient.post(`/recruitment/recruitment-campaign/create`, data);
};
const DeleteRecruitmentCampaignApi = (id) => {
  return httpClient.post(`/recruitment/recruitment-campaign/delete/${id}`);
};
const UpdateRecruitmentCampaignApi = (campaign) => {
  return httpClient.post(
    `/recruitment/recruitment-campaign/update/${campaign.ID}`,
    campaign
  );
};
const ShowDetailRecruitmentCampaignApi = (id) => {
  return httpClient.get(`/recruitment/recruitment-campaign/show/${id}`);
};
const SearchRecruitmentCampaignApi = (search) => {
  return httpClient.get(`/recruitment/recruitment-campaign/list?s=${search}`);
};
export {
  getAllRecruitmentCampaignApi,
  CreateRecruitmentCampaignApi,
  DeleteRecruitmentCampaignApi,
  UpdateRecruitmentCampaignApi,
  ShowDetailRecruitmentCampaignApi,
  SearchRecruitmentCampaignApi,
};
