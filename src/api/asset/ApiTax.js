import axios from "axios";
import { API_URL } from "@/constants/ApiUrl";
export const getAllTaxsApi = async (perPage, token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/setting/asset/tax/list?per_page=${perPage}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const CreateTaxApi = async (tax, token) => {
  const res = await axios({
    method: "POST",
    url: `${API_URL}/setting/asset/tax/create`,
    data: tax,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const DeleteTaxApi = async (tax, token) => {
  const res = await axios({
    method: "POST",
    url: `${API_URL}/setting/asset/tax/delete/${tax}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const UpdateTaxApi = async (tax, token) => {
  const res = await axios({
    method: "POST",
    url: `${API_URL}/setting/asset/tax/update/${tax.ID}`,
    data: tax,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
