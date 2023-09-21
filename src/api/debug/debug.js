import axios from "axios";
import { API_URL } from "@/constants/ApiUrl";

const token = localStorage.getItem("TOKEN");
export const DebugGetPostList = async (key) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/debug/post-list?s=${key}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const DebugGetNotifications = async (key) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/debug/notification-list?s=${key}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const DebugPostLike = async (id) => {
  const res = await axios({
    method: "POST",
    url: `${API_URL}/debug/post-like`,
    data: { post_id: id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
