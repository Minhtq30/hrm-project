import httpClient from "../Repository";
const GetAllMissionsApi = () => {
  return httpClient.get(`/approval/personnel-private-mission-surcharge/list`);
};
const SearchMissionsApi = (search) => {
  return httpClient.get(
    `/approval/personnel-private-mission-surcharge/list?s=${search}`
  );
};
const CreateMissionApi = (mission) => {
  return httpClient.post(
    `/approval/personnel-private-mission-surcharge/create`,
    mission
  );
};
const UpdateMissionApi = (mission) => {
  return httpClient.post(
    `/approval/personnel-private-mission-surcharge/update/${mission.ID}`,
    mission
  );
};
const DeleteMissionApi = (mission) => {
  return httpClient.post(
    `/approval/personnel-private-mission-surcharge/delete/${mission}`
  );
};
export {
  GetAllMissionsApi,
  SearchMissionsApi,
  CreateMissionApi,
  UpdateMissionApi,
  DeleteMissionApi,
};
