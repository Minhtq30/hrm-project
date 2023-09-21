<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-asset></sidebar-asset>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false">
        <div class="flex grow">
          <div class="flex items-center ml-2">
            <div class="icon-slider button-create relative group">
              <div
                class="text-sm absolute w-48 z-10 bg-white left-0 top-full rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible p-2 drop-shadow-xl before:content-[''] before:h-5 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
              >
                <ul>
                  <li class="sub-item" @click="showModalLocation">
                    <span class="ml-4">Thêm vị trí</span>
                  </li>
                  <li class="sub-item" @click="showModalSupplier">
                    <span class="ml-4">Thêm nhà cung cấp</span>
                  </li>
                  <li class="sub-item" @click="showModalTypeAsset">
                    <span class="ml-4">Thêm loại tài sản</span>
                  </li>
                </ul>
              </div>
            </div>
            <p class="ml-2 font-medium">Cập nhật thông tin tài sản</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <div class="w-full h-full">
      <div class="px-3">
        <div class="grid grid-cols-1 gap-1 items-start">
          <div class="w-[600px] pt-2">
            <div class="border-b-[1px] pt-4 pb-1 text-left">
              <button v-on:click="isHidden = !isHidden">
                <span v-if="isHidden"
                  ><i class="" title="Click để mở rộng/thu gọn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="svg-rotate h-5 w-5 inline-block"
                      style="color: var(--color-primary)"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke-width="0"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg> </i
                ></span>
                <span v-if="!isHidden"
                  ><i class="" title="Click để mở rộng/thu gọn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 inline-block"
                      style="color: var(--color-primary)"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke-width="0"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      /></svg></i
                ></span>
              </button>
              <span class="font-medium" style="color: var(--color-primary)"
                >Thông tin tài sản</span
              >
            </div>
          </div>
          <div v-show="!isHidden">
            <div class="w-[600px] pl-2 pt-4">
              <div class="grid grid-cols-2 gap-2">
                <div class="text-left">
                  <label for="" class="form-group-label"
                    >Loại tài sản<span class="text-red-600"> *</span></label
                  >
                  <div class="mt-2">
                    <div class="placeholder:text-lg">
                      <v-select
                        label="name"
                        :options="listAssetGroup"
                        :reduce="(group) => group.id"
                        placeholder="Nhập mã hoặc tên"
                        class="rounded-3xl"
                        v-model.number="asset.group_id"
                        type="number"
                      >
                        <template #option="{ code, name }">
                          <div style="display: flex; align-items: baseline">
                            <strong>{{ name }}</strong>
                            <em style="margin-left: 0.5rem">- {{ code }}</em>
                          </div>
                        </template>
                      </v-select>
                    </div>
                  </div>
                </div>
                <div class="text-left">
                  <label for="" class="form-group-label"
                    >Phòng ban quản lý<span class="text-red-600">
                      *</span
                    ></label
                  >
                  <div class="mt-2">
                    <div class="placeholder:text-lg">
                      <v-select
                        label="title"
                        :options="listDepartments"
                        :reduce="(departments) => departments.ID"
                        placeholder="Nhập mã hoặc tên"
                        class="rounded-3xl"
                        type="number"
                        v-model.number="asset.department_id"
                      >
                        <template #option="{ title }">
                          <div style="display: flex; align-items: baseline">
                            <strong>{{ title }}</strong>
                          </div>
                        </template>
                      </v-select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div class="mt-2 text-left">
                  <label for="" class="form-group-label"
                    >Mã tài sản<span class="text-red-600"> *</span></label
                  >
                  <div class="mt-2">
                    <input
                      type="text"
                      class="form-control-input"
                      placeholder=""
                      title=""
                      v-model="asset.code"
                    />
                  </div>
                </div>
                <div class="mt-2 text-left">
                  <label for="" class="form-group-label"
                    >Tên tài sản<span class="text-red-600"> *</span></label
                  >
                  <div class="mt-2">
                    <input
                      type="text"
                      class="form-control-input"
                      placeholder=""
                      title=""
                      v-model="asset.name"
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-2">
                <div class="mt-2 text-left">
                  <label for="" class="form-group-label">Nguyên giá</label>
                  <div class="mt-2">
                    <CurrencyInput
                      v-model="asset.price_origin"
                      :options="{
                        currency: 'USD',
                        currencyDisplay: 'hidden',
                      }"
                    />
                  </div>
                </div>
                <div class="mt-2 text-left">
                  <label for="" class="form-group-label">Số serial</label>
                  <div class="mt-2">
                    <input
                      type="text"
                      class="form-control-input"
                      placeholder=""
                      title=""
                      v-model="asset.serial_number"
                    />
                  </div>
                </div>
                <div class="mt-2 text-left">
                  <label for="" class="form-group-label">Nguồn gốc</label>
                  <div class="mt-2">
                    <div class="placeholder:text-lg">
                      <v-select
                        label="name"
                        :options="listAssetOrigin"
                        :reduce="(origin) => origin.id"
                        placeholder="Nhập mã hoặc tên"
                        class="rounded-3xl"
                        v-model="asset.origin_id"
                      >
                        <template #option="{ code, name }">
                          <div style="display: flex; align-items: baseline">
                            <strong>{{ name }}</strong>
                            <em style="margin-left: 0.5rem">- {{ code }}</em>
                          </div>
                        </template>
                      </v-select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-1 gap-2">
                <div class="mt-2 text-left">
                  <label for="" class="form-group-label">Quy cách</label>
                  <div class="mt-2">
                    <input
                      type="text"
                      class="form-control-input"
                      placeholder=""
                      title=""
                      v-model="asset.description"
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-1 gap-2">
                <div class="mt-2 text-left">
                  <label for="" class="form-group-label">Nhà cung cấp</label>
                  <div class="mt-2">
                    <div class="placeholder:text-lg">
                      <v-select
                        label="name"
                        :options="listAssetSupplier"
                        :reduce="(supplier) => supplier.id"
                        placeholder="Nhập mã hoặc tên"
                        class="rounded-3xl"
                        v-model="asset.supplier_id"
                      >
                        <template #option="{ code, name }">
                          <div style="display: flex; align-items: baseline">
                            <strong>{{ name }}</strong>
                            <em style="margin-left: 0.5rem">- {{ code }}</em>
                          </div>
                        </template>
                      </v-select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div class="mt-2 text-left">
                  <label for="" class="form-group-label"
                    >Ngày mua<span class="text-red-600"> *</span></label
                  >
                  <div>
                    <v-date-picker
                      class="form-control-input overflow-hidden"
                      v-model="asset.date_bought"
                      :masks="masks"
                      :model-config="modelConfig"
                    >
                      <template
                        v-slot="{ inputValue, togglePopover, inputEvents }"
                      >
                        <div class="flex items-center">
                          <button
                            class="focus:outline-none mr-2"
                            @click="togglePopover()"
                          >
                            <i class="far fa-calendar-alt"></i>
                          </button>
                          <input
                            placeholder="dd/mm/yyyy"
                            :value="inputValue"
                            class="focus:outline-none w-full"
                            @click="togglePopover()"
                            v-on="inputEvents"
                          />
                        </div>
                      </template>
                    </v-date-picker>
                  </div>
                </div>
                <div class="mt-2 text-left">
                  <label for="" class="form-group-label"
                    >Thời gian bảo hành</label
                  >
                  <div>
                    <input
                      type="text"
                      class="form-control-input"
                      placeholder=""
                      title=""
                      v-model="asset.time_warranty"
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div class="mt-2 text-left">
                  <label for="" class="form-group-label"
                    >Khấu hao từ<span class="text-red-600 pl-1">*</span></label
                  >
                  <div>
                    <v-date-picker
                      class="form-control-input overflow-hidden"
                      v-model="asset.date_used_origin"
                      :masks="masks"
                      :model-config="modelConfig"
                    >
                      <template
                        v-slot="{ inputValue, togglePopover, inputEvents }"
                      >
                        <div class="flex items-center">
                          <button
                            class="focus:outline-none mr-2"
                            @click="togglePopover()"
                          >
                            <i class="far fa-calendar-alt"></i>
                          </button>
                          <input
                            placeholder="dd/mm/yyyy"
                            :value="inputValue"
                            class="focus:outline-none w-full"
                            @click="togglePopover()"
                            v-on="inputEvents"
                          />
                        </div>
                      </template>
                    </v-date-picker>
                  </div>
                </div>
                <div class="mt-2 text-left">
                  <label for="" class="form-group-label"
                    >HSD/Thời gian khấu hao<span class="italic"
                      >(tháng)</span
                    ></label
                  >
                  <div>
                    <input
                      type="text"
                      class="form-control-input"
                      placeholder=""
                      title=""
                      v-model="asset.reduction_time_origin"
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div class="mt-2 text-left">
                  <label for="" class="form-group-label">Vị trí</label>
                  <div class="mt-2">
                    <div class="placeholder:text-lg">
                      <v-select
                        label="name"
                        :options="listAssetLocation"
                        :reduce="(location) => location.id"
                        placeholder="Nhập mã hoặc tên"
                        class="rounded-3xl"
                        v-model="asset.inventory_source_id"
                      >
                        <template #option="{ id, name }">
                          <div style="display: flex; align-items: baseline">
                            <strong>{{ name }}</strong>
                            <em style="margin-left: 0.5rem">- {{ id }}</em>
                          </div>
                        </template>
                      </v-select>
                    </div>
                  </div>
                </div>
                <div class="mt-2 text-left">
                  <label for="" class="form-group-label"
                    >Số hợp đồng/hóa đơn</label
                  >
                  <div class="mt-2">
                    <input
                      type="text"
                      class="form-control-input"
                      placeholder=""
                      title=""
                      v-model="asset.contract_number"
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-1">
                <div class="mt-2 text-left">
                  <label for="" class="text-[12.6px]">Ghi chú</label>
                  <div class="mt-2">
                    <textarea
                      class="form-control-input"
                      placeholder=""
                      title=""
                      v-model="asset.description"
                      rows="3"
                    >
                    </textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="my-4 text-left" v-if="isHidden">
            <span class="text-gray-400 font-style: italic px-4"
              >Các trường đánh dấu <span class="text-red-600">*</span> là các
              trường bắt buộc</span
            >
          </div>
        </div>
      </div>
    </div>
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="UpdateAsset()">Cập nhật</button>
          <button
            class="button-close-modal"
            @click="this.$router.push({ path: '/asset', name: 'Asset' })"
          >
            Hủy bỏ
          </button>
        </div>
      </div></template
    >
  </person-layout>
  <div class="modalSupplier">
    <ModalView1 v-show="isModalSupplierVisible" @close="closeModalSupplier">
      <template v-slot:header
        ><div class="p-1">THÊM MỚI NHÀ CUNG CẤP</div>
      </template>
      <template v-slot:body>
        <div class="w-[480px] pt-3">
          <div class="grid grid-cols-2 gap-2">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label"
                >Mã nhà cung cấp <span class="p-1 text-red-600">*</span></label
              >
              <div class="">
                <input
                  type="text"
                  class="form-control-input"
                  placeholder=""
                  title=""
                  v-model="supplier.code"
                />
              </div>
            </div>
            <div class="mt-2 text-left">
              <label for="" class="form-group-label"
                >Nhóm <span class="p-1 text-red-600">*</span></label
              >
              <div class="">
                <select
                  type="text"
                  class="form-control-input"
                  placeholder=""
                  title=""
                  v-model="supplier.type"
                >
                  <option value="0">Nhà cung cấp</option>
                  <option value="1">Đơn vị sửa chữa</option>
                </select>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label"
                >Tên nhà cung cấp <span class="p-1 text-red-600">*</span></label
              >
              <div class="">
                <input
                  type="text"
                  class="form-control-input"
                  placeholder=""
                  title=""
                  v-model="supplier.name"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Địa chỉ</label>
              <div class="">
                <input
                  type="text"
                  class="form-control-input"
                  placeholder=""
                  title=""
                  v-model="supplier.address"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Người liên hệ</label>
              <div class="">
                <input
                  type="text"
                  class="form-control-input"
                  placeholder=""
                  title=""
                  v-model="supplier.desc"
                />
              </div>
            </div>
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Điện thoại</label>
              <div class="">
                <input
                  type="text"
                  class="form-control-input"
                  placeholder=""
                  title=""
                  v-model="supplier.phone"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Chức vụ</label>
              <div class="">
                <input
                  type="text"
                  class="form-control-input"
                  placeholder=""
                  title=""
                />
              </div>
            </div>
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Email</label>
              <div class="">
                <input
                  type="text"
                  class="form-control-input"
                  placeholder="abc@company.com"
                  title=""
                  v-model="supplier.email"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Ghi chú</label>
              <div class="">
                <textarea
                  class="form-control-input"
                  placeholder=""
                  title=""
                  rows="3"
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
            @click="createSupplier()"
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
  <div>
    <ModalView1 v-show="isModalLocationVisible" @close="closeModalLocation">
      <template v-slot:header><div class="p-1">THÊM MỚI VỊ TRÍ</div></template>
      <template v-slot:body>
        <div class="w-[480px] pt-3">
          <div class="grid grid-cols-1">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label"
                >Mã vị trí<span class="text-red-600"> (*)</span></label
              >
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập mã"
                  v-model="Inventory.source_code"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Tên</label>
              <div>
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control-input"
                  placeholder=""
                  v-model="Inventory.name"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Phone</label>
              <div>
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control-input"
                  placeholder=""
                  v-model="Inventory.phone"
                  title=""
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Email</label>
              <div class="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control-input"
                  placeholder=""
                  v-model="Inventory.email"
                  title=""
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2 mt-2 text-left">
            <div>
              <label for="" class="form-group-label">Nhóm</label>
              <div>
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control-input"
                  placeholder="Nhập hình thức"
                  v-model="Inventory.group"
                  title=""
                />
              </div>
            </div>
            <div>
              <label for="" class="form-group-label">Tình trạng</label>
              <div>
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control-input"
                  placeholder="Nhập hình thức"
                  v-model="Inventory.is_active"
                  title=""
                />
              </div>
            </div>
          </div>
          <div class="mt-2 text-left">
            <label for="" class="form-group-label">Mô tả</label>
            <div>
              <textarea
                type="text"
                name="rate"
                id="rate"
                class="form-control-input"
                placeholder=""
                v-model="Inventory.description"
              />
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
            @click="createInventory()"
          >
            Cập nhật
          </button>
          <button
            type="button"
            class="btn-green ml-2"
            style="background-color: var(--color-primary)"
            @click="closeModalLocation()"
            aria-label="Đóng"
          >
            Đóng
          </button>
        </div>
      </template>
    </ModalView1>
  </div>
  <div>
    <ModalView1 v-show="isModalTypeAssetVisible" @close="closeModalTypeAsset">
      <template v-slot:header
        ><div class="p-1">THÊM MỚI LOẠI TÀI SẢN</div></template
      >
      <template v-slot:body>
        <div class="w-[480px] pt-3">
          <div class="grid grid-cols-1">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label"
                >Mã loại tài sản<span class="text-red-600 pl-1">
                  (*)</span
                ></label
              >
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập mã"
                  v-model="assetGroup.code"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Tên loại tài sản</label>
              <div>
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control-input"
                  placeholder=""
                  v-model="assetGroup.name"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Nhóm cha</label>
              <div class="mt-2">
                <div class="placeholder:text-lg">
                  <v-select
                    label="name"
                    :options="listAssetGroup"
                    :reduce="(group) => group.id"
                    placeholder="Nhập mã hoặc tên"
                    class="rounded-3xl"
                    append-to-body
                    v-model="assetGroup.parent_id"
                  >
                    <template #option="{ code, name }">
                      <div style="display: flex; align-items: baseline">
                        <strong>{{ name }}</strong>
                        <em style="margin-left: 0.5rem">- {{ code }}</em>
                      </div>
                    </template>
                  </v-select>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-2 text-left">
            <label for="" class="form-group-label">Mô tả</label>
            <div>
              <textarea
                type="text"
                name="rate"
                id="rate"
                rows="3"
                class="form-control-input"
                placeholder=""
                v-model="assetGroup.description"
              />
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
            @click="createAssetGroup()"
          >
            Cập nhật
          </button>
          <button
            type="button"
            class="btn-green ml-2"
            style="background-color: var(--color-primary)"
            @click="closeModalTypeAsset()"
            aria-label="Đóng"
          >
            Đóng
          </button>
        </div>
      </template>
    </ModalView1>
  </div>
</template>
<script>
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarAsset from "@/components/sidebar1/asset/sidebarAsset.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { computed, reactive, ref } from "vue";
import { useToast } from "vue-toastification";
import CurrencyInput from "@/components/CurrencyInput.vue";
import ModalView1 from "@/components/modal/ModalView1.vue";
import _ from "lodash";

export default {
  components: {
    PersonLayout,
    SidebarAsset,
    NavbarSocial,
    CurrencyInput,
    ModalView1,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const isModalSupplierVisible = ref(false);
    const isModalLocationVisible = ref(false);
    const isModalTypeAssetVisible = ref(false);
    const perPage = ref("25");
    const EndLoading = () => {
      isLoading.value = false;
    };
    const isLoading = ref(true);
    store.dispatch("asset/getDataAssetByIdAction", {
      id: route.params.assetId,
      store,
    });
    store.dispatch("assetGroups/getAllAssetGroupsAction", "");
    store.dispatch("asset/SearchAssetOriginAction", "");
    store.dispatch("assetSupplier/getAllSuppliersAction", "25");
    store.dispatch("inventories/getAllInventoriesAction", "25");
    store.dispatch("departments/getAllDepartmentsAction");
    const supplier = reactive({
      id: "",
      code: "",
      name: "",
      type: "",
      desc: "",
      email: "",
      address: "",
      phone: "",
    });
    const Inventory = reactive({
      source_code: null,
      name: "",
      is_active: "1",
      description: "",
      phone: "",
      email: "",
    });
    const assetGroup = reactive({
      code: "",
      name: "",
      is_active: 1,
      description: "",
      parent_id: "",
    });
    const asset = computed(() => store.state.asset.dataAssetById);
    const listPerson = computed(() => store.state.asset.listPerson);
    const listAssetType = computed(() => store.state.asset.listAssetType);
    const listAssetOrigin = computed(() => store.state.asset.listAssetOrigin);
    const listAssetSupplier = computed(() => store.state.asset.listSupplier);
    const listAssetLocation = computed(() => store.state.asset.listLocation);
    const listAssetGroup = computed(
      () => store.state.assetGroups.listAssetGroups1
    );
    const listDepartments = computed(
      () => store.state.departments.listDepartments
    );
    const listPagination = computed(() => store.state.asset.listPagination);
    const UpdateAsset = () => {
      const dataUrl = {
        data: asset.value,
        perPage: 50,
      };
      store.dispatch("asset/UpdateAssetAction", {
        dataUrl,
        toast,
        EndLoading: EndLoading,
      });
      router.push({ path: "/asset", name: "Asset" });
    };
    const createSupplier = () => {
      const dataUrl = {
        data: supplier,
        perPage: "1",
      };
      store.dispatch("assetSupplier/CreateSupplierAction", { dataUrl, toast });
      isModalSupplierVisible.value = false;
      supplier.code = "";
      supplier.name = "";
      supplier.type = 0;
      supplier.desc = "";
      supplier.address = "";
      supplier.phone = "";
      supplier.email = 0;
      // store.dispatch("asset/SearchSupplierAction", "");
    };
    const createInventory = () => {
      const data = {
        source_code: Inventory.source_code,
        name: Inventory.name,
        is_active: Inventory.is_active,
        description: Inventory.description,
        phone: Inventory.phone,
        email: Inventory.email,
      };
      const dataUrl = {
        data: data,
        perPage: perPage.value,
      };
      store.dispatch("inventories/createInventoryAction", dataUrl);
      Inventory.source_code = "";
      Inventory.name = "";
      Inventory.is_active = 1;
      Inventory.description = "";
      Inventory.phone = "";
      Inventory.email = "";
      isModalLocationVisible.value = false;
    };
    const createAssetGroup = () => {
      const data = {
        code: assetGroup.code,
        name: assetGroup.name,
        is_active: assetGroup.is_active,
        description: assetGroup.description,
        parent_id: assetGroup.parent_id,
      };
      const dataUrl = {
        data: data,
        perPage: "",
      };
      store.dispatch("assetGroups/createAssetGroupAction", dataUrl);
      assetGroup.code = "";
      assetGroup.name = "";
      assetGroup.is_active = 1;
      assetGroup.description = "";
      assetGroup.parent_id = "";
      isModalTypeAssetVisible.value = false;
    };
    const changeInputAsset = (e, index) => {
      asset.value.json_asset[index].id = e.id;
      asset.value.json_asset[index].status = e.status;
      asset.value.json_asset[index].title = e.name;
      asset.value.json_asset[index].type = e.type_name;
      asset.value.array_asset.push(e.id);
    };
    const changeInputPerson = (e) => {
      asset.value.user_department = e.department.title;
      asset.value.user_title = e.position.title;
    };
    const formatCurrency = (e) => {
      let val = (e.price_origin / 1).toFixed(2).replace(".", ",");
      asset.value.price_origin = val
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    return {
      isModalSupplierVisible,
      isModalLocationVisible,
      isModalTypeAssetVisible,
      asset: asset,
      supplier,
      Inventory,
      assetGroup,
      listAssetOrigin: listAssetOrigin,
      listAssetSupplier: listAssetSupplier,
      listAssetLocation: listAssetLocation,
      listPagination: listPagination,
      listDepartments,
      listPerson,
      listAssetGroup,
      listAssetType,
      formatCurrency,
      UpdateAsset,
      changeInputAsset,
      changeInputPerson,
      EndLoading,
      createSupplier,
      createInventory,
      createAssetGroup,
    };
  },
  data() {
    return {
      header: ["Mã", "Tên", "Sắp xếp"],
      isModalVisible: false,
      files: [],
      isHidden: false,
      isHidden1: false,
      masks: {
        input: "DD/MM/YYYY",
        data: "YYYY-MM-DD",
      },
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD",
      },
    };
  },
  methods: {
    previewFiles() {
      this.files = this.$refs.myFiles.files;
    },
    searchAssetType: _.debounce(function (e) {
      this.$store.dispatch("asset/SearchAssetTypeAction", e.target.value);
    }, 350),
    searchPerson: _.debounce(function (e) {
      this.$store.dispatch("asset/SearchPersonAction", e.target.value);
    }, 350),
    searchAssetOrigin: _.debounce(function (e) {
      this.$store.dispatch("asset/SearchAssetOriginAction", e.target.value);
    }, 350),
    searchAssetSupplier: _.debounce(function (e) {
      this.$store.dispatch("asset/SearchSupplierAction", e.target.value);
    }, 350),
    searchAssetLocation: _.debounce(function (e) {
      this.$store.dispatch("asset/SearchLocationAction", e.target.value);
    }, 350),
    convertToNumber(value) {
      return parseInt(value);
    },
    showModalSupplier() {
      this.isModalSupplierVisible = true;
      // this.$store.dispatch("asset/getAssetHistoryAction", this.asset.value.id);
    },
    showModalLocation() {
      this.isModalLocationVisible = true;
      // this.$store.dispatch("asset/getAssetHistoryAction", this.asset.value.id);
    },
    showModalTypeAsset() {
      this.isModalTypeAssetVisible = true;
    },
    closeModalSupplier() {
      this.supplier.id = "";
      this.supplier.code = "";
      this.supplier.name = "";
      this.supplier.type = 0;
      this.supplier.desc = "";
      this.supplier.address = "";
      this.supplier.phone = "";
      this.supplier.email = "";
      this.isModalSupplierVisible = false;
    },
    closeModalLocation() {
      this.Inventory.source_code = "";
      this.Inventory.name = "";
      this.Inventory.is_active = "1";
      this.Inventory.description = "";
      this.Inventory.phone = "";
      this.Inventory.email = "";
      this.isModalLocationVisible = false;
    },
    closeModalTypeAsset() {
      this.assetGroup.code = "";
      this.assetGroup.name = "";
      this.assetGroup.is_active = "1";
      this.assetGroup.description = "";
      this.assetGroup.parent = "";
      this.isModalTypeAssetVisible = false;
    },
  },
};
</script>
<style>
.svg-rotate {
  transform: rotate(180deg);
}
</style>
