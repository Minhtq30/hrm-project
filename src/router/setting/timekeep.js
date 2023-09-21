import requireAuth from "../requireAuth";

const settingTimekeep = [
  {
    path: "/timekeep-setting-shift",
    name: "Danh sách ca làm việc",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/settings/timekeep/TimekeepSettingShift.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-setting-shift/add",
    name: "Tạo mới ca làm việc",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/settings/timekeep/settingShift/AddSettingShift.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-setting-shift/edit=:idShift",
    name: "Cập nhật ca làm việc",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/settings/timekeep/settingShift/EditSettingShift.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-setting-attendance",
    name: "Cài đặt chấm công",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/settings/timekeep/TimekeepSettingAttendance.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-setting-gpslocation",
    name: "TimekeepSettingGpsLocation",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/settings/timekeep/TimekeepSettingGpsLocation.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-setting-compensatory",
    name: "TimekeepSettingCompensatory",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/settings/timekeep/TimekeepSettingCompensatory.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-setting-furlough",
    name: "TimekeepSettingFurlough",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/settings/timekeep/TimekeepSettingFurlough.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeeping-formula",
    name: "Timekeeping Formula",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/settings/timekeep/TimekeepingFormula.vue"),
    beforeEnter: requireAuth,
  },
];
export default settingTimekeep;
