import requireAuth from "../requireAuth";

const approvals = [
  {
    path: "/upload-posm/:posm",
    name: "Upload POSM",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/approvals/approvalType/UploadPOSM.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-posm-view/detail=:idPosm",
    name: "Chi tiết upload POSM",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/approvals/uploadPOSM/PosmDetail.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-posm-edit/:idPosm",
    name: "Cập nhật Posm",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/approvals/uploadPOSM/PosmEdit.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/upload-posm-view/type=:type&menu=:menu",
    name: "Approval Posm View",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/approvals/uploadPOSM/PosmView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-approval-private/type=:key",
    name: "Đơn từ của bạn",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/approvals/approvalTotal/ApprovalView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-approval-all/type=:key",
    name: "Tất cả đơn từ",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/listAllApproval/listAllApproval.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-leave/:leave",
    name: "ApprovalLeave",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/approvals/approvalType/ApprovalLeave.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-absence/:absence",
    name: "ApprovalAbsence",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalType/ApprovalAbsence.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-overtime/:overtime",
    name: "ApprovalOvertime",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalType/ApprovalOvertime.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-inout/:inout",
    name: "ApprovalInout",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/approvals/approvalType/ApprovalInout.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-shiftchange/:shiftchange",
    name: "ApprovalShiftchange",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalType/ApprovalShiftchange.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-shiftmore/:shiftmore",
    name: "ApprovalShiftmore",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalType/ApprovalShiftmore.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-shiftregister/:shiftregister",
    name: "ApprovalShiftregister",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalType/ApprovalShiftregister.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-mission/:mission",
    name: "ApprovalMission",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalType/ApprovalMission.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-worktime/:worktime",
    name: "ApprovalWorktime",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalType/ApprovalWorktime.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-resign/:type",
    name: "ApprovalResign",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalType/ApprovalResign.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-resign-view/detail=:idApproval",
    name: "Chi tiết đơn thôi việc",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalResign/ResignDetail.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-leave-view/type=:type&menu=:menu",
    name: "Approval Leave View",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/approvals/approvalLeave/LeaveView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-leave-edit/:idApproval",
    name: "Approval Leave Edit",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/approvals/approvalLeave/LeaveEdit.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-leave-view/detail=:idApproval",
    name: "Chi tiết đơn xin nghỉ",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/approvals/approvalLeave/LeaveDetail.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-absence-view/type=:type&menu=:menu",
    name: "Approval Absence View",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalAbsence/AbsenceView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-absence-edit/:absenceID",
    name: "Approval Absence Edit",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalAbsence/AbsenceEdit.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-absence-view/detail=:idApproval",
    name: "Chi tiết đơn vắng mặt",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalAbsence/AbsenceDetail.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-overtime-view/type=:type&menu=:menu",
    name: "Approval Overtime View",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalOvertime/OvertimeView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-overtime-edit/:OvertimeID",
    name: "Approval Overtime Edit",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalOvertime/OvertimeEdit.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-overtime-view/detail=:idApproval",
    name: "Chi tiết đơn làm thêm",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalOvertime/OvertimeDetail.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-inout-view/type=:type&menu=:menu",
    name: "Approval Inout View",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalCheckinout/CheckinoutView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-inout-edit/:inoutID",
    name: "Approval Inout Edit",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalCheckinout/CheckinoutEdit.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-inout-view/detail=:idApproval",
    name: "Chi tiết đơn check in/out",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalCheckinout/CheckinoutDetail.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-shiftchange-view/type=:type&menu=:menu",
    name: "Approval Shiftchange View",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalShiftchange/ShiftchangeView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-shiftchange-edit/:shiftchangeID",
    name: "Approval Shiftchange Edit",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalShiftchange/ShiftchangeEdit.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-shiftchange-view/detail=:idApproval",
    name: "Chi tiết đơn đổi ca",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalShiftchange/ShiftchangeDetail.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-shiftmore-view/type=:type&menu=:menu",
    name: "Approval Shiftmore View",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalShiftmore/ShiftmoreView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-shiftmore-edit/:shiftmoreID",
    name: "Approval Shiftmore Edit",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalShiftmore/ShiftmoreEdit.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-shiftmore-view/detail=:idApproval",
    name: "Chi tiết đơn tăng ca",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalShiftmore/ShiftmoreDetail.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-shiftresgister-view/type=:type&menu=:menu",
    name: "Approval Shiftresgister View",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalShiftregister/ShiftregisterView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-shiftresgister-edit/:shiftresgisterID",
    name: "Approval Shiftresgister Edit",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalShiftregister/ShiftregisterEdit.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-shiftresgister-view/detail=:idApproval",
    name: "Chi tiết đơn đăng ký ca",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalShiftregister/ShiftregisterDetail.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-mission-view/type=:type&menu=:menu",
    name: "Approval Mission View",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalMission/MissionView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-mission-edit/:missionID",
    name: "Approval Mission Edit",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalMission/MissionEdit.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-mission-view/detail=:idApproval",
    name: "Chi tiết đơn công tác",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalMission/MissionDetail.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-worktime-view/type=:type&menu=:menu",
    name: "Approval Worktime View",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalWorktime/WorktimeView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-worktime-edit/:worktimeID",
    name: "Approval Worktime Edit",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalWorktime/WorktimeEdit.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-worktime-view/detail=:idApproval",
    name: "Chi tiết đơn làm theo chế độ",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalWorktime/WorktimeDetail.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-resign-view/type=:type&menu=:menu",
    name: "Approval Resign View",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/approvals/approvalResign/ResignView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-resign-edit/:resignID",
    name: "Approval Resign Edit",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/approvals/approvalResign/ResignEdit.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-approval-department/type=:key",
    name: "Đơn từ theo phòng ban",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalDepartment/approvalDepartmentAll.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-approval-approve/type=:key",
    name: "Đơn từ bạn duyệt",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalApprove/approvalApproveApproved.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/approval-approval-created/type=:key",
    name: "Đơn từ bạn tạo hộ",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/approvals/approvalCreated/listApprovalCreated.vue"),
    beforeEnter: requireAuth,
  },
];
export default approvals;
