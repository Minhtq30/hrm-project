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
            <p class="longText">Cập nhật nhân sự</p>
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
              'Công việc',
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
        <div title="Sơ yếu lý lịch">
          <the-tab :isSelected="selected === 'Sơ yếu lý lịch'">
            <div class="text-left p-4 w-full">
              <div class="">
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
                <Transition name="slide-fade">
                  <div v-show="isInfor == true">
                    <div class="grid grid-cols-3 gap-2 form-small">
                      <div>
                        <label for="" class="form-group-label"
                          >Mã nhân sự<span class="text-red-600">*</span></label
                        >
                        <div>
                          <input
                            type="text"
                            name=""
                            id=""
                            class="form-control-input"
                            placeholder="Nhập mã"
                            v-model="personnelDetail.code"
                            :class="{ emptyInput: emptyCode }"
                          />
                          <span
                            v-if="personnelDetail.code == 0"
                            :class="{ emptyError: emptyCode }"
                            >{{ emptyCode }}</span
                          >
                        </div>
                      </div>
                      <div>
                        <label for="" class="form-group-label"
                          >Mã chấm công<span class="text-red-600"
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
                            placeholder="HN.123"
                            v-model="personnelDetail.attendace_code"
                          />
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
                            v-model="personnelDetail.code_storage"
                          />
                        </div>
                      </div>
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
                            v-model="personnelDetail.name"
                            :class="{ emptyInput: emptyName }"
                          />
                          <span
                            v-if="personnelDetail.name == 0"
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
                            v-model="personnelDetail.birthday"
                          ></date-picker>
                        </div>
                      </div>
                      <div>
                        <label for="" class="form-group-label">Giới tính</label>
                        <div>
                          <input-gender
                            v-model="personnelDetail.gender"
                          ></input-gender>
                        </div>
                      </div>
                    </div>
                    <div class="form-large">
                      <div>
                        <label for="" class="form-group-label">Nơi sinh</label>
                        <div class="grid grid-cols-3 gap-2">
                          <div>
                            <v-select
                              label="title"
                              :options="listCity"
                              :reduce="(city) => city.ID"
                              @input="loadPlace($event)"
                              @option:selected="changeCity($event)"
                              v-model="personnelDetail.place_of_birth_city_id"
                              placeholder="Chọn tỉnh/thành phố"
                            ></v-select>
                          </div>
                          <div>
                            <v-select
                              label="title"
                              :options="listDistricts"
                              :reduce="(district) => district.ID"
                              @option:selected="changeDistrict($event)"
                              v-model="
                                personnelDetail.place_of_birth_district_id
                              "
                              placeholder="Chọn quận/huyện"
                            ></v-select>
                          </div>
                          <div>
                            <v-select
                              label="title"
                              :options="listWards"
                              :reduce="(ward) => ward.ID"
                              v-model="personnelDetail.place_of_birth_ward_id"
                              placeholder="Chọn xã/phường"
                            ></v-select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-large">
                      <div>
                        <label for="" class="form-group-label"
                          >Chọn nguyên quán</label
                        >
                        <div class="grid grid-cols-3 gap-2">
                          <div>
                            <v-select
                              label="title"
                              :options="listCity"
                              :reduce="(city) => city.ID"
                              @input="loadPlace($event)"
                              @option:selected="changeCityOrigin($event)"
                              placeholder="Chọn tỉnh/thành phố"
                              v-model="personnelDetail.origin_city_id"
                            ></v-select>
                          </div>
                          <div>
                            <v-select
                              label="title"
                              :options="listDistrictsOrigin"
                              :reduce="(district) => district.ID"
                              @option:selected="changeDistrictOrigin($event)"
                              placeholder="Chọn quận/huyện"
                              v-model="personnelDetail.origin_district_id"
                            ></v-select>
                          </div>
                          <div>
                            <v-select
                              label="title"
                              :options="listWardsOrigin"
                              :reduce="(ward) => ward.ID"
                              placeholder="Chọn xã/phường"
                              v-model="personnelDetail.origin_ward_id"
                            ></v-select>
                          </div>
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
                            v-model="personnelDetail.private_code"
                          />
                        </div>
                      </div>
                      <div>
                        <label for="" class="form-group-label">Ngày cấp</label>
                        <div>
                          <date-picker
                            v-model="personnelDetail.private_code_date"
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
                            v-model="personnelDetail.private_code_place"
                            @input="loadPlace($event)"
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
                        <div
                          class="w-full relative h-40 border-dashed border border-gray-400 rounded-lg hover:border-orange-400 icon-parent"
                        >
                          <input
                            type="file"
                            accept="image/*"
                            @change="previewFiles_1($event)"
                            name=""
                            id=""
                            class="absolute top-0 right-0 cursor-pointer w-full h-full opacity-0"
                            style="z-index: 2"
                          />
                          <img
                            :src="
                              img_1 ||
                              'https://www.namepros.com/attachments/empty-png.89209/'
                            "
                            alt=""
                            class="absolute object-cover top-0 right-0 w-full h-full rounded-lg"
                          />
                          <div
                            class="absolute cursor-pointer w-full h-full flex items-center justify-center"
                          >
                            <i
                              class="bi bi-upload text-4xl icon-child opacity-50"
                            ></i>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label for="" class="form-group-label"
                          >Ảnh mặt sau</label
                        >
                        <div
                          class="w-full relative h-40 border-dashed border border-gray-400 rounded-lg hover:border-orange-400 icon-parent"
                        >
                          <input
                            type="file"
                            accept="image/*"
                            @change="previewFiles_2($event)"
                            name=""
                            id=""
                            class="absolute top-0 right-0 cursor-pointer w-full h-full opacity-0"
                            style="z-index: 2"
                          />
                          <img
                            :src="
                              img_2 ||
                              'https://www.namepros.com/attachments/empty-png.89209/'
                            "
                            alt=""
                            class="absolute object-cover top-0 right-0 w-full h-full rounded-lg"
                          />
                          <div
                            class="absolute cursor-pointer w-full h-full flex items-center justify-center"
                          >
                            <i
                              class="bi bi-upload text-4xl icon-child opacity-50"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 form-small">
                      <div>
                        <label for="" class="form-group-label"
                          >Tình trạng hôn nhân</label
                        >
                        <div>
                          <input-marital
                            v-model="personnelDetail.marital_status"
                          ></input-marital>
                        </div>
                      </div>
                      <div>
                        <label for="" class="form-group-label">Quốc tịch</label>
                        <div>
                          <input-nationality
                            v-model="personnelDetail.nationality"
                          ></input-nationality>
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 form-small">
                      <div>
                        <label for="" class="form-group-label">Dân tộc</label>
                        <div>
                          <input-people
                            v-model="personnelDetail.people"
                          ></input-people>
                        </div>
                      </div>
                      <div>
                        <label for="" class="form-group-label">Tôn giáo</label>
                        <div>
                          <input-religion
                            v-model="personnelDetail.religious"
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
                    <div v-if="personnelDetail.json_banks">
                      <div
                        v-for="(item, index) in personnelDetail.json_banks"
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
                          v-model="personnelDetail.job_tax"
                        />
                      </div>
                    </div>
                    <div class="form-small">
                      <label for="" class="form-group-label">Cấp bậc</label>
                      <div>
                        <input-level
                          v-model="personnelDetail.level_id"
                        ></input-level>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 form-small">
                      <div>
                        <label for="" class="form-group-label"
                          >Trình độ phổ thông</label
                        >
                        <div>
                          <input-level-school
                            v-model="personnelDetail.level_school"
                          ></input-level-school>
                        </div>
                      </div>
                      <div>
                        <label for="" class="form-group-label"
                          >Trình độ học vấn cao nhất</label
                        >
                        <div>
                          <input-academic
                            v-model="personnelDetail.level_academic"
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
                          v-model="personnelDetail.gps_location_ids"
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
                          v-model="personnelDetail.live_manager_id"
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
                <Transition name="slide-fade">
                  <div v-show="isAddres == true">
                    <div class="form-small">
                      <label for="" class="form-group-label">Điện thoại</label>
                      <div>
                        <v-select
                          no-drop
                          taggable
                          multiple
                          placeholder="Nhập số điện thoại, Enter để nhập nhiều"
                          v-model="personnelDetail.mobile"
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
                            v-model="personnelDetail.personal_email"
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
                            v-model="personnelDetail.company_email"
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
                              @input="loadPlace($event)"
                              @option:selected="changeCityHome($event)"
                              placeholder="Chọn tỉnh/thành phố"
                              v-model="personnelDetail.home_address_city_id"
                            ></v-select>
                          </div>
                          <div>
                            <v-select
                              label="title"
                              :options="listDistrictsHome"
                              :reduce="(district) => district.ID"
                              @option:selected="changeDistrictHome($event)"
                              placeholder="Chọn quận/huyện"
                              v-model="personnelDetail.home_address_district_id"
                            ></v-select>
                          </div>
                          <div>
                            <v-select
                              label="title"
                              :options="listWardsHome"
                              :reduce="(ward) => ward.ID"
                              placeholder="Chọn xã/phường"
                              v-model="personnelDetail.home_address_ward_id"
                            ></v-select>
                          </div>
                        </div>
                      </div>
                      <div class="col-span-2">
                        <label for="" class="form-group-label"
                          >Thường trú</label
                        >
                        <div>
                          <input
                            type="text"
                            name=""
                            id=""
                            class="form-control-input"
                            placeholder="Số 10, Quang Trung..."
                            v-model="personnelDetail.home_address"
                          />
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
                              @input="loadPlace($event)"
                              @option:selected="changeCityCurrent($event)"
                              placeholder="Chọn tỉnh/thành phố"
                              v-model="personnelDetail.current_address_city_id"
                            ></v-select>
                          </div>
                          <div>
                            <v-select
                              label="title"
                              :options="listDistrictsCurrent"
                              :reduce="(district) => district.ID"
                              @option:selected="changeDistrictCurrent($event)"
                              placeholder="Chọn quận/huyện"
                              v-model="
                                personnelDetail.current_address_district_id
                              "
                            ></v-select>
                          </div>
                          <div>
                            <v-select
                              label="title"
                              :options="listWardsCurrent"
                              :reduce="(ward) => ward.ID"
                              placeholder="Chọn xã/phường"
                              v-model="personnelDetail.current_address_ward_id"
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
                            v-model="personnelDetail.current_address"
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
              <div class="">
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
                <Transition name="slide-fade">
                  <div v-show="isFamily == true" class="form-plus">
                    <div
                      class="flex items-center form-plus"
                      v-if="personnelDetail.json_family?.length"
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
                      v-for="(infoFamily, index) in personnelDetail.json_family"
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
                          v-model="infoFamily.dependent_tax"
                          :disabled="infoFamily.is_dependent == 0"
                          :class="{
                            disabledInput: infoFamily.is_dependent == 0,
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
                    <div class="mt-1">
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
              <div class="">
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
                <Transition name="slide-fade">
                  <div v-show="isSchool == true" class="form-large-plus">
                    <div
                      class="form-plus flex items-center"
                      v-if="personnelDetail.json_degrees?.length"
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
                      v-for="(
                        infoSchool, index
                      ) in personnelDetail.json_degrees"
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

                    <div class="mt-1">
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
              <div class="">
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
                <Transition name="slide-fade">
                  <div v-show="isParty == true" class="form-large-plus">
                    <div
                      class="form-plus flex items-center"
                      v-if="personnelDetail.json_communist?.length"
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
                      v-for="(
                        infoParty, index
                      ) in personnelDetail.json_communist"
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
                    <div class="mt-1">
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
                    chuyển.
                  </h2>
                </div>
              </div>
              <div class="">
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
                <Transition name="slide-fade">
                  <div v-show="isExp == true" class="form-plus">
                    <div
                      class="form-plus flex items-center"
                      v-if="personnelDetail.json_experience?.length"
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
                      v-for="(
                        infoExp, index
                      ) in personnelDetail.json_experience"
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
                    <div class="mt-1">
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
        </div>
        <div>
          <the-tab :isSelected="selected === 'Công việc'">
            <div
              class="text-left p-4 w-full"
              title="Công việc"
              v-if="isLoading == false"
            >
              <div>
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
                  <div v-show="isContract == true" class="">
                    <div class="form-small">
                      <div>
                        <label for="" class="form-group-label">Phòng ban</label>
                        <div>
                          <input-department
                            v-model="personnelDetail.department_id"
                          ></input-department>
                        </div>
                      </div>
                    </div>
                    <div class="form-small">
                      <div>
                        <label for="" class="form-group-label">Hình thức</label>
                        <div>
                          <input-work-type
                            v-model="personnelDetail.work_type"
                          ></input-work-type>
                        </div>
                      </div>
                    </div>
                    <div class="form-small">
                      <div>
                        <label for="" class="form-group-label">Vị trí</label>
                        <div>
                          <input-position
                            v-model="personnelDetail.position_id"
                          ></input-position>
                        </div>
                      </div>
                    </div>
                    <div class="form-small">
                      <div>
                        <label for="" class="form-group-label">Chức vụ</label>
                        <div>
                          <input-positiontitle
                            v-model="personnelDetail.job_title"
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
                            v-model="personnelDetail.work_place"
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
                            v-model="personnelDetail.quantum_id"
                          ></input-salary-range>
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 form-small">
                      <div>
                        <label for="" class="form-group-label">Ngày vào</label>
                        <div>
                          <date-picker
                            v-model="personnelDetail.job_date_join"
                          ></date-picker>
                        </div>
                      </div>
                      <div>
                        <label for="" class="form-group-label"
                          >Ngày vào chính thức</label
                        >
                        <div>
                          <date-picker
                            v-model="personnelDetail.job_reldate_join"
                          ></date-picker>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition>
                <Transition>
                  <div v-show="isContract == false">
                    <h2
                      @click="isContract = !isContract"
                      class="cursor-pointer mt-2 form-group-label"
                    >
                      Mã hợp đồng *, Hợp đồng *, Phòng ban, Hình thức, Vị trí,
                      Chức vụ, Nơi làm việc, Ngạch lương, Hiệu lực từ ngày *,
                      Đến ngày, Ngày ký, Người ký
                    </h2>
                  </div>
                </Transition>
              </div>
              <div title="Thông tin lương & phụ cấp" class="form-large">
                <h4
                  class="form-section-title form-small cursor-pointer"
                  @click="isSalaries = !isSalaries"
                >
                  <span v-show="isSalaries == true"
                    ><i class="fas fa-chevron-down cursor-pointer"></i
                  ></span>
                  <span v-show="isSalaries == false"
                    ><i class="fas fa-chevron-right cursor-pointer"></i
                  ></span>
                  Thông tin lương& phụ cấp
                </h4>
                <Transition name="slide-fade">
                  <div v-show="isSalaries" class="form-small">
                    <div
                      v-for="(salary, index) in personnelDetail.salaries"
                      :key="index"
                    >
                      <div class="flex items-center">
                        <div class="grid grid-cols-5 gap-2 w-full">
                          <div class="col-span-2">
                            <label for="" class="form-group-label"
                              >Từ ngày</label
                            >
                            <div>
                              <date-picker
                                v-model="salary.date_start"
                              ></date-picker>
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
                          <i class="fal fa-times icon-close"></i>
                        </span>
                      </div>
                      <div class="ml-8">
                        <div
                          class="flex items-center"
                          v-for="(salaryType, inde) in salary.json_type_salary"
                          :key="inde"
                        >
                          <div class="grid grid-cols-5 gap-4 mt-2">
                            <div class="col-span-3">
                              <label for="" class="form-group-label"
                                >Hình thức lương</label
                              >
                              <div>
                                <input-type-salary
                                  v-model="salaryType.type_salary"
                                ></input-type-salary>
                              </div>
                            </div>
                            <div class="col-span-2">
                              <label for="" class="form-group-label"
                                >Số tiền</label
                              >
                              <div>
                                <CurrencyInput v-model="salaryType.money" />
                              </div>
                            </div>
                          </div>
                          <span @click="removeTypesalary(index, inde)">
                            <i class="fal fa-times icon-close"></i>
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
                          class="flex items-center"
                          v-for="(allowance, ind) in salary.json_allowances"
                          :key="ind"
                        >
                          <div class="grid grid-cols-5 gap-4 mt-2">
                            <div class="col-span-3">
                              <label for="" class="form-group-label"
                                >Phụ cấp</label
                              >
                              <div>
                                <input-allowance
                                  v-model="allowance.allowance"
                                ></input-allowance>
                              </div>
                            </div>
                            <div class="col-span-2">
                              <label for="" class="form-group-label"
                                >Số tiền</label
                              >
                              <div>
                                <CurrencyInput v-model="allowance.money" />
                              </div>
                            </div>
                          </div>
                          <span @click="removeAllowance(index, ind)">
                            <i class="fal fa-times icon-close"></i>
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
              </div>
              <div class="form-small">
                <label for="" class="form-group-label">Ghi chú</label>
                <div>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    class="form-control-input mt-2"
                  ></textarea>
                </div>
              </div>
            </div>
          </the-tab>
        </div>
        <div>
          <the-tab :isSelected="selected === 'Bảo hiểm'">
            <div class="text-left p-4 w-full">
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
              <Transition>
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
                          v-model="personnelDetail.premium_number"
                        />
                      </div>
                    </div>
                    <div>
                      <label for="" class="form-group-label"
                        >Trạng thái sổ</label
                      >
                      <div>
                        <input-status-insurance
                          v-model="personnelDetail.premium_insurance_status"
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
                          v-model="personnelDetail.premium_personnel"
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
                          v-model="personnelDetail.premium_card"
                        />
                      </div>
                    </div>
                    <div>
                      <label for="" class="form-group-label">Mã tỉnh cấp</label>
                      <div>
                        <input-premium-code
                          v-model="personnelDetail.premium_code"
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
                          v-model="personnelDetail.premium_place"
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
              <Transition>
                <div v-show="isIncrease == true" class="mt-2">
                  <div class="grid grid-cols-2 gap-2 form-small">
                    <div>
                      <label for="" class="form-group-label"
                        >NV hoàn thiện HS</label
                      >
                      <div>
                        <date-picker
                          v-model="personnelDetail.insup_date_get"
                        ></date-picker>
                      </div>
                    </div>
                    <div>
                      <label for="" class="form-group-label"
                        >NS hoàn thiện HS</label
                      >
                      <div>
                        <date-picker
                          v-model="personnelDetail.insup_date_complete"
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
                          v-model="personnelDetail.insup_date_close"
                        ></date-picker>
                      </div>
                    </div>
                    <div>
                      <label for="" class="form-group-label"
                        >Ngày trả thẻ BHYT</label
                      >
                      <div>
                        <date-picker
                          v-model="personnelDetail.insup_date_return"
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
              <Transition>
                <div v-show="isReduce == true" class="mt-2">
                  <div class="grid grid-cols-2 gap-2 form-small">
                    <div>
                      <label for="" class="form-group-label"
                        >Ngày nhận sổ BH từ NLĐ</label
                      >
                      <div>
                        <date-picker
                          v-model="personnelDetail.insdown_date_close"
                        ></date-picker>
                      </div>
                    </div>
                    <div>
                      <label for="" class="form-group-label"
                        >NS hoàn thiện HS</label
                      >
                      <div>
                        <date-picker
                          v-model="personnelDetail.insdown_date_complete"
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
                          v-model="personnelDetail.insdown_date_return"
                        ></date-picker>
                      </div>
                    </div>
                    <div>
                      <label for="" class="form-group-label"
                        >Ngày trả sổ cho NLĐ</label
                      >
                      <div>
                        <date-picker
                          v-model="personnelDetail.insdown_date_get"
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
              <Transition name="slide-fade">
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
                    <div
                      class="flex items-center mt-2"
                      v-for="(
                        item, index
                      ) in personnelDetail.personnel_premium_history"
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
                            :value="formatPrice(item.salary_premium_company)"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name=""
                            id=""
                            class="form-control-input disabledInput"
                            disabled
                            :value="formatPrice(item.salary_premium_person)"
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
                    <div>
                      <span @click="createPremiumHistory()"
                        ><i class="fal fa-plus-circle icon-plus mt-2"></i
                      ></span>
                    </div>
                  </div>
                </div>
              </Transition>
              <Transition>
                <div v-show="isInsuranceHistory == false">
                  <h2
                    @click="isInsuranceHistory = !isInsuranceHistory"
                    class="cursor-pointer mt-2 form-group-label"
                  >
                    Mã hợp đồng
                  </h2>
                </div>
              </Transition>

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
              <Transition>
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
                      ) in personnelDetail.personnel_insurance_solve_history"
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
              <Transition>
                <div v-show="isRegimeHistory == false">
                  <h2
                    @click="isRegimeHistory = !isRegimeHistory"
                    class="cursor-pointer mt-2 form-group-label"
                  >
                    Mã hợp đồng
                  </h2>
                </div>
              </Transition>
            </div>
          </the-tab>
        </div>
        <div>
          <the-tab :isSelected="selected === 'Tiếp nhận'">
            <div class="text-left p-4 w-5/6 min-h-full">
              <div class="grid grid-cols-6 gap-4">
                <div
                  class="flex items-center mt-1 col-span-2"
                  v-for="receive in receives"
                  :key="receive.ID"
                >
                  <div>
                    <input
                      type="checkbox"
                      name=""
                      :id="receive.ID"
                      class="w-5 h-5 mr-1 cursor-pointer"
                      :value="receive"
                      @input="checkedReceives($event)"
                      :checked="checkReceives(receive.ID)"
                    />
                  </div>
                  <label :for="receive.ID" class="cursor-pointer">{{
                    receive.title
                  }}</label>
                </div>
              </div>
            </div>
          </the-tab>
        </div>
        <div>
          <the-tab :isSelected="selected === 'Đính kèm'">
            <div class="p-4">
              <attach-file></attach-file>
            </div>
          </the-tab>
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="updatePersonnel()">
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
import datePicker from "@/components/datePicker/datePicker.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import InputGender from "@/components/constant/InputGender.vue";
import InputMarital from "@/components/constant/TotalInput/InputMarital.vue";
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
import InputDepartment from "@/components/constant/InputDepartment.vue";
import InputPosition from "@/components/constant/InputPosition.vue";
import InputPositiontitle from "@/components/constant/InputPositiontitle.vue";
import InputWorkType from "@/components/constant/InputWorkType.vue";
import InputSalaryRange from "@/components/constant/InputSalaryRange.vue";
import InputWorkplace from "@/components/constant/InputWorkplace.vue";
import InputTypeSalary from "@/components/constant/TotalInput/InputTypeSalary.vue";
import InputAllowance from "@/components/constant/TotalInput/InputAllowance.vue";
import CurrencyInput from "@/components/CurrencyInput.vue";
import InputStatusInsurance from "@/components/constant/TotalInput/InputStatusInsurance.vue";
import InputDataPremium from "@/components/constant/TotalInput/InputDataPremium.vue";
import InputPremiumCode from "@/components/constant/TotalInput/InputPremiumCode.vue";
import InputPremiumPlace from "@/components/constant/TotalInput/InputPremiumPlace.vue";
import InputTypePremium from "@/components/constant/TotalInput/InputTypePremium.vue";
import InputReasonIncrease from "@/components/constant/TotalInput/InputReasonIncrease.vue";
import InputReasonDecrease from "@/components/constant/TotalInput/InputReasonDecrease.vue";
import InputModelPremium from "@/components/constant/TotalInput/InputModelPremium.vue";
import { reactive, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { FormatDate, FormatPrice } from "@/constants/FormatAll";
import { useToast } from "vue-toastification";
import { useAcademic } from "@/store/modules/personnelView/academics";
import { useFamilyRelationship } from "@/store/modules/settingPersonnel/familyRelationship";
import { useGpsLocation } from "@/store/modules/settingTimekeep/gpslocation";
import { useInsurance } from "@/store/modules/personnelView/insurance";
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
    InputWorkplace,
    InputSalaryRange,
    InputWorkType,
    InputPositiontitle,
    InputPosition,
    InputDepartment,
    InputGender,
    InputMarital,
    InputLevel,
    InputNationality,
    InputPeople,
    InputReligion,
    InputBank,
    InputLevelSchool,
    InputAcademic,
    InputGpsLocation,
    InputManager,
    AttachFile,
    InputRelationship,
    InputTypeTraining,
    InputTypeCommunist,
    InputTypeSalary,
    InputAllowance,
    CurrencyInput,
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
      isSalaries: true,
      isInsuranceHistory: true,
      isRegimeHistory: true,
    };
  },
  methods: {
    previewFiles_1(event) {
      const file = event.target.files[0];
      const theReader = new FileReader();
      theReader.onloadend = async () => {
        this.newImage = await theReader.result;
        this.personnelDetail.private_code_front = theReader.result;
      };
      theReader.readAsDataURL(file);
      this.img_1 = URL.createObjectURL(file);
    },
    previewFiles_2(event) {
      const file = event.target.files[0];
      const theReader = new FileReader();
      theReader.onloadend = async () => {
        this.newImage = await theReader.result;
        this.personnelDetail.private_code_back = theReader.result;
      };
      theReader.readAsDataURL(file);
      this.img_2 = URL.createObjectURL(file);
    },
    formatDate(date) {
      return FormatDate(date);
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const selected = ref("Sơ yếu lý lịch");
    const isLoading = ref(true);
    const academic = useAcademic();
    const family = useFamilyRelationship();
    const gps = useGpsLocation();
    const insurance = useInsurance();
    const { listPremiumCode, listPremiumPlace } = storeToRefs(insurance);
    const { listGPSLocation } = storeToRefs(gps);
    const { listFamilyRelationship } = storeToRefs(family);
    const { listAcademic } = storeToRefs(academic);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("personnels/getPersonnelDetailAction", {
      id: route.params.personnelID,
      EndTimeLoading: EndTimeLoading,
    });
    const personnelDetail = computed(
      () => store.state.personnels.personnelDetail
    );
    const personnelContractDetail = computed(
      () => store.state.personnels.personnelContractDetail
    );
    const img_front = computed(() => store.state.personnels.img_1);
    const img_back = computed(() => store.state.personnels.img_2);
    const img_1 = img_front.value;
    const img_2 = img_back.value;
    setTimeout(() => {
      store.dispatch(
        "places/getAllCityAction",
        personnelDetail.value.private_code_place
      );
      if (listAcademic.value?.length == 0) {
        academic.GetAllAcademicsAction();
      }
    }, 500);
    setTimeout(() => {
      store.dispatch("places/getAllCountryAction");
      isLoading.value = false;
    }, 2000);
    const setSelected = (tab) => {
      selected.value = tab;
      if (tab === "Công việc") {
        isLoading.value = true;
        if (listWorkTypes.value?.length == 0) {
          store.dispatch("workTypes/GetAllWorkTypeAction", 30);
        }
        setTimeout(() => {
          if (listPositiontitles.value?.length == 0) {
            store.dispatch("positiontitles/getAllPositiontitlesAction", 50);
          }
          if (listSalryRange.value?.length == 0) {
            store.dispatch("salaryRange/getAllSalaryRangeAction", 50);
          }
        }, 500);
        setTimeout(() => {
          if (listDepartments.value?.length == 0) {
            store.dispatch("departments/getAllDepartmentsAction");
          }
          if (listPositions.value?.length == 0) {
            store.dispatch("positions/getAllPositionsAction", 500);
          }
          if (listWorkplace.value?.length == 0) {
            store.dispatch("workplace/getAllWorkplaceAction", 500);
          }
          isLoading.value = false;
        }, 1000);
      }
      if (tab === "Tiếp nhận") {
        store.dispatch("categories/getAllReceiveAction", 50);
      }
      if (tab === "Bảo hiểm") {
        insurance.GetAllPremiumCodeAction();

        setTimeout(() => {
          insurance.GetAllPremiumPlaceAction(
            personnelDetail.value.premium_code
          );
        }, 1500);
      }
    };
    // Start load select option
    const loadPlace = (event) => {
      store.dispatch("places/getAllCityAction", event.target.value);
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
    const changeInputPremiumCode = (event) => {
      insurance.GetAllPremiumPlaceAction(event.ID);
    };
    // End select option
    const emailAddress = ref("");
    const emptyCode = ref("");
    const emptyName = ref("");
    const job_date_join = new Date().toISOString().substring(0, 10);
    const json_salaries = reactive({
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
    });
    const dataReceives = reactive([]);
    const checkedReceives = (e) => {
      if (e.target.checked == true) {
        dataReceives.push(e.target._value);
      } else {
        dataReceives.pop();
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
    const receives = computed(
      () => store.getters["categories/getAllReceivesActive"]
    );
    const listCity = computed(() => store.state.places.listCity);
    const listDistricts = computed(() => store.state.places.listDistricts);
    const listWards = computed(() => store.state.places.listWards);
    const listCountry = computed(() => store.state.places.listCountry);
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
    const listSalryRange = computed(
      () => store.getters["salaryRange/getAllSalaryRangeActive"]
    );
    const listLevelSchool = computed(() => store.state.ethnics.listLevelSchool);
    const listPersonnels = computed(
      () => store.state.personnels.listPersonnels
    );
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
    const listTypeSalary = computed(
      () => store.state.personnels.listTypeSalary
    );
    setTimeout(() => {
      if (listFamilyRelationship.value?.length == 0) {
        family.getAllFamilyRelationshipAction();
      }
      if (personnelDetail.value.gps_location_ids?.length == 0) {
        if (listGPSLocation.value?.length == 0) {
          gps.GetAllGPSLocationAction();
        }
      }
    }, 500);
    setTimeout(() => {
      if (personnelDetail.value.place_of_birth_city_id) {
        store.dispatch(
          "places/getAllDistrictsAction",
          personnelDetail.value.place_of_birth_city_id
        );
        setTimeout(() => {
          store.dispatch(
            "places/getAllWardsAction",
            personnelDetail.value.place_of_birth_district_id
          );
        }, 500);
      }
      if (personnelDetail.value.origin_city_id) {
        store.dispatch(
          "places/getAllDistrictsOriginAction",
          personnelDetail.value.origin_city_id
        );
        setTimeout(() => {
          store.dispatch(
            "places/getAllWardsOriginAction",
            personnelDetail.value.origin_district_id
          );
        }, 500);
      }
      if (personnelDetail.value.home_address_city_id) {
        store.dispatch(
          "places/getAllDistrictsHomeAction",
          personnelDetail.value.home_address_city_id
        );
        setTimeout(() => {
          store.dispatch(
            "places/getAllWardsHomeAction",
            personnelDetail.value.home_address_district_id
          );
        }, 500);
      }
      if (personnelDetail.value.current_address_city_id) {
        store.dispatch(
          "places/getAllDistrictsCurrentAction",
          personnelDetail.value.current_address_city_id
        );
        setTimeout(() => {
          store.dispatch(
            "places/getAllWardsCurrentAction",
            personnelDetail.value.current_address_district_id
          );
        }, 500);
      }
    }, 1000);

    const formatPrice = (price) => {
      return FormatPrice(price);
    };
    // Start infoFamily
    const createFamily = () => {
      const data = {
        relative_id: "",
        relative_name: "",
        relative_birthday: "",
        relative_desc: "",
        relative_phone: "",
        relative_is_dependent: 0,
        relative_dependent_from_date: "",
        relative_dependent_to_date: "",
        relative_dependent_tax: "",
      };
      if (personnelDetail.value.json_family == null) {
        personnelDetail.value.json_family = [data];
      } else {
        personnelDetail.value.json_family.push(data);
      }
    };
    const removeFamily = (index) => {
      personnelDetail.value.json_family.splice(index, 1);
    };
    // End infoFamily
    // Start infoSchool
    const createSchool = () => {
      const data = {
        degree_date_from: "",
        degree_date_to: "",
        degree_level_id: "",
        degress_place: "",
        degree_specialization: "",
        degree_type_id: "",
      };
      if (personnelDetail.value.json_degrees == null) {
        personnelDetail.value.json_degrees = [data];
      } else {
        personnelDetail.value.json_degrees.push(data);
      }
    };
    const removeSchool = (index) => {
      personnelDetail.value.json_degrees.splice(index, 1);
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
      if (personnelDetail.value.json_communist == null) {
        personnelDetail.value.json_communist = [data];
      } else {
        personnelDetail.value.json_communist.push(data);
      }
    };
    const removeParty = (index) => {
      personnelDetail.value.json_communist.splice(index, 1);
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
      if (personnelDetail.value.json_experience == null) {
        personnelDetail.value.json_experience = [data];
      } else {
        personnelDetail.value.json_experience.push(data);
      }
    };
    const removeExp = (index) => {
      personnelDetail.value.json_experience.splice(index, 1);
    };
    // End infoExp
    // start salary
    const addSalary = () => {
      const data = {
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
      };
      if (personnelDetail.value.salaries == null) {
        personnelDetail.value.salaries = [];
        personnelDetail.value.salaries.push(data);
      } else {
        personnelDetail.value.salaries.push(data);
      }
    };
    const removeSalary = (index) => {
      personnelDetail.value.salaries.splice(index, 1);
    };
    const addTypesalary = (index) => {
      const data = {
        type_salary: null,
        money: null,
      };
      personnelDetail.value.salaries[index].json_type_salary.push(data);
    };
    const removeTypesalary = (index, num) => {
      personnelDetail.value.salaries[index].json_type_salary.splice(num, 1);
    };
    const addAllowance = (index) => {
      const data = {
        allowance: null,
        money: null,
      };
      personnelDetail.value.salaries[index].json_allowances.push(data);
    };
    const removeAllowance = (index, num) => {
      personnelDetail.value.salaries[index].json_allowances.splice(num, 1);
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
      if (personnelDetail.value.personnel_premium_history == null) {
        personnelDetail.value.personnel_premium_history = [];
        personnelDetail.value.personnel_premium_history.push(data);
        // personnelDetail.value.personnel_premium_history = [data];
      } else {
        personnelDetail.value.personnel_premium_history.push(data);
        // console.log(personnelDetail.value.personnel_premium_history);
      }
    };
    const removePremiumHistory = (index) => {
      personnelDetail.value.personnel_premium_history.splice(index, 1);
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
      if (personnelDetail.value.personnel_insurance_solve_history == null) {
        personnelDetail.value.personnel_insurance_solve_history = [data];
      } else {
        personnelDetail.value.personnel_insurance_solve_history.push(data);
      }
    };
    const removeSolveHistory = (index) => {
      personnelDetail.value.personnel_insurance_solve_history.splice(index, 1);
    };
    // end personnel_insurance_solve_history
    //start json bank
    const createBankAccount = () => {
      const data = {
        bank_account: "",
        bank_account_name: "",
        bank_name: "",
        bank_address: "",
      };
      if (personnelDetail.value.json_banks == null) {
        personnelDetail.value.json_banks = [data];
        // console.log(personnelDetail.value.json_banks);
      } else {
        personnelDetail.value.json_banks.push(data);
      }
    };
    const removeBankAccount = (index) => {
      personnelDetail.value.json_banks.splice(index, 1);
    };
    //end json bank
    const updatePersonnel = () => {
      console.log(personnelDetail.value.receives);
      let dataUpdateReceive;
      if (personnelDetail.value.receives != null) {
        dataUpdateReceive = personnelDetail.value.receives.concat(dataReceives);
      } else {
        dataUpdateReceive = dataReceives;
      }
      const data = {
        ID: personnelDetail.value.ID,
        code: personnelDetail.value.code,
        attendace_code: personnelDetail.value.attendace_code,
        code_storage: personnelDetail.value.code_storage,
        name: personnelDetail.value.name,
        birthday: personnelDetail.value.birthday,
        gender: personnelDetail.value.gender,
        // place_of_birthday: personnelDetail.value.place_of_birthday,
        place_of_birth_city_id: personnelDetail.value.place_of_birth_city_id,
        place_of_birth_district_id:
          personnelDetail.value.place_of_birth_district_id,
        place_of_birth_ward_id: personnelDetail.value.place_of_birth_ward_id,
        // origin_state: personnelDetail.value.origin_state,
        origin_city_id: personnelDetail.value.origin_city_id,
        origin_district_id: personnelDetail.value.origin_district_id,
        origin_ward_id: personnelDetail.value.origin_ward_id,
        private_code: personnelDetail.value.private_code,
        private_code_date: personnelDetail.value.private_code_date,
        private_code_place: personnelDetail.value.private_code_place,
        private_code_front: personnelDetail.value.private_code_front,
        private_code_back: personnelDetail.value.private_code_back,
        marital_status: personnelDetail.value.marital_status,
        nationality: personnelDetail.value.nationality,
        people: personnelDetail.value.people,
        religious: personnelDetail.value.religious,
        // job_bank_account: personnelDetail.value.job_bank_account,
        // job_bank_account_name: personnelDetail.value.job_bank_account_name,
        // job_bank_id: personnelDetail.value.job_bank_id,
        // job_bank_desc: personnelDetail.value.job_bank_desc,
        job_tax: personnelDetail.value.job_tax,
        level_id: personnelDetail.value.level_id,
        job_date_join: personnelDetail.value.job_date_join,
        job_reldate_join: personnelDetail.value.job_reldate_join,
        level_school: personnelDetail.value.level_school,
        level_academic: personnelDetail.value.level_academic,
        gps_location_ids: personnelDetail.value.gps_location_ids,
        live_manager_id: personnelDetail.value.live_manager_id,
        json_mobile: personnelDetail.value.mobile,
        personal_email: personnelDetail.value.personal_email,
        company_email: personnelDetail.value.company_email,
        home_address: personnelDetail.value.home_address,
        // place_home_address: personnelDetail.value.place_home_address,
        home_address_city_id: personnelDetail.value.home_address_city_id,
        home_address_district_id:
          personnelDetail.value.home_address_district_id,
        home_address_ward_id: personnelDetail.value.home_address_ward_id,
        // place_current_address: personnelDetail.value.place_current_address,
        // current_address: personnelDetail.value.current_address,
        current_address_city_id: personnelDetail.value.current_address_city_id,
        current_address_district_id:
          personnelDetail.value.current_address_district_id,
        current_address_ward_id: personnelDetail.value.current_address_ward_id,
        json_banks: personnelDetail.value.json_banks,
        json_family: personnelDetail.value.json_family,
        json_degrees: personnelDetail.value.json_degrees,
        json_communist: personnelDetail.value.json_communist,
        json_experience: personnelDetail.value.json_experience,
        // contract_code: personnelContractDetail.value.contract_code,
        // contract_type: personnelContractDetail.value.contract_type,
        department_id: personnelDetail.value.department_id,
        work_type: personnelContractDetail.value?.work_type,
        position_id: personnelDetail.value.position_id,
        job_title: personnelDetail.value.job_title,
        work_place: personnelContractDetail.value?.work_place,
        quantum_id: personnelContractDetail.value?.quantum_id,
        date_start: personnelContractDetail.value?.date_start,
        // date_finish: personnelContractDetail.value.date_finish,
        // date_reg: personnelContractDetail.value.date_reg,
        // representative_id: personnelContractDetail.value.representative_id,
        // is_econtract: personnelContractDetail.value.is_econtract,
        // desc_contract: personnelContractDetail.value.desc_contract,
        json_receives: dataUpdateReceive,
        json_jobouts: personnelDetail.value.json_jobouts,
        json_salaries: personnelDetail.value.salaries,
        // insurance
        premium_number: personnelDetail.value.premium_number,
        premium_insurance_status:
          personnelDetail.value.premium_insurance_status,
        premium_personnel: personnelDetail.value.premium_personnel,
        premium_card: personnelDetail.value.premium_card,
        premium_code: personnelDetail.value.premium_code,
        premium_place: personnelDetail.value.premium_place,
        insup_date_get: personnelDetail.value.insup_date_get,
        insup_date_complete: personnelDetail.value.insup_date_complete,
        insup_date_close: personnelDetail.value.insup_date_close,
        insup_date_return: personnelDetail.value.insup_date_return,
        insdown_date_close: personnelDetail.value.insdown_date_close,
        insdown_date_complete: personnelDetail.value.insup_date_complete,
        insdown_date_return: personnelDetail.value.insup_date_return,
        insdown_date_get: personnelDetail.value.insup_date_get,
        personnel_premium_history:
          personnelDetail.value.personnel_premium_history,
        personnel_insurance_solve_history:
          personnelDetail.value.personnel_insurance_solve_history,
      };
      if (data.code.length > 0) {
        if (data.name.length > 0) {
          isLoading.value = true;
          store.dispatch("personnels/UpdatePersonnelAction", {
            data: data,
            router,
            EndTimeLoading,
            toast,
          });
        } else {
          emptyName.value = "Họ tên nhân viên chưa nhập";
        }
      } else {
        emptyCode.value = "Mã NS chưa nhập";
      }
    };
    return {
      personnelDetail: personnelDetail,
      personnelContractDetail: personnelContractDetail,
      listFamilyRelationship,
      img_1: img_1,
      img_2: img_2,
      selected: selected,
      loadPlace,
      receives,
      isLoading,
      setSelected,
      listCountry: listCountry,
      listCity: listCity,
      listDistricts,
      listWards,
      listDepartments: listDepartments,
      listWorkTypes: listWorkTypes,
      listWorkplace: listWorkplace,
      listPositiontitles: listPositiontitles,
      listPositions: listPositions,
      listSalryRange: listSalryRange,
      listLevelSchool: listLevelSchool,
      job_date_join: job_date_join,
      img_front: img_front,
      img_back: img_back,
      json_salaries,
      emailAddress,
      emptyCode: emptyCode,
      emptyName: emptyName,
      checkReceives,
      createBankAccount,
      removeBankAccount,
      updatePersonnel,
      createFamily,
      removeFamily,
      createSchool,
      removeSchool,
      createParty,
      removeParty,
      createExp,
      removeExp,
      formatPrice,
      changeCity,
      changeDistrict,
      listGPSLocation,
      listPersonnels,
      listDistrictsOrigin,
      listWardsOrigin,
      listDistrictsHome,
      listWardsHome,
      listDistrictsCurrent,
      listWardsCurrent,
      changeCityOrigin,
      changeDistrictOrigin,
      changeCityHome,
      changeDistrictHome,
      changeCityCurrent,
      changeDistrictCurrent,
      addSalary,
      removeSalary,
      addTypesalary,
      removeTypesalary,
      addAllowance,
      removeAllowance,
      listTypeSalary,
      listPremiumCode,
      listPremiumPlace,
      changeInputPremiumCode,
      createPremiumHistory,
      removePremiumHistory,
      createSolveHistory,
      removeSolveHistory,
      EndTimeLoading,
      checkedReceives,
      dataReceives,
    };
  },
};
</script>

<style>
.disabledInput {
  background-color: rgb(240, 240, 240);
}
</style>
