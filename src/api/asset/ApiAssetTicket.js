import axios from "axios";
import { API_URL } from "@/constants/ApiUrl";
export const getAllAssetTicketApi = async (params, token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/assets/ticket?per_page=${params.perPage}&type=${params.status}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const getAllAssetTicketTypeApi = async (token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/assets/ticket/type`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const getAssetTicketByIdApi = async (token, id) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/assets/ticket/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const getAllAssetTicketStatusApi = async (token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/assets/ticket/status`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const getAssetByIdApi = async (id, token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/assets/ticket/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const SearchAssetApi = async (params, token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/assets/asset?s=${params.key}&status=${params.status}&ticket_type=${params.ticket_Type}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const SearchPersonTicketApi = async (key, token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/personnel/search?s=${key}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const CreateAssetTicketApi = async (assetTicket, token) => {
  const res = await axios({
    method: "POST",
    url: `${API_URL}/assets/ticket`,
    data: assetTicket,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const DeleteAssetTicketApi = async (assetTicket, token) => {
  const res = await axios({
    method: "DELETE",
    url: `${API_URL}/assets/ticket/${assetTicket}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const UpdateAssetTicketApi = async (assetTicket, token) => {
  const res = await axios({
    method: "PUT",
    url: `${API_URL}/assets/ticket/${assetTicket.id}`,
    data: assetTicket,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
