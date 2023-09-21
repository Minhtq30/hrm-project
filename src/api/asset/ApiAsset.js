import axios from "axios";
import { API_URL } from "@/constants/ApiUrl";
export const getAllAssetApi = async (perPage, token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/assets/asset?per_page=${perPage}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const getAssetByStatusApi = async (perPage, status, token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/assets/asset?per_page=${perPage}&status=${status}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const getAllPersonApi = async (token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/personnel/list`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const getAssetByIdApi = async (token, id) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/assets/asset/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const countAssetByStatusApi = async (token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/assets/asset/count-status`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const getAssetHistoryApi = async (token, id) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/assets/asset/history/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const SearchAssetApi = async (code, token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/assets/asset?s=${code}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const SearchAssetStatusApi = async (code, token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/assets/status?s=${code}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const SearchAssetMultiFieldApi = async (params, token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/assets/asset?s=${params.code}&personnel_department_id=${params.department_id}&current_user_id=${params.person_id}&date_bought=${params.date_bought}&status=${params.status_code}&contract_number=${params.contract_number}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const SearchAssetTypeApi = async (key, token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/assets/group/all?s=${key}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const SearchPersonApi = async (key, token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/personnel/search?s=${key}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const SearchSupplierApi = async (key, token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/assets/supplier?s=${key}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const SearchAssetOriginApi = async (key, token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/assets/origin?s=${key}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const SearchLocationApi = async (key, token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/inventory/source?s=${key}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const CreateAssetApi = async (data, token) => {
  const res = await axios({
    method: "POST",
    url: `${API_URL}/assets/asset`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const DeleteAssetApi = async (data, token) => {
  const res = await axios({
    method: "DELETE",
    url: `${API_URL}/assets/asset/${data}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
export const UpdateAssetApi = async (data, token) => {
  const res = await axios({
    method: "PUT",
    url: `${API_URL}/assets/asset/${data.id}`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
//import
export const ImportAssetsApi = async (data, token) => {
  const d = {};
  d.data = JSON.stringify(data.value);
  const res = await axios({
    method: "POST",
    url: `${API_URL}/assets/import/excel`,
    data: data.value,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
// Reduction
export const getAllReductionByYearApi = async (token, data) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/assets/asset/reductions/year/${data.year}?per_page=${data.perPage}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const getAllReductionApi = async (token, data) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/assets/asset/reductions?per_page=${data}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const getReductionByIdApi = async (token, id) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/assets/asset/${id}/reduction?re_list=current`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
// export const getReductionByIdApi = async (token, id) => {
//   const res = await axios({
//     method: "GET",
//     url: `${API_URL}/assets/asset/${id}/reduction?re_list=current`,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return res.data;
// };
