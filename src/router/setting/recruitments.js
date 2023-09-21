import requireAuth from "../requireAuth";

const settingRecruitment = [
  // Start setting recruitment
  {
    path: "/setting/recruitment-settings-general",
    name: "Recruitment Settings General",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/settings/recruitments/recruitment-settings-general.vue"),
    beforeEnter: requireAuth,
  },
  // End setting recruitment
];
export default settingRecruitment;
