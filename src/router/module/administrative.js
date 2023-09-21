import requireAuth from "../requireAuth";

const administrative = [
  {
    path: "/administrative-violation",
    name: "Đơn phạt 5s",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/administrative/AdministrativeView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/administrative-minimap",
    name: "Minimap",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/administrative/AdministrativeMinimap.vue"),
    beforeEnter: requireAuth,
  },
];
export default administrative;
