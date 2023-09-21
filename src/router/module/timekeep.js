import requireAuth from "../requireAuth";

const timekeep = [
  {
    path: "/timekeep-attendance-month/month=:month&year=:year",
    name: "Bảng phân ca",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/timekeep/timekeep-attendance-month.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-attendance-shiftregister/month=:month&year=:year",
    name: "Bảng đăng ký ca",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/timekeep/timekeep-attendance-shiftregister.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-attendance",
    name: "Chấm công 2",
    query: { month: ":month", year: ":year" },
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/timekeep/timekeepAttendance/timekeep-attendance-attendance.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-attendance-attendance/month=:month&year=:year",
    name: "Chấm công",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/timekeep/timekeepAttendance/timekeep-attendance-attendance.vue"
      ),
    beforeEnter: requireAuth,
  },

  {
    path: "/timekeep-furlough-furlough/year=:year",
    name: "Quản lý phép năm",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/timekeep/timekeep-furlough/timekeep-furlough-furlough.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-furlough-listMonth/month=:month&year=:year",
    name: "Quản lý phép tháng",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/timekeep/timekeep-furlough/timekeep-furlough-listMonth.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-furlough-compensatory/year=:year",
    name: "Quản lý nghỉ bù năm",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/timekeep/timekeep-furlough/timekeep-furlough-compensatory.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-furlough-compensatory-detail/:idPersonnel",
    name: "Chi tiết nghỉ bù",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/timekeep/timekeep-furlough/timekeep-furlough-compensatory-detail.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-compensatory-listMonth/month=:month&year=:year",
    name: "Quản lý nghỉ bù tháng",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/timekeep/timekeep-furlough/timekeep-compensatory-listMonth.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-attendance-assign/type=:key",
    name: "Phân ca làm việc",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/timekeep/attendance-assign/timekeep-attendance-assign.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-attendance-assign-add",
    name: "Tạo mới phân ca",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/timekeep/attendance-assign/timekeep-attendance-assign-add.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-attendance-assign-edit/:editID",
    name: "Cập nhật phân ca",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/timekeep/attendance-assign/timekeep-attendance-assign-edit.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-attendance-assign-detail/:detailID",
    name: "Chi tiết phân ca",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/timekeep/attendance-assign/timekeep-attendance-assign-detail.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-attendance-desist/holiday",
    name: "Nghỉ lễ",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/timekeep/attendance-desist/timekeep-attendance-desist-holiday.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-attendance-desist/event",
    name: "Nghỉ sự kiện, nghỉ bù",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/timekeep/attendance-desist/timekeep-attendance-desist-event.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-attendance-desist/abnormal",
    name: "Nghỉ bất thường",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/timekeep/attendance-desist/timekeep-attendance-desist-abnormal.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-attendance-desist-add",
    name: "Timekeep Attendance Desist Add",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/timekeep/attendance-desist/timekeep-attendance-desist-add.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-attendance-machine-add",
    name: "Timekeep Attendance Machine Add",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/timekeep/attendance-machine/timekeep-attendance-machine-add.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-attendance-full",
    name: "Chấm công tự động",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/timekeep/timekeep-attendance-full.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-furlough-detail/:idPersonnel",
    name: "Chi tiết nghỉ phép",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/timekeep/timekeep-furlough/timekeep-furlough-detail.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/timekeep-report-report",
    name: "Báo cáo chấm công",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/timekeep/timekeep-report-report.vue"),
    beforeEnter: requireAuth,
  },
  //import nghỉ phép
  {
    path: "/timekeep-furlough-furlough-import",
    name: "import nghỉ phép",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/timekeep/timekeep-furlough/imports/timekeep-furlough-furlough-import.vue"
      ),
    beforeEnter: requireAuth,
  },
  //import phân ca
  {
    path: "/timekeep-attendance-assign-import",
    name: "import nphân ca",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/timekeep/attendance-assign/timekeep-attendance-assign-import.vue"
      ),
    beforeEnter: requireAuth,
  },
];
export default timekeep;
