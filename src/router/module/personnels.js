import requireAuth from "../requireAuth";

const personnels = [
  {
    path: "/personnel/type=:key",
    name: "Nhân sự",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/personnels/PersonnelView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/personnelDetail/:personnelID",
    name: "Chi tiết nhân sự",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/personnels/PersonnelDetail.vue"),
    beforeEnter: requireAuth,
  },
  //import personnel
  {
    path: "/personnel-import",
    name: "PersonnelImport",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/personnels/PersonnelImport.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/contract-personnel/contract_type=:id",
    name: "Hợp đồng",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/contract/ContractView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/update-contract/:contractID",
    name: "Update Contract",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/contract/UpdateContract.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/add-contract/:idPersonnel",
    name: "Tạo mới hợp đồng",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/contract/ContractAdd.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/contract-detail/:idContract",
    name: "Contract Detail",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/contract/ContractDetail.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/contract-import",
    name: "Contract Import",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/contract/ContractImport.vue"),
    beforeEnter: requireAuth,
  },
  // Start insurance
  {
    path: "/personnel-insurance/month=:month&year=:year",
    name: "Bảo hiểm",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/insurance/InsuranceView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/personnel-insurance-increase/month=:month&year=:year",
    name: "Bảo hiểm dự kiến tăng",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/insurance/InsuranceIncrease.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/personnel-insurance-reduced/month=:month&year=:year",
    name: "Bảo hiểm dự kiến giảm",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/insurance/InsuranceReduced.vue"),
    beforeEnter: requireAuth,
  },
  // End insurance
];
export default personnels;
