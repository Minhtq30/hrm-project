import axios from "axios";
import { API_URL } from "@/constants/ApiUrl";
export const getAllCurrenciesApi = async (perPage, token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/system/currency/list?per_page=${perPage}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const CreateCurrencyApi = async (currency, token) => {
  const res = await axios({
    method: "POST",
    url: `${API_URL}/system/currency/create`,
    data: currency,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const DeleteCurrencyApi = async (currency, token) => {
  const res = await axios({
    method: "POST",
    url: `${API_URL}/system/currency/delete/${currency}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const UpdateCurrencyApi = async (currency, token) => {
  const res = await axios({
    method: "POST",
    url: `${API_URL}/system/currency/update/${currency.ID}`,
    data: currency,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
