import axios from "axios";
import { API_URL } from "@/constants/ApiUrl";
export const getAllAssetStatusApi = async (perPage, token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/assets/status?per_page = ${perPage}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const CreateAssetStatusApi = async (assetStatus, token) => {
  const res = await axios({
    method: "POST",
    url: `${API_URL}/assets/status`,
    data: assetStatus,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const DeleteAssetStatusApi = async (assetStatus, token) => {
  const res = await axios({
    method: "DELETE",
    url: `${API_URL}/assets/status/${assetStatus}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const UpdateAssetStatusApi = async (assetStatus, token) => {
  const res = await axios({
    method: "PUT",
    url: `${API_URL}/assets/status/${assetStatus.id}`,
    data: assetStatus,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
