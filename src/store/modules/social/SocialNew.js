import {
  CreateCommentSocialApi,
  CreateSocialNewApi,
  EditPostSocialApi,
  DeleteCommentApi,
  DeleteNewPostApi,
  EditCommentSocialApi,
  GetAllBirthdayApi,
  GetAllBirthdayMonthApi,
  GetAllMobileApi,
  GetAllSocialNewApi,
  ReactionPostApi,
  SearchMobileApi,
  ShowDetailPostApi,
  ShowDetailUserApi,
} from "@/api/ApiSocial/ApiSocialNew";
import { URL_IMG } from "@/constants/ApiUrl";
import { useSocialGroup } from "./SocialGroup";
const state = () => {
  return {
    listSocialNew: [],
    groupDetail: {},
    listBirthday: [],
    listBirthdayMonth: [],
    personnelDetail: {},
    listMobile: [],
    avatar: null,
    banners: null,
    detailPost: null,
  };
};
const mutations = {
  GetAllSocialNewMutation(state, payload) {
    state.listSocialNew = payload;
  },
  ShowSocialGroupMutation(state, payload) {
    state.groupDetail = payload.data;
  },
  GetAllBirthdayMonthMutation(state, payload) {
    state.listBirthday = payload.data;
  },
  GetShowDetailUserMutation(state, payload) {
    state.personnelDetail = payload;
    if (payload.data_user?.avatars) {
      state.avatar = URL_IMG + "/" + payload.data_user?.avatars[0];
    } else {
      state.avatar =
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBggOBwgICAcIBwoGBgUFBg8ICQcKIBEWFiAREx8YKCggGCYlGx8fITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NEA0NDisZHxkrKysrKysrLSsrKysrLS0rKysrKystKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAgEH/8QALRABAAIBAgQEBgIDAQAAAAAAAAECAwQRISIxUgUSMnITM1FigpJCYUFxoiP/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oADAMBAAIRAxEAPwD6+A0yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhz6mmKOM727agmeTasdZiGZl1WXJPCfLHbVDMzM8Zk1ca/wAWndDqJiekxLG3n6y9i1onhMxKaY2RnYtZesx5+aF7Flrkjln8V1HYAAAAAAAAAAAAAAAAOMuSMdJmf8Ah1eo+HG1fXP8AyzpmZmd53l7e03tMz1lylutQAQAAHeO9sdoms7OAGvgzVzU3jr/KqRlabLOLJHbPLZqxMTEbdJalZoAAAAAAAAAAAAAApeI34VrH5LrN18755/qKlIrAMtAAAAAADV0d/Phrv1jlZS/4dO9b/wBLEq4AqAAAAAAAAAAAADN10bZ5/wBVaSj4jT0zH5FIpAMtAAAAAAC/4dG0X/tQamip5MMb9Z5liVOAqAAAAAAAAAAAADjNjjJjmJ/F2AxbRNbTE9YeNHV6b4keakc8eqvcz5iYnjG0pY08AQAAAdUpOS0RWN5kHenxzlyRG3COazWiIiI26Qi0+GMNPun1WStSM0AAAAAAAAAAAAAAAAQZ9NXL05b9yW16V9Voj3OomJjhO8AysumyY54xvHdVFtP0ltOZx0t1rEmLrGexEzPCJlrfAxdkOopWvSsQYaz8WkyXmPNHlr9y9iw0xRyxx7kgSGg5jJSZ2i0ebtdCAAAAAAAAAAAAAOcuSMdJmZ4QBe8UiZtO0KObWWtv8Plr3Ic+a2W07zy/xqiS1cezMzPGZlJi1GTHPCd47bIhFaOPW0n1xNZ+1NXNjmOF6/syBdTGz56d1f2eTmxx1vX9mRvP1knj1NMaV9ZjrHDe0qmXV5L77cte2quGmPd536zunxarJjmN581e2yuIrXxZq5Y5Z49qRj0vOO0TWdphpafNGan0tHqqsqWJgFQAAAAAAAAZuszTkvtE8lVzVZPh4p2njPLVlz1KseAMqAAAAAAAAAAJMOScV4mPyqjAbVLRasTHSXqpoMm9JrM8Y9PtW2oyAAAAAAAApeI29MfkorfiM/8ArX2KiXqwARQAAAAAAAAAAAFnRW8uePu5WkydN8/H72s1EoAIAAAAAAz/ABH50exUW/EfnR7FRL1qACAAAAAAAAAAAACXTfPx+9rMnTfPx+9rNRKACAAAAAAM/wAR+dHsVAS9agAgAAAAAAAAAAAAl03z8fvawNRKACAAP//Z";
    }
    if (payload.data_user?.banners) {
      state.banners = URL_IMG + "/" + payload.data_user?.banners[0];
    } else {
      state.banners =
        "https://4.bp.blogspot.com/-p7SnIEIYyVc/Ua1QvnYOGkI/AAAAAAAABSM/nPaBB02FYKU/s1600/blogsinhvien.info-Facebook-Timeline-5.jpg";
    }
  },
  GetAllBirthdayMutation(state, payload) {
    state.listBirthdayMonth = payload.data;
  },
  GetAllMobileMutation(state, payload) {
    state.listMobile = payload.data;
  },
  ShowDetailPostMutation(state, payload) {
    state.detailPost = payload.data;
  },
};

const actions = {
  async GetAllSocialNewAction(context, { countPost, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    GetAllSocialNewApi(token, countPost)
      .then((payload) => {
        if (payload.status == 200) {
          context.commit("GetAllSocialNewMutation", payload.data.data);
          EndTimeLoading();
        } else {
          alert("Lỗi");
        }
      })
      .catch((err) => console.log(err));
  },
  async CreateSocialNewAction(
    context,
    { data, toast, closeModal, count, EndTimeLoading }
  ) {
    CreateSocialNewApi(data)
      .then((res) => {
        if (res.data.status == "failed") {
          toast.error(res.data.messages);
        } else {
          context.dispatch("GetAllSocialNewAction", {
            countPost: count,
            EndTimeLoading,
          });
          closeModal();
          toast.success("Tạo mới thành công");
        }
      })
      .catch((err) => {
        if (err.response.data?.error) toast.error("That bai");
      });
  },
  async GetAllBirthdayMonthAction(context) {
    const token = localStorage.getItem("TOKEN");
    GetAllBirthdayMonthApi(token)
      .then((payload) =>
        context.commit("GetAllBirthdayMonthMutation", payload.data)
      )
      .catch((err) => console.log(err));
  },
  async GetAllBirthdayAction(context, { date, EndTimeLoading }) {
    GetAllBirthdayApi(date)
      .then((payload) => {
        context.commit("GetAllBirthdayMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async GetShowDetailUserAction(context, dataPost) {
    ShowDetailUserApi(dataPost)
      .then((payload) => {
        context.commit("GetShowDetailUserMutation", payload.data);
      })
      .catch((err) => console.log(err));
  },
  async GetShowDetailUserEndTimeLoadingAction(
    context,
    { data, EndTimeLoading }
  ) {
    ShowDetailUserApi(data)
      .then((payload) => {
        context.commit("GetShowDetailUserMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async LoadPostAction(context, { route, count, EndTimeLoading }) {
    if (route.name == "Social") {
      context.dispatch("GetAllSocialNewAction", {
        countPost: count,
        EndTimeLoading,
      });
    } else if (route.name == "PrivateView") {
      context.dispatch("GetShowDetailUserAction", {
        idUser: route.params.idUser,
        count: count,
      });
    } else {
      useSocialGroup().GetAllPostGroupAction({
        id: route.params.idGroup,
        count: count,
        EndTimeLoading,
      });
    }
  },
  async EditPostSocialAction(
    context,
    { data, toast, route, store, count, EndTimeLoading }
  ) {
    EditPostSocialApi(data)
      .then((res) => {
        if (res.data.status == "failed") {
          toast.error(res.data.messages);
        } else {
          if (route.name == "Social") {
            context.dispatch("GetAllSocialNewAction", {
              countPost: count,
              EndTimeLoading,
            });
          } else if (route.name == "PrivateView") {
            context.dispatch("GetShowDetailUserAction", {
              idUser: route.params.idUser,
              count: count,
            });
          } else if (route.name == "Chi tiết bài viết") {
            store.dispatch("SocialNew/ShowDetailPostAction", {
              id: route.params.idPost,
              EndTimeLoading,
            });
          } else {
            useSocialGroup().GetAllPostGroupAction({
              id: route.params.idGroup,
              count: count,
              EndTimeLoading,
            });
          }
          toast.success("Cập nhật thành công");
        }
      })
      .catch((err) => {
        if (err.response.data?.error) toast.error("That bai");
      });
  },
  async DeleteNewPostAction(context, { dataID, route, count, EndTimeLoading }) {
    DeleteNewPostApi(dataID)
      .then(() => {
        if (route.name == "Social") {
          context.dispatch("GetAllSocialNewAction", {
            countPost: count,
            EndTimeLoading,
          });
        } else if (route.name == "PrivateView") {
          context.dispatch("GetShowDetailUserAction", {
            idUser: route.params.idUser,
            count: count,
          });
        } else {
          useSocialGroup().GetAllPostGroupAction({
            id: route.params.idGroup,
            count: count,
            EndTimeLoading,
          });
        }
      })
      .catch((err) => {
        if (err.response.data?.error) alert.error("That bai");
      });
  },
  async ReactionPostAction(
    context,
    { data, route, store, count, EndTimeLoading }
  ) {
    ReactionPostApi(data)
      .then(() => {
        if (route.name == "Social") {
          context.dispatch("GetAllSocialNewAction", {
            countPost: count,
            EndTimeLoading,
          });
        } else if (route.name == "PrivateView") {
          context.dispatch("GetShowDetailUserAction", {
            idUser: route.params.idUser,
            count: count,
          });
        } else if (route.name == "Chi tiết bài viết") {
          store.dispatch("SocialNew/ShowDetailPostAction", {
            id: route.params.idPost,
            EndTimeLoading,
          });
        } else {
          useSocialGroup().GetAllPostGroupAction({
            id: route.params.idGroup,
            count: count,
            EndTimeLoading,
          });
        }
      })
      .catch((err) => {
        if (err.response.data?.error) alert("That bai");
      });
  },
  async CreateCommentSocialAction(
    context,
    { data, toast, route, store, count, EndTimeLoading }
  ) {
    CreateCommentSocialApi(data)
      .then((res) => {
        if (res.data.status == "failed") {
          toast.error(res.data.messages);
        } else {
          if (route.name == "Social") {
            context.dispatch("GetAllSocialNewAction", {
              countPost: count,
              EndTimeLoading,
            });
          } else if (route.name == "PrivateView") {
            context.dispatch("GetShowDetailUserAction", {
              idUser: route.params.idUser,
              count: count,
            });
          } else if (route.name == "Chi tiết bài viết") {
            store.dispatch("SocialNew/ShowDetailPostAction", {
              id: route.params.idPost,
              EndTimeLoading,
            });
          } else {
            useSocialGroup().GetAllPostGroupAction({
              id: route.params.idGroup,
              count: count,
              EndTimeLoading,
            });
          }
        }
      })
      .catch((err) => {
        if (err.response.data?.error)
          toast.error("Xảy ra lỗi,vui lòng thử lại");
      });
  },
  async EditCommentSocialAction(
    context,
    { data, toast, route, store, count, EndTimeLoading }
  ) {
    EditCommentSocialApi(data)
      .then((res) => {
        if (res.data.status == "failed") {
          toast.error(res.data.messages);
        } else {
          if (route.name == "Social") {
            context.dispatch("GetAllSocialNewAction", {
              countPost: count,
              EndTimeLoading,
            });
          } else if (route.name == "PrivateView") {
            context.dispatch("GetShowDetailUserAction", {
              idUser: route.params.idUser,
              count: count,
            });
          } else if (route.name == "Chi tiết bài viết") {
            store.dispatch("SocialNew/ShowDetailPostAction", {
              id: route.params.idPost,
              EndTimeLoading,
            });
          } else {
            useSocialGroup().GetAllPostGroupAction({
              id: route.params.idGroup,
              count: count,
              EndTimeLoading,
            });
          }
          toast.success("Cập nhật thành công");
        }
      })
      .catch((err) => {
        if (err.response.data?.error)
          toast.error("Xảy ra lỗi,vui lòng thử lại");
      });
  },
  async DeleteCommentAction(
    context,
    { dataID, toast, route, store, count, EndTimeLoading }
  ) {
    DeleteCommentApi(dataID)
      .then((res) => {
        if (res.data.status == "failed") {
          toast.error(res.data.messages);
        } else {
          if (route.name == "Social") {
            context.dispatch("GetAllSocialNewAction", {
              countPost: count,
              EndTimeLoading,
            });
          } else if (route.name == "PrivateView") {
            context.dispatch("GetShowDetailUserAction", {
              idUser: route.params.idUser,
              count: count,
            });
          } else if (route.name == "Chi tiết bài viết") {
            store.dispatch("SocialNew/ShowDetailPostAction", {
              id: route.params.idPost,
              EndTimeLoading,
            });
          } else {
            useSocialGroup().GetAllPostGroupAction({
              id: route.params.idGroup,
              count: count,
              EndTimeLoading,
            });
          }
        }
      })
      .catch((err) => {
        if (err.response.data?.error)
          toast.error("Xảy ra lỗi,vui lòng thử lại");
      });
  },
  async GetAllMobileAction(context, { EndTimeLoading }) {
    GetAllMobileApi()
      .then((payload) => {
        context.commit("GetAllMobileMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async SearchMobileAction(context, { search, EndTimeLoading }) {
    SearchMobileApi(search)
      .then((payload) => {
        context.commit("GetAllMobileMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async ShowDetailPostAction(context, { id, EndTimeLoading }) {
    ShowDetailPostApi(id)
      .then((payload) => {
        context.commit("ShowDetailPostMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => console.log(err));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
