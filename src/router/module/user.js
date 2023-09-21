import requireAuth from "../requireAuth";

const user = [
  {
    path: "/user",
    name: "Tài khoản",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/user/UserView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/user/profile/:idUser",
    name: "Thông tin cá nhân",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/user/UserProfile.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/user/furlough/:idUser",
    name: "Phép năm cá nhân",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/user/UserFurlough.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/user/compensatory/:idUser",
    name: "Nghỉ bù cá nhân",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/user/UserCompensatory.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/user/history",
    name: "User History",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/user/UserHistory.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/user/attendance/month=:month&year=:year",
    name: "Chấm công cá nhân",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/user/UserAttendance.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/user/salary/:idUser&month=:month&year=:year",
    name: "Bảng lương cá nhân",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/user/UserSalary.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/user-device",
    name: "User Device",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/user/UserDevice.vue"),
    beforeEnter: requireAuth,
  },
];
export default user;
