import httpClient from "../Repository";
const GetAllPositiontitlesApi = (perPage) => {
  return httpClient.get(`/setting/position/title/list?per_page=${perPage}`);
};
const GetAllPositiontitlesEndTimeLoadingApi = () => {
  return httpClient.get(`/setting/position/title/list`);
};
const CreatePositiontitleApi = (positiontitle) => {
  return httpClient.post(`/setting/position/title/create`, positiontitle);
};
const UpdatePositiontitleApi = (positiontitle) => {
  return httpClient.post(
    `/setting/position/title/update/${positiontitle.ID}`,
    positiontitle
  );
};
const DeletePositiontitleApi = (positiontitle) => {
  return httpClient.post(`/setting/position/title/delete/${positiontitle}`);
};
const SearchPositiontitlesApi = (data) => {
  return httpClient.get(`/setting/position/title/list?s=${data}`);
};
//IMPORT DATA POSITION
const ImportPositionTitleApi = (data) => {
  return httpClient.post(`/setting/position/title/import`, data.value);
};

export {
  GetAllPositiontitlesApi,
  GetAllPositiontitlesEndTimeLoadingApi,
  CreatePositiontitleApi,
  UpdatePositiontitleApi,
  DeletePositiontitleApi,
  SearchPositiontitlesApi,
  ImportPositionTitleApi,
};
