<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-personnel></sidebar-personnel>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center">
            <button-create-personnel></button-create-personnel>
            <p class="text-base">Tạo mới hồ sơ nhân sự</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature
        ><div>
          <tab-nav
            :tabs="[
              'Sơ yếu lý lịch',
              'Hợp đồng',
              'Bảo hiểm',
              'Tiếp nhận',
              'Đính kèm',
            ]"
            :selected="selected"
            @selected="setSelected"
          >
          </tab-nav></div
      ></nav-feature>
    </template>
    <Transition name="slide-fade">
      <div
        class="w-full h-full form-plus-over format-scroll"
        v-if="isLoading == false"
      >
        <Transition name="slide-fade">
          <the-tab :isSelected="selected === 'Sơ yếu lý lịch'">
            <div class="text-left px-4 w-full">
              <div class="mt-2">
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
                    <div class="grid grid-cols-2 gap-2 form-small">
                      <div>
                        <label for="" class="form-group-label"
                          >Mã nhân sự<span class="text-red-600">* </span>
                          <span v-if="codePersonnel"
                            >({{ codePersonnel }}{{ LastCode }})</span
                          ></label
                        >
                        <div>
                          <input
                            type="text"
                            name=""
                            id=""
                            class="form-control-input"
                            placeholder="Nhập mã số"
                            v-model="personnel.code"
                            :class="{ emptyInput: emptyCode }"
                          />
                          <span
                            v-if="personnel.code == 0"
                            :class="{ emptyError: emptyCode }"
                            >{{ emptyCode }}</span
                          >
                        </div>
                      </div>
                      <div>
                        <label for="" class="form-group-label"
                          >Mã hồ sơ<span class="text-red-600"
                            ><i
                              class="bi bi-question-circle"
                              style="font-size: 10px"
                            ></i></span
                        ></label>
                        <div>
                          <input
                            type="text"
                            name=""
                            id=""
                            class="form-control-input"
                            placeholder="YMD-XXXX"
                            v-model="personnel.code_storage"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 form-small">
                      <div>
                        <label for="" class="form-group-label"
                          >Mã máy chấm công</label
                        >
                      </div>
                      <div>
                        <label for="" class="form-group-label"
                          >Mã chấm công</label
                        >
                      </div>
                    </div>
                    <div
                      class="flex items-center"
                      v-for="(item, index) in listAttendance"
                      :key="index"
                    >
                      <div
                        class="grid grid-cols-2 gap-2 form-small w-full -mt-1"
                      >
                        <div>
                          <v-select
                            placeholder="Mã máy chấm công"
                            label="code"
                            :options="listTimekeepCode"
                            :reduce="(time) => time.code"
                            @option:selected="PushTimeKeep"
                            v-model="item.prefix"
                          >
                            <template #option="{ code, title }">
                              <div style="display: flex; align-items: baseline">
                                <strong>{{ code }}</strong>
                                <em>-{{ title }}</em>
                              </div>
                            </template>
                          </v-select>
                        </div>
                        <div>
                          <input
                            type="number"
                            name=""
                            id=""
                            class="form-control-input"
                            placeholder="123"
                            v-model="item.suffixes"
                            @change="PushTimeKeep()"
                          />
                        </div>
                      </div>
                      <span
                        @click="removeAttendanceCode(index)"
                        v-if="index > 0"
                        ><i class="fal fa-times icon-close"></i
                      ></span>
                    </div>
                    <div>
                      <span @click="createAttendanceCode()"
                        ><i class="fal fa-plus-circle icon-plus"></i
                      ></span>
                    </div>
                    <div class="form-small">
                      <div>
                        <label for="" class="form-group-label"
                          >Họ và tên<span class="text-red-600">*</span></label
                        >
                        <div>
                          <input
                            type="text"
                            name=""
                            id=""
                            class="form-control-input"
                            placeholder="Nguyễn Văn A"
                            v-model="personnel.name"
                            :class="{ emptyInput: emptyName }"
                          />
                          <span
                            v-if="personnel.name == 0"
                            :class="{ emptyError: emptyName }"
                            >{{ emptyName }}</span
                          >
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 form-small">
                      <div>
                        <label for="" class="form-group-label">Ngày sinh</label>
                        <div>
                          <date-picker
                            v-model="personnel.birthday"
                          ></date-picker>
                        </div>
                      </div>
                      <div>
                        <label for="" class="form-group-label">Giới tính</label>
                        <div>
                          <input-gender
                            v-model="personnel.gender"
                          ></input-gender>
                        </div>
                      </div>
                    </div>
                    <div class="form-large">
                      <label class="form-group-label" for="">Nơi sinh</label>
                      <div class="grid grid-cols-3 gap-2">
                        <div>
                          <v-select
                            label="title"
                            :options="listCity"
                            :reduce="(city) => city.ID"
                            @click.once="loadPlace()"
                            @option:selected="changeCity($event)"
                            placeholder="Chọn tỉnh/thành phố"
                            v-model="personnel.place_of_birth_city_id"
                          ></v-select>
                        </div>
                        <div>
                          <v-select
                            label="title"
                            :options="listDistricts"
                            :reduce="(district) => district.ID"
                            @option:selected="changeDistrict($event)"
                            placeholder="Chọn quận/huyện"
                            v-model="personnel.place_of_birth_district_id"
                          ></v-select>
                        </div>
                        <div>
                          <v-select
                            label="title"
                            :options="listWards"
                            :reduce="(ward) => ward.ID"
                            @option:selected="changeWard($event)"
                            placeholder="Chọn xã/phường"
                            v-model="personnel.place_of_birth_ward_id"
                          ></v-select>
                        </div>
                      </div>
                    </div>
                    <div class="form-large">
                      <label class="form-group-label" for="">Nguyên quán</label>
                      <div class="grid grid-cols-3 gap-2">
                        <div>
                          <v-select
                            label="title"
                            :options="listCity"
                            :reduce="(city) => city.ID"
                            @click.once="loadPlace()"
                            @option:selected="changeCityOrigin($event)"
                            placeholder="Chọn tỉnh/thành phố"
                            v-model="personnel.origin_city_id"
                          ></v-select>
                        </div>
                        <div>
                          <v-select
                            label="title"
                            :options="listDistrictsOrigin"
                            :reduce="(district) => district.ID"
                            @option:selected="changeDistrictOrigin($event)"
                            placeholder="Chọn quận/huyện"
                            v-model="personnel.origin_district_id"
                          ></v-select>
                        </div>
                        <div>
                          <v-select
                            label="title"
                            :options="listWardsOrigin"
                            :reduce="(ward) => ward.ID"
                            @option:selected="changeWardOrigin($event)"
                            placeholder="Chọn xã/phường"
                            v-model="personnel.origin_ward_id"
                          ></v-select>
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-3 gap-2 form-large">
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
                            v-model="personnel.private_code"
                          />
                        </div>
                      </div>
                      <div>
                        <label for="" class="form-group-label">Ngày cấp</label>
                        <div>
                          <date-picker
                            v-model="personnel.private_code_date"
                          ></date-picker>
                        </div>
                      </div>
                      <div>
                        <label for="" class="form-group-label">Nơi cấp</label>
                        <div>
                          <v-select
                            label="title"
                            :options="listCity"
                            :reduce="(place) => place.ID"
                            v-model="personnel.private_code_place"
                            @click.once="loadPlace()"
                            placeholder="Chọn nơi cấp"
                          ></v-select>
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 form-small">
                      <div class="">
                        <label for="" class="form-group-label"
                          >Ảnh mặt trước</label
                        >
                        <input-image
                          v-model="personnel.private_code_front"
                          @change_image="changeImageFront"
                        ></input-image>
                      </div>
                      <div>
                        <label for="" class="form-group-label"
                          >Ảnh mặt sau</label
                        >
                        <input-image
                          v-model="personnel.private_code_back"
                          @change_image="changeImageBack"
                        ></input-image>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 form-small">
                      <div>
                        <label for="" class="form-group-label"
                          >Tình trạng hôn nhân</label
                        >
                        <div>
                          <input-marital
                            v-model="personnel.marital_status"
                          ></input-marital>
                        </div>
                      </div>
                      <div>
                        <label for="" class="form-group-label">Quốc tịch</label>
                        <div>
                          <input-nationality
                            v-model="personnel.nationality"
                          ></input-nationality>
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 form-small">
                      <div>
                        <label for="" class="form-group-label">Dân tộc</label>
                        <div>
                          <input-people
                            v-model="personnel.people"
                          ></input-people>
                        </div>
                      </div>
                      <div>
                        <label for="" class="form-group-label">Tôn giáo</label>
                        <div>
                          <input-religion
                            v-model="personnel.religious"
                          ></input-religion>
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-12 gap-2 form-large-plus">
                      <label for="" class="form-group-label col-span-2"
                        >Số tài khoản</label
                      ><label for="" class="form-group-label col-span-3"
                        >Tên tài khoản</label
                      ><label for="" class="form-group-label col-span-4"
                        >Chọn ngân hàng</label
                      >
                      <label for="" class="form-group-label col-span-3"
                        >Chi nhánh</label
                      >
                    </div>
                    <div
                      v-for="(item, index) in personnel.json_banks"
                      :key="index"
                      class="grid grid-cols-12 gap-2 form-large-plus"
                    >
                      <div class="col-span-2">
                        <div>
                          <input
                            type="text"
                            class="form-control-input"
                            placeholder="123456"
                            v-model="item.bank_account"
                          />
                        </div>
                      </div>
                      <div class="col-span-3">
                        <div>
                          <input
                            type="text"
                            class="form-control-input"
                            placeholder="Viết hoa không dấu"
                            v-model="item.bank_account_name"
                          />
                        </div>
                      </div>
                      <div class="col-span-4">
                        <div>
                          <input-bank v-model="item.bank_name"></input-bank>
                        </div>
                      </div>
                      <div class="col-span-2">
                        <div>
                          <input
                            type="text"
                            class="form-control-input overflow-hidden"
                            placeholder="Thanh Xuân"
                            v-model="item.bank_address"
                          />
                        </div>
                      </div>
                      <div class="col-span-1 pt-[15px]">
                        <span @click="removeBankAccount(index)"
                          ><i class="fal fa-times icon-close"></i
                        ></span>
                      </div>
                    </div>
                    <div>
                      <span @click="createBankAccount()"
                        ><i class="fal fa-plus-circle icon-plus"></i
                      ></span>
                    </div>
                    <div class="form-small">
                      <label for="" class="form-group-label"
                        >Mã số thuế cá nhân</label
                      >
                      <div>
                        <input
                          type="text"
                          name=""
                          id=""
                          placeholder="Mã số thuế cá nhân"
                          class="form-control-input"
                          v-model="personnel.job_tax"
                        />
                      </div>
                    </div>
                    <div class="form-small">
                      <label for="" class="form-group-label">Cấp bậc</label>
                      <div>
                        <input-level v-model="personnel.level_id"></input-level>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 form-small">
                      <div>
                        <label for="" class="form-group-label">Ngày vào</label>
                        <div>
                          <date-picker
                            v-model="personnel.job_date_join"
                          ></date-picker>
                        </div>
                      </div>
                      <div>
                        <label for="" class="form-group-label"
                          >Ngày vào chính thức</label
                        >
                        <div>
                          <date-picker
                            v-model="personnel.job_reldate_join"
                          ></date-picker>
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 form-small">
                      <div>
                        <label for="" class="form-group-label"
                          >Trình độ phổ thông</label
                        >
                        <div>
                          <input-level-school
                            v-model="personnel.level_school"
                          ></input-level-school>
                        </div>
                      </div>
                      <div>
                        <label for="" class="form-group-label"
                          >Trình độ học vấn cao nhất</label
                        >
                        <div>
                          <input-academic
                            v-model="personnel.level_academic"
                          ></input-academic>
                        </div>
                      </div>
                    </div>
                    <div class="form-small">
                      <label for="" class="form-group-label"
                        >Địa điểm chấm công GPS</label
                      >
                      <div>
                        <input-gps-location
                          v-model="personnel.gps_location_ids"
                          :isMultiple="true"
                        ></input-gps-location>
                      </div>
                    </div>
                    <div class="form-small">
                      <label for="" class="form-group-label"
                        >Người quản lý trực tiếp</label
                      >
                      <div>
                        <input-manager
                          v-model="personnel.live_manager_id"
                        ></input-manager>
                      </div>
                    </div>
                  </div>
                </Transition>

                <div v-show="isInfor == false">
                  <h2
                    @click="isInfor = !isInfor"
                    class="cursor-pointer mt-2 form-group-label"
                  >
                    Mã nhân sự *, Mã chấm công, Mã hồ sơ, Họ và tên *, Ngày
                    sinh, Giới tính, Nơi sinh, Nguyên quán, CMT/Căn cước/Hộ
                    chiếu, Ngày cấp, Nơi cấp, Ảnh mặt tr...
                  </h2>
                </div>
              </div>
              <div class="mt-5">
                <h4
                  class="form-section-title form-small cursor-pointer"
                  @click="isAddres = !isAddres"
                >
                  <span v-show="isAddres == true"
                    ><i class="fas fa-chevron-down cursor-pointer"></i
                  ></span>
                  <span v-show="isAddres == false">
                    <i class="fas fa-chevron-right cursor-pointer"></i>
                  </span>
                  Thông tin liên hệ
                </h4>
                <Transition name="slide-up">
                  <div v-show="isAddres == true">
                    <div class="form-small">
                      <label for="" class="form-group-label">Điện thoại</label>
                      <div>
                        <v-select
                          no-drop
                          taggable
                          multiple
                          placeholder="Nhập số điện thoại, Enter để nhập nhiều"
                          v-model="personnel.json_mobile"
                        />
                      </div>
                    </div>
                    <div class="form-small">
                      <label for="" class="form-group-label"
                        >Số điện thoại nội bộ</label
                      >
                      <div>
                        <input
                          type="text"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="N192"
                          v-model="personnel.phone_ext"
                        />
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 form-small">
                      <div>
                        <label for="" class="form-group-label"
                          >Email cá nhân</label
                        >
                        <div>
                          <input
                            type="text"
                            name=""
                            id=""
                            class="form-control-input"
                            placeholder="NguyenVan@gmail.com"
                            v-model="personnel.personal_email"
                          />
                        </div>
                      </div>
                      <div>
                        <label for="" class="form-group-label"
                          >Email công ty</label
                        >
                        <div>
                          <input
                            type="text"
                            name=""
                            id=""
                            class="form-control-input"
                            placeholder="abc@btpholding.com"
                            v-model="personnel.company_email"
                          />
                        </div>
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
                              @click.once="loadPlace()"
                              @option:selected="changeCityHome($event)"
                              placeholder="Chọn tỉnh/thành phố"
                              v-model="personnel.home_address_city_id"
                            ></v-select>
                          </div>
                          <div>
                            <v-select
                              label="title"
                              :options="listDistrictsHome"
                              :reduce="(district) => district.ID"
                              @option:selected="changeDistrictHome($event)"
                              placeholder="Chọn quận/huyện"
                              v-model="personnel.home_address_district_id"
                            ></v-select>
                          </div>
                          <div>
                            <v-select
                              label="title"
                              :options="listWardsHome"
                              :reduce="(ward) => ward.ID"
                              placeholder="Chọn xã/phường"
                              @option:selected="changeWardHome($event)"
                              v-model="personnel.home_address_ward_id"
                            ></v-select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-12 gap-2 form-large-plus">
                      <div class="col-span-10">
                        <label for="" class="form-group-label"
                          >Địa chỉ hiện nay</label
                        >
                        <div class="grid grid-cols-3 gap-2">
                          <div>
                            <v-select
                              label="title"
                              :options="listCity"
                              :reduce="(city) => city.ID"
                              @click.once="loadPlace()"
                              @option:selected="changeCityCurrent($event)"
                              placeholder="Chọn tỉnh/thành phố"
                              v-model="personnel.current_address_city_id"
                            ></v-select>
                          </div>
                          <div>
                            <v-select
                              label="title"
                              :options="listDistrictsCurrent"
                              :reduce="(district) => district.ID"
                              @option:selected="changeDistrictCurrent($event)"
                              placeholder="Chọn quận/huyện"
                              v-model="personnel.current_address_district_id"
                            ></v-select>
                          </div>
                          <div>
                            <v-select
                              label="title"
                              :options="listWardsCurrent"
                              :reduce="(ward) => ward.ID"
                              placeholder="Chọn xã/phường"
                              @option:selected="changeWardCurrent($event)"
                              v-model="personnel.current_address_ward_id"
                            ></v-select>
                          </div>
                        </div>
                      </div>
                      <div class="col-span-2">
                        <label for="" class="form-group-label"
                          >Chỗ ở hiện nay</label
                        >
                        <div>
                          <input
                            type="text"
                            name=""
                            id=""
                            class="form-control-input"
                            placeholder="Số 10, Quang Trung..."
                            v-model="personnel.current_address"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition>

                <div v-show="isAddres == false">
                  <h2
                    @click="isAddres = !isAddres"
                    class="cursor-pointer mt-2 form-group-label"
                  >
                    Điện thoại, Email, Thường trú, Địa chỉ, Chỗ ở hiện nay, Địa
                    chỉ
                  </h2>
                </div>
              </div>
              <div class="w-full mt-5">
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
                      v-if="personnel.json_family?.length"
                    >
                      <div class="form-mid-small px-1">
                        <label for="" class="form-group-label"
                          >Mối quan hệ</label
                        >
                      </div>
                      <div class="form-x-small px-1">
                        <label for="" class="form-group-label">Họ và tên</label>
                      </div>
                      <div class="form-mid-small px-1">
                        <label for="" class="form-group-label">Năm sinh</label>
                      </div>
                      <div class="form-mid-small px-1">
                        <label for="" class="form-group-label"
                          >Nghề nghiệp</label
                        >
                      </div>
                      <div class="form-mid-small px-1">
                        <label for="" class="form-group-label"
                          >Điện thoại</label
                        >
                      </div>
                      <div class="form-mid-small px-1">
                        <label for="" class="form-group-label"
                          >Người phụ thuộc</label
                        >
                      </div>
                      <div class="form-mid-small px-1">
                        <label for="" class="form-group-label">Từ ngày</label>
                      </div>
                      <div class="form-mid-small px-1">
                        <label for="" class="form-group-label">Đến ngày</label>
                      </div>
                      <div class="form-mid-small px-1">
                        <label for="" class="form-group-label"
                          >Mã số thuế</label
                        >
                      </div>
                    </div>
                    <div
                      v-for="(infoFamily, index) in personnel.json_family"
                      :key="index"
                      :name="index"
                      class="form-plus flex items-center -mt-3"
                    >
                      <div class="form-mid-small px-1">
                        <input-relationship
                          v-model="infoFamily.relative_id"
                        ></input-relationship>
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
                          v-model="infoFamily.relative_desc"
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
                        <select
                          name=""
                          id=""
                          class="form-control-input"
                          v-model="infoFamily.relative_is_dependent"
                        >
                          <option value="1">Có</option>
                          <option value="0">Không</option>
                        </select>
                      </div>
                      <div class="form-mid-small px-1">
                        <date-picker
                          v-model="infoFamily.relative_dependent_from_date"
                        ></date-picker>
                      </div>
                      <div class="form-mid-small px-1">
                        <date-picker
                          v-model="infoFamily.relative_dependent_to_date"
                        ></date-picker>
                      </div>
                      <div class="form-mid-small px-1">
                        <input
                          type="text"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập mã số thuế"
                          v-model="infoFamily.relative_dependent_tax"
                          :disabled="infoFamily.relative_is_dependent == 0"
                          :class="{
                            disabledInput:
                              infoFamily.relative_is_dependent == 0,
                          }"
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
                        @click="createFamily(infoFamily)"
                      ></i>
                    </div>
                  </div>
                </Transition>

                <div v-show="isFamily == false">
                  <h2
                    @click="isFamily = !isFamily"
                    class="cursor-pointer mt-2 form-group-label"
                  >
                    Mối quan hệ, Họ và tên, Năm sinh, Nghề nghiệp, Điện thoại,
                    Người phụ thuộc, Từ ngày, Đến ngày, Mã số thuế
                  </h2>
                </div>
              </div>
              <div class="w-full mt-5">
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
                      v-if="personnel.json_degrees?.length"
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
                        <label for="" class="form-group-label"
                          >Chuyên ngành</label
                        >
                      </div>
                      <div class="form-x-small px-1">
                        <label for="" class="form-group-label"
                          >Trình độ học vấn</label
                        >
                      </div>
                      <div class="form-extra-small px-1">
                        <label for="" class="form-group-label"
                          >Nơi đào tạo</label
                        >
                      </div>
                    </div>
                    <div
                      v-for="(infoSchool, index) in personnel.json_degrees"
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
                        <input-type-training
                          v-model="infoSchool.degree_type_id"
                        ></input-type-training>
                      </div>
                      <div class="form-x-small px-1">
                        <input
                          type="text"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập chuyên ngành"
                          v-model="infoSchool.degree_specialization"
                        />
                      </div>
                      <div class="form-x-small px-1">
                        <input-academic
                          v-model="infoSchool.degree_level_id"
                        ></input-academic>
                      </div>
                      <div class="form-extra-small px-1">
                        <input
                          type="text"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập nơi đào tạo"
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
                        @click="createSchool(infoSchool)"
                      ></i>
                    </div>
                  </div>
                </Transition>

                <div v-show="isSchool == false">
                  <h2
                    @click="isSchool = !isSchool"
                    class="cursor-pointer mt-2 form-group-label"
                  >
                    Từ ngày, Đến ngày, Hình thức đào tạo, Chuyên ngành, Trình độ
                    học vấn, Nơi đào tạo
                  </h2>
                </div>
              </div>
              <div class="w-full mt-5">
                <h4
                  class="form-section-title form-small cursor-pointer"
                  @click="isParty = !isParty"
                >
                  <span v-show="isParty == true"
                    ><i class="fas fa-chevron-down cursor-pointer"></i
                  ></span>
                  <span v-show="isParty == false"
                    ><i class="fas fa-chevron-right cursor-pointer"></i
                  ></span>
                  Lịch sử đảng viên
                </h4>
                <Transition name="slide-up">
                  <div v-show="isParty == true" class="form-plus">
                    <div
                      class="form-plus flex items-center"
                      v-if="personnel.json_communist?.length"
                    >
                      <div class="form-mid-small px-1">
                        <label for="" class="form-group-label">Số thẻ</label>
                      </div>
                      <div class="form-x-small px-1">
                        <label for="" class="form-group-label">Hình thức</label>
                      </div>
                      <div class="form-mid-small px-1">
                        <label for="" class="form-group-label">Từ ngày</label>
                      </div>
                      <div class="form-mid-small px-1">
                        <label for="" class="form-group-label">Đến ngày</label>
                      </div>
                      <div class="form-x-small px-1">
                        <label for="" class="form-group-label"
                          >Nơi kết nạp</label
                        >
                      </div>
                      <div class="form-x-small px-1">
                        <label for="" class="form-group-label"
                          >Nơi điều chuyển</label
                        >
                      </div>
                    </div>
                    <div
                      v-for="(infoParty, index) in personnel.json_communist"
                      :key="index"
                      class="flex items-center form-plus -mt-3"
                      :name="index"
                    >
                      <div class="form-mid-small px-1">
                        <input
                          type="text"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập số thẻ"
                          v-model="infoParty.communist_code"
                        />
                      </div>
                      <div class="form-x-small px-1">
                        <input-type-communist
                          v-model="infoParty.status_communist"
                        ></input-type-communist>
                      </div>
                      <div class="form-mid-small px-1">
                        <date-picker
                          v-model="infoParty.communist_date_from"
                        ></date-picker>
                      </div>
                      <div class="form-mid-small px-1">
                        <date-picker
                          v-model="infoParty.communist_date_to"
                        ></date-picker>
                      </div>
                      <div class="form-x-small px-1">
                        <input
                          type="text"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập nơi kết nạp"
                          v-model="infoParty.communist_address_join"
                        />
                      </div>
                      <div class="form-x-small px-1">
                        <input
                          type="text"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập nơi điểu chuyển"
                          v-model="infoParty.communist_address_transfer"
                        />
                      </div>

                      <div>
                        <i
                          class="fal fa-times icon-close"
                          @click="removeParty(index)"
                          style="margin-top: 0px"
                        ></i>
                      </div>
                    </div>
                    <div class="my-2">
                      <i
                        class="fal fa-plus-circle icon-plus"
                        @click="createParty(infoParty)"
                      ></i>
                    </div>
                  </div>
                </Transition>

                <div v-show="isParty == false">
                  <h2
                    @click="isParty = !isParty"
                    class="cursor-pointer mt-2 form-group-label"
                  >
                    Số thẻ, Hình thức, Từ ngày, Đến ngày, Nơi kết nạp, Nơi điều
                    chuyển
                  </h2>
                </div>
              </div>
              <div class="w-full mt-5">
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
                      v-if="personnel.json_experience?.length"
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
                        <label for="" class="form-group-label"
                          >Điện thoại</label
                        >
                      </div>
                      <div class="form-extra-small px-1">
                        <label for="" class="form-group-label"
                          >Mô tả công việc</label
                        >
                      </div>
                    </div>
                    <div
                      v-for="(infoExp, index) in personnel.json_experience"
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
                          v-model="infoExp.experience_contact_infop"
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
                        @click="createExp(infoExp)"
                      ></i>
                    </div>
                  </div>
                </Transition>

                <div v-show="isExp == false">
                  <h2
                    @click="isExp = !isExp"
                    class="cursor-pointer mt-2 form-group-label"
                  >
                    Từ tháng, Đến tháng, Công ty, Vị trí, Người tham chiếu, Điện
                    thoại, Mô tả công việc
                  </h2>
                </div>
              </div>
              <div>
                <div class="form-small">
                  <label for="" class="form-group-label">Ghi chú</label>
                  <div>
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="5"
                      class="form-control-input"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </the-tab>
        </Transition>

        <Transition name="slide-fade">
          <the-tab :isSelected="selected === 'Hợp đồng'">
            <div class="text-left px-4 w-full">
              <div class="mt-2">
                <h4
                  class="form-section-title form-small cursor-pointer"
                  @click="isContract = !isContract"
                >
                  <span v-show="isContract == true"
                    ><i class="fas fa-chevron-down cursor-pointer"></i
                  ></span>
                  <span v-show="isContract == false"
                    ><i class="fas fa-chevron-right cursor-pointer"></i
                  ></span>
                  Thông tin chung
                </h4>
                <Transition name="slide-fade">
                  <div v-show="isContract == true" class="mt-2">
                    <div class="grid grid-cols-6 gap-2 form-small">
                      <div class="col-span-2">
                        <label for="" class="form-group-label"
                          >Mã hợp đồng<span class="text-red-600">*</span
                          ><span class="text-orange-300"
                            ><i
                              class="bi bi-question-circle"
                              style="font-size: 10px"
                            ></i></span
                        ></label>
                        <div>
                          <input
                            type="text"
                            name=""
                            id=""
                            class="form-control-input"
                            placeholder="Nhập mã"
                            v-model="personnel.contract_code"
                          />
                        </div>
                      </div>
                      <div class="col-span-4">
                        <label for="" class="form-group-label"
                          >Hợp đồng<span class="text-red-600">*</span></label
                        >
                        <div>
                          <input-contract-type
                            v-model="personnel.contract_type"
                            class="long_select"
                          ></input-contract-type>
                        </div>
                      </div>
                    </div>
                    <div class="form-small">
                      <div>
                        <label for="" class="form-group-label">Phòng ban</label>
                        <div>
                          <input-department
                            v-model="personnel.department_id"
                          ></input-department>
                        </div>
                      </div>
                    </div>
                    <div class="form-small">
                      <div>
                        <label for="" class="form-group-label">Hình thức</label>
                        <div>
                          <input-work-type
                            v-model="personnel.work_type"
                          ></input-work-type>
                        </div>
                      </div>
                    </div>
                    <div class="form-small">
                      <div>
                        <label for="" class="form-group-label">Vị trí</label>
                        <div>
                          <input-position
                            v-model="personnel.position_id"
                          ></input-position>
                        </div>
                      </div>
                    </div>
                    <div class="form-small">
                      <div>
                        <label for="" class="form-group-label">Chức vụ</label>
                        <div>
                          <input-positiontitle
                            v-model="personnel.job_title"
                          ></input-positiontitle>
                        </div>
                      </div>
                    </div>
                    <div class="form-small">
                      <div>
                        <label for="" class="form-group-label"
                          >Nơi làm việc</label
                        >
                        <div>
                          <input-workplace
                            v-model="personnel.work_place"
                          ></input-workplace>
                        </div>
                      </div>
                    </div>
                    <div class="form-small">
                      <div>
                        <label for="" class="form-group-label"
                          >Ngạch lương</label
                        >
                        <div>
                          <input-salary-range
                            v-model="personnel.quantum_id"
                          ></input-salary-range>
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 form-small">
                      <div>
                        <label for="" class="form-group-label"
                          >Hiệu lực từ ngày<span class="text-red-600"
                            >*</span
                          ></label
                        >
                        <div>
                          <date-picker
                            v-model="personnel.date_start"
                          ></date-picker>
                        </div>
                      </div>
                      <div>
                        <label for="" class="form-group-label">Đến ngày</label>
                        <div>
                          <date-picker
                            v-model="personnel.date_finish"
                          ></date-picker>
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 form-small">
                      <div>
                        <label for="" class="form-group-label">Ngày ký</label>
                        <div>
                          <date-picker
                            v-model="personnel.date_reg"
                          ></date-picker>
                        </div>
                      </div>
                      <div>
                        <label for="" class="form-group-label">Người ký</label>
                        <div>
                          <input
                            type="text"
                            name=""
                            id=""
                            class="form-control-input"
                            placeholder="Nhập người ký"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition>
                <div v-show="isContract == false">
                  <h2
                    @click="isContract = !isContract"
                    class="cursor-pointer mt-2 form-group-label"
                  >
                    Mã hợp đồng *, Hợp đồng *, Phòng ban, Hình thức, Vị trí,
                    Chức vụ, Nơi làm việc, Ngạch lương, Hiệu lực từ ngày *, Đến
                    ngày, Ngày ký, Người ký
                  </h2>
                </div>
                <h4
                  class="form-section-title form-small cursor-pointer"
                  @click="isSalary = !isSalary"
                >
                  <span v-show="isSalary == true"
                    ><i class="fas fa-chevron-down cursor-pointer"></i
                  ></span>
                  <span v-show="isSalary == false"
                    ><i class="fas fa-chevron-right cursor-pointer"></i
                  ></span>
                  Thông tin lương và phụ cấp
                </h4>
                <Transition name="slide-fade">
                  <div v-show="isSalary == true" class="form-small">
                    <div
                      v-for="(salary, index) in personnel.json_salaries"
                      :key="index"
                      class="mt-2"
                    >
                      <div class="flex items-center">
                        <div class="grid grid-cols-5 gap-2 w-full">
                          <div class="col-span-2">
                            <label for="" class="form-group-label"
                              >Từ ngày</label
                            >
                            <div>
                              <date-picker v-model="salary.date"></date-picker>
                            </div>
                          </div>
                          <div class="col-span-3">
                            <label for="" class="form-group-label"
                              >Ghi chú</label
                            >
                            <div>
                              <input
                                type="text"
                                name=""
                                id=""
                                class="form-control-input"
                                placeholder="Nhập ghi chú"
                                v-model="salary.desc"
                              />
                            </div>
                          </div>
                        </div>
                        <span @click="removeSalary(index)">
                          <i
                            class="fal fa-times icon-close"
                            style="margin-top: 40px"
                          ></i>
                        </span>
                      </div>
                      <div class="ml-8">
                        <div
                          class="grid grid-cols-5 gap-4 mt-2"
                          v-if="salary.json_type_salary?.length"
                        >
                          <div class="col-span-3">
                            <label for="" class="form-group-label"
                              >Hình thức lương</label
                            >
                          </div>
                          <div class="col-span-2">
                            <label for="" class="form-group-label"
                              >Số tiền</label
                            >
                          </div>
                        </div>
                        <div
                          class="flex items-center"
                          v-for="(salaryType, inde) in salary.json_type_salary"
                          :key="inde"
                        >
                          <div class="grid grid-cols-5 gap-4 mt-1">
                            <div class="col-span-3">
                              <input-type-salary
                                v-model="salaryType.type_salary"
                              ></input-type-salary>
                            </div>
                            <div class="col-span-2">
                              <CurrencyInput v-model="salaryType.money" />
                            </div>
                          </div>
                          <span @click="removeTypesalary(index, inde)">
                            <i
                              class="fal fa-times icon-close"
                              style="margin-top: 15px"
                            ></i>
                          </span>
                        </div>
                        <div @click="addTypesalary(index)">
                          <span
                            ><i class="fal fa-plus-circle icon-plus mt-2"></i
                          ></span>
                        </div>
                      </div>
                      <div class="ml-8 mt-2">
                        <div
                          class="grid grid-cols-5 gap-4 mt-2"
                          v-if="salary.json_allowances?.length"
                        >
                          <div class="col-span-3">
                            <label for="" class="form-group-label"
                              >Phụ cấp</label
                            >
                          </div>
                          <div class="col-span-2">
                            <label for="" class="form-group-label"
                              >Số tiền</label
                            >
                          </div>
                        </div>
                        <div
                          class="flex items-center"
                          v-for="(allowance, ind) in salary.json_allowances"
                          :key="ind"
                        >
                          <div class="grid grid-cols-5 gap-4 mt-1">
                            <div class="col-span-3">
                              <input-allowance
                                v-model="allowance.allowance"
                              ></input-allowance>
                            </div>
                            <div class="col-span-2">
                              <CurrencyInput v-model="allowance.money" />
                            </div>
                          </div>
                          <span @click="removeAllowance(index, ind)">
                            <i
                              class="fal fa-times icon-close"
                              style="margin-top: 15px"
                            ></i>
                          </span>
                        </div>
                        <div>
                          <span @click="addAllowance(index)"
                            ><i class="fal fa-plus-circle icon-plus mt-2"></i
                          ></span>
                        </div>
                      </div>
                      <div class="ml-8 mt-2">
                        <label for="" class="form-group-label"
                          >Mức lương đóng bảo hiểm</label
                        >
                        <div>
                          <CurrencyInput v-model="salary.premium_salary" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <span @click="addSalary"
                        ><i class="fal fa-plus-circle icon-plus mt-2"></i
                      ></span>
                    </div>
                  </div>
                </Transition>
                <div v-show="isSalary == false">
                  <h2
                    @click="isSalary = !isSalary"
                    class="cursor-pointer mt-2 text-sm"
                  >
                    Mã hợp đồng *, Hợp đồng *, Phòng ban, Hình thức, Vị trí,
                    Chức vụ, Nơi làm việc, Ngạch lương, Hiệu lực từ ngày *, Đến
                    ngày, Ngày ký, Người ký
                  </h2>
                </div>
                <div class="form-small">
                  <label for="" class="form-group-label">Ghi chú</label>
                  <div>
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="5"
                      class="form-control-input"
                      v-model="personnel.desc_contract"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </the-tab>
        </Transition>

        <Transition name="slide-fade">
          <the-tab :isSelected="selected === 'Bảo hiểm'" class="h-full">
            <div class="text-left px-4 w-full mt-2">
              <h4
                class="form-section-title form-small cursor-pointer"
                @click="isInsurance = !isInsurance"
              >
                <span v-show="isInsurance == true"
                  ><i class="fas fa-chevron-down cursor-pointer"></i
                ></span>
                <span v-show="isInsurance == false"
                  ><i class="fas fa-chevron-right cursor-pointer"></i
                ></span>
                Thông tin bảo hiểm
              </h4>
              <Transition name="slide-up">
                <div v-show="isInsurance == true" class="mt-2">
                  <div class="grid grid-cols-2 gap-2 form-small">
                    <div>
                      <label for="" class="form-group-label">Số sổ BH</label>
                      <div>
                        <input
                          type="text"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập mã"
                          v-model="personnel.premium_number"
                        />
                      </div>
                    </div>
                    <div>
                      <label for="" class="form-group-label"
                        >Trạng thái sổ</label
                      >
                      <div>
                        <input-status-insurance
                          v-model="personnel.premium_insurance_status"
                        ></input-status-insurance>
                      </div>
                    </div>
                  </div>
                  <div class="form-small">
                    <div>
                      <label for="" class="form-group-label"
                        >Pháp nhân đóng</label
                      >
                      <div>
                        <input-data-premium
                          v-model="personnel.premium_personnel"
                        ></input-data-premium>
                      </div>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-2 form-small">
                    <div>
                      <label for="" class="form-group-label">Số thẻ BHYT</label>
                      <div>
                        <input
                          type="text"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập mã"
                          v-model="personnel.premium_card"
                        />
                      </div>
                    </div>
                    <div>
                      <label for="" class="form-group-label">Mã tỉnh cấp</label>
                      <div>
                        <input-premium-code
                          v-model="personnel.premium_code"
                        ></input-premium-code>
                      </div>
                    </div>
                  </div>
                  <div class="form-small">
                    <div>
                      <label for="" class="form-group-label"
                        >ĐK khám chữa bệnh</label
                      >
                      <div>
                        <input-premium-place
                          v-model="personnel.premium_place"
                        ></input-premium-place>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>

              <div v-show="isInsurance == false">
                <h2
                  @click="isInsurance = !isInsurance"
                  class="cursor-pointer mt-2 form-group-label"
                >
                  Mã hợp đồng *, Hợp đồng *, Phòng ban, Hình thức, Vị trí, Chức
                  vụ, Nơi làm việc, Ngạch lương, Hiệu lực từ ngày *, Đến ngày,
                  Ngày ký, Người ký
                </h2>
              </div>

              <h4
                class="form-section-title form-small cursor-pointer"
                @click="isIncrease = !isIncrease"
              >
                <span v-show="isIncrease == true"
                  ><i class="fas fa-chevron-down cursor-pointer"></i
                ></span>
                <span v-show="isIncrease == false"
                  ><i class="fas fa-chevron-right cursor-pointer"></i
                ></span>
                Nghiệp vụ báo tăng
              </h4>
              <Transition name="slide-up">
                <div v-show="isIncrease == true" class="mt-2">
                  <div class="grid grid-cols-2 gap-2 form-small">
                    <div>
                      <label for="" class="form-group-label"
                        >NV hoàn thiện HS</label
                      >
                      <div>
                        <date-picker
                          v-model="personnel.insup_date_get"
                        ></date-picker>
                      </div>
                    </div>
                    <div>
                      <label for="" class="form-group-label"
                        >NS hoàn thiện HS</label
                      >
                      <div>
                        <date-picker
                          v-model="personnel.insup_date_complete"
                        ></date-picker>
                      </div>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-2 form-small">
                    <div>
                      <label for="" class="form-group-label"
                        >Ngày nhận thẻ BHYT</label
                      >
                      <div>
                        <date-picker
                          v-model="personnel.insup_date_close"
                        ></date-picker>
                      </div>
                    </div>
                    <div>
                      <label for="" class="form-group-label"
                        >Ngày trả thẻ BHYT</label
                      >
                      <div>
                        <date-picker
                          v-model="personnel.insup_date_return"
                        ></date-picker>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>

              <div v-show="isIncrease == false">
                <h2
                  @click="isIncrease = !isIncrease"
                  class="cursor-pointer mt-2 form-group-label"
                >
                  Mã hợp đồng
                </h2>
              </div>

              <h4
                class="form-section-title form-small cursor-pointer"
                @click="isReduce = !isReduce"
              >
                <span v-show="isReduce == true"
                  ><i class="fas fa-chevron-down cursor-pointer"></i
                ></span>
                <span v-show="isReduce == false"
                  ><i class="fas fa-chevron-right cursor-pointer"></i
                ></span>
                Nghiệp vụ báo giảm
              </h4>
              <Transition name="slide-up">
                <div v-show="isReduce == true" class="mt-2">
                  <div class="grid grid-cols-2 gap-2 form-small">
                    <div>
                      <label for="" class="form-group-label"
                        >Ngày nhận sổ BH từ NLĐ</label
                      >
                      <div>
                        <date-picker
                          v-model="personnel.insdown_date_close"
                        ></date-picker>
                      </div>
                    </div>
                    <div>
                      <label for="" class="form-group-label"
                        >NS hoàn thiện HS</label
                      >
                      <div>
                        <date-picker
                          v-model="personnel.insdown_date_complete"
                        ></date-picker>
                      </div>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-2 form-small">
                    <div>
                      <label for="" class="form-group-label"
                        >Ngày nhận số BH đã chốt</label
                      >
                      <div>
                        <date-picker
                          v-model="personnel.insdown_date_return"
                        ></date-picker>
                      </div>
                    </div>
                    <div>
                      <label for="" class="form-group-label"
                        >Ngày trả sổ cho NLĐ</label
                      >
                      <div>
                        <date-picker
                          v-model="personnel.insdown_date_get"
                        ></date-picker>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>

              <div v-show="isReduce == false">
                <h2
                  @click="isReduce = !isReduce"
                  class="cursor-pointer mt-2 form-group-label"
                >
                  Mã hợp đồng
                </h2>
              </div>

              <h4
                class="form-section-title form-small cursor-pointer"
                @click="isInsuranceHistory = !isInsuranceHistory"
              >
                <span v-show="isInsuranceHistory == true"
                  ><i class="fas fa-chevron-down cursor-pointer"></i
                ></span>
                <span v-show="isInsuranceHistory == false"
                  ><i class="fas fa-chevron-right cursor-pointer"></i
                ></span>
                Lịch sử đóng bảo hiểm
              </h4>
              <Transition name="slide-up">
                <div v-show="isInsuranceHistory == true" class="">
                  <div class="form-plus">
                    <div class="grid grid-cols-12 gap-2">
                      <div class="col-span-1">
                        <label for="" class="form-group-label">Từ tháng</label>
                      </div>
                      <div class="col-span-2">
                        <label for="" class="form-group-label">Hình thức</label>
                      </div>
                      <div class="col-span-3">
                        <label for="" class="form-group-label">Lý do</label>
                      </div>
                      <div class="col-span-2">
                        <label for="" class="form-group-label"
                          >Pháp nhân đóng</label
                        >
                      </div>
                      <div class="col-span-2">
                        <label for="" class="form-group-label"
                          >Mức đóng bảo hiểm</label
                        >
                      </div>
                      <div>
                        <label for="" class="form-group-label">CT đóng</label>
                      </div>
                      <div>
                        <label for="" class="form-group-label">NLĐ đóng</label>
                      </div>
                    </div>
                    <div v-if="personnel.personnel_premium_history?.length > 0">
                      <div
                        class="flex items-center mt-2"
                        v-for="(
                          item, index
                        ) in personnel.personnel_premium_history"
                        :key="index"
                      >
                        <div class="grid grid-cols-12 gap-2">
                          <div class="col-span-1">
                            <date-picker v-model="item.date_from"></date-picker>
                          </div>
                          <div class="col-span-2">
                            <input-type-premium
                              v-model="item.type"
                            ></input-type-premium>
                          </div>
                          <div class="col-span-3">
                            <input-reason-increase
                              v-model="item.reason"
                              v-if="item.type == 'up'"
                            ></input-reason-increase>
                            <input-reason-decrease
                              v-model="item.reason"
                              v-if="item.type == 'down'"
                            ></input-reason-decrease>
                          </div>
                          <div class="col-span-2">
                            <input-data-premium
                              v-model="item.object_legal"
                            ></input-data-premium>
                          </div>
                          <div class="col-span-2">
                            <CurrencyInput v-model="item.salary_premium_base" />
                          </div>
                          <div>
                            <input
                              type="text"
                              name=""
                              id=""
                              class="form-control-input disabledInput"
                              disabled
                              v-model="item.salary_premium_company"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              name=""
                              id=""
                              class="form-control-input disabledInput"
                              disabled
                              v-model="item.salary_premium_person"
                            />
                          </div>
                        </div>
                        <span @click="removePremiumHistory(index)"
                          ><i
                            class="fal fa-times icon-close mr-4"
                            style="margin-top: 15px"
                          ></i
                        ></span>
                      </div>
                    </div>
                    <div>
                      <span @click="createPremiumHistory()"
                        ><i class="fal fa-plus-circle icon-plus mt-2"></i
                      ></span>
                    </div>
                  </div>
                </div>
              </Transition>

              <div v-show="isInsuranceHistory == false">
                <h2
                  @click="isInsuranceHistory = !isInsuranceHistory"
                  class="cursor-pointer mt-2 form-group-label"
                >
                  Mã hợp đồng
                </h2>
              </div>

              <h4
                class="form-section-title form-small cursor-pointer"
                @click="isRegimeHistory = !isRegimeHistory"
              >
                <span v-show="isRegimeHistory == true"
                  ><i class="fas fa-chevron-down cursor-pointer"></i
                ></span>
                <span v-show="isRegimeHistory == false"
                  ><i class="fas fa-chevron-right cursor-pointer"></i
                ></span>
                Lịch sử giải quyết chế độ
              </h4>
              <Transition name="slide-up">
                <div v-show="isRegimeHistory == true" class="">
                  <div class="form-plus">
                    <div class="grid grid-cols-12 gap-2">
                      <div class="col-span-3">
                        <label for="" class="form-group-label"
                          >Loại chế độ</label
                        >
                      </div>
                      <div class="col-span-2">
                        <label for="" class="form-group-label"
                          >Ngày nhận hồ sơ</label
                        >
                      </div>
                      <div class="col-span-2">
                        <label for="" class="form-group-label"
                          >Ngày hoàn thiện TC</label
                        >
                      </div>
                      <div class="col-span-2">
                        <label for="" class="form-group-label"
                          >Ngày nhận tiền BH trả</label
                        >
                      </div>
                      <div class="col-span-2">
                        <label for="" class="form-group-label"
                          >Ngày nhận hồ sơ</label
                        >
                      </div>
                      <div>
                        <label for="" class="form-group-label">Số tiền</label>
                      </div>
                    </div>
                    <div
                      class="flex items-center mt-2"
                      v-for="(
                        item, index
                      ) in personnel.personnel_insurance_solve_history"
                      :key="index"
                    >
                      <div class="grid grid-cols-12 gap-2">
                        <div class="col-span-3">
                          <input-model-premium
                            v-model="item.model"
                          ></input-model-premium>
                        </div>
                        <div class="col-span-2">
                          <date-picker
                            v-model="item.premium_date_get"
                          ></date-picker>
                        </div>
                        <div class="col-span-2">
                          <date-picker
                            v-model="item.premium_date_complete"
                          ></date-picker>
                        </div>
                        <div class="col-span-2">
                          <date-picker
                            v-model="item.premium_date_close"
                          ></date-picker>
                        </div>
                        <div class="col-span-2">
                          <date-picker
                            v-model="item.premium_date_return"
                          ></date-picker>
                        </div>
                        <div>
                          <CurrencyInput v-model="item.price" />
                        </div>
                      </div>
                      <span @click="removeSolveHistory(index)"
                        ><i
                          class="fal fa-times icon-close mr-4"
                          style="margin-top: 15px"
                        ></i
                      ></span>
                    </div>
                    <div>
                      <span @click="createSolveHistory()"
                        ><i class="fal fa-plus-circle icon-plus mt-2"></i
                      ></span>
                    </div>
                  </div>
                </div>
              </Transition>

              <div v-show="isRegimeHistory == false">
                <h2
                  @click="isRegimeHistory = !isRegimeHistory"
                  class="cursor-pointer mt-2 form-group-label"
                >
                  Mã hợp đồng
                </h2>
              </div>
            </div>
          </the-tab>
        </Transition>

        <Transition name="slide-fade">
          <the-tab :isSelected="selected === 'Tiếp nhận'">
            <div class="text-left p-4">
              <div class="grid grid-cols-6 gap-4">
                <div
                  class="flex justify-start mt-1 col-span-2"
                  v-for="receive in receives"
                  :key="receive.ID"
                >
                  <div>
                    <input
                      type="checkbox"
                      name=""
                      :id="receive.ID"
                      v-model="personnel.json_receives"
                      :value="receive"
                    />
                  </div>
                  <label
                    :for="receive.ID"
                    class="cursor-pointer ml-1 form-group-label"
                    >{{ receive.title }}</label
                  >
                </div>
              </div>
            </div>
          </the-tab>
        </Transition>
        <Transition name="slide-fade">
          <the-tab :isSelected="selected === 'Đính kèm'">
            <div class="p-4">
              <attach-file></attach-file>
            </div>
          </the-tab>
        </Transition>
      </div>
    </Transition>
    <template v-slot:sub_footer
      ><div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="uploadPersonnel()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="this.$router.go(-1)">
            Hủy bỏ
          </button>
        </div>
      </div></template
    >
  </person-layout>
  <loading-overlay :isLoading="isLoading"></loading-overlay>
</template>

<script>
import TheTab from "@/components/tab/TheTab.vue";
import TabNav from "@/components/tab/TabNav.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarPersonnel from "@/components/sidebar/SidebarPersonnel.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreatePersonnel from "@/views/personnels/ButtonCreatePersonnel.vue";
import AttachFile from "@/components/constant/AttachFile.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import datePicker from "@/components/datePicker/datePicker.vue";
import InputSalaryRange from "@/components/constant/InputSalaryRange.vue";
import InputWorkplace from "@/components/constant/InputWorkplace.vue";
import InputContractType from "@/components/constant/InputContractType.vue";
import InputDepartment from "@/components/constant/InputDepartment.vue";
import InputPosition from "@/components/constant/InputPosition.vue";
import InputPositiontitle from "@/components/constant/InputPositiontitle.vue";
import InputWorkType from "@/components/constant/InputWorkType.vue";
import InputGender from "@/components/constant/InputGender.vue";
import InputMarital from "@/components/constant/TotalInput/InputMarital.vue";
import InputImage from "@/components/constant/TotalInput/InputImage.vue";
import InputLevel from "@/components/constant/TotalInput/InputLevel.vue";
import InputNationality from "@/components/constant/TotalInput/InputNationality.vue";
import InputPeople from "@/components/constant/TotalInput/InputPeople.vue";
import InputReligion from "@/components/constant/TotalInput/InputReligion.vue";
import InputBank from "@/components/constant/TotalInput/InputBank.vue";
import InputLevelSchool from "@/components/constant/TotalInput/InputLevelSchool.vue";
import InputAcademic from "@/components/constant/TotalInput/InputAcademic.vue";
import InputGpsLocation from "@/components/constant/TotalInput/InputGps.vue";
import InputManager from "@/components/constant/TotalInput/InputManager.vue";
import InputRelationship from "@/components/constant/TotalInput/InputRelationship.vue";
import InputTypeTraining from "@/components/constant/TotalInput/InputTypeTraining.vue";
import InputTypeCommunist from "@/components/constant/TotalInput/InputTypeCommunist.vue";
import InputTypeSalary from "@/components/constant/TotalInput/InputTypeSalary.vue";
import InputAllowance from "@/components/constant/TotalInput/InputAllowance.vue";
import InputStatusInsurance from "@/components/constant/TotalInput/InputStatusInsurance.vue";
import InputDataPremium from "@/components/constant/TotalInput/InputDataPremium.vue";
import InputPremiumCode from "@/components/constant/TotalInput/InputPremiumCode.vue";
import InputPremiumPlace from "@/components/constant/TotalInput/InputPremiumPlace.vue";
import InputTypePremium from "@/components/constant/TotalInput/InputTypePremium.vue";
import InputReasonIncrease from "@/components/constant/TotalInput/InputReasonIncrease.vue";
import InputReasonDecrease from "@/components/constant/TotalInput/InputReasonDecrease.vue";
import InputModelPremium from "@/components/constant/TotalInput/InputModelPremium.vue";
import CurrencyInput from "@/components/CurrencyInput.vue";
import { reactive, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { FormatInputDate, FormatPrice } from "@/constants/FormatAll";
import { useToast } from "vue-toastification";
import { TIMEKEEP_CODE } from "@/constants/ApiUrl";
import { useAcademic } from "@/store/modules/personnelView/academics";
import { usePersonnelCode } from "@/store/modules/settingPersonnel/personnelCode";
import { storeToRefs } from "pinia";
export default {
  components: {
    TheTab,
    TabNav,
    PersonLayout,
    SidebarPersonnel,
    NavbarSocial,
    ButtonCreatePersonnel,
    NavFeature,
    datePicker,
    AttachFile,
    InputSalaryRange,
    InputWorkplace,
    InputContractType,
    InputDepartment,
    InputPosition,
    InputPositiontitle,
    InputWorkType,
    InputGender,
    InputMarital,
    InputImage,
    InputLevel,
    InputNationality,
    InputPeople,
    InputReligion,
    InputBank,
    InputLevelSchool,
    InputAcademic,
    InputGpsLocation,
    InputManager,
    InputRelationship,
    InputTypeTraining,
    InputTypeCommunist,
    InputTypeSalary,
    CurrencyInput,
    InputAllowance,
    InputStatusInsurance,
    InputDataPremium,
    InputPremiumCode,
    InputPremiumPlace,
    InputTypePremium,
    InputReasonIncrease,
    InputReasonDecrease,
    InputModelPremium,
  },
  data() {
    return {
      isInfor: true,
      isAddres: true,
      isFamily: true,
      isSchool: true,
      isParty: true,
      isExp: true,
      isContract: true,
      isInsurance: true,
      isIncrease: true,
      isReduce: true,
      isInsuranceHistory: true,
      isRegimeHistory: true,
      isSalary: true,
    };
  },
  methods: {
    changeImageFront(index) {
      this.personnel.private_code_front = index;
    },
    changeImageBack(index) {
      this.personnel.private_code_back = index;
    },
    formatdate(date) {
      return FormatInputDate(date);
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const toast = useToast();
    const isLoading = ref(true);
    const selected = ref("Sơ yếu lý lịch");
    const academic = useAcademic();
    const listAttendance = ref([{ prefix: null, suffixes: null }]);
    const listTimekeepCode = ref(TIMEKEEP_CODE);
    const code = usePersonnelCode();
    const { codePersonnel, LastCode } = storeToRefs(code);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
    const json_salaries = reactive([
      {
        date_start: "",
        desc: "",
        json_type_salary: [
          {
            type_salary: null,
            money: null,
          },
        ],
        json_allowances: [
          {
            allowance: null,
            money: null,
          },
        ],
      },
    ]);
    const emptyCode = ref("");
    const emptyName = ref("");
    const job_date_join = new Date().toISOString().substring(0, 10);
    const timekeepCode = reactive({
      prefix: null,
      suffixes: null,
    });
    code.getPersonnelCodeAction();
    store.dispatch("places/getAllCountryAction");
    academic.GetAllAcademicsAction();
    const personnel = reactive({
      code: LastCode.value,
      attendace_code: "",
      code_storage: "",
      name: "",
      birthday: "",
      gender: "0",
      place_of_birthday_address: "",
      place_of_birthday_city_id: null,
      place_of_birthday_district_id: null,
      place_of_birthday_ward_id: null,
      origin_state_address: "",
      origin_city_id: null,
      origin_district_id: null,
      origin_ward_id: null,
      private_code: "",
      private_code_date: "",
      private_code_place: null,
      private_code_front: "",
      private_code_back: "",
      marital_status: null,
      nationality: 1,
      people: 1,
      religious: 1,
      job_tax: "",
      level_id: null,
      job_date_join: job_date_join,
      job_reldate_join: "",
      level_school: null,
      level_academic: null,
      gps_location_ids: [],
      live_manager_id: null,
      json_mobile: [],
      personal_email: "",
      company_email: "",
      home_address: "",
      place_home_address: "",
      home_address_city_id: null,
      home_address_district_id: null,
      home_address_ward_id: null,
      current_address: "",
      place_current_address: "",
      current_address_city_id: null,
      current_address_district_id: null,
      current_address_ward_id: null,
      json_banks: [
        {
          bank_account: "",
          bank_account_name: "",
          bank_name: "",
          bank_address: "",
        },
      ],
      json_family: [
        {
          relative_id: null,
          relative_name: "",
          relative_birthday: "",
          relative_desc: "",
          relative_phone: "",
          relative_is_dependent: 0,
          relative_dependent_from_date: "",
          relative_dependent_to_date: "",
          relative_dependent_tax: "",
        },
      ],
      json_degrees: [
        {
          degree_date_from: "",
          degree_date_to: "",
          degree_level_id: null,
          degress_place: "",
          degree_specialization: "",
          degree_type_id: null,
        },
      ],
      json_communist: [
        {
          communist_date_from: "",
          communist_date_to: "",
          communist_address_join: "",
          communist_code: "",
          status_communist: null,
          communist_address_transfer: "",
        },
      ],
      json_experience: [
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
      contract_code: "",
      contract_type: null,
      department_id: null,
      work_type: null,
      position_id: null,
      job_title: null,
      work_place: null,
      quantum_id: null,
      date_start: "",
      date_finish: "",
      date_reg: "",
      representative_id: "",
      is_econtract: false,
      desc_contract: "",
      json_receives: [],
      json_salaries: [
        {
          date_start: "",
          desc: "",
          json_type_salary: [
            {
              type_salary: null,
              money: null,
            },
          ],
          json_allowances: [
            {
              allowance: null,
              money: null,
            },
          ],
          premium_salary: null,
        },
      ],
      // insurance
      premium_number: "",
      premium_insurance_status: null,
      premium_personnel: null,
      premium_card: "",
      premium_code: null,
      premium_place: null,
      insup_date_get: null,
      insup_date_complete: null,
      insup_date_close: null,
      insup_date_return: null,
      insdown_date_close: null,
      insdown_date_complete: null,
      insdown_date_return: null,
      insdown_date_get: null,
      personnel_premium_history: [
        // {
        //   date_from: null,
        //   type: "up",
        //   reason: null,
        //   salary_premium_base: null,
        //   object_legal: null,
        // },
      ],
      personnel_insurance_solve_history: [
        {
          model: null,
          premium_date_get: null,
          premium_date_complete: null,
          premium_date_close: null,
          premium_date_return: null,
          price: null,
        },
      ],
    });

    const loadPlace = () => {
      if (listCity.value?.length == 0) {
        store.dispatch("places/getAllCityAction");
      }
    };
    // Start load select option
    const changeCity = (event) => {
      store.dispatch("places/getAllDistrictsAction", event.ID);
      personnel.place_of_birthday_address = event.title;
    };
    const changeDistrict = (event) => {
      store.dispatch("places/getAllWardsAction", event.ID);
      personnel.place_of_birthday_address =
        event.title + "," + personnel.place_of_birthday_address;
    };
    const changeWard = (event) => {
      personnel.place_of_birthday_address =
        event.title + "," + personnel.place_of_birthday_address;
    };
    const changeCityOrigin = (event) => {
      store.dispatch("places/getAllDistrictsOriginAction", event.ID);
      personnel.origin_state_address = event.title;
    };
    const changeDistrictOrigin = (event) => {
      store.dispatch("places/getAllWardsOriginAction", event.ID);
      personnel.origin_state_address =
        event.title + "," + personnel.origin_state_address;
    };
    const changeWardOrigin = (event) => {
      personnel.origin_state_address =
        event.title + "," + personnel.origin_state_address;
    };
    const changeCityHome = (event) => {
      store.dispatch("places/getAllDistrictsHomeAction", event.ID);
      personnel.place_home_address = event.title;
    };
    const changeDistrictHome = (event) => {
      store.dispatch("places/getAllWardsHomeAction", event.ID);
      personnel.place_home_address =
        event.title + "," + personnel.place_home_address;
    };
    const changeWardHome = (event) => {
      personnel.place_home_address =
        event.title + "," + personnel.place_home_address;
    };
    const changeCityCurrent = (event) => {
      store.dispatch("places/getAllDistrictsCurrentAction", event.ID);
      personnel.place_current_address = event.title;
    };
    const changeDistrictCurrent = (event) => {
      store.dispatch("places/getAllWardsCurrentAction", event.ID);
      personnel.place_current_address =
        event.title + "," + personnel.place_current_address;
    };
    const changeWardCurrent = (event) => {
      personnel.place_current_address =
        event.title + "," + personnel.place_current_address;
    };

    // End select option
    const receives = computed(
      () => store.getters["categories/getAllReceivesActive"]
    );
    const listCity = computed(() => store.state.places.listCity);
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
    const listContractTypes = computed(
      () => store.getters["contractTypes/listContractTypesOn"]
    );
    const listWorkTypes = computed(
      () => store.getters["workTypes/GetAllWorkTypeActive"]
    );
    const listWorkplace = computed(
      () => store.getters["workplace/getAllWorkplaceActive"]
    );
    const listPositiontitles = computed(
      () => store.state.positiontitles.listPositiontitles
    );
    const listPositions = computed(
      () => store.getters["positions/getAllPositionsActive"]
    );
    const listDepartments = computed(
      () => store.state.departments.listDepartments
    );
    const listCountry = computed(() => store.state.places.listCountry);
    const formatPrice = (price) => {
      return FormatPrice(price);
    };
    // const formatUpperCase = (index) => {
    //   personnel.job_bank_account_name = index.toUpperCase();
    // };
    const setSelected = (tab) => {
      selected.value = tab;
      if (tab == "Tiếp nhận") {
        if (receives.value?.length == 0) {
          store.dispatch("categories/getAllReceiveAction", 100);
        }
      }
      if (tab == "Hợp đồng") {
        if (listDepartments.value?.length == 0) {
          store.dispatch("departments/getAllDepartmentsAction");
        }
        if (listPositions.value?.length == 0) {
          store.dispatch("positions/getAllPositionsAction", 500);
        }
        if (listPositiontitles.value?.length == 0) {
          store.dispatch("positiontitles/getAllPositiontitlesAction", 100);
        }
        if (listContractTypes.value?.length == 0) {
          store.dispatch("contractTypes/GetAllContractTypeAction", 50);
        }
      }
    };
    // Start infoFamily
    const createFamily = () => {
      const data = {
        relative_id: null,
        relative_name: "",
        relative_birthday: "",
        relative_desc: "",
        relative_phone: "",
        relative_is_dependent: 0,
        relative_dependent_from_date: "",
        relative_dependent_to_date: "",
        relative_dependent_tax: "",
      };
      personnel.json_family.push(data);
    };
    const removeFamily = (index) => {
      personnel.json_family.splice(index, 1);
    };
    // End infoFamily
    // Start infoSchool
    const createSchool = () => {
      const data = {
        degree_date_from: "",
        degree_date_to: "",
        degree_level_id: null,
        degress_place: "",
        degree_specialization: "",
        degree_type_id: null,
      };
      personnel.json_degrees.push(data);
    };
    const removeSchool = (index) => {
      personnel.json_degrees.splice(index, 1);
    };
    // End infoSchool
    // Start infoParty
    const createParty = () => {
      const data = {
        communist_date_from: "",
        communist_date_to: "",
        communist_address_join: "",
        communist_code: "",
        status_communist: "",
        communist_address_transfer: "",
      };
      personnel.json_communist.push(data);
    };
    const removeParty = (index) => {
      personnel.json_communist.splice(index, 1);
    };
    // End infoParty
    // Start infoExp
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
      personnel.json_experience.push(data);
    };
    const removeExp = (index) => {
      personnel.json_experience.splice(index, 1);
    };
    // End infoExp
    // start salary
    const addSalary = () => {
      const data = {
        date: "",
        desc: "",
        json_type_salary: [
          {
            type_salary: null,
            money: null,
          },
        ],
        json_allowances: [
          {
            allowance: null,
            money: null,
          },
        ],
      };
      personnel.json_salaries.push(data);
    };
    const removeSalary = (index) => {
      personnel.json_salaries.splice(index, 1);
    };
    const addTypesalary = (index) => {
      const data = {
        type_salary: null,
        money: null,
      };
      personnel.json_salaries[index].json_type_salary.push(data);
    };
    const removeTypesalary = (index, num) => {
      personnel.json_salaries[index].json_type_salary.splice(num, 1);
    };
    const addAllowance = (index) => {
      const data = {
        allowance: null,
        money: null,
      };
      personnel.json_salaries[index].json_allowances.push(data);
    };
    const removeAllowance = (index, num) => {
      personnel.json_salaries[index].json_allowances.splice(num, 1);
    };
    // end salary
    // start premium_history
    const createPremiumHistory = () => {
      const data = {
        date_from: null,
        type: "up",
        reason: null,
        object_legal: null,
        salary_premium_base: null,
        salary_premium_company: 0,
        salary_premium_person: 0,
      };
      personnel.personnel_premium_history.push(data);
    };
    const removePremiumHistory = (index) => {
      personnel.personnel_premium_history.splice(index, 1);
    };
    // end premium_history
    // start personnel_insurance_solve_history
    const createSolveHistory = () => {
      const data = {
        model: null,
        premium_date_get: null,
        premium_date_complete: null,
        premium_date_close: null,
        premium_date_return: null,
        price: null,
      };
      personnel.personnel_insurance_solve_history.push(data);
    };
    const removeSolveHistory = (index) => {
      personnel.personnel_insurance_solve_history.splice(index, 1);
    };
    const createAttendanceCode = () => {
      const data = { prefix: null, suffixes: null };
      listAttendance.value.push(data);
    };
    //start json bank
    const createBankAccount = () => {
      const data = {
        bank_account: "",
        bank_account_name: "",
        bank_name: "",
        bank_address: "",
      };
      personnel.json_banks.push(data);
    };
    const removeBankAccount = (index) => {
      personnel.json_banks.splice(index, 1);
    };
    //end json bank
    const PushTimeKeep = () => {
      let array = [];
      for (let i = 0; i < listAttendance.value.length; i++) {
        array.push(
          listAttendance.value[i].prefix +
            "." +
            listAttendance.value[i].suffixes
        );
      }
      personnel.attendace_code = array.toString();
    };
    const removeAttendanceCode = (index) => {
      listAttendance.value.splice(index, 1);
      let array = [];
      for (let i = 0; i < listAttendance.value.length; i++) {
        array.push(
          listAttendance.value[i].prefix +
            "." +
            listAttendance.value[i].suffixes
        );
      }
      personnel.attendace_code = array.toString();
    };
    // end personnel_insurance_solve_history
    const uploadPersonnel = () => {
      const data = {
        code: personnel.code,
        attendace_code: personnel.attendace_code,
        code_storage: personnel.code_storage,
        name: personnel.name,
        birthday: personnel.birthday,
        gender: personnel.gender,
        place_of_birthday_address: personnel.place_of_birthday_address,
        place_of_birth_city_id: personnel.place_of_birth_city_id,
        place_of_birth_district_id: personnel.place_of_birth_district_id,
        place_of_birth_ward_id: personnel.place_of_birth_ward_id,
        origin_city_id: personnel.origin_city_id,
        origin_district_id: personnel.origin_district_id,
        origin_ward_id: personnel.origin_ward_id,
        origin_state_address: personnel.origin_state_address,
        private_code: personnel.private_code,
        private_code_date: personnel.private_code_date,
        private_code_place: personnel.private_code_place,
        private_code_front: personnel.private_code_front,
        private_code_back: personnel.private_code_back,
        marital_status: personnel.marital_status,
        nationality: personnel.nationality,
        people: personnel.people,
        religious: personnel.religious,
        job_tax: personnel.job_tax,
        level_id: personnel.level_id,
        job_date_join: personnel.job_date_join,
        job_reldate_join: personnel.job_reldate_join,
        level_school: personnel.level_school,
        level_academic: personnel.level_academic,
        gps_location_ids: personnel.gps_location_ids,
        live_manager_id: personnel.live_manager_id,
        json_mobile: personnel.json_mobile,
        personal_email: personnel.personal_email,
        company_email: personnel.company_email,
        home_address: personnel.home_address,
        place_home_address: personnel.place_home_address,
        home_address_city_id: personnel.home_address_city_id,
        home_address_district_id: personnel.home_address_district_id,
        home_address_ward_id: personnel.home_address_ward_id,
        current_address: personnel.current_address,
        place_current_address: personnel.place_current_address,
        current_address_city_id: personnel.current_address_city_id,
        current_address_district_id: personnel.current_address_district_id,
        current_address_ward_id: personnel.current_address_ward_id,
        json_banks: personnel.json_banks,
        json_family: personnel.json_family,
        json_degrees: personnel.json_degrees,
        json_communist: personnel.json_communist,
        json_experience: personnel.json_experience,
        contract_code: personnel.contract_code,
        contract_type: personnel.contract_type,
        department_id: personnel.department_id,
        work_type: personnel.work_type,
        position_id: personnel.position_id,
        job_title: personnel.job_title,
        work_place: personnel.work_place,
        quantum_id: personnel.quantum_id,
        date_start: personnel.date_start,
        date_finish: personnel.date_finish,
        date_reg: personnel.date_reg,
        representative_id: personnel.representative_id,
        is_econtract: personnel.is_econtract,
        desc_contract: personnel.desc_contract,
        json_receives: personnel.json_receives,
        json_salaries: personnel.json_salaries,
        // insurance
        premium_number: personnel.premium_number,
        premium_insurance_status: personnel.premium_insurance_status,
        premium_personnel: personnel.premium_personnel,
        premium_card: personnel.premium_card,
        premium_code: personnel.premium_code,
        premium_place: personnel.premium_place,
        insup_date_get: personnel.insup_date_get,
        insup_date_complete: personnel.insup_date_complete,
        insup_date_close: personnel.insup_date_close,
        insup_date_return: personnel.insup_date_return,
        insdown_date_close: personnel.insdown_date_close,
        insdown_date_complete: personnel.insdown_date_complete,
        insdown_date_return: personnel.insdown_date_return,
        insdown_date_get: personnel.insdown_date_get,
        personnel_premium_history: personnel.personnel_premium_history,
        personnel_insurance_solve_history:
          personnel.personnel_insurance_solve_history,
      };
      if (data.code) {
        if (data.name.length > 0) {
          isLoading.value = true;
          store.dispatch("personnels/createPersonnelAction", {
            data: data,
            toast,
            EndTimeLoading,
            router,
          });
        } else {
          emptyName.value = "Họ tên nhân viên chưa nhập";
          toast.error("Họ tên nhân viên chưa nhập!");
        }
      } else {
        emptyCode.value = "Mã NS chưa nhập";
        toast.error("Mã nhân viên chưa nhập!");
      }
    };
    return {
      selected,
      loadPlace,
      receives,
      listCity,
      listCountry,
      listDepartments,
      listContractTypes,
      listWorkTypes,
      listWorkplace,
      listPositiontitles,
      listPositions,
      personnel,
      job_date_join,
      json_salaries,
      listAttendance,
      codePersonnel,
      EndTimeLoading,
      PushTimeKeep,
      // Start load select option
      setSelected,
      // End select option
      emptyCode: emptyCode,
      emptyName: emptyName,
      createBankAccount,
      removeBankAccount,
      uploadPersonnel,
      createAttendanceCode,
      removeAttendanceCode,
      createFamily,
      removeFamily,
      createSchool,
      removeSchool,
      createParty,
      removeParty,
      createExp,
      removeExp,
      formatPrice,

      // formatUpperCase,
      addSalary,
      removeSalary,
      addTypesalary,
      removeTypesalary,
      addAllowance,
      removeAllowance,
      changeCity,
      changeDistrict,
      changeWard,
      changeCityOrigin,
      changeDistrictOrigin,
      changeWardOrigin,
      changeCityHome,
      changeDistrictHome,
      changeWardHome,
      changeCityCurrent,
      changeDistrictCurrent,
      changeWardCurrent,
      listDistricts,
      listWards,
      listDistrictsOrigin,
      listWardsOrigin,
      listDistrictsHome,
      listWardsHome,
      listDistrictsCurrent,
      listWardsCurrent,
      createPremiumHistory,
      removePremiumHistory,
      createSolveHistory,
      removeSolveHistory,
      isLoading,
      listTimekeepCode,
      timekeepCode,
      LastCode,
    };
  },
};
</script>

<style></style>
