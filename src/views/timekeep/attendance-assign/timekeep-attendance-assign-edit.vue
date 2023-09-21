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
            <p class="longText">{{ assignDetail.title }}</p>
          </div>
        </div></navbar-social
      >
    </template>
    <Transition duration="550" name="nested">
      <div
        class="w-full h-full form-plus-over format-scroll"
        v-if="isLoading == false"
      >
        <div class="text-left px-4 py-2 mb-10">
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
                      v-model="assignDetail.title"
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
                      v-model="assignDetail.type"
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
                      v-model="assignDetail.shift_type"
                      :searchable="false"
                    ></v-select>
                  </div>
                </div>
                <div class="form-small">
                  <label for="" class="form-group-label"
                    >Người duyệt<span class="text-red-600">*</span></label
                  >
                  <div>
                    <!-- <selector-view-vue
                      :Placeholder="'Nhập người duyệt'"
                      :listOption="listPersonnelApprove"
                      :listFinal="assignDetail.app_approval_ids"
                      :searchOption="loadManagers"
                      :listSearch="assignDetail.data_approver"
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
                    </selector-view-vue> -->
                    <v-select
                      label="code"
                      @input="loadManagers($event)"
                      :options="listMembers"
                      :reduce="(approval) => approval.ID"
                      class="rounded-3xl"
                      placeholder="Chọn người duyệt"
                      multiple
                      v-model="assignDetail.app_approval_ids"
                    >
                      <template
                        #option="{ code, fullname, position, department }"
                      >
                        <div class="flex flex-col">
                          <div class="font-medium">
                            {{ code }} - {{ fullname }}
                          </div>
                          <div class="text-xs">{{ position?.title }}</div>
                          <div class="text-xs">
                            {{ department?.title }}
                          </div>
                        </div>
                      </template>
                      <template #selected-option="{ code, fullname }">
                        <div style="display: flex; align-items: baseline">
                          <strong>{{ code }}</strong>
                          <em>-{{ fullname }}</em>
                        </div>
                      </template>
                    </v-select>
                  </div>
                </div>
                <div class="form-small">
                  <label for="" class="form-group-label">Phòng ban</label>
                  <div>
                    <v-select
                      label="title"
                      :options="listDepartments"
                      :reduce="(department) => department.ID"
                      v-model="assignDetail.department_ids"
                      placeholder="Chọn phòng ban"
                      multiple
                    ></v-select>
                  </div>
                </div>
                <div class="form-small">
                  <label for="" class="form-group-label">Vị trí</label>
                  <div>
                    <v-select
                      label="title"
                      :options="listPositions"
                      :reduce="(position) => position.ID"
                      v-model="assignDetail.position_ids"
                      placeholder="Chọn vị trí"
                      multiple
                    ></v-select>
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
                      v-model="assignDetail.repeat_type"
                      @option:selected="changeAssignment($event)"
                      :searchable="false"
                    ></v-select>
                  </div>
                </div>
                <div
                  class="grid grid-cols-2 gap-2 form-small"
                  v-if="assignDetail.repeat_type != 'NONE'"
                >
                  <div class="col-span-1">
                    <label for="" class="form-group-label"
                      >Từ ngày<span class="text-red-600">*</span></label
                    >
                    <div>
                      <date-picker
                        v-model="assignDetail.date_start"
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
                        v-model="assignDetail.date_end"
                        :SelectMultiDate="SelectMultiDate"
                      ></date-picker>
                    </div>
                  </div>
                </div>
                <div
                  class="grid grid-cols-2 gap-2 form-small"
                  v-if="assignDetail.repeat_type == 'DAILY'"
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
                        v-model="assignDetail.interval"
                        @change="changeDateShift($event)"
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="disabledInput p-3 w-full mt-7"
                      disabled
                      value="ngày 1 lần"
                    />
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
          <div title="Chi tiết phân công" class="inner">
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
                <div v-if="assignDetail.repeat_type == 'WEEKLY'">
                  <div
                    class="flex items-center"
                    v-if="assignDetail.type == 'PERSON'"
                  >
                    <div class="flex items-center form-large min-w-[800px]">
                      <div class="w-[30px]"></div>
                      <div class="grid grid-cols-12 gap-2 p-[5px] w-full">
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
                        class="form-x-small px-1"
                      >
                        {{ item }}
                      </div>
                    </div>
                  </div>
                  <div
                    v-for="(item, index) in assignDetail.details"
                    :key="index"
                  >
                    <div
                      v-if="assignDetail.type == 'PERSON'"
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
                        <div class="grid grid-cols-12 gap-2 p-[5px]">
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
                              :listSearch="{ name: item.name }"
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
                              placeholder="Tất cả"
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
                              placeholder="Tất cả"
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
                    <div v-if="assignDetail.type != 'PERSON'">
                      <div class="grid grid-cols-8 form-small gap-2">
                        <label for="" class="form-group-label col-span-2"
                          >Thứ</label
                        ><label for="" class="form-group-label col-span-6"
                          >Ca</label
                        >
                      </div>
                      <div
                        class="grid grid-cols-8 form-small gap-2"
                        v-for="(pcs, inde) in item.shift_ids"
                        :key="inde"
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
                  <div v-if="assignDetail.type == 'PERSON'" class="mt-2">
                    <span
                      ><i
                        class="fal fa-plus-circle icon-plus"
                        @click="createShiftWeeklyPerson()"
                      ></i
                    ></span>
                  </div>
                </div>
                <div v-if="assignDetail.repeat_type == 'NONE'">
                  <div
                    class="flex items-center form-plus"
                    v-if="assignDetail.type == 'PERSON'"
                  >
                    <div class="flex items-center form-large">
                      <div class="w-[40px]"></div>
                      <div class="grid grid-cols-12 gap-2 p-[5px] w-full">
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
                        <div class="col-span-5 w-max">
                          <label for="" class="form-group-label">Ca</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="grid grid-cols-8 form-small gap-2" v-else>
                    <label for="" class="form-group-label col-span-3"
                      >Ngày</label
                    ><label for="" class="form-group-label col-span-5 w-max"
                      >Ca</label
                    >
                  </div>
                  <div
                    v-for="(item, index) in assignDetail.details"
                    :key="index"
                  >
                    <div
                      v-if="assignDetail.type == 'PERSON'"
                      class="flex items-center form-plus -mt-3"
                    >
                      <div class="flex items-center form-large min-w-[800px]">
                        <div>
                          <span @click="removeShiftFixedDay(index)"
                            ><i
                              class="fal fa-times icon-close px-2"
                              style="margin-top: 0px"
                            ></i
                          ></span>
                        </div>
                        <div class="grid grid-cols-12 gap-2 p-[5px]">
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
                              :listOption="listPersonnelsNopage"
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
                              placeholder="Mã NV"
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
                              placeholder="Mã NV"
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
                          <div class="col-span-5 w-max">
                            <input-shift
                              v-model="pcs.shift"
                              :isMultiple="true"
                            ></input-shift>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="assignDetail.type != 'PERSON'">
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
                          <div class="col-span-5 w-max">
                            <input-shift
                              v-model="pcs.shift"
                              :isMultiple="true"
                            ></input-shift>
                          </div>
                        </div>
                        <div v-if="assignDetail.type != 'PERSON'">
                          <span
                            @click="removeShiftFixedDay(ind)"
                            class="cursor-pointer"
                            ><i
                              class="fal fa-times text-xl ml-2 hover:text-red-500"
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
                <div v-if="assignDetail.repeat_type == 'DAILY'">
                  <div
                    class="flex items-center"
                    v-if="assignDetail.type == 'PERSON'"
                  >
                    <div class="flex items-center form-large min-w-[800px]">
                      <div class="w-[40px]"></div>
                      <div class="grid grid-cols-12 gap-2 p-[5px] w-full">
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
                        v-for="(pcs, index) in assignDetail.details[0]
                          .shift_ids"
                        :key="index"
                      >
                        {{ formatNumDateShift(index) }}
                      </div>
                    </div>
                  </div>
                  <div
                    v-for="(item, index) in assignDetail.details"
                    :key="index"
                  >
                    <div
                      v-if="assignDetail.type == 'PERSON'"
                      class="flex items-center"
                    >
                      <div class="flex items-center form-large min-w-[800px]">
                        <div>
                          <span @click="removeShiftPersonDaily(index)"
                            ><i
                              class="fal fa-times icon-close px-2"
                              style="margin-top: 0px"
                            ></i
                          ></span>
                        </div>
                        <div class="grid grid-cols-12 gap-2 p-[5px]">
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
                              :listSearch="{ name: item.name }"
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
                              placeholder="Vị trí"
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
                    <div v-if="assignDetail.type != 'PERSON'">
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
                  <div v-if="assignDetail.type == 'PERSON'">
                    <span
                      ><i
                        class="fal fa-plus-circle icon-plus"
                        @click="createShiftPersonDaily()"
                      ></i
                    ></span>
                  </div>
                </div>
                <div v-if="assignDetail.repeat_type == 'RANGE'">
                  <div
                    v-if="assignDetail.type == 'PERSON'"
                    class="flex items-center min-w-[1000px]"
                  >
                    <div class="flex items-center form-large min-w-[800px]">
                      <div class="w-[30px]"></div>
                      <div class="grid grid-cols-12 gap-2 p-[5px] w-full">
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
                    <div class="grow flex items-center">
                      <div
                        class="form-x-small px-1 form-group-label"
                        v-for="(pcs, index) in assignDetail.details[0]
                          .shift_ids"
                        :key="index"
                      >
                        <div class="w-full">
                          {{ formatDay(pcs.day) }}, {{ formatDate(pcs.day) }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-for="(item, index) in assignDetail.details"
                    :key="index"
                  >
                    <div
                      v-if="assignDetail.type == 'PERSON'"
                      class="flex items-center -mt-3"
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
                        <div class="grid grid-cols-12 gap-2 p-[5px]">
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
                              :listSearch="{ name: item.name }"
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
                    <div v-else>
                      <div class="grid grid-cols-8 form-small gap-2">
                        <label for="" class="form-group-label col-span-3"
                          >Ngày</label
                        ><label for="" class="form-group-label col-span-5 w-max"
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
                        <div class="col-span-5 w-max">
                          <input-shift
                            v-model="pcs.shift"
                            :isMultiple="true"
                          ></input-shift>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="assignDetail.type == 'PERSON'">
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
            @click="updateShiftAssign()"
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
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarTimekeep from "@/components/sidebar/SidebarTimekeep.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateTimekeep from "@/views/timekeep/ButtonCreateTimekeep.vue";
import datePicker from "@/components/datePicker/datePicker.vue";
import InputShift from "@/components/constant/InputShift.vue";
// import SelectorOneView from "@/components/selector/SelectorOneView.vue";
// import SelectorViewVue from "@/components/selector/SelectorTestView.vue";
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
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
    // SelectorOneView,
    InputShift,
    // SelectorViewVue,
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
    formatDate(date) {
      return FormatDate(date);
    },
    formatWeekItem(index) {
      if (index == 8) {
        return "Chủ nhật";
      } else {
        return "Thứ " + index;
      }
    },
    formatDay(date) {
      let day = new Date(date);
      return FormatWeekdays(day.getDay());
    },
    formatPosition(id) {
      return FormatTitle(id, this.listPositions);
    },
    formatDepartment(id) {
      return FormatTitle(id, this.listDepartments);
    },
    formatWorking(stt) {
      if (stt == "WORKING") {
        return "";
      } else {
        return "( Đã nghỉ )";
      }
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const dateShift = new Date().toISOString().substring(0, 10);
    const isAssignment = ref(0);
    const numDateShift = ref(1);
    const numDayWeek = ref(8);
    const shiftType = ref(0);
    const multiDate = ref([]);
    const isLoading = ref(true);
    const isCreated = ref(false);
    const confirm = useConfirmApproval();
    const assign = useShiftAssign();
    const tk_shift = useShifts();
    const { listShifts } = storeToRefs(tk_shift);
    const { listPersonnelApprove } = storeToRefs(confirm);
    const { assignDetail } = storeToRefs(assign);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    // const personnelDetails = computed(
    //   () => store.state.personnels.personnelDetail
    // );
    assign.showShiftAssignAction({
      id: route.params.editID,
      EndTimeLoading: EndTimeLoading,
    });
    tk_shift.GetAllShiftsAction();
    store.dispatch("departments/getAllDepartmentsAction");
    store.dispatch("personnels/getAllPersonnelNoPaginateAction");
    const loadPersonnel = _.debounce((event) => {
      store.dispatch("personnels/SearchPersonnelAction", event.target.value);
    }, 400);
    const selectedPersonnel = (e, index) => {
      store.dispatch("personnels/getPersonnelDetailAction", {
        id: e,
        EndTimeLoading: EndTimeLoading,
        assignDetail,
        index,
      });
    };
    const personnelContractDetail = computed(
      () => store.state.personnels.personnelContractDetail
    );
    const listPersonnels = computed(
      () => store.state.personnels.SearchPersonnel
    );
    const listPersonnelsNopage = computed(
      () => store.state.personnels.listPersonnelNoPaginate
    );
    const listDepartments = computed(
      () => store.state.departments.listDepartments
    );
    const listPositions = computed(() => store.state.positions.listPositions);
    if (listPositions.value?.length == 0) {
      store.dispatch("positions/getAllPositionsAction", 500);
    }
    store.dispatch("users/SearchMembersAction", "");
    const loadManagers = (e) => {
      store.dispatch("users/SearchMembersAction", e.target.value);
    };
    const listMembers = computed(() => store.state.users.listMembers);
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
      assignDetail.value.interval = event.target.value;
      assignDetail.value.details.length = 1;
      for (let i = 0; i < assignDetail.value.details.length; i++) {
        assignDetail.value.details[i].shift_ids.length = 0;
        for (let j = 0; j < assignDetail.value.interval; j++) {
          let data = {
            day: j + 1,
            shift: [],
          };
          assignDetail.value.details[i].shift_ids.push(data);
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
      for (let i = 1; i < assignDetail.value.interval; i++) {
        const arr = {
          day: null,
          shift: [],
        };
        data.shift_ids.push(arr);
      }
      assignDetail.value.details.push(data);
    };
    const removeShiftPersonDaily = (index) => {
      assignDetail.value.details.splice(index, 1);
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
      if (assignDetail.value.repeat_type != "WEEKLY") {
        multiDate.value = dateRange(
          assignDetail.value.date_start,
          assignDetail.value.date_end
        );
        for (let j = 0; j < assignDetail.value.details.length; j++) {
          assignDetail.value.details[j].shift_ids.length = 0;
          for (let i = 0; i < multiDate.value.length; i++) {
            const data = {
              day: multiDate.value[i],
              shift: [],
            };
            assignDetail.value.details[j].shift_ids.push(data);
          }
        }
      }
    };
    // Start theo khoang ngayf
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
      assignDetail.value.details.push(data);
    };
    const removeShiftRangePerson = (index) => {
      assignDetail.value.details.splice(index, 1);
    };
    // End theo khoangr ngay
    const changeAssignment = (event) => {
      if (event.target.value == "WEEKLY") {
        for (let i = 0; i < assignDetail.value.details.length; i++) {
          assignDetail.value.details[i].shift_ids.length = 0;
          for (let j = 2; j <= numDayWeek.value; j++) {
            const data = {
              day: j,
              shift: [],
            };
            assignDetail.value.details[i].shift_ids.push(data);
          }
        }
      } else {
        assignDetail.value.details[0].shift_ids.length = 1;
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
      assignDetail.value.details.push(data);
    };
    const removeShiftWeeklyPerson = (index) => {
      assignDetail.value.details.splice(index, 1);
    };
    // End theo tuần
    // Start Theo ngày cố định
    const createShiftFixedDay = () => {
      const data = {
        date_start: dateShift,
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
      assignDetail.value.details.push(data);
    };
    const removeShiftFixedDay = (index) => {
      assignDetail.value.details.splice(index, 1);
    };
    // End theo ngày cố định
    const ActivatedButton = () => {
      isCreated.value = false;
    };
    const updateShiftAssign = () => {
      isCreated.value = true;
      const data = {
        ID: assignDetail.value.ID,
        title: assignDetail.value.title,
        date_start: assignDetail.value.date_start,
        date_end: assignDetail.value.date_end,
        type: assignDetail.value.type,
        shift_type: assignDetail.value.shift_type,
        app_approval_ids: assignDetail.value.app_approval_ids,
        department_ids: assignDetail.value.department_ids,
        position_ids: assignDetail.value.position_ids,
        repeat_type: assignDetail.value.repeat_type,
        interval: assignDetail.value.interval,
        details: assignDetail.value.details,
      };
      assign.updateShiftAssignAction({
        data: data,
        router,
        toast,
        ActivatedButton,
      });
    };
    return {
      isCreated,
      assignDetail,
      dateShift,
      isAssignment,
      multiShift,
      numDateShift,
      multiDate,
      shiftType,
      listPersonnels,
      listDepartments,
      listPositions,
      isLoading,
      listShifts,
      numDayWeek,
      personnelContractDetail,
      listPersonnelApprove,
      listPersonnelsNopage,
      listMembers,
      // personnelDetails,
      EndTimeLoading,
      addShift,
      removeShift,
      changeDateShift,
      dateRange,
      SelectMultiDate,
      changeAssignment,
      loadPersonnel,
      updateShiftAssign,
      selectedPersonnel,
      createShiftPersonDaily,
      removeShiftPersonDaily,
      createShiftRangePerson,
      removeShiftRangePerson,
      createShiftWeeklyPerson,
      removeShiftWeeklyPerson,
      createShiftFixedDay,
      removeShiftFixedDay,
      ActivatedButton,
      loadManagers,
    };
  },
};
</script>

<style></style>
