import httpClient from "../Repository";
// Start category bonus
const GetAllCategoryBonusApi = (perPage) => {
  return httpClient.get(
    `/setting/personnel/type-reward/list?per_page=${perPage}`
  );
};
const GetAllCategoryBonusEndTimeLoadingApi = () => {
  return httpClient.get(`/setting/personnel/type-reward/list`);
};
const SearchCategoryBonusApi = (search) => {
  return httpClient.get(`/setting/personnel/type-reward/list?s=${search}`);
};
const CreateCategoryBonusApi = (bonus) => {
  return httpClient.post(`/setting/personnel/type-reward/create`, bonus);
};
const UpdateCategoryBonusApi = (bonus) => {
  return httpClient.post(
    `/setting/personnel/type-reward/update/${bonus.ID}`,
    bonus
  );
};
const DeleteCategoryBonusApi = (bonus) => {
  return httpClient.post(`/setting/personnel/type-reward/delete/${bonus}`);
};
// End category bonus

// Start category discipline
const GetAllCategoryDisciplineApi = (perPage) => {
  return httpClient.get(
    `/setting/personnel/type-rule/list?per_page=${perPage}`
  );
};
const GetAllCategoryDisciplineEndTimeLoadingApi = () => {
  return httpClient.get(`/setting/personnel/type-rule/list`);
};
const SearchCategoryDisciplineApi = (search) => {
  return httpClient.get(`/setting/personnel/type-rule/list?s=${search}`);
};
const CreateCategoryDisciplineApi = (discipline) => {
  return httpClient.post(`/setting/personnel/type-rule/create`, discipline);
};
const UpdateCategoryDisciplineApi = (discipline) => {
  return httpClient.post(
    `/setting/personnel/type-rule/update/${discipline.ID}`,
    discipline
  );
};
const DeleteCategoryDisciplineApi = (discipline) => {
  return httpClient.post(`/setting/personnel/type-rule/delete/${discipline}`);
};
// End category discipline
// Start category receive
const GetAllCategoryReceiveApi = (perPage) => {
  return httpClient.get(
    `/setting/personnel/receive-type/list?per_page=${perPage}`
  );
};
const GetAllCategoryReceiveEndTimeLoadingApi = () => {
  return httpClient.get(`/setting/personnel/receive-type/list`);
};
const SearchCategoryReceiveApi = (search) => {
  return httpClient.get(`/setting/personnel/receive-type/list?s=${search}`);
};
const CreateCategoryReceiveApi = (receive) => {
  return httpClient.post(`/setting/personnel/receive-type/create`, receive);
};
const UpdateCategoryReceiveApi = (receive) => {
  return httpClient.post(
    `/setting/personnel/receive-type/update/${receive.ID}`,
    receive
  );
};
const DeleteCategoryReceiveApi = (receive) => {
  return httpClient.post(`/setting/personnel/receive-type/delete/${receive}`);
};
// End category receive
// Start category quit
const GetAllCategoryQuitApi = (perPage) => {
  return httpClient.get(
    `/setting/personnel/jobout-type/list?per_page=${perPage}`
  );
};
const GetAllCategoryQuitEndTimeLoadingApi = () => {
  return httpClient.get(`/setting/personnel/jobout-type/list`);
};
const SearchCategoryQuitApi = (search) => {
  return httpClient.get(`/setting/personnel/jobout-type/list?s=${search}`);
};
const CreateCategoryQuitApi = (quit) => {
  return httpClient.post(`/setting/personnel/jobout-type/create`, quit);
};
const UpdateCategoryQuitApi = (quit) => {
  return httpClient.post(
    `/setting/personnel/jobout-type/update/${quit.ID}`,
    quit
  );
};
const DeleteCategoryQuitApi = (quit) => {
  return httpClient.post(`/setting/personnel/jobout-type/delete/${quit}`, quit);
};
// End category quit
export {
  GetAllCategoryBonusApi,
  GetAllCategoryBonusEndTimeLoadingApi,
  SearchCategoryBonusApi,
  CreateCategoryBonusApi,
  UpdateCategoryBonusApi,
  DeleteCategoryBonusApi,
  GetAllCategoryDisciplineApi,
  GetAllCategoryDisciplineEndTimeLoadingApi,
  SearchCategoryDisciplineApi,
  CreateCategoryDisciplineApi,
  UpdateCategoryDisciplineApi,
  DeleteCategoryDisciplineApi,
  GetAllCategoryReceiveApi,
  GetAllCategoryReceiveEndTimeLoadingApi,
  SearchCategoryReceiveApi,
  CreateCategoryReceiveApi,
  UpdateCategoryReceiveApi,
  DeleteCategoryReceiveApi,
  GetAllCategoryQuitApi,
  GetAllCategoryQuitEndTimeLoadingApi,
  SearchCategoryQuitApi,
  CreateCategoryQuitApi,
  UpdateCategoryQuitApi,
  DeleteCategoryQuitApi,
};
