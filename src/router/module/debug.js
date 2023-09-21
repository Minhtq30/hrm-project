import requireAuth from "../requireAuth";

const debug = [
  {
    path: "/debug/notify",
    name: "Notify",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/debug/PostList.vue"),
    beforeEnter: requireAuth,
  },
];
export default debug;
