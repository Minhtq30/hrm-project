<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-home></sidebar-home>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false">
        <div class="flex grow">
          <div class="flex items-center">
            <button-create-admin></button-create-admin>
            <div class="text-lg">
              {{ userDetail.fullname }} - {{ userDetail.code }}
            </div>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar>
      <nav-feature> </nav-feature>
    </template>
    <Transition duration="550" name="nested">
      <div class="w-full p-2 text-left" v-if="isLoading == false">
        <h4
          class="form-section-title form-small cursor-pointer"
          @click="isInfor = !isInfor"
        >
          <span v-show="isInfor == true">
            <i class="fas fa-chevron-down cursor-pointer"></i>
          </span>
          <span v-show="isInfor == false"
            ><i class="fas fa-chevron-right cursor-pointer"></i
          ></span>
          Thông tin chung
        </h4>
        <Transition name="slide-up">
          <div v-show="isInfor == true" class="outer">
            <div class="form-small">
              <label for="" class="form-group-label">Mã nhân viên</label>
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  class="disabledInput p-3 w-full"
                  :value="userDetail.code"
                  disabled
                  style="border-radius: 4px"
                />
              </div>
            </div>
            <div class="form-small">
              <label for="" class="form-group-label">Họ tên nhân viên</label>
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  class="disabledInput p-3 w-full"
                  :value="userDetail.fullname"
                  disabled
                  style="border-radius: 4px"
                />
              </div>
            </div>
            <div class="form-small">
              <label for="" class="form-group-label">Phòng ban</label>
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  class="disabledInput p-3 w-full"
                  :value="userDetail.department?.title"
                  disabled
                  style="border-radius: 4px"
                />
              </div>
            </div>
            <div class="form-small">
              <label for="" class="form-group-label">Vị trí</label>
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  class="disabledInput p-3 w-full"
                  :value="userDetail.position?.title"
                  disabled
                  style="border-radius: 4px"
                />
              </div>
            </div>
            <div class="form-small">
              <label for="" class="form-group-label">Tên tài khoản</label>
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control-input"
                  v-model="userDetail.username"
                />
              </div>
            </div>
            <div class="form-small">
              <label for="" class="form-group-label">Trạng thái</label>
              <div>
                <v-select
                  label="title"
                  :options="dataStatus"
                  :reduce="(stt) => stt.value"
                  placeholder="Chọn lý do"
                  v-model="userDetail.status"
                  :searchable="false"
                >
                </v-select>
              </div>
            </div>
            <div class="form-small">
              <label for="" class="form-group-label">Nhóm người dùng</label>
              <div>
                <v-select
                  label="title"
                  :options="listGroupUsers"
                  :reduce="(stt) => stt.ID"
                  placeholder="Chọn nhóm người dùng"
                  v-model="userDetail.group_id"
                >
                </v-select>
              </div>
            </div>
            <div class="mt-[12px]">
              <div class="flex items-center">
                <input
                  id="isAdminGroup"
                  true-value="yes"
                  false-value="no"
                  type="checkbox"
                  value=""
                  class="w-4 h-4"
                  v-model="userDetail.is_admin"
                />
                <label
                  for="isAdminGroup"
                  class="ml-2 text-[12.6px] text-gray-900 cursor-pointer"
                  >Cho phép quản trị hệ thống</label
                >
              </div>
            </div>
            <div class="mt-[12px]">
              <div class="flex items-center">
                <input
                  id="defaultGroup"
                  true-value="no"
                  false-value="yes"
                  type="checkbox"
                  class="w-4 h-4"
                  v-model="userDetail.inherit_roles"
                />
                <label
                  for="defaultGroup"
                  class="ml-2 text-[12.6px] text-gray-900 cursor-pointer"
                  >Tùy chỉnh quyền</label
                >
              </div>
            </div>
            <div title="Chi tiết quyền" class="inner mt-2">
              <table-responsive :header="header" :isShow="false">
                <tr>
                  <td class="cellTable">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL"
                      false-value=""
                      v-model="personnel"
                      @change="personnelOnChange($event)"
                      :disabled="userDetail.inherit_roles == 'yes'"
                    />
                  </td>
                  <td class="cellTable font-medium">NHÂN SỰ</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_PROFILE"
                      false-value=""
                      v-model="personnelProfile"
                      :disabled="
                        !personnel || userDetail.inherit_roles == 'yes'
                      "
                      @change="personnelProfileOnChange($event)"
                    />
                  </td>
                  <td class="cellTable">Hồ sơ nhân sự</td>
                  <td class="cellTable">
                    <select
                      class="form-control-select"
                      v-model="manage"
                      :disabled="
                        !personnel ||
                        !personnelProfile ||
                        userDetail.inherit_roles == 'yes'
                      "
                      v-on:change="onChange($event)"
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option value="PERSONNEL_PROFILE_MANAGE_ALL" selected>
                        Quản lý tất cả
                      </option>
                      <option value="PERSONNEL_PROFILE_MANAGE_COMPANY">
                        Quản lý công ty
                      </option>
                      <option value="PERSONNEL_PROFILE_MANAGE_BRANCH">
                        Quản lý chi nhánh
                      </option>
                      <option value="PERSONNEL_PROFILE_MANAGE_DEPARTMENT">
                        Quản lý phòng ban
                      </option>
                    </select>
                  </td>
                  <td class="cellTable">
                    <div>
                      <select
                        name=""
                        id=""
                        title=""
                        class="form-control-select"
                        v-model="view"
                        :disabled="
                          !personnel ||
                          !personnelProfile ||
                          !disableView ||
                          userDetail.inherit_roles == 'yes'
                        "
                      >
                        <option value="" disabled selected>Chọn quyền</option>
                        <option
                          v-for="(profileView, index) in listView"
                          :key="index"
                          :value="profileView.code"
                          :disabled="profileView.isUsing"
                        >
                          {{ profileView.name }}
                        </option>
                      </select>
                    </div>
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_PROFILE_CREATE"
                      false-value=""
                      v-model="create"
                      :disabled="
                        !personnel ||
                        !personnelProfile ||
                        !disableCheck ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_PROFILE_UPDATE"
                      false-value=""
                      v-model="update"
                      :disabled="
                        !personnel ||
                        !personnelProfile ||
                        !disableCheck ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_PROFILE_DELETE"
                      false-value=""
                      v-model="deleteRole"
                      :disabled="
                        !personnel ||
                        !personnelProfile ||
                        !disableCheck ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_PROFILE_PRINT"
                      false-value=""
                      v-model="print"
                      :disabled="
                        !personnel ||
                        !personnelProfile ||
                        !disableCheck ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_PROFILE_IMPORT"
                      false-value=""
                      v-model="importRole"
                      :disabled="
                        !personnel ||
                        !personnelProfile ||
                        !disableCheck ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_PROFILE_EXPORT"
                      false-value=""
                      v-model="exportRole"
                      :disabled="
                        !personnel ||
                        !personnelProfile ||
                        !disableCheck ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                </tr>
                <tr>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_CONTRACT"
                      false-value=""
                      v-model="personnelContract"
                      :disabled="
                        !personnel || userDetail.inherit_roles == 'yes'
                      "
                      @change="personnelContractOnChange($event)"
                    />
                  </td>
                  <td class="cellTable">Hợp đồng</td>
                  <td class="cellTable">
                    <select
                      name=""
                      id=""
                      title=""
                      class="form-control-select"
                      v-model="manage1"
                      :disabled="
                        !personnel ||
                        !personnelContract ||
                        userDetail.inherit_roles == 'yes'
                      "
                      v-on:change="onChange1($event)"
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option value="PERSONNEL_CONTRACT_MANAGE_ALL">
                        Quản lý tất cả
                      </option>
                      <option value="PERSONNEL_CONTRACT_MANAGE_COMPANY">
                        Quản lý công ty
                      </option>
                      <option value="PERSONNEL_CONTRACT_MANAGE_BRANCH">
                        Quản lý chi nhánh
                      </option>
                      <option value="PERSONNEL_CONTRACT_MANAGE_DEPARTMENT">
                        Quản lý phòng ban
                      </option>
                    </select>
                  </td>
                  <td class="cellTable">
                    <select
                      name=""
                      id=""
                      title=""
                      class="form-control-select"
                      v-model="view1"
                      :disabled="
                        !personnel ||
                        !personnelContract ||
                        !disableView1 ||
                        userDetail.inherit_roles == 'yes'
                      "
                    >
                      <option value="" selected>Chọn quyền</option>
                      <option
                        v-for="(contractView, index) in listView1"
                        :key="index"
                        :value="contractView.code"
                        :disabled="contractView.isUsing"
                      >
                        {{ contractView.name }}
                      </option>
                    </select>
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_CONTRACT_CREATE"
                      false-value=""
                      v-model="create1"
                      :disabled="
                        !personnel ||
                        !personnelContract ||
                        !disableCheck1 ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_CONTRACT_UPDATE"
                      false-value=""
                      v-model="update1"
                      :disabled="
                        !personnel ||
                        !personnelContract ||
                        !disableCheck1 ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_CONTRACT_DELETE"
                      false-value=""
                      v-model="deleteRole1"
                      :disabled="
                        !personnel ||
                        !personnelContract ||
                        !disableCheck1 ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_CONTRACT_PRINT"
                      false-value=""
                      v-model="print1"
                      :disabled="
                        !personnel ||
                        !personnelContract ||
                        !disableCheck1 ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_CONTRACT_IMPORT"
                      false-value=""
                      v-model="importRole1"
                      :disabled="
                        !personnel ||
                        !personnelContract ||
                        !disableCheck1 ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_CONTRACT_EXPORT"
                      false-value=""
                      v-model="exportRole1"
                      :disabled="
                        !personnel ||
                        !personnelContract ||
                        !disableCheck1 ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                </tr>
                <tr>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_INSURANCE"
                      false-value=""
                      v-model="personnelInsurance"
                      :disabled="
                        !personnel || userDetail.inherit_roles == 'yes'
                      "
                      @change="personnelInsuranceOnChange($event)"
                    />
                  </td>
                  <td class="cellTable">Bảo hiểm</td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="manageInsurance"
                      :disabled="
                        !personnel ||
                        !personnelInsurance ||
                        userDetail.inherit_roles == 'yes'
                      "
                      v-on:change="onChangeManageInsurance($event)"
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option value="PERSONNEL_INSURANCE_MANAGE_ALL">
                        Quản lý tất cả
                      </option>
                      <option value="PERSONNEL_INSURANCE_MANAGE_COMPANY">
                        Quản lý công ty
                      </option>
                      <option value="PERSONNEL_INSURANCE_MANAGE_BRANCH">
                        Quản lý chi nhánh
                      </option>
                      <option value="PERSONNEL_INSURANCE_MANAGE_DEPARTMENT">
                        Quản lý phòng ban
                      </option>
                    </select>
                  </td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="viewInsurance"
                      :disabled="
                        !personnel ||
                        !personnelInsurance ||
                        !disableViewInsurance ||
                        userDetail.inherit_roles == 'yes'
                      "
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option
                        v-for="(insuranceView, index) in listInsuranceView"
                        :key="index"
                        :value="insuranceView.code"
                        :disabled="insuranceView.isUsing"
                      >
                        {{ insuranceView.name }}
                      </option>
                    </select>
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_INSURANCE_CREATE"
                      false-value=""
                      v-model="createInsurance"
                      :disabled="
                        !personnel ||
                        !personnelInsurance ||
                        !disableCheckInsurance ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_INSURANCE_UPDATE"
                      false-value=""
                      v-model="updateInsurance"
                      :disabled="
                        !personnel ||
                        !personnelInsurance ||
                        !disableCheckInsurance ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_INSURANCE_DELETE"
                      false-value=""
                      v-model="deleteInsurance"
                      :disabled="
                        !personnel ||
                        !personnelInsurance ||
                        !disableCheckInsurance ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_INSURANCE_PRINT"
                      false-value=""
                      v-model="printInsurance"
                      :disabled="
                        !personnel ||
                        !personnelInsurance ||
                        !disableCheckInsurance ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_INSURANCE_IMPORT"
                      false-value=""
                      v-model="importInsurance"
                      :disabled="
                        !personnel ||
                        !personnelInsurance ||
                        !disableCheckInsurance ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_INSURANCE_EXPORT"
                      false-value=""
                      v-model="exportInsurance"
                      :disabled="
                        !personnel ||
                        !personnelInsurance ||
                        !disableCheckInsurance ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                </tr>
                <tr>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="TIMEKEEP"
                      false-value=""
                      v-model="timekeepCheck"
                      @change="timekeepOnChange($event)"
                      :disabled="userDetail.inherit_roles == 'yes'"
                    />
                  </td>
                  <td class="cellTable font-medium">CHẤM CÔNG</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="TIMEKEEP_TIMEKEEP"
                      false-value=""
                      v-model="timekeep"
                      :disabled="
                        !timekeepCheck || userDetail.inherit_roles == 'yes'
                      "
                      @change="timekeepDetailOnChange($event)"
                    />
                  </td>
                  <td class="cellTable">Chấm công</td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="manageTimekeep"
                      :disabled="
                        !timekeepCheck ||
                        !timekeep ||
                        userDetail.inherit_roles == 'yes'
                      "
                      v-on:change="onChangeManageTimekeep($event)"
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option value="TIMEKEEP_TIMEKEEP_MANAGE_ALL">
                        Quản lý tất cả
                      </option>
                      <option value="TIMEKEEP_TIMEKEEP_MANAGE_COMPANY">
                        Quản lý công ty
                      </option>
                      <option value="TIMEKEEP_TIMEKEEP_MANAGE_BRANCH">
                        Quản lý chi nhánh
                      </option>
                      <option value="TIMEKEEP_TIMEKEEP_MANAGE_DEPARTMENT">
                        Quản lý phòng ban
                      </option>
                    </select>
                  </td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="viewTimekeep"
                      :disabled="
                        !timekeepCheck ||
                        !disableCheckTimekeep ||
                        !disableViewTimekeep ||
                        userDetail.inherit_roles == 'yes'
                      "
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option
                        v-for="(timekeepView, index) in listTimekeepView"
                        :key="index"
                        :value="timekeepView.code"
                        :disabled="timekeepView.isUsing"
                      >
                        {{ timekeepView.name }}
                      </option>
                    </select>
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="TIMEKEEP_TIMEKEEP_CREATE"
                      false-value=""
                      v-model="createTimekeep"
                      :disabled="
                        !timekeepCheck ||
                        !disableViewTimekeep ||
                        !disableCheckTimekeep ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="TIMEKEEP_TIMEKEEP_UPDATE"
                      false-value=""
                      v-model="updateTimekeep"
                      :disabled="
                        !timekeepCheck ||
                        !disableCheckTimekeep ||
                        !disableViewTimekeep ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="TIMEKEEP_TIMEKEEP_DELETE"
                      false-value=""
                      v-model="deleteTimekeep"
                      :disabled="
                        !timekeepCheck ||
                        !disableCheckTimekeep ||
                        !disableViewTimekeep ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="TIMEKEEP_TIMEKEEP_PRINT"
                      false-value=""
                      v-model="printTimekeep"
                      :disabled="
                        !timekeepCheck ||
                        !disableCheckTimekeep ||
                        !disableViewTimekeep ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="TIMEKEEP_TIMEKEEP_IMPORT"
                      false-value=""
                      v-model="importTimekeep"
                      :disabled="
                        !timekeepCheck ||
                        !disableCheckTimekeep ||
                        !disableViewTimekeep ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="TIMEKEEP_TIMEKEEP_EXPORT"
                      false-value=""
                      v-model="exportTimekeep"
                      :disabled="
                        !timekeepCheck ||
                        !disableCheckTimekeep ||
                        !disableViewTimekeep ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                </tr>
                <tr>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT"
                      false-value=""
                      v-model="recruitment"
                      @change="recruitmentOnChange($event)"
                      :disabled="userDetail.inherit_roles == 'yes'"
                    />
                  </td>
                  <td class="cellTable font-medium">TUYỂN DỤNG</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_REQUEST"
                      false-value=""
                      v-model="recruitmentRequest"
                      :disabled="
                        !recruitment || userDetail.inherit_roles == 'yes'
                      "
                      @change="recruitmentRequestOnChange($event)"
                    />
                  </td>
                  <td>Đề xuất tuyển dụng</td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="recruitmentRequestManage"
                      :disabled="
                        !recruitment ||
                        !recruitmentRequest ||
                        userDetail.inherit_roles == 'yes'
                      "
                      v-on:change="onChangeManageRecruitmentRequest($event)"
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option value="RECRUITMENT_REQUEST_MANAGE_ALL">
                        Quản lý tất cả
                      </option>
                      <option value="RECRUITMENT_REQUEST_MANAGE_COMPANY">
                        Quản lý công ty
                      </option>
                      <option value="RECRUITMENT_REQUEST_MANAGE_BRANCH">
                        Quản lý chi nhánh
                      </option>
                      <option value="RECRUITMENT_REQUEST_MANAGE_DEPARTMENT">
                        Quản lý phòng ban
                      </option>
                    </select>
                  </td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="recruitmentRequestView"
                      :disabled="
                        !recruitmentRequest ||
                        !disableCheckRecruitmentRequest ||
                        !disableViewRecruitmentRequest ||
                        userDetail.inherit_roles == 'yes'
                      "
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option
                        v-for="(
                          reRequestView, index
                        ) in recruitmentRequestViewList"
                        :key="index"
                        :value="reRequestView.code"
                        :disabled="reRequestView.isUsing"
                      >
                        {{ reRequestView.name }}
                      </option>
                    </select>
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_REQUEST_CREATE"
                      false-value=""
                      v-model="recruitmentRequestCreate"
                      :disabled="
                        !recruitment ||
                        !disableCheckRecruitmentRequest ||
                        !disableViewRecruitmentRequest ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_REQUEST_UPDATE"
                      false-value=""
                      v-model="recruitmentRequestUpdate"
                      :disabled="
                        !recruitment ||
                        !disableCheckRecruitmentRequest ||
                        !disableViewRecruitmentRequest ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_REQUEST_DELETE"
                      false-value=""
                      v-model="recruitmentRequestDelete"
                      :disabled="
                        !recruitment ||
                        !disableCheckRecruitmentRequest ||
                        !disableViewRecruitmentRequest ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_REQUEST_PRINT"
                      false-value=""
                      v-model="recruitmentRequestPrint"
                      :disabled="
                        !recruitment ||
                        !disableCheckRecruitmentRequest ||
                        !disableViewRecruitmentRequest ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_REQUEST_IMPORT"
                      false-value=""
                      v-model="recruitmentRequestImport"
                      :disabled="
                        !recruitment ||
                        !disableCheckRecruitmentRequest ||
                        !disableViewRecruitmentRequest ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_REQUEST_EXPORT"
                      false-value=""
                      v-model="recruitmentRequestExport"
                      :disabled="
                        !recruitment ||
                        !disableCheckRecruitmentRequest ||
                        !disableViewRecruitmentRequest ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                </tr>
                <tr>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_RECRUITMENT"
                      false-value=""
                      v-model="recruitmentRecruitment"
                      :disabled="
                        !recruitment || userDetail.inherit_roles == 'yes'
                      "
                      @change="recruitmentRecruitmentOnChange($event)"
                    />
                  </td>
                  <td class="cellTable">Tuyển dụng</td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="recruitmentRecruitmentManage"
                      :disabled="
                        !recruitment ||
                        !recruitmentRecruitment ||
                        userDetail.inherit_roles == 'yes'
                      "
                      v-on:change="onChangeManageRecruitmentRecruitment($event)"
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option value="RECRUITMENT_RECRUITMENT_MANAGE_ALL">
                        Quản lý tất cả
                      </option>
                      <option value="RECRUITMENT_RECRUITMENT_MANAGE_COMPANY">
                        Quản lý công ty
                      </option>
                      <option value="RECRUITMENT_RECRUITMENT_MANAGE_BRANCH">
                        Quản lý chi nhánh
                      </option>
                      <option value="RECRUITMENT_RECRUITMENT_MANAGE_DEPARTMENT">
                        Quản lý phòng ban
                      </option>
                    </select>
                  </td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="recruitmentRecruitmentView"
                      :disabled="
                        !recruitmentRecruitment ||
                        !disableCheckRecruitmentRecruitment ||
                        !disableViewRecruitmentRecruitment ||
                        userDetail.inherit_roles == 'yes'
                      "
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option
                        v-for="(
                          reRequestView, index
                        ) in recruitmentRecruitmentViewList"
                        :key="index"
                        :value="reRequestView.code"
                        :disabled="reRequestView.isUsing"
                      >
                        {{ reRequestView.name }}
                      </option>
                    </select>
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_RECRUITMENT_CREATE"
                      false-value=""
                      v-model="recruitmentRecruitmentCreate"
                      :disabled="
                        !recruitment ||
                        !disableCheckRecruitmentRecruitment ||
                        !disableViewRecruitmentRecruitment ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_RECRUITMENT_UPDATE"
                      false-value=""
                      v-model="recruitmentRecruitmentUpdate"
                      :disabled="
                        !recruitment ||
                        !disableCheckRecruitmentRecruitment ||
                        !disableViewRecruitmentRecruitment ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_RECRUITMENT_DELETE"
                      false-value=""
                      v-model="recruitmentRecruitmentDelete"
                      :disabled="
                        !recruitment ||
                        !disableCheckRecruitmentRecruitment ||
                        !disableViewRecruitmentRecruitment ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_RECRUITMENT_PRINT"
                      false-value=""
                      v-model="recruitmentRecruitmentPrint"
                      :disabled="
                        !recruitment ||
                        !disableCheckRecruitmentRecruitment ||
                        !disableViewRecruitmentRecruitment ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_RECRUITMENT_IMPORT"
                      false-value=""
                      v-model="recruitmentRecruitmentImport"
                      :disabled="
                        !recruitment ||
                        !disableCheckRecruitmentRecruitment ||
                        !disableViewRecruitmentRecruitment ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_RECRUITMENT_EXPORT"
                      false-value=""
                      v-model="recruitmentRecruitmentExport"
                      :disabled="
                        !recruitment ||
                        !disableCheckRecruitmentRecruitment ||
                        !disableViewRecruitmentRecruitment ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                </tr>
                <tr>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="ASSET"
                      false-value=""
                      v-model="assetCheck"
                      @change="assetCheckOnChange($event)"
                      :disabled="userDetail.inherit_roles == 'yes'"
                    />
                  </td>
                  <td class="cellTable font-medium">TÀI SẢN</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="ASSET_ASSET"
                      false-value=""
                      v-model="asset"
                      :disabled="
                        !assetCheck || userDetail.inherit_roles == 'yes'
                      "
                      @change="assetOnChange($event)"
                    />
                  </td>
                  <td class="cellTable">Tài sản</td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="assetManage"
                      :disabled="
                        !asset ||
                        !assetCheck ||
                        userDetail.inherit_roles == 'yes'
                      "
                      v-on:change="onChangeManageAsset($event)"
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option value="ASSET_ASSET_MANAGE_ALL">
                        Quản lý tất cả
                      </option>
                      <option value="ASSET_ASSET_MANAGE_COMPANY">
                        Quản lý công ty
                      </option>
                      <option value="ASSET_ASSET_MANAGE_BRANCH">
                        Quản lý chi nhánh
                      </option>
                      <option value="ASSET_ASSET_MANAGE_DEPARTMENT">
                        Quản lý phòng ban
                      </option>
                    </select>
                  </td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="assetView"
                      :disabled="
                        !asset ||
                        !disableCheckAsset ||
                        !disableViewAsset ||
                        userDetail.inherit_roles == 'yes'
                      "
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option
                        v-for="(assetView, index) in assetViewList"
                        :key="index"
                        :value="assetView.code"
                        :disabled="assetView.isUsing"
                      >
                        {{ assetView.name }}
                      </option>
                    </select>
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="ASSET_ASSET_CREATE"
                      false-value=""
                      v-model="assetCreate"
                      :disabled="
                        !asset ||
                        !disableCheckAsset ||
                        !disableViewAsset ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="ASSET_ASSET_UPDATE"
                      false-value=""
                      v-model="assetUpdate"
                      :disabled="
                        !asset ||
                        !disableCheckAsset ||
                        !disableViewAsset ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="ASSET_ASSET_DELETE"
                      false-value=""
                      v-model="assetDelete"
                      :disabled="
                        !asset ||
                        !disableCheckAsset ||
                        !disableViewAsset ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="ASSET_ASSET_PRINT"
                      false-value=""
                      v-model="assetPrint"
                      :disabled="
                        !asset ||
                        !disableCheckAsset ||
                        !disableViewAsset ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="ASSET_ASSET_IMPORT"
                      false-value=""
                      v-model="assetImport"
                      :disabled="
                        !asset ||
                        !disableCheckAsset ||
                        !disableViewAsset ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="ASSET_ASSET_EXPORT"
                      false-value=""
                      v-model="assetExport"
                      :disabled="
                        !asset ||
                        !disableCheckAsset ||
                        !disableViewAsset ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                </tr>
                <tr>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="APPROVAL"
                      false-value=""
                      v-model="approvalCheck"
                      @change="approvalCheckOnChange($event)"
                      :disabled="userDetail.inherit_roles == 'yes'"
                    />
                  </td>
                  <td class="cellTable font-medium">ĐƠN TỪ</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="APPROVAL_APPROVAL"
                      false-value=""
                      v-model="approval"
                      :disabled="
                        !approvalCheck || userDetail.inherit_roles == 'yes'
                      "
                      @change="approvalOnChange($event)"
                    />
                  </td>
                  <td class="cellTable">Đơn từ</td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="approvalManage"
                      :disabled="
                        !approval ||
                        !approvalCheck ||
                        userDetail.inherit_roles == 'yes'
                      "
                      v-on:change="onChangeManageApproval($event)"
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option value="APPROVAL_APPROVAL_MANAGE_ALL">
                        Quản lý tất cả
                      </option>
                      <option value="APPROVAL_APPROVAL_MANAGE_COMPANY">
                        Quản lý công ty
                      </option>
                      <option value="APPROVAL_APPROVAL_MANAGE_BRANCH">
                        Quản lý chi nhánh
                      </option>
                      <option value="APPROVAL_APPROVAL_MANAGE_DEPARTMENT">
                        Quản lý phòng ban
                      </option>
                    </select>
                  </td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="approvalView"
                      :disabled="
                        !approval ||
                        !disableCheckApproval ||
                        !disableViewApproval ||
                        userDetail.inherit_roles == 'yes'
                      "
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option
                        v-for="(approvalView, index) in approvalViewList"
                        :key="index"
                        :value="approvalView.code"
                        :disabled="approvalView.isUsing"
                      >
                        {{ approvalView.name }}
                      </option>
                    </select>
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="APPROVAL_APPROVAL_CREATE"
                      false-value=""
                      v-model="approvalCreate"
                      :disabled="
                        !approval ||
                        !disableCheckApproval ||
                        !disableViewApproval ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="APPROVAL_APPROVAL_UPDATE"
                      false-value=""
                      v-model="approvalUpdate"
                      :disabled="
                        !approval ||
                        !disableCheckApproval ||
                        !disableViewApproval ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="APPROVAL_APPROVAL_DELETE"
                      false-value=""
                      v-model="approvalDelete"
                      :disabled="
                        !approval ||
                        !disableCheckApproval ||
                        !disableViewApproval ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="APPROVAL_APPROVAL_PRINT"
                      false-value=""
                      v-model="approvalPrint"
                      :disabled="
                        !approval ||
                        !disableCheckApproval ||
                        !disableViewApproval ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="APPROVAL_APPROVAL_IMPORT"
                      false-value=""
                      v-model="approvalImport"
                      :disabled="
                        !approval ||
                        !disableCheckApproval ||
                        !disableViewApproval ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="APPROVAL_APPROVAL_EXPORT"
                      false-value=""
                      v-model="approvalExport"
                      :disabled="
                        !approval ||
                        !disableCheckApproval ||
                        !disableViewApproval ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                </tr>
                <tr>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="SOCIAL"
                      false-value=""
                      v-model="socialCheck"
                      @change="socialCheckOnChange($event)"
                      :disabled="userDetail.inherit_roles == 'yes'"
                    />
                  </td>
                  <td class="cellTable font-medium">KẾT NỐI</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="SOCIAL_SOCIAL"
                      false-value=""
                      v-model="social"
                      :disabled="
                        !socialCheck || userDetail.inherit_roles == 'yes'
                      "
                      @change="socialOnChange($event)"
                    />
                  </td>
                  <td class="cellTable">Kết nối</td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="socialManage"
                      :disabled="
                        !social ||
                        !socialCheck ||
                        userDetail.inherit_roles == 'yes'
                      "
                      v-on:change="onChangeManageSocial($event)"
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option value="SOCIAL_SOCIAL_MANAGE_ALL">
                        Quản lý tất cả
                      </option>
                      <option value="SOCIAL_SOCIAL_MANAGE_COMPANY">
                        Quản lý công ty
                      </option>
                      <option value="SOCIAL_SOCIAL_MANAGE_BRANCH">
                        Quản lý chi nhánh
                      </option>
                      <option value="SOCIAL_SOCIAL_MANAGE_DEPARTMENT">
                        Quản lý phòng ban
                      </option>
                    </select>
                  </td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="socialView"
                      :disabled="
                        !social ||
                        !disableCheckSocial ||
                        !disableViewSocial ||
                        userDetail.inherit_roles == 'yes'
                      "
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option
                        v-for="(socialView, index) in socialViewList"
                        :key="index"
                        :value="socialView.code"
                        :disabled="socialView.isUsing"
                      >
                        {{ socialView.name }}
                      </option>
                    </select>
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="SOCIAL_SOCIAL_CREATE"
                      false-value=""
                      v-model="socialCreate"
                      :disabled="
                        !social ||
                        !disableCheckSocial ||
                        !disableViewSocial ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="SOCIAL_SOCIAL_UPDATE"
                      false-value=""
                      v-model="socialUpdate"
                      :disabled="
                        !social ||
                        !disableCheckSocial ||
                        !disableViewSocial ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="SOCIAL_SOCIAL_DELETE"
                      false-value=""
                      v-model="socialDelete"
                      :disabled="
                        !social ||
                        !disableCheckSocial ||
                        !disableViewSocial ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="SOCIAL_SOCIAL_PRINT"
                      false-value=""
                      v-model="socialPrint"
                      :disabled="
                        !social ||
                        !disableCheckSocial ||
                        !disableViewSocial ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="SOCIAL_SOCIAL_IMPORT"
                      false-value=""
                      v-model="socialImport"
                      :disabled="
                        !social ||
                        !disableCheckSocial ||
                        !disableViewSocial ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="SOCIAL_SOCIAL_EXPORT"
                      false-value=""
                      v-model="socialExport"
                      :disabled="
                        !social ||
                        !disableCheckSocial ||
                        !disableViewSocial ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                </tr>
                <tr>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="WAGE"
                      false-value=""
                      v-model="wageCheck"
                      @change="wageCheckOnChange($event)"
                      :disabled="userDetail.inherit_roles == 'yes'"
                    />
                  </td>
                  <td class="cellTable font-medium">BẢNG LƯƠNG</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="WAGE_WAGE"
                      false-value=""
                      v-model="wage"
                      :disabled="
                        !wageCheck || userDetail.inherit_roles == 'yes'
                      "
                      @change="wageOnChange($event)"
                    />
                  </td>
                  <td class="cellTable">Bảng lương</td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="wageManage"
                      :disabled="
                        !wage || !wageCheck || userDetail.inherit_roles == 'yes'
                      "
                      v-on:change="onChangeManageWage($event)"
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option value="WAGE_WAGE_MANAGE_ALL">
                        Quản lý tất cả
                      </option>
                      <option value="WAGE_WAGE_MANAGE_COMPANY">
                        Quản lý công ty
                      </option>
                      <option value="WAGE_WAGE_MANAGE_BRANCH">
                        Quản lý chi nhánh
                      </option>
                      <option value="WAGE_WAGE_MANAGE_DEPARTMENT">
                        Quản lý phòng ban
                      </option>
                    </select>
                  </td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="wageView"
                      :disabled="
                        !wage ||
                        !disableCheckWage ||
                        !disableViewWage ||
                        userDetail.inherit_roles == 'yes'
                      "
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option
                        v-for="(wageView, index) in wageViewList"
                        :key="index"
                        :value="wageView.code"
                        :disabled="wageView.isUsing"
                      >
                        {{ wageView.name }}
                      </option>
                    </select>
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="WAGE_WAGE_CREATE"
                      false-value=""
                      v-model="wageCreate"
                      :disabled="
                        !wage ||
                        !disableCheckWage ||
                        !disableViewWage ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="WAGE_WAGE_UPDATE"
                      false-value=""
                      v-model="wageUpdate"
                      :disabled="
                        !wage ||
                        !disableCheckWage ||
                        !disableViewWage ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="WAGE_WAGE_DELETE"
                      false-value=""
                      v-model="wageDelete"
                      :disabled="
                        !wage ||
                        !disableCheckWage ||
                        !disableViewWage ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="WAGE_WAGE_PRINT"
                      false-value=""
                      v-model="wagePrint"
                      :disabled="
                        !wage ||
                        !disableCheckWage ||
                        !disableViewWage ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="WAGE_WAGE_IMPORT"
                      false-value=""
                      v-model="wageImport"
                      :disabled="
                        !wage ||
                        !disableCheckWage ||
                        !disableViewWage ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="WAGE_WAGE_EXPORT"
                      false-value=""
                      v-model="wageExport"
                      :disabled="
                        !wage ||
                        !disableCheckWage ||
                        !disableViewWage ||
                        userDetail.inherit_roles == 'yes'
                      "
                    />
                  </td>
                </tr>
              </table-responsive>
            </div>
          </div>
        </Transition>
        <div v-show="isInfor == false">
          <div @click="isInfor = !isInfor" class="cursor-pointer text-left">
            Họ và tên, ...
          </div>
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="updateUser()">Cập nhật</button>
          <button class="button-close-modal" @click="this.$router.go(-1)">
            Hủy bỏ
          </button>
        </div>
      </div>
    </template>
  </person-layout>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
  <loading-overlay
    :isLoading="isLoadingShow"
    :handleEndLoading="EndTimeLoadingShow"
  ></loading-overlay>
</template>

<script>
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarHome from "@/components/sidebar/SidebarHome.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateAdmin from "../ButtonCreateAdmin.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import { FormatDate, FormatTitle } from "@/constants/FormatAll";
import { useRoute } from "vue-router";
// import { useToast } from "vue-toastification";
import { useGroupUser } from "@/store/modules/admin/GroupUser";
import { storeToRefs } from "pinia";
export default {
  components: {
    PersonLayout,
    SidebarHome,
    NavbarSocial,
    NavFeature,
    ButtonCreateAdmin,
    TableResponsive,
  },
  data() {
    return {
      isInfor: true,
      dataStatus: [
        {
          value: "ACTIVE",
          title: "Hoạt động",
        },
        {
          value: "BLOCK",
          title: "Khóa tài khoản",
        },
      ],
      header: [
        "",
        "Đối tượng",
        "Quản lý",
        "Xem",
        "Tạo mới",
        "Sửa",
        "Xóa",
        "In",
        "Import",
        "Export",
      ],
      listView: [
        {
          code: "PERSONNEL_PROFILE_VIEW_ALL",
          name: "Xem tất cả",
          isUsing: null,
        },
        {
          code: "PERSONNEL_PROFILE_VIEW_COMPANY",
          name: "Xem công ty",
          isUsing: null,
        },
        {
          code: "PERSONNEL_PROFILE_VIEW_BRANCH",
          name: "Xem chi nhánh",
          isUsing: null,
        },
        {
          code: "PERSONNEL_PROFILE_VIEW_DEPARTMENT",
          name: "Xem phòng ban",
          isUsing: null,
        },
      ],
      listView1: [
        {
          code: "PERSONNEL_CONTRACT_VIEW_ALL",
          name: "Xem tất cả",
          isUsing: null,
        },
        {
          code: "PERSONNEL_CONTRACT_VIEW_COMPANY",
          name: "Xem công ty",
          isUsing: null,
        },
        {
          code: "PERSONNEL_CONTRACT_VIEW_BRANCH",
          name: "Xem chi nhánh",
          isUsing: null,
        },
        {
          code: "PERSONNEL_CONTRACT_VIEW_DEPARTMENT",
          name: "Xem phòng ban",
          isUsing: null,
        },
      ],
      listInsuranceView: [
        {
          code: "PERSONNEL_INSURANCE_VIEW_ALL",
          name: "Xem tất cả",
          isUsing: null,
        },
        {
          code: "PERSONNEL_INSURANCE_VIEW_COMPANY",
          name: "Xem công ty",
          isUsing: null,
        },
        {
          code: "PERSONNEL_INSURANCE_VIEW_BRANCH",
          name: "Xem chi nhánh",
          isUsing: null,
        },
        {
          code: "PERSONNEL_INSURANCE_VIEW_DEPARTMENT",
          name: "Xem phòng ban",
          isUsing: null,
        },
      ],
      listTimekeepView: [
        {
          code: "TIMEKEEP_TIMEKEEP_VIEW_ALL",
          name: "Xem tất cả",
          isUsing: null,
        },
        {
          code: "TIMEKEEP_TIMEKEEP_VIEW_COMPANY",
          name: "Xem công ty",
          isUsing: null,
        },
        {
          code: "TIMEKEEP_TIMEKEEP_VIEW_BRANCH",
          name: "Xem chi nhánh",
          isUsing: null,
        },
        {
          code: "TIMEKEEP_TIMEKEEP_VIEW_DEPARTMENT",
          name: "Xem phòng ban",
          isUsing: null,
        },
      ],
      recruitmentRequestViewList: [
        {
          code: "RECRUITMENT_REQUEST_VIEW_ALL",
          name: "Xem tất cả",
          isUsing: null,
        },
        {
          code: "RECRUITMENT_REQUEST_VIEW_COMPANY",
          name: "Xem công ty",
          isUsing: null,
        },
        {
          code: "RECRUITMENT_REQUEST_VIEW_BRANCH",
          name: "Xem chi nhánh",
          isUsing: null,
        },
        {
          code: "RECRUITMENT_REQUEST_VIEW_DEPARTMENT",
          name: "Xem phòng ban",
          isUsing: null,
        },
      ],
      recruitmentRecruitmentViewList: [
        {
          code: "RECRUITMENT_RECRUITMENT_VIEW_ALL",
          name: "Xem tất cả",
          isUsing: null,
        },
        {
          code: "RECRUITMENT_RECRUITMENT_VIEW_COMPANY",
          name: "Xem công ty",
          isUsing: null,
        },
        {
          code: "RECRUITMENT_RECRUITMENT_VIEW_BRANCH",
          name: "Xem chi nhánh",
          isUsing: null,
        },
        {
          code: "RECRUITMENT_RECRUITMENT_VIEW_DEPARTMENT",
          name: "Xem phòng ban",
          isUsing: null,
        },
      ],
      assetViewList: [
        {
          code: "ASSET_ASSET_VIEW_ALL",
          name: "Xem tất cả",
          isUsing: null,
        },
        {
          code: "ASSET_ASSET_VIEW_COMPANY",
          name: "Xem công ty",
          isUsing: null,
        },
        {
          code: "ASSET_ASSET_VIEW_BRANCH",
          name: "Xem chi nhánh",
          isUsing: null,
        },
        {
          code: "ASSET_ASSET_VIEW_DEPARTMENT",
          name: "Xem phòng ban",
          isUsing: null,
        },
      ],
      approvalViewList: [
        {
          code: "APPROVAL_APPROVAL_VIEW_ALL",
          name: "Xem tất cả",
          isUsing: null,
        },
        {
          code: "APPROVAL_APPROVAL_VIEW_COMPANY",
          name: "Xem công ty",
          isUsing: null,
        },
        {
          code: "APPROVAL_APPROVAL_VIEW_BRANCH",
          name: "Xem chi nhánh",
          isUsing: null,
        },
        {
          code: "APPROVAL_APPROVAL_VIEW_DEPARTMENT",
          name: "Xem phòng ban",
          isUsing: null,
        },
      ],
      socialViewList: [
        {
          code: "SOCIAL_SOCIAL_VIEW_ALL",
          name: "Xem tất cả",
          isUsing: null,
        },
        {
          code: "SOCIAL_SOCIAL_VIEW_COMPANY",
          name: "Xem công ty",
          isUsing: null,
        },
        {
          code: "SOCIAL_SOCIAL_VIEW_BRANCH",
          name: "Xem chi nhánh",
          isUsing: null,
        },
        {
          code: "SOCIAL_SOCIAL_VIEW_DEPARTMENT",
          name: "Xem phòng ban",
          isUsing: null,
        },
      ],
      wageViewList: [
        {
          code: "WAGE_WAGE_VIEW_ALL",
          name: "Xem tất cả",
          isUsing: null,
        },
        {
          code: "WAGE_WAGE_VIEW_COMPANY",
          name: "Xem công ty",
          isUsing: null,
        },
        {
          code: "WAGE_WAGE_VIEW_BRANCH",
          name: "Xem chi nhánh",
          isUsing: null,
        },
        {
          code: "WAGE_WAGE_VIEW_DEPARTMENT",
          name: "Xem phòng ban",
          isUsing: null,
        },
      ],
      manage: "",
      personnel: "",
      personnelProfile: "",
      view: "",
      create: "",
      update: "",
      deleteRole: "",
      print: "",
      importRole: "",
      exportRole: "",
      disableCheck: true,
      disableView: true,
      disableByManage: true,

      manage1: "",
      personnelContract: "",
      view1: "",
      create1: "",
      update1: "",
      deleteRole1: "",
      print1: "",
      importRole1: "",
      exportRole1: "",
      disableCheck1: true,
      disableView1: true,
      disableByManage1: true,

      manageInsurance: "",
      personnelInsurance: "",
      viewInsurance: "",
      createInsurance: "",
      updateInsurance: "",
      deleteInsurance: "",
      printInsurance: "",
      importInsurance: "",
      exportInsurance: "",
      disableCheckInsurance: true,
      disableViewInsurance: true,
      disableByManageInsurance: true,

      //time keep
      timekeep: "",
      timekeepCheck: "",
      manageTimekeep: "",
      viewTimekeep: "",
      createTimekeep: "",
      updateTimekeep: "",
      deleteTimekeep: "",
      printTimekeep: "",
      importTimekeep: "",
      exportTimekeep: "",
      disableCheckTimekeep: true,
      disableViewTimekeep: true,
      disableByManageTimekeep: true,

      //recruitment request
      recruitment: "",
      recruitmentRequest: "",
      recruitmentRequestManage: "",
      recruitmentRequestView: "",
      recruitmentRequestCreate: "",
      recruitmentRequestUpdate: "",
      recruitmentRequestDelete: "",
      recruitmentRequestPrint: "",
      recruitmentRequestImport: "",
      recruitmentRequestExport: "",
      disableCheckRecruitmentRequest: true,
      disableViewRecruitmentRequest: true,
      disableByManageRecruitmentRequest: true,

      //recruitment recruitment
      recruitmentRecruitment: "",
      recruitmentRecruitmentManage: "",
      recruitmentRecruitmentView: "",
      recruitmentRecruitmentCreate: "",
      recruitmentRecruitmentUpdate: "",
      recruitmentRecruitmentDelete: "",
      recruitmentRecruitmentPrint: "",
      recruitmentRecruitmentImport: "",
      recruitmentRecruitmentExport: "",
      disableCheckRecruitmentRecruitment: true,
      disableViewRecruitmentRecruitment: true,
      disableByManageRecruitmentRecruitment: true,

      //ASSET
      assetCheck: "",
      asset: "",
      assetManage: "",
      assetView: "",
      assetCreate: "",
      assetUpdate: "",
      assetDelete: "",
      assetPrint: "",
      assetImport: "",
      assetExport: "",
      disableCheckAsset: true,
      disableViewAsset: true,
      disableByManageAsset: true,

      // APPROVAL
      approvalCheck: "",
      approval: "",
      approvalManage: "",
      approvalView: "",
      approvalCreate: "",
      approvalUpdate: "",
      approvalDelete: "",
      approvalPrint: "",
      approvalImport: "",
      approvalExport: "",
      disableCheckApproval: true,
      disableViewApproval: true,
      disableByManageApproval: true,

      // SOCIAL
      socialCheck: "",
      social: "",
      socialManage: "",
      socialView: "",
      socialCreate: "",
      socialUpdate: "",
      socialDelete: "",
      socialPrint: "",
      socialImport: "",
      socialExport: "",
      disableCheckSocial: true,
      disableViewSocial: true,
      disableByManageSocial: true,

      // WAGE
      wageCheck: "",
      wage: "",
      wageManage: "",
      wageView: "",
      wageCreate: "",
      wageUpdate: "",
      wageDelete: "",
      wagePrint: "",
      wageImport: "",
      wageExport: "",
      disableCheckWage: true,
      disableViewWage: true,
      disableByManageWage: true,
    };
  },
  methods: {
    formatGroup(id) {
      return FormatTitle(id, this.listAdminGroups);
    },
    formatDate(date) {
      return FormatDate(date);
    },
    personnelOnChange(e) {
      this.personnelProfile = "";
      this.personnelContract = "";
      this.personnelInsurance = "";
      this.personnelProfileOnChange(e);
      this.personnelContractOnChange(e);
      this.personnelInsuranceOnChange(e);
    },
    personnelProfileOnChange(e) {
      if (e.target.value) {
        this.manage = "";
        this.view = "";
        this.create = "";
        this.update = "";
        this.deleteRole = "";
        this.print = "";
        this.importRole = "";
        this.exportRole = "";
        // this.disableView = true;
        // this.disableCheck = true;
      }
    },
    personnelContractOnChange(e) {
      if (e.target.value) {
        this.manage1 = "";
        this.view1 = "";
        this.create1 = "";
        this.update1 = "";
        this.deleteRole1 = "";
        this.print1 = "";
        this.importRole1 = "";
        this.exportRole1 = "";
        // this.disableView1 = true;
        // this.disableCheck1 = true;
      }
    },
    personnelInsuranceOnChange(e) {
      if (e.target.value) {
        this.manageInsurance = "";
        this.viewInsurance = "";
        this.createInsurance = "";
        this.updateInsurance = "";
        this.deleteInsurance = "";
        this.printInsurance = "";
        this.importInsurance = "";
        this.exportInsurance = "";
        // this.disableViewInsurance = true;
        // this.disableCheckInsurance = true;
      }
    },
    timekeepOnChange(e) {
      if (e.target.value) {
        this.timekeep = "";
        this.timekeepDetailOnChange(e);
        // this.disableViewTimekeep = true;
        // this.disableCheckTimekeep = true;
      }
    },
    timekeepDetailOnChange(e) {
      if (e.target.value) {
        this.manageTimekeep = "";
        this.viewTimekeep = "";
        this.createTimekeep = "";
        this.updateTimekeep = "";
        this.deleteTimekeep = "";
        this.printTimekeep = "";
        this.importTimekeep = "";
        this.exportTimekeep = "";
        // this.disableViewTimekeep = true;
        // this.disableCheckTimekeep = true;
      }
    },
    recruitmentOnChange(e) {
      this.recruitmentRecruitment = "";
      this.recruitmentRequest = "";
      this.recruitmentRequestOnChange(e);
      this.recruitmentRecruitmentOnChange(e);
    },
    recruitmentRequestOnChange(e) {
      if (e.target.value) {
        this.recruitmentRequestManage = "";
        this.recruitmentRequestView = "";
        this.recruitmentRequestCreate = "";
        this.recruitmentRequestUpdate = "";
        this.recruitmentRequestDelete = "";
        this.recruitmentRequestPrint = "";
        this.recruitmentRequestImport = "";
        this.recruitmentRequestExport = "";
        // this.disableViewTimekeep = true;
        // this.disableCheckTimekeep = true;
      }
    },
    recruitmentRecruitmentOnChange(e) {
      if (e.target.value) {
        this.recruitmentRecruitmentManage = "";
        this.recruitmentRecruitmentView = "";
        this.recruitmentRecruitmentCreate = "";
        this.recruitmentRecruitmentUpdate = "";
        this.recruitmentRecruitmentDelete = "";
        this.recruitmentRecruitmentPrint = "";
        this.recruitmentRecruitmentImport = "";
        this.recruitmentRecruitmentExport = "";
        // this.disableViewTimekeep = true;
        // this.disableCheckTimekeep = true;
      }
    },
    assetCheckOnChange(e) {
      this.asset = "";
      this.assetOnChange(e);
    },
    assetOnChange(e) {
      if (e.target.value) {
        // this.asset = "";
        this.assetManage = "";
        this.assetView = "";
        this.assetCreate = "";
        this.assetUpdate = "";
        this.assetDelete = "";
        this.assetPrint = "";
        this.assetImport = "";
        this.assetExport = "";
        // this.disableViewTimekeep = true;
        // this.disableCheckTimekeep = true;
      }
    },
    approvalCheckOnChange(e) {
      this.approval = "";
      this.approvalOnChange(e);
    },
    approvalOnChange(e) {
      if (e.target.value) {
        // this.asset = "";
        this.approvalManage = "";
        this.approvalView = "";
        this.approvalCreate = "";
        this.approvalUpdate = "";
        this.approvalDelete = "";
        this.approvalPrint = "";
        this.approvalImport = "";
        this.approvalExport = "";
        // this.disableViewTimekeep = true;
        // this.disableCheckTimekeep = true;
      }
    },
    socialCheckOnChange(e) {
      this.social = "";
      this.socialOnChange(e);
    },
    socialOnChange(e) {
      if (e.target.value) {
        // this.asset = "";
        this.socialManage = "";
        this.socialView = "";
        this.socialCreate = "";
        this.socialUpdate = "";
        this.socialDelete = "";
        this.socialPrint = "";
        this.socialImport = "";
        this.socialExport = "";
        // this.disableViewTimekeep = true;
        // this.disableCheckTimekeep = true;
      }
    },
    wageCheckOnChange(e) {
      this.wage = "";
      this.wageOnChange(e);
    },
    wageOnChange(e) {
      if (e.target.value) {
        // this.asset = "";
        this.wageManage = "";
        this.wageView = "";
        this.wageCreate = "";
        this.wageUpdate = "";
        this.wageDelete = "";
        this.wagePrint = "";
        this.wageImport = "";
        this.wageExport = "";
        // this.disableViewTimekeep = true;
        // this.disableCheckTimekeep = true;
      }
    },
    // start on change event
    onChange(event) {
      const s = event.target.value;
      if (s == "PERSONNEL_PROFILE_MANAGE_ALL") {
        this.view = "PERSONNEL_PROFILE_VIEW_ALL";
        this.create = "PERSONNEL_PROFILE_CREATE";
        this.update = "PERSONNEL_PROFILE_UPDATE";
        this.deleteRole = "PERSONNEL_PROFILE_DELETE";
        this.print = "PERSONNEL_PROFILE_PRINT";
        this.importRole = "PERSONNEL_PROFILE_IMPORT";
        this.exportRole = "PERSONNEL_PROFILE_EXPORT";
        this.listView[0].isUsing = null;
        this.listView[1].isUsing = "disabled";
        this.listView[2].isUsing = "disabled";
        this.listView[3].isUsing = "disabled";
        // this.disableCheck = false;
        // this.disableView = false;
      } else if (s == "PERSONNEL_PROFILE_MANAGE_COMPANY") {
        this.view = "";
        this.create = "PERSONNEL_PROFILE_CREATE";
        this.update = "PERSONNEL_PROFILE_UPDATE";
        this.deleteRole = "PERSONNEL_PROFILE_DELETE";
        this.print = "PERSONNEL_PROFILE_PRINT";
        this.importRole = "PERSONNEL_PROFILE_IMPORT";
        this.exportRole = "PERSONNEL_PROFILE_EXPORT";
        // this.disableView = true;
        this.listView[0].isUsing = null;
        this.listView[1].isUsing = null;
        this.listView[2].isUsing = "disabled";
        this.listView[3].isUsing = "disabled";
      } else if (s == "PERSONNEL_PROFILE_MANAGE_BRANCH") {
        this.view = "";
        this.create = "PERSONNEL_PROFILE_CREATE";
        this.update = "PERSONNEL_PROFILE_UPDATE";
        this.deleteRole = "PERSONNEL_PROFILE_DELETE";
        this.print = "PERSONNEL_PROFILE_PRINT";
        this.importRole = "PERSONNEL_PROFILE_IMPORT";
        this.exportRole = "PERSONNEL_PROFILE_EXPORT";
        // this.disableView = true;
        this.listView[0].isUsing = null;
        this.listView[1].isUsing = null;
        this.listView[2].isUsing = null;
        this.listView[3].isUsing = "disabled";
      } else if (s == "PERSONNEL_PROFILE_MANAGE_DEPARTMENT") {
        this.view = "";
        this.create = "PERSONNEL_PROFILE_CREATE";
        this.update = "PERSONNEL_PROFILE_UPDATE";
        this.deleteRole = "PERSONNEL_PROFILE_DELETE";
        this.print = "PERSONNEL_PROFILE_PRINT";
        this.importRole = "PERSONNEL_PROFILE_IMPORT";
        this.exportRole = "PERSONNEL_PROFILE_EXPORT";
        // this.disableView = true;
        this.listView[0].isUsing = null;
        this.listView[1].isUsing = null;
        this.listView[2].isUsing = null;
        this.listView[3].isUsing = null;
      }
    },
    onChange1(event) {
      const s = event.target.value;
      if (s == "PERSONNEL_CONTRACT_MANAGE_ALL") {
        this.view1 = "PERSONNEL_CONTRACT_VIEW_ALL";
        this.create1 = "PERSONNEL_CONTRACT_CREATE";
        this.update1 = "PERSONNEL_CONTRACT_UPDATE";
        this.deleteRole1 = "PERSONNEL_CONTRACT_DELETE";
        this.print1 = "PERSONNEL_CONTRACT_PRINT";
        this.importRole1 = "PERSONNEL_CONTRACT_IMPORT";
        this.exportRole1 = "PERSONNEL_CONTRACT_EXPORT";

        this.listView1[0].isUsing = null;
        this.listView1[1].isUsing = "disabled";
        this.listView1[2].isUsing = "disabled";
        this.listView1[3].isUsing = "disabled";
        // this.disableCheck1 = false;
        // this.disableView1 = false;
      } else if (s == "PERSONNEL_CONTRACT_MANAGE_COMPANY") {
        this.create1 = "PERSONNEL_CONTRACT_CREATE";
        this.update1 = "PERSONNEL_CONTRACT_UPDATE";
        this.deleteRole1 = "PERSONNEL_CONTRACT_DELETE";
        this.print1 = "PERSONNEL_CONTRACT_PRINT";
        this.importRole1 = "PERSONNEL_CONTRACT_IMPORT";
        this.exportRole1 = "PERSONNEL_CONTRACT_EXPORT";
        // this.disableView1 = true;
        this.listView1[0].isUsing = null;
        this.listView1[1].isUsing = null;
        this.listView1[2].isUsing = "disabled";
        this.listView1[3].isUsing = "disabled";
      } else if (s == "PERSONNEL_CONTRACT_MANAGE_BRANCH") {
        this.create1 = "PERSONNEL_CONTRACT_CREATE";
        this.update1 = "PERSONNEL_CONTRACT_UPDATE";
        this.deleteRole1 = "PERSONNEL_CONTRACT_DELETE";
        this.print1 = "PERSONNEL_CONTRACT_PRINT";
        this.importRole1 = "PERSONNEL_CONTRACT_IMPORT";
        this.exportRole1 = "PERSONNEL_CONTRACT_EXPORT";
        // this.disableView1 = true;
        this.listView1[0].isUsing = null;
        this.listView1[1].isUsing = null;
        this.listView1[2].isUsing = null;
        this.listView1[3].isUsing = "disabled";
      } else if (s == "PERSONNEL_CONTRACT_MANAGE_DEPARTMENT") {
        this.create1 = "PERSONNEL_CONTRACT_CREATE";
        this.update1 = "PERSONNEL_CONTRACT_UPDATE";
        this.deleteRole1 = "PERSONNEL_CONTRACT_DELETE";
        this.print1 = "PERSONNEL_CONTRACT_PRINT";
        this.importRole1 = "PERSONNEL_CONTRACT_IMPORT";
        this.exportRole1 = "PERSONNEL_CONTRACT_EXPORT";
        // this.disableView1 = true;
        this.listView1[0].isUsing = null;
        this.listView1[1].isUsing = null;
        this.listView1[2].isUsing = null;
        this.listView1[3].isUsing = null;
      } else if (s == "") {
        this.view1 = "";
        this.create1 = "";
        this.update1 = "";
        this.deleteRole1 = "";
        this.print1 = "";
        this.importRole1 = "";
        this.exportRole1 = "";
        // this.disableView1 = true;
        // this.disableCheck1 = true;
        this.listView1[0].isUsing = null;
        this.listView1[1].isUsing = null;
        this.listView1[2].isUsing = null;
        this.listView1[3].isUsing = null;
      }
    },
    onChangeManageInsurance(e) {
      const s = e.target.value;
      if (s == "PERSONNEL_INSURANCE_MANAGE_ALL") {
        this.viewInsurance = "PERSONNEL_INSURANCE_VIEW_ALL";
        this.createInsurance = "PERSONNEL_INSURANCE_CREATE";
        this.updateInsurance = "PERSONNEL_INSURANCE_UPDATE";
        this.deleteInsurance = "PERSONNEL_INSURANCE_DELETE";
        this.printInsurance = "PERSONNEL_INSURANCE_PRINT";
        this.importInsurance = "PERSONNEL_INSURANCE_IMPORT";
        this.exportInsurance = "PERSONNEL_INSURANCE_EXPORT";

        this.listInsuranceView[0].isUsing = null;
        this.listInsuranceView[1].isUsing = "disabled";
        this.listInsuranceView[2].isUsing = "disabled";
        this.listInsuranceView[3].isUsing = "disabled";
        // this.disableCheckInsurance = false;
        // this.disableViewInsurance = false;
      } else if (s == "PERSONNEL_INSURANCE_MANAGE_COMPANY") {
        this.createInsurance = "PERSONNEL_INSURANCE_CREATE";
        this.updateInsurance = "PERSONNEL_INSURANCE_UPDATE";
        this.deleteInsurance = "PERSONNEL_INSURANCE_DELETE";
        this.printInsurance = "PERSONNEL_INSURANCE_PRINT";
        this.importInsurance = "PERSONNEL_INSURANCE_IMPORT";
        this.exportInsurance = "PERSONNEL_INSURANCE_EXPORT";
        // this.disableViewInsurance = true;
        this.listInsuranceView[0].isUsing = null;
        this.listInsuranceView[1].isUsing = null;
        this.listInsuranceView[2].isUsing = "disabled";
        this.listInsuranceView[3].isUsing = "disabled";
      } else if (s == "PERSONNEL_INSURANCE_MANAGE_BRANCH") {
        this.createInsurance = "PERSONNEL_INSURANCE_CREATE";
        this.updateInsurance = "PERSONNEL_INSURANCE_UPDATE";
        this.deleteInsurance = "PERSONNEL_INSURANCE_DELETE";
        this.printInsurance = "PERSONNEL_INSURANCE_PRINT";
        this.importInsurance = "PERSONNEL_INSURANCE_IMPORT";
        this.exportInsurance = "PERSONNEL_INSURANCE_EXPORT";
        // this.disableViewInsurance = true;
        this.listInsuranceView[0].isUsing = null;
        this.listInsuranceView[1].isUsing = null;
        this.listInsuranceView[2].isUsing = null;
        this.listInsuranceView[3].isUsing = "disabled";
      } else if (s == "PERSONNEL_INSURANCE_MANAGE_DEPARTMENT") {
        this.createInsurance = "PERSONNEL_INSURANCE_CREATE";
        this.updateInsurance = "PERSONNEL_INSURANCE_UPDATE";
        this.deleteInsurance = "PERSONNEL_INSURANCE_DELETE";
        this.printInsurance = "PERSONNEL_INSURANCE_PRINT";
        this.importInsurance = "PERSONNEL_INSURANCE_IMPORT";
        this.exportInsurance = "PERSONNEL_INSURANCE_EXPORT";
        // this.disableViewInsurance = true;
        this.listInsuranceView[0].isUsing = null;
        this.listInsuranceView[1].isUsing = null;
        this.listInsuranceView[2].isUsing = null;
        this.listInsuranceView[3].isUsing = null;
      } else if (s == "") {
        this.viewInsurance = "";
        this.createInsurance = "";
        this.updateInsurance = "";
        this.deleteInsurance = "";
        this.printInsurance = "";
        this.importInsurance = "";
        this.exportInsurance = "";
        // this.disableViewInsurance = true;
        // this.disableCheckInsurance = true;
        this.listInsuranceView[0].isUsing = null;
        this.listInsuranceView[1].isUsing = null;
        this.listInsuranceView[2].isUsing = null;
        this.listInsuranceView[3].isUsing = null;
      }
    },
    onChangeManageTimekeep(e) {
      const s = e.target.value;
      if (s == "TIMEKEEP_TIMEKEEP_MANAGE_ALL") {
        this.viewTimekeep = "TIMEKEEP_TIMEKEEP_VIEW_ALL";
        this.createTimekeep = "TIMEKEEP_TIMEKEEP_CREATE";
        this.updateTimekeep = "TIMEKEEP_TIMEKEEP_UPDATE";
        this.deleteTimekeep = "TIMEKEEP_TIMEKEEP_DELETE";
        this.printTimekeep = "TIMEKEEP_TIMEKEEP_PRINT";
        this.importTimekeep = "TIMEKEEP_TIMEKEEP_IMPORT";
        this.exportTimekeep = "TIMEKEEP_TIMEKEEP_EXPORT";

        this.listTimekeepView[0].isUsing = null;
        this.listTimekeepView[1].isUsing = "disabled";
        this.listTimekeepView[2].isUsing = "disabled";
        this.listTimekeepView[3].isUsing = "disabled";
        // this.disableCheckTimekeep = false;
        // this.disableViewTimekeep = false;
      } else if (s == "TIMEKEEP_TIMEKEEP_MANAGE_COMPANY") {
        this.createTimekeep = "TIMEKEEP_TIMEKEEP_CREATE";
        this.updateTimekeep = "TIMEKEEP_TIMEKEEP_UPDATE";
        this.deleteTimekeep = "TIMEKEEP_TIMEKEEP_DELETE";
        this.printTimekeep = "TIMEKEEP_TIMEKEEP_PRINT";
        this.importTimekeep = "TIMEKEEP_TIMEKEEP_IMPORT";
        this.exportTimekeep = "TIMEKEEP_TIMEKEEP_EXPORT";
        // this.disableViewTimekeep = true;
        this.listTimekeepView[0].isUsing = null;
        this.listTimekeepView[1].isUsing = null;
        this.listTimekeepView[2].isUsing = "disabled";
        this.listTimekeepView[3].isUsing = "disabled";
      } else if (s == "TIMEKEEP_TIMEKEEP_MANAGE_BRANCH") {
        this.createTimekeep = "TIMEKEEP_TIMEKEEP_CREATE";
        this.updateTimekeep = "TIMEKEEP_TIMEKEEP_UPDATE";
        this.deleteTimekeep = "TIMEKEEP_TIMEKEEP_DELETE";
        this.printTimekeep = "TIMEKEEP_TIMEKEEP_PRINT";
        this.importTimekeep = "TIMEKEEP_TIMEKEEP_IMPORT";
        this.exportTimekeep = "TIMEKEEP_TIMEKEEP_EXPORT";
        // this.disableViewTimekeep = true;
        this.listTimekeepView[0].isUsing = null;
        this.listTimekeepView[1].isUsing = null;
        this.listTimekeepView[2].isUsing = null;
        this.listTimekeepView[3].isUsing = "disabled";
      } else if (s == "TIMEKEEP_TIMEKEEP_MANAGE_DEPARTMENT") {
        this.createTimekeep = "TIMEKEEP_TIMEKEEP_CREATE";
        this.updateTimekeep = "TIMEKEEP_TIMEKEEP_UPDATE";
        this.deleteTimekeep = "TIMEKEEP_TIMEKEEP_DELETE";
        this.printTimekeep = "TIMEKEEP_TIMEKEEP_PRINT";
        this.importTimekeep = "TIMEKEEP_TIMEKEEP_IMPORT";
        this.exportTimekeep = "TIMEKEEP_TIMEKEEP_EXPORT";
        // this.disableViewTimekeep = true;
        this.listTimekeepView[0].isUsing = null;
        this.listTimekeepView[1].isUsing = null;
        this.listTimekeepView[2].isUsing = null;
        this.listTimekeepView[3].isUsing = null;
      } else if (s == "") {
        this.viewTimekeep = "";
        this.createTimekeep = "";
        this.updateTimekeep = "";
        this.deleteTimekeep = "";
        this.printTimekeep = "";
        this.importTimekeep = "";
        this.exportTimekeep = "";
        // this.disableViewTimekeep = true;
        // this.disableCheckTimekeep = true;
        this.listTimekeepView[0].isUsing = null;
        this.listTimekeepView[1].isUsing = null;
        this.listTimekeepView[2].isUsing = null;
        this.listTimekeepView[3].isUsing = null;
      }
    },
    onChangeManageRecruitmentRequest(e) {
      const s = e.target.value;
      if (s == "RECRUITMENT_REQUEST_MANAGE_ALL") {
        this.recruitmentRequestView = "RECRUITMENT_REQUEST_VIEW_ALL";
        this.recruitmentRequestCreate = "RECRUITMENT_REQUEST_CREATE";
        this.recruitmentRequestUpdate = "RECRUITMENT_REQUEST_UPDATE";
        this.recruitmentRequestDelete = "RECRUITMENT_REQUEST_DELETE";
        this.recruitmentRequestPrint = "RECRUITMENT_REQUEST_PRINT";
        this.recruitmentRequestImport = "RECRUITMENT_REQUEST_IMPORT";
        this.recruitmentRequestExport = "RECRUITMENT_REQUEST_EXPORT";

        this.recruitmentRequestViewList[0].isUsing = null;
        this.recruitmentRequestViewList[1].isUsing = "disabled";
        this.recruitmentRequestViewList[2].isUsing = "disabled";
        this.recruitmentRequestViewList[3].isUsing = "disabled";
        // this.disableCheckTimekeep = false;
        // this.disableViewTimekeep = false;
      } else if (s == "RECRUITMENT_REQUEST_MANAGE_COMPANY") {
        this.recruitmentRequestCreate = "RECRUITMENT_REQUEST_CREATE";
        this.recruitmentRequestUpdate = "RECRUITMENT_REQUEST_UPDATE";
        this.recruitmentRequestDelete = "RECRUITMENT_REQUEST_DELETE";
        this.recruitmentRequestPrint = "RECRUITMENT_REQUEST_PRINT";
        this.recruitmentRequestImport = "RECRUITMENT_REQUEST_IMPORT";
        this.recruitmentRequestExport = "RECRUITMENT_REQUEST_EXPORT";
        // this.disableViewTimekeep = true;
        this.recruitmentRequestViewList[0].isUsing = null;
        this.recruitmentRequestViewList[1].isUsing = null;
        this.recruitmentRequestViewList[2].isUsing = "disabled";
        this.recruitmentRequestViewList[3].isUsing = "disabled";
      } else if (s == "RECRUITMENT_REQUEST_MANAGE_BRANCH") {
        this.recruitmentRequestCreate = "RECRUITMENT_REQUEST_CREATE";
        this.recruitmentRequestUpdate = "RECRUITMENT_REQUEST_UPDATE";
        this.recruitmentRequestDelete = "RECRUITMENT_REQUEST_DELETE";
        this.recruitmentRequestPrint = "RECRUITMENT_REQUEST_PRINT";
        this.recruitmentRequestImport = "RECRUITMENT_REQUEST_IMPORT";
        this.recruitmentRequestExport = "RECRUITMENT_REQUEST_EXPORT";
        // this.disableViewTimekeep = true;
        this.recruitmentRequestViewList[0].isUsing = null;
        this.recruitmentRequestViewList[1].isUsing = null;
        this.recruitmentRequestViewList[2].isUsing = null;
        this.recruitmentRequestViewList[3].isUsing = "disabled";
      } else if (s == "RECRUITMENT_REQUEST_MANAGE_DEPARTMENT") {
        this.recruitmentRequestCreate = "RECRUITMENT_REQUEST_CREATE";
        this.recruitmentRequestUpdate = "RECRUITMENT_REQUEST_UPDATE";
        this.recruitmentRequestDelete = "RECRUITMENT_REQUEST_DELETE";
        this.recruitmentRequestPrint = "RECRUITMENT_REQUEST_PRINT";
        this.recruitmentRequestImport = "RECRUITMENT_REQUEST_IMPORT";
        this.recruitmentRequestExport = "RECRUITMENT_REQUEST_EXPORT";
        // this.disableViewTimekeep = true;
        this.recruitmentRequestViewList[0].isUsing = null;
        this.recruitmentRequestViewList[1].isUsing = null;
        this.recruitmentRequestViewList[2].isUsing = null;
        this.recruitmentRequestViewList[3].isUsing = null;
      } else if (s == "") {
        this.recruitmentRequestView = "";
        this.recruitmentRequestCreate = "";
        this.recruitmentRequestUpdate = "";
        this.recruitmentRequestDelete = "";
        this.recruitmentRequestPrint = "";
        this.recruitmentRequestImport = "";
        this.recruitmentRequestExport = "";
        // this.disableViewTimekeep = true;
        // this.disableCheckTimekeep = true;
        this.recruitmentRequestViewList[0].isUsing = null;
        this.recruitmentRequestViewList[1].isUsing = null;
        this.recruitmentRequestViewList[2].isUsing = null;
        this.recruitmentRequestViewList[3].isUsing = null;
      }
    },
    onChangeManageRecruitmentRecruitment(e) {
      const s = e.target.value;
      if (s == "RECRUITMENT_RECRUITMENT_MANAGE_ALL") {
        this.recruitmentRecruitmentView = "RECRUITMENT_RECRUITMENT_VIEW_ALL";
        this.recruitmentRecruitmentCreate = "RECRUITMENT_RECRUITMENT_CREATE";
        this.recruitmentRecruitmentUpdate = "RECRUITMENT_RECRUITMENT_UPDATE";
        this.recruitmentRecruitmentDelete = "RECRUITMENT_RECRUITMENT_DELETE";
        this.recruitmentRecruitmentPrint = "RECRUITMENT_RECRUITMENT_PRINT";
        this.recruitmentRecruitmentImport = "RECRUITMENT_RECRUITMENT_IMPORT";
        this.recruitmentRecruitmentExport = "RECRUITMENT_RECRUITMENT_EXPORT";

        this.recruitmentRecruitmentViewList[0].isUsing = null;
        this.recruitmentRecruitmentViewList[1].isUsing = "disabled";
        this.recruitmentRecruitmentViewList[2].isUsing = "disabled";
        this.recruitmentRecruitmentViewList[3].isUsing = "disabled";
        // this.disableCheckTimekeep = false;
        // this.disableViewTimekeep = false;
      } else if (s == "RECRUITMENT_RECRUITMENT_MANAGE_COMPANY") {
        this.recruitmentRecruitmentCreate = "RECRUITMENT_RECRUITMENT_CREATE";
        this.recruitmentRecruitmentUpdate = "RECRUITMENT_RECRUITMENT_UPDATE";
        this.recruitmentRecruitmentDelete = "RECRUITMENT_RECRUITMENT_DELETE";
        this.recruitmentRecruitmentPrint = "RECRUITMENT_RECRUITMENT_PRINT";
        this.recruitmentRecruitmentImport = "RECRUITMENT_RECRUITMENT_IMPORT";
        this.recruitmentRecruitmentExport = "RECRUITMENT_RECRUITMENT_EXPORT";
        // this.disableViewTimekeep = true;
        this.recruitmentRecruitmentViewList[0].isUsing = null;
        this.recruitmentRecruitmentViewList[1].isUsing = null;
        this.recruitmentRecruitmentViewList[2].isUsing = "disabled";
        this.recruitmentRecruitmentViewList[3].isUsing = "disabled";
      } else if (s == "RECRUITMENT_RECRUITMENT_MANAGE_BRANCH") {
        this.recruitmentRecruitmentCreate = "RECRUITMENT_RECRUITMENT_CREATE";
        this.recruitmentRecruitmentUpdate = "RECRUITMENT_RECRUITMENT_UPDATE";
        this.recruitmentRecruitmentDelete = "RECRUITMENT_RECRUITMENT_DELETE";
        this.recruitmentRecruitmentPrint = "RECRUITMENT_RECRUITMENT_PRINT";
        this.recruitmentRecruitmentImport = "RECRUITMENT_RECRUITMENT_IMPORT";
        this.recruitmentRecruitmentExport = "RECRUITMENT_RECRUITMENT_EXPORT";
        // this.disableViewTimekeep = true;
        this.recruitmentRecruitmentViewList[0].isUsing = null;
        this.recruitmentRecruitmentViewList[1].isUsing = null;
        this.recruitmentRecruitmentViewList[2].isUsing = null;
        this.recruitmentRecruitmentViewList[3].isUsing = "disabled";
      } else if (s == "RECRUITMENT_RECRUITMENT_MANAGE_DEPARTMENT") {
        this.recruitmentRecruitmentCreate = "RECRUITMENT_RECRUITMENT_CREATE";
        this.recruitmentRecruitmentUpdate = "RECRUITMENT_RECRUITMENT_UPDATE";
        this.recruitmentRecruitmentDelete = "RECRUITMENT_RECRUITMENT_DELETE";
        this.recruitmentRecruitmentPrint = "RECRUITMENT_RECRUITMENT_PRINT";
        this.recruitmentRecruitmentImport = "RECRUITMENT_RECRUITMENT_IMPORT";
        this.recruitmentRecruitmentExport = "RECRUITMENT_RECRUITMENT_EXPORT";
        // this.disableViewTimekeep = true;
        this.recruitmentRecruitmentViewList[0].isUsing = null;
        this.recruitmentRecruitmentViewList[1].isUsing = null;
        this.recruitmentRecruitmentViewList[2].isUsing = null;
        this.recruitmentRecruitmentViewList[3].isUsing = null;
      } else if (s == "") {
        this.recruitmentRecruitmentView = "";
        this.recruitmentRecruitmentCreate = "";
        this.recruitmentRecruitmentUpdate = "";
        this.recruitmentRecruitmentDelete = "";
        this.recruitmentRecruitmentPrint = "";
        this.recruitmentRecruitmentImport = "";
        this.recruitmentRecruitmentExport = "";
        // this.disableViewTimekeep = true;
        // this.disableCheckTimekeep = true;
        this.recruitmentRecruitmentViewList[0].isUsing = null;
        this.recruitmentRecruitmentViewList[1].isUsing = null;
        this.recruitmentRecruitmentViewList[2].isUsing = null;
        this.recruitmentRecruitmentViewList[3].isUsing = null;
      }
    },

    onChangeManageAsset(e) {
      const s = e.target.value;
      if (s == "ASSET_ASSET_MANAGE_ALL") {
        this.assetView = "ASSET_ASSET_VIEW_ALL";
        this.assetCreate = "ASSET_ASSET_CREATE";
        this.assetUpdate = "ASSET_ASSET_UPDATE";
        this.assetDelete = "ASSET_ASSET_DELETE";
        this.assetPrint = "ASSET_ASSET_PRINT";
        this.assetImport = "ASSET_ASSET_IMPORT";
        this.assetExport = "ASSET_ASSET_EXPORT";

        this.assetViewList[0].isUsing = null;
        this.assetViewList[1].isUsing = "disabled";
        this.assetViewList[2].isUsing = "disabled";
        this.assetViewList[3].isUsing = "disabled";
        // this.disableCheckTimekeep = false;
        // this.disableViewTimekeep = false;
      } else if (s == "ASSET_ASSET_MANAGE_COMPANY") {
        this.assetCreate = "ASSET_ASSET_CREATE";
        this.assetUpdate = "ASSET_ASSET_UPDATE";
        this.assetDelete = "ASSET_ASSET_DELETE";
        this.assetPrint = "ASSET_ASSET_PRINT";
        this.assetImport = "ASSET_ASSET_IMPORT";
        this.assetExport = "ASSET_ASSET_EXPORT";
        // this.disableViewTimekeep = true;
        this.assetViewList[0].isUsing = null;
        this.assetViewList[1].isUsing = null;
        this.assetViewList[2].isUsing = "disabled";
        this.assetViewList[3].isUsing = "disabled";
      } else if (s == "ASSET_ASSET_MANAGE_BRANCH") {
        this.assetCreate = "ASSET_ASSET_CREATE";
        this.assetUpdate = "ASSET_ASSET_UPDATE";
        this.assetDelete = "ASSET_ASSET_DELETE";
        this.assetPrint = "ASSET_ASSET_PRINT";
        this.assetImport = "ASSET_ASSET_IMPORT";
        this.assetExport = "ASSET_ASSET_EXPORT";
        // this.disableViewTimekeep = true;
        this.assetViewList[0].isUsing = null;
        this.assetViewList[1].isUsing = null;
        this.assetViewList[2].isUsing = null;
        this.assetViewList[3].isUsing = "disabled";
      } else if (s == "ASSET_ASSET_MANAGE_DEPARTMENT") {
        this.assetCreate = "ASSET_ASSET_CREATE";
        this.assetUpdate = "ASSET_ASSET_UPDATE";
        this.assetDelete = "ASSET_ASSET_DELETE";
        this.assetPrint = "ASSET_ASSET_PRINT";
        this.assetImport = "ASSET_ASSET_IMPORT";
        this.assetExport = "ASSET_ASSET_EXPORT";
        // this.disableViewTimekeep = true;
        this.assetViewList[0].isUsing = null;
        this.assetViewList[1].isUsing = null;
        this.assetViewList[2].isUsing = null;
        this.assetViewList[3].isUsing = null;
      } else if (s == "") {
        this.assetView = "";
        this.assetCreate = "";
        this.assetUpdate = "";
        this.assetDelete = "";
        this.assetPrint = "";
        this.assetImport = "";
        this.assetExport = "";
        // this.disableViewTimekeep = true;
        // this.disableCheckTimekeep = true;
        this.assetViewList[0].isUsing = null;
        this.assetViewList[1].isUsing = null;
        this.assetViewList[2].isUsing = null;
        this.assetViewList[3].isUsing = null;
      }
    },
    onChangeManageApproval(e) {
      const s = e.target.value;
      if (s == "APPROVAL_APPROVAL_MANAGE_ALL") {
        this.approvalView = "APPROVAL_APPROVAL_VIEW_ALL";
        this.approvalCreate = "APPROVAL_APPROVAL_CREATE";
        this.approvalUpdate = "APPROVAL_APPROVAL_UPDATE";
        this.approvalDelete = "APPROVAL_APPROVAL_DELETE";
        this.approvalPrint = "APPROVAL_APPROVAL_PRINT";
        this.approvalImport = "APPROVAL_APPROVAL_IMPORT";
        this.approvalExport = "APPROVAL_APPROVAL_EXPORT";

        this.approvalViewList[0].isUsing = null;
        this.approvalViewList[1].isUsing = "disabled";
        this.approvalViewList[2].isUsing = "disabled";
        this.approvalViewList[3].isUsing = "disabled";
        // this.disableCheckTimekeep = false;
        // this.disableViewTimekeep = false;
      } else if (s == "APPROVAL_APPROVAL_MANAGE_COMPANY") {
        this.approvalCreate = "APPROVAL_APPROVAL_CREATE";
        this.approvalUpdate = "APPROVAL_APPROVAL_UPDATE";
        this.approvalDelete = "APPROVAL_APPROVAL_DELETE";
        this.approvalPrint = "APPROVAL_APPROVAL_PRINT";
        this.approvalImport = "APPROVAL_APPROVAL_IMPORT";
        this.approvalExport = "APPROVAL_APPROVAL_EXPORT";
        // this.disableViewTimekeep = true;
        this.approvalViewList[0].isUsing = null;
        this.approvalViewList[1].isUsing = null;
        this.approvalViewList[2].isUsing = "disabled";
        this.approvalViewList[3].isUsing = "disabled";
      } else if (s == "APPROVAL_APPROVAL_MANAGE_BRANCH") {
        this.approvalCreate = "APPROVAL_APPROVAL_CREATE";
        this.approvalUpdate = "APPROVAL_APPROVAL_UPDATE";
        this.approvalDelete = "APPROVAL_APPROVAL_DELETE";
        this.approvalPrint = "APPROVAL_APPROVAL_PRINT";
        this.approvalImport = "APPROVAL_APPROVAL_IMPORT";
        this.approvalExport = "APPROVAL_APPROVAL_EXPORT";
        // this.disableViewTimekeep = true;
        this.approvalViewList[0].isUsing = null;
        this.approvalViewList[1].isUsing = null;
        this.approvalViewList[2].isUsing = null;
        this.approvalViewList[3].isUsing = "disabled";
      } else if (s == "APPROVAL_APPROVAL_MANAGE_DEPARTMENT") {
        this.approvalCreate = "APPROVAL_APPROVAL_CREATE";
        this.approvalUpdate = "APPROVAL_APPROVAL_UPDATE";
        this.approvalDelete = "APPROVAL_APPROVAL_DELETE";
        this.approvalPrint = "APPROVAL_APPROVAL_PRINT";
        this.approvalImport = "APPROVAL_APPROVAL_IMPORT";
        this.approvalExport = "APPROVAL_APPROVAL_EXPORT";
        // this.disableViewTimekeep = true;
        this.approvalViewList[0].isUsing = null;
        this.approvalViewList[1].isUsing = null;
        this.approvalViewList[2].isUsing = null;
        this.approvalViewList[3].isUsing = null;
      } else if (s == "") {
        this.approvalView = "";
        this.approvalCreate = "";
        this.approvalUpdate = "";
        this.approvalDelete = "";
        this.approvalPrint = "";
        this.approvalImport = "";
        this.approvalExport = "";
        // this.disableViewTimekeep = true;
        // this.disableCheckTimekeep = true;
        this.approvalViewList[0].isUsing = null;
        this.approvalViewList[1].isUsing = null;
        this.approvalViewList[2].isUsing = null;
        this.approvalViewList[3].isUsing = null;
      }
    },
    onChangeManageSocial(e) {
      const s = e.target.value;
      if (s == "SOCIAL_SOCIAL_MANAGE_ALL") {
        this.socialView = "SOCIAL_SOCIAL_VIEW_ALL";
        this.socialCreate = "SOCIAL_SOCIAL_CREATE";
        this.socialUpdate = "SOCIAL_SOCIAL_UPDATE";
        this.socialDelete = "SOCIAL_SOCIAL_DELETE";
        this.socialPrint = "SOCIAL_SOCIAL_PRINT";
        this.socialImport = "SOCIAL_SOCIAL_IMPORT";
        this.socialExport = "SOCIAL_SOCIAL_EXPORT";

        this.socialViewList[0].isUsing = null;
        this.socialViewList[1].isUsing = "disabled";
        this.socialViewList[2].isUsing = "disabled";
        this.socialViewList[3].isUsing = "disabled";
        // this.disableCheckTimekeep = false;
        // this.disableViewTimekeep = false;
      } else if (s == "SOCIAL_SOCIAL_MANAGE_COMPANY") {
        this.socialCreate = "SOCIAL_SOCIAL_CREATE";
        this.socialUpdate = "SOCIAL_SOCIAL_UPDATE";
        this.socialDelete = "SOCIAL_SOCIAL_DELETE";
        this.socialPrint = "SOCIAL_SOCIAL_PRINT";
        this.socialImport = "SOCIAL_SOCIAL_IMPORT";
        this.socialExport = "SOCIAL_SOCIAL_EXPORT";
        // this.disableViewTimekeep = true;
        this.socialViewList[0].isUsing = null;
        this.socialViewList[1].isUsing = null;
        this.socialViewList[2].isUsing = "disabled";
        this.socialViewList[3].isUsing = "disabled";
      } else if (s == "SOCIAL_SOCIAL_MANAGE_BRANCH") {
        this.socialCreate = "SOCIAL_SOCIAL_CREATE";
        this.socialUpdate = "SOCIAL_SOCIAL_UPDATE";
        this.socialDelete = "SOCIAL_SOCIAL_DELETE";
        this.socialPrint = "SOCIAL_SOCIAL_PRINT";
        this.socialImport = "SOCIAL_SOCIAL_IMPORT";
        this.socialExport = "SOCIAL_SOCIAL_EXPORT";
        // this.disableViewTimekeep = true;
        this.socialViewList[0].isUsing = null;
        this.socialViewList[1].isUsing = null;
        this.socialViewList[2].isUsing = null;
        this.socialViewList[3].isUsing = "disabled";
      } else if (s == "SOCIAL_SOCIAL_MANAGE_DEPARTMENT") {
        this.socialCreate = "SOCIAL_SOCIAL_CREATE";
        this.socialUpdate = "SOCIAL_SOCIAL_UPDATE";
        this.socialDelete = "SOCIAL_SOCIAL_DELETE";
        this.socialPrint = "SOCIAL_SOCIAL_PRINT";
        this.socialImport = "SOCIAL_SOCIAL_IMPORT";
        this.socialExport = "SOCIAL_SOCIAL_EXPORT";
        // this.socialiewTimekeep = true;
        this.socialViewList[0].isUsing = null;
        this.socialViewList[1].isUsing = null;
        this.socialViewList[2].isUsing = null;
        this.socialViewList[3].isUsing = null;
      } else if (s == "") {
        this.socialView = "";
        this.socialCreate = "";
        this.socialUpdate = "";
        this.socialDelete = "";
        this.socialPrint = "";
        this.socialImport = "";
        this.socialExport = "";
        // this.disableViewTimekeep = true;
        // this.disableCheckTimekeep = true;
        this.socialViewList[0].isUsing = null;
        this.socialViewList[1].isUsing = null;
        this.socialViewList[2].isUsing = null;
        this.socialViewList[3].isUsing = null;
      }
    },
    onChangeManageWage(e) {
      const s = e.target.value;
      if (s == "WAGE_WAGE_MANAGE_ALL") {
        this.wageView = "WAGE_WAGE_VIEW_ALL";
        this.wageCreate = "WAGE_WAGE_CREATE";
        this.wageUpdate = "WAGE_WAGE_UPDATE";
        this.wageDelete = "WAGE_WAGE_DELETE";
        this.wagePrint = "WAGE_WAGE_PRINT";
        this.wageImport = "WAGE_WAGE_IMPORT";
        this.wageExport = "WAGE_WAGE_EXPORT";

        this.wageViewList[0].isUsing = null;
        this.wageViewList[1].isUsing = "disabled";
        this.wageViewList[2].isUsing = "disabled";
        this.wageViewList[3].isUsing = "disabled";
        // this.disableCheckTimekeep = false;
        // this.disableViewTimekeep = false;
      } else if (s == "WAGE_WAGE_MANAGE_COMPANY") {
        this.wageCreate = "WAGE_WAGE_CREATE";
        this.wageUpdate = "WAGE_WAGE_UPDATE";
        this.wageDelete = "WAGE_WAGE_DELETE";
        this.wagePrint = "WAGE_WAGE_PRINT";
        this.wageImport = "WAGE_WAGE_IMPORT";
        this.wageExport = "WAGE_WAGE_EXPORT";
        // this.disableViewTimekeep = true;
        this.wageViewList[0].isUsing = null;
        this.wageViewList[1].isUsing = null;
        this.wageViewList[2].isUsing = "disabled";
        this.wageViewList[3].isUsing = "disabled";
      } else if (s == "WAGE_WAGE_MANAGE_BRANCH") {
        this.wageCreate = "WAGE_WAGE_CREATE";
        this.wageUpdate = "WAGE_WAGE_UPDATE";
        this.wageDelete = "WAGE_WAGE_DELETE";
        this.wagePrint = "WAGE_WAGE_PRINT";
        this.wageImport = "WAGE_WAGE_IMPORT";
        this.wageExport = "WAGE_WAGE_EXPORT";
        // this.wageeViewTimekeep = true;
        this.wageViewList[0].isUsing = null;
        this.wageViewList[1].isUsing = null;
        this.wageViewList[2].isUsing = null;
        this.wageViewList[3].isUsing = "disabled";
      } else if (s == "WAGE_WAGE_MANAGE_DEPARTMENT") {
        this.wageCreate = "WAGE_WAGE_CREATE";
        this.wageUpdate = "WAGE_WAGE_UPDATE";
        this.wageDelete = "WAGE_WAGE_DELETE";
        this.wagePrint = "WAGE_WAGE_PRINT";
        this.wageImport = "WAGE_WAGE_IMPORT";
        this.wageExport = "WAGE_WAGE_EXPORT";
        // this.socialiewTimekeep = true;
        this.wageViewList[0].isUsing = null;
        this.wageViewList[1].isUsing = null;
        this.wageViewList[2].isUsing = null;
        this.wageViewList[3].isUsing = null;
      } else if (s == "") {
        this.wageView = "";
        this.wageCreate = "";
        this.wageUpdate = "";
        this.wageDelete = "";
        this.wagePrint = "";
        this.wageImport = "";
        this.wageExport = "";
        // this.disableViewTimekeep = true;
        // this.disableCheckTimekeep = true;
        this.wageViewList[0].isUsing = null;
        this.wageViewList[1].isUsing = null;
        this.wageViewList[2].isUsing = null;
        this.wageViewList[3].isUsing = null;
      }
    },

    //end on change event
    updateUser() {
      const stringRoles = [];
      stringRoles.push(
        this.personnel,
        this.personnelProfile,
        this.manage,
        this.view,
        this.create,
        this.update,
        this.deleteRole,
        this.print,
        this.importRole,
        this.exportRole,
        this.manage1,
        this.personnelContract,
        this.view1,
        this.create1,
        this.update1,
        this.deleteRole1,
        this.print1,
        this.importRole1,
        this.exportRole1,
        this.manageInsurance,
        this.personnelInsurance,
        this.viewInsurance,
        this.createInsurance,
        this.updateInsurance,
        this.deleteInsurance,
        this.printInsurance,
        this.importInsurance,
        this.exportInsurance,
        this.timekeep,
        this.timekeepCheck,
        this.manageTimekeep,
        this.viewTimekeep,
        this.createTimekeep,
        this.updateTimekeep,
        this.deleteTimekeep,
        this.printTimekeep,
        this.importTimekeep,
        this.exportTimekeep,
        //yêu cầu tuyển dụng
        this.recruitment,
        this.recruitmentRequestManage,
        this.recruitmentRequest,
        this.recruitmentRequestView,
        this.recruitmentRequestCreate,
        this.recruitmentRequestUpdate,
        this.recruitmentRequestDelete,
        this.recruitmentRequestPrint,
        this.recruitmentRequestImport,
        this.recruitmentRequestExport,
        // tuyển dụng
        this.recruitmentRecruitmentManage,
        this.recruitmentRecruitment,
        this.recruitmentRecruitmentView,
        this.recruitmentRecruitmentCreate,
        this.recruitmentRecruitmentUpdate,
        this.recruitmentRecruitmentDelete,
        this.recruitmentRecruitmentPrint,
        this.recruitmentRecruitmentImport,
        this.recruitmentRecruitmentExport,
        //asset
        this.assetCheck,
        this.asset,
        this.assetManage,
        this.assetView,
        this.assetCreate,
        this.assetUpdate,
        this.assetDelete,
        this.assetPrint,
        this.assetImport,
        this.assetExport,

        //approval
        this.approvalCheck,
        this.approval,
        this.approvalManage,
        this.approvalView,
        this.approvalCreate,
        this.approvalUpdate,
        this.approvalDelete,
        this.approvalPrint,
        this.approvalImport,
        this.approvalExport,

        // Kết nối
        this.socialCheck,
        this.social,
        this.socialManage,
        this.socialView,
        this.socialCreate,
        this.socialUpdate,
        this.socialDelete,
        this.socialPrint,
        this.socialImport,
        this.socialExport,
        // Bảng lương
        this.wageCheck,
        this.wage,
        this.wageManage,
        this.wageView,
        this.wageCreate,
        this.wageUpdate,
        this.wageDelete,
        this.wagePrint,
        this.wageImport,
        this.wageExport
      );
      //remove item null or ''
      const stringRoles1 = stringRoles.filter((el) => {
        return el != null && el != "";
      });
      const data = {
        id: this.$route.params.idUser,
        data: {
          status: this.userDetail.status,
          username: this.userDetail.username,
          group_id: this.userDetail.group_id,
          is_admin: this.userDetail.is_admin,
          inherit_roles: this.userDetail.inherit_roles,
          string_roles: stringRoles1,
        },
      };
      this.$store.dispatch("users/UpdateUserAction", {
        data,
        toast: this.$toast,
        router: this.$router,
        EndTimeLoading: this.EndTimeLoading,
      });
    },
    getMatchingResults(input) {
      const found = this.dataById.find((element) => element == input);
      if (found == undefined || found == null) {
        return "";
      } else {
        return found;
      }
    },
    getMatchingResults1(input) {
      const inc = this.dataById.find((x) => input.includes(x));
      if (inc == undefined || inc == null) {
        return "";
      } else {
        return inc;
      }
    },
  },
  updated() {
    setTimeout(() => {
      this.personnel = this.getMatchingResults("PERSONNEL");
      this.personnelProfile = this.getMatchingResults("PERSONNEL_PROFILE");
      this.manage = this.getMatchingResults1([
        "PERSONNEL_PROFILE_MANAGE_ALL",
        "PERSONNEL_PROFILE_MANAGE_COMPANY",
        "PERSONNEL_PROFILE_MANAGE_DEPARTMENT",
        "PERSONNEL_PROFILE_MANAGE_BRANCH",
      ]);
      this.view = this.getMatchingResults1([
        "PERSONNEL_PROFILE_VIEW_ALL",
        "PERSONNEL_PROFILE_VIEW_COMPANY",
        "PERSONNEL_PROFILE_VIEW_BRANCH",
        "PERSONNEL_PROFILE_VIEW_DEPARTMENT",
      ]);
      this.create = this.getMatchingResults("PERSONNEL_PROFILE_CREATE");
      this.update = this.getMatchingResults("PERSONNEL_PROFILE_UPDATE");
      this.deleteRole = this.getMatchingResults("PERSONNEL_PROFILE_DELETE");
      this.print = this.getMatchingResults("PERSONNEL_PROFILE_PRINT");
      this.importRole = this.getMatchingResults("PERSONNEL_PROFILE_IMPORT");
      this.exportRole = this.getMatchingResults("PERSONNEL_PROFILE_EXPORT");
      this.manage1 = this.getMatchingResults1([
        "PERSONNEL_CONTRACT_MANAGE_ALL",
        "PERSONNEL_CONTRACT_MANAGE_COMPANY",
        "PERSONNEL_CONTRACT_MANAGE_BRANCH",
        "PERSONNEL_CONTRACT_MANAGE_DEPARTMENT",
      ]);
      this.personnelContract = this.getMatchingResults("PERSONNEL_CONTRACT");
      this.view1 = this.getMatchingResults1([
        "PERSONNEL_CONTRACT_VIEW_ALL",
        "PERSONNEL_CONTRACT_VIEW_COMPANY",
        "PERSONNEL_CONTRACT_VIEW_BRANCH",
        "PERSONNEL_CONTRACT_VIEW_DEPARTMENT",
      ]);
      this.create1 = this.getMatchingResults("PERSONNEL_CONTRACT_CREATE");
      this.update1 = this.getMatchingResults("PERSONNEL_CONTRACT_UPDATE");
      this.deleteRole1 = this.getMatchingResults("PERSONNEL_CONTRACT_DELETE");
      this.print1 = this.getMatchingResults("PERSONNEL_CONTRACT_PRINT");
      this.importRole1 = this.getMatchingResults("PERSONNEL_CONTRACT_IMPORT");
      this.exportRole1 = this.getMatchingResults("PERSONNEL_CONTRACT_EXPORT");
      this.manageInsurance = this.getMatchingResults1([
        "PERSONNEL_INSURANCE_MANAGE_ALL",
        "PERSONNEL_INSURANCE_MANAGE_COMPANY",
        "PERSONNEL_INSURANCE_MANAGE_BRANCH",
        "PERSONNEL_INSURANCE_MANAGE_DEPARTMENT",
      ]);
      this.personnelInsurance = this.getMatchingResults("PERSONNEL_INSURANCE");
      this.viewInsurance = this.getMatchingResults1([
        "PERSONNEL_INSURANCE_VIEW_ALL",
        "PERSONNEL_INSURANCE_VIEW_COMPANY",
        "PERSONNEL_INSURANCE_VIEW_BRANCH",
        "PERSONNEL_INSURANCE_VIEW_DEPARTMENT",
      ]);
      this.createInsurance = this.getMatchingResults(
        "PERSONNEL_INSURANCE_CREATE"
      );
      this.updateInsurance = this.getMatchingResults(
        "PERSONNEL_INSURANCE_UPDATE"
      );
      this.deleteInsurance = this.getMatchingResults(
        "PERSONNEL_INSURANCE_DELETE"
      );
      this.printInsurance = this.getMatchingResults(
        "PERSONNEL_INSURANCE_PRINT"
      );
      this.importInsurance = this.getMatchingResults(
        "PERSONNEL_INSURANCE_IMPORT"
      );
      this.exportInsurance = this.getMatchingResults(
        "PERSONNEL_INSURANCE_EXPORT"
      );
      this.timekeep = this.getMatchingResults("TIMEKEEP_TIMEKEEP");
      this.timekeepCheck = this.getMatchingResults("TIMEKEEP");
      this.manageTimekeep = this.getMatchingResults1([
        "TIMEKEEP_TIMEKEEP_MANAGE_ALL",
        "TIMEKEEP_TIMEKEEP_MANAGE_COMPANY",
        "TIMEKEEP_TIMEKEEP_MANAGE_BRANCH",
        "TIMEKEEP_TIMEKEEP_MANAGE_DEPARTMENT",
      ]);
      this.viewTimekeep = this.getMatchingResults1([
        "TIMEKEEP_TIMEKEEP_VIEW_ALL",
        "TIMEKEEP_TIMEKEEP_VIEW_COMPANY",
        "TIMEKEEP_TIMEKEEP_VIEW_BRANCH",
        "TIMEKEEP_TIMEKEEP_VIEW_DEPARTMENT",
      ]);
      this.createTimekeep = this.getMatchingResults("TIMEKEEP_TIMEKEEP_CREATE");
      this.updateTimekeep = this.getMatchingResults("TIMEKEEP_TIMEKEEP_UPDATE");
      this.deleteTimekeep = this.getMatchingResults("TIMEKEEP_TIMEKEEP_DELETE");
      this.printTimekeep = this.getMatchingResults("TIMEKEEP_TIMEKEEP_PRINT");
      this.importTimekeep = this.getMatchingResults("TIMEKEEP_TIMEKEEP_IMPORT");
      this.exportTimekeep = this.getMatchingResults("TIMEKEEP_TIMEKEEP_EXPORT");

      //tuyen dung request
      this.recruitment = this.getMatchingResults("RECRUITMENT");
      this.recruitmentRequest = this.getMatchingResults("RECRUITMENT_REQUEST");
      this.recruitmentRequestManage = this.getMatchingResults1([
        "RECRUITMENT_REQUEST_MANAGE_ALL",
        "RECRUITMENT_REQUEST_MANAGE_COMPANY",
        "RECRUITMENT_REQUEST_MANAGE_BRANCH",
        "RECRUITMENT_REQUEST_MANAGE_DEPARTMENT",
      ]);
      this.recruitmentRequestView = this.getMatchingResults1([
        "RECRUITMENT_REQUEST_VIEW_ALL",
        "RECRUITMENT_REQUEST_VIEW_COMPANY",
        "RECRUITMENT_REQUEST_VIEW_BRANCH",
        "RECRUITMENT_REQUEST_VIEW_DEPARTMENT",
      ]);
      this.recruitmentRequestCreate = this.getMatchingResults(
        "RECRUITMENT_REQUEST_CREATE"
      );
      this.recruitmentRequestUpdate = this.getMatchingResults(
        "RECRUITMENT_REQUEST_UPDATE"
      );
      this.recruitmentRequestDelete = this.getMatchingResults(
        "RECRUITMENT_REQUEST_DELETE"
      );
      this.recruitmentRequestPrint = this.getMatchingResults(
        "RECRUITMENT_REQUEST_PRINT"
      );
      this.recruitmentRequestImport = this.getMatchingResults(
        "RECRUITMENT_REQUEST_IMPORT"
      );
      this.recruitmentRequestExport = this.getMatchingResults(
        "RECRUITMENT_REQUEST_EXPORT"
      );
      //tuyen dung recruitment
      this.recruitment = this.getMatchingResults("RECRUITMENT");
      this.recruitmentRecruitment = this.getMatchingResults(
        "RECRUITMENT_RECRUITMENT"
      );
      this.recruitmentRecruitmentManage = this.getMatchingResults1([
        "RECRUITMENT_RECRUITMENT_MANAGE_ALL",
        "RECRUITMENT_RECRUITMENT_MANAGE_COMPANY",
        "RECRUITMENT_RECRUITMENT_MANAGE_BRANCH",
        "RECRUITMENT_RECRUITMENT_MANAGE_DEPARTMENT",
      ]);
      this.recruitmentRecruitmentView = this.getMatchingResults1([
        "RECRUITMENT_RECRUITMENT_VIEW_ALL",
        "RECRUITMENT_RECRUITMENT_VIEW_COMPANY",
        "RECRUITMENT_RECRUITMENT_VIEW_BRANCH",
        "RECRUITMENT_RECRUITMENT_VIEW_DEPARTMENT",
      ]);
      this.recruitmentRecruitmentCreate = this.getMatchingResults(
        "RECRUITMENT_RECRUITMENT_CREATE"
      );
      this.recruitmentRecruitmentUpdate = this.getMatchingResults(
        "RECRUITMENT_RECRUITMENT_UPDATE"
      );
      this.recruitmentRecruitmentDelete = this.getMatchingResults(
        "RECRUITMENT_RECRUITMENT_DELETE"
      );
      this.recruitmentRecruitmentPrint = this.getMatchingResults(
        "RECRUITMENT_RECRUITMENT_PRINT"
      );
      this.recruitmentRecruitmentImport = this.getMatchingResults(
        "RECRUITMENT_RECRUITMENT_IMPORT"
      );
      this.recruitmentRecruitmentExport = this.getMatchingResults(
        "RECRUITMENT_RECRUITMENT_EXPORT"
      );

      //tài sản
      this.assetCheck = this.getMatchingResults("ASSET");
      this.asset = this.getMatchingResults("ASSET_ASSET");
      this.assetManage = this.getMatchingResults1([
        "ASSET_ASSET_MANAGE_ALL",
        "ASSET_ASSET_MANAGE_COMPANY",
        "ASSET_ASSET_MANAGE_BRANCH",
        "ASSET_ASSET_MANAGE_DEPARTMENT",
      ]);
      this.assetView = this.getMatchingResults1([
        "ASSET_ASSET_VIEW_ALL",
        "ASSET_ASSET_VIEW_COMPANY",
        "ASSET_ASSET_VIEW_BRANCH",
        "ASSET_ASSET_VIEW_DEPARTMENT",
      ]);
      this.assetCreate = this.getMatchingResults("ASSET_ASSET_CREATE");
      this.assetUpdate = this.getMatchingResults("ASSET_ASSET_UPDATE");
      this.assetDelete = this.getMatchingResults("ASSET_ASSET_DELETE");
      this.assetPrint = this.getMatchingResults("ASSET_ASSET_PRINT");
      this.assetImport = this.getMatchingResults("ASSET_ASSET_IMPORT");
      this.assetExport = this.getMatchingResults("ASSET_ASSET_EXPORT");

      //đơn từ
      this.approvalCheck = this.getMatchingResults("APPROVAL");
      this.approval = this.getMatchingResults("APPROVAL_APPROVAL");
      this.approvalManage = this.getMatchingResults1([
        "APPROVAL_APPROVAL_MANAGE_ALL",
        "APPROVAL_APPROVAL_MANAGE_COMPANY",
        "APPROVAL_APPROVAL_MANAGE_BRANCH",
        "APPROVAL_APPROVAL_MANAGE_DEPARTMENT",
      ]);
      this.approvalView = this.getMatchingResults1([
        "APPROVAL_APPROVAL_VIEW_ALL",
        "APPROVAL_APPROVAL_VIEW_COMPANY",
        "APPROVAL_APPROVAL_VIEW_BRANCH",
        "APPROVAL_APPROVAL_VIEW_DEPARTMENT",
      ]);
      this.approvalCreate = this.getMatchingResults("APPROVAL_APPROVAL_CREATE");
      this.approvalUpdate = this.getMatchingResults("APPROVAL_APPROVAL_UPDATE");
      this.approvalDelete = this.getMatchingResults("APPROVAL_APPROVAL_DELETE");
      this.approvalPrint = this.getMatchingResults("APPROVAL_APPROVAL_PRINT");
      this.approvalImport = this.getMatchingResults("APPROVAL_APPROVAL_IMPORT");
      this.approvalExport = this.getMatchingResults("APPROVAL_APPROVAL_EXPORT");
      // Social
      this.socialCheck = this.getMatchingResults("SOCIAL");
      this.social = this.getMatchingResults("SOCIAL_SOCIAL");
      this.socialManage = this.getMatchingResults1([
        "SOCIAL_SOCIAL_MANAGE_ALL",
        "SOCIAL_SOCIAL_MANAGE_COMPANY",
        "SOCIAL_SOCIAL_MANAGE_BRANCH",
        "SOCIAL_SOCIAL_MANAGE_DEPARTMENT",
      ]);
      this.socialView = this.getMatchingResults1([
        "SOCIAL_SOCIAL_VIEW_ALL",
        "SOCIAL_SOCIAL_VIEW_COMPANY",
        "SOCIAL_SOCIAL_VIEW_BRANCH",
        "SOCIAL_SOCIAL_VIEW_DEPARTMENT",
      ]);
      this.socialCreate = this.getMatchingResults("SOCIAL_SOCIAL_CREATE");
      this.socialUpdate = this.getMatchingResults("SOCIAL_SOCIAL_UPDATE");
      this.socialDelete = this.getMatchingResults("SOCIAL_SOCIAL_DELETE");
      this.socialPrint = this.getMatchingResults("SOCIAL_SOCIAL_PRINT");
      this.socialImport = this.getMatchingResults("SOCIAL_SOCIAL_IMPORT");
      this.socialExport = this.getMatchingResults("SOCIAL_SOCIAL_EXPORT");

      // Bảng lương
      this.wageCheck = this.getMatchingResults("WAGE");
      this.wage = this.getMatchingResults("WAGE_WAGE");
      this.wageManage = this.getMatchingResults1([
        "WAGE_WAGE_MANAGE_ALL",
        "WAGE_WAGE_MANAGE_COMPANY",
        "WAGE_WAGE_MANAGE_BRANCH",
        "WAGE_WAGE_MANAGE_DEPARTMENT",
      ]);
      this.wageView = this.getMatchingResults1([
        "WAGE_WAGE_VIEW_ALL",
        "WAGE_WAGE_VIEW_COMPANY",
        "WAGE_WAGE_VIEW_BRANCH",
        "WAGE_WAGE_VIEW_DEPARTMENT",
      ]);
      this.wageCreate = this.getMatchingResults("WAGE_WAGE_CREATE");
      this.wageUpdate = this.getMatchingResults("WAGE_WAGE_UPDATE");
      this.wageDelete = this.getMatchingResults("WAGE_WAGE_DELETE");
      this.wagePrint = this.getMatchingResults("WAGE_WAGE_PRINT");
      this.wageImport = this.getMatchingResults("WAGE_WAGE_IMPORT");
      this.wageExport = this.getMatchingResults("WAGE_WAGE_EXPORT");
    }, 400);
  },
  setup() {
    const store = useStore();
    // const router = useRouter();
    const route = useRoute();
    // const toast = useToast();
    const isLoading = ref(true);
    const isLoadingShow = ref(false);
    const GroupUser = useGroupUser();
    const { listGroupUsers } = storeToRefs(GroupUser);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EndTimeLoadingShow = () => {
      isLoadingShow.value = false;
    };
    store.dispatch("users/ShowUserDetailAction", {
      id: route.params.idUser,
      EndTimeLoading,
    });
    if (listGroupUsers.value?.length == 0) {
      GroupUser.getAllAdminGroupsAction(100);
    }
    const userDetail = computed(() => store.state.users.userDetail);
    const listDeviceAuthentication = computed(
      () => store.state.users.listDeviceAuthentication
    );
    const dataById = computed(() => store.state.users.groupUserDetail);
    return {
      isLoading,
      isLoadingShow,
      userDetail,
      listGroupUsers,
      listDeviceAuthentication,
      EndTimeLoading,
      EndTimeLoadingShow,
      dataById,
    };
  },
};
</script>

<style></style>
