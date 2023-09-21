<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-recruitment></sidebar-recruitment>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center">
            <buttton-create-recruitment></buttton-create-recruitment>
            <p class="longText">Tạo mới hồ sơ ứng viên</p>
          </div>
        </div></navbar-social
      >
    </template>
    <Transition duration="550" name="nested">
      <div
        class="w-full h-full text-left px-4 py-2 form-plus-over format-scroll"
        v-if="isLoading == false"
      >
        <div title="Thông tin chung">
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
            Thông tin cá nhân
          </h4>
          <Transition name="slide-up">
            <div v-show="isInfor == true">
              <div class="form-small">
                <label for="" class="form-group-label"
                  >Chiến dịch tuyển dụng</label
                >
                <div>
                  <v-select
                    label="title"
                    :options="listRecruitmentCampaign"
                    :reduce="(campaign) => campaign.ID"
                    @input="LoadCampaign($event)"
                    v-model="Candidate.campaign_current_id"
                    placeholder="Chọn chiến dịch"
                  ></v-select>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 form-small">
                <div>
                  <label for="" class="form-group-label"
                    >Mã ứng viên<span class="text-red-600">*</span></label
                  >
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Nhập mã"
                      v-model="Candidate.code"
                    />
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">Nguồn</label>
                  <div>
                    <v-select
                      v-model="Candidate.source"
                      placeholder="Chọn nguồn"
                    ></v-select>
                  </div>
                </div>
              </div>
              <div class="form-small">
                <label for="" class="form-group-label">Họ và tên</label>
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập họ tên"
                    v-model="Candidate.name"
                  />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 form-small">
                <div>
                  <label for="" class="form-group-label">Ngày sinh</label>
                  <div>
                    <date-picker v-model="Candidate.birthday"></date-picker>
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">Giới tính</label>
                  <div>
                    <v-select
                      label="title"
                      :options="dataGender"
                      :reduce="(gender) => gender.value"
                      placeholder="Chọn giới tính"
                      v-model="Candidate.gender"
                      :searchable="false"
                    ></v-select>
                  </div>
                </div>
              </div>
              <div class="form-large">
                <label for="" class="form-group-label">Nơi sinh</label>
                <div class="grid grid-cols-3 gap-2">
                  <div>
                    <v-select
                      label="title"
                      :options="listCity"
                      :reduce="(city) => city.ID"
                      @click.once="loadAllCity()"
                      @option:selected="changeCity($event)"
                      placeholder="Chọn tỉnh/thành phố"
                      v-model="Candidate.place_of_birth_state_id"
                    ></v-select>
                  </div>
                  <div>
                    <v-select
                      label="title"
                      :options="listDistricts"
                      :reduce="(district) => district.ID"
                      @option:selected="changeDistrict($event)"
                      placeholder="Chọn quận/huyện"
                      v-model="Candidate.place_of_birth_district_id"
                    ></v-select>
                  </div>
                  <div>
                    <v-select
                      label="title"
                      :options="listWards"
                      :reduce="(ward) => ward.ID"
                      placeholder="Chọn xã/phường"
                      v-model="Candidate.place_of_birth_ward_id"
                    ></v-select>
                  </div>
                </div>
              </div>
              <div class="form-large">
                <label for="" class="form-group-label">Nguyên quán</label>
                <div class="grid grid-cols-3 gap-2">
                  <div>
                    <v-select
                      label="title"
                      :options="listCity"
                      :reduce="(city) => city.ID"
                      @click.once="loadAllCity()"
                      @option:selected="changeCityOrigin($event)"
                      placeholder="Chọn tỉnh/thành phố"
                      v-model="Candidate.origin_state_id"
                    ></v-select>
                  </div>
                  <div>
                    <v-select
                      label="title"
                      :options="listDistrictsOrigin"
                      :reduce="(district) => district.ID"
                      @option:selected="changeDistrictOrigin($event)"
                      placeholder="Chọn quận/huyện"
                      v-model="Candidate.origin_district_id"
                    ></v-select>
                  </div>
                  <div>
                    <v-select
                      label="title"
                      :options="listWardsOrigin"
                      :reduce="(ward) => ward.ID"
                      placeholder="Chọn xã/phường"
                      v-model="Candidate.origin_ward_id"
                    ></v-select>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 form-small">
                <div>
                  <label for="" class="form-group-label"
                    >CMT/Căn cước/Hộ chiếu</label
                  >
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Nhập mã"
                      v-model="Candidate.private_code"
                    />
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">Ngày cấp</label>
                  <div>
                    <date-picker
                      v-model="Candidate.private_code_date"
                    ></date-picker>
                  </div>
                </div>
              </div>
              <div class="form-small">
                <label for="" class="form-group-label">Nơi cấp</label>
                <div>
                  <v-select
                    label="title"
                    :options="listCity"
                    :reduce="(place) => place.ID"
                    v-model="Candidate.private_code_place"
                    placeholder="Chọn nơi cấp"
                  ></v-select>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 form-small">
                <div>
                  <label for="" class="form-group-label"
                    >Tình trạng hôn nhân</label
                  >
                  <div>
                    <v-select
                      label="title"
                      :options="dataMarital"
                      :reduce="(marital) => marital.value"
                      placeholder="Chọn tình trạng hôn nhân"
                      v-model="Candidate.marital_status"
                      :searchable="false"
                    ></v-select>
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">Quốc tịch</label>
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Nhập quốc tịch"
                      v-model="Candidate.nationality"
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 form-small">
                <div>
                  <label for="" class="form-group-label">Dân tộc</label>
                  <div>
                    <v-select
                      label="title"
                      :options="listEthnics"
                      :reduce="(people) => people.ID"
                      v-model="Candidate.people"
                      @click.once="LoadEthnics()"
                      placeholder="Chọn dân tộc"
                    ></v-select>
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">Tôn giáo</label>
                  <div>
                    <v-select
                      label="title"
                      :options="listReligions"
                      :reduce="(religion) => religion.ID"
                      v-model="Candidate.religious"
                      placeholder="Chọn tôn giáo"
                      @click.once="LoadReligions()"
                    ></v-select>
                  </div>
                </div>
              </div>
              <div class="form-small grid grid-cols-2 gap-2">
                <div>
                  <label for="" class="form-group-label">Chiều cao</label>
                  <div>
                    <input
                      type="number"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="cm"
                      v-model="Candidate.height"
                    />
                  </div>
                </div>

                <div>
                  <label for="" class="form-group-label">Cân nặng</label>
                  <div>
                    <input
                      type="number"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="kg"
                      v-model="Candidate.weight"
                    />
                  </div>
                </div>
              </div>
              <div class="form-small">
                <label for="" class="form-group-label"
                  >Giới thiệu bản thân</label
                >
                <div>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="3"
                    class="form-control-input"
                    placeholder="Sở thích, điểm mạnh, điểm yếu"
                    v-model="Candidate.desc_note"
                  ></textarea>
                </div>
              </div>
            </div>
          </Transition>
          <div v-show="isInfor == false">
            <h2
              @click="isInfor = !isInfor"
              class="cursor-pointer form-group-label"
            >
              Chiến dịch tuyển dụng, Mã UV *, Nguồn *, Người giới thiệu, Họ và
              tên *, Ngày sinh, Giới tính, Nơi sinh, Nguyên quán, CMT/Căn
              cước/Hộ chiếu, Ngày cấp.
            </h2>
          </div>
        </div>
        <div title="Thông tin liên hệ">
          <h4
            class="form-section-title form-small cursor-pointer"
            @click="isContact = !isContact"
          >
            <span v-show="isContact == true">
              <i class="fas fa-chevron-down cursor-pointer"></i>
            </span>
            <span v-show="isContact == false"
              ><i class="fas fa-chevron-right cursor-pointer"></i
            ></span>
            Thông tin liên hệ
          </h4>
          <Transition name="slide-up">
            <div v-show="isContact == true">
              <div class="form-small">
                <label for="" class="form-group-label"
                  >Nhập số điện thoại</label
                >
                <div>
                  <v-select
                    no-drop
                    taggable
                    multiple
                    placeholder="Nhập số điện thoại, enter để nhập nhiều"
                    v-model="Candidate.phone"
                  />
                </div>
              </div>
              <div class="form-small">
                <label for="" class="form-group-label">Nhập Email</label>
                <div>
                  <v-select
                    no-drop
                    taggable
                    multiple
                    placeholder="Nhập email, enter để nhập nhiều"
                    v-model="Candidate.email"
                  />
                </div>
              </div>
              <div class="grid grid-cols-12 gap-2 form-large-plus">
                <div class="col-span-10">
                  <label for="" class="form-group-label"
                    >Địa chỉ thường trú</label
                  >
                  <div class="grid grid-cols-3 gap-2">
                    <div>
                      <v-select
                        label="title"
                        :options="listCity"
                        :reduce="(city) => city.ID"
                        @click.once="loadAllCity()"
                        @option:selected="changeCityHome($event)"
                        placeholder="Chọn tỉnh/thành phố"
                        v-model="Candidate.home_address_state_id"
                      ></v-select>
                    </div>
                    <div>
                      <v-select
                        label="title"
                        :options="listDistrictsHome"
                        :reduce="(district) => district.ID"
                        @option:selected="changeDistrictHome($event)"
                        placeholder="Chọn quận/huyện"
                        v-model="Candidate.home_address_district_id"
                      ></v-select>
                    </div>
                    <div>
                      <v-select
                        label="title"
                        :options="listWardsHome"
                        :reduce="(ward) => ward.ID"
                        placeholder="Chọn xã/phường"
                        v-model="Candidate.home_address_ward_id"
                      ></v-select>
                    </div>
                  </div>
                </div>
                <div class="col-span-2">
                  <label for="" class="form-group-label">Thường trú</label>
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Số 10, Quang Trung..."
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-12 gap-2 form-large-plus">
                <div class="col-span-10">
                  <label for="" class="form-group-label">Chỗ ở hiện nay</label>
                  <div class="grid grid-cols-3 gap-2">
                    <div>
                      <v-select
                        label="title"
                        :options="listCity"
                        :reduce="(city) => city.ID"
                        @option:selected="changeCityCurrent($event)"
                        @click.once="loadAllCity()"
                        placeholder="Chọn tỉnh/thành phố"
                        v-model="Candidate.current_address_state_id"
                      ></v-select>
                    </div>
                    <div>
                      <v-select
                        label="title"
                        :options="listDistrictsCurrent"
                        :reduce="(district) => district.ID"
                        @option:selected="changeDistrictCurrent($event)"
                        placeholder="Chọn quận/huyện"
                        v-model="Candidate.current_address_district_id"
                      ></v-select>
                    </div>
                    <div>
                      <v-select
                        label="title"
                        :options="listWardsCurrent"
                        :reduce="(ward) => ward.ID"
                        placeholder="Chọn xã/phường"
                        v-model="Candidate.current_address_ward_id"
                      ></v-select>
                    </div>
                  </div>
                </div>
                <div class="col-span-2">
                  <label for="" class="form-group-label">Thường trú</label>
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Số 10, Quang Trung..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </Transition>
          <div v-show="isContact == false">
            <h2
              @click="isContact = !isContact"
              class="cursor-pointer form-group-label"
            >
              Điện thoại, Email, Thường trú, Địa chỉ, Chỗ ở hiện nay, Địa chỉ
            </h2>
          </div>
        </div>
        <div title="Thông tin gia đình">
          <h4
            class="form-section-title form-small cursor-pointer"
            @click="isFamily = !isFamily"
          >
            <span v-show="isFamily == true">
              <i class="fas fa-chevron-down cursor-pointer"></i>
            </span>
            <span v-show="isFamily == false"
              ><i class="fas fa-chevron-right cursor-pointer"></i
            ></span>
            Thông tin gia đình & người phụ thuộc
          </h4>
          <Transition name="slide-up">
            <div v-show="isFamily == true" class="form-plus">
              <div
                class="flex items-center form-plus"
                v-if="Candidate.json_family?.length"
              >
                <div class="form-mid-xs-small px-1">
                  <label for="" class="form-group-label">Mối quan hệ</label>
                </div>
                <div class="form-x-small px-1">
                  <label for="" class="form-group-label">Họ và tên</label>
                </div>
                <div class="form-mid-small px-1">
                  <label for="" class="form-group-label">Năm sinh</label>
                </div>
                <div class="form-mid-small px-1">
                  <label for="" class="form-group-label">Nghề nghiệp</label>
                </div>
                <div class="form-mid-small px-1">
                  <label for="" class="form-group-label">Điện thoại</label>
                </div>
                <div class="form-mid-small px-1">
                  <label for="" class="form-group-label">Địa chỉ</label>
                </div>
              </div>
              <div
                v-for="(infoFamily, index) in Candidate.json_family"
                :key="index"
                :name="index"
                class="form-plus flex items-center -mt-3"
              >
                <div class="form-mid-xs-small px-1">
                  <v-select
                    label="title"
                    :options="listFamilyRelationship"
                    :reduce="(relationship) => relationship.ID"
                    placeholder="Chọn mối quan hệ"
                    v-model="infoFamily.relative_id"
                    @click.once="LoadFamilyRelationship()"
                  ></v-select>
                </div>
                <div class="form-x-small px-1">
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nguyễn Văn A"
                    v-model="infoFamily.relative_name"
                  />
                </div>
                <div class="form-mid-small px-1">
                  <date-picker
                    v-model="infoFamily.relative_birthday"
                  ></date-picker>
                </div>
                <div class="form-mid-small px-1">
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Tự do"
                    v-model="infoFamily.relative_job"
                  />
                </div>
                <div class="form-mid-small px-1">
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="0987..."
                    v-model="infoFamily.relative_phone"
                  />
                </div>
                <div class="form-mid-small px-1">
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="địa chỉ"
                    v-model="infoFamily.relative_place"
                  />
                </div>
                <div>
                  <i
                    class="fal fa-times icon-close"
                    @click="removeFamily(index)"
                    style="margin-top: 0px"
                  ></i>
                </div>
              </div>
              <div class="my-2">
                <i
                  class="fal fa-plus-circle icon-plus"
                  @click="createFamily()"
                ></i>
              </div>
            </div>
          </Transition>
          <div v-show="isFamily == false">
            <h2
              @click="isFamily = !isFamily"
              class="cursor-pointer form-group-label"
            >
              Mối quan hệ, Họ và tên, Năm sinh, Nghề nghiệp, Điện thoại,..
            </h2>
          </div>
        </div>
        <div title="Trình độ học vấn">
          <h4
            class="form-section-title form-small cursor-pointer"
            @click="isSchool = !isSchool"
          >
            <span v-show="isSchool == true">
              <i class="fas fa-chevron-down cursor-pointer"></i>
            </span>
            <span v-show="isSchool == false"
              ><i class="fas fa-chevron-right cursor-pointer"></i
            ></span>
            Trình độ học vấn
          </h4>
          <Transition name="slide-up">
            <div v-show="isSchool == true" class="form-plus">
              <div
                class="form-plus flex items-center"
                v-if="Candidate.json_study?.length"
              >
                <div class="form-mid-small px-1">
                  <label for="" class="form-group-label">Từ ngày</label>
                </div>
                <div class="form-mid-small px-1">
                  <label for="" class="form-group-label">Đến ngày</label>
                </div>
                <div class="form-x-small px-1">
                  <label for="" class="form-group-label"
                    >Hình thức đào tạo</label
                  >
                </div>
                <div class="form-x-small px-1">
                  <label for="" class="form-group-label">Chuyên ngành</label>
                </div>
                <div class="form-x-small px-1">
                  <label for="" class="form-group-label"
                    >Trình độ học vấn</label
                  >
                </div>
                <div class="form-extra-small px-1">
                  <label for="" class="form-group-label">Nơi đào tạo</label>
                </div>
              </div>
              <div
                v-for="(infoSchool, index) in Candidate.json_study"
                :key="index"
                class="form-plus flex items-center -mt-3"
              >
                <div class="form-mid-small px-1">
                  <date-picker
                    v-model="infoSchool.degree_date_from"
                  ></date-picker>
                </div>
                <div class="form-mid-small px-1">
                  <date-picker
                    v-model="infoSchool.degree_date_to"
                  ></date-picker>
                </div>
                <div class="form-x-small px-1">
                  <v-select
                    label="title"
                    :options="TypeTraining"
                    :reduce="(type) => type.ID"
                    placeholder="Chọn hình thức"
                    v-model="infoSchool.degree_type_id"
                  ></v-select>
                </div>
                <div class="form-x-small px-1">
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Chọn chuyên ngành"
                    v-model="infoSchool.degree_specialization"
                  />
                </div>
                <div class="form-x-small px-1">
                  <v-select
                    label="title"
                    :options="listAcademic"
                    :reduce="(academic) => academic.ID"
                    @click.once="loadAcademic()"
                    placeholder="Chọn trình độ"
                    v-model="infoSchool.degree_level_id"
                  ></v-select>
                </div>
                <div class="form-extra-small px-1">
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Chọn nơi đào tạo"
                    v-model="infoSchool.degress_place"
                  />
                </div>

                <div>
                  <i
                    class="fal fa-times icon-close"
                    @click="removeSchool(index)"
                    style="margin-top: 0px"
                  ></i>
                </div>
              </div>
              <div class="my-2">
                <i
                  class="fal fa-plus-circle icon-plus"
                  @click="createSchool()"
                ></i>
              </div>
            </div>
          </Transition>
          <div v-show="isSchool == false">
            <h2
              @click="isSchool = !isSchool"
              class="cursor-pointer form-group-label"
            >
              Thời gian, Hình thức đào tạo, Chuyên ngành,..
            </h2>
          </div>
        </div>
        <div title="Kinh nghiệm làm việc">
          <h4
            class="form-section-title form-small cursor-pointer"
            @click="isExp = !isExp"
          >
            <span v-show="isExp == true"
              ><i class="fas fa-chevron-down cursor-pointer"></i
            ></span>
            <span v-show="isExp == false"
              ><i class="fas fa-chevron-right cursor-pointer"></i
            ></span>
            Kinh nghiệm làm việc
          </h4>
          <Transition name="slide-up">
            <div v-show="isExp == true" class="form-plus">
              <div
                class="form-plus flex items-center"
                v-if="Candidate.json_process?.length"
              >
                <div class="form-mid-small px-1">
                  <label for="" class="form-group-label">Từ ngày</label>
                </div>
                <div class="form-mid-small px-1">
                  <label for="" class="form-group-label">Đến ngày</label>
                </div>
                <div class="form-x-small px-1">
                  <label for="" class="form-group-label">Công ty</label>
                </div>
                <div class="form-x-small px-1">
                  <label for="" class="form-group-label">Vị trí</label>
                </div>
                <div class="form-mid-small px-1">
                  <label for="" class="form-group-label"
                    >Người tham chiếu</label
                  >
                </div>
                <div class="form-mid-small px-1">
                  <label for="" class="form-group-label">Điện thoại</label>
                </div>
                <div class="form-extra-small px-1">
                  <label for="" class="form-group-label">Mô tả công việc</label>
                </div>
              </div>
              <div
                v-for="(infoExp, index) in Candidate.json_process"
                :key="index"
                class="form-plus flex items-center -mt-3"
                :name="index"
              >
                <div class="form-mid-small px-1">
                  <date-picker
                    v-model="infoExp.experience_date_from"
                  ></date-picker>
                </div>
                <div class="form-mid-small px-1">
                  <date-picker
                    v-model="infoExp.experience_date_to"
                  ></date-picker>
                </div>
                <div class="form-x-small px-1">
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Công ty TNHH ABC"
                    v-model="infoExp.experience_company_title"
                  />
                </div>
                <div class="form-x-small px-1">
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhân viên"
                    v-model="infoExp.experience_position_id"
                  />
                </div>
                <div class="form-mid-small px-1">
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Họ tên"
                    v-model="infoExp.experience_contact_info"
                  />
                </div>
                <div class="form-mid-small px-1">
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Số điện thoại"
                    v-model="infoExp.experience_phone"
                  />
                </div>
                <div class="form-extra-small px-1">
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập mô tả"
                    v-model="infoExp.experience_work_desc"
                  />
                </div>

                <div>
                  <i
                    class="fal fa-times icon-close mr-4"
                    @click="removeExp(index)"
                    style="margin-top: 0px"
                  ></i>
                </div>
              </div>
              <div class="my-2">
                <i
                  class="fal fa-plus-circle icon-plus"
                  @click="createExp()"
                ></i>
              </div>
            </div>
          </Transition>
          <div v-show="isExp == false">
            <h2 @click="isExp = !isExp" class="cursor-pointer form-group-label">
              Thời gian, Công ty, Vị trí, Người tham chiếu,..
            </h2>
          </div>
        </div>
        <div title="Ghi chú">
          <div class="form-small">
            <label for="" class="form-group-label">Ghi chú</label>
            <div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="5"
                class="form-control-input"
                v-model="Candidate.desc"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer
      ><div class="bg-slate-100">
        <div class="p-4 text-left">
          <button
            class="button-modal"
            @click="CreateNewCandidate()"
            :class="{ disabledButtonCreated: isCreated }"
          >
            Cập nhật
          </button>
          <button
            class="button-close-modal"
            @click="this.$router.push('/candidate-profile/all')"
          >
            Hủy bỏ
          </button>
        </div>
      </div></template
    >
  </person-layout>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarRecruitment from "@/components/sidebar/SidebarRecruitment.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButttonCreateRecruitment from "@/views/recruitments/ButttonCreateRecruitment.vue";
import datePicker from "@/components/datePicker/datePicker.vue";
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
export default {
  components: {
    PersonLayout,
    SidebarRecruitment,
    NavbarSocial,
    ButttonCreateRecruitment,
    datePicker,
  },
  data() {
    return {
      isInfor: true,
      isContact: true,
      isFamily: true,
      isSchool: true,
      isExp: true,
      dataGender: [
        {
          value: "0",
          title: "Nữ",
        },
        {
          value: "1",
          title: "Nam",
        },
        {
          value: "2",
          title: "Khác",
        },
      ],
      dataMarital: [
        {
          value: "4",
          title: "Độc thân",
        },
        {
          value: "5",
          title: "Kết hôn",
        },
        {
          value: "6",
          title: "Ly thân",
        },
      ],
    };
  },
  methods: {},
  setup() {
    const store = useStore();
    const toast = useToast();
    const router = useRouter();
    const isLoading = ref(true);
    const isCreated = ref(false);
    const json_family = ref([]);
    const Candidate = reactive({
      campaign_current_id: null,
      code: null,
      source: null,
      name: null,
      birthday: null,
      gender: null,
      place_of_birth_state_id: null,
      place_of_birth_district_id: null,
      place_of_birth_ward_id: null,
      origin_state_id: null,
      origin_district_id: null,
      origin_ward_id: null,
      home_address_state_id: null,
      home_address_district_id: null,
      home_address_ward_id: null,
      current_address_state_id: null,
      current_address_district_id: null,
      current_address_ward_id: null,
      private_code: null,
      private_code_date: null,
      private_code_place: null,
      marital_status: null,
      nationality: "Việt Nam",
      people: null,
      religious: null,
      phone: null,
      email: null,
      desc: null,
      desc_note: null,
      json_family: [
        {
          relative_id: null,
          relative_name: "",
          relative_birthday: "",
          relative_job: "",
          relative_phone: "",
          relative_place: "",
        },
      ],
      json_study: [
        {
          degree_date_from: "",
          degree_date_to: "",
          degree_level_id: null,
          degress_place: "",
          degree_specialization: "",
          degree_type_id: null,
        },
      ],
      json_process: [
        {
          experience_date_from: "",
          experience_date_to: "",
          experience_company_title: "",
          experience_position_id: "",
          experience_contact_info: "",
          experience_work_desc: "",
          experience_phone: "",
        },
      ],
    });
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const changeCity = (event) => {
      store.dispatch("places/getAllDistrictsAction", event.ID);
    };
    const changeDistrict = (event) => {
      store.dispatch("places/getAllWardsAction", event.ID);
    };
    const changeCityOrigin = (event) => {
      store.dispatch("places/getAllDistrictsOriginAction", event.ID);
    };
    const changeDistrictOrigin = (event) => {
      store.dispatch("places/getAllWardsOriginAction", event.ID);
    };
    const changeCityHome = (event) => {
      store.dispatch("places/getAllDistrictsHomeAction", event.ID);
    };
    const changeDistrictHome = (event) => {
      store.dispatch("places/getAllWardsHomeAction", event.ID);
    };
    const changeCityCurrent = (event) => {
      store.dispatch("places/getAllDistrictsCurrentAction", event.ID);
    };
    const changeDistrictCurrent = (event) => {
      store.dispatch("places/getAllWardsCurrentAction", event.ID);
    };
    const listCity = computed(() => store.state.places.listCity);
    const loadAllCity = () => {
      if (listCity.value?.length == 0) {
        store.dispatch("places/getAllCityAction");
      }
    };
    const listDistricts = computed(() => store.state.places.listDistricts);
    const listWards = computed(() => store.state.places.listWards);
    const listDistrictsOrigin = computed(
      () => store.state.places.listDistrictsOrigin
    );
    const listWardsOrigin = computed(() => store.state.places.listWardsOrigin);
    const listDistrictsHome = computed(
      () => store.state.places.listDistrictsHome
    );
    const listWardsHome = computed(() => store.state.places.listWardsHome);
    const listDistrictsCurrent = computed(
      () => store.state.places.listDistrictsCurrent
    );
    const listWardsCurrent = computed(
      () => store.state.places.listWardsCurrent
    );
    const listEthnics = computed(() => store.state.ethnics.listEthnics);
    const listReligions = computed(() => store.state.ethnics.listReligions);
    const listFamilyRelationship = computed(
      () => store.state.familyRelationship.listFamilyRelationship
    );
    const TypeTraining = computed(() => store.state.personnels.TypeTraining);
    const listAcademic = computed(() => store.state.academics.listAcademic);
    const listRecruitmentCampaign = computed(
      () => store.state.recruitmentCampaign.listRecruitmentCampaign
    );
    const LoadEthnics = () => {
      if (listEthnics.value?.length == 0) {
        store.dispatch("ethnics/GetAllEthnicsAction");
      }
    };
    const LoadReligions = () => {
      if (listReligions.value?.length == 0) {
        store.dispatch("ethnics/GetAllReligionAction");
      }
    };
    const LoadFamilyRelationship = () => {
      if (listFamilyRelationship.value?.length == 0) {
        store.dispatch("familyRelationship/getAllFamilyRelationshipAction");
      }
    };
    const loadAcademic = () => {
      if (listAcademic.value?.length == 0) {
        store.dispatch("academics/GetAllAcademicsAction");
      }
    };
    const LoadCampaign = (e) => {
      store.dispatch("recruitmentCampaign/SearchRecruitmentCampaignAction", {
        search: e.target.value,
        EndTimeLoading,
      });
    };
    //
    const createFamily = () => {
      const data = {
        relative_id: null,
        relative_name: "",
        relative_birthday: "",
        relative_job: "",
        relative_phone: "",
        relative_place: "",
      };
      Candidate.json_family.push(data);
    };
    const removeFamily = (index) => {
      Candidate.json_family.splice(index, 1);
    };
    const createSchool = () => {
      const data = {
        degree_date_from: "",
        degree_date_to: "",
        degree_level_id: null,
        degress_place: "",
        degree_specialization: "",
        degree_type_id: null,
      };
      Candidate.json_study.push(data);
    };
    const removeSchool = (index) => {
      Candidate.json_study.splice(index, 1);
    };
    const createExp = () => {
      const data = {
        experience_date_from: "",
        experience_date_to: "",
        experience_company_title: "",
        experience_position_id: "",
        experience_contact_info: "",
        experience_work_desc: "",
        experience_phone: "",
      };
      Candidate.json_process.push(data);
    };
    const removeExp = (index) => {
      Candidate.json_process.splice(index, 1);
    };
    const ActivatedButton = () => {
      isCreated.value = false;
    };
    const CreateNewCandidate = () => {
      isCreated.value = true;
      const data = {
        campaign_current_id: Candidate.campaign_current_id,
        code: Candidate.code,
        name: Candidate.name,
        source: Candidate.source,
        birthday: Candidate.birthday,
        gender: Candidate.gender,
        place_of_birth_state_id: Candidate.place_of_birth_state_id,
        place_of_birth_district_id: Candidate.place_of_birth_district_id,
        place_of_birth_ward_id: Candidate.place_of_birth_ward_id,
        origin_state_id: Candidate.origin_state_id,
        origin_district_id: Candidate.origin_district_id,
        origin_ward_id: Candidate.origin_ward_id,
        home_address_state_id: Candidate.home_address_state_id,
        home_address_district_id: Candidate.home_address_district_id,
        home_address_ward_id: Candidate.home_address_ward_id,
        current_address_state_id: Candidate.current_address_state_id,
        current_address_district_id: Candidate.current_address_district_id,
        current_address_ward_id: Candidate.current_address_ward_id,
        private_code: Candidate.private_code,
        private_code_date: Candidate.private_code_date,
        private_code_place: Candidate.private_code_place,
        marital_status: Candidate.marital_status,
        nationality: Candidate.nationality,
        people: Candidate.people,
        religious: Candidate.religious,
        phone: Candidate.phone,
        email: Candidate.email,
        desc: Candidate.desc,
        desc_note: Candidate.desc_note,
        json_family: Candidate.json_family,
        json_study: Candidate.json_study,
        json_process: Candidate.json_process,
      };
      if (Candidate.campaign_current_id != null) {
        if (Candidate.code != null) {
          if (Candidate.name != null) {
            store.dispatch(
              "recruitmentCandidate/CreateRecruitmentCandidateAction",
              {
                data: data,
                toast,
                router,
                ActivatedButton,
              }
            );
          } else {
            isCreated.value = false;
            toast.error("Vui lòng nhập tên ứng viên");
          }
        } else {
          isCreated.value = false;
          toast.error("Vui lòng nhập mã ứng viên");
        }
      } else {
        isCreated.value = false;
        toast.error("Vui lòng chọn chiến dịch tuyển dụng");
      }
    };
    return {
      isLoading,
      isCreated,
      Candidate,
      json_family,
      listCity,
      listDistricts,
      listWards,
      listDistrictsOrigin,
      listWardsOrigin,
      listDistrictsHome,
      listWardsHome,
      listDistrictsCurrent,
      listWardsCurrent,
      listEthnics,
      listReligions,
      listFamilyRelationship,
      TypeTraining,
      listAcademic,
      listRecruitmentCampaign,
      changeCity,
      changeDistrict,
      changeCityOrigin,
      changeDistrictOrigin,
      changeCityHome,
      changeDistrictHome,
      changeCityCurrent,
      changeDistrictCurrent,
      createFamily,
      removeFamily,
      createSchool,
      removeSchool,
      createExp,
      removeExp,
      CreateNewCandidate,
      ActivatedButton,
      loadAllCity,
      LoadEthnics,
      LoadReligions,
      LoadFamilyRelationship,
      loadAcademic,
      LoadCampaign,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
