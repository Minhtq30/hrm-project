import { createRouter, createWebHistory } from "vue-router";
import PageError from "@/views/pageError/PageError.vue";
import recruitments from "./module/recruitments";
import wages from "./module/wages";
import social from "./module/social";
import timekeep from "./module/timekeep";
import approvals from "./module/approvals";
import user from "./module/user";
import settingApproval from "./setting/approvals";
import settingTimekeep from "./setting/timekeep";
import personnels from "./module/personnels";
import settingPersonnel from "./setting/personnels";
import admin from "./module/admin";
import settingRecruitment from "./setting/recruitments";
import settingWage from "./setting/wages";
import requireAuth from "./requireAuth";
import debugRoute from "./module/debug";
import administrative from "./module/administrative";

const LoadRoute = (array) => {
  for (let i = 0; i < array?.length; i++) {
    routes.push(array[i]);
  }
};
const routes = [
  //group-router account
  {
    path: "",
    redirect: { name: "Login" },
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/accounts/LoginView.vue"),
  },
  {
    path: "/reset-password",
    name: "Reset Password",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/views/accounts/LoginResetView.vue"
      ),
  },
  {
    path: "/privacy",
    name: "Chính sách bảo mật",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/views/PrivacyPolicy/PrivacyPolicy.vue"
      ),
  },
  {
    path: "/confirm-email",
    name: "Confirm Email",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/views/accounts/ConfirmEmail.vue"
      ),
  },
  // Start router personnel-profile-setting
  // End router personnel-profile-setting
  {
    path: "/personnel-profile-create",
    name: "Tạo mới nhân sự",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/personnels/CreatePersonnel.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/personnel-profile-edit/:personnelID",
    name: "UpdatePersonnel",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/personnels/UpdatePersonnel.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/personnel-ratting",
    name: "RattingView",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/personnels/RattingView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/setting-menu",
    name: "Cài đặt hệ thống",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/settings/SettingMenu.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/user-manual/timekeep/tab=:key",
    name: "Hướng dẫn sử dụng chấm công",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/settings/UserManual/UserManual.vue"),
    beforeEnter: requireAuth,
  },
  // Start page error
  {
    path: "/page-404",
    name: "PageError",
    meta: {
      layout: "person-layout",
    },
    component: PageError,
  },
  {
    path: "/:catchAll(.*)",
    name: "PageError",
    meta: {
      layout: "person-layout",
    },
    component: PageError,
  },
  // End page error
  // Start admin page

  //Code Dev-03
  //start Page assetList
  {
    path: "/asset",
    name: "Asset",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetList.vue"),
    beforeEnter: requireAuth,
  },
  //end Page assetList
  //start Page assetUsingList
  {
    path: "/asset-using",
    name: "Asset Using",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/lists/assetUsing.vue"),
    beforeEnter: requireAuth,
  },
  //end Page assetUsingList
  //start Page assetUnusedList
  {
    path: "/asset-unused",
    name: "Asset Unused",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/lists/assetUnused.vue"),
    beforeEnter: requireAuth,
  },
  //end Page assetUnusedList
  //start Page assetUnusedList
  {
    path: "/asset-repair",
    name: "Asset Repair",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/lists/assetRepair.vue"),
    beforeEnter: requireAuth,
  },
  //end Page assetUnusedList
  //start Page assetLostList
  {
    path: "/asset-lost",
    name: "Asset Lost",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/lists/assetLost.vue"),
    beforeEnter: requireAuth,
  },
  //end Page assetLostList
  //start Page assetBrokenList
  {
    path: "/asset-broken",
    name: "Asset Broken",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/lists/assetBroken.vue"),
    beforeEnter: requireAuth,
  },
  //end Page assetBrokenList
  //start Page assetTicket
  {
    path: "/asset-ticket",
    name: "Asset Ticket",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetTicket.vue"),
    beforeEnter: requireAuth,
  },
  //start Page assetAssignTicket
  {
    path: "/asset-ticket-assign",
    name: "Asset Ticket Assign",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/lists/assetAssignTicketList.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/asset-ticket-transfer",
    name: "Asset Ticket Transfer",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("../views/assets/lists/assetTransferTicketList.vue"),
    beforeEnter: requireAuth,
  },
  //start Page assetTicket
  {
    path: "/asset-ticket-recall",
    name: "Asset Ticket Recall",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/lists/assetRecallTicketList.vue"),
    beforeEnter: requireAuth,
  },
  //start Page assetTicket
  {
    path: "/asset-ticket-repair",
    name: "Asset Ticket Repair",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/lists/assetRepairTicketList.vue"),
    beforeEnter: requireAuth,
  },
  //start Page asset Lost Ticket
  {
    path: "/asset-ticket-lost",
    name: "Asset Ticket lost",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/lists/assetLostTicketList.vue"),
    beforeEnter: requireAuth,
  },
  //start Page asset Lost Ticket
  {
    path: "/asset-ticket-broken",
    name: "Asset Ticket broken",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/lists/assetBrokenTicketList.vue"),
    beforeEnter: requireAuth,
  },
  //start Page asset destroy Ticket
  {
    path: "/asset-ticket-destroy",
    name: "Asset Ticket Destroy",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/lists/assetDestroyTicketList.vue"),
    beforeEnter: requireAuth,
  },
  //start Page asset liquidated Ticket
  {
    path: "/asset-ticket-liquidated",
    name: "Asset Ticket liquidated",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("../views/assets/lists/assetLiquidatedTicketList.vue"),
    beforeEnter: requireAuth,
  },
  //start Page asset Lost Ticket
  {
    path: "/asset-ticket-reused",
    name: "Asset Ticket Reused",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/lists/assetReusedTicketList.vue"),
    beforeEnter: requireAuth,
  },
  //start Page supplier Lists
  {
    path: "/asset-suppliers",
    name: "Asset Suppliers",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/lists/supplierLists.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/asset-groups",
    name: "Asset Groups",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/categories/assetGroups.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/asset-origins",
    name: "Asset Origins",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/categories/assetOrigins.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/asset-inventories",
    name: "Asset Inventories",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/categories/assetInventories.vue"),
    beforeEnter: requireAuth,
  },
  //start Page assetAdd
  {
    path: "/asset-add",
    name: "Asset Add",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetAdd.vue"),
    beforeEnter: requireAuth,
  },
  //start Page assetUpdate
  {
    path: "/asset-update/:assetId",
    name: "Asset Update",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetUpdate.vue"),
    beforeEnter: requireAuth,
  },
  //start Page assetRecall
  {
    path: "/asset-transfer-add/:assetId",
    name: "Asset Transfer",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetTransferTicketAdd.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/asset-recall-update/:assetId",
    name: "Asset Recall",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetTransferTicketUpdate.vue"),
    beforeEnter: requireAuth,
  },
  //start Page assetRecall
  {
    path: "/asset-recall-add/:assetId",
    name: "Asset Recall",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetRecallTicketAdd.vue"),
    beforeEnter: requireAuth,
  },
  //start Page assetLost
  {
    path: "/asset-lost-add/:assetId",
    name: "Asset Lost Add",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetLostTicketAdd.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/asset-broken-add/:assetId",
    name: "Asset Broken Add",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetBrokenTicketAdd.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/asset-repair-add/:assetId",
    name: "Asset Repair Add",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetRepairTicketAdd.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/asset-destroy-add/:assetId",
    name: "Asset Destroy Add",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetDestroyTicketAdd.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/asset-liquidated-add/:assetId",
    name: "Asset Liquidated Add",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetLiquidatedTicketAdd.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/asset-reused-add/:assetId",
    name: "Asset Reused Add",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetReusedTicketAdd.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/asset-assign-add",
    name: "Asset Assign Add",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetAssignTicketAdd.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/asset-assign-update/:ticketId",
    name: "Asset Assign Update",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetAssignTicketUpdate.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/asset-view/:assetId",
    name: "Asset View",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetView.vue"),
    beforeEnter: requireAuth,
  },
  //end Page assetAssignTicketUpdate
  {
    path: "/asset-recall-update/:ticketId",
    name: "Asset Recall Update",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetRecallTicketUpdate.vue"),
    beforeEnter: requireAuth,
  },
  //end Page assetAssignTicketUpdate
  {
    path: "/asset-repair-update/:ticketId",
    name: "Asset Repair Update",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetRepairTicketUpdate.vue"),
    beforeEnter: requireAuth,
  },
  //end Page assetRepairTicketUpdate
  {
    path: "/asset-lost-update/:ticketId",
    name: "Asset Lost Update",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetLostTicketUpdate.vue"),
    beforeEnter: requireAuth,
  },
  //end Page assetLostTicketUpdate
  {
    path: "/asset-broken-update/:ticketId",
    name: "Asset Broken Update",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetBrokenTicketUpdate.vue"),
    beforeEnter: requireAuth,
  },
  //end Page assetLostTicketUpdate
  {
    path: "/asset-destroy-update/:ticketId",
    name: "Asset Destroy Update",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetDestroyTicketUpdate.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/asset-reused-update/:ticketId",
    name: "Asset Reused Update",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetReusedTicketUpdate.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/asset-liquidated-update/:ticketId",
    name: "Asset Liquidated Update",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetLiquidatedTicketUpdate.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/asset-transfer-update/:ticketId",
    name: "Asset Transfer Update",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetTransferTicketUpdate.vue"),
    beforeEnter: requireAuth,
  },
  //end Page assetLostTicketUpdate
  {
    path: "/asset-addLost",
    name: "Asset AddLost",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetLostTicketAdd.vue"),
    beforeEnter: requireAuth,
  },
  //end Page assetTicket
  {
    path: "/asset-reduction",
    name: "Asset Reduction",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/reduction/reductionByYear.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/asset-import",
    name: "Asset Import",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/assetImport.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/asset-ticket-print/:ticketId",
    name: "Asset Ticket Print",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/print/printTicket.vue"),
    beforeEnter: requireAuth,
  },
  //end Page assetTicket
  {
    path: "/qlts/unit",
    name: "unit",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/unitList.vue"),
    beforeEnter: requireAuth,
  },
  //start Page currency
  {
    path: "/qlts/currency",
    name: "currency",
    meta: {
      layout: "person-layout",
    },
    component: () => import("../views/assets/currencyList.vue"),
    beforeEnter: requireAuth,
  },
  //start page currency
  {
    path: "/asset-settings-category-currency",
    name: "asset-settings-category-currency",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("../views/settings/asset/asset-settings-category-currency.vue"),
    beforeEnter: requireAuth,
  },
  //end page currency
  //start page inventory
  {
    path: "/asset-settings-category-inventory",
    name: "asset-settings-category-inventory",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("../views/settings/asset/asset-settings-category-inventory.vue"),
    beforeEnter: requireAuth,
  },
  //end page inventory
  //start page unit
  {
    path: "/asset-settings-category-unit",
    name: "asset-settings-category-unit",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("../views/settings/asset/asset-settings-category-unit.vue"),
    beforeEnter: requireAuth,
  },
  //end page currency
  //start page inventory-group
  {
    path: "/asset-settings-category-inventory-group",
    name: "/asset-settings-category-inventory-group",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "../views/settings/asset/asset-setting-category-inventory-group.vue"
      ),
    beforeEnter: requireAuth,
  },
  //end page inventory-group
  //start page tax
  {
    path: "/asset-settings-category-tax",
    name: "/asset-settings-category-tax",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("../views/settings/asset/asset-settings-category-tax.vue"),
    beforeEnter: requireAuth,
  },
  //end page tax
  //start page asset-type
  {
    path: "/asset-settings-category-asset-type",
    name: "/asset-settings-category-asset-type",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("../views/settings/asset/asset-settings-category-asset-type.vue"),
    beforeEnter: requireAuth,
  },
  //end page asset-type
  //start page asset-group
  {
    path: "/asset-settings-category-asset-group",
    name: "/asset-settings-category-asset-group",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import("../views/settings/asset/asset-settings-category-asset-group.vue"),
    beforeEnter: requireAuth,
  },
  //start page asset-status
  {
    path: "/asset-settings-category-asset-status",
    name: "/asset-settings-category-asset-status",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "../views/settings/asset/asset-settings-category-asset-status.vue"
      ),
    beforeEnter: requireAuth,
  },
  //end page asset-status

  //start page asset-status
  {
    path: "/asset-settings-category-asset-origin",
    name: "/asset-settings-category-asset-origin",
    meta: {
      layout: "person-layout",
    },
    component: () =>
      import(
        "../views/settings/asset/asset-settings-category-asset-origin.vue"
      ),
    beforeEnter: requireAuth,
  },
  //end page asset-status
  // Start setting email/sms
  {
    path: "/setting-mail",
    name: "Setting Mail",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/settings/emailSMS/SettingMail.vue"),
    beforeEnter: requireAuth,
  },
  // End setting email/sms

  // Start Notices
  {
    path: "/user/notices",
    name: "User Notices",
    meta: {
      layout: "person-layout",
    },
    component: () => import("@/views/notices/NoticesView.vue"),
    beforeEnter: requireAuth,
  },
  // End Notices
  // {
  //   path: "/administrative",
  //   name: "Administrative",
  //   meta: {
  //     layout: "person-layout",
  //   },
  //   component: () => import("@/views/administrative/AdministrativeView.vue"),
  //   beforeEnter: requireAuth,
  // },
];
LoadRoute(personnels);
LoadRoute(social);
LoadRoute(timekeep);
LoadRoute(recruitments);
LoadRoute(approvals);
LoadRoute(wages);
LoadRoute(user);
LoadRoute(admin);
LoadRoute(settingApproval);
LoadRoute(settingTimekeep);
LoadRoute(settingPersonnel);
LoadRoute(settingRecruitment);
LoadRoute(settingWage);
LoadRoute(debugRoute);
LoadRoute(administrative);
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
export default router;
