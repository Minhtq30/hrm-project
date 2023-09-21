import httpClient from "../Repository";
const GetAllAbsencesApi = () => {
  return httpClient.get(`/approval/personnel-meeting-type/list`);
};
const SearchAbsencesApi = (search) => {
  return httpClient.get(`/approval/personnel-meeting-type/list?s=${search}`);
};
const CreateAbsencesApi = (absence) => {
  return httpClient.post(`/approval/personnel-meeting-type/create`, absence);
};
const UpdateAbsenceApi = (absence) => {
  return httpClient.post(
    `/approval/personnel-meeting-type/update/${absence.ID}`,
    absence
  );
};
const DeleteAbsenceApi = (absence) => {
  return httpClient.post(`/approval/personnel-meeting-type/delete/${absence}`);
};
export {
  GetAllAbsencesApi,
  SearchAbsencesApi,
  CreateAbsencesApi,
  UpdateAbsenceApi,
  DeleteAbsenceApi,
};
