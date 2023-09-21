<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-setting-approval></sidebar-setting-approval>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false">
        <div class="flex grow items-center">
          <p
            class="uppercase ml-4 font-bold text-lg"
            style="color: var(--color-primary)"
          >
            Cài đặt chung
          </p>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar>
      <nav-feature
        ><div>
          <tab-nav
            :tabs="[
              'Đơn xin nghỉ',
              'Đơn vắng mặt',
              'Đơn làm thêm',
              'Đơn checkin/out',
              'Đơn đổi ca',
              'Đơn tăng ca',
              'Đơn đăng ký ca',
              'Đơn công tác',
              'Đơn theo chế độ',
              'Đơn thôi việc',
              'Cài đặt khác',
            ]"
            :selected="selected"
            @selected="setSelected"
          >
          </tab-nav></div
      ></nav-feature>
    </template>
    <div class="w-full" v-if="isLoading == false">
      <div>
        <Transition name="slide-fade">
          <the-tab :isSelected="selected === 'Đơn xin nghỉ'"
            ><div class="p-2 h-full">
              <h2 class="text-left uppercase font-semibold p-2">
                đơn xin nghỉ
              </h2>
              <div class="w-full p-2 border rounded-lg">
                <div class="row-setting">
                  <div class="flex flex-col text-left">
                    <h5 class="text-setting">
                      Cho phép nhân viên tạo đơn xin nghỉ
                    </h5>
                    <h5 class="sub-setting">
                      Hãy tắt nó nếu công ty không sử dụng đơn này
                    </h5>
                  </div>
                  <div>
                    <div class="check">
                      <input
                        id="checkLeave"
                        type="checkbox"
                        v-model="SettingApprovalLeave.leave_approval_create"
                        true-value="1"
                        false-value="0"
                      />
                      <label for="checkLeave"></label>
                    </div>
                  </div>
                </div>
                <hr />
                <Transition duration="550" name="nested">
                  <div v-if="SettingApprovalLeave.leave_approval_create == 1">
                    <div class="row-setting">
                      <div class="ml-4 flex flex-col">
                        <h5 class="text-setting">
                          Số ngày tối đa có thể làm đơn sau thời điểm xin nghỉ
                        </h5>
                        <h5 class="sub-setting">
                          VD: Nếu bạn cài đặt số ngày là 2, nhân sự muốn xin
                          nghỉ từ ngày 04/06/2022 thì nhân sự đó có thể tạo đơn
                          muộn nhất là 06/06/2022
                        </h5>
                      </div>
                      <div>
                        <input
                          type="number"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập số ngày"
                          v-model="SettingApprovalLeave.leave_max_time_after"
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row-setting">
                      <div class="ml-4 flex flex-col">
                        <h5 class="text-setting">
                          Số ngày tối thiểu có thể làm đơn trước thời điểm xin
                          nghỉ
                        </h5>
                        <h5 class="sub-setting">
                          VD: Nếu bank cài đặt số ngày là 2, nhân sự muốn xin
                          nghỉ từ ngày 04/06/2022 thì nhân sự đó phải tạo đơn
                          trước 2 ngày là 02/06/2022
                        </h5>
                      </div>
                      <div>
                        <input
                          type="number"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập số ngày"
                          v-model="SettingApprovalLeave.leave_max_time_before"
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row-setting">
                      <div class="ml-4 flex flex-col">
                        <h5 class="text-setting">Mô tả khi tạo đơn xin nghỉ</h5>
                        <h5 class="sub-setting">
                          Khi bật cài đặt này, nhân sự tạo đơn cài phải nhập nội
                          dung mô tả thì hệ thống mới ghi nhận tạo đơn thành
                          công
                        </h5>
                      </div>
                      <div>
                        <div class="check">
                          <input
                            id="isDescLeave"
                            type="checkbox"
                            v-model="SettingApprovalLeave.leave_note"
                            true-value="1"
                            false-value="0"
                          />
                          <label for="isDescLeave"></label>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div class="row-setting">
                      <h5 class="text-setting">Lý do xin nghỉ</h5>
                      <div>
                        <span
                          @click="this.$router.push('/approval-setting-leave')"
                          class="cursor-pointer mr-4 text-lg"
                          ><i class="fal fa-external-link"></i
                        ></span>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </the-tab>
        </Transition>
      </div>
      <div>
        <Transition name="slide-fade">
          <the-tab :isSelected="selected === 'Đơn vắng mặt'"
            ><div class="p-2">
              <h2 class="text-left uppercase font-semibold p-2">
                đơn vắng mặt
              </h2>
              <div class="w-full border p-2 rounded-lg">
                <div class="row-setting">
                  <div class="flex flex-col text-left">
                    <h5 class="text-setting">
                      Cho phép nhân viên tạo đơn vắng mặt
                    </h5>
                    <h5 class="sub-setting">
                      Hãy tắt nó nếu công ty không sử dụng đơn này
                    </h5>
                  </div>
                  <div>
                    <div class="check">
                      <input
                        id="checkAbsence"
                        type="checkbox"
                        true-value="1"
                        false-value="0"
                        v-model="SettingApprovalAbsence.meeting_approval_create"
                      />
                      <label for="checkAbsence"></label>
                    </div>
                  </div>
                </div>
                <hr />
                <div v-if="SettingApprovalAbsence.meeting_approval_create == 1">
                  <div class="row-setting">
                    <div class="flex flex-col text-left ml-4">
                      <h5 class="text-setting">
                        Số ngày tối đa có thể làm đơn sau thời điểm vắng mặt
                      </h5>
                      <h5 class="sub-setting">
                        VD: Nếu bạn cài đặt số ngày là 2, nhân sự muốn xin nghỉ
                        từ ngày 04/06/2022 thì nhân sự đó có thể tạo đơn muộn
                        nhất là 06/06/2022
                      </h5>
                    </div>
                    <div>
                      <input
                        type="number"
                        name=""
                        id=""
                        class="form-control-input"
                        placeholder="Nhập số ngày"
                        v-model="SettingApprovalAbsence.meeting_max_time_after"
                      />
                    </div>
                  </div>
                  <hr />
                  <div class="row-setting">
                    <div class="flex flex-col text-left ml-4">
                      <h5 class="text-setting">
                        Số ngày tối thiểu có thể làm đơn trước thời điểm vắng
                        mặt
                      </h5>
                      <h5 class="sub-setting">
                        VD: Nếu bank cài đặt số ngày là 2, nhân sự muốn xin nghỉ
                        từ ngày 04/06/2022 thì nhân sự đó phải tạo đơn trước 2
                        ngày là 02/06/2022
                      </h5>
                    </div>
                    <div>
                      <input
                        type="number"
                        name=""
                        id=""
                        class="form-control-input"
                        placeholder="Nhập số ngày"
                        v-model="SettingApprovalAbsence.meeting_max_time_before"
                      />
                    </div>
                  </div>
                  <hr />
                  <div class="row-setting">
                    <div class="flex flex-col text-left ml-4">
                      <h5 class="text-setting">Mô tả khi tạo đơn</h5>
                      <h5 class="sub-setting">
                        Khi bật cài đặt này, nhân sự tạo đơn cài phải nhập nội
                        dung mô tả thì hệ thống mới ghi nhận tạo đơn thành công
                      </h5>
                    </div>
                    <div>
                      <div class="check">
                        <input
                          id="isDescAbsence"
                          type="checkbox"
                          true-value="1"
                          false-value="0"
                          v-model="SettingApprovalAbsence.meeting_note"
                        />
                        <label for="isDescAbsence"></label>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div class="row-setting">
                    <h5 class="text-setting">Lý do vắng mặt</h5>
                    <div>
                      <span
                        @click="this.$router.push('/approval-setting-absence')"
                        class="cursor-pointer mr-4 text-lg"
                        ><i class="fal fa-external-link"></i
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </the-tab>
        </Transition>
      </div>
      <div>
        <Transition name="slide-fade">
          <the-tab :isSelected="selected === 'Đơn làm thêm'"
            ><div class="p-2">
              <h2 class="text-left uppercase font-semibold p-2">
                đơn làm thêm
              </h2>
              <div class="w-full p-2 border rounded-lg">
                <div class="row-setting">
                  <div class="flex flex-col text-left">
                    <h5 class="text-setting">
                      Cho phép nhân viên tạo đơn làm thêm
                    </h5>
                    <h5 class="suib-setting">
                      Hãy tắt nó nếu công ty không sử dụng đơn này
                    </h5>
                  </div>
                  <div>
                    <div class="check">
                      <input
                        id="checkOvertime"
                        type="checkbox"
                        v-model="
                          SettingApprovalOvertime.overtime_approval_create
                        "
                        true-value="1"
                        false-value="0"
                      />
                      <label for="checkOvertime"></label>
                    </div>
                  </div>
                </div>
                <hr />
                <Transition duration="550" name="nested">
                  <div
                    v-if="SettingApprovalOvertime.overtime_approval_create == 1"
                  >
                    <div class="row-setting">
                      <div class="flex flex-col text-left ml-4">
                        <h5 class="text-setting">
                          Số ngày tối đa có thể làm đơn sau thời điểm làm thêm
                        </h5>
                        <h5 class="sub-setting">
                          VD: Nếu bạn cài đặt số ngày là 2, nhân sự muốn làm
                          thêm từ ngày 04/06/2022 thì nhân sự đó có thể tạo đơn
                          muộn nhất là 06/06/2022
                        </h5>
                      </div>
                      <div>
                        <input
                          type="number"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập số ngày"
                          v-model="
                            SettingApprovalOvertime.overtime_max_time_after
                          "
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row-setting">
                      <div class="flex flex-col text-left ml-4">
                        <h5 class="text-setting">
                          Số ngày tối thiểu có thể làm đơn trước thời điểm làm
                          thêm
                        </h5>
                        <h5 class="sub-setting">
                          VD: Nếu bank cài đặt số ngày là 2, nhân sự muốn làm
                          thêm từ ngày 04/06/2022 thì nhân sự đó phải tạo đơn
                          trước 2 ngày là 02/06/2022
                        </h5>
                      </div>
                      <div>
                        <input
                          type="number"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập số ngày"
                          v-model="
                            SettingApprovalOvertime.overtime_max_time_before
                          "
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row-setting">
                      <div class="flex flex-col text-left ml-4">
                        <h5 class="text-setting">Mô tả khi tạo đơn</h5>
                        <h5 class="sub-setting">
                          Khi bật cài đặt này, nhân sự tạo đơn cài phải nhập nội
                          dung mô tả thì hệ thống mới ghi nhận tạo đơn thành
                          công
                        </h5>
                      </div>
                      <div>
                        <div class="check">
                          <input
                            id="isDescOvertime"
                            type="checkbox"
                            v-model="SettingApprovalOvertime.overtime_note"
                            true-value="1"
                            false-value="0"
                          />
                          <label for="isDescOvertime"></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </the-tab>
        </Transition>
      </div>
      <div>
        <Transition name="slide-fade">
          <the-tab :isSelected="selected === 'Đơn checkin/out'"
            ><div class="p-2">
              <h2 class="text-left uppercase font-semibold p-2">
                đơn check in/out
              </h2>
              <div class="w-full p-2 border rounded-lg">
                <div class="row-setting">
                  <div class="flex flex-col text-left">
                    <h5 class="text-setting">
                      Cho phép nhân viên tạo đơn check in/out
                    </h5>
                    <h5 class="sub-setting">
                      Hãy tắt nó nếu công ty không sử dụng đơn này
                    </h5>
                  </div>
                  <div>
                    <div class="check">
                      <input
                        id="checkInout"
                        type="checkbox"
                        v-model="SettingApprovalInout.inout_approval_create"
                        true-value="1"
                        false-value="0"
                      />
                      <label for="checkInout"></label>
                    </div>
                  </div>
                </div>
                <hr />
                <Transition duration="550" name="nested">
                  <div v-if="SettingApprovalInout.inout_approval_create == 1">
                    <div class="row-setting">
                      <div class="flex flex-col text-left ml-4">
                        <h5 class="text-setting">
                          Số ngày cho phép tạo đơn sau thời điểm quên check
                          in/out
                        </h5>
                        <h5 class="row-setting">
                          VD: Nếu bạn cài đặt số ngày là 2, nhân sự muốn tạo đơn
                          check in/out từ ngày 04/06/2022 thì nhân sự đó có thể
                          tạo đơn muộn nhất là 06/06/2022
                        </h5>
                      </div>
                      <div>
                        <input
                          type="number"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập số ngày"
                          v-model="SettingApprovalInout.inout_max_time_after"
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row-setting">
                      <div class="flex flex-col text-left">
                        <h5 class="text-setting">Mô tả khi tạo đơn</h5>
                        <h5 class="sub-setting">
                          Khi bật cài đặt này, nhân sự tạo đơn cài phải nhập nội
                          dung mô tả thì hệ thống mới ghi nhận tạo đơn thành
                          công
                        </h5>
                      </div>
                      <div>
                        <div class="check">
                          <input
                            id="isDescInout"
                            type="checkbox"
                            v-model="SettingApprovalInout.inout_note"
                            true-value="1"
                            false-value="0"
                          />
                          <label for="isDescInout"></label>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div class="row-setting">
                      <h5 class="text-setting">Lý do check in/out</h5>
                      <div>
                        <span
                          @click="this.$router.push('/approval-setting-inout')"
                          class="cursor-pointer mr-4 text-lg"
                          ><i class="fal fa-external-link"></i
                        ></span>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </the-tab>
        </Transition>
      </div>
      <div>
        <Transition name="slide-fade">
          <the-tab :isSelected="selected === 'Đơn đổi ca'"
            ><div class="p-2">
              <h2 class="text-left uppercase font-semibold p-2">đơn đổi ca</h2>
              <div class="w-full p-2 border rounded-lg">
                <div class="row-setting">
                  <div class="flex flex-col">
                    <h5 class="text-setting">
                      Cho phép nhân viên tạo đơn đổi ca
                    </h5>
                    <h5 class="sub-setting">
                      Hãy tắt nó nếu công ty không sử dụng đơn này
                    </h5>
                  </div>
                  <div>
                    <div class="check">
                      <input
                        id="checkShiftchange"
                        type="checkbox"
                        v-model="
                          SettingApprovalShiftChange.shift_change_approval_create
                        "
                        true-value="1"
                        false-value="0"
                      />
                      <label for="checkShiftchange"></label>
                    </div>
                  </div>
                </div>
                <hr />
                <Transition duration="550" name="nested">
                  <div
                    v-if="
                      SettingApprovalShiftChange.shift_change_approval_create ==
                      1
                    "
                  >
                    <div class="row-setting">
                      <div class="flex flex-col text-left ml-4">
                        <h5 class="text-setting">
                          Số ngày tối đa có thể làm đơn sau thời điểm đổi ca
                        </h5>
                        <h5 class="sub-setting">
                          VD: Nếu bạn cài đặt số ngày là 2, nhân sự muốn tạo đơn
                          đổi ca từ ngày 04/06/2022 thì nhân sự đó có thể tạo
                          đơn muộn nhất là 06/06/2022
                        </h5>
                      </div>
                      <div>
                        <input
                          type="number"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập số ngày"
                          v-model="
                            SettingApprovalShiftChange.shift_change_max_time_after
                          "
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row-setting">
                      <div class="flex flex-col text-left ml-4">
                        <h5 class="text-setting">
                          Số ngày tối thiểu có thể làm đơn trước thời điểm đổi
                          ca
                        </h5>
                        <h5 class="sub-setting">
                          VD: Nếu bank cài đặt số ngày là 2, nhân sự muốn đổi ca
                          từ ngày 04/06/2022 thì nhân sự đó phải tạo đơn trước 2
                          ngày là 02/06/2022
                        </h5>
                      </div>
                      <div>
                        <input
                          type="text"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập số ngày"
                          v-model="
                            SettingApprovalShiftChange.shift_change_max_time_before
                          "
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row-setting">
                      <div class="flex flex-col text-left ml-4">
                        <h5 class="text-setting">Mô tả khi tạo đơn</h5>
                        <h5 class="sub-setting">
                          Khi bật cài đặt này, nhân sự tạo đơn cài phải nhập nội
                          dung mô tả thì hệ thống mới ghi nhận tạo đơn thành
                          công
                        </h5>
                      </div>
                      <div>
                        <div class="check">
                          <input
                            id="isDescShiftchange"
                            type="checkbox"
                            v-model="
                              SettingApprovalShiftChange.shift_change_note
                            "
                            true-value="1"
                            false-value="0"
                          />
                          <label for="isDescShiftchange"></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </the-tab>
        </Transition>
      </div>
      <div>
        <Transition name="slide-fade">
          <the-tab :isSelected="selected === 'Đơn tăng ca'"
            ><div class="p-2">
              <h2 class="text-left uppercase font-semibold p-2">đơn tăng ca</h2>
              <div class="w-full p-2 border rounded-lg">
                <div class="row-setting">
                  <div class="flex flex-col text-left">
                    <h5 class="text-setting">
                      Cho phép nhân viên tạo đơn tăng ca
                    </h5>
                    <h5 class="sub-setting">
                      Hãy tắt nó nếu công ty không sử dụng đơn này
                    </h5>
                  </div>
                  <div>
                    <div class="check">
                      <input
                        id="checkShiftmore"
                        type="checkbox"
                        v-model="
                          SettingApprovalShiftMore.shift_more_approval_create
                        "
                        true-value="1"
                        false-value="0"
                      />
                      <label for="checkShiftmore"></label>
                    </div>
                  </div>
                </div>
                <hr />
                <Transition duration="550" name="nested">
                  <div
                    v-if="
                      SettingApprovalShiftMore.shift_more_approval_create == 1
                    "
                  >
                    <div class="row-setting">
                      <div class="flex flex-col ml-4">
                        <h5 class="text-setting">
                          Số ngày tối đa có thể làm đơn sau thời điểm tăng ca
                        </h5>
                        <h5 class="sub-setting">
                          VD: Nếu bạn cài đặt số ngày là 2, nhân sự muốn tạo đơn
                          tăng ca từ ngày 04/06/2022 thì nhân sự đó có thể tạo
                          đơn muộn nhất là 06/06/2022
                        </h5>
                      </div>
                      <div>
                        <input
                          type="number"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập số ngày"
                          v-model="
                            SettingApprovalShiftMore.shift_more_max_time_after
                          "
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row-setting">
                      <div class="flex flex-col text-left ml-4">
                        <h5 class="text-setting">
                          Số ngày tối thiểu có thể làm đơn trước thời điểm tăng
                          ca
                        </h5>
                        <h5 class="sub-setting">
                          VD: Nếu bank cài đặt số ngày là 2, nhân sự muốn tăng
                          ca từ ngày 04/06/2022 thì nhân sự đó phải tạo đơn
                          trước 2 ngày là 02/06/2022
                        </h5>
                      </div>
                      <div>
                        <input
                          type="number"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập số ngày"
                          v-model="
                            SettingApprovalShiftMore.shift_more_max_time_before
                          "
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row-setting">
                      <div class="flex flex-col text-left ml-4">
                        <h5 class="text-setting">Mô tả khi tạo đơn</h5>
                        <h5 class="sub-setting">
                          Khi bật cài đặt này, nhân sự tạo đơn cài phải nhập nội
                          dung mô tả thì hệ thống mới ghi nhận tạo đơn thành
                          công
                        </h5>
                      </div>
                      <div>
                        <div class="check">
                          <input
                            id="isDescShiftmore"
                            type="checkbox"
                            v-model="SettingApprovalShiftMore.shift_more_note"
                            true-value="1"
                            false-value="0"
                          />
                          <label for="isDescShiftmore"></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </the-tab>
        </Transition>
      </div>
      <div>
        <Transition name="slide-fade">
          <the-tab :isSelected="selected === 'Đơn đăng ký ca'"
            ><div class="p-2">
              <h2 class="text-left uppercase font-semibold p-2">
                đơn đăng ký ca
              </h2>
              <div class="w-full p-2 border rounded-lg">
                <div class="row-setting">
                  <div class="flex flex-col text-left">
                    <h5 class="text-setting">
                      Cho phép nhân viên tạo đơn đăng ký ca
                    </h5>
                    <h5 class="sub-setting">
                      Hãy tắt nó nếu công ty không sử dụng đơn này
                    </h5>
                  </div>
                  <div>
                    <div class="check">
                      <input
                        id="checkShiftregister"
                        type="checkbox"
                        v-model="
                          SettingApprovalShiftRegister.shift_register_approval_create
                        "
                        true-value="1"
                        false-value="0"
                      />
                      <label for="checkShiftregister"></label>
                    </div>
                  </div>
                </div>
                <hr />
                <Transition duration="550" name="nested">
                  <div
                    v-if="
                      SettingApprovalShiftRegister.shift_register_approval_create ==
                      1
                    "
                  >
                    <div class="row-setting">
                      <div class="flex flex-col text-left ml-4">
                        <h5 class="text-setting">
                          Số ngày tối đa có thể làm đơn sau thời điểm đăng ký ca
                        </h5>
                        <h5 class="sub-setting">
                          VD: Nếu bạn cài đặt số ngày là 2, nhân sự muốn tạo đơn
                          đăng ký ca từ ngày 04/06/2022 thì nhân sự đó có thể
                          tạo đơn muộn nhất là 06/06/2022
                        </h5>
                      </div>
                      <div>
                        <input
                          type="number"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập số ngày"
                          v-model="
                            SettingApprovalShiftRegister.shift_register_max_time_after
                          "
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row-setting">
                      <div class="flex flex-col text-left ml-4">
                        <h5 class="text-setting">
                          Số ngày tối thiểu có thể làm đơn trước thời điểm đăng
                          ký ca
                        </h5>
                        <h5 class="sub-setting">
                          VD: Nếu bank cài đặt số ngày là 2, nhân sự muốn đăng
                          ký ca từ ngày 04/06/2022 thì nhân sự đó phải tạo đơn
                          trước 2 ngày là 02/06/2022
                        </h5>
                      </div>
                      <div>
                        <input
                          type="number"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập số ngày"
                          v-model="
                            SettingApprovalShiftRegister.shift_register_max_time_before
                          "
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row-setting">
                      <div class="flex flex-col text-left ml-4">
                        <h5 class="text-setting">Mô tả khi tạo đơn</h5>
                        <h5 class="sub-setting">
                          Khi bật cài đặt này, nhân sự tạo đơn cài phải nhập nội
                          dung mô tả thì hệ thống mới ghi nhận tạo đơn thành
                          công
                        </h5>
                      </div>
                      <div>
                        <div class="check">
                          <input
                            id="isDescShiftregister"
                            type="checkbox"
                            v-model="
                              SettingApprovalShiftRegister.shift_register_note
                            "
                            true-value="1"
                            false-value="0"
                          />
                          <label for="isDescShiftregister"></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </the-tab>
        </Transition>
      </div>
      <div>
        <Transition name="slide-fade">
          <the-tab :isSelected="selected === 'Đơn công tác'"
            ><div class="p-2">
              <h2 class="text-left uppercase font-semibold p-2">
                đơn công tác
              </h2>
              <div class="w-full p-2 border rounded-lg">
                <div class="row-setting">
                  <div class="flex flex-col text-left">
                    <h5 class="text-setting">
                      Cho phép nhân viên tạo đơn công tác
                    </h5>
                    <h5 class="sub-setting">
                      Hãy tắt nó nếu công ty không sử dụng đơn này
                    </h5>
                  </div>
                  <div>
                    <div class="check">
                      <input
                        id="checkMission"
                        type="checkbox"
                        v-model="
                          SettingApprovalMission.private_mission_approval_create
                        "
                        true-value="1"
                        false-value="0"
                      />
                      <label for="checkMission"></label>
                    </div>
                  </div>
                </div>
                <hr />
                <Transition duration="550" name="nested">
                  <div
                    v-if="
                      SettingApprovalMission.private_mission_approval_create ==
                      1
                    "
                  >
                    <div class="row-setting">
                      <div class="flex flex-col text-left ml-4">
                        <h5 class="text-setting">
                          Số ngày tối đa có thể làm đơn sau thời điểm công tác
                        </h5>
                        <h5 class="sub-setting">
                          VD: Nếu bạn cài đặt số ngày là 2, nhân sự muốn tạo đơn
                          công tác từ ngày 04/06/2022 thì nhân sự đó có thể tạo
                          đơn muộn nhất là 06/06/2022
                        </h5>
                      </div>
                      <div>
                        <input
                          type="number"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập số ngày"
                          v-model="
                            SettingApprovalMission.mission_max_time_after
                          "
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row-setting">
                      <div class="flex flex-col text-left ml-4">
                        <h5 class="text-setting">
                          Số ngày tối thiểu có thể làm đơn trước thời điểm công
                          tác
                        </h5>
                        <h5 class="sub-setting">
                          VD: Nếu bank cài đặt số ngày là 2, nhân sự muốn công
                          tác từ ngày 04/06/2022 thì nhân sự đó phải tạo đơn
                          trước 2 ngày là 02/06/2022
                        </h5>
                      </div>
                      <div>
                        <input
                          type="text"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập số ngày"
                          v-model="
                            SettingApprovalMission.mission_max_time_before
                          "
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row-setting">
                      <div class="flex flex-col text-left ml-4">
                        <h5 class="text-setting">Mô tả khi tạo đơn</h5>
                        <h5 class="sub-setting">
                          Khi bật cài đặt này, nhân sự tạo đơn cài phải nhập nội
                          dung mô tả thì hệ thống mới ghi nhận tạo đơn thành
                          công
                        </h5>
                      </div>
                      <div>
                        <div class="check">
                          <input
                            id="isDescMission"
                            type="checkbox"
                            v-model="SettingApprovalMission.mission_note"
                            true-value="1"
                            false-value="0"
                          />
                          <label for="isDescMission"></label>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div class="row-setting">
                      <h5 class="text-setting">Lý do công tác</h5>
                      <div>
                        <span
                          @click="
                            this.$router.push('/approval-setting-mission')
                          "
                          class="cursor-pointer mr-4 text-lg"
                          ><i class="fal fa-external-link"></i
                        ></span>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </the-tab>
        </Transition>
      </div>
      <div>
        <Transition name="slide-fade">
          <the-tab :isSelected="selected === 'Đơn theo chế độ'"
            ><div class="p-2">
              <h2 class="text-left uppercase font-semibold p-2">
                đơn theo chế độ
              </h2>
              <div class="w-full p-2 border rounded-lg">
                <div class="row-setting">
                  <div class="flex flex-col text-left">
                    <h5 class="text-setting">
                      Cho phép nhân viên tạo đơn theo chế độ
                    </h5>
                    <h5 class="sub-setting">
                      Hãy tắt nó nếu công ty không sử dụng đơn này
                    </h5>
                  </div>
                  <div>
                    <div class="check">
                      <input
                        id="checkWorktime"
                        type="checkbox"
                        v-model="
                          SettingApprovalWorktime.privilege_application_approval_create
                        "
                        true-value="1"
                        false-value="0"
                      />
                      <label for="checkWorktime"></label>
                    </div>
                  </div>
                </div>
                <hr />
                <Transition duration="550" name="nested">
                  <div
                    v-if="
                      SettingApprovalWorktime.privilege_application_approval_create ==
                      1
                    "
                  >
                    <div class="row-setting">
                      <div class="flex flex-col ml-4">
                        <h5 class="text-setting">
                          Số ngày tối đa có thể làm đơn sau thời điểm nghỉ chế
                          độ
                        </h5>
                        <h5 class="sub-setting">
                          VD: Nếu bạn cài đặt số ngày là 2, nhân sự muốn nghỉ
                          theo chế độ từ ngày 04/06/2022 thì nhân sự đó có thể
                          tạo đơn muộn nhất là 06/06/2022
                        </h5>
                      </div>
                      <div>
                        <input
                          type="number"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập số ngày"
                          v-model="
                            SettingApprovalWorktime.privilege_max_time_after
                          "
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row-setting">
                      <div class="flex flex-col text-left ml-4">
                        <h5 class="text-setting">
                          Số ngày tối thiểu có thể làm đơn trước thời điểm nghỉ
                          theo chế độ
                        </h5>
                        <h5 class="sub-setting">
                          VD: Nếu bank cài đặt số ngày là 2, nhân sự muốn nghỉ
                          theo chế độ từ ngày 04/06/2022 thì nhân sự đó phải tạo
                          đơn trước 2 ngày là 02/06/2022
                        </h5>
                      </div>
                      <div>
                        <input
                          type="number"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Nhập số ngày"
                          v-model="
                            SettingApprovalWorktime.privilege_max_time_before
                          "
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row-setting">
                      <div class="flex flex-col text-left ml-4">
                        <h5 class="text-setting">Mô tả khi tạo đơn</h5>
                        <h5 class="sub-setting">
                          Khi bật cài đặt này, nhân sự tạo đơn cài phải nhập nội
                          dung mô tả thì hệ thống mới ghi nhận tạo đơn thành
                          công
                        </h5>
                      </div>
                      <div>
                        <div class="check">
                          <input
                            id="isDescWorktime"
                            type="checkbox"
                            v-model="SettingApprovalWorktime.privilege_note"
                            true-value="1"
                            false-value="0"
                          />
                          <label for="isDescWorktime"></label>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div class="row-setting">
                      <h5 class="text-setting">Lý do đơn theo chế độ</h5>
                      <div>
                        <span
                          @click="
                            this.$router.push('/approval-setting-worktime')
                          "
                          class="cursor-pointer mr-4 text-lg"
                          ><i class="fal fa-external-link"></i
                        ></span>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </the-tab>
        </Transition>
      </div>
      <div>
        <Transition name="slide-fade">
          <the-tab :isSelected="selected === 'Đơn thôi việc'"
            ><div class="p-2">
              <h2 class="text-left uppercase font-semibold p-2">
                đơn thôi việc
              </h2>
              <div class="w-full p-2 border rounded-lg">
                <div class="row-setting">
                  <div class="flex flex-col text-left">
                    <h5 class="text-setting">
                      Cho phép nhân viên tạo đơn thôi việc
                    </h5>
                    <h5 class="sub-setting">
                      Hãy tắt nó nếu công ty không sử dụng đơn này
                    </h5>
                  </div>
                  <div>
                    <div class="check">
                      <input
                        id="checkResign"
                        type="checkbox"
                        v-model="
                          SettingApprovalResign.leave_application_approval_create
                        "
                        true-value="1"
                        false-value="0"
                      />
                      <label for="checkResign"></label>
                    </div>
                  </div>
                </div>
                <hr />
                <Transition duration="550" name="nested">
                  <div
                    v-if="
                      SettingApprovalResign.leave_application_approval_create ==
                      1
                    "
                  >
                    <div class="row-setting">
                      <div class="flex flex-col ml-4 text-left">
                        <h5 class="text-setting">Mô tả khi tạo đơn</h5>
                        <h5 class="sub-setting">
                          Khi bật cài đặt này, nhân sự tạo đơn cài phải nhập nội
                          dung mô tả thì hệ thống mới ghi nhận tạo đơn thành
                          công
                        </h5>
                      </div>
                      <div>
                        <div class="check">
                          <input
                            id="isDescResign"
                            type="checkbox"
                            v-model="
                              SettingApprovalResign.leave_application_note
                            "
                            true-value="1"
                            false-value="0"
                          />
                          <label for="isDescResign"></label>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div class="row-setting">
                      <h5 class="text-setting ml-4">Lý do đơn thôi việc</h5>
                      <div>
                        <span class="cursor-pointer mr-4 text-lg"
                          ><i class="fal fa-external-link"></i
                        ></span>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </the-tab>
        </Transition>
      </div>
      <div>
        <Transition name="slide-fade">
          <the-tab :isSelected="selected === 'Cài đặt khác'"
            ><div class="p-2">
              <h2 class="text-left uppercase font-semibold p-2">
                cài đặt khác
              </h2>
              <div class="w-full p-2 border rounded-lg">
                <div class="row-setting">
                  <div class="flex flex-col text-left">
                    <h5 class="text-setting">
                      Không cho phép người dùng tạo đơn khi quá thời gian tạo
                      đơn
                    </h5>
                    <h5 class="sub-setting">
                      Khi bật cài đặt này, nhân sự không thể sửa lại đơn mà đã
                      tạo nếu thời gian ngoài thời gian được phép tạo đơn
                    </h5>
                  </div>
                  <div>
                    <div class="check">
                      <input id="checkLeave" type="checkbox" />
                      <label for="checkLeave"></label>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row-setting">
                  <div class="flex flex-col text-left">
                    <h5 class="text-setting">
                      Thời gian để hệ thống sẽ tự động chuyển các đơn từ trạng
                      thái chờ duyệt sang không duyệt sau khi chốt đơn từ
                    </h5>
                    <h5 class="sub-setting">
                      Sau khi chốt đơn từ bên bảng chấm công
                    </h5>
                  </div>
                  <div>
                    <div class="check">
                      <input id="checkLeave" type="checkbox" />
                      <label for="checkLeave"></label>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row-setting">
                  <h5 class="text-setting">Người được phép tạo đơn hộ</h5>
                  <div>
                    <v-select></v-select>
                  </div>
                </div>
              </div>
            </div>
          </the-tab>
        </Transition>
      </div>
    </div>
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button
            v-if="selected == 'Đơn xin nghỉ'"
            class="button-modal"
            @click="UpdateSettingApprovalLeave()"
          >
            Cập nhật
          </button>
          <button
            v-if="selected == 'Đơn vắng mặt'"
            class="button-modal"
            @click="UpdateSettingApprovalAbsence()"
          >
            Cập nhật
          </button>
          <button
            v-if="selected == 'Đơn làm thêm'"
            class="button-modal"
            @click="UpdateSettingApprovalOvertime()"
          >
            Cập nhật
          </button>
          <button
            v-if="selected == 'Đơn checkin/out'"
            class="button-modal"
            @click="UpdateSettingApprovalInout()"
          >
            Cập nhật
          </button>
          <button
            v-if="selected == 'Đơn đổi ca'"
            class="button-modal"
            @click="UpdateSettingApprovalShiftChange()"
          >
            Cập nhật
          </button>
          <button
            v-if="selected == 'Đơn tăng ca'"
            class="button-modal"
            @click="UpdateSettingApprovalShiftMore()"
          >
            Cập nhật
          </button>
          <button
            v-if="selected == 'Đơn đăng ký ca'"
            class="button-modal"
            @click="UpdateSettingApprovalShiftRegister()"
          >
            Cập nhật
          </button>
          <button
            v-if="selected == 'Đơn công tác'"
            class="button-modal"
            @click="UpdateSettingApprovalMission()"
          >
            Cập nhật
          </button>
          <button
            v-if="selected == 'Đơn theo chế độ'"
            class="button-modal"
            @click="UpdateSettingApprovalWorktime()"
          >
            Cập nhật
          </button>
          <button
            v-if="selected == 'Đơn thôi việc'"
            class="button-modal"
            @click="UpdateSettingApprovalResign()"
          >
            Cập nhật
          </button>
          <button v-if="selected == 'Cài đặt khác'" class="button-modal">
            Cập nhật
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
import "@/assets/checkBox.css";
import NavFeature from "@/components/navbar/NavFeature.vue";
import TheTab from "@/components/tab/TheTab.vue";
import TabNav from "@/components/tab/TabNav.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarSettingApproval from "@/components/sidebar/SidebarSettingApproval.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { ref } from "@vue/reactivity";
import { useToast } from "vue-toastification";
import { useSettingApproval } from "@/store/modules/settingApproval/allApproval";
import { storeToRefs } from "pinia";
export default {
  components: {
    TheTab,
    TabNav,
    PersonLayout,
    SidebarSettingApproval,
    NavbarSocial,
    NavFeature,
  },
  setup() {
    const toast = useToast();
    const isLoading = ref(true);
    const setting = useSettingApproval();
    const {
      SettingApprovalLeave,
      SettingApprovalOvertime,
      SettingApprovalInout,
      SettingApprovalShiftChange,
      SettingApprovalShiftMore,
      SettingApprovalShiftRegister,
      SettingApprovalMission,
      SettingApprovalWorktime,
      SettingApprovalResign,
      SettingApprovalAbsence,
    } = storeToRefs(setting);
    setTimeout(() => {
      isLoading.value = false;
    }, 800);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const selected = ref("Đơn xin nghỉ");
    const setSelected = (tab) => {
      selected.value = tab;
      if (tab == "Đơn làm thêm") {
        if (Object.entries(SettingApprovalOvertime.value)?.length == 0) {
          setting.SettingApprovalOvertimeAction();
        }
      } else if (tab == "Đơn checkin/out") {
        if (Object.entries(SettingApprovalInout.value)?.length == 0) {
          setting.SettingApprovalInoutAction();
        }
      } else if (tab == "Đơn đổi ca") {
        if (Object.entries(SettingApprovalShiftChange.value)?.length == 0) {
          setting.SettingApprovalShiftChangeAction();
        }
      } else if (tab == "Đơn tăng ca") {
        if (Object.entries(SettingApprovalShiftMore.value)?.length == 0) {
          setting.SettingApprovalShiftMoreAction();
        }
      } else if (tab == "Đơn đăng ký ca") {
        if (Object.entries(SettingApprovalShiftRegister.value)?.length == 0) {
          setting.SettingApprovalShiftRegisterAction();
        }
      } else if (tab == "Đơn công tác") {
        if (Object.entries(SettingApprovalMission.value)?.length == 0) {
          setting.SettingApprovalMissionAction();
        }
      } else if (tab == "Đơn theo chế độ") {
        if (Object.entries(SettingApprovalWorktime.value)?.length == 0) {
          setting.SettingApprovalWorktimeAction();
        }
      } else if (tab == "Đơn thôi việc") {
        if (Object.entries(SettingApprovalResign.value)?.length == 0) {
          setting.SettingApprovalResignAction();
        }
      } else if (tab == "Đơn vắng mặt") {
        if (Object.entries(SettingApprovalAbsence.value)?.length == 0) {
          setting.SettingApprovalAbsenceAction();
        }
      }
    };
    if (Object.entries(SettingApprovalLeave.value)?.length == 0) {
      setting.SettingApprovalLeaveAction();
    }
    // Cập nhật đơn xin nghỉ
    const UpdateSettingApprovalLeave = () => {
      const data = {
        leave_approval_create: SettingApprovalLeave.value.leave_approval_create,
        leave_max_time_after: SettingApprovalLeave.value.leave_max_time_after,
        leave_max_time_before: SettingApprovalLeave.value.leave_max_time_before,
        leave_note: SettingApprovalLeave.value.leave_note,
      };
      setting.UpdateApprovalLeaveAction({
        data,
        toast,
        EndTimeLoading: EndTimeLoading,
      });
    };
    // Cập nhật đơn xin làm thêm
    const UpdateSettingApprovalOvertime = () => {
      const data = {
        overtime_approval_create:
          SettingApprovalOvertime.value.overtime_approval_create,
        overtime_max_time_after:
          SettingApprovalOvertime.value.overtime_max_time_after,
        overtime_max_time_before:
          SettingApprovalOvertime.value.overtime_max_time_before,
        overtime_note: SettingApprovalOvertime.value.overtime_note,
      };
      setting.UpdateSettingApprovalOvertimeAction({
        data,
        toast,
        EndTimeLoading: EndTimeLoading,
      });
    };
    // Cập nhật đơn check in/out
    const UpdateSettingApprovalInout = () => {
      const data = {
        inout_approval_create: SettingApprovalInout.value.inout_approval_create,
        inout_max_time_after: SettingApprovalInout.value.inout_max_time_after,
        inout_note: SettingApprovalInout.value.inout_note,
      };
      setting.UpdateSettingApprovalInoutAction({
        data,
        toast,
        EndTimeLoading: EndTimeLoading,
      });
    };
    // Cập nhật đơn đổi ca
    const UpdateSettingApprovalShiftChange = () => {
      const data = {
        shift_change_approval_create:
          SettingApprovalShiftChange.value.shift_change_approval_create,
        shift_change_max_time_after:
          SettingApprovalShiftChange.value.shift_change_max_time_after,
        shift_change_max_time_before:
          SettingApprovalShiftChange.value.shift_change_max_time_before,
        shift_change_note: SettingApprovalShiftChange.value.shift_change_note,
      };
      setting.UpdateSettingApprovalShiftChangeAction({
        data,
        toast,
        EndTimeLoading: EndTimeLoading,
      });
    };
    // Cập nhật đơn tăng ca
    const UpdateSettingApprovalShiftMore = () => {
      const data = {
        shift_more_approval_create:
          SettingApprovalShiftMore.value.shift_more_approval_create,
        shift_more_max_time_after:
          SettingApprovalShiftMore.value.shift_more_max_time_after,
        shift_more_max_time_before:
          SettingApprovalShiftMore.value.shift_more_max_time_before,
        shift_more_note: SettingApprovalShiftMore.value.shift_more_note,
      };
      setting.UpdateSettingApprovalShiftMoreAction({
        data,
        toast,
        EndTimeLoading: EndTimeLoading,
      });
    };
    // Cập nhật đơn đăng kí ca
    const UpdateSettingApprovalShiftRegister = () => {
      const data = {
        shift_register_approval_create:
          SettingApprovalShiftRegister.value.shift_register_approval_create,
        shift_register_max_time_after:
          SettingApprovalShiftRegister.value.shift_register_max_time_after,
        shift_register_max_time_before:
          SettingApprovalShiftRegister.value.shift_register_max_time_before,
        shift_register_note:
          SettingApprovalShiftRegister.value.shift_register_note,
      };
      setting.UpdateSettingApprovalShiftRegisterAction({
        data,
        toast,
        EndTimeLoading: EndTimeLoading,
      });
    };
    // Cập nhật đơn công tác
    const UpdateSettingApprovalMission = () => {
      const data = {
        private_mission_approval_create:
          SettingApprovalMission.value.private_mission_approval_create,
        mission_max_time_after:
          SettingApprovalMission.value.mission_max_time_after,
        mission_max_time_before:
          SettingApprovalMission.value.mission_max_time_before,
        mission_note: SettingApprovalMission.value.mission_note,
      };
      setting.UpdateSettingApprovalMissionAction({
        data,
        toast,
        EndTimeLoading: EndTimeLoading,
      });
    };
    // Cập nhật đơn làm thêm theo chế độ
    const UpdateSettingApprovalWorktime = () => {
      const data = {
        privilege_application_approval_create:
          SettingApprovalWorktime.value.privilege_application_approval_create,
        privilege_max_time_after:
          SettingApprovalWorktime.value.privilege_max_time_after,
        privilege_max_time_before:
          SettingApprovalWorktime.value.privilege_max_time_before,
        privilege_note: SettingApprovalWorktime.value.privilege_note,
      };
      setting.UpdateSettingApprovalWorktimeAction({
        data,
        toast,
        EndTimeLoading: EndTimeLoading,
      });
    };
    // Cập nhật đơn thôi việc
    const UpdateSettingApprovalResign = () => {
      const data = {
        leave_application_approval_create:
          SettingApprovalResign.value.leave_application_approval_create,
        leave_application_note:
          SettingApprovalResign.value.leave_application_note,
      };
      setting.UpdateSettingApprovalResignAction({
        data,
        toast,
        EndTimeLoading: EndTimeLoading,
      });
    };
    // Cập nhật đơn vắng mặt
    const UpdateSettingApprovalAbsence = () => {
      const data = {
        meeting_approval_create:
          SettingApprovalAbsence.value.meeting_approval_create,
        meeting_max_time_after:
          SettingApprovalAbsence.value.meeting_max_time_after,
        meeting_max_time_before:
          SettingApprovalAbsence.value.meeting_max_time_before,
        meeting_note: SettingApprovalAbsence.value.meeting_note,
      };
      setting.UpdateSettingApprovalAbsenceAction({
        data,
        toast,
        EndTimeLoading: EndTimeLoading,
      });
    };
    return {
      setSelected,
      isLoading,
      selected,
      SettingApprovalLeave,
      SettingApprovalOvertime,
      SettingApprovalInout,
      SettingApprovalShiftChange,
      SettingApprovalShiftMore,
      SettingApprovalShiftRegister,
      SettingApprovalMission,
      SettingApprovalWorktime,
      SettingApprovalResign,
      SettingApprovalAbsence,
      UpdateSettingApprovalLeave,
      UpdateSettingApprovalOvertime,
      UpdateSettingApprovalInout,
      UpdateSettingApprovalShiftChange,
      UpdateSettingApprovalShiftMore,
      UpdateSettingApprovalShiftRegister,
      UpdateSettingApprovalMission,
      UpdateSettingApprovalWorktime,
      UpdateSettingApprovalResign,
      UpdateSettingApprovalAbsence,
      EndTimeLoading,
    };
  },
};
</script>
