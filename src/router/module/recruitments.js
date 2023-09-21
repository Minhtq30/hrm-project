import requireAuth from "../requireAuth";

const recruitments = [
  {
    path: "/candidate-profile/all",
    name: "Candidate Profile All",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("@/views/recruitments/CandidateProfile/CandidateProfileAll.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/candidate-profile/detail/:idCandidate",
    name: "Candidate Profile Detail",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/recruitments/CandidateProfile/CandidateProfileDetail.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/recruitment-candidate/add",
    name: "Tạo mới hồ sơ ứng viên",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/recruitments/CandidateProfile/RecruitmentCandidateAdd.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/recruitment-candidate/edit/:idCandidate",
    name: "Chỉnh sửa hồ sơ ứng viên",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/recruitments/CandidateProfile/RecruitmentCandidateEdit.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/recruitment-campaign/add",
    name: "Tạo mới chiến dịch tuyển dụng",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/recruitments/RecruitmentCampaign/RecruitmentCampaignAdd.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/recruitment-request/add",
    name: "Tạo mới đề xuất tuyển dụng",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/recruitments/RecruitmentRequest/RecruitmentRequestAdd.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/recruitment-request/edit/:idRequest",
    name: "Cập nhật đề xuất tuyển dụng",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/recruitments/RecruitmentRequest/RecruitmentRequestEdit.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/recruitment-campaign/all",
    name: "Recruitment Campaign All",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/recruitments/RecruitmentCampaign/RecruitmentCampaignAll.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/recruitment-campaign/detail/:idCampaign",
    name: "Chi tiết chiến dịch tuyển dụng",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/recruitments/RecruitmentCampaign/RecruitmentCampaignDetail.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/recruitment-campaign/edit/:idCampaign",
    name: "Chỉnh sửa chiến dịch tuyển dụng",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/recruitments/RecruitmentCampaign/RecruitmentCampaignEdit.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/recruitment-request/all",
    name: "Recruitment Request All",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/recruitments/RecruitmentRequest/RecruitmentRequestAll.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/recruitment-request/detail/:idRequest",
    name: "Recruitment Request Detail",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/recruitments/RecruitmentRequest/RecruitmentRequestDetail.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/recruitment-interview/all",
    name: "Recruitment Interview All",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/recruitments/RecruitmentInterview/RecruitmentInterviewAll.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/recruitment-interview/detail/:idInterview",
    name: "Recruitment Interview Detail",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/recruitments/RecruitmentInterview/RecruitmentInterviewDetail.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/recruitment-review-evaluation",
    name: "Recruitment Review Evaluation",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/recruitments/RecruitmentReview/RecruitmentReviewEvaluation.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/recruitment-report-report",
    name: "Recruitment Report Report",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "@/views/recruitments/RecruitmentReport/RecruitmentReportReport.vue"
      ),
    beforeEnter: requireAuth,
  },
];
export default recruitments;
