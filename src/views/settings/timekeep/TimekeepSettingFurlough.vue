<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-setting-timekeep></sidebar-setting-timekeep>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <create-person>
            <p class="ml-2 text-base uppercase">Cài đặt nghỉ phép</p>
          </create-person>
        </div></navbar-social
      >
    </template>
    <Transition duration="550" name="nested">
      <div v-if="isLoading == false">
        <nav-feature>
          <div class="flex items-center">
            <tab-nav
              :tabs="TabSetting"
              :selected="selected"
              @selected="setSelected"
            >
            </tab-nav>
            <div>
              <span @click="addTabSetting()"
                ><i class="fal fa-plus-circle icon-plus mt-[10px] ml-2"></i
              ></span>
            </div>
          </div>
        </nav-feature>
        <div
          v-for="(item, index) in OldSettingFurlough"
          :key="index"
          class="home w-full h-full"
        >
          <the-tab
            :isSelected="selected === `Cài đặt ${index + 1}`"
            class="h-full"
          >
            <div class="p-2 text-left outer">
              <div class="flex justify-between items-center">
                <h2
                  class="text-left uppercase font-semibold p-2"
                  style="color: var(--color-primary)"
                >
                  Cài đặt nghỉ phép
                </h2>
                <button class="button-modal" @click="DeleteTabSetting(index)">
                  Xóa cài đặt
                </button>
              </div>
              <div class="w-full p-2 border rounded-lg inner">
                <div class="p-2">
                  <div>
                    <h4
                      class="form-section-title form-small cursor-pointer"
                      @click="isTime = !isTime"
                    >
                      <span v-show="isTime == true"
                        ><i class="fas fa-chevron-down cursor-pointer"></i
                      ></span>
                      <span v-show="isTime == false"
                        ><i class="fas fa-chevron-right cursor-pointer"></i
                      ></span>
                      Thông tin chung
                    </h4>
                    <Transition name="slide-fade">
                      <div v-show="isTime == true" class="mt-2">
                        <div
                          class="w-full grid grid-cols-12 gap-20 row-setting"
                        >
                          <div class="col-span-6">
                            <div class="flex flex-col text-left">
                              <h5 class="text-setting">Thời gian áp dụng</h5>
                              <p class="sub-setting">
                                Các cài đặt bên dưới sẽ chỉ được áp dụng trong
                                thời gian này. Khi có sự thay đổi quy định hưởng
                                phép, bạn thêm mới cài đặt khác và chọn lại thời
                                gian áp dụng. Nếu tháng kết thúc để trống, phép
                                của tháng hiện tại sẽ tính toán theo cài đặt
                                này.
                              </p>
                            </div>
                          </div>
                          <div class="col-span-6">
                            <div class="grid grid-cols-2 gap-2">
                              <div>
                                <label for="" class="form-group-label"
                                  >Từ tháng</label
                                >
                                <div>
                                  <date-picker
                                    v-model="
                                      OldSettingFurlough[index].month_from
                                    "
                                  ></date-picker>
                                </div>
                              </div>
                              <div>
                                <label for="" class="form-group-label"
                                  >Đến tháng</label
                                >
                                <div>
                                  <date-picker
                                    v-model="OldSettingFurlough[index].month_to"
                                  ></date-picker>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Transition>
                    <div v-show="isTime == false">
                      <h2
                        @click="isTime = !isTime"
                        class="cursor-pointer sub-setting"
                      >
                        Từ tháng, đến tháng
                      </h2>
                    </div>
                  </div>
                  <div>
                    <h4
                      class="form-section-title form-small cursor-pointer"
                      @click="isPerson = !isPerson"
                    >
                      <span v-show="isPerson == true"
                        ><i class="fas fa-chevron-down cursor-pointer"></i
                      ></span>
                      <span v-show="isPerson == false"
                        ><i class="fas fa-chevron-right cursor-pointer"></i
                      ></span>
                      Đối tượng áp dụng
                    </h4>
                    <Transition name="slide-fade">
                      <div v-show="isPerson == true" class="mt-2">
                        <div
                          class="w-full grid grid-cols-12 gap-20 row-setting"
                        >
                          <div class="col-span-6">
                            <div class="flex flex-col text-left">
                              <h5 class="text-setting">Phòng ban áp dụng</h5>
                              <h5 class="sub-setting">
                                Thường quy định phép sẽ đúng với toàn bộ phòng
                                ban (trong trường hợp này thì bỏ trống). Tuy
                                nhiên có doanh nghiệp sẽ có quy định khác nhau:
                                (Tách phòng ban thành một cái riêng)
                              </h5>
                            </div>
                          </div>
                          <div class="col-span-6 mt-2">
                            <input-department
                              v-model="OldSettingFurlough[index].department_ids"
                              :isMultiple="true"
                            ></input-department>
                          </div>
                        </div>
                        <div
                          class="w-full grid grid-cols-12 gap-20 mt-2 row-setting"
                        >
                          <div class="col-span-6">
                            <div class="flex flex-col text-left">
                              <h5 class="text-setting">Vị trí áp dụng</h5>
                              <h5 class="sub-setting">
                                Thường quy định phép sẽ đúng với toàn bộ phòng
                                ban (trong trường hợp này thì bỏ trống). Tuy
                                nhiên có doanh nghiệp sẽ có quy định khác nhau:
                                (Tách phòng ban thành một cái riêng)
                              </h5>
                            </div>
                          </div>
                          <div class="col-span-6 mt-2">
                            <input-position
                              v-model="OldSettingFurlough[index].postion_ids"
                              :isMultiple="true"
                            ></input-position>
                          </div>
                        </div>
                      </div>
                    </Transition>
                    <div v-show="isPerson == false">
                      <h2
                        @click="isPerson = !isPerson"
                        class="cursor-pointer mt-2 text-sm"
                      >
                        Phòng ban áp dụng Thường quy định phép sẽ đúng với toàn
                        bộ phòng ban (trong trường hợp này thì bỏ trống). Tuy
                        nhiên có doanh nghiệp sẽ có quy định khác.
                      </h2>
                    </div>
                  </div>
                  <div>
                    <h4
                      class="form-section-title form-small cursor-pointer"
                      @click="isCondition = !isCondition"
                    >
                      <span v-show="isCondition == true"
                        ><i class="fas fa-chevron-down cursor-pointer"></i
                      ></span>
                      <span v-show="isCondition == false"
                        ><i class="fas fa-chevron-right cursor-pointer"></i
                      ></span>
                      Điều kiện áp dụng
                    </h4>
                    <Transition name="slide-fade">
                      <div v-show="isCondition == true" class="mt-2">
                        <div
                          class="w-full grid grid-cols-12 gap-20 row-setting"
                        >
                          <div class="col-span-6">
                            <div class="flex flex-col text-left">
                              <h5 class="text-setting">
                                Loại hợp đồng được tính phép
                              </h5>
                              <h5 class="sub-setting">
                                Theo quy định, tất cả hợp đồng lao động đều được
                                tính phép. Tuy nhiên bạn hoàn toàn có thể thay
                                đổi theo nhu cầu thực tế của công ty.
                              </h5>
                            </div>
                          </div>
                          <div class="col-span-6 mt-2">
                            <input-contract-type
                              v-model="OldSettingFurlough[index].contract_types"
                              :isMultiple="true"
                            ></input-contract-type>
                          </div>
                        </div>
                        <div
                          class="w-full grid grid-cols-12 gap-20 mt-2 row-setting"
                        >
                          <div class="col-span-6">
                            <div class="flex flex-col text-left">
                              <h5 class="text-setting">
                                Số tháng thực hiện hợp đồng để được tính phép
                              </h5>
                              <h5 class="sub-setting">
                                Ví dụ: 1 nhân sự ký hợp đồng lao động 1 năm,
                                nhưng phải làm 3 tháng trở lên mới được tính
                                phép. Lựa chọn này giúp bạn thực hiện điều đó.
                              </h5>
                            </div>
                          </div>
                          <div class="col-span-6 mt-2">
                            <input
                              type="number"
                              name=""
                              id=""
                              class="form-control-input"
                              v-model="
                                OldSettingFurlough[index].contract_excute_month
                              "
                            />
                          </div>
                        </div>
                        <div
                          class="w-full grid grid-cols-12 gap-20 mt-2 row-setting"
                        >
                          <div class="col-span-6">
                            <div class="flex flex-col text-left">
                              <h5 class="text-setting">
                                Ngày được bắt đầu tính phép
                              </h5>
                              <h5 class="sub-setting">
                                Nhiều công ty sẽ tính phép cho nhân sự cả hợp
                                đồng thử việc với điều kiện nhân sự đó được ký
                                hợp đồng chính thức. Đây là công đoạn để giải
                                quyết bài toán này.
                              </h5>
                            </div>
                          </div>
                          <div class="col-span-6 mt-2">
                            <v-select
                              label="title"
                              :options="ContractTypeStart"
                              :reduce="(leave) => leave.value"
                              placeholder="Chọn loại hợp đồng"
                              v-model="
                                OldSettingFurlough[index].contract_type_start
                              "
                              :searchable="false"
                            ></v-select>
                          </div>
                        </div>
                      </div>
                    </Transition>
                    <div v-show="isCondition == false">
                      <h2
                        @click="isCondition = !isCondition"
                        class="cursor-pointer mt-2 text-sm"
                      >
                        Loại hợp đồng được tính phép Theo quy định, tất cả hợp
                        đồng lao động đều được tính phép. Tuy nhiên bạn hoàn
                        toàn có thể thay đổi theo nhu cầu thực tế
                      </h2>
                    </div>
                  </div>
                  <div>
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
                    <Transition name="slide-fade">
                      <div v-show="isInfor == true" class="mt-2">
                        <div
                          class="w-full grid grid-cols-12 gap-20 row-setting"
                        >
                          <div class="col-span-6">
                            <div class="flex flex-col text-left">
                              <h5 class="text-setting">
                                Số ngày phép tối đa trong 1 năm
                              </h5>
                              <h5 class="sub-setting">
                                Theo luật những công việc hành chính là 12
                                ngày/năm. Tuy nhiên đối với những công việc nặng
                                nhọc có thể lên tới 14, 15 ngày.
                              </h5>
                            </div>
                          </div>
                          <div class="col-span-6 mt-2">
                            <input
                              type="number"
                              name=""
                              id=""
                              class="form-control-input"
                              v-model="OldSettingFurlough[index].max_year"
                            />
                          </div>
                        </div>
                        <div
                          class="w-full grid grid-cols-12 gap-20 mt-2 row-setting"
                        >
                          <div class="col-span-6">
                            <div class="flex flex-col text-left ml-4">
                              <h5 class="text-setting">
                                Cài đặt số phép được hưởng hàng tháng
                              </h5>
                              <h5 class="sub-setting">
                                Ví dụ: Số phép trong 1 năm của nhân sự là 15
                                ngày, khi cài đặt lấy số phép tối đa chia đều
                                cho 12 thì mỗi tháng nhân sự được nghỉ 1.25 ngày
                                phép. Nếu chọn mỗi tháng 1 phép, còn lại thì
                                cộng vào tháng đầu thì tháng đầu nhân sự sẽ được
                                hưởng 4 phép, mỗi tháng sau được hưởng 1 phép.
                              </h5>
                            </div>
                          </div>
                          <div class="col-span-6 mt-2">
                            <div class="">
                              <div class="flex items-center">
                                <input
                                  class="cursor-pointer"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio1"
                                  value="AVG"
                                  v-model="
                                    OldSettingFurlough[index]
                                      .number_in_month_type
                                  "
                                />
                                <label
                                  class="sub-setting ml-2 mt-0 cursor-pointer"
                                  for="inlineRadio1"
                                  >Mỗi tháng 1 phép, còn lại thì cộng vào tháng
                                  đầu</label
                                >
                              </div>
                              <div class="flex items-center">
                                <input
                                  class="cursor-pointer"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio2"
                                  value="SEQ"
                                  v-model="
                                    OldSettingFurlough[index]
                                      .number_in_month_type
                                  "
                                />
                                <label
                                  class="sub-setting ml-2 mt-0 cursor-pointer"
                                  for="inlineRadio2"
                                  >Lấy tổng số phép tối đa 1 năm chia điều cho
                                  12 tháng</label
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="w-full grid grid-cols-12 gap-20 mt-2 row-setting"
                        >
                          <div class="col-span-6">
                            <div class="flex flex-col text-left ml-4">
                              <h5 class="text-setting">Chu kỳ tính phép</h5>
                              <h5 class="sub-setting">
                                Thường các doanh nghiệp có chu kỳ tính phép theo
                                năm dương lịch. Tuy nhiên có 1 số trường hợp như
                                khối trường học, sản xuất có chu kỳ tính phép
                                không theo năm dương lịch.
                              </h5>
                            </div>
                          </div>
                          <div class="col-span-6 mt-2 w-full">
                            <div class="flex items-center w-full">
                              <div class="w-[100px]">
                                <input
                                  type="number"
                                  name=""
                                  id=""
                                  class="form-control-input"
                                  v-model="
                                    OldSettingFurlough[index].month_start
                                  "
                                />
                              </div>
                              <div class="px-2 whitespace-nowrap">
                                đến hết tháng
                              </div>
                              <div class="w-[100px]">
                                <input
                                  type="number"
                                  name=""
                                  id=""
                                  class="form-control-input"
                                  v-model="OldSettingFurlough[index].month_end"
                                />
                              </div>
                              <div class="w-[100px] ml-2 grow">
                                <v-select
                                  label="title"
                                  :options="StartAddFurlough"
                                  :reduce="(type) => type.value"
                                  placeholder="Chọn thời gian"
                                  :searchable="false"
                                  v-model="OldSettingFurlough[index].year"
                                ></v-select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="w-full grid grid-cols-12 gap-20 mt-2 row-setting"
                        >
                          <div class="col-span-6">
                            <div class="flex flex-col text-left">
                              <h5 class="text-setting">
                                Ngày được thêm phép mới của tháng
                              </h5>
                              <h5 class="sub-setting">
                                Có những doanh nghiệp đầu tháng đã tính phép cho
                                nhân viên, có những doanh nghiệp giữa tháng. Bạn
                                hãy lựa chọn cho phù hợp với doanh nghiệp mình.
                              </h5>
                            </div>
                          </div>
                          <div class="col-span-6 mt-2">
                            <input
                              type="number"
                              name=""
                              id=""
                              class="form-control-input"
                              v-model="OldSettingFurlough[index].day_new"
                            />
                          </div>
                        </div>
                        <div
                          class="w-full grid grid-cols-12 gap-20 mt-2 row-setting"
                        >
                          <div class="col-span-6">
                            <div class="flex flex-col text-left">
                              <h5 class="text-setting">
                                Nhân sự có hợp đồng đầu tiên trước ngày này
                                trong tháng thì được tính phép tháng đó
                              </h5>
                              <h5 class="sub-setting">
                                Ví dụ: Nếu ngày cài đặt là 15 và hợp đồng đầu
                                tiên có ngày bắt đầu là ngày 14 thì bạn sẽ được
                                tính phép trong tháng hiện tại này. Còn nếu hợp
                                đồng đầu tiên có ngày bắt đầu là ngày 16 thì
                                phép sẽ được từ tháng kế tiếp.
                              </h5>
                            </div>
                          </div>
                          <div class="col-span-6 mt-2">
                            <input
                              type="number"
                              name=""
                              id=""
                              class="form-control-input"
                              placeholder="Nhập ngày"
                              v-model="
                                OldSettingFurlough[index].day_new_attendance_on
                              "
                            />
                          </div>
                        </div>
                        <div
                          class="w-full grid grid-cols-12 gap-20 mt-2 row-setting"
                        >
                          <div class="col-span-6">
                            <div class="flex flex-col text-left">
                              <h5 class="text-setting">
                                Thời gian kết thúc lũy kế (reset phép lũy kế về
                                0)
                              </h5>
                              <h5 class="sub-setting">
                                Ví dụ: Cài đặt là tháng 3, thì phép lũy kế, thâm
                                niên của năm trước đến hết tháng 3 năm nay thì
                                sẽ được reset về 0. Có thể chọn tuỳ chỉnh ngày
                                để chọn ngày cụ thể. Không chọn nghĩa là phép sẽ
                                không được luỹ kế.
                              </h5>
                            </div>
                          </div>
                          <div class="col-span-6 mt-2">
                            <input
                              type="number"
                              name=""
                              id=""
                              class="form-control-input"
                              v-model="
                                OldSettingFurlough[index].month_accumulation
                              "
                              placeholder="Nhập tháng"
                            />
                          </div>
                        </div>
                        <div
                          class="w-full grid grid-cols-12 gap-20 mt-2 row-setting"
                        >
                          <div class="col-span-6">
                            <div class="flex flex-col text-left">
                              <h5 class="text-setting">
                                Nhân sự nghỉ việc trước ngày này trong tháng thì
                                không được phép tháng đó
                              </h5>
                              <h5 class="sub-setting">
                                Ví dụ: Nếu ngày cài đặt là 15 và bạn nghỉ vào
                                ngày 14 tháng hiện tại thì bạn sẽ không được
                                phép trong tháng hiện tại này.
                              </h5>
                            </div>
                          </div>
                          <div class="col-span-6 mt-2">
                            <input
                              type="number"
                              name=""
                              id=""
                              class="form-control-input"
                              v-model="OldSettingFurlough[index].date_out"
                            />
                          </div>
                        </div>
                        <div
                          class="w-full grid grid-cols-12 gap-20 mt-2 row-setting"
                        >
                          <div class="col-span-6">
                            <div class="flex flex-col text-left">
                              <h5 class="text-setting">
                                Nhân sự nghỉ không lương quá số ngày này trong
                                tháng thì không được hưởng phép của tháng
                              </h5>
                              <h5 class="sub-setting">
                                Ví dụ: Nếu ngày cài đặt là 5 ngày và bạn nghỉ
                                không lương trong tháng đó quá từ 5 ngày thì sẽ
                                ko có phép tháng đó. Số ngày nghỉ không lương
                                được tính từ đơn xin nghỉ, với lý do không tính
                                công.
                              </h5>
                            </div>
                          </div>
                          <div class="col-span-6 mt-2">
                            <input
                              type="number"
                              name=""
                              id=""
                              class="form-control-input"
                              placeholder="Nhập ngày"
                              v-model="OldSettingFurlough[index].max_leave_free"
                            />
                          </div>
                        </div>
                      </div>
                    </Transition>
                    <div v-show="isInfor == false">
                      <h2
                        @click="isInfor = !isInfor"
                        class="cursor-pointer mt-2 text-sm"
                      >
                        Số ngày phép tối đa trong 1 năm Theo luật những công
                        việc hành chính là 12 ngày/năm. Tuy nhiên đối với những
                        công việc nặng nhọc có thể lên tới 14, 1.
                      </h2>
                    </div>
                  </div>
                  <div>
                    <h4
                      class="form-section-title form-small cursor-pointer"
                      @click="isSeniority = !isSeniority"
                    >
                      <span v-show="isSeniority == true"
                        ><i class="fas fa-chevron-down cursor-pointer"></i
                      ></span>
                      <span v-show="isSeniority == false"
                        ><i class="fas fa-chevron-right cursor-pointer"></i
                      ></span>
                      Cài đặt phép thâm niên
                    </h4>
                    <Transition name="slide-fade">
                      <div v-show="isSeniority == true" class="mt-2">
                        <div
                          class="w-full grid grid-cols-12 gap-20 row-setting"
                        >
                          <div class="col-span-6">
                            <div class="flex flex-col text-left">
                              <h5 class="text-setting">
                                Cho phép hưởng phép thâm niên
                              </h5>
                              <h5 class="sub-setting">
                                Cài đặt cho phép nhân viên làm lâu năm được
                                hưởng thêm phép thâm niên.
                              </h5>
                            </div>
                          </div>
                          <div class="col-span-6 text-right">
                            <div>
                              <div class="check">
                                <input
                                  id="checkLeave"
                                  type="checkbox"
                                  true-value="1"
                                  false-value="0"
                                  v-model="
                                    OldSettingFurlough[index].can_seniority
                                  "
                                />
                                <label for="checkLeave"></label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="w-full grid grid-cols-12 gap-20 row-setting"
                        >
                          <div class="col-span-6">
                            <h5 class="text-setting">
                              Ngày bắt đầu tính phép thâm niên
                            </h5>
                            <div class="flex items-center mt-2">
                              <div class="whitespace-nowrap px-2">Cứ</div>
                              <div class="w-[100px]">
                                <input
                                  type="number"
                                  name=""
                                  id=""
                                  class="form-control-input"
                                  v-model="
                                    OldSettingFurlough[index].seniority_year
                                  "
                                />
                              </div>
                              <div class="whitespace-nowrap px-2">
                                năm thâm niên hưởng
                              </div>
                              <div class="w-[100px]">
                                <input
                                  type="number"
                                  name=""
                                  id=""
                                  class="form-control-input"
                                  v-model="
                                    OldSettingFurlough[index].add_more_seniority
                                  "
                                />
                              </div>
                              <div class="whitespace-nowrap px-2">phép</div>
                            </div>
                          </div>
                          <div class="col-span-6 text-right">
                            <v-select
                              label="title"
                              :options="TypeSeniority"
                              :reduce="(type) => type.value"
                              placeholder="Chọn loại"
                              :searchable="false"
                              v-model="OldSettingFurlough[index].seniority_type"
                            ></v-select>
                          </div>
                        </div>
                      </div>
                    </Transition>
                    <div v-show="isSeniority == false">
                      <h2
                        @click="isSeniority = !isSeniority"
                        class="cursor-pointer mt-2 text-sm"
                      >
                        Ngày bắt đầu tính phép thâm niên
                      </h2>
                    </div>
                  </div>
                  <div>
                    <h4
                      class="form-section-title form-small cursor-pointer"
                      @click="isOther = !isOther"
                    >
                      <span v-show="isOther == true"
                        ><i class="fas fa-chevron-down cursor-pointer"></i
                      ></span>
                      <span v-show="isOther == false"
                        ><i class="fas fa-chevron-right cursor-pointer"></i
                      ></span>
                      Cài đặt khác
                    </h4>
                    <Transition name="slide-fade">
                      <div v-show="isOther == true" class="mt-2">
                        <div
                          class="w-full grid grid-cols-12 gap-20 row-setting"
                        >
                          <div class="col-span-6">
                            <div class="flex flex-col text-left">
                              <h5 class="text-setting">Cho phép ứng phép</h5>
                              <h5 class="sub-setting">
                                Trong 1 năm, nhân viên chỉ được phép sử dụng số
                                phép trong năm. Cài đặt này cho phép nhân viên
                                có thể nghỉ nhiều hơn số phép năm của mình
                              </h5>
                            </div>
                          </div>
                          <div class="col-span-6 text-right">
                            <div>
                              <div class="check">
                                <input
                                  id="checkOther"
                                  type="checkbox"
                                  true-value="1"
                                  false-value="0"
                                  v-model="
                                    OldSettingFurlough[index].can_add_more
                                  "
                                />
                                <label for="checkOther"></label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="w-full grid grid-cols-12 gap-20 row-setting"
                        >
                          <div class="col-span-8">
                            <h5 class="text-setting">
                              Cài đặt trường hợp nghỉ thai sản không được tính
                              phép
                            </h5>
                          </div>
                          <div class="col-span-4 text-right">
                            <div>
                              <div class="check">
                                <input
                                  id="checkOther_ts"
                                  type="checkbox"
                                  true-value="1"
                                  false-value="0"
                                  v-model="
                                    OldSettingFurlough[index]
                                      .maternity_not_furlough
                                  "
                                />
                                <label for="checkOther_ts"></label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Transition>
                    <div v-show="isOther == false">
                      <h2
                        @click="isOther = !isOther"
                        class="cursor-pointer mt-2 text-sm"
                      >
                        Loại hợp đồng được phép ứng Ứng phép là 1 tính năng cho
                        phép doanh nghiệp có thể nghỉ nhiều hơn số phép mình
                        đang có.Tuy nhiên đều
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </the-tab>
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="UpdateSettingFurlough()">
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
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarSettingTimekeep from "@/components/sidebar/SidebarSettingTimekeep.vue";
import datePicker from "@/components/datePicker/datePicker.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import CreatePerson from "@/components/CreatePerson.vue";
import InputDepartment from "@/components/constant/InputDepartment.vue";
import InputPosition from "@/components/constant/InputPosition.vue";
import InputContractType from "@/components/constant/InputContractType.vue";
import TabNav from "@/components/tab/TabNav.vue";
import TheTab from "@/components/tab/TheTab.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import { ref } from "@vue/reactivity";
import { useSettingFurlough } from "@/store/modules/settingTimekeep/settingFurlough";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
export default {
  components: {
    PersonLayout,
    SidebarSettingTimekeep,
    NavbarSocial,
    CreatePerson,
    datePicker,
    InputDepartment,
    InputPosition,
    InputContractType,
    TabNav,
    TheTab,
    NavFeature,
  },
  data() {
    return {
      isTime: true,
      isPerson: true,
      isCondition: true,
      isInfor: true,
      isSeniority: true,
      isOther: true,
    };
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const isLoading = ref(true);
    const selected = ref("Cài đặt 1");
    const setSelected = (tab) => {
      selected.value = tab;
    };
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const stt_furlough = useSettingFurlough();
    const {
      OldSettingFurlough,
      ContractTypeStart,
      TypeSeniority,
      StartAddFurlough,
      TabSetting,
    } = storeToRefs(stt_furlough);
    stt_furlough.OldSettingFurloughAction({ EndTimeLoading });
    const listDepartments = computed(
      () => store.getters["departments/getAllDepartmentActive"]
    );
    const listPositions = computed(
      () => store.getters["positions/getAllPositionsActive"]
    );
    const listContractTypes = computed(
      () => store.state.contractTypes.listContractTypes
    );
    if (listDepartments.value?.length == 0) {
      store.dispatch("departments/getAllDepartmentsAction");
    }
    if (listPositions.value?.length == 0) {
      store.dispatch("positions/getAllPositionsAction", 500);
    }
    if (listContractTypes.value?.length == 0) {
      store.dispatch("contractTypes/GetAllContractTypeAction", 50);
    }
    const addTabSetting = () => {
      const data = {
        month_from: "",
        month_to: "",
        postion_ids: null,
        department_ids: null,
        contract_types: null,
        contract_excute_month: "0",
        contract_type_start: "-1",
        max_year: "12",
        month_start: "1",
        month_end: "12",
        month_over: "0",
        number_in_month_type: "AVG",
        day_new: "1",
        day_new_attendance_on: null,
        date_out: "15",
        month_accumulation: "3",
        month_accumulation_date: null,
        contract_first_day: "16",
        can_seniority: 0,
        seniority_type: null,
        seniority_year: null,
        seniority_day: null,
        senior: [],
        can_add_more: 0,
        can_add_contract_types: null,
        add_more_type: null,
        add_more_number: null,
        add_more_seniority: "0",
        maternity_not_furlough: 0,
        maternity_start_date: null,
        maternity_end_date: null,
      };
      OldSettingFurlough.value.push(data);
      TabSetting.value.push(`Cài đặt ${TabSetting.value?.length + 1}`);
      setSelected(`Cài đặt ${TabSetting.value?.length}`);
    };
    const DeleteTabSetting = (index) => {
      TabSetting.value.splice(index, 1);
      OldSettingFurlough.value.splice(index, 1);
      setSelected(`Cài đặt ${TabSetting.value?.length}`);
    };
    const UpdateSettingFurlough = () => {
      isLoading.value = true;
      const data = {
        value: OldSettingFurlough.value,
      };
      stt_furlough.UpdateSettingFurloughAction({ data, toast, EndTimeLoading });
    };
    return {
      isLoading,
      selected,
      setSelected,
      listDepartments,
      listPositions,
      listContractTypes,
      StartAddFurlough,
      TypeSeniority,
      TabSetting,
      EndTimeLoading,
      OldSettingFurlough,
      ContractTypeStart,
      UpdateSettingFurlough,
      addTabSetting,
      DeleteTabSetting,
    };
  },
};
</script>
