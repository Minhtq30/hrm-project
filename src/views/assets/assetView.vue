<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-asset></sidebar-asset>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <div class="flex grow">
          <div class="flex items-center">
            <asset-add-events-vue></asset-add-events-vue>
            <p class="ml-2 font-bold">{{ assetDetail.name }}</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar
      ><div class="bg-gray-100">
        <nav-feature>
          <div class="border-b grid grid-cols-12 gap-2 mx-2">
            <div class="col-span-9">
              <ul class="flex py-3">
                <li class="py-1 hoverRouter">
                  <router-link to="/asset">THÔNG TIN CHUNG</router-link>
                </li>
              </ul>
            </div>
            <div class="col-span-3 text-right whitespace-nowrap">
              <div class="text-right pt-1">
                <div
                  class="btn-icon group relative disableInput"
                  @click="showModal()"
                >
                  <div class="cx">
                    <i class="fal fa-shopping-bag"></i>
                  </div>
                  <div class="action-label">Cấp phát</div>
                </div>
                <div class="btn-icon group relative" @click="assetRecallShow()">
                  <div class="cx">
                    <i class="fal fa-undo"></i>
                  </div>
                  <div class="action-label">Thu hồi</div>
                </div>
                <div
                  class="btn-icon group relative"
                  @click="assetTransferShow()"
                >
                  <div class="cx">
                    <i class="fal fa-exchange mr-4"></i>
                  </div>
                  <div class="action-label">Điều chuyển</div>
                </div>
                <div class="btn-icon group relative" @click="assetBrokenShow()">
                  <div class="cx">
                    <i class="fal fa-times-circle"></i>
                  </div>
                  <div class="action-label">Báo hỏng</div>
                </div>
                <div class="btn-icon group relative" @click="assetImportShow()">
                  <div class="cx">
                    <i class="fal fa-ellipsis-v-alt"></i>
                  </div>
                  <div class="action-label"></div>
                  <div
                    class="absolute z-10 right-0 top-14 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
                  >
                    <ul class="p-2 rounded-lg border bg-white">
                      <li class="w-60 sub-item">Sửa thông tin phiếu</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="col-span-2 text-right whitespace-nowrap">
              <div class="grid grid-cols-12 gap-4 text-right">
                <div class="col-span-3 text-center">
                  <a href="#"><i class="fal fa-shopping-bag"></i></a>
                  <p class="text-[12px]">Cấp phát</p>
                </div>
                <div class="col-span-3 text-center">
                  <a href="#"><i class="fal fa-undo"></i></a>
                  <p class="text-[12px]">Thu hồi</p>
                </div>
                <div class="col-span-3 text-center">
                  <a href="#"> <i class="fal fa-times-circle"></i></a>
                  <p class="text-[12px]">Báo hỏng</p>
                </div>
                <div class="col-span-3 text-center">
                  <a href="#"><i class="fal fa-ellipsis-v-alt"></i></a>
                </div>
              </div>
            </div> -->
          </div>
        </nav-feature>
      </div></template
    >
    <Transition name="slide-fade">
      <div class="w-full h-full" v-if="isLoading == false">
        <div class="px-2">
          <div class="h-[400px]">
            <div class="grid grid-cols-2 gap-0 mx-2 mt-2">
              <div class="col-span-1">
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label">Mã tài sản: </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail.code
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label">Tên tài sản: </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail.name
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label"
                      >Loại tài sản:
                    </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail?.group_name
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label">Trạng thái: </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">
                      <div
                        class="beacon"
                        :class="formatColor(assetDetail?.status)"
                      >
                        {{ assetDetail?.status_name }}
                      </div>
                    </label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label"
                      >Thời gian bảo hành(tháng):
                    </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail.time_warranty
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label"
                      >Khấu hao(tháng):
                    </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail.time_warranty
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label"
                      >Nhà cung cấp:
                    </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail?.supplier_name
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label">Ngày mua: </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      formatDate(assetDetail.date_bought)
                    }}</label>
                  </div>
                </div>
              </div>
              <div class="col-span-1">
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label">Mô tả: </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail?.description
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label">Vị trí: </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail?.inventorySource_name
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label">Nguyên giá: </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      formatPrice(assetDetail?.price_origin)
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label">Số serial: </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail.serial_number
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label"
                      >Số hợp đồng/hóa đơn:
                    </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail.contract_number
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label"
                      >Người sử dụng:
                    </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail?.current_personnel_name
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label">Chức vụ: </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail?.position_name
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label">Phòng ban: </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail?.department_name
                    }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="border grid grid-cols-12 gap-2 mt-2 bg-gray-100">
          <div class="col-span-8 text-left p-2">
            <div class="">LỊCH SỬ SỬ DỤNG</div>
          </div>
        </div>
        <div class="">
          <div class="w-full text-left">
            <table-responsive :header="headerHistory" :isShow="false"
              ><tr
                class="bg-white border-b text-left"
                v-for="(history, index) in listAssetHistory.DATA"
                :key="index"
              >
                <td class="p-3">
                  {{ formatAssetTicketType(history.ticket_type) }}
                </td>
                <td class="cellTable">
                  {{ formatDate(history.date_assign) }}
                </td>
                <td class="p-3">{{ history?.userAssign?.name }}</td>
                <td class="p-3">{{ history?.userAssignment?.name }}</td>
                <td class="p-3"></td>
                <td class="p-3"></td>
                <td class="p-3">{{ history?.description }}</td>
              </tr>
            </table-responsive>
          </div>
        </div>
        <div class="border grid grid-cols-12 gap-2 bg-gray-100">
          <div class="col-span-8 text-left p-2">
            <div class="">LỊCH SỬ SỬA CHỮA</div>
          </div>
        </div>
        <div class="">
          <table-responsive :header="headerRepairHistory" :isShow="false"
            ><tr
              class="bg-white border-b text-left"
              v-for="(repairHistory, index) in listAssetHistory.REPAIR"
              :key="index"
            >
              <td class="cellTable">
                <a href="#">{{ formatDate(repairHistory.date_assign) }}</a>
              </td>
              <td class="p-3">{{ repairHistory?.description }}</td>
              <td class="p-3">{{ repairHistory?.supplier?.name }}</td>
              <td class="p-3">
                {{ formatPrice(repairHistory?.expected_cost) }}
              </td>
              <td class="p-3"></td>
            </tr>
          </table-responsive>
        </div>
      </div>
    </Transition>
  </person-layout>
  <div>
    <ModalView1 v-show="isModalRecallVisible" @close="closeModalRecall">
      <template v-slot:header><div class="p-1">Thu hồi tài sản</div></template>
      <template v-slot:body>
        <div class="w-[480px] pt-3">
          <div class="grid grid-cols-2 gap-2">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Mã tài sản</label>
              <div class="">
                <input
                  type="text"
                  class="disabledInput"
                  placeholder=""
                  disabled
                  title=""
                  v-model="assetDetail.code"
                />
              </div>
            </div>
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Tên tài sản</label>
              <div class="">
                <input
                  type="text"
                  class="disabledInput"
                  disabled
                  placeholder=""
                  title=""
                  v-model="assetDetail.name"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label"
                >Ngày thu hồi <span class="text-red-600 pl-1">*</span></label
              >
              <div>
                <date-picker v-model="assetTicket.date_assign"></date-picker>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label"
                >Người thu hồi<span class="text-red-600 pl-1">*</span></label
              >
              <div class="mt-2">
                <div class="placeholder:text-lg">
                  <v-select
                    label="name"
                    :options="listPerson"
                    :reduce="(person) => person.ID"
                    @input="searchPerson"
                    placeholder="Nhập mã hoặc tên"
                    class="rounded-3xl"
                    v-model="assetTicket.user_assignment"
                    append-to-body
                  >
                    <template #option="{ work_place_current, name }">
                      <div style="display: flex; align-items: baseline">
                        <strong>{{ name }}</strong>
                        <em style="margin-left: 0.5rem"
                          >- {{ work_place_current?.title }}</em
                        >
                      </div>
                    </template>
                  </v-select>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Tài liệu đính kèm</label>
              <div class="">
                <input
                  type="text"
                  class="form-control-input"
                  placeholder=""
                  title=""
                  v-model="assetDetail.notes"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Lý do thu hồi</label>
              <div class="">
                <textarea
                  class="form-control-input"
                  placeholder=""
                  title=""
                  rows="3"
                  v-model="assetTicket.notes"
                >
                </textarea>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="w-full text-right">
          <button
            type="button"
            class="btn-green"
            style="background-color: var(--color-primary)"
            @click="createRecallTicket()"
          >
            Cập nhật
          </button>
          <button
            type="button"
            class="btn-green ml-2"
            style="background-color: var(--color-primary)"
            @click="closeModalRecall()"
            aria-label="Đóng"
          >
            Đóng
          </button>
        </div>
      </template>
    </ModalView1>
  </div>
  <div>
    <!-- Modal tạo phiếu điều chuyển tài sản -->
    <ModalView1 v-show="isModalTransferVisible" @close="closeModalTransfer">
      <template v-slot:header
        ><div class="p-1">Điều chuyển tài sản</div>
      </template>
      <template v-slot:body>
        <div class="w-[480px] pt-3">
          <div class="grid grid-cols-2 gap-2">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Mã tài sản</label>
              <div class="">
                <input
                  type="text"
                  class="disabledInput"
                  placeholder=""
                  disabled
                  title=""
                  v-model="assetDetail.code"
                />
              </div>
            </div>
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Tên tài sản</label>
              <div class="">
                <input
                  type="text"
                  class="disabledInput"
                  disabled
                  placeholder=""
                  title=""
                  v-model="assetDetail.name"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label"
                >Ngày điều chuyển
                <span class="text-red-600 pl-1">*</span></label
              >
              <div>
                <date-picker v-model="assetTicket.date_assign"></date-picker>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label"
                >Người điều chuyển<span class="text-red-600 pl-1"
                  >*</span
                ></label
              >
              <div class="mt-2">
                <div class="placeholder:text-lg">
                  <v-select
                    label="name"
                    :options="listPerson"
                    :reduce="(person) => person.ID"
                    @input="searchPerson"
                    placeholder="Nhập mã hoặc tên"
                    class="rounded-3xl"
                    v-model="assetTicket.user_assignment"
                  >
                    <template #option="{ work_place_current, name }">
                      <div style="display: flex; align-items: baseline">
                        <strong>{{ name }}</strong>
                        <em style="margin-left: 0.5rem"
                          >- {{ work_place_current?.title }}</em
                        >
                      </div>
                    </template>
                  </v-select>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label"
                >Người nhận<span class="text-red-600 pl-1">*</span></label
              >
              <div class="mt-2">
                <div class="placeholder:text-lg">
                  <v-select
                    label="name"
                    :options="listPerson"
                    :reduce="(person) => person.ID"
                    @input="searchPerson"
                    placeholder="Nhập mã hoặc tên"
                    class="rounded-3xl"
                    v-model="assetTicket.user_assign"
                  >
                    <template #option="{ work_place_current, name }">
                      <div style="display: flex; align-items: baseline">
                        <strong>{{ name }}</strong>
                        <em style="margin-left: 0.5rem"
                          >- {{ work_place_current?.title }}</em
                        >
                      </div>
                    </template>
                  </v-select>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-2 text-left">
            <label for="" class="form-group-label">Tài liệu đính kèm</label>
            <div class="">
              <input
                type="text"
                class="form-control-input"
                placeholder=""
                title=""
                v-model="assetDetail.attachments"
              />
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Lý do điều chuyển</label>
              <div class="">
                <textarea
                  class="form-control-input"
                  placeholder=""
                  title=""
                  rows="3"
                  v-model="assetTicket.notes"
                >
                </textarea>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="w-full text-right">
          <button
            type="button"
            class="btn-green"
            style="background-color: var(--color-primary)"
            @click="createTransferTicket()"
          >
            Cập nhật
          </button>
          <button
            type="button"
            class="btn-green ml-2"
            style="background-color: var(--color-primary)"
            @click="closeModalTransfer()"
            aria-label="Đóng"
          >
            Đóng
          </button>
        </div>
      </template>
    </ModalView1>
    <!-- Modal tạo phiếu báo hỏng tài sản -->
    <ModalView1 v-show="isModalBrokenVisible" @close="closeModalBroken">
      <template v-slot:header
        ><div class="p-1">BÁO HỎNG TÀI SẢN</div>
      </template>
      <template v-slot:body>
        <div class="w-[480px] pt-3">
          <div class="grid grid-cols-2 gap-2">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Mã tài sản</label>
              <div class="">
                <input
                  type="text"
                  class="disabledInput"
                  placeholder=""
                  disabled
                  title=""
                  v-model="assetDetail.code"
                />
              </div>
            </div>
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Tên tài sản</label>
              <div class="">
                <input
                  type="text"
                  class="disabledInput"
                  disabled
                  placeholder=""
                  title=""
                  v-model="assetDetail.name"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label"
                >Ngày báo hỏng <span class="text-red-600 pl-1">*</span></label
              >
              <div>
                <date-picker v-model="assetTicket.date_assign"></date-picker>
              </div>
            </div>
          </div>
          <div class="mt-2 text-left">
            <label for="" class="form-group-label">Tài liệu đính kèm</label>
            <div class="">
              <input
                type="text"
                class="form-control-input"
                placeholder=""
                title=""
                v-model="assetDetail.attachments"
              />
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Nguyên nhân hỏng</label>
              <div class="">
                <textarea
                  class="form-control-input"
                  placeholder=""
                  title=""
                  rows="3"
                  v-model="assetTicket.description"
                >
                </textarea>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="w-full text-right">
          <button
            type="button"
            class="btn-green"
            style="background-color: var(--color-primary)"
            @click="createBrokenTicket()"
          >
            Cập nhật
          </button>
          <button
            type="button"
            class="btn-green ml-2"
            style="background-color: var(--color-primary)"
            @click="closeModalBroken()"
            aria-label="Đóng"
          >
            Đóng
          </button>
        </div>
      </template>
    </ModalView1>
  </div>
  <teleport to="#app">
    <!-- Modal tạo phiếu cấp tài sản -->
    <div>
      <ModalView1 v-show="isModalVisible" @close="closeModal">
        <template v-slot:header
          ><div class="p-1">CẤP PHÁT TÀI SẢN</div>
        </template>
        <template v-slot:body>
          <div class="w-[480px] pt-3">
            <div class="grid grid-cols-2 gap-2">
              <div class="mt-2 text-left">
                <label for="" class="form-group-label">Mã tài sản</label>
                <div class="">
                  <input
                    type="text"
                    class="disabledInput"
                    placeholder=""
                    disabled
                    title=""
                    v-model="assetDetail.code"
                  />
                </div>
              </div>
              <div class="mt-2 text-left">
                <label for="" class="form-group-label">Tên tài sản</label>
                <div class="">
                  <input
                    type="text"
                    class="disabledInput"
                    disabled
                    placeholder=""
                    title=""
                    v-model="assetDetail.name"
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1"></div>
            <div class="grid grid-cols-1">
              <div class="mt-2 text-left">
                <label for="" class="form-group-label"
                  >Ngày cấp <span class="text-red-600 pl-1">*</span></label
                >
                <div>
                  <date-picker v-model="assetTicket.date_assign"></date-picker>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1">
              <div class="mt-2 text-left">
                <label for="" class="form-group-label"
                  >Người cấp<span class="text-red-600 pl-1">*</span></label
                >
                <div class="mt-2">
                  <div class="placeholder:text-lg">
                    <v-select
                      label="name"
                      :options="listPerson"
                      :reduce="(person) => person.ID"
                      @input="searchPerson"
                      placeholder="Nhập mã hoặc tên"
                      class="rounded-3xl"
                      v-model="assetTicket.user_assignment"
                      append-to-body
                    >
                      <template #option="{ work_place_current, name }">
                        <div style="display: flex; align-items: baseline">
                          <strong>{{ name }}</strong>
                          <em style="margin-left: 0.5rem"
                            >- {{ work_place_current?.title }}</em
                          >
                        </div>
                      </template>
                    </v-select>
                  </div>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1">
              <div class="mt-2 text-left">
                <label for="" class="form-group-label"
                  >Người nhận<span class="text-red-600 pl-1">*</span></label
                >
                <div class="mt-2">
                  <div class="placeholder:text-lg">
                    <v-select
                      label="name"
                      :options="listPerson2"
                      :reduce="(person) => person.ID"
                      @input="searchPerson2"
                      placeholder="Nhập mã hoặc tên"
                      class="rounded-3xl"
                      v-model="assetTicket.user_assign"
                      append-to-body
                    >
                      <template #option="{ work_place_current, name }">
                        <div style="display: flex; align-items: baseline">
                          <strong>{{ name }}</strong>
                          <em style="margin-left: 0.5rem"
                            >- {{ work_place_current?.title }}</em
                          >
                        </div>
                      </template>
                    </v-select>
                  </div>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1">
              <div class="mt-2 text-left">
                <label for="" class="form-group-label">Lý do cấp</label>
                <div class="">
                  <textarea
                    class="form-control-input"
                    placeholder=""
                    title=""
                    rows="3"
                    v-model="assetTicket.notes"
                  >
                  </textarea>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <div class="w-full text-right">
            <button
              type="button"
              class="btn-green"
              style="background-color: var(--color-primary)"
              @click="createAssetAssign()"
            >
              Cập nhật
            </button>
            <button
              type="button"
              class="btn-green ml-2"
              style="background-color: var(--color-primary)"
              @click="closeModal()"
              aria-label="Đóng"
            >
              Đóng
            </button>
          </div>
        </template>
      </ModalView1>
    </div>
  </teleport>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>
<script>
import TableResponsive from "@/components/table/TableResponsive.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarAsset from "@/components/sidebar1/asset/sidebarAsset.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, ref, reactive } from "vue";
import assetAddEventsVue from "./assetAddEvents.vue";
import ModalView1 from "@/components/modal/ModalView1.vue";
import { useToast } from "vue-toastification";
import datePicker from "@/components/datePicker/datePicker.vue";
import _ from "lodash";
import {
  FormatDate,
  FormatAssetStatus,
  FormatPrice,
} from "@/constants/FormatAll";

export default {
  components: {
    PersonLayout,
    SidebarAsset,
    NavbarSocial,
    assetAddEventsVue,
    ModalView1,
    TableResponsive,
    datePicker,
    // CurrencyInput,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    // const router = useRouter();
    const isModalVisible = ref(false);
    const isModalRecallVisible = ref(false);
    const isModalTransferVisible = ref(false);
    const isModalBrokenVisible = ref(false);
    const toast = useToast();
    const isLoading = ref(true);
    const assetTicket = reactive({
      type: "",
      date_assign: new Date(),
      user_assignment: null,
      user_assign: null,
      user_department: null,
      user_title: "",
      user_approval: "",
      date_approval: "",
      images: "",
      notes: "",
      json_asset: [
        {
          id: null,
          code: null,
          title: "",
          type: null,
          status: null,
        },
      ],
      array_asset: [],
    });
    const EndLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("asset/getDataAssetByIdAction", {
      id: route.params.assetId,
      store,
      EndLoading: EndLoading,
    });
    store.dispatch("asset/getAssetHistoryAction", { id: route.params.assetId });
    store.dispatch("assetTicket/getAllAssetTicketTypeAction");
    const assetDetail = computed(() => store.state.asset.dataAssetById);
    const listAssetTicket = computed(
      () => store.state.assetTicket.listAssetTicket
    );
    const listAsset = computed(() => store.state.assetTicket.listAsset);
    const listPerson = computed(() => store.state.asset.listPerson);
    const listPerson2 = computed(() => store.state.asset.listPerson2);
    const listAssetHistory = computed(() => store.state.asset.listAssetHistory);
    const listTicketType = computed(
      () => store.state.assetTicket.listTicketType
    );
    const createAssetAssign = () => {
      const data = {
        type: "ASSIGN",
        date_assign: assetTicket.date_assign,
        user_assignment: assetTicket.user_assignment,
        user_assign: assetTicket.user_assign,
        assets: [assetDetail.value.id],
        attachments: [],
        notes: assetTicket.notes,
      };
      const dataUrl = {
        data: data,
        perPage: "25",
        id: route.params.assetId,
      };
      store.dispatch("assetTicket/createAssetTicketAction", {
        dataUrl,
        toast,
        EndLoading: EndLoading,
        store,
      });
      assetTicket.date_assign = "";
      assetTicket.user_assignment = "";
      assetTicket.user_assign = "";
      assetTicket.notes = "";
      isModalVisible.value = false;
    };
    const createRecallTicket = () => {
      const data = {
        type: "RECALL",
        date_assign: assetTicket.date_assign,
        user_assignment: assetTicket.user_assignment,
        assets: [assetDetail.value.id],
        attachments: [],
        notes: [],
      };
      const dataUrl = {
        data: data,
        perPage: "25",
        id: route.params.assetId,
      };
      store.dispatch("assetTicket/createAssetTicketAction", {
        dataUrl,
        toast,
        EndLoading: EndLoading,
        store,
      });
      isModalRecallVisible.value = false;
    };
    const createTransferTicket = () => {
      const data = {
        type: "TRANSFER",
        user_assignment: assetTicket.user_assignment,
        date_assign: assetTicket.date_assign,
        description: assetTicket.description,
        user_assign: assetTicket.user_assign,
        assets: [assetDetail.value.id],
        attachments: assetTicket.attachments,
        notes: assetTicket.notes,
      };
      const dataUrl = {
        data: data,
        perPage: "25",
        id: route.params.assetId,
      };
      store.dispatch("assetTicket/createAssetTicketAction", {
        dataUrl,
        toast,
        EndLoading: EndLoading,
        store,
      });
      isModalTransferVisible.value = false;
    };
    const createBrokenTicket = () => {
      const data = {
        type: "BROKEN",
        date_assign: assetTicket.date_assign,
        description: assetTicket.description,
        user_assign: assetTicket.user_assign,
        assets: [assetDetail.value.id],
        attachments: assetTicket.attachments,
        notes: assetTicket.notes,
      };
      const dataUrl = {
        data: data,
        perPage: "25",
        id: route.params.assetId,
      };
      store.dispatch("assetTicket/createAssetTicketAction", {
        dataUrl,
        toast,
        EndLoading: EndLoading,
        store,
      });
      isModalBrokenVisible.value = false;
    };
    return {
      isLoading,
      assetTicket,
      listAssetTicket: listAssetTicket,
      assetDetail: assetDetail,
      listAsset,
      listPerson,
      isModalVisible,
      isModalRecallVisible,
      isModalTransferVisible,
      isModalBrokenVisible,
      createAssetAssign,
      createRecallTicket,
      createTransferTicket,
      createBrokenTicket,
      listPerson2,
      toast,
      listAssetHistory,
      listTicketType,
    };
  },
  data() {
    return {
      headerHistory: [
        "Loại phiếu",
        "Ngày",
        "Người sử dụng",
        "Người cấp",
        "Phòng ban",
        "Vị trí",
        "Ghi chú",
      ],
      headerRepairHistory: [
        "Ngày",
        "Nội dung",
        "Đơn vị sửa chữa",
        "Chi phí",
        "Ghi chú",
      ],
    };
  },
  methods: {
    showModal() {
      if (this.assetDetail.status == "LOST") {
        this.toast.error("Tài sản mã " + this.assetDetail.code + " đã mất");
      } else if (this.assetDetail.status == "REPAIR") {
        this.toast.error(
          "Tài sản mã " + this.assetDetail.code + " đang sửa chữa"
        );
      } else if (this.assetDetail.status == "LIQUIDATED") {
        this.toast.error(
          "Tài sản mã " + this.assetDetail.code + " đã thanh lý"
        );
      } else if (this.assetDetail.status == "DESTROY") {
        this.toast.error("Tài sản mã " + this.assetDetail.code + " đã bị hủy");
      } else if (this.assetDetail.status == "USING") {
        this.toast.error(
          "Tài sản mã " + this.assetDetail.code + " đang sử dụng"
        );
      } else {
        this.isModalVisible = true;
      }
    },
    closeModal() {
      this.isModalVisible = false;
    },
    closeModalRecall() {
      this.isModalRecallVisible = false;
    },
    closeModalTransfer() {
      this.isModalTransferVisible = false;
    },
    closeModalBroken() {
      this.isModalBrokenVisible = false;
    },
    assetTransferShow() {
      if (this.assetDetail.status != "USING") {
        this.toast.error(
          "Tài sản mã " + this.assetDetail.code + " chưa được cấp phát"
        );
      } else {
        this.isModalTransferVisible = true;
      }
    },
    assetBrokenShow() {
      if (this.assetDetail.status == "LOST") {
        this.toast.error("Tài sản mã " + this.assetDetail.code + " đã mất");
      } else if (this.assetDetail.status == "REPAIR") {
        this.toast.error(
          "Tài sản mã " + this.assetDetail.code + " đang sửa chữa"
        );
      } else if (this.assetDetail.status == "BROKEN") {
        this.toast.error(
          "Tài sản mã " + this.assetDetail.code + " đang bị hỏng"
        );
      } else if (this.assetDetail.status == "LIQUIDATED") {
        this.toast.error(
          "Tài sản mã " + this.assetDetail.code + " đã thanh lý"
        );
      } else if (this.assetDetail.status == "DESTROY") {
        this.toast.error("Tài sản mã " + this.assetDetail.code + " đã bị hủy");
      } else {
        this.isModalBrokenVisible = true;
      }
    },
    assetRecallShow() {
      if (this.assetDetail.status != "USING") {
        this.toast.error(
          "Tài sản mã " + this.assetDetail.code + " chưa được cấp phát"
        );
      } else {
        this.isModalRecallVisible = true;
      }
    },
    searchPerson: _.debounce(function (e) {
      this.$store.dispatch("asset/SearchPersonAction", e.target.value);
    }, 350),
    searchPerson2: _.debounce(function (e) {
      this.$store.dispatch("asset/SearchPersonAction2", e.target.value);
    }, 350),
    formatDate(date) {
      if (date == null) {
        return "";
      } else {
        return FormatDate(date);
      }
    },
    formatAssetTicketType(code, arr) {
      arr = this.listTicketType;
      if (code == null) {
        return "Thêm mới";
      } else {
        return FormatAssetStatus(code, arr);
      }
    },
    formatPrice(value) {
      return FormatPrice(value);
    },
    formatColor(status) {
      if (status == "USING") {
        return "bg-info";
      } else if (status == "UNUSED") {
        return "bg-warning";
      }
      {
        return "beacon-liquidation";
      }
    },
  },
};
</script>
<style>
.svg-rotate {
  transform: rotate(180deg);
}
</style>
