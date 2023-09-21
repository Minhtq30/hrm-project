import httpClient from "../Repository";
const GetAllSocialGroupApi = () => {
  return httpClient.get(`/social/group/list`);
};
const GetAllPostGroupApi = (id, count) => {
  return httpClient.get(`/social/group/list-post/${id}?count=${count}`);
};
const GetDetailGroupApi = (id) => {
  return httpClient.get(`/social/group/show/${id}`);
};
const CreateSocialGroupApi = (group) => {
  return httpClient.post(`/social/group/create`, group);
};
const UpdateSocialGroupApi = (dataGroup) => {
  return httpClient.post(
    `/social/group/update/${dataGroup.ID}`,
    dataGroup.group
  );
};
const DeleteSocialGroupApi = (id) => {
  return httpClient.post(`/social/group/delete/${id}`);
};
const GetAllGroupJoinedApi = () => {
  return httpClient.get(`/social/group/private-list`);
};
const ChangeAvatarGroupApi = (data) => {
  return httpClient.post(
    `/social/group/change-avatar/${data.id}`,
    data.avatars
  );
};
const ChangeBannerGroupApi = (data) => {
  return httpClient.post(
    `/social/group/change-banner/${data.id}`,
    data.banners
  );
};
const GetAllMembersInGroupApi = (id) => {
  return httpClient.get(`/social/group/list-member/${id}`);
};
const AddMembersInGroupApi = (dataGroup) => {
  return httpClient.post(
    `/social/group/add-member/${dataGroup.id}`,
    dataGroup.data
  );
};
export {
  GetAllSocialGroupApi,
  GetAllPostGroupApi,
  CreateSocialGroupApi,
  UpdateSocialGroupApi,
  DeleteSocialGroupApi,
  GetAllGroupJoinedApi,
  ChangeAvatarGroupApi,
  ChangeBannerGroupApi,
  GetAllMembersInGroupApi,
  AddMembersInGroupApi,
  GetDetailGroupApi,
};
