import requireAuth from "../requireAuth";

const social = [
  {
    path: "/social",
    name: "Social",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/socials/SocialView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/social/detailID=:idPost",
    name: "Chi tiết bài viết",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/socials/PostDetail.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/social/user/:idUser",
    name: "PrivateView",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/socials/PrivateView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/social/company/:idGroup",
    name: "Social Company",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/socials/socialCompany/SocialCompany.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/social/company/notices/:idGroup",
    name: "Social Company Notices",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/socials/socialCompany/SocialCompanyNotices.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/social/company/members/:idGroup",
    name: "Social Company Member",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/socials/socialCompany/SocialCompanyMembers.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/social/groups",
    name: "Social Groups",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/socials/socialGroup/SocialGroups.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/social/groups/all",
    name: "Social Groups All",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/socials/socialGroup/SocialGroupsAll.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/social/group/groupID=:idGroup",
    name: "Social Groups Detail",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/socials/socialGroup/GroupDetail.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/social/group/notices=:idGroup",
    name: "Social Groups Notices",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/socials/socialGroup/GroupDetailNotices.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/social/group/members=:idGroup",
    name: "Social Groups Members",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/socials/socialGroup/GroupDetailMembers.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/social/birthday",
    name: "Social Birthday",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/socials/SocialBirthday.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/social/mobile",
    name: "Social Mobile",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/socials/SocialMobile.vue"),
    beforeEnter: requireAuth,
  },
];
export default social;
