<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-user></sidebar-user>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center ml-4">
            <p
              class="ml-2 font-medium uppercase"
              v-if="checkRoute(userProfile.personnel_id)"
            >
              Hồ sơ nhân sự
            </p>
            <p class="ml-2 font-medium uppercase" v-if="checkRoute('edit')">
              Cập nhật hồ sơ
            </p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div
          class="h-full w-full flex justify-between items-center"
          v-if="checkRoute(userProfile.personnel_id)"
        >
          <tab-nav
            :tabs="[
              'Sơ yếu lý lịch',
              'Công việc',
              'Bảo hiểm',
              'Hợp đồng',
              'Lương & phụ cấp',
              'Tiếp nhận',
              'Thôi việc',
              'Tài sản',
              'Đào tạo',
              'Khen thưởng & kỷ luật',
              'Đánh giá',
            ]"
            :selected="selected"
            @selected="setSelected"
          >
          </tab-nav>
          <div
            class="btn-icon"
            @click="this.$router.push('/user/profile/edit')"
          >
            <div class="cx">
              <i class="fal fa-edit"></i>
            </div>
            <div class="action-label">Cập nhật</div>
          </div>
        </div>
        <div
          class="h-full w-full flex justify-between items-center"
          v-if="checkRoute('edit')"
        >
          <tab-nav
            :tabs="['Thông tin', 'Lịch sử']"
            :selected="selectedEdit"
            @selected="setSelectedEdit"
          >
          </tab-nav>
        </div>
      </nav-feature>
    </template>
    <div class="w-full" v-if="checkRoute(userProfile.personnel_id)">
      <div v-if="isLoading == false" class="pb-4">
        <div title="Sơ yếu lý lịch">
          <the-tab :isSelected="selected == 'Sơ yếu lý lịch'" key="1">
            <div title="Thông tin chung">
              <div class="detail-section-title mt-2">Thông tin chung</div>
              <div class="p-2 grid grid-cols-12 gap-2">
                <div class="col-span-2">
                  <img
                    :src="avatar"
                    alt=""
                    class="w-[200px] h-[200px] rounded-full"
                  />
                </div>
                <div class="col-span-10">
                  <table>
                    <tbody>
                      <tr>
                        <td class="cellTable w-56">Họ và tên</td>
                        <td class="cellTable w-56">{{ userDetail.name }}</td>
                        <td class="cellTable w-56">Mã NV/ Mã nhân viên</td>
                        <td class="cellTable w-56">
                          {{ userDetail.code }}/{{ userDetail.attendace_code }}
                        </td>
                      </tr>
                      <tr>
                        <td class="cellTable w-56">Ngày sinh</td>
                        <td class="cellTable w-56">
                          {{ formatDate(userDetail.birthday) }}
                        </td>
                        <td class="cellTable w-56">Giới tính</td>
                        <td class="cellTable w-56">
                          {{ formatGender(userDetail.gender) }}
                        </td>
                      </tr>
                      <tr>
                        <td class="cellTable w-56">Tình trạng hôn nhân</td>
                        <td class="cellTable w-56">
                          {{ formatMarital(userDetail.marital_status) }}
                        </td>
                        <td class="cellTable w-56">Quốc tịch</td>
                        <td class="cellTable w-56">Việt Nam</td>
                      </tr>
                      <tr>
                        <td class="cellTable w-56">Điện thoại</td>
                        <td class="cellTable w-56">
                          {{ userDetail.mobile[0] }}
                        </td>
                        <td class="cellTable w-56">Email</td>
                        <td class="cellTable w-56">
                          {{ userDetail.personal_email }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div title="Thông tin khác">
              <div class="detail-section-title mt-2">Thông tin khác</div>
              <div class="w-full">
                <table class="w-full">
                  <tbody>
                    <tr>
                      <td class="cellTable">Dân tộc</td>
                      <td class="cellTable">
                        {{ formatPeople(userDetail.people) }}
                      </td>
                      <td class="cellTable">Tôn giáo</td>
                      <td class="cellTable">
                        {{ formatReligious(userDetail.religious) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">CMT/Căn cước/Hộ chiếu</td>
                      <td class="cellTable">
                        {{ userDetail.private_code }}
                      </td>
                      <td class="cellTable">Ngày cấp, Nơi cấp</td>
                      <td class="cellTable">
                        {{ formatPlaceCMT(userDetail) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Nơi sinh</td>
                      <td class="cellTable">
                        {{
                          formatPlacePersonnel(
                            userDetail.place_of_birth_ward,
                            userDetail.place_of_birth_district,
                            userDetail.place_of_birth_city
                          )
                        }}
                      </td>
                      <td class="cellTable">Nguyên quán</td>
                      <td class="cellTable">
                        {{
                          formatPlacePersonnel(
                            userDetail.origin_ward,
                            userDetail.origin_district,
                            userDetail.origin_city
                          )
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Chỗ ở hiện nay</td>
                      <td class="cellTable">
                        {{
                          formatPlacePersonnel(
                            userDetail.current_address_ward,
                            userDetail.current_address_district,
                            userDetail.current_address_city
                          )
                        }}
                      </td>
                      <td class="cellTable">Thường trú</td>
                      <td class="cellTable">
                        {{
                          formatPlacePersonnel(
                            userDetail.home_address_ward,
                            userDetail.home_address_district,
                            userDetail.home_address_city
                          )
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Mã số thuế cá nhân</td>
                      <td class="cellTable">
                        {{ userDetail.job_tax }}
                      </td>
                      <td class="cellTable">TK ngân hàng</td>
                      <td class="cellTable">
                        {{ formatBank(userDetail) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Trình độ phổ thông</td>
                      <td class="cellTable">
                        <span v-if="userDetail.level_school">
                          {{ userDetail.level_school }}/12
                        </span>
                        <span v-else></span>
                      </td>
                      <td class="cellTable">Trình độ học vấn cao nhất</td>
                      <td class="cellTable">
                        {{ formatAcademic(userDetail.level_academic) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div title="Thông tin gia đình & người phụ thuộc">
              <div class="detail-section-title mt-2">
                Thông tin gia đình & người phụ thuộc
              </div>
              <div class="form-plus-over" v-if="userDetail.json_family?.length">
                <table-responsive
                  :header="[
                    'Mối quan hệ',
                    'Họ và tên',
                    'Năm sinh',
                    'Nghề nghiệp',
                    'Điện thoại',
                    'Người phụ thuộc',
                    'Từ ngày',
                    'Đến ngày',
                    'Mã số thuế',
                  ]"
                  :isShow="false"
                >
                  <tr
                    v-for="(family, index) in userDetail.json_family"
                    :key="index"
                  >
                    <td class="cellTable">
                      {{ formatFamily(family.relative_id) }}
                    </td>
                    <td class="cellTable">{{ family.name }}</td>
                    <td class="cellTable">
                      {{ formatDate(family.birthday) }}
                    </td>
                    <td class="cellTable">{{ family.desc }}</td>
                    <td class="cellTable">{{ family.phone }}</td>
                    <td class="cellTable">
                      {{ formatStatus(family.is_dependent) }}
                    </td>
                    <td class="cellTable">
                      {{ formatDate(family.dependent_from_date) }}
                    </td>
                    <td class="cellTable">
                      {{ family.dependent_to_date }}
                    </td>
                    <td class="cellTable">
                      {{ family.dependent_tax }}
                    </td>
                  </tr></table-responsive
                >
              </div>
              <div class="text-left p-2" v-else>Không tìm thấy kết quả</div>
            </div>
            <div title="Trình độ học vấn">
              <div class="detail-section-title mt-2">Trình độ học vấn</div>
              <div
                class="form-plus-over"
                v-if="userDetail.json_degrees?.length"
              >
                <table-responsive
                  :header="[
                    'Từ ngày',
                    'Đến ngày',
                    'Hình thức đào tạo',
                    'Chuyên ngành',
                    'Trình độ học vấn',
                    'Nơi đào tạo',
                  ]"
                  :isShow="false"
                >
                  <tr
                    v-for="(degress, index) in userDetail.json_degrees"
                    :key="index"
                  >
                    <td class="cellTable">
                      {{ formatDate(degress.degree_date_from) }}
                    </td>
                    <td class="cellTable">
                      {{ formatDate(degress.degree_date_to) }}
                    </td>
                    <td class="cellTable">
                      {{ formatTypeTraining(degress.degree_type_id) }}
                    </td>
                    <td class="cellTable">
                      {{ degress.degree_specialization }}
                    </td>
                    <td class="cellTable">
                      {{ formatAcademic(degress.degree_level_id) }}
                    </td>
                    <td class="cellTable">{{ degress.degress_place }}</td>
                  </tr></table-responsive
                >
              </div>
              <div class="text-left p-2" v-else>Không tìm thấy kết quả</div>
            </div>
            <div title="Kinh nghiệm làm việc">
              <div class="detail-section-title mt-2">Kinh nghiệm làm việc</div>
              <div
                class="form-plus-over"
                v-if="userDetail.json_experience?.length"
              >
                <table-responsive
                  :header="[
                    'Từ ngày',
                    'Đến ngày',
                    'Công ty',
                    'Vị trí',
                    'Mô tả công việc',
                  ]"
                  :isShow="false"
                >
                  <tr
                    v-for="(experience, index) in userDetail.json_experience"
                    :key="index"
                  >
                    <td class="cellTable">
                      {{ formatDate(experience.experience_date_from) }}
                    </td>
                    <td class="cellTable">
                      {{ formatDate(experience.experience_date_to) }}
                    </td>
                    <td class="cellTable">
                      {{ experience.experience_company_title }}
                    </td>
                    <td class="cellTable">
                      {{ experience.experience_position_id }}
                    </td>
                    <td class="cellTable">
                      {{ experience.experience_work_desc }}
                    </td>
                  </tr></table-responsive
                >
              </div>
              <div class="text-left p-2" v-else>Không tìm thấy kết quả</div>
            </div>
            <div title="Lịch sử đảng viên">
              <div class="detail-section-title mt-2">Lịch sử đảng viên</div>
              <div
                class="form-plus-over"
                v-if="userDetail.json_communist?.length"
              >
                <table-responsive
                  :header="[
                    'Số thẻ',
                    'Hình thức',
                    'Từ ngày',
                    'Đến ngày',
                    'Nơi kết nạp',
                    'Nơi điều chuyển',
                  ]"
                  :isShow="false"
                >
                  <tr
                    v-for="(com, index) in userDetail.json_communist"
                    :key="index"
                  >
                    <td class="cellTable">{{ com.communist_code }}</td>
                    <td class="cellTable">{{}}</td>
                    <td class="cellTable">
                      {{ formatDate(com.communist_date_from) }}
                    </td>
                    <td class="cellTable">
                      {{ formatDate(com.communist_date_to) }}
                    </td>
                    <td class="cellTable">
                      {{ com.communist_address_join }}
                    </td>
                    <td class="cellTable">
                      {{ com.communist_address_transfer }}
                    </td>
                  </tr></table-responsive
                >
              </div>
              <div class="text-left p-2" v-else>Không tìm thấy kết quả</div>
            </div>
            <div title="Ảnh chứng minh nhân dân">
              <div class="detail-section-title mt-2">
                Ảnh chứng minh thư nhân dân
              </div>
              <div class="p-4 text-left">
                <div>
                  <label for="" class="form-group-label"
                    >Ảnh CCCD/CMND mặt trước</label
                  >
                  <img
                    :src="img_1"
                    class="border border-dashed border-slate-100 w-[500px] h-[300px] rounded-lg"
                    alt=""
                  />
                </div>
                <div>
                  <label for="" class="form-group-label mt-4"
                    >Ảnh CCCD/CMND mặt sau</label
                  >
                  <img
                    :src="img_2"
                    class="border border-dashed border-slate-100 w-[500px] h-[300px] rounded-lg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </the-tab>
        </div>
        <div title="Công việc">
          <the-tab
            :isSelected="selected == 'Công việc'"
            v-if="loadTab_2 == false"
          >
            <div title="Công việc">
              <div class="detail-section-title mt-2">Công việc</div>
              <div class="w-full">
                <table class="w-full">
                  <tbody>
                    <tr>
                      <td class="cellTable">Trạng thái</td>
                      <td class="cellTable">
                        <div
                          class="beacon"
                          :class="formatColorWork(userDetail?.job_status)"
                        >
                          {{ formatStatusWork(userDetail?.job_status) }}
                        </div>
                      </td>
                      <td class="cellTable">Phòng ban</td>
                      <td class="cellTable">
                        {{ userDetail.department?.title }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Vị trí</td>
                      <td class="cellTable">
                        {{ userDetail.position?.title }}
                      </td>
                      <td class="cellTable">Chức vụ</td>
                      <td class="cellTable">
                        {{ userDetail.job_title_current?.title }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Ngày vào</td>
                      <td class="cellTable">
                        {{ formatDate(userDetail.job_date_join) }}
                      </td>
                      <td class="cellTable">Ngày vào chính thức</td>
                      <td class="cellTable">
                        {{ formatDate(userDetail.job_reldate_join) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Tên hợp đồng</td>
                      <td class="cellTable">
                        {{ contractDetail.title }}
                      </td>
                      <td class="cellTable">Nơi làm việc</td>
                      <td class="cellTable">
                        {{ formatWorkplace(userDetail.work_place) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Ngạch lương</td>
                      <td class="cellTable">
                        {{ contractDetail.quantum_id }}
                      </td>
                      <td class="cellTable">Cấp bậc</td>
                      <td class="cellTable">{{}}</td>
                    </tr>
                    <tr>
                      <td class="cellTable">Tài khoản</td>
                      <td class="cellTable">
                        {{ userProfile.username }}
                      </td>
                      <td class="cellTable">Nhóm người dùng</td>
                      <td class="cellTable">
                        {{ userProfile.group_id }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div title="Lịch sử công việc">
              <div class="detail-section-title mt-2">Lịch sử công việc</div>
              <div class="form-plus-over">
                <table-responsive
                  :header="[
                    'Từ ngày',
                    'Trạng thái',
                    'Phòng ban',
                    'Vị trí',
                    'Chức vụ',
                    'Hợp đồng hiện tại',
                    'Mã HĐ',
                  ]"
                  :isShow="false"
                >
                  <tr v-for="(history, index) in HistoryWork" :key="index">
                    <td class="cellTable">
                      {{ formatDate(history.date_from) }}
                    </td>
                    <td class="cellTable">
                      {{ formatStatusWork(history.job_status) }}
                    </td>
                    <td class="cellTable">
                      {{ history.department_name }}
                    </td>
                    <td class="cellTable">
                      {{ history.position_name }}
                    </td>
                    <td class="cellTable">
                      {{ history.job_title_name }}
                    </td>
                    <td class="cellTable">
                      {{ formatContract(history.job_contract) }}
                    </td>
                    <td class="cellTable">
                      {{ history.contract_code }}
                    </td>
                  </tr></table-responsive
                >
              </div>
            </div>
          </the-tab>
        </div>
        <div title="Bảo hiểm">
          <the-tab :isSelected="selected == 'Bảo hiểm'">
            <div title="Thông tin bảo hiểm">
              <div class="bg-slate-100 text-left mt-2">
                <h3 class="font-medium p-3">Thông tin bảo hiểm</h3>
              </div>
              <div class="w-full">
                <table class="w-full">
                  <tbody>
                    <tr>
                      <td class="cellTable" width="15%">Số sổ BHXH</td>
                      <td class="cellTable" width="35%">
                        {{ userDetail.premium_code }}
                      </td>
                      <td class="cellTable" width="15%">Số thẻ BHYT</td>
                      <td class="cellTable" width="35%">
                        {{ userDetail.premium_card }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Mã tỉnh cấp</td>
                      <td class="cellTable"></td>
                      <td class="cellTable">Đăng kí khám chữa bệnh</td>
                      <td class="cellTable"></td>
                    </tr>
                    <tr>
                      <td class="cellTable">Trạng thái sổ</td>
                      <td class="cellTable"></td>
                      <td class="cellTable">Pháp nhân</td>
                      <td class="cellTable"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div title="Nghiệp vụ báo tăng">
              <div class="bg-slate-100 text-left mt-2">
                <h3 class="font-medium p-3">Nghiệp vụ báo tăng</h3>
              </div>
              <div class="w-full">
                <table class="w-full">
                  <tbody>
                    <tr>
                      <td class="cellTable" width="15%">NV hoàn thiện HS</td>
                      <td class="cellTable" width="35%"></td>
                      <td class="cellTable" width="15%">NV hoàn thiện HS</td>
                      <td class="cellTable" width="35%"></td>
                    </tr>
                    <tr>
                      <td class="cellTable">Ngày nhận thẻ BHYT</td>
                      <td class="cellTable"></td>
                      <td class="cellTable">Ngày trả thẻ BHYT</td>
                      <td class="cellTable"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div title="Nghiệp vụ báo giảm">
              <div class="bg-slate-100 text-left mt-2">
                <h3 class="font-medium p-3">Nghiệp vụ báo giảm</h3>
              </div>
              <div class="w-full">
                <table class="w-full">
                  <tbody>
                    <tr>
                      <td class="cellTable" width="15%">
                        Ngày nhận sổ BH từ NLĐ
                      </td>
                      <td class="cellTable" width="35%"></td>
                      <td class="cellTable" width="15%">NS hoàn thiện HS</td>
                      <td class="cellTable" width="35%"></td>
                    </tr>
                    <tr>
                      <td class="cellTable">Ngày nhận sổ BH đã chốt</td>
                      <td class="cellTable"></td>
                      <td class="cellTable">Ngày trả số cho NLĐ</td>
                      <td class="cellTable"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div title="Lịch sử bảo hiểm">
              <div class="bg-slate-100 text-left mt-2">
                <h3 class="font-medium p-3">Lịch sử bảo hiểm</h3>
              </div>
            </div>
            <div title="Lịch sử giải quyết chế độ">
              <div class="bg-slate-100 text-left mt-2">
                <h3 class="font-medium p-3">Lịch sử giải quyết chế độ</h3>
              </div>
            </div>
          </the-tab>
        </div>
        <div title="Hợp đồng">
          <the-tab
            :isSelected="selected == 'Hợp đồng'"
            v-if="loadTab_4 == false"
            ><div class="bg-slate-100 text-left mt-2">
              <h3 class="font-medium p-3">Danh sách hợp đồng</h3>
            </div>
            <div class="form-plus-over">
              <table-responsive
                :header="[
                  'Mã hợp đồng',
                  'Hợp đồng',
                  'Tình trạng',
                  'Ngày ký',
                  'Ngày bắt đầu',
                  'Ngày kết thúc',
                ]"
                :isShow="false"
              >
                <tr
                  v-for="(history, index) in userDetail.personnel_contracts"
                  :key="index"
                >
                  <td class="cellTable">
                    {{ history.contract_code }}
                  </td>
                  <td class="cellTable">
                    {{ history.title }}
                  </td>
                  <td class="cellTable">
                    <div
                      class="beacon"
                      :class="formatColorContract(history.status)"
                    >
                      {{ formatMessagesContract(history.status) }}
                    </div>
                  </td>
                  <td class="cellTable">{{ formatDate(history.date_reg) }}</td>
                  <td class="cellTable">
                    {{ formatDate(history.date_start) }}
                  </td>
                  <td class="cellTable">
                    {{ formatDate(history.date_finish) }}
                  </td>
                </tr></table-responsive
              >
            </div>
          </the-tab>
        </div>
        <div title="Lương & phụ cấp">
          <the-tab :isSelected="selected == 'Lương & phụ cấp'">
            <div class="bg-slate-100 text-left mt-2">
              <h3 class="font-medium p-3">Lương và phụ cấp</h3>
            </div>
            <div v-if="userDetail.salaries" class="w-full py-2">
              <table class="w-full border">
                <thead class="border bg-slate-50">
                  <th class="cellTable">Từ ngày</th>
                  <th class="cellTable">Ghi chú</th>
                  <th class="cellTable">Hình thức lương</th>
                  <th class="cellTable">Số tiền</th>
                  <th class="cellTable">Phụ cấp</th>
                  <th class="cellTable">Số tiền</th>
                  <th class="cellTable">Mức lương đóng bảo hiểm</th>
                </thead>
                <tbody>
                  <tr
                    v-for="(salary, index) in userDetail.salaries"
                    :key="index"
                    class="border"
                  >
                    <td class="cellTable">
                      {{ formatDate(salary.date) }}
                    </td>
                    <td class="cellTable">
                      {{ salary.desc }}
                    </td>
                    <template
                      v-for="(salaryType, inde) in salary.json_type_salary"
                      :key="inde"
                    >
                      <td class="cellTable">{{ salaryType.type_salary }}</td>
                    </template>
                    <template
                      v-for="(salaryType, inde) in salary.json_type_salary"
                      :key="inde"
                    >
                      <td class="cellTable">
                        {{ formatPrice(salaryType.money) }}
                      </td>
                    </template>
                    <template
                      v-for="(allowance, ind) in salary.json_allowances"
                      :key="ind"
                    >
                      <td class="cellTable">
                        {{ allowance.allowance }}
                      </td>
                    </template>
                    <template
                      v-for="(allowance, ind) in salary.json_allowances"
                      :key="ind"
                    >
                      <td class="cellTable">
                        {{ formatPrice(allowance.money) }}
                      </td>
                    </template>
                    <td class="cellTable">
                      {{ formatPrice(salary.premium_salary) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="p-2">Không tìm thấy kết quả nào</div>
          </the-tab>
        </div>
        <div title="Tiếp nhận">
          <the-tab :isSelected="selected == 'Tiếp nhận'">
            <div class="text-left py-2">
              <h3 class="font-medium bg-slate-100 p-3">Thủ tục tiếp nhận</h3>
              <div class="grid grid-cols-6 gap-4 p-4">
                <div
                  class="flex justify-start col-span-2"
                  v-for="receive in listReceives"
                  :key="receive.ID"
                >
                  <div>
                    <input
                      type="checkbox"
                      name=""
                      :id="receive.ID"
                      :checked="checkReceives(receive.ID)"
                      disabled="disabled"
                    />
                  </div>
                  <label
                    :for="receive.ID"
                    class="cursor-pointer form-group-label ml-1"
                    :title="receive.title"
                    >{{ receive.title }}</label
                  >
                </div>
              </div>
            </div>
          </the-tab>
        </div>
        <div title="Thôi việc">
          <the-tab :isSelected="selected == 'Thôi việc'"
            ><div class="text-left py-2">
              <h3 class="font-medium bg-slate-100 p-3">Thủ tục thôi việc</h3>
              <div class="grid grid-cols-6 gap-4 p-4">
                <div
                  class="flex items-center mt-2 col-span-2"
                  v-for="item in listQuits"
                  :key="item.ID"
                >
                  <div>
                    <input
                      type="checkbox"
                      name=""
                      :id="item.ID"
                      :checked="checkOut(item.ID)"
                      disabled="disabled"
                    />
                  </div>
                  <label
                    :for="item.ID"
                    class="cursor-pointer form-group-label ml-1"
                    :title="item.title"
                    >{{ item.title }}</label
                  >
                </div>
              </div>
            </div></the-tab
          >
        </div>
      </div>
    </div>
    <div class="w-full" v-if="checkRoute('edit')">
      <div title="Thông tin">
        <the-tab :isSelected="selectedEdit == 'Thông tin'">
          <div class="text-left p-4">
            <div class="form-small">
              <div>
                <label for="" class="form-group-label">Ngày sinh</label>
                <div>
                  <date-picker v-model="userDetail.birthday"></date-picker>
                </div>
              </div>
            </div>
            <div class="form-small">
              <div>
                <label for="" class="form-group-label">Giới tính</label>
                <div>
                  <input-gender v-model="userDetail.gender"></input-gender>
                </div>
              </div>
            </div>
            <div class="form-small">
              <div>
                <label for="" class="form-group-label"
                  >Tình trạng hôn nhân</label
                >
                <div>
                  <input-marital
                    v-model="userDetail.marital_status"
                  ></input-marital>
                </div>
              </div>
            </div>
            <div class="form-small">
              <div>
                <label for="" class="form-group-label">Điện thoại</label>
                <div>
                  <v-select
                    no-drop
                    taggable
                    multiple
                    placeholder="Nhập số điện thoại, Enter để nhập nhiều"
                    v-model="userDetail.mobile"
                  />
                </div>
              </div>
            </div>
            <div class="form-small">
              <div>
                <label for="" class="form-group-label">Email</label>
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="NguyenVan@gmail.com"
                    v-model="userDetail.personal_email"
                  />
                </div>
              </div>
            </div>
          </div>
        </the-tab>
      </div>
      <div title="Lịch sử">
        <the-tab :isSelected="selectedEdit == 'Lịch sử'">
          <div class="text-left p-4">
            <h4>Không tìm thấy kết quả</h4>
          </div>
        </the-tab>
      </div>
    </div>
    <template v-slot:sub_footer v-if="checkRoute('edit')">
      <div class="bg-slate-100 sticky right-0 bottom-0 left-0 z-10">
        <div class="p-4 text-left">
          <button class="button-modal" @click="updateProfile()">
            Cập nhật
          </button>
          <button
            class="button-close-modal"
            @click="
              this.$router.push(`/user/profile/${userProfile.personnel_id}`)
            "
          >
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
</template>

<script>
import TableResponsive from "@/components/table/TableResponsive.vue";
import TabNav from "@/components/tab/TabNav.vue";
import TheTab from "@/components/tab/TheTab.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarUser from "@/components/sidebar/SidebarUser.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import datePicker from "@/components/datePicker/datePicker.vue";
import InputGender from "@/components/constant/InputGender.vue";
import InputMarital from "@/components/constant/TotalInput/InputMarital.vue";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed, watch } from "@vue/runtime-core";
import {
  FormatBank,
  FormatColorContract,
  FormatColorWork,
  FormatDate,
  FormatGender,
  FormatMaritalStatus,
  FormatPlacePersonnel,
  FormatPrice,
  FormatStatusContract,
  FormatStatusWork,
  FormatTitle,
  FormatTrueFalse,
} from "@/constants/FormatAll";
import { useRoute } from "vue-router";
import { URL_IMG } from "@/constants/ApiUrl";
import { useBanks } from "@/store/modules/settingPersonnel/banks";
import { useEthinicReligion } from "@/store/modules/settingPersonnel/ethnic-religion";
import { useAcademic } from "@/store/modules/personnelView/academics";
import { useFamilyRelationship } from "@/store/modules/settingPersonnel/familyRelationship";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
export default {
  components: {
    TabNav,
    PersonLayout,
    SidebarUser,
    NavbarSocial,
    NavFeature,
    TheTab,
    TableResponsive,
    datePicker,
    InputGender,
    InputMarital,
  },
  data() {
    return {};
  },
  methods: {
    formatDate(date) {
      if (date == null) {
        return "";
      } else {
        return FormatDate(date);
      }
    },
    formatGender(status) {
      return FormatGender(status);
    },
    formatMarital(status) {
      return FormatMaritalStatus(status);
    },
    formatStatus(status) {
      return FormatTrueFalse(status);
    },
    formatReligious(id) {
      return FormatTitle(id, this.listReligions);
    },
    formatPeople(id) {
      return FormatTitle(id, this.listEthnics);
    },
    formatPlacePersonnel(ward, district, city) {
      return FormatPlacePersonnel(ward, district, city);
    },
    formatPlaceCMT(obj) {
      let cmt = "";
      if (obj.private_code_date) {
        cmt = cmt + this.formatDate(obj.private_code_date) + " , ";
      } else {
        cmt = cmt + "";
      }
      if (obj.private_code_place) {
        cmt =
          cmt + FormatTitle(obj.private_code_place, this.listLocation) + " , ";
      } else {
        cmt = cmt + "";
      }
      return cmt.slice(0, -2);
    },
    formatBank(obj) {
      return FormatBank(obj, this.listBanks);
    },
    formatAcademic(id) {
      return FormatTitle(id, this.listAcademic);
    },
    formatFamily(id) {
      return FormatTitle(id, this.listFamilyRelationship);
    },
    formatContract(id) {
      return FormatTitle(id, this.listContractTypes);
    },
    formatWorkplace(id) {
      return FormatTitle(id, this.listWorkplace);
    },
    formatTypeTraining(id) {
      return FormatTitle(id, this.TypeTraining);
    },
    formatColorContract(status) {
      return FormatColorContract(status);
    },
    formatMessagesContract(status) {
      return FormatStatusContract(status);
    },
    formatColorWork(stt) {
      return FormatColorWork(stt);
    },
    formatStatusWork(stt) {
      return FormatStatusWork(stt);
    },
    formatPrice(price) {
      return FormatPrice(price);
    },
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const loadTab_2 = ref(true);
    const loadTab_4 = ref(true);
    const isLoading = ref(true);
    const urlImg = ref(URL_IMG);
    const selected = ref("Sơ yếu lý lịch");
    const selectedEdit = ref("Thông tin");
    const banks = useBanks();
    const EthinicReligion = useEthinicReligion();
    const academic = useAcademic();
    const family = useFamilyRelationship();
    const profile = useUserProfile();
    const { userProfile, img_1, img_2, avatar, userDetail, contractDetail } =
      storeToRefs(profile);
    const { listAcademic } = storeToRefs(academic);
    const { listFamilyRelationship } = storeToRefs(family);
    const { listEthnics, listReligions, listLevelSchool } =
      storeToRefs(EthinicReligion);
    const { listBanks } = storeToRefs(banks);
    const setSelected = (tab) => {
      selected.value = tab;
    };
    const setSelectedEdit = (tab) => {
      selectedEdit.value = tab;
    };
    watch(selected, (to) => {
      if (to == "Công việc") {
        loadTab_2.value = false;
      }
      if (to == "Hợp đồng") {
        loadTab_4.value = false;
      }
      if (to == "Tiếp nhận") {
        store.dispatch("categories/getAllReceiveAction", 100);
      }
      if (to == "Thôi việc") {
        store.dispatch("categories/getAllQuitAction", 100);
      }
    });
    const checkRoute = (index) => {
      if (index == route.params.idUser) {
        return true;
      } else {
        return false;
      }
    };
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    profile.ShowDetailUserAction({
      id: route.params.idUser,
      EndTimeLoading,
    });
    store.dispatch("personnels/GetAllHistoryWorkAction", route.params.idUser);
    const listLocation = computed(() => store.state.places.listLocation);
    const listContractTypes = computed(
      () => store.state.contractTypes.listContractTypes
    );
    const listWorkplace = computed(() => store.state.workplace.listWorkplace);
    const listReceives = computed(
      () => store.getters["categories/getAllReceivesActive"]
    );
    const listQuits = computed(
      () => store.getters["categories/getAllQuitsActive"]
    );
    const HistoryWork = computed(() => store.state.personnels.HistoryWork);
    const TypeTraining = computed(() => store.state.personnels.TypeTraining);
    setTimeout(() => {
      if (listEthnics.value?.length == 0) {
        EthinicReligion.GetAllEthnicsAction();
      }
      if (listReligions.value?.length == 0) {
        EthinicReligion.GetAllReligionAction();
      }
      if (listBanks.value?.length == 0) {
        banks.GetAllBanksAction();
      }
      store.dispatch("places/getAlllocationAction");
      if (listAcademic.value?.length == 0) {
        academic.GetAllAcademicsAction();
      }
      if (listFamilyRelationship.value?.length == 0) {
        family.getAllFamilyRelationshipAction();
      }
    }, 1000);
    setTimeout(() => {
      store.dispatch("workplace/getAllWorkplaceAction", 500);
      store.dispatch("contractTypes/GetAllContractTypeAction", 50);
    }, 3000);
    const updateProfile = () => {
      alert("Tính năng đang phát triển");
    };
    const checkReceives = (id) => {
      if (userDetail.value.receives?.length) {
        const key = userDetail.value.receives.find((item) => item.ID == id);
        if (key) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };
    const checkOut = (id) => {
      if (userDetail.value.jobouts?.length) {
        const key = userDetail.value.jobouts.find((item) => item.ID == id);
        if (key) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };
    return {
      checkReceives,
      checkOut,
      selected,
      selectedEdit,
      isLoading,
      loadTab_2,
      loadTab_4,
      userDetail,
      contractDetail,
      userProfile,
      listEthnics,
      listReligions,
      listLocation,
      listBanks,
      listLevelSchool,
      listAcademic,
      listFamilyRelationship,
      listContractTypes,
      listWorkplace,
      listReceives,
      listQuits,
      img_1,
      img_2,
      TypeTraining,
      urlImg,
      avatar,
      HistoryWork,
      setSelected,
      setSelectedEdit,
      checkRoute,
      updateProfile,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
