import requireAuth from "../requireAuth";

const admin = [
  {
    path: "/page-user/type=:key",
    name: "DS tài khoản người dùng",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/adminPage/pageUser/PageUserView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/user-devices/type=:key",
    name: "Xác thực thiết bị",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/adminPage/pageUser/UserDevices.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/page-user/detail/:idUser",
    name: "Chi tiết tài khoản",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/adminPage/pageUser/PageUserDetail.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/page-user/edit/:idUser",
    name: "Cập nhật tài khoản",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/adminPage/pageUser/EditUser.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/page-department/type=:type",
    name: "Phòng ban",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/adminPage/DepartmentPage.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/page-department/import",
    name: "Import dữ liệu phòng ban",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/adminPage/importData/importDepartment.vue"),
    beforeEnter: requireAuth,
  },
  // Start admin group
  {
    path: "/admin-group",
    name: "DS nhóm người dùng",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/adminPage/AdminGroup.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/admin-group-add",
    name: "Tạo mới nhóm người dùng",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/adminPage/AdminGroupAdd.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/admin-group-detail/:idGroup",
    name: "Chi tiết nhóm người dùng",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/adminPage/AdminGroupDetail.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/admin-group-edit/:id",
    name: "Cập nhật nhóm người dùng",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/adminPage/AdminGroupEdit.vue"),
    beforeEnter: requireAuth,
  },
  // End admin group
];
export default admin;
