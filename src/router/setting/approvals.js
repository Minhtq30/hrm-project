import requireAuth from "../requireAuth";

const settingApproval = [
  {
    path: "/approval-setting-leave",
    name: "ApprovalSettingLeave",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/settings/approval/ApprovalSettingLeave.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-approve-setting",
    name: "Cài đặt người duyệt",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/settings/approval/ApprovalApproveSetting.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-approve-setting/create",
    name: "Tạo mới quy trình duyệt",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/settings/approval/ApproveSetting/ApproveSettingCreate.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-approve-setting/detail=:idApprove",
    name: "Chi tiết quy trình duyệt",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/settings/approval/ApproveSetting/ApproveSettingDetail.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-approve-setting/edit=:idApprove",
    name: "Cập nhật quy trình duyệt",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/settings/approval/ApproveSetting/ApproveSettingEdit.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-setting-inout",
    name: "ApprovalSettingInout",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/settings/approval/ApprovalSettingInout.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-setting-worktime",
    name: "ApprovalSettingWorktime",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/settings/approval/ApprovalSettingWorktime.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-setting-absence",
    name: "ApprovalSettingAbsence",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/settings/approval/ApprovalSettingAbsence.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-setting-mission",
    name: "ApprovalSettingMission",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/settings/approval/ApprovalSettingMission.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-setting-resign",
    name: "Cài đặt lý do thôi việc",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/settings/approval/ApprovalSettingResign.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-general-setting",
    name: "Cài đặt chung",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/settings/approval/ApprovalGeneralSetting.vue"),
    beforeEnter: requireAuth,
  },
];
export default settingApproval;
