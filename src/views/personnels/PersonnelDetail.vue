<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-personnel></sidebar-personnel>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center ml-4">
            <Transition name="slide-fade">
              <div
                class="ml-2 longText uppercase font-medium"
                v-if="isLoading == false || isLoadingLoad == false"
              >
                {{ personnelDetail.name }} - {{ personnelDetail.code }}
              </div>
            </Transition>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="h-full w-full flex justify-between items-center">
          <tab-nav
            :tabs="[
              'Sơ yếu lý lịch',
              'Công việc',
              'Bảo hiểm',
              'Hợp đồng',
              'Lương & phụ cấp',
              'Tiếp nhận',
              'Tài sản',
              'Đào tạo',
              'Khen thưởng & kỷ luật',
              'Đánh giá',
            ]"
            :selected="selected"
            @selected="setSelected"
          >
          </tab-nav>
          <div class="flex items-center">
            <div
              class="btn-icon"
              title="Trạng thái"
              @click="handleOpenStatus()"
            >
              <div class="cx"><i class="fal fa-sync"></i></div>
              <div class="action-label">Trạng thái</div>
            </div>
            <div class="btn-icon" title="Công việc" @click="handleOpenWork()">
              <div class="cx"><i class="fal fa-briefcase"></i></div>
              <div class="action-label">Công việc</div>
            </div>
            <div class="btn-icon relative group" title="Mở rộng">
              <div class="cx"><i class="fal fa-tools"></i></div>
              <div class="action-label">Mở rộng</div>
              <div
                class="absolute z-10 right-0 top-10 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute drop-shadow-2xl"
              >
                <ul class="bg-white p-2 rounded-md">
                  <li
                    class="w-40 sub-item"
                    @click="handleBlockAccount()"
                    title="Khóa tài khoản"
                  >
                    <i class="fal fa-user-lock pr-2"></i>Khóa tài khoản
                  </li>
                  <li
                    class="w-40 sub-item"
                    title="Lịch sử hoạt động"
                    @click="handleOpenInsurance()"
                  >
                    <i class="fal fa-notes-medical pr-2"></i>Cập nhật bảo hiểm
                  </li>
                  <li
                    class="w-40 sub-item"
                    @click="handleOpenConcurrently()"
                    title="Kiêm nhiệm"
                  >
                    <i class="fal fa-vote-yea pr-2"></i>Kiêm nhiệm
                  </li>
                  <li
                    class="w-40 sub-item"
                    @click="handleOpenReceive()"
                    title="Cập nhật tiếp nhận"
                  >
                    <i class="fal fa-list-alt pr-2"></i>Cập nhật tiếp nhận
                  </li>
                  <li
                    class="w-40 sub-item"
                    title="Tạo hơp đồng"
                    @click="
                      this.$router.push(`/add-contract/${personnelDetail.ID}`)
                    "
                  >
                    <i class="fal fa-file-contract pr-2"></i>Tạo hợp đồng
                  </li>
                  <li
                    class="w-40 sub-item"
                    @click="updatePersonnel()"
                    title="Sửa"
                  >
                    <i class="fal fa-edit pr-2"></i>Sửa
                  </li>
                  <li
                    class="w-40 sub-item"
                    @click="handleOpenConfirm()"
                    title="Xóa"
                  >
                    <i class="fal fa-trash pr-2"></i>Xóa
                  </li>
                  <li
                    class="w-40 sub-item"
                    title="Lịch sử hoạt động"
                    @click="handleOpenHistory()"
                  >
                    <i class="fal fa-history pr-2"></i>Lịch sử hoạt động
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav-feature>
    </template>
    <Transition duration="550" name="nested">
      <div class="w-full" v-if="isLoading == false">
        <div title="Sơ yếu lý lịch">
          <the-tab :isSelected="selected == 'Sơ yếu lý lịch'">
            <div title="Thông tin chung" class="outer">
              <div class="detail-section-title">Thông tin chung</div>
              <div class="p-2 grid grid-cols-12 gap-2">
                <div class="col-span-2">
                  <img
                    :src="
                      personnelDetail && personnelDetail.account.length > 0
                        ? urlIamge + '/' + personnelDetail.account[0].avatars[0]
                        : defaultAvatar
                    "
                    alt=""
                    class="w-[175px] h-[175px] rounded-full"
                  />
                </div>
                <div class="col-span-10">
                  <table>
                    <tbody>
                      <tr>
                        <td class="cellTable w-56" width="15%">Họ và tên</td>
                        <td class="cellTable w-56" width="35%">
                          {{ personnelDetail.name }}
                        </td>
                        <td class="cellTable w-56" width="15%">
                          Mã NV/ Mã chấm công
                        </td>
                        <td class="cellTable w-56" width="35%">
                          {{ personnelDetail.code }}/
                          {{ personnelDetail.attendace_code }}
                        </td>
                      </tr>
                      <tr>
                        <td class="cellTable w-56">Ngày sinh</td>
                        <td class="cellTable w-56">
                          {{ formatDate(personnelDetail.birthday) }}
                        </td>
                        <td class="cellTable w-56">Giới tính</td>
                        <td class="cellTable w-56">
                          {{ formatGender(personnelDetail.gender) }}
                        </td>
                      </tr>
                      <tr>
                        <td class="cellTable w-56">Tình trạng hôn nhân</td>
                        <td class="cellTable w-56">
                          {{ formatMarital(personnelDetail.marital_status) }}
                        </td>
                        <td class="cellTable w-56">Quốc tịch</td>
                        <td class="cellTable w-56">Việt Nam</td>
                      </tr>
                      <tr>
                        <td class="cellTable w-56">Điện thoại</td>
                        <td class="cellTable w-56">
                          {{ formatPhone(personnelDetail.mobile) }}
                        </td>
                        <td class="cellTable w-56">Email</td>
                        <td class="cellTable w-56">
                          {{ personnelDetail.personal_email }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div title="Thông tin khác" class="inner">
              <div class="detail-section-title">Thông tin khác</div>
              <div class="w-full">
                <table class="w-full">
                  <tbody>
                    <tr>
                      <td class="cellTable" width="15%">Dân tộc</td>
                      <td class="cellTable" width="35%">
                        {{ formatPeople(personnelDetail.people) }}
                      </td>
                      <td class="cellTable" width="15%">Tôn giáo</td>
                      <td class="cellTable" width="35%">
                        {{ formatReligious(personnelDetail.religious) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">CMT/Căn cước/Hộ chiếu</td>
                      <td class="cellTable">
                        {{ personnelDetail.private_code }}
                      </td>
                      <td class="cellTable">Ngày cấp, Nơi cấp</td>
                      <td class="cellTable">
                        {{ formatDate(personnelDetail.private_code_date) }} ,
                        {{ formatLocation(personnelDetail.private_code_place) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Nơi sinh</td>
                      <td class="cellTable">
                        {{
                          formatPlacePersonnel(
                            personnelDetail.place_of_birth_ward,
                            personnelDetail.place_of_birth_district,
                            personnelDetail.place_of_birth_city
                          )
                        }}
                      </td>
                      <td class="cellTable">Nguyên quán</td>
                      <td class="cellTable">
                        {{
                          formatPlacePersonnel(
                            personnelDetail.origin_ward,
                            personnelDetail.origin_district,
                            personnelDetail.origin_city
                          )
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Chỗ ở hiện nay</td>
                      <td class="cellTable">
                        {{
                          formatPlacePersonnel(
                            personnelDetail.current_address_ward,
                            personnelDetail.current_address_district,
                            personnelDetail.current_address_city
                          )
                        }}
                      </td>
                      <td class="cellTable">Thường trú</td>
                      <td class="cellTable">
                        {{
                          formatPlacePersonnel(
                            personnelDetail.home_address_ward,
                            personnelDetail.home_address_district,
                            personnelDetail.home_address_city
                          )
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable align-baseline">
                        Mã số thuế cá nhân
                      </td>
                      <td class="cellTable">
                        {{ personnelDetail.job_tax }}
                      </td>
                      <td class="cellTable align-baseline">TK ngân hàng</td>
                      <div
                        v-for="(item, index) in personnelDetail.json_banks"
                        :key="index"
                      >
                        <td class="cellTable">
                          Số TK : {{ item.bank_account }}- Chủ TK :
                          {{ item.bank_account_name }}<br />
                          Tên NH : {{ item.bank_name }}- Chi nhánh :
                          {{ item.bank_address }}
                        </td>
                      </div>
                    </tr>
                    <tr>
                      <td class="cellTable">Trình độ phổ thông</td>
                      <td class="cellTable">
                        {{ formatLevelSchool(personnelDetail.level_school) }}
                      </td>
                      <td class="cellTable">Trình độ học vấn cao nhất</td>
                      <td class="cellTable">
                        {{ formatAcademic(personnelDetail.level_academic) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div title="Thông tin gia đình & người phụ thuộc">
              <div class="detail-section-title">
                Thông tin gia đình & người phụ thuộc
              </div>
              <div
                class="form-plus-over"
                v-if="personnelDetail.json_family?.length"
              >
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
                    v-for="(family, index) in personnelDetail.json_family"
                    :key="index"
                    class="border-b"
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
              <div class="detail-section-title">Trình độ học vấn</div>
              <div
                class="form-plus-over"
                v-if="personnelDetail.json_degrees?.length"
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
                    v-for="(degress, index) in personnelDetail.json_degrees"
                    :key="index"
                  >
                    <td class="cellTable">
                      {{ formatDate(degress.degree_date_from) }}
                    </td>
                    <td class="cellTable">
                      {{ formatDate(degress.degree_date_to) }}
                    </td>
                    <td class="cellTable">{{ degress.degree_type_id }}</td>
                    <td class="cellTable">
                      {{ degress.degree_specialization }}
                    </td>
                    <td class="cellTable">{{ degress.degree_level_id }}</td>
                    <td class="cellTable">{{ degress.degress_place }}</td>
                  </tr></table-responsive
                >
              </div>
              <div class="text-left p-2" v-else>Không tìm thấy kết quả</div>
            </div>
            <div title="Kinh nghiệm làm việc">
              <div class="detail-section-title">Kinh nghiệm làm việc</div>
              <div
                class="form-plus-over"
                v-if="personnelDetail.json_experience?.length"
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
                    v-for="(
                      experience, index
                    ) in personnelDetail.json_experience"
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
              <div class="detail-section-title">Lịch sử đảng viên</div>
              <div
                class="form-plus-over"
                v-if="personnelDetail.json_communist?.length"
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
                    v-for="(com, index) in personnelDetail.json_communist"
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
              <div class="detail-section-title">
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
            <div title="Công việc" v-if="isLoadingTab == false">
              <div class="detail-section-title">Công việc</div>
              <div class="w-full">
                <table class="w-full">
                  <tbody>
                    <tr>
                      <td class="cellTable" width="15%">Trạng thái</td>
                      <td class="cellTable" width="35%">
                        <div
                          class="beacon"
                          :class="formatColorWork(personnelDetail?.job_status)"
                        >
                          {{ formatStatusWork(personnelDetail?.job_status) }}
                        </div>
                      </td>
                      <td class="cellTable" width="15%">Phòng ban</td>
                      <td class="cellTable" width="35%">
                        {{ personnelDetail?.department?.title }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Vị trí</td>
                      <td class="cellTable">
                        {{ personnelDetail?.position?.title }}
                      </td>
                      <td class="cellTable">Chức vụ</td>
                      <td class="cellTable">
                        {{ personnelDetail?.job_title_current?.title }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Ngày vào</td>
                      <td class="cellTable">
                        {{ formatDate(personnelDetail.job_date_join) }}
                      </td>
                      <td class="cellTable">Ngày vào chính thức</td>
                      <td class="cellTable">
                        {{ formatDate(personnelDetail.job_reldate_join) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Tên hợp đồng</td>
                      <td class="cellTable">
                        {{
                          formatContract(personnelContractDetail?.contract_type)
                        }}
                      </td>
                      <td class="cellTable">Nơi làm việc</td>
                      <td class="cellTable">
                        {{ personnelDetail?.work_place_current?.title }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Ngạch lương</td>
                      <td class="cellTable">
                        {{ personnelContractDetail?.quantum_id }}
                      </td>
                      <td class="cellTable">Cấp bậc</td>
                      <td class="cellTable">{{}}</td>
                    </tr>
                    <tr>
                      <td class="cellTable">Tài khoản</td>
                      <td class="cellTable">
                        <span
                          style="color: var(--color-primary)"
                          class="font-medium cursor-pointer"
                          @click="
                            this.$router.push(
                              `/social/user/${personnelDetail?.account[0]?.ID}`
                            )
                          "
                        >
                          {{ personnelDetail?.account[0]?.username }}</span
                        >
                      </td>
                      <td class="cellTable">Nhóm người dùng</td>
                      <td class="cellTable">
                        {{ personnelDetail?.account[0]?.group_name }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Ngày tạo TK</td>
                      <td class="cellTable">
                        {{
                          formatDate(personnelDetail?.date_activated_account)
                        }}
                      </td>
                      <td class="cellTable"></td>
                      <td class="cellTable"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div title="Kiêm nhiệm" v-if="isLoadingTab == false">
              <div class="detail-section-title">Kiêm nhiệm</div>
              <div
                class="form-plus-over"
                v-if="personnelDetail.concurrents?.length"
              >
                <table-responsive
                  :header="[
                    'Ngày bắt đầu',
                    'Ngày kết thúc',
                    'Phòng ban kiêm nhiệm',
                    'Vị trí',
                    'Chức vụ',
                  ]"
                  :isShow="false"
                >
                  <tr
                    v-for="(history, index) in personnelDetail.concurrents"
                    :key="index"
                    class="border-b"
                  >
                    <td class="cellTable">
                      {{ formatDate(history.date_start) }}
                    </td>
                    <td class="cellTable">
                      {{ formatDate(history.date_end) }}
                    </td>
                    <td class="cellTable">
                      {{ history.department_name }}
                    </td>
                    <td class="cellTable">
                      {{ history.position_title }}
                    </td>
                    <td class="cellTable">
                      {{ history.job_title_name.title }}
                    </td>
                  </tr></table-responsive
                >
              </div>
              <div v-else class="p-2 text-left">Không tìm thấy kết quả</div>
            </div>
            <div title="Lịch sử công việc" v-if="isLoadingTab == false">
              <div class="detail-section-title">Lịch sử công việc</div>
              <div class="form-plus-over" v-if="HistoryWork?.length">
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
                  <tr
                    v-for="(history, index) in HistoryWork"
                    :key="index"
                    :class="{ greenText: history.is_last_contract == 1 }"
                    class="border-b"
                  >
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
              <div v-else class="p-2 text-left">Không tìm thấy kết quả</div>
            </div>
          </the-tab>
        </div>
        <div title="Bảo hiểm">
          <the-tab :isSelected="selected == 'Bảo hiểm'">
            <div title="Thông tin bảo hiểm">
              <div class="detail-section-title">Thông tin bảo hiểm</div>
              <div class="w-full">
                <table class="w-full">
                  <tbody>
                    <tr>
                      <td class="cellTable" width="25%">Số sổ BHXH</td>
                      <td class="cellTable" width="25%">
                        {{ personnelDetail.premium_number }}
                      </td>
                      <td class="cellTable" width="25%">Số thẻ BHYT</td>
                      <td class="cellTable" width="25%">
                        {{ personnelDetail.premium_card }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable" width="25%">Mã tỉnh cấp</td>
                      <td class="cellTable" width="25%">
                        {{ personnelDetail.premium_code }}
                      </td>
                      <td class="cellTable" width="25%">
                        Đăng kí khám chữa bệnh
                      </td>
                      <td class="cellTable" width="25%">
                        {{ personnelDetail.premium_place }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable" width="25%">Trạng thái sổ</td>
                      <td class="cellTable" width="25%">
                        {{ personnelDetail.premium_insurance_status }}
                      </td>
                      <td class="cellTable" width="25%">Pháp nhân đóng</td>
                      <td class="cellTable" width="25%">
                        {{ formatLegal(personnelDetail.premium_personnel) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div title="Nghiệp vụ báo tăng">
              <div class="detail-section-title">Nghiệp vụ báo tăng</div>
              <div class="w-full">
                <table class="w-full">
                  <tbody>
                    <tr>
                      <td class="cellTable" width="25%">NV hoàn thiện HS</td>
                      <td class="cellTable" width="25%">
                        {{ formatDate(personnelDetail.insup_date_get) }}
                      </td>
                      <td class="cellTable" width="25%">NV hoàn thiện HS</td>
                      <td class="cellTable" width="25%">
                        {{ formatDate(personnelDetail.insup_date_complete) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable" width="25%">Ngày nhận thẻ BHYT</td>
                      <td class="cellTable" width="25%">
                        {{ formatDate(personnelDetail.insup_date_close) }}
                      </td>
                      <td class="cellTable" width="25%">Ngày trả thẻ BHYT</td>
                      <td class="cellTable" width="25%">
                        {{ formatDate(personnelDetail.insup_date_return) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div title="Nghiệp vụ báo giảm">
              <div class="detail-section-title">Nghiệp vụ báo giảm</div>
              <div class="w-full">
                <table class="w-full">
                  <tbody>
                    <tr>
                      <td class="cellTable" width="25%">
                        Ngày nhận sổ BH từ NLĐ
                      </td>
                      <td class="cellTable" width="25%">
                        {{ formatDate(personnelDetail.insdown_date_close) }}
                      </td>
                      <td class="cellTable" width="25%">NS hoàn thiện HS</td>
                      <td class="cellTable" width="25%">
                        {{ formatDate(personnelDetail.insdown_date_complete) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable" width="25%">
                        Ngày nhận sổ BH đã chốt
                      </td>
                      <td class="cellTable" width="25%">
                        {{ formatDate(personnelDetail.insdown_date_return) }}
                      </td>
                      <td class="cellTable" width="25%">Ngày trả số cho NLĐ</td>
                      <td class="cellTable" width="25%">
                        {{ formatDate(personnelDetail.insdown_date_get) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div title="Lịch sử bảo hiểm">
              <div class="detail-section-title">Lịch sử bảo hiểm</div>
              <div
                v-if="personnelDetail.personnel_premium_history?.length"
                class="overflow-auto format-scroll whitespace-nowrap"
              >
                <table class="w-full">
                  <thead class="bg-slate-50 whitespace-nowrap">
                    <th class="cellTable">Từ ngày</th>
                    <th class="cellTable">Hình thức</th>
                    <th class="cellTable">Lý do</th>
                    <th class="cellTable">Pháp nhân đóng</th>
                    <th class="cellTable">Mức đóng</th>
                    <th class="cellTable">CT đóng</th>
                    <th class="cellTable">NLĐ đóng</th>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(
                        history, index
                      ) in personnelDetail.personnel_premium_history"
                      :key="index"
                      class="border-b"
                    >
                      <td class="cellTable">
                        {{ formatDate(history.date_from) }}
                      </td>
                      <td class="cellTable">
                        {{ formatTypePremium(history.type) }}
                      </td>
                      <td class="cellTable">{{ formatReason(history) }}</td>
                      <td class="cellTable">
                        {{ formatLegal(history.object_legal) }}
                      </td>
                      <td class="cellTable">
                        {{ formatPrice(history.salary_premium_base) }}
                      </td>
                      <td class="cellTable">
                        {{ formatPrice(history.salary_premium_company) }}
                      </td>
                      <td class="cellTable">
                        {{ formatPrice(history.salary_premium_person) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else class="text-left p-2">Không tìm thấy kết quả</div>
            </div>
            <div title="Lịch sử giải quyết chế độ">
              <div class="detail-section-title">Lịch sử giải quyết chế độ</div>
              <div
                v-if="personnelDetail.personnel_insurance_solve_history?.length"
              ></div>
              <div v-else class="text-left p-2">Không tìm thấy kết quả</div>
            </div>
          </the-tab>
        </div>
        <div title="Hợp đồng">
          <the-tab
            :isSelected="selected == 'Hợp đồng'"
            v-if="loadTab_4 == false"
            ><div class="detail-section-title">Danh sách hợp đồng</div>
            <div class="form-plus-over" v-if="listContracts?.length">
              <table-responsive
                :header="[
                  'Người tạo',
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
                  v-for="(history, index) in listContracts"
                  :key="index"
                  :class="{ redText: history.is_last_contract == 0 }"
                  @contextmenu.prevent="rightClick($event, history)"
                  class="border-b"
                >
                  <td class="cellTable">{{ history.created_by_name }}</td>
                  <td
                    class="cellTable cursor-pointer"
                    @click="ShowDetailContract(history.ID)"
                  >
                    {{ history.contract_code }}
                  </td>
                  <td
                    class="cellTable cursor-pointer"
                    @click="ShowDetailContract(history.ID)"
                  >
                    {{ formatContract(history.contract_type) }}
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
            <div v-else class="text-left p-2">Không tìm thấy kết quả</div>
          </the-tab>
        </div>
        <div title="Lương & phụ cấp">
          <the-tab :isSelected="selected == 'Lương & phụ cấp'">
            <div class="text-left p-2">Không tìm thấy kết quả</div>
          </the-tab>
        </div>
        <div title="Tiếp nhận">
          <the-tab :isSelected="selected == 'Tiếp nhận'">
            <div class="text-left">
              <h3 class="detail-section-title">Thủ tục tiếp nhận</h3>
              <div class="grid grid-cols-6 gap-4 p-2">
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
                  <label :for="receive.ID" class="cursor-pointer ml-1">{{
                    receive.title
                  }}</label>
                </div>
              </div>
            </div>
          </the-tab>
        </div>
        <div title="Tài sản">
          <the-tab :isSelected="selected == 'Tài sản'">
            <div class="text-left p-2">Không tìm thấy kết quả</div>
          </the-tab>
        </div>
        <div title="Đào tạo">
          <the-tab :isSelected="selected == 'Đào tạo'">
            <div class="text-left p-2">Không tìm thấy kết quả</div>
          </the-tab>
        </div>
        <div title="Khen thưởng & kỷ luật">
          <the-tab :isSelected="selected == 'Khen thưởng & kỷ luật'">
            <div class="text-left p-2">Không tìm thấy kết quả</div>
          </the-tab>
        </div>
        <div title="Đánh giá">
          <the-tab :isSelected="selected == 'Đánh giá'">
            <div class="text-left p-2">Không tìm thấy kết quả</div>
          </the-tab>
        </div>
      </div>
    </Transition>
  </person-layout>
  <teleport to="#app">
    <!-- Start Cập nhật tiếp nhận -->
    <modal-view :isOpen="isOpenReceive" :handleCloseDetail="handleCloseReceive">
      <update-receive-vue
        :PersonnelDetail="personnelDetail"
        :CloseReceive="handleCloseReceive"
      ></update-receive-vue>
    </modal-view>
    <!-- End Cập nhật tiếp nhận -->
    <!-- Start cập nhật công việc -->
    <modal-view :isOpen="isOpenWork" :handleCloseDetail="handleCloseWork">
      <update-work-vue
        :PersonnelDetail="personnelDetail"
        :CloseWork="handleCloseWork"
      >
      </update-work-vue>
    </modal-view>
    <!-- End cập nhật công việc -->
    <!-- Start cập nhật trạng thái -->
    <modal-view :isOpen="isOpenStatus" :handleCloseDetail="handleCloseStatus">
      <update-status-vue
        :PersonnelDetail="personnelDetail"
        :CloseStatus="handleCloseStatus"
      >
      </update-status-vue>
    </modal-view>
    <!-- End cập nhật trạng thái -->
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="deletePersonnel"
    >
    </modal-delete>
    <modal-delete
      :isOpen="isOpenConfirmContract"
      :handleCloseDetail="handleCloseConfirmContract"
      :ConfirmDelete="DeleteContract"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
    <!-- Start kiêm nhiệm -->
    <modal-view
      :isOpen="isOpenConcurrently"
      :handleCloseDetail="handleCloseConcurrently"
    >
      <update-concurrently
        :PersonnelDetail="personnelDetail"
        :CloseConcurrently="handleCloseConcurrently"
      >
      </update-concurrently>
    </modal-view>
    <!-- End kiêm nhiệm -->
    <!-- Start lịch sử hoạt động -->
    <modal-view :isOpen="isOpenHistory" :handleCloseDetail="handleCloseHistory">
      <history-work></history-work>
    </modal-view>
    <!-- End lịch sử hoạt động -->
    <!-- Start bảo hiểm -->
    <modal-view
      :isOpen="isOpenInsurance"
      :handleCloseDetail="handleCloseInsurance"
    >
      <update-insurance
        :PersonnelDetail="personnelDetail"
        :CloseInsurance="handleCloseInsurance"
      ></update-insurance>
    </modal-view>
    <!-- End bảo hiểm -->
  </teleport>

  <loading-overlay :isLoading="isLoadingTab"></loading-overlay>
  <context-menu :isActive="isActive">
    <ul>
      <li @click.prevent="EditContract()">
        <i class="fal fa-edit"></i> <a href="#">Sửa</a>
      </li>
      <li @click.prevent="handleOpenConfirmContract()">
        <i class="fal fa-trash"></i><a href="#">Xóa</a>
      </li>
      <li
        title="Tạo hơp đồng"
        @click.prevent="
          this.$router.push(`/add-contract/${contractDetail.personnel_id}`)
        "
      >
        <i class="fal fa-file-contract pr-2"></i>Tạo mới hợp đồng
      </li>
      <li @click.prevent="handleLiquidationContract()">
        <i class="fal fa-repeat"></i><a href="#">Thanh lý</a>
      </li>
      <li @click.prevent="handleConfirmContract()">
        <i class="fal fa-check"></i><a href="#">Có hiệu lực</a>
      </li>
    </ul>
  </context-menu>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
  <loading-overlay
    :isLoading="isLoadingLoad"
    :handleEndLoading="EndTimeLoadingLoad"
  ></loading-overlay>
</template>

<script>
import TableResponsive from "@/components/table/TableResponsive.vue";
import TabNav from "@/components/tab/TabNav.vue";
import TheTab from "@/components/tab/TheTab.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarPersonnel from "@/components/sidebar/SidebarPersonnel.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import UpdateReceiveVue from "./UpdateModal/UpdateReceive.vue";
import UpdateWorkVue from "./UpdateModal/UpdateWork.vue";
import UpdateStatusVue from "./UpdateModal/UpdateStatus.vue";
import UpdateConcurrently from "./UpdateModal/UpdateConcurrently.vue";
import HistoryWork from "./UpdateModal/HistoryWork.vue";
import UpdateInsurance from "./UpdateModal/UpdateInsurance.vue";
import { URL_IMG } from "@/constants/ApiUrl";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed, watch } from "@vue/runtime-core";
import {
  // FormatBank,
  FormatColorApproval,
  FormatColorContract,
  FormatColorWork,
  FormatDate,
  FormatGender,
  FormatMaritalStatus,
  FormatModalX,
  FormatModalY,
  FormatPlacePersonnel,
  FormatPrice,
  FormatStatusContract,
  FormatStatusWork,
  FormatTitle,
  FormatTrueFalse,
} from "@/constants/FormatAll";
import { AVATAR_PRIVATE_DEFAULT } from "@/constants/ApiUrl";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useBanks } from "@/store/modules/settingPersonnel/banks";
import { useEthinicReligion } from "@/store/modules/settingPersonnel/ethnic-religion";
import { useAcademic } from "@/store/modules/personnelView/academics";
import { useFamilyRelationship } from "@/store/modules/settingPersonnel/familyRelationship";
import { useContract } from "@/store/modules/contract/contracts";
import { storeToRefs } from "pinia";
export default {
  components: {
    TabNav,
    PersonLayout,
    SidebarPersonnel,
    NavbarSocial,
    NavFeature,
    TheTab,
    TableResponsive,
    UpdateReceiveVue,
    UpdateWorkVue,
    UpdateStatusVue,
    UpdateConcurrently,
    HistoryWork,
    UpdateInsurance,
  },
  data() {
    return {
      defaultAvatar: AVATAR_PRIVATE_DEFAULT,
    };
  },
  methods: {
    formatPlacePersonnel(ward, district, city) {
      return FormatPlacePersonnel(ward, district, city);
    },
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
    formatLevelSchool(id) {
      if (id) {
        return id + "/12";
      } else {
        return "";
      }
    },
    formatPeople(id) {
      return FormatTitle(id, this.listEthnics);
    },
    formatLocation(id) {
      return FormatTitle(id, this.listLocation);
    },
    // formatBank(arr) {
    //   // return FormatBank(obj, this.listBanks);
    //   let bank = "";
    //   for (var i = 0; i <= arr?.length; i++) {
    //     arr[i]
    //   }
    // },
    formatAcademic(id) {
      return FormatTitle(id, this.listAcademic);
    },
    formatFamily(id) {
      return FormatTitle(id, this.listFamilyRelationship);
    },
    formatContract(id) {
      if (id) {
        return FormatTitle(id, this.listContractTypes);
      } else {
        return "";
      }
    },
    formatWorkplace(id) {
      return FormatTitle(id, this.listWorkplace);
    },
    formatColor(status) {
      return FormatColorApproval(status);
    },
    formatColorContract(status) {
      return FormatColorContract(status);
    },
    formatMessagesContract(status) {
      return FormatStatusContract(status);
    },
    formatPhone(arr) {
      let phone = "";
      if (arr) {
        for (let i = 0; i < arr?.length; i++) {
          phone = phone + arr[i] + " , ";
        }
        return phone.slice(0, -2);
      } else {
        return "";
      }
    },
    formatColorWork(stt) {
      return FormatColorWork(stt);
    },
    formatStatusWork(stt) {
      return FormatStatusWork(stt);
    },
    formatTypePremium(type) {
      if (type == 0) {
        return "Báo tăng";
      } else if (type == 1) {
        return "Báo giảm";
      } else {
        return "";
      }
    },
    formatReason(obj) {
      if (obj.type == 0) {
        const key = this.ReasonIncrease.find((item) => item.ID == obj.reason);
        if (key) {
          return key.title;
        } else {
          return "";
        }
      } else if (obj.type == 1) {
        const key = this.ReasonDecrease.find((item) => item.ID == obj.reason);
        if (key) {
          return key.title;
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    formatLegal(stt) {
      if (stt == 0) {
        return "Công ty cổ phần đầu tư thương mại bách tường phát";
      } else if (stt == 1) {
        return "Chi nhánh miền Bắc";
      } else if (stt == 2) {
        return "Chi nhánh miền Nam";
      } else {
        return "";
      }
    },
    formatPrice(price) {
      return FormatPrice(price);
    },
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const loadTab_2 = ref(true);
    const loadTab_4 = ref(true);
    const isLoading = ref(true);
    const isLoadingLoad = ref(false);
    const isLoadingTab = ref(false);
    const selected = ref("Sơ yếu lý lịch");
    const selectedEdit = ref("Thông tin");
    const isOpenReceive = ref(false);
    const isOpenWork = ref(false);
    const isOpenStatus = ref(false);
    const isOpenConfirm = ref(false);
    const isOpenConfirmContract = ref(false);
    const isOpenConcurrently = ref(false);
    const isOpenHistory = ref(false);
    const isOpenInsurance = ref(false);
    const isActive = ref(false);
    const contractDetail = ref();
    const isLiquidation = ref(true);
    const isIsvalid = ref(true);
    const banks = useBanks();
    const EthinicReligion = useEthinicReligion();
    const academic = useAcademic();
    const family = useFamilyRelationship();
    const contract = useContract();
    const { listFamilyRelationship } = storeToRefs(family);
    const { listAcademic } = storeToRefs(academic);
    const urlIamge = ref(URL_IMG);
    const { listEthnics, listReligions, listLevelSchool } =
      storeToRefs(EthinicReligion);
    const { listBanks } = storeToRefs(banks);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EndTimeLoadingLoad = () => {
      isLoadingLoad.value = false;
    };
    store.dispatch("personnels/getPersonnelDetailAction", {
      id: route.params.personnelID,
      EndTimeLoading: EndTimeLoading,
    });
    store.dispatch(
      "personnels/GetAllHistoryWorkAction",
      route.params.personnelID
    );
    store.dispatch("places/getAllCityAction");
    const setSelected = (tab) => {
      selected.value = tab;
    };
    const setSelectedEdit = (tab) => {
      selectedEdit.value = tab;
    };
    const checkRoute = (index) => {
      if (index == route.params.slug) {
        return true;
      } else {
        return false;
      }
    };
    const img_1 = computed(() => store.state.personnels.img_1);
    const img_2 = computed(() => store.state.personnels.img_2);
    const personnelDetail = computed(
      () => store.state.personnels.personnelDetail
    );
    const personnelContractDetail = computed(
      () => store.state.personnels.personnelContractDetail
    );
    const HistoryWork = computed(() => store.state.personnels.HistoryWork);
    const listContracts = computed(() => store.state.personnels.listContracts);
    const listLocation = computed(() => store.state.places.listCity);
    const listPositiontitles = computed(
      () => store.state.positiontitles.listPositiontitles
    );
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
    const listSalryRange = computed(
      () => store.state.salaryRange.listSalryRange
    );
    const ReasonIncrease = computed(
      () => store.state.personnels.ReasonIncrease
    );
    const ReasonDecrease = computed(
      () => store.state.personnels.ReasonDecrease
    );
    setTimeout(() => {
      if (listFamilyRelationship.value?.length == 0) {
        family.getAllFamilyRelationshipAction();
      }
      if (listReligions.value?.length == 0) {
        EthinicReligion.GetAllReligionAction();
      }
      if (listContractTypes.value?.length == 0) {
        store.dispatch("contractTypes/GetAllContractTypeAction", 50);
      }
      setTimeout(() => {
        if (listBanks.value?.length == 0) {
          banks.GetAllBanksAction();
        }
        if (listEthnics.value?.length == 0) {
          EthinicReligion.GetAllEthnicsAction();
        }
        if (listAcademic.value?.length == 0) {
          academic.GetAllAcademicsAction();
        }
      }, 500);
    }, 500);
    watch(selected, (to) => {
      if (to == "Công việc") {
        loadTab_2.value = false;
        isLoadingTab.value = true;
        setTimeout(() => {
          isLoadingTab.value = false;
        }, 300);
      }
      if (to == "Hợp đồng") {
        loadTab_4.value = false;
      }
      if (to == "Tiếp nhận") {
        store.dispatch("categories/getAllReceiveAction", 100);
      }
    });
    const updateProfile = () => {
      alert("Tính năng đang phát triển");
    };
    const updatePersonnel = () => {
      router.push({
        path: `/personnel-profile-edit/${route.params.personnelID}`,
      });
    };
    const rightClick = (e, total) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        contractDetail.value = total;
        if (total.staus == 4) {
          isLiquidation.value = true;
        } else {
          isLiquidation.value = false;
        }
        if (total.staus == 2) {
          isIsvalid.value = true;
        } else {
          isIsvalid.value = false;
        }
      }
    };
    const checkReceives = (id) => {
      if (personnelDetail.value.receives?.length) {
        const key = personnelDetail.value.receives.find(
          (item) => item.ID == id
        );
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
      if (personnelDetail.value.jobouts?.length) {
        const key = personnelDetail.value.jobouts.find((item) => item.ID == id);
        if (key) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };
    const handleCloseReceive = () => {
      isOpenReceive.value = false;
    };
    const handleOpenReceive = () => {
      isOpenReceive.value = true;
    };
    const handleCloseWork = () => {
      isOpenWork.value = false;
    };
    const handleOpenWork = () => {
      isOpenWork.value = true;
    };
    const handleCloseStatus = () => {
      isOpenStatus.value = false;
    };
    const handleOpenStatus = () => {
      isOpenStatus.value = true;
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const handleCloseConfirmContract = () => {
      isOpenConfirmContract.value = false;
    };
    const handleOpenConfirmContract = () => {
      isOpenConfirmContract.value = true;
    };
    const handleCloseConcurrently = () => {
      isOpenConcurrently.value = false;
    };
    const handleOpenConcurrently = () => {
      isOpenConcurrently.value = true;
    };
    const handleCloseHistory = () => {
      isOpenHistory.value = false;
    };
    const handleOpenHistory = () => {
      isOpenHistory.value = true;
    };
    const handleCloseInsurance = () => {
      isOpenInsurance.value = false;
    };
    const handleOpenInsurance = () => {
      isOpenInsurance.value = true;
    };
    const deletePersonnel = () => {
      store.dispatch("personnels/deletePersonnelAction", {
        id: route.params.personnelID,
        route,
        router,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
    };
    const ShowDetailContract = (id) => {
      router.push(`/contract-detail/${id}`);
    };
    const EditContract = () => {
      router.push(`/update-contract/${contractDetail.value.ID}`);
    };
    const DeleteContract = () => {
      contract.DeleteContractAction({
        id: contractDetail.value.ID,
        toast,
        route,
        router,
        handleCloseConfirmContract,
        EndTimeLoading,
      });
    };
    const handleLiquidationContract = () => {
      isLoadingLoad.value = true;
      store.dispatch("personnels/ChangeStatusToliquidationAction", {
        idContract: contractDetail.value.ID,
        idPersonnel: route.params.personnelID,
        toast,
        EndTimeLoading: EndTimeLoadingLoad,
      });
    };
    const handleConfirmContract = () => {
      isLoadingLoad.value = true;
      store.dispatch("personnels/ChangeStatusToIsvalidAction", {
        idContract: contractDetail.value.ID,
        idPersonnel: route.params.personnelID,
        toast,
        EndTimeLoading: EndTimeLoadingLoad,
      });
    };
    const handleBlockAccount = () => {
      isLoadingLoad.value = true;
      store.dispatch("users/BlockAccountDetailAction", {
        id: personnelDetail.value.account[0]?.ID,
        toast,
        EndTimeLoading: EndTimeLoadingLoad,
      });
    };
    return {
      checkOut,
      checkReceives,
      EditContract,
      isLiquidation,
      isIsvalid,
      HistoryWork,
      selected,
      selectedEdit,
      isLoading,
      loadTab_2,
      loadTab_4,
      isLoadingTab,
      personnelDetail,
      personnelContractDetail,
      listContracts,
      listEthnics,
      listReligions,
      listLocation,
      listBanks,
      listLevelSchool,
      listAcademic,
      listFamilyRelationship,
      listPositiontitles,
      listContractTypes,
      listWorkplace,
      listReceives,
      listQuits,
      img_1,
      img_2,
      urlIamge,
      listSalryRange,
      isOpenReceive,
      isOpenWork,
      isOpenStatus,
      ReasonIncrease,
      ReasonDecrease,
      isOpenConfirm,
      isOpenConcurrently,
      isActive,
      contractDetail,
      isOpenConfirmContract,
      isLoadingLoad,
      isOpenHistory,
      isOpenInsurance,
      DeleteContract,
      updatePersonnel,
      setSelected,
      setSelectedEdit,
      checkRoute,
      updateProfile,
      EndTimeLoading,
      handleCloseReceive,
      handleOpenReceive,
      handleCloseWork,
      handleOpenWork,
      handleCloseStatus,
      handleOpenStatus,
      handleCloseConfirm,
      handleOpenConfirm,
      deletePersonnel,
      ShowDetailContract,
      handleCloseConcurrently,
      handleOpenConcurrently,
      rightClick,
      handleCloseConfirmContract,
      handleOpenConfirmContract,
      handleLiquidationContract,
      EndTimeLoadingLoad,
      handleConfirmContract,
      handleOpenHistory,
      handleCloseHistory,
      handleCloseInsurance,
      handleOpenInsurance,
      handleBlockAccount,
    };
  },
};
</script>

<style>
.greenText {
  color: #008000;
}
.redText {
  color: #e53935;
}
</style>
