<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-timekeep></sidebar-timekeep>
    </template>
    <template v-slot:navbar>
      <navbar-social
        ><div class="flex grow">
          <div class="flex items-center">
            <button-create-timekeep></button-create-timekeep>
            <p class="text-base">Thêm mới máy chấm công</p>
          </div>
        </div></navbar-social
      >
    </template>
    <div class="w-full h-full text-left px-4 py-2 form-plus-over">
      <div>
        <h4 class="form-section-title form-small">
          <span v-show="isInfor == true" @click="isInfor = !isInfor"
            ><i class="fas fa-chevron-down cursor-pointer"></i
          ></span>
          <span @click="isInfor = !isInfor" v-show="isInfor == false"
            ><i class="fas fa-chevron-right cursor-pointer"></i
          ></span>
          Thông tin chung
        </h4>
        <Transition>
          <div v-show="isInfor == true" class="mt-2">
            <div class="form-small">
              <label for="" class="form-group-label"
                >Loại máy<span class="text-red-600">*</span></label
              >
              <div>
                <select name="" id="" class="form-control-select">
                  <option value="0">Hannet</option>
                </select>
              </div>
            </div>
            <div class="form-small flex items-center">
              <div class="check">
                <input
                  id="check"
                  type="checkbox"
                  true-value="1"
                  false-value="0"
                />
                <label for="check"></label>
              </div>
              <p class="ml-2">
                <span>Hoạt động</span>
              </p>
            </div>
            <div class="form-small grid grid-cols-12 gap-2">
              <div class="col-span-8">
                <label for="" class="form-group-label"
                  >Tên địa điểm<span class="text-red-600">*</span></label
                >
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Tên địa điểm"
                  />
                </div>
              </div>
              <div class="col-span-4">
                <label for="" class="form-group-label"
                  >Mã địa điểm<span class="text-red-600">*</span></label
                >
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Mã địa điểm"
                  />
                </div>
              </div>
            </div>
            <div class="form-small">
              <div>
                <label for="" class="form-group-label"
                  >Mã token<span class="text-red-600">*</span></label
                >
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Mã token"
                  />
                </div>
              </div>
            </div>
            <div class="form-small grid grid-cols-12 gap-2">
              <div class="col-span-6">
                <label for="" class="form-group-label"
                  >Mã máy<span class="text-red-600">*</span></label
                >
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Mã máy"
                  />
                </div>
              </div>
              <div class="col-span-6">
                <label for="" class="form-group-label"
                  >Tải từ ngày<span class="text-red-600">*</span></label
                >
                <div>
                  <v-date-picker
                    class="form-control-input overflow-hidden"
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
                          <i class="fal fa-calendar-alt"></i>
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
            </div>
            <div class="form-small grid grid-cols-12 gap-2">
              <div class="col-span-6">
                <label for="" class="form-group-label"
                  >Thời gian quét lại (phút)<span class="text-red-600"
                    >*</span
                  ></label
                >
                <div>
                  <input
                    type="number"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Thời gian quét lại (phút)"
                    value="1"
                  />
                </div>
              </div>
              <div class="col-span-6">
                <label for="" class="form-group-label"
                  >Số lượng bản ghi quét trên 1 trang
                  <span class="text-red-600">*</span></label
                >
                <div>
                  <select name="" id="" class="form-control-select">
                    <option value="">100 bản ghi</option>
                    <option value="">200 bản ghi</option>
                    <option value="">300 bản ghi</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </Transition>
        <div v-show="isInfor == false">
          <h2 @click="isInfor = !isInfor" class="cursor-pointer mt-2 text-sm">
            Loại máy *, Tên địa điểm *, Mã địa điểm
          </h2>
        </div>
      </div>
    </div>
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="createShiftAssign()">
            Cập nhật
          </button>
          <button class="button-close-modal">Hủy bỏ</button>
        </div>
      </div>
    </template>
  </person-layout>
</template>

<script>
import "@/assets/checkBox.css";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarTimekeep from "@/components/sidebar/SidebarTimekeep.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateTimekeep from "@/views/timekeep/ButtonCreateTimekeep.vue";
export default {
  components: {
    PersonLayout,
    SidebarTimekeep,
    NavbarSocial,
    ButtonCreateTimekeep,
  },
  data() {
    return {
      isInfor: true,
    };
  },
  setup() {},
};
</script>

<style></style>
