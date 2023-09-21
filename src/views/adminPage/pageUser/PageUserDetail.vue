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
      <nav-feature>
        <div class="w-full flex justify-end">
          <div class="flex items-center">
            <div
              class="btn-icon"
              v-if="userDetail.status == 'ACTIVE'"
              @click="handleBlockAccount()"
            >
              <div class="cx">
                <i class="fal fa-lock-alt"></i>
              </div>
              <div class="action-label">Khóa</div>
            </div>
            <div
              class="btn-icon"
              v-if="userDetail.status == 'ACTIVE'"
              @click="handleOpenUpdateRule()"
            >
              <div class="cx">
                <i class="fal fa-user-friends"></i>
              </div>
              <div class="action-label">Đổi nhóm</div>
            </div>
            <div
              class="btn-icon"
              v-if="userDetail.status == 'BLOCK'"
              @click="handleUnlockAccount()"
            >
              <div class="cx">
                <i class="fal fa-user-unlock"></i>
              </div>
              <div class="action-label">Mở khóa</div>
            </div>
            <div class="btn-icon" @click="EditUser()">
              <div class="cx">
                <i class="fal fa-user-edit"></i>
              </div>
              <div class="action-label">Sửa</div>
            </div>
          </div>
        </div>
      </nav-feature>
    </template>
    <Transition duration="550" name="nested">
      <div class="w-full" v-if="isLoading == false">
        <div title="Thông tin tài khoản" class="outer">
          <div class="detail-section-title">Thông tin tài khoản</div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td class="cellTable w-56">Tài khoản</td>
                  <td
                    class="cellTable w-56"
                    style="color: var(--color-primary)"
                  >
                    {{ userDetail.username }}
                  </td>
                  <td class="cellTable w-56">Nhóm</td>
                  <td class="cellTable w-56">
                    {{ formatGroup(userDetail.group_id) }}
                  </td>
                </tr>
                <tr>
                  <td class="cellTable w-56">Quản trị hệ thống</td>
                  <td class="cellTable w-56"></td>
                  <td class="cellTable w-56">Trạng thái</td>
                  <td class="cellTable w-56">
                    <div class="beacon" :class="FormatColor(userDetail.status)">
                      {{ formatStatus(userDetail.status) }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div title="Thông tin nhân sự" class="outer">
          <div class="detail-section-title">Thông tin nhân sự</div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td class="cellTable w-56">Mã nhân sự</td>
                  <td class="cellTable w-56">{{ userDetail.code }}</td>
                  <td class="cellTable w-56">Họ tên</td>
                  <td class="cellTable w-56">
                    {{ userDetail.fullname }}
                  </td>
                </tr>
                <tr>
                  <td class="cellTable w-56">Phòng ban</td>
                  <td class="cellTable w-56">
                    {{ userDetail.department?.title }}
                  </td>
                  <td class="cellTable w-56">Vị trí</td>
                  <td class="cellTable w-56">
                    {{ userDetail.position?.title }}
                  </td>
                </tr>
                <tr>
                  <td class="cellTable w-56">Email</td>
                  <td class="cellTable w-56">
                    {{ userDetail.personal_email }}
                  </td>
                  <td class="cellTable w-56">Ngày sinh</td>
                  <td class="cellTable w-56">
                    {{ formatDate(userDetail.birthday) }}
                  </td>
                </tr>
                <tr>
                  <td class="cellTable w-56">Điện thoại</td>
                  <td class="cellTable w-56">{{ userDetail.phone }}</td>
                  <td class="cellTable w-56">Quê quán</td>
                  <td class="cellTable w-56">
                    {{ userDetail.personnels?.origin_state_address }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div title="Thông tin nhân sự" class="inner">
          <div class="detail-section-title">Xác thực thiết bị</div>
          <div
            class="w-full overflow-auto format-scroll"
            v-if="listDeviceAuthentication?.length"
          >
            <table class="border h-full whitespace-nowrap w-full">
              <thead class="border-b bg-slate-50">
                <th class="cellTable">Thiết bị</th>
                <th class="cellTable text-center">Trạng thái</th>
                <th class="cellTable">Tình trạng</th>
                <th class="cellTable">IP</th>
                <th class="cellTable">Đăng nhập</th>
                <th class="cellTable">Đăng xuất</th>
                <th class="cellTable">Token</th>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in listDeviceAuthentication"
                  :key="index"
                  class="border-b"
                  @contextmenu.prevent="rightClick($event, item)"
                >
                  <td class="cellTable">{{ item.device }}</td>
                  <td
                    class="cellTable text-center"
                    :class="formatOnline(item.status)"
                    :title="item.status"
                  >
                    <i class="fas fa-circle"></i>
                  </td>
                  <td class="cellTable">
                    <div
                      class="beacon"
                      :class="formatColor(item.request_status)"
                    >
                      {{ FormatStatusAcc(item.request_status) }}
                    </div>
                  </td>
                  <td class="cellTable">{{ item.ip }}</td>
                  <td class="cellTable">{{ formatTime(item.request_time) }}</td>
                  <td class="cellTable"></td>
                  <td class="cellTable w-[200px] whitespace-normal">
                    {{ item.device_token }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="p-4 text-left text-sm">Không tìm thấy kết quả</div>
        </div>
        <div title="Chi tiết quyền" class="inner">
          <div class="detail-section-title">Chi tiết quyền</div>
          <div class="w-full">
            <div class="w-full">
              <table-responsive :header="header" :isShow="false">
                <tr>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL"
                      false-value=""
                      v-model="personnel"
                      disabled
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
                      disabled
                    />
                  </td>
                  <td class="cellTable">Hồ sơ nhân sự</td>
                  <td class="cellTable">
                    <select
                      class="form-control-select"
                      v-model="manage"
                      disabled
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
                        disabled
                      >
                        <option value="" disabled selected>Chọn quyền</option>
                        <option
                          v-for="(profileView, index) in listView"
                          :key="index"
                          :value="profileView.code"
                          disabled
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
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_PROFILE_UPDATE"
                      false-value=""
                      v-model="update"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_PROFILE_DELETE"
                      false-value=""
                      v-model="deleteRole"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_PROFILE_PRINT"
                      false-value=""
                      v-model="print"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_PROFILE_IMPORT"
                      false-value=""
                      v-model="importRole"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_PROFILE_EXPORT"
                      false-value=""
                      v-model="exportRole"
                      disabled
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
                      disabled
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
                      disabled
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
                      disabled
                    >
                      <option value="" selected>Chọn quyền</option>
                      <option
                        v-for="(contractView, index) in listView1"
                        :key="index"
                        :value="contractView.code"
                        disabled
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
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_CONTRACT_UPDATE"
                      false-value=""
                      v-model="update1"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_CONTRACT_DELETE"
                      false-value=""
                      v-model="deleteRole1"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_CONTRACT_PRINT"
                      false-value=""
                      v-model="print1"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_CONTRACT_IMPORT"
                      false-value=""
                      v-model="importRole1"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_CONTRACT_EXPORT"
                      false-value=""
                      v-model="exportRole1"
                      disabled
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
                      disabled
                    />
                  </td>
                  <td class="cellTable">Bảo hiểm</td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="manageInsurance"
                      disabled
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
                      disabled
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
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_INSURANCE_UPDATE"
                      false-value=""
                      v-model="updateInsurance"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_INSURANCE_DELETE"
                      false-value=""
                      v-model="deleteInsurance"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_INSURANCE_PRINT"
                      false-value=""
                      v-model="printInsurance"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_INSURANCE_IMPORT"
                      false-value=""
                      v-model="importInsurance"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="PERSONNEL_INSURANCE_EXPORT"
                      false-value=""
                      v-model="exportInsurance"
                      disabled
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
                      disabled
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
                      disabled
                    />
                  </td>
                  <td class="cellTable">Chấm công</td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="manageTimekeep"
                      disabled
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
                      disabled
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option
                        v-for="(timekeepView, index) in listTimekeepView"
                        :key="index"
                        :value="timekeepView.code"
                        disabled
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
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="TIMEKEEP_TIMEKEEP_UPDATE"
                      false-value=""
                      v-model="updateTimekeep"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="TIMEKEEP_TIMEKEEP_DELETE"
                      false-value=""
                      v-model="deleteTimekeep"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="TIMEKEEP_TIMEKEEP_PRINT"
                      false-value=""
                      v-model="printTimekeep"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="TIMEKEEP_TIMEKEEP_IMPORT"
                      false-value=""
                      v-model="importTimekeep"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="TIMEKEEP_TIMEKEEP_EXPORT"
                      false-value=""
                      v-model="exportTimekeep"
                      disabled
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
                      disabled
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
                      disabled
                    />
                  </td>
                  <td>Đề xuất tuyển dụng</td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="recruitmentRequestManage"
                      disabled
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
                      disabled
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
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_REQUEST_UPDATE"
                      false-value=""
                      v-model="recruitmentRequestUpdate"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_REQUEST_DELETE"
                      false-value=""
                      v-model="recruitmentRequestDelete"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_REQUEST_PRINT"
                      false-value=""
                      v-model="recruitmentRequestPrint"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_REQUEST_IMPORT"
                      false-value=""
                      v-model="recruitmentRequestImport"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_REQUEST_EXPORT"
                      false-value=""
                      v-model="recruitmentRequestExport"
                      disabled
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
                      disabled
                    />
                  </td>
                  <td class="cellTable">Tuyển dụng</td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="recruitmentRecruitmentManage"
                      disabled
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
                      disabled
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option
                        v-for="(
                          reRequestView, index
                        ) in recruitmentRecruitmentViewList"
                        :key="index"
                        :value="reRequestView.code"
                        disabled
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
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_RECRUITMENT_UPDATE"
                      false-value=""
                      v-model="recruitmentRecruitmentUpdate"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_RECRUITMENT_DELETE"
                      false-value=""
                      v-model="recruitmentRecruitmentDelete"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_RECRUITMENT_PRINT"
                      false-value=""
                      v-model="recruitmentRecruitmentPrint"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_RECRUITMENT_IMPORT"
                      false-value=""
                      v-model="recruitmentRecruitmentImport"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="RECRUITMENT_RECRUITMENT_EXPORT"
                      false-value=""
                      v-model="recruitmentRecruitmentExport"
                      disabled
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
                      disabled
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
                      disabled
                    />
                  </td>
                  <td class="cellTable">Tài sản</td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="assetManage"
                      disabled
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
                      disabled
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option
                        v-for="(assetView, index) in assetViewList"
                        :key="index"
                        :value="assetView.code"
                        disabled
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
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="ASSET_ASSET_UPDATE"
                      false-value=""
                      v-model="assetUpdate"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="ASSET_ASSET_DELETE"
                      false-value=""
                      v-model="assetDelete"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="ASSET_ASSET_PRINT"
                      false-value=""
                      v-model="assetPrint"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="ASSET_ASSET_IMPORT"
                      false-value=""
                      v-model="assetImport"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="ASSET_ASSET_EXPORT"
                      false-value=""
                      v-model="assetExport"
                      disabled
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
                      disabled
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
                      disabled
                    />
                  </td>
                  <td class="cellTable">Đơn từ</td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="approvalManage"
                      disabled
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
                      disabled
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option
                        v-for="(approvalView, index) in approvalViewList"
                        :key="index"
                        :value="approvalView.code"
                        disabled
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
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="APPROVAL_APPROVAL_UPDATE"
                      false-value=""
                      v-model="approvalUpdate"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="APPROVAL_APPROVAL_DELETE"
                      false-value=""
                      v-model="approvalDelete"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="APPROVAL_APPROVAL_PRINT"
                      false-value=""
                      v-model="approvalPrint"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="APPROVAL_APPROVAL_IMPORT"
                      false-value=""
                      v-model="approvalImport"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="APPROVAL_APPROVAL_EXPORT"
                      false-value=""
                      v-model="approvalExport"
                      disabled
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
                      disabled
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
                      disabled
                    />
                  </td>
                  <td class="cellTable">Kết nối</td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="socialManage"
                      disabled
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
                      disabled
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option
                        v-for="(socialView, index) in socialViewList"
                        :key="index"
                        :value="socialView.code"
                        disabled
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
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="SOCIAL_SOCIAL_UPDATE"
                      false-value=""
                      v-model="socialUpdate"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="SOCIAL_SOCIAL_DELETE"
                      false-value=""
                      v-model="socialDelete"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="SOCIAL_SOCIAL_PRINT"
                      false-value=""
                      v-model="socialPrint"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="SOCIAL_SOCIAL_IMPORT"
                      false-value=""
                      v-model="socialImport"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="SOCIAL_SOCIAL_EXPORT"
                      false-value=""
                      v-model="socialExport"
                      disabled
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
                      disabled
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
                      disabled
                    />
                  </td>
                  <td class="cellTable">Bảng lương</td>
                  <td class="cellTable text-center">
                    <select
                      class="form-control-select"
                      v-model="wageManage"
                      disabled
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
                      disabled
                    >
                      <option value="" disabled selected>Chọn quyền</option>
                      <option
                        v-for="(wageView, index) in wageViewList"
                        :key="index"
                        :value="wageView.code"
                        disabled
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
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="WAGE_WAGE_UPDATE"
                      false-value=""
                      v-model="wageUpdate"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="SOCIAL_SOCIAL_DELETE"
                      false-value=""
                      v-model="wageDelete"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="WAGE_WAGE_PRINT"
                      false-value=""
                      v-model="wagePrint"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="WAGE_WAGE_IMPORT"
                      false-value=""
                      v-model="wageImport"
                      disabled
                    />
                  </td>
                  <td class="cellTable text-center">
                    <input
                      type="checkbox"
                      true-value="WAGE_WAGE_EXPORT"
                      false-value=""
                      v-model="wageExport"
                      disabled
                    />
                  </td>
                </tr>
              </table-responsive>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </person-layout>
  <context-menu :isActive="isActive">
    <ul>
      <li @click="ConfirmDevice()" v-if="checkConfirm">
        <i class="fal fa-check"></i><a href="#">Xác thực thiết bị</a>
      </li>
      <li @click="UnconfirmDevice()">
        <i class="fal fa-ban"></i><a href="#">Không xác thực thiết bị</a>
      </li>
      <li><i class="fal fa-trash"></i><a href="#">Xóa thiết bị</a></li>
    </ul>
  </context-menu>
  <teleport to="#app">
    <!-- Start cập nhật nhóm -->
    <modal-view
      :isOpen="isOpenUpdateRule"
      :handleCloseDetail="handleCloseUpdateRule"
    >
      <div>
        <h1 class="header-modal">cập nhật nhóm người dùng</h1>
        <div class="text-left p-2 w-[600px]">
          <div style="line-height: 20px; padding-bottom: 10px">
            <div>Khi chuyển người dùng sang 1 nhóm mới:</div>
            <div>
              + Người dùng chưa được tùy chỉnh quyền sẽ được gán quyền và loại
              tài khoản của nhóm mới.
            </div>
            <div>
              + Người dùng đã được tùy chỉnh quyền sẽ được giữ nguyên quyền và
              loại tài khoản.
            </div>
          </div>
          <div>
            <label for="" class="form-group-label"
              >Nhóm người dùng<span class="text-red-600">*</span></label
            >
            <div>
              <v-select
                label="title"
                :options="listGroupUsers"
                :reduce="(group) => group.ID"
                placeholder="Chọn nhóm người dùng"
                v-model="userDetail.group_id"
              ></v-select>
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="UpdateGroupPermission()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseUpdateRule()">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!-- End cập nhật nhóm -->
    <!-- Start xác nhận xóa -->
    <!-- <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="DeleteRecruitmentCandidate"
    >
    </modal-delete> -->
    <!-- End xác nhận xóa -->
  </teleport>
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
import {
  FormatDate,
  FormatModalX,
  FormatModalY,
  FormatTitle,
} from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
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
      return FormatTitle(id, this.listGroupUsers);
    },
    formatDate(date) {
      return FormatDate(date);
    },
    FormatColor(status) {
      if (status == "ACTIVE") {
        return "beacon-success";
      } else {
        return "beacon-liquidation ";
      }
    },
    formatStatus(status) {
      if (status == "ACTIVE") {
        return "Đang hoạt động";
      } else {
        return "Đã khóa";
      }
    },
    getMatchingResults(input) {
      const array = this.userDetail.roles;
      const found = array.find((element) => element.name == input);
      if (found == undefined || found == null) {
        return "";
      } else {
        return found.name;
      }
    },
    getMatchingResults1(input) {
      const array = this.userDetail.roles;
      const inc = array.find((x) => input.includes(x.name));
      if (inc == undefined || inc == null) {
        return "";
      } else {
        return inc.name;
      }
    },
  },
  updated() {
    setTimeout(() => {
      const array = this.userDetail.roles;
      if (array.find((item) => item.name == "ADMIN")) {
        this.personnel = "PERSONNEL";
        this.personnelProfile = "PERSONNEL_PROFILE";
        this.manage = "PERSONNEL_PROFILE_MANAGE_ALL";
        this.view = "PERSONNEL_PROFILE_VIEW_ALL";
        this.create = "PERSONNEL_PROFILE_CREATE";
        this.update = "PERSONNEL_PROFILE_UPDATE";
        this.deleteRole = "PERSONNEL_PROFILE_DELETE";
        this.print = "PERSONNEL_PROFILE_PRINT";
        this.importRole = "PERSONNEL_PROFILE_IMPORT";
        this.exportRole = "PERSONNEL_PROFILE_EXPORT";
        this.manage1 = "PERSONNEL_CONTRACT_MANAGE_ALL";
        this.personnelContract = "PERSONNEL_CONTRACT";
        this.view1 = "PERSONNEL_CONTRACT_VIEW_ALL";
        this.create1 = "PERSONNEL_CONTRACT_CREATE";
        this.update1 = "PERSONNEL_CONTRACT_UPDATE";
        this.deleteRole1 = "PERSONNEL_CONTRACT_DELETE";
        this.print1 = "PERSONNEL_CONTRACT_PRINT";
        this.importRole1 = "PERSONNEL_CONTRACT_IMPORT";
        this.exportRole1 = "PERSONNEL_CONTRACT_EXPORT";
        this.manageInsurance = "PERSONNEL_INSURANCE_MANAGE_ALL";
        this.personnelInsurance = "PERSONNEL_INSURANCE";
        this.viewInsurance = "PERSONNEL_INSURANCE_VIEW_ALL";
        this.createInsurance = "PERSONNEL_INSURANCE_CREATE";
        this.updateInsurance = "PERSONNEL_INSURANCE_UPDATE";
        this.deleteInsurance = "PERSONNEL_INSURANCE_DELETE";
        this.printInsurance = "PERSONNEL_INSURANCE_PRINT";
        this.importInsurance = "PERSONNEL_INSURANCE_IMPORT";
        this.exportInsurance = "PERSONNEL_INSURANCE_EXPORT";
        this.timekeep = "TIMEKEEP_TIMEKEEP";
        this.timekeepCheck = "TIMEKEEP";
        this.manageTimekeep = "TIMEKEEP_TIMEKEEP_MANAGE_ALL";
        this.viewTimekeep = "TIMEKEEP_TIMEKEEP_VIEW_ALL";
        this.createTimekeep = "TIMEKEEP_TIMEKEEP_CREATE";
        this.updateTimekeep = "TIMEKEEP_TIMEKEEP_UPDATE";
        this.deleteTimekeep = "TIMEKEEP_TIMEKEEP_DELETE";
        this.printTimekeep = "TIMEKEEP_TIMEKEEP_PRINT";
        this.importTimekeep = "TIMEKEEP_TIMEKEEP_IMPORT";
        this.exportTimekeep = "TIMEKEEP_TIMEKEEP_EXPORT";

        //tuyen dung request
        this.recruitment = "RECRUITMENT";
        this.recruitmentRequest = "RECRUITMENT_REQUEST";
        this.recruitmentRequestManage = "RECRUITMENT_REQUEST_MANAGE_ALL";
        this.recruitmentRequestView = "RECRUITMENT_REQUEST_VIEW_ALL";
        this.recruitmentRequestCreate = "RECRUITMENT_REQUEST_CREATE";
        this.recruitmentRequestUpdate = "RECRUITMENT_REQUEST_UPDATE";
        this.recruitmentRequestDelete = "RECRUITMENT_REQUEST_DELETE";
        this.recruitmentRequestPrint = "RECRUITMENT_REQUEST_PRINT";
        this.recruitmentRequestImport = "RECRUITMENT_REQUEST_IMPORT";
        this.recruitmentRequestExport = "RECRUITMENT_REQUEST_EXPORT";
        //tuyen dung recruitment
        this.recruitment = "RECRUITMENT";
        this.recruitmentRecruitment = "RECRUITMENT_RECRUITMENT";
        this.recruitmentRecruitmentManage =
          "RECRUITMENT_RECRUITMENT_MANAGE_ALL";
        this.recruitmentRecruitmentView = "RECRUITMENT_RECRUITMENT_VIEW_ALL";
        this.recruitmentRecruitmentCreate = "RECRUITMENT_RECRUITMENT_CREATE";
        this.recruitmentRecruitmentUpdate = "RECRUITMENT_RECRUITMENT_UPDATE";
        this.recruitmentRecruitmentDelete = "RECRUITMENT_RECRUITMENT_DELETE";
        this.recruitmentRecruitmentPrint = "RECRUITMENT_RECRUITMENT_PRINT";
        this.recruitmentRecruitmentImport = "RECRUITMENT_RECRUITMENT_IMPORT";
        this.recruitmentRecruitmentExport = "RECRUITMENT_RECRUITMENT_EXPORT";

        //tài sản
        this.assetCheck = "ASSET";
        this.asset = "ASSET_ASSET";
        this.assetManage = "ASSET_ASSET_MANAGE_ALL";
        this.assetView = "ASSET_ASSET_VIEW_ALL";
        this.assetCreate = "ASSET_ASSET_CREATE";
        this.assetUpdate = "ASSET_ASSET_UPDATE";
        this.assetDelete = "ASSET_ASSET_DELETE";
        this.assetPrint = "ASSET_ASSET_PRINT";
        this.assetImport = "ASSET_ASSET_IMPORT";
        this.assetExport = "ASSET_ASSET_EXPORT";

        //đơn từ
        this.approvalCheck = "APPROVAL";
        this.approval = "APPROVAL_APPROVAL";
        this.approvalManage = "APPROVAL_APPROVAL_MANAGE_ALL";
        this.approvalView = "APPROVAL_APPROVAL_VIEW_ALL";
        this.approvalCreate = "APPROVAL_APPROVAL_CREATE";
        this.approvalUpdate = "APPROVAL_APPROVAL_UPDATE";
        this.approvalDelete = "APPROVAL_APPROVAL_DELETE";
        this.approvalPrint = "APPROVAL_APPROVAL_PRINT";
        this.approvalImport = "APPROVAL_APPROVAL_IMPORT";
        this.approvalExport = "APPROVAL_APPROVAL_EXPORT";

        //social
        this.socialCheck = "SOCIAL";
        this.social = "SOCIAL_SOCIAL";
        this.socialManage = "SOCIAL_SOCIAL_MANAGE_ALL";
        this.socialView = "SOCIAL_SOCIAL_VIEW_ALL";
        this.socialCreate = "SOCIAL_SOCIAL_CREATE";
        this.socialUpdate = "SOCIAL_SOCIAL_UPDATE";
        this.socialDelete = "SOCIAL_SOCIAL_DELETE";
        this.socialPrint = "SOCIAL_SOCIAL_PRINT";
        this.socialImport = "SOCIAL_SOCIAL_IMPORT";
        this.socialExport = "SOCIAL_SOCIAL_EXPORT";

        //BẢNG LƯƠNG
        this.wageCheck = "WAGE";
        this.wage = "WAGE_WAGE";
        this.wageManage = "WAGE_WAGE_MANAGE_ALL";
        this.wageView = "WAGE_WAGE_VIEW_ALL";
        this.wageCreate = "WAGE_WAGE_CREATE";
        this.wageUpdate = "WAGE_WAGE_UPDATE";
        this.wageDelete = "WAGE_WAGE_DELETE";
        this.wagePrint = "WAGE_WAGE_PRINT";
        this.wageImport = "WAGE_WAGE_IMPORT";
        this.wageExport = "WAGE_WAGE_EXPORT";
      } else {
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
        this.personnelInsurance = this.getMatchingResults(
          "PERSONNEL_INSURANCE"
        );
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
        this.createTimekeep = this.getMatchingResults(
          "TIMEKEEP_TIMEKEEP_CREATE"
        );
        this.updateTimekeep = this.getMatchingResults(
          "TIMEKEEP_TIMEKEEP_UPDATE"
        );
        this.deleteTimekeep = this.getMatchingResults(
          "TIMEKEEP_TIMEKEEP_DELETE"
        );
        this.printTimekeep = this.getMatchingResults("TIMEKEEP_TIMEKEEP_PRINT");
        this.importTimekeep = this.getMatchingResults(
          "TIMEKEEP_TIMEKEEP_IMPORT"
        );
        this.exportTimekeep = this.getMatchingResults(
          "TIMEKEEP_TIMEKEEP_EXPORT"
        );

        //tuyen dung request
        this.recruitment = this.getMatchingResults("RECRUITMENT");
        this.recruitmentRequest = this.getMatchingResults(
          "RECRUITMENT_REQUEST"
        );
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
        this.approvalCreate = this.getMatchingResults(
          "APPROVAL_APPROVAL_CREATE"
        );
        this.approvalUpdate = this.getMatchingResults(
          "APPROVAL_APPROVAL_UPDATE"
        );
        this.approvalDelete = this.getMatchingResults(
          "APPROVAL_APPROVAL_DELETE"
        );
        this.approvalPrint = this.getMatchingResults("APPROVAL_APPROVAL_PRINT");
        this.approvalImport = this.getMatchingResults(
          "APPROVAL_APPROVAL_IMPORT"
        );
        this.approvalExport = this.getMatchingResults(
          "APPROVAL_APPROVAL_EXPORT"
        );
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
      }
    }, 400);
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const isLoading = ref(true);
    const isLoadingShow = ref(false);
    const isOpenUpdateRule = ref(false);
    const checkConfirm = ref(true);
    const isActive = ref(false);
    const deviceDetail = ref();
    const isOpenConfirm = ref(false);
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
    const dataID = {
      user_id: route.params.idUser,
    };
    if (listGroupUsers.value?.length == 0) {
      GroupUser.getAllAdminGroupsAction(100);
    }
    store.dispatch("users/GetAllDeviceAuthenticationAction", dataID);
    const userDetail = computed(() => store.state.users.userDetail);
    const listDeviceAuthentication = computed(
      () => store.state.users.listDeviceAuthentication
    );
    const formatTime = (time) => {
      const arr = time.split(" ");
      return arr[1] + ", " + FormatDate(arr[0]);
    };
    const formatColor = (stt) => {
      if (stt == "NO_APPROVED") {
        return "beacon-wait";
      } else if (stt == "APPROVED") {
        return "beacon-success";
      } else {
        return "beacon-warning";
      }
    };
    const FormatStatusAcc = (stt) => {
      if (stt == "NO_APPROVED") {
        return "Không xác thực";
      } else if (stt == "APPROVED") {
        return "Đã xác thực";
      } else {
        return "Chờ xác thực";
      }
    };
    const formatOnline = (stt) => {
      if (stt == "online") {
        return "text-green-400";
      } else {
        return "text-red-400";
      }
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const handleOpenUpdateRule = () => {
      isOpenUpdateRule.value = true;
    };
    const handleCloseUpdateRule = () => {
      isOpenUpdateRule.value = false;
    };
    const handleBlockAccount = () => {
      store.dispatch("users/BlockAccountAction", {
        id: userDetail.value.ID,
        route,
        router,
        toast,
        EndTimeLoading,
      });
    };
    const handleUnlockAccount = () => {
      store.dispatch("users/UnLockAccountAction", {
        id: userDetail.value.ID,
        route,
        router,
        toast,
        EndTimeLoading,
      });
    };
    const UpdateGroupPermission = () => {
      const dataUrl = {
        data: {
          group_id: userDetail.value.group_id,
        },
        ID: userDetail.value.ID,
        perPage: 50,
      };
      store.dispatch("users/UpdateGroupPermissionAccountAction", {
        dataUrl,
        toast,
        route,
        closeModal: handleCloseUpdateRule,
        EndTimeLoading,
      });
    };
    const rightClick = (e, device) => {
      if (isActive.value === true) {
        isActive.value = false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        deviceDetail.value = device;
        if (device.request_status == "APPROVED") {
          checkConfirm.value = false;
        } else {
          checkConfirm.value = true;
        }
      }
    };
    const ConfirmDevice = () => {
      isLoadingShow.value = true;
      const data = {
        dataID: dataID,
        id: deviceDetail.value.ID,
      };
      store.dispatch("users/ConfirmDeviceAction", {
        data,
        toast,
        EndTimeLoading: EndTimeLoadingShow,
      });
    };
    const UnconfirmDevice = () => {
      isLoadingShow.value = true;
      const data = {
        dataID: dataID,
        id: deviceDetail.value.ID,
      };
      store.dispatch("users/UnconfirmDeviceAction", {
        data,
        EndTimeLoading: EndTimeLoadingShow,
      });
    };
    const EditUser = () => {
      router.push(`/page-user/edit/${route.params.idUser}`);
    };
    return {
      isLoading,
      isLoadingShow,
      userDetail,
      listGroupUsers,
      isOpenUpdateRule,
      isActive,
      listDeviceAuthentication,
      deviceDetail,
      checkConfirm,
      isOpenConfirm,
      handleBlockAccount,
      handleUnlockAccount,
      handleOpenUpdateRule,
      handleCloseUpdateRule,
      UpdateGroupPermission,
      EndTimeLoading,
      formatTime,
      rightClick,
      formatColor,
      FormatStatusAcc,
      EndTimeLoadingShow,
      ConfirmDevice,
      UnconfirmDevice,
      formatOnline,
      handleCloseConfirm,
      handleOpenConfirm,
      EditUser,
    };
  },
};
</script>

<style></style>
