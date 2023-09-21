import axios from "axios";
import { API_URL, TOKEN } from "@/constants/ApiUrl";
import httpClient from "../Repository";
export const GetAllSocialNewApi = async (token, countPost) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/social/post/list-all?count=${countPost}`,
    headers: TOKEN(token),
  });
  return res;
};
export const GetAllBirthdayMonthApi = async (token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/social/person/birth-day/list`,
    headers: TOKEN(token),
  });
  return res;
};
// const GetAllSocialNewApi = (countPost) => {
//   return httpClient.get(`/social/post/list-all?count=${countPost}`);
// };
// const GetAllBirthdayMonthApi = () => {
//   return httpClient.get(`/social/person/birth-day/list`);
// };
const GetAllBirthdayApi = (month) => {
  return httpClient.get(`/social/person/birth-day/list-month/${month}`);
};
const CreateSocialNewApi = (data) => {
  return httpClient.post(`/social/post/create`, data);
};
const EditPostSocialApi = (data) => {
  return httpClient.post(`/social/post/update/${data.ID}`, data.content);
};
const DeleteNewPostApi = (dataID) => {
  return httpClient.post(`/social/post/delete/${dataID.ID}`);
};
const CreateCommentSocialApi = (data) => {
  return httpClient.post(`/social/comment/create/${data.ID}`, data.content);
};
const EditCommentSocialApi = (data) => {
  return httpClient.post(`/social/comment/update/${data.ID}`, data.content);
};
const DeleteCommentApi = (dataID) => {
  return httpClient.post(`/social/comment/delete/${dataID.ID}`);
};
const ReactionPostApi = (data) => {
  return httpClient.post(`/social/post/reaction/${data.ID}`, data.reaction);
};
const ShowDetailUserApi = (dataPost) => {
  return httpClient.get(
    `/social/person/show/${dataPost.idUser}?count=${dataPost.count}`
  );
};
const ShowDetailPostApi = (idPost) => {
  return httpClient.get(`/social/post/show/${idPost}`);
};
const GetAllMobileApi = () => {
  return httpClient.get(`/personnel/contact/list`);
};
const SearchMobileApi = (search) => {
  return httpClient.get(`/personnel/contact/list?s=${search}`);
};
export {
  GetAllBirthdayApi,
  CreateSocialNewApi,
  EditPostSocialApi,
  DeleteNewPostApi,
  CreateCommentSocialApi,
  EditCommentSocialApi,
  DeleteCommentApi,
  ReactionPostApi,
  ShowDetailUserApi,
  GetAllMobileApi,
  ShowDetailPostApi,
  SearchMobileApi,
};
