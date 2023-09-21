import axios from "axios";
import { API_URL } from "@/constants/ApiUrl";
export const getAllAssetTicketApi = async (token) => {
  const res = await axios({
    method: "GET",
    // url: `${API_URL}/inventory/source?fields=${fields}`,
    url: `${API_URL}/assets/ticket`,
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
  return res;
};

export const UpdateAssetTicketApi = async (assetTicket, token) => {
  const res = await axios({
    method: "PUT",
    url: `${API_URL}/assets/Ticket/${assetTicket.id}`,
    data: assetTicket,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
