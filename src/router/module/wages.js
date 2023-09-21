import requireAuth from "../requireAuth";

const wages = [
  {
    path: "/wage-wage",
    name: "Wage Wage",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/wages/WageView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/wage-template",
    name: "Wage Template",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/wages/WageTemplate.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/wage-template/add",
    name: "Wage Template Add",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/wages/WageTemplateAdd.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/wage-report_tax",
    name: "Wage Report Tax",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/wages/WageReportTax.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/wage-recipe",
    name: "Wage Recipe",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/wages/WageRecipe.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/wage-report-report",
    name: "Wage Report Report",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/wages/WageReportReport.vue"),
    beforeEnter: requireAuth,
  },
];
export default wages;
