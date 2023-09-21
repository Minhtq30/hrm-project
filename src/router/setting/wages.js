import requireAuth from "../requireAuth";

const settingWage = [
  {
    path: "/settings/wage-settings-type",
    name: "Wage Settings Type",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/settings/wages/WageSettingsType.vue"),
    beforeEnter: requireAuth,
  },
];
export default settingWage;
