import { createStore } from "vuex";
// Start Personnel
import places from "./modules/settingPersonnel/places";
import workplace from "./modules/settingPersonnel/workplace";
import allowances from "./modules/settingPersonnel/allowances";
import positiontitles from "./modules/settingPersonnel/positiontitles";
import positions from "./modules/settingPersonnel/positions";
import categories from "./modules/settingPersonnel/categories";
import departments from "./modules/settingPersonnel/departments";
import personnels from "./modules/personnelView/personnels";
import contractTypes from "./modules/settingPersonnel/contractTypes";
import workTypes from "./modules/settingPersonnel/workTypes";
import salaryRange from "./modules/settingPersonnel/salaryRange";
// End personnel
// Start Approval
// End Approval
import users from "./modules/user/users";
import userLogin from "./modules/user/userLogin";
import ForgotPassword from "./modules/user/ForgotPassword"; //Quên mật khẩu
// Start Social
import SocialNew from "./modules/social/SocialNew";
// End Social
// Start timekeep
import timekeepWorkStandard from "./modules/timekeep/timekeepWorkStandard";
// End timekeep
// Start Recruitment
import recruitmentCampaign from "./modules/recruitment/recruitmentCampaign";
import recruitmentRequest from "./modules/recruitment/recruitmentRequest";
import recruitmentInterview from "./modules/recruitment/recruitmentInterview";
import recruitmentCandidate from "./modules/recruitment/recruitmentCandidate";
// End Recruitment
import wages from "./modules/wage/wages";
import constant from "./modules/constant";
// Asset Tuyến
import currencies from "./modules/asset/currencies";
import units from "./modules/asset/units";
import inventories from "./modules/asset/inventories";
import taxs from "./modules/asset/tax";
import inventoryGroups from "./modules/asset/inventoryGroups";
import asset from "./modules/asset/asset";
import assetTypes from "./modules/asset/assetTypes";
import assetGroups from "./modules/asset/assetGroups";
import assetStatus from "./modules/asset/assetStatus";
import assetSupplier from "./modules/asset/assetSupplier";
import assetTicket from "./modules/asset/assetTicket";
import assetOrigins from "./modules/asset/assetOrigins";
const store = createStore({
  modules: {
    places,
    workplace,
    allowances,
    positiontitles,
    positions,
    categories,
    departments,
    personnels,
    contractTypes,
    workTypes,
    salaryRange,
    users,
    SocialNew,
    ForgotPassword,
    recruitmentCampaign,
    recruitmentRequest,
    recruitmentInterview,
    recruitmentCandidate,
    userLogin,
    wages,
    timekeepWorkStandard,
    constant,
    // a tuyen
    currencies,
    units,
    inventories,
    inventoryGroups,
    taxs,
    asset,
    assetTypes,
    assetGroups,
    assetStatus,
    assetTicket,
    assetOrigins,
    assetSupplier,
  },
});
export default store;
