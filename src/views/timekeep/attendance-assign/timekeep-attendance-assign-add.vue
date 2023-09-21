<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-timekeep></sidebar-timekeep>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center">
            <button-create-timekeep></button-create-timekeep>
            <p class="longText">Tạo mới phân ca</p>
          </div>
        </div></navbar-social
      >
    </template>
    <Transition duration="550" name="nested">
      <div
        class="w-full form-plus-over h-full format-scroll"
        v-if="isLoading == false"
      >
        <div class="text-left px-4 py-2 mb-20">
          <div title="Thông tin chung" class="outer">
            <h4
              class="form-section-title form-small cursor-pointer"
              @click="isInfor = !isInfor"
            >
              <span v-show="isInfor == true"
                ><i class="fas fa-chevron-down cursor-pointer"></i
              ></span>
              <span v-show="isInfor == false"
                ><i class="fas fa-chevron-right cursor-pointer"></i
              ></span>
              Thông tin chung
            </h4>
            <Transition name="slide-up">
              <div v-show="isInfor == true" class="mt-2">
                <div class="form-small">
                  <label for="" class="form-group-label"
                    >Tiêu đề<span class="text-red-600">*</span></label
                  >
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Ca hành chính"
                      v-model="shiftsAssign.title"
                    />
                  </div>
                </div>
                <div class="form-small">
                  <label for="" class="form-group-label"
                    >Kiểu phân ca<span class="text-red-600">*</span></label
                  >
                  <div>
                    <v-select
                      label="title"
                      :options="dataType"
                      :reduce="(type) => type.value"
                      placeholder="Chọn kiểu phân ca"
                      v-model="shiftsAssign.type"
                      :searchable="false"
                    ></v-select>
                  </div>
                </div>
                <div class="form-small">
                  <label for="" class="form-group-label"
                    >Loại ca<span class="text-red-600">*</span></label
                  >
                  <div>
                    <v-select
                      label="title"
                      :options="dataShiftType"
                      :reduce="(shift) => shift.value"
                      placeholder="Chọn loại ca"
                      v-model="shiftsAssign.shift_type"
                      :searchable="false"
                    ></v-select>
                  </div>
                </div>
                <div class="form-small">
                  <label for="" class="form-group-label"
                    >Người duyệt<span class="text-red-600">*</span></label
                  >
                  <div>
                    <selector-view-vue
                      :Placeholder="'Nhập người duyệt'"
                      :listOption="listPersonnelApprove"
                      :listFinal="shiftsAssign.app_approval_ids"
                      :searchOption="loadManagers"
                      :listSearch="listSearch"
                    >
                      <template v-slot:selectedOption="{ item }">
                        <div class="flex flex-col text-left">
                          <div class="flex">
                            <div class="font-medium">{{ item.code }}</div>
                            <div>&nbsp;- {{ item.fullname }}</div>
                          </div>
                        </div>
                      </template>
                      <template v-slot:selected="{ item }">
                        <div class="flex">
                          <div class="font-medium">{{ item.code }}</div>
                          <div>&nbsp;- {{ item.fullname }}</div>
                        </div>
                      </template>
                    </selector-view-vue>
                  </div>
                </div>
                <div class="form-small">
                  <label for="" class="form-group-label">Phòng ban</label>
                  <div>
                    <v-select
                      label="title"
                      :options="listDepartments"
                      :reduce="(depart) => depart.ID"
                      placeholder="Chọn phòng ban"
                      v-model="shiftsAssign.department_ids"
                      multiple
                      @option:selected="changeInputDepartment()"
                    >
                    </v-select>
                  </div>
                </div>
                <div class="form-small">
                  <label for="" class="form-group-label">Vị trí</label>
                  <div>
                    <input-position
                      v-model="shiftsAssign.position_ids"
                      :isMultiple="true"
                    ></input-position>
                  </div>
                </div>
                <div class="form-small">
                  <label for="" class="form-group-label"
                    >Phân công<span class="text-red-600">*</span></label
                  >
                  <div>
                    <v-select
                      label="title"
                      :options="dataRepeat"
                      :reduce="(repeat) => repeat.value"
                      placeholder="Chọn kiểu phân công"
                      v-model="shiftsAssign.repeat_type"
                      @option:selected="changeAssignment($event)"
                      :searchable="false"
                    ></v-select>
                  </div>
                </div>
                <div v-if="shiftsAssign.repeat_type != 'NONE'">
                  <div
                    class="grid grid-cols-2 gap-2 form-small"
                    v-if="shiftsAssign.repeat_type != 'RANGE'"
                  >
                    <div class="col-span-1">
                      <label for="" class="form-group-label"
                        >Từ ngày<span class="text-red-600">*</span></label
                      >
                      <div>
                        <date-picker
                          v-model="shiftsAssign.date_start"
                          :SelectMultiDate="SelectMultiDate"
                        ></date-picker>
                      </div>
                    </div>
                    <div class="col-span-1">
                      <label for="" class="form-group-label"
                        >Đến ngày<span class="text-red-600">*</span></label
                      >
                      <div>
                        <date-picker
                          v-model="shiftsAssign.date_end"
                          :SelectMultiDate="SelectMultiDate"
                        ></date-picker>
                      </div>
                    </div>
                  </div>
                  <div
                    class="grid grid-cols-2 gap-2 form-small"
                    v-if="shiftsAssign.repeat_type == 'RANGE'"
                  >
                    <div class="col-span-1">
                      <label for="" class="form-group-label"
                        >Từ ngày<span class="text-red-600">*</span></label
                      >
                      <div>
                        <date-picker
                          v-model="shiftsAssign.date_start"
                          :SelectMultiDate="SelectMultiDate"
                        ></date-picker>
                      </div>
                    </div>
                    <div class="col-span-1">
                      <label for="" class="form-group-label"
                        >Đến ngày<span class="text-red-600">*</span></label
                      >
                      <div>
                        <date-picker
                          v-model="shiftsAssign.date_end"
                          :SelectMultiDate="SelectMultiDate"
                        ></date-picker>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="grid grid-cols-2 gap-2 form-small"
                  v-if="shiftsAssign.repeat_type == 'DAILY'"
                >
                  <div>
                    <label for="" class="form-group-label"
                      >Phân công này sẽ lặp</label
                    >
                    <div>
                      <input
                        type="number"
                        name=""
                        id=""
                        class="form-control-input"
                        v-model="shiftsAssign.interval"
                        @change="changeDateShift($event)"
                      />
                    </div>
                  </div>
                  <div>
                    <label for="" class="form-group-label">Chu kì</label>
                    <div>
                      <input
                        type="text"
                        name=""
                        id=""
                        class="disabledInput p-3 w-full"
                        disabled
                        value="ngày 1 lần"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
            <div v-show="isInfor == false">
              <h2
                @click="isInfor = !isInfor"
                class="cursor-pointer form-group-label"
              >
                Tiêu đề *, Kiểu phân ca *, Loại ca *, Người duyệt 1 *, Phòng
                ban, Vị trí, Phân công *, Từ ngày, Đến ngày, Phân công này sẽ
                lặp,
              </h2>
            </div>
          </div>
          <div title="Chi tiết công" class="inner">
            <h4
              class="form-section-title form-small cursor-pointer"
              @click="isDetail = !isDetail"
            >
              <span v-show="isDetail == true"
                ><i class="fas fa-chevron-down cursor-pointer"></i
              ></span>
              <span v-show="isDetail == false"
                ><i class="fas fa-chevron-right cursor-pointer"></i
              ></span>
              Chi tiết phân công
            </h4>
            <Transition name="slide-up">
              <div v-show="isDetail == true" class="mt-2">
                <div v-if="shiftsAssign.repeat_type == 'WEEKLY'">
                  <div
                    class="flex items-center"
                    v-if="shiftsAssign.type == 'PERSON'"
                  >
                    <div class="flex items-center form-large min-w-[800px]">
                      <div class="w-[30px]"></div>
                      <div class="grid grid-cols-12 gap-2 w-full">
                        <div class="col-span-2">
                          <label for="" class="form-group-label">Mã NV</label>
                        </div>
                        <div class="col-span-4">
                          <label for="" class="form-group-label"
                            >Tên nhân sự</label
                          >
                        </div>
                        <div class="col-span-3">
                          <label for="" class="form-group-label">Vị trí</label>
                        </div>
                        <div class="col-span-3">
                          <label for="" class="form-group-label"
                            >Phòng ban</label
                          >
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center">
                      <div
                        v-for="(item, index) in listDayOfWeek"
                        :key="index"
                        class="form-x-small px-1 form-group-label"
                      >
                        {{ item }}
                      </div>
                    </div>
                  </div>
                  <div
                    v-for="(item, index) in shiftsAssign.details"
                    :key="index"
                  >
                    <div
                      v-if="shiftsAssign.type == 'PERSON'"
                      class="flex items-center"
                    >
                      <div class="flex items-center form-large min-w-[800px]">
                        <div>
                          <span @click="removeShiftWeeklyPerson(index)"
                            ><i
                              class="fal fa-times icon-close mr-2"
                              style="margin-top: 0px"
                            ></i
                          ></span>
                        </div>
                        <div class="grid grid-cols-12 gap-2">
                          <div class="col-span-2">
                            <input
                              type="text"
                              name=""
                              id=""
                              class="disabledInput p-3 w-full"
                              disabled
                              placeholder="Mã NV"
                              v-model="item.personnel_code"
                            />
                          </div>
                          <div class="col-span-4">
                            <!-- <selector-one-view
                              :Placeholder="'Tìm nhân sự'"
                              :listOption="listPersonnels"
                              :final="item.personnel_id"
                              :searchOption="loadPersonnel"
                              :listSearch="item"
                              @selected="selectedPersonnel($event, index)"
                            >
                              <template v-slot:selectedOption="{ item }">
                                <div class="flex flex-col text-left">
                                  <div class="flex">
                                    <div>
                                      {{ item.name }}&nbsp;{{
                                        formatWorking(item.job_status)
                                      }}
                                    </div>
                                  </div>
                                </div>
                              </template>
                              <template v-slot:selected="{ item }">
                                <div class="flex">
                                  <div>{{ item.name }}</div>
                                </div>
                              </template>
                            </selector-one-view> -->
                            <v-select
                              label="name"
                              :options="listPersonnelsNopage"
                              :reduce="(personel) => personel.ID"
                              placeholder="Tìm nhân sự"
                              v-model="item.name"
                              @update:modelValue="
                                selectedPersonnel($event, index)
                              "
                            >
                              <template #option="{ name, job_status }">
                                <div class="flex flex-col text-left">
                                  <div class="flex">
                                    <div>
                                      {{ name }} {{ formatWorking(job_status) }}
                                    </div>
                                  </div>
                                </div>
                              </template>
                              <template #selected-option="{ name }">
                                <div class="flex">
                                  <div>{{ name }}</div>
                                </div>
                              </template>
                            </v-select>
                          </div>
                          <div class="col-span-3">
                            <input
                              type="text"
                              name=""
                              id=""
                              class="disabledInput p-3 w-full"
                              disabled
                              placeholder="Vị trí"
                              :value="formatPosition(item.position_id)"
                            />
                          </div>
                          <div class="col-span-3">
                            <input
                              type="text"
                              name=""
                              id=""
                              class="disabledInput p-3 w-full"
                              disabled
                              placeholder="Phòng ban"
                              :value="formatDepartment(item.department_id)"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="flex items-center">
                        <div
                          v-for="(pcs, inde) in item.shift_ids"
                          :key="inde"
                          class="form-x-small px-1"
                        >
                          <input-shift
                            v-model="pcs.shift"
                            :isMultiple="true"
                          ></input-shift>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <div class="grid grid-cols-8 form-small gap-2">
                        <label for="" class="form-group-label col-span-2"
                          >Thứ</label
                        ><label for="" class="form-group-label col-span-6"
                          >Ca</label
                        >
                      </div>
                      <div
                        v-for="(pcs, inde) in item.shift_ids"
                        :key="inde"
                        class="grid grid-cols-8 form-small gap-2"
                      >
                        <div class="col-span-2">
                          <input
                            type="text"
                            name=""
                            id=""
                            class="disabledInput p-3 w-full"
                            disabled
                            :value="formatWeekItem(pcs.day)"
                          />
                        </div>
                        <div class="col-span-6">
                          <input-shift
                            v-model="pcs.shift"
                            :isMultiple="true"
                          ></input-shift>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="shiftsAssign.type == 'PERSON'" class="mt-2">
                    <span
                      ><i
                        class="fal fa-plus-circle icon-plus"
                        @click="createShiftWeeklyPerson()"
                      ></i
                    ></span>
                  </div>
                </div>
                <div v-if="shiftsAssign.repeat_type == 'NONE'">
                  <div
                    class="flex items-center form-plus"
                    v-if="shiftsAssign.type == 'PERSON'"
                  >
                    <div class="flex items-center form-large">
                      <div class="w-[40px]"></div>
                      <div class="grid grid-cols-12 gap-2 w-full">
                        <div class="col-span-2">
                          <label for="" class="form-group-label">Mã NV</label>
                        </div>
                        <div class="col-span-4">
                          <label for="" class="form-group-label"
                            >Tên nhân sự</label
                          >
                        </div>
                        <div class="col-span-3">
                          <label for="" class="form-group-label">Vị trí</label>
                        </div>
                        <div class="col-span-3">
                          <label for="" class="form-group-label"
                            >Phòng ban</label
                          >
                        </div>
                      </div>
                    </div>
                    <div class="form-small ml-2">
                      <div class="grid grid-cols-8 gap-2">
                        <div class="col-span-3">
                          <label for="" class="form-group-label">Ngày</label>
                        </div>
                        <div class="col-span-5">
                          <label for="" class="form-group-label">Ca</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="grid grid-cols-8 form-small gap-2" v-else>
                    <label for="" class="form-group-label col-span-3"
                      >Ngày</label
                    ><label for="" class="form-group-label col-span-5"
                      >Ca</label
                    >
                  </div>
                  <div
                    v-for="(item, index) in shiftsAssign.details"
                    :key="index"
                  >
                    <div
                      v-if="shiftsAssign.type == 'PERSON'"
                      class="flex items-center form-plus -mt-3"
                    >
                      <div class="flex items-center form-large">
                        <div>
                          <span @click="removeShiftFixedDay(index)"
                            ><i
                              class="fal fa-times icon-close mr-4"
                              style="margin-top: 0px"
                            ></i
                          ></span>
                        </div>
                        <div class="grid grid-cols-12 gap-2">
                          <div class="col-span-2">
                            <input
                              type="text"
                              name=""
                              id=""
                              class="disabledInput p-3 w-full"
                              disabled
                              placeholder="Mã NV"
                              v-model="item.personnel_code"
                            />
                          </div>
                          <div class="col-span-4">
                            <!-- <selector-one-view
                              :Placeholder="'Tìm nhân sự'"
                              :listOption="listPersonnels"
                              :final="item.personnel_id"
                              :searchOption="loadPersonnel"
                              :listSearch="item"
                              @selected="selectedPersonnel($event, index)"
                            >
                              <template v-slot:selectedOption="{ item }">
                                <div class="flex flex-col text-left">
                                  <div class="flex">
                                    <div>
                                      {{ item.name }}&nbsp;{{
                                        formatWorking(item.job_status)
                                      }}
                                    </div>
                                  </div>
                                </div>
                              </template>
                              <template v-slot:selected="{ item }">
                                <div class="flex">
                                  <div>{{ item.name }}</div>
                                </div>
                              </template>
                            </selector-one-view> -->
                            <v-select
                              label="name"
                              :options="listPersonnelsNopage"
                              :reduce="(personel) => personel.ID"
                              placeholder="Tìm nhân sự"
                              v-model="item.name"
                              @update:modelValue="
                                selectedPersonnel($event, index)
                              "
                            >
                              <template #option="{ name, job_status }">
                                <div class="flex flex-col text-left">
                                  <div class="flex">
                                    <div>
                                      {{ name }} {{ formatWorking(job_status) }}
                                    </div>
                                  </div>
                                </div>
                              </template>
                              <template #selected-option="{ name }">
                                <div class="flex">
                                  <div>{{ name }}</div>
                                </div>
                              </template>
                            </v-select>
                          </div>
                          <div class="col-span-3">
                            <input
                              type="text"
                              name=""
                              id=""
                              class="disabledInput p-3 w-full"
                              disabled
                              placeholder="Vị trí"
                              :value="formatPosition(item.position_id)"
                            />
                          </div>
                          <div class="col-span-3">
                            <input
                              type="text"
                              name=""
                              id=""
                              class="disabledInput p-3 w-full"
                              disabled
                              placeholder="Phòng ban"
                              :value="formatDepartment(item.department_id)"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        class="form-small ml-2"
                        v-for="(pcs, ind) in item.shift_ids"
                        :key="ind"
                      >
                        <div class="grid grid-cols-8 gap-2">
                          <div class="col-span-3">
                            <date-picker
                              v-model="item.date_start"
                            ></date-picker>
                          </div>
                          <div class="col-span-5">
                            <input-shift
                              v-model="pcs.shift"
                              :isMultiple="true"
                            ></input-shift>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <div
                        class="flex items-center"
                        v-for="(pcs, ind) in item.shift_ids"
                        :key="ind"
                      >
                        <div class="grid grid-cols-8 form-small gap-2">
                          <div class="col-span-3">
                            <date-picker
                              v-model="item.date_start"
                            ></date-picker>
                          </div>
                          <div class="col-span-5">
                            <input-shift
                              v-model="pcs.shift"
                              :isMultiple="true"
                            ></input-shift>
                          </div>
                        </div>
                        <div>
                          <span
                            @click="removeShiftFixedDay(index)"
                            class="cursor-pointer"
                            ><i
                              class="fal fa-times text-xl ml-2 mb-4 hover:text-red-500"
                            ></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span @click="createShiftFixedDay()"
                      ><i class="fal fa-plus-circle icon-plus"></i
                    ></span>
                  </div>
                </div>
                <div v-if="shiftsAssign.repeat_type == 'DAILY'">
                  <div
                    class="flex items-center"
                    v-if="shiftsAssign.type == 'PERSON'"
                  >
                    <div class="flex items-center form-large min-w-[800px]">
                      <div class="w-[40px]"></div>
                      <div class="grid grid-cols-12 gap-2 w-full">
                        <div class="col-span-2">
                          <label for="" class="form-group-label">Mã NV</label>
                        </div>
                        <div class="col-span-4">
                          <label for="" class="form-group-label"
                            >Tên nhân sự</label
                          >
                        </div>
                        <div class="col-span-3">
                          <label for="" class="form-group-label">Vị trí</label>
                        </div>
                        <div class="col-span-3">
                          <label for="" class="form-group-label"
                            >Phòng ban</label
                          >
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center">
                      <div
                        class="form-x-small px-1 form-group-label"
                        v-for="(pcs, index) in shiftsAssign.details[0]
                          .shift_ids"
                        :key="index"
                      >
                        {{ formatNumDateShift(index) }}
                      </div>
                    </div>
                  </div>
                  <div
                    v-for="(item, index) in shiftsAssign.details"
                    :key="index"
                  >
                    <div
                      v-if="shiftsAssign.type == 'PERSON'"
                      class="flex items-center -mt-1"
                    >
                      <div class="flex items-center form-large min-w-[800px]">
                        <div>
                          <span @click="removeShiftPersonDaily(index)"
                            ><i
                              class="fal fa-times icon-close mr-2"
                              style="margin-top: 0px"
                            ></i
                          ></span>
                        </div>
                        <div class="grid grid-cols-12 gap-2">
                          <div class="col-span-2">
                            <input
                              type="text"
                              name=""
                              id=""
                              class="disabledInput p-3 w-full"
                              disabled
                              placeholder="Mã NV"
                              v-model="item.personnel_code"
                            />
                          </div>
                          <div class="col-span-4">
                            <!-- <selector-one-view
                              :Placeholder="'Tìm nhân sự'"
                              :listOption="listPersonnels"
                              :final="item.personnel_id"
                              :searchOption="loadPersonnel"
                              :listSearch="item"
                              @selected="selectedPersonnel($event, index)"
                            >
                              <template v-slot:selectedOption="{ item }">
                                <div class="flex flex-col text-left">
                                  <div class="flex">
                                    <div>
                                      {{ item.name }}&nbsp;{{
                                        formatWorking(item.job_status)
                                      }}
                                    </div>
                                  </div>
                                </div>
                              </template>
                              <template v-slot:selected="{ item }">
                                <div class="flex">
                                  <div>{{ item.name }}</div>
                                </div>
                              </template>
                            </selector-one-view> -->
                            <v-select
                              label="name"
                              :options="listPersonnelsNopage"
                              :reduce="(personel) => personel.ID"
                              placeholder="Tìm nhân sự"
                              v-model="item.name"
                              @update:modelValue="
                                selectedPersonnel($event, index)
                              "
                            >
                              <template #option="{ name, job_status }">
                                <div class="flex flex-col text-left">
                                  <div class="flex">
                                    <div>
                                      {{ name }} {{ formatWorking(job_status) }}
                                    </div>
                                  </div>
                                </div>
                              </template>
                              <template #selected-option="{ name }">
                                <div class="flex">
                                  <div>{{ name }}</div>
                                </div>
                              </template>
                            </v-select>
                          </div>
                          <div class="col-span-3">
                            <input
                              type="text"
                              name=""
                              id=""
                              class="disabledInput p-3 w-full"
                              disabled
                              placeholder="Vị trí"
                              :value="formatPosition(item.position_id)"
                            />
                          </div>
                          <div class="col-span-3">
                            <input
                              type="text"
                              name=""
                              id=""
                              class="disabledInput p-3 w-full"
                              disabled
                              placeholder="Phòng ban"
                              :value="formatDepartment(item.department_id)"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="flex items-center">
                          <div
                            class="form-x-small px-1"
                            v-for="(pcs, index) in item.shift_ids"
                            :key="index"
                          >
                            <input-shift
                              v-model="pcs.shift"
                              :isMultiple="true"
                            ></input-shift>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <div class="grid grid-cols-8 form-small gap-2">
                        <label for="" class="form-group-label col-span-2"
                          >Ngày</label
                        ><label for="" class="form-group-label col-span-6"
                          >Ca</label
                        >
                      </div>
                      <div
                        class="grid grid-cols-8 form-small gap-2"
                        v-for="(pcs, index) in item.shift_ids"
                        :key="index"
                      >
                        <div class="col-span-2">
                          <input
                            type="text"
                            name=""
                            id=""
                            class="disabledInput p-3 w-full"
                            disabled
                            :value="formatNumDateShift(index)"
                          />
                        </div>
                        <div class="col-span-6">
                          <input-shift
                            v-model="pcs.shift"
                            :isMultiple="true"
                          ></input-shift>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="shiftsAssign.type == 'PERSON'">
                    <span
                      ><i
                        class="fal fa-plus-circle icon-plus"
                        @click="createShiftPersonDaily()"
                      ></i
                    ></span>
                  </div>
                </div>
                <div v-if="shiftsAssign?.repeat_type == 'RANGE'">
                  <div
                    v-if="shiftsAssign?.type == 'PERSON'"
                    class="flex items-center form-supper-plus"
                  >
                    <div class="flex items-center form-large min-w-[800px]">
                      <div class="w-[30px]"></div>
                      <div class="grid grid-cols-12 gap-2 w-full">
                        <div class="col-span-2">
                          <label for="" class="form-group-label">Mã NV</label>
                        </div>
                        <div class="col-span-4">
                          <label for="" class="form-group-label"
                            >Tên nhân sự</label
                          >
                        </div>
                        <div class="col-span-3">
                          <label for="" class="form-group-label">Vị trí</label>
                        </div>
                        <div class="col-span-3">
                          <label for="" class="form-group-label"
                            >Phòng ban</label
                          >
                        </div>
                      </div>
                    </div>
                    <div
                      class="form-x-small px-1 form-group-label"
                      v-for="(pcs, index) in shiftsAssign.details[0].shift_ids"
                      :key="index"
                    >
                      {{ formatDay(pcs.day) }}, {{ formatDate(pcs.day) }}
                    </div>
                  </div>
                  <div
                    v-for="(item, index) in shiftsAssign.details"
                    :key="index"
                  >
                    <div
                      v-if="shiftsAssign.type == 'PERSON'"
                      class="flex items-center form-supper-plus -mt-3"
                    >
                      <div class="flex items-center form-large min-w-[800px]">
                        <div>
                          <span @click="removeShiftRangePerson(index)"
                            ><i
                              class="fal fa-times icon-close mr-2"
                              style="margin-top: 0px"
                            ></i
                          ></span>
                        </div>
                        <div class="grid grid-cols-12 gap-2">
                          <div class="col-span-2">
                            <input
                              type="text"
                              name=""
                              id=""
                              class="disabledInput p-3 w-full"
                              disabled
                              placeholder="Mã NV"
                              v-model="item.personnel_code"
                            />
                          </div>
                          <div class="col-span-4">
                            <!-- <selector-one-view
                              :Placeholder="'Tìm nhân sự'"
                              :listOption="listPersonnels"
                              :final="item.personnel_id"
                              :searchOption="loadPersonnel"
                              :listSearch="item"
                              @selected="selectedPersonnel($event, index)"
                            >
                              <template v-slot:selectedOption="{ item }">
                                <div class="flex flex-col text-left">
                                  <div class="flex">
                                    <div>
                                      {{ item.name }}&nbsp;{{
                                        formatWorking(item.job_status)
                                      }}
                                    </div>
                                  </div>
                                </div>
                              </template>
                              <template v-slot:selected="{ item }">
                                <div class="flex">
                                  <div>{{ item.name }}</div>
                                </div>
                              </template>
                            </selector-one-view> -->
                            <v-select
                              label="name"
                              :options="listPersonnelsNopage"
                              :reduce="(personel) => personel.ID"
                              placeholder="Tìm nhân sự"
                              v-model="item.name"
                              @update:modelValue="
                                selectedPersonnel($event, index)
                              "
                            >
                              <template #option="{ name, job_status }">
                                <div class="flex flex-col text-left">
                                  <div class="flex">
                                    <div>
                                      {{ name }} {{ formatWorking(job_status) }}
                                    </div>
                                  </div>
                                </div>
                              </template>
                              <template #selected-option="{ name }">
                                <div class="flex">
                                  <div>{{ name }}</div>
                                </div>
                              </template>
                            </v-select>
                          </div>
                          <div class="col-span-3">
                            <input
                              type="text"
                              name=""
                              id=""
                              class="disabledInput p-3 w-full"
                              disabled
                              placeholder="Vị trí"
                              :value="formatPosition(item.position_id)"
                            />
                          </div>
                          <div class="col-span-3">
                            <input
                              type="text"
                              name=""
                              id=""
                              class="disabledInput p-3 w-full"
                              disabled
                              placeholder="Phòng ban"
                              :value="formatDepartment(item.department_id)"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        class="form-x-small px-1 min-w-[101px]"
                        v-for="(pcs, index) in item.shift_ids"
                        :key="index"
                      >
                        <input-shift
                          v-model="pcs.shift"
                          :isMultiple="true"
                        ></input-shift>
                      </div>
                    </div>

                    <div v-if="shiftsAssign.type != 'PERSON'">
                      <div class="grid grid-cols-8 form-small gap-2">
                        <label for="" class="form-group-label col-span-3"
                          >Ngày</label
                        ><label for="" class="form-group-label col-span-5"
                          >Ca</label
                        >
                      </div>
                      <div
                        class="grid grid-cols-8 form-small gap-2"
                        v-for="(pcs, index) in item.shift_ids"
                        :key="index"
                      >
                        <div class="col-span-3">
                          <date-picker v-model="pcs.day"></date-picker>
                        </div>
                        <div class="col-span-5">
                          <input-shift
                            v-model="pcs.shift"
                            :isMultiple="true"
                          ></input-shift>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="shiftsAssign.type == 'PERSON'">
                    <span
                      ><i
                        class="fal fa-plus-circle icon-plus"
                        @click="createShiftRangePerson()"
                      ></i
                    ></span>
                  </div>
                </div>
              </div>
            </Transition>
            <div v-show="isDetail == false">
              <h2
                @click="isDetail = !isDetail"
                class="cursor-pointer form-group-label"
              >
                Tiêu đề *, Kiểu phân ca *, Loại ca *, Người duyệt 1 *, Phòng
                ban, Vị trí, Phân công *, Từ ngày, Đến ngày, Phân công này sẽ
                lặp,
              </h2>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button
            class="button-modal"
            @click="createShiftAssign()"
            :class="{ disabledButtonCreated: isCreated }"
          >
            Cập nhật
          </button>
          <button class="button-close-modal" @click="this.$router.go(-1)">
            Hủy bỏ
          </button>
        </div>
      </div>
    </template>
  </person-layout>
  <loading-overlay :isLoading="isLoading"></loading-overlay>
  <loading-overlay :isLoading="isLoadingLoad"></loading-overlay>
</template>

<script>
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarTimekeep from "@/components/sidebar/SidebarTimekeep.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateTimekeep from "@/views/timekeep/ButtonCreateTimekeep.vue";
import datePicker from "@/components/datePicker/datePicker.vue";
import InputPosition from "@/components/constant/InputPosition.vue";
import InputShift from "@/components/constant/InputShift.vue";
// import SelectorOneView from "@/components/selector/SelectorOneView.vue";
import SelectorViewVue from "@/components/selector/SelectorTestView.vue";
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { FormatDate, FormatTitle, FormatWeekdays } from "@/constants/FormatAll";
import { useToast } from "vue-toastification";
import { useConfirmApproval } from "@/store/modules/approval/ConfirmApproval";
import { useShiftAssign } from "@/store/modules/timekeep/shiftAssign";
import { useShifts } from "@/store/modules/settingTimekeep/shifts";
import { storeToRefs } from "pinia";
import _ from "lodash";
export default {
  components: {
    PersonLayout,
    SidebarTimekeep,
    NavbarSocial,
    ButtonCreateTimekeep,
    datePicker,
    SelectorViewVue,
    InputPosition,
    InputShift,
    // SelectorOneView,
  },
  data() {
    return {
      isInfor: true,
      isDetail: true,
      listDayOfWeek: [
        "Thứ 2",
        "Thứ 3",
        "Thứ 4",
        "Thứ 5",
        "Thứ 6",
        "Thứ 7",
        "Chủ nhật",
      ],
      dataType: [
        { value: "GROUP", title: "Phân ca cho phòng ban, vị trí" },
        { value: "PERSON", title: "Phân ca cho cá nhân" },
      ],
      dataShiftType: [
        { value: "HC", title: "Hành chính" },
        { value: "CC", title: "Ca kíp" },
      ],
      dataRepeat: [
        { value: "WEEKLY", title: "Lặp theo tuần" },
        { value: "NONE", title: "Theo số ngày cố định" },
        { value: "DAILY", title: "Lặp theo chu kì ngày" },
        { value: "RANGE", title: "Theo khoảng ngày" },
      ],
    };
  },
  methods: {
    formatNumDateShift(index) {
      return "Ngày " + (index + 1);
    },
    formatPosition(id) {
      return FormatTitle(id, this.listPositions);
    },
    formatDepartment(id) {
      return FormatTitle(id, this.listDepartments);
    },
    formatDate(date) {
      return FormatDate(date);
    },
    formatDay(date) {
      let day = new Date(date);
      return FormatWeekdays(day.getDay());
    },
    formatWeekItem(index) {
      if (index == 8) {
        return "Chủ nhật";
      } else {
        return "Thứ " + index;
      }
    },
    formatOption(title, deep) {
      if (deep < 2) {
        return title;
      } else if (deep == 2) {
        return "─ " + title;
      } else if (deep == 3) {
        return "─ ─ " + title;
      } else if (deep == 4) {
        return "─ ─ ─ " + title;
      } else if (deep == 5) {
        return "─ ─ ─ ─ " + title;
      } else if (deep == 6) {
        return "─ ─ ─ ─ ─ " + title;
      } else if (deep == 7) {
        return "─ ─ ─ ─ ─ ─ " + title;
      }
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const toast = useToast();
    const dateShift = new Date().toISOString().substring(0, 10);
    const isAssignment = ref(0);
    const numDateShift = ref(1);
    const numDayWeek = ref(8);
    const shiftType = ref(0);
    const multiDate = ref([]);
    const isLoading = ref(true);
    const isLoadingLoad = ref(false);
    const isCreated = ref(false);
    const listSearch = ref([]);
    const confirm = useConfirmApproval();
    const assign = useShiftAssign();
    const { personnelByDepart } = storeToRefs(assign);
    const tk_shift = useShifts();
    const { listShifts } = storeToRefs(tk_shift);
    const { listPersonnelApprove } = storeToRefs(confirm);
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);

    const shiftsAssign = reactive({
      title: "",
      date_start: dateShift,
      date_end: null,
      type: "GROUP",
      shift_type: "HC",
      app_approval_ids: [],
      department_ids: [],
      position_ids: [],
      repeat_type: "NONE",
      interval: 1,
      details: [
        {
          date_start: dateShift,
          personnel_id: null,
          personnel_code: null,
          position_id: null,
          department_id: null,
          name: null,
          shift_ids: [
            {
              day: dateShift,
              shift: [],
            },
          ],
        },
      ],
    });
    const loadPersonnel = _.debounce((event) => {
      store.dispatch("personnels/SearchPersonnelAction", event.target.value);
    }, 400);
    tk_shift.GetAllShiftsAction();
    const listPositions = computed(
      () => store.getters["positions/getAllPositionsActive"]
    );
    const listDepartments = computed(
      () => store.state.departments.listDepartments
    );
    if (listDepartments.value?.length == 0) {
      store.dispatch("departments/getAllDepartmentsAction");
    }
    if (listPositions.value?.length == 0) {
      store.dispatch("positions/getAllPositionsAction", 500);
    }
    const formatWorking = (stt) => {
      if (stt == "WORKING") {
        return "";
      } else {
        return "( Đã nghỉ )";
      }
    };
    store.dispatch("personnels/getAllPersonnelNoPaginateAction");
    const personnelContractDetail = computed(
      () => store.state.personnels.personnelContractDetail
    );
    const listPersonnelsNopage = computed(
      () => store.state.personnels.listPersonnelNoPaginate
    );
    const changeInputDepartment = () => {
      if (shiftsAssign.type == "PERSON") {
        assign.ListPersonnelByDepartmentAction(shiftsAssign.department_ids);
        shiftsAssign.details.length = 0;
        isLoadingLoad.value = true;
        setTimeout(() => {
          for (let i = 0; i < personnelByDepart.value?.length; i++) {
            let data = {
              date_start: dateShift,
              personnel_id: personnelByDepart.value[i].ID,
              personnel_code: personnelByDepart.value[i].code,
              position_id: personnelByDepart.value[i].position_id,
              department_id: personnelByDepart.value[i].department_id,
              name: personnelByDepart.value[i].name,
              shift_ids: [
                {
                  day: dateShift,
                  shift: [],
                },
              ],
            };
            shiftsAssign.details.push(data);
          }
          isLoadingLoad.value = false;
        }, 1500);
      }
    };
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const selectedPersonnel = (e, index) => {
      store.dispatch("personnels/getPersonnelDetailAction", {
        id: e,
        EndTimeLoading: EndTimeLoading,
        shiftsAssign,
        index,
      });
      // shiftsAssign.details[index].personnel_code = e.code;
      // shiftsAssign.details[index].position_id = e.position_id;
      // shiftsAssign.details[index].department_id = e.department_id;
      // shiftsAssign.details[index].personnel_id = e.ID;
    };
    const listPersonnels = computed(
      () => store.state.personnels.SearchPersonnel
    );
    const loadManagers = (event) => {
      confirm.getAllPersonnelApproveAction(event.target.value, 1);
    };
    const multiShift = reactive([
      {
        date: dateShift,
        shift: null,
      },
    ]);
    const addShift = () => {
      const data = {
        date: dateShift,
        shift: null,
      };
      multiShift.push(data);
    };
    const removeShift = (index) => {
      multiShift.splice(index, 1);
    };
    const changeDateShift = (event) => {
      shiftsAssign.interval = event.target.value;
      shiftsAssign.details.length = 1;
      for (let i = 0; i < shiftsAssign.details.length; i++) {
        shiftsAssign.details[i].shift_ids.length = 0;
        for (let j = 0; j < shiftsAssign.interval; j++) {
          let data = {
            day: j + 1,
            shift: [],
          };
          shiftsAssign.details[i].shift_ids.push(data);
        }
      }
    };
    const createShiftPersonDaily = () => {
      let data = {
        personnel_id: null,
        personnel_code: null,
        position_id: null,
        department_id: null,
        shift_ids: [
          {
            day: null,
            shift: [],
          },
        ],
      };
      for (let i = 1; i < shiftsAssign.interval; i++) {
        const arr = {
          day: null,
          shift: [],
        };
        data.shift_ids.push(arr);
      }
      shiftsAssign.details.push(data);
    };
    const removeShiftPersonDaily = (index) => {
      shiftsAssign.details.splice(index, 1);
    };
    const dateRange = (startDate, endDate, steps = 1) => {
      const dateArray = [];
      let currentDate = new Date(startDate);

      while (currentDate <= new Date(endDate)) {
        dateArray.push(new Date(currentDate).toISOString().substring(0, 10));
        currentDate.setUTCDate(currentDate.getUTCDate() + steps);
      }

      return dateArray;
    };
    const SelectMultiDate = () => {
      if (shiftsAssign.repeat_type != "WEEKLY") {
        multiDate.value = dateRange(
          shiftsAssign.date_start,
          shiftsAssign.date_end
        );
        for (let j = 0; j < shiftsAssign.details.length; j++) {
          shiftsAssign.details[j].shift_ids.length = 0;
          for (let i = 0; i < multiDate.value.length; i++) {
            const data = {
              day: multiDate.value[i],
              shift: [],
            };
            shiftsAssign.details[j].shift_ids.push(data);
          }
        }
      }
    };
    // Start theo khoang ngay
    const createShiftRangePerson = () => {
      const data = {
        personnel_id: null,
        personnel_code: null,
        position_id: null,
        department_id: null,
        shift_ids: [
          {
            day: null,
            shift: [],
          },
        ],
      };
      shiftsAssign.details.push(data);
      SelectMultiDate();
    };
    const removeShiftRangePerson = (index) => {
      shiftsAssign.details.splice(index, 1);
    };
    // End theo khoangr ngay
    const changeAssignment = (event) => {
      console.log(event);
      if (event.value == "WEEKLY") {
        for (let i = 0; i < shiftsAssign.details.length; i++) {
          shiftsAssign.details[i].shift_ids.length = 0;
          for (let j = 2; j <= numDayWeek.value; j++) {
            const data = {
              day: j,
              shift: [],
            };
            shiftsAssign.details[i].shift_ids.push(data);
          }
        }
      } else {
        shiftsAssign.details[0].shift_ids.length = 1;
      }
    };
    // Start theo tuânf
    const createShiftWeeklyPerson = () => {
      const data = {
        personnel_id: null,
        personnel_code: null,
        position_id: null,
        department_id: null,
        shift_ids: [
          {
            day: 2,
            shift: [],
          },
          {
            day: 3,
            shift: [],
          },
          {
            day: 4,
            shift: [],
          },
          {
            day: 5,
            shift: [],
          },

          {
            day: 6,
            shift: [],
          },
          {
            day: 7,
            shift: [],
          },
          {
            day: 8,
            shift: [],
          },
        ],
      };
      shiftsAssign.details.push(data);
    };
    const removeShiftWeeklyPerson = (index) => {
      shiftsAssign.details.splice(index, 1);
    };
    // End theo tuần
    // Start Theo ngày cố định
    const createShiftFixedDay = () => {
      const data = {
        date_start: null,
        personnel_id: null,
        personnel_code: null,
        position_id: null,
        department_id: null,
        shift_ids: [
          {
            day: null,
            shift: [],
          },
        ],
      };
      shiftsAssign.details.push(data);
    };
    const removeShiftFixedDay = (index) => {
      shiftsAssign.details.splice(index, 1);
    };
    // End theo ngày cố định
    const ChangeShiftsAssignType = (e) => {
      if (e.target.value == "GROUP") {
        shiftsAssign.details.length = 1;
      }
    };
    const ActivatedButton = () => {
      isCreated.value = false;
    };
    const createShiftAssign = () => {
      isCreated.value = true;
      if (shiftsAssign.repeat_type != "WEEKLY") {
        let arr = [];
        for (let i = 0; i < shiftsAssign.details[0].shift_ids.length; i++) {
          let dateAdd = shiftsAssign.details[0].shift_ids[i].day;
          arr.push(dateAdd);
        }
        let max = arr.reduce((prev, curr) => (prev > curr ? prev : curr));
        let min = arr.reduce((prev, curr) => (prev < curr ? prev : curr));
        shiftsAssign.date_start = min;
        shiftsAssign.date_end = max;
      }
      if (shiftsAssign.date_start > shiftsAssign.date_end) {
        toast.error("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
      } else {
        const data = {
          title: shiftsAssign.title,
          date_start: shiftsAssign.date_start,
          date_end: shiftsAssign.date_end,
          type: shiftsAssign.type,
          shift_type: shiftsAssign.shift_type,
          app_approval_ids: shiftsAssign.app_approval_ids,
          department_ids: shiftsAssign.department_ids,
          position_ids: shiftsAssign.position_ids,
          repeat_type: shiftsAssign.repeat_type,
          interval: shiftsAssign.interval,
          details: shiftsAssign.details,
        };
        assign.createShiftAssignAction({
          data: data,
          router,
          toast,
          ActivatedButton,
        });
      }
    };
    return {
      isCreated,
      dateShift,
      isAssignment,
      multiShift,
      numDateShift,
      multiDate,
      shiftType,
      shiftsAssign,
      listPersonnels,
      personnelContractDetail,
      isLoading,
      listShifts,
      numDayWeek,
      isLoadingLoad,
      listPersonnelsNopage,
      addShift,
      removeShift,
      changeDateShift,
      dateRange,
      SelectMultiDate,
      changeAssignment,
      loadPersonnel,
      formatWorking,
      selectedPersonnel,
      createShiftAssign,
      createShiftPersonDaily,
      removeShiftPersonDaily,
      createShiftRangePerson,
      removeShiftRangePerson,
      createShiftWeeklyPerson,
      removeShiftWeeklyPerson,
      createShiftFixedDay,
      removeShiftFixedDay,
      ChangeShiftsAssignType,
      ActivatedButton,
      listPositions,
      listDepartments,
      loadManagers,
      EndTimeLoading,
      listPersonnelApprove,
      listSearch,
      personnelByDepart,
      changeInputDepartment,
    };
  },
};
</script>

<style></style>
