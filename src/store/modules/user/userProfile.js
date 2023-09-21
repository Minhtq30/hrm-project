import {
  ChangeAvatarApi,
  ChangeBackgroundApi,
  ChangeColorApi,
  ChangePasswordApi,
  GetUserProfileApi,
  ShowDetailUserApi,
  UserAttendanceApi,
  UserCompensatoryApi,
  UserFurloughApi,
} from "@/api/ApiUser/ApiUserProfile";
import { URL_IMG } from "@/constants/ApiUrl";
import { defineStore } from "pinia";
export const useUserProfile = defineStore("UserProfile", {
  state: () => ({
    userProfile: {},
    userID: null,
    userDetail: {},
    contractDetail: {},
    AccountRole: [],
    listPostUser: [],
    personEmail: null,
    avatar: null,
    banners: null,
    UserFurlough: {},
    UserAttendance: [],
    ResultAttendance: {},
    // Nghỉ bù
    UserPersonnel: null,
    UserCompensatoryYears: null,
    UserCompensatoryMonths: null,
    UserCompensatoryHistory: null,
    //Nghỉ phép
    DetailUser: null,
    UserFurloughMonths: null,
    UserFurloughYears: null,
    UserFurloughHistory: null,
  }),
  getters: {},
  actions: {
    setDataUserProfile(payload) {
      this.userProfile = payload.user;
      if (payload.user.avatars == null) {
        this.avatar =
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBggOBwgICAcIBwoGBgUFBg8ICQcKIBEWFiAREx8YKCggGCYlGx8fITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NEA0NDisZHxkrKysrKysrLSsrKysrLS0rKysrKystKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAgEH/8QALRABAAIBAgQEBgIDAQAAAAAAAAECAwQRISIxUgUSMnITM1FigpJCYUFxoiP/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oADAMBAAIRAxEAPwD6+A0yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhz6mmKOM727agmeTasdZiGZl1WXJPCfLHbVDMzM8Zk1ca/wAWndDqJiekxLG3n6y9i1onhMxKaY2RnYtZesx5+aF7Flrkjln8V1HYAAAAAAAAAAAAAAAAOMuSMdJmf8Ah1eo+HG1fXP8AyzpmZmd53l7e03tMz1lylutQAQAAHeO9sdoms7OAGvgzVzU3jr/KqRlabLOLJHbPLZqxMTEbdJalZoAAAAAAAAAAAAAApeI34VrH5LrN18755/qKlIrAMtAAAAAADV0d/Phrv1jlZS/4dO9b/wBLEq4AqAAAAAAAAAAAADN10bZ5/wBVaSj4jT0zH5FIpAMtAAAAAAC/4dG0X/tQamip5MMb9Z5liVOAqAAAAAAAAAAAADjNjjJjmJ/F2AxbRNbTE9YeNHV6b4keakc8eqvcz5iYnjG0pY08AQAAAdUpOS0RWN5kHenxzlyRG3COazWiIiI26Qi0+GMNPun1WStSM0AAAAAAAAAAAAAAAAQZ9NXL05b9yW16V9Voj3OomJjhO8AysumyY54xvHdVFtP0ltOZx0t1rEmLrGexEzPCJlrfAxdkOopWvSsQYaz8WkyXmPNHlr9y9iw0xRyxx7kgSGg5jJSZ2i0ebtdCAAAAAAAAAAAAAOcuSMdJmZ4QBe8UiZtO0KObWWtv8Plr3Ic+a2W07zy/xqiS1cezMzPGZlJi1GTHPCd47bIhFaOPW0n1xNZ+1NXNjmOF6/syBdTGz56d1f2eTmxx1vX9mRvP1knj1NMaV9ZjrHDe0qmXV5L77cte2quGmPd536zunxarJjmN581e2yuIrXxZq5Y5Z49qRj0vOO0TWdphpafNGan0tHqqsqWJgFQAAAAAAAAZuszTkvtE8lVzVZPh4p2njPLVlz1KseAMqAAAAAAAAAAJMOScV4mPyqjAbVLRasTHSXqpoMm9JrM8Y9PtW2oyAAAAAAAApeI29MfkorfiM/8ArX2KiXqwARQAAAAAAAAAAAFnRW8uePu5WkydN8/H72s1EoAIAAAAAAz/ABH50exUW/EfnR7FRL1qACAAAAAAAAAAAACXTfPx+9rMnTfPx+9rNRKACAAAAAAM/wAR+dHsVAS9agAgAAAAAAAAAAAAl03z8fvawNRKACAAP//Z";
      } else {
        this.avatar = URL_IMG + "/" + payload.user.avatars;
      }
      if (payload.user.banners == null) {
        this.banners =
          "https://hanoispiritofplace.com/wp-content/uploads/2018/04/anh-bia-dep-ve-phong-canh-thien-nhien-1.jpg";
      } else {
        this.banners = URL_IMG + "/" + payload.user.banners;
      }
      this.userID = payload.user.personnel_id;
      this.AccountRole = payload.roles;
      var rootStyle = document.documentElement.style;
      rootStyle.setProperty("--color-primary", payload.user.style);
      localStorage.setItem("userID", payload.user.ID);
      localStorage.setItem("personnelID", payload.user.personnel_id);
      localStorage.setItem("dataProfile", payload);
    },
    setDataDetailUser(payload) {
      this.userDetail = payload.data;
      this.img_1 = URL_IMG + "/" + payload.data.private_code_front;
      this.img_2 = URL_IMG + "/" + payload.data.private_code_back;
      this.contractDetail = payload.data.personnel_contracts.find(
        (item) => item.is_last_contract == 1
      );
    },
    LogoutErrorToken() {
      localStorage.removeItem("dataUser");
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("authenticated");
    },
    setColorAction(color) {
      var rootStyle = document.documentElement.style;
      rootStyle.setProperty("--color-primary", color);
    },
    setDataSaveEmail(payload) {
      this.personEmail = payload.personEmail;
    },

    setDataUserFurlough(payload) {
      this.DetailUser = payload.personnel;
      this.UserFurloughMonths = payload.months;
      this.UserFurloughYears = payload.years;
      this.UserFurloughHistory = payload.transactions;
    },
    setDataUserCompensatory(payload) {
      this.UserPersonnel = payload.personnel;
      this.UserCompensatoryYears = payload.years;
      this.UserCompensatoryMonths = payload.months;
      this.UserCompensatoryHistory = payload.transactions;
    },
    setDataUserAttendance(payload) {
      this.UserAttendance = payload?.data[0]?.detail_attendance_month;
      this.ResultAttendance = payload?.data[0]?.result_attendance_month;
    },
    async GetUserProfileAction() {
      const token = localStorage.getItem("TOKEN");
      await GetUserProfileApi(token)
        .then((payload) => {
          if (payload.status == "Token is Invalid") {
            this.LogoutErrorToken();
          } else {
            this.setDataUserProfile(payload);
          }
        })
        .catch((err) => {
          this.LogoutErrorToken();
          console.log(err);
        });
    },
    async ShowDetailUserAction({ id, EndTimeLoading }) {
      await ShowDetailUserApi(id)
        .then((payload) => {
          this.setDataDetailUser(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async ChangeColorAction({ data, toast }) {
      await ChangeColorApi(data).then(() =>
        toast.success("Đổi màu thành công")
      );
    },
    async ChangeAvatarAction({ data, toast, store, route, count }) {
      await ChangeAvatarApi(data).then(() => {
        toast.success("Đổi ảnh đại diện thành công");
        store.dispatch("SocialNew/GetShowDetailUserAction", {
          idUser: route.params.idUser,
          count: count,
        });
        this.GetUserProfileAction();
      });
    },
    async ChangeBackgroundAction({ data, toast, store, route, count }) {
      await ChangeBackgroundApi(data).then(() => {
        toast.success("Đổi ảnh đại diện thành công");
        store.dispatch("SocialNew/GetShowDetailUserAction", {
          idUser: route.params.idUser,
          count: count,
        });
      });
    },
    SaveEmailAction({ data, router }) {
      this.setDataSaveEmail(data);
      router.push("/reset-password");
    },
    async ChangePasswordAction({ data, toast, handleCloseDetail }) {
      await ChangePasswordApi(data).then((payload) => {
        if (payload.data.status == "failed") {
          toast.error("Mật khẩu hiện tại không được trùng với mật khẩu cũ!!");
        } else {
          toast.success("Đổi mật khẩu thành công");
          handleCloseDetail();
        }
      });
    },
    async GetUserFurloughAction({ id, EndTimeLoading }) {
      await UserFurloughApi(id)
        .then((payload) => {
          this.setDataUserFurlough(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async GetUserCompensatoryAction({ id, EndTimeLoading }) {
      await UserCompensatoryApi(id)
        .then((payload) => {
          this.setDataUserCompensatory(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async GetUserAttendanceAction({ data, EndTimeLoading }) {
      await UserAttendanceApi(data)
        .then((payload) => {
          this.setDataUserAttendance(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
  },
});
