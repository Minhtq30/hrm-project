import requireAuth from "../requireAuth";

const settingPersonnel = [
  {
    path: "/personnel-profile-settings-general",
    name: "Cài đặt hồ sơ nhân sự",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/settings/personnel/personnel-profile-settings-general.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/personnel-insurance-settings-general",
    name: "Cài đặt bảo hiểm",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/settings/personnel/personnel-insurance-settings-general.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/personnel-profile-settings-position",
    name: "Cài đặt vị trí công việc",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/settings/personnel/personnel-profile-settings-position.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/personnel-profile-position-import",
    name: "PersonnelProfilePositionImport",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/settings/personnel/importData/personnel-profile-position-import.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/personnel-profile-settings-positiontitle",
    name: "Cài đặt chức vụ",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/settings/personnel/personnel-profile-settings-positiontitle.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/personnel-profile-positionTitle-import",
    name: "PersonnelProfilePositionTitleImport",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/settings/personnel/importData/personnel-profile-positionTitle-import.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/personnel-profile-settings-workplace",
    name: "Cài đặt nơi làm việc",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/settings/personnel/personnel-profile-settings-workplace.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/personnel-profile-settings-workplace/import-data",
    name: "Import nơi làm việc",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/settings/personnel/importData/personnel-profile-workplace-import.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/personnel-contract-settings-allowance",
    name: "Cài đặt phụ cấp",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/settings/personnel/personnel-contract-settings-allowance.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/personnel-profile-settings-contract-type",
    name: "Cài đặt hợp đồng",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/settings/personnel/personnel-profile-settings-contract-type.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/personnel-profile-settings-work-type",
    name: "Cài đặt hình thức làm việc",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/settings/personnel/personnel-profile-settings-work-type.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/personnel-profile-settings-salary-range",
    name: "Cài đặt ngạch bậc",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/settings/personnel/personnel-profile-settings-salary-range.vue"
      ),
    beforeEnter: requireAuth,
  },
  // start router category
  {
    path: "/personnel-profile-settings-category-bonus",
    name: "Cài đặt khen thưởng",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/settings/personnel/personnel-profile-settings-category-bonus.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/personnel-profile-settings-category-discipline",
    name: "Cài đặt kỷ luật",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/settings/personnel/personnel-profile-settings-category-discipline.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/personnel-profile-settings-category-quit",
    name: "Cài đặt thôi việc",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/settings/personnel/personnel-profile-settings-category-quit.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/personnel-profile-settings-category-receive",
    name: "Cài đặt tiếp nhận",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/settings/personnel/personnel-profile-settings-category-receive.vue"
      ),
    beforeEnter: requireAuth,
  },
  // end router category
];
export default settingPersonnel;
