<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-wage></sidebar-wage>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center">
            <button-create-wage></button-create-wage>
            <p class="text-base">Tạo mới loại bảng lương</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div>
          <tab-nav
            :tabs="['Loại bảng lương', 'Hàm và từ khóa']"
            :selected="selected"
            @selected="setSelected"
          >
          </tab-nav></div></nav-feature
    ></template>
    <div class="home w-full">
      <Transition name="slide-fade">
        <the-tab :isSelected="selected == 'Loại bảng lương'">
          <div class="text-left px-4 w-full form-plus-over">
            <div class="mt-2" title="Thông tin chung">
              <h4 class="form-section-title form-small">
                <span v-show="isInfor == true" @click="isInfor = !isInfor">
                  <i class="fas fa-chevron-down cursor-pointer"></i>
                </span>
                <span @click="isInfor = !isInfor" v-show="isInfor == false"
                  ><i class="fas fa-chevron-right cursor-pointer"></i
                ></span>
                Thông tin chung
              </h4>
              <Transition>
                <div v-show="isInfor == true">
                  <div class="form-small">
                    <div>
                      <label for="" class="form-group-label"
                        >Tên bảng lương<span class="text-red-600"
                          >*</span
                        ></label
                      >
                      <div>
                        <input
                          type="text"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="Bảng lương công ty"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-small">
                    <div class="flex items-center">
                      <div>
                        <input
                          type="checkbox"
                          id="link"
                          name=""
                          v-model="linkWage"
                        />
                      </div>
                      <label
                        for="link"
                        class="form-group-label ml-1 cursor-pointer"
                      >
                        Liên kết với bảng lương khác
                      </label>
                    </div>
                  </div>
                  <div class="form-small" v-if="linkWage">
                    <div>
                      <label for="" class="form-group-label"
                        >Từ khóa đại diện<span class="text-red-600"
                          >*</span
                        ></label
                      >
                      <div>
                        <input
                          type="text"
                          name=""
                          id=""
                          class="form-control-input"
                          placeholder="LUONGCONGTY"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-small">
                    <div>
                      <label for="" class="form-group-label"
                        >Phòng ban áp dụng<span class="text-red-600"
                          >*</span
                        ></label
                      >
                      <div>
                        <v-select></v-select>
                      </div>
                    </div>
                  </div>
                  <div class="form-small">
                    <label class="form-group-label" for=""
                      >Vị trí áp dụng <span class="text-red-600">*</span></label
                    >
                    <div>
                      <v-select></v-select>
                    </div>
                  </div>
                  <div class="form-small">
                    <label class="form-group-label" for=""
                      >Bảng lương<span class="text-red-600">*</span></label
                    >
                    <div>
                      <v-select></v-select>
                    </div>
                  </div>
                  <div class="form-small">
                    <div class="flex items-center">
                      <div>
                        <input type="checkbox" id="report" name="" />
                      </div>
                      <label
                        for="report"
                        class="form-group-label ml-1 cursor-pointer"
                      >
                        Bảng lương lên báo cáo
                      </label>
                    </div>
                  </div>
                  <div class="form-small">
                    <label class="form-group-label" for="">Người quản lý</label>
                    <div>
                      <v-select></v-select>
                    </div>
                  </div>
                  <div class="form-small">
                    <label class="form-group-label" for=""
                      >Người theo dõi</label
                    >
                    <div>
                      <v-select></v-select>
                    </div>
                  </div>
                  <div class="form-small">
                    <div class="flex items-center">
                      <div>
                        <input
                          type="checkbox"
                          id="automatic"
                          name=""
                          v-model="autoWage"
                        />
                      </div>
                      <label
                        for="automatic"
                        class="form-group-label ml-1 cursor-pointer"
                      >
                        Tự động tạo bảng lương hàng tháng
                      </label>
                    </div>
                  </div>
                  <div class="form-small" v-if="autoWage">
                    <label class="form-group-label" for=""
                      >Tự động tạo vào ngày</label
                    >
                    <div>
                      <v-select></v-select>
                    </div>
                  </div>
                </div>
              </Transition>
              <Transition>
                <div v-show="isInfor == false">
                  <h2
                    @click="isInfor = !isInfor"
                    class="cursor-pointer mt-2 form-group-label"
                  >
                    Tên bảng lương *, Từ khoá đại diện *, Phòng ban áp dụng *,
                    Vị trí áp dụng *, Bảng lương *, Người quản lý, Người theo
                    dõi, Tự động tạo vào ngày *
                  </h2>
                </div>
              </Transition>
            </div>
            <div class="mt-2" title="Cấu hình danh sách cột">
              <h4 class="form-section-title form-small">
                <span
                  v-show="isSetting == true"
                  @click="isSetting = !isSetting"
                >
                  <i class="fas fa-chevron-down cursor-pointer"></i>
                </span>
                <span
                  @click="isSetting = !isSetting"
                  v-show="isSetting == false"
                  ><i class="fas fa-chevron-right cursor-pointer"></i
                ></span>
                Cấu hình danh sách cột
              </h4>
              <Transition>
                <div v-show="isSetting == true">
                  <div class="form-supper-plus flex items-center">
                    <div class="form-xs-small px-1">
                      <label for="" class="form-group-label w-full">Cột</label>
                    </div>
                    <div class="form-x-small px-1">
                      <label for="" class="form-group-label"
                        >Giá trị cột<span class="text-red-600">*</span></label
                      >
                    </div>
                    <div class="form-mid-small px-1">
                      <label for="" class="form-group-label"
                        >Tiêu đề cột<span class="text-red-600">*</span></label
                      >
                    </div>
                    <div class="form-mid-small px-1">
                      <label for="" class="form-group-label"
                        >Từ khóa cột<span class="text-red-600">*</span></label
                      >
                    </div>
                    <div class="form-extra-small px-1">
                      <label for="" class="form-group-label"
                        >Cách tính (công thức/hằng số)<span class="text-red-600"
                          >*</span
                        ></label
                      >
                    </div>
                    <div class="form-extra-small px-1">
                      <label for="" class="form-group-label"
                        >Giá trị của hàng tổng hợp khi tách dòng</label
                      >
                    </div>
                    <div class="form-mid-xs-small px-1">
                      <label for="" class="form-group-label"
                        >Kiểu giá trị</label
                      >
                    </div>
                    <div class="form-mid-xs-small px-1">
                      <label for="" class="form-group-label">Phiếu lương</label>
                    </div>
                    <div class="form-mid-xs-small px-1">
                      <label for="" class="form-group-label"
                        >Giá trị tổng hợp</label
                      >
                    </div>
                    <div class="form-mid-small mb-[10px] px-1">
                      <label for="" class="form-group-label">Mô tả</label>
                    </div>
                  </div>
                  <div
                    class="form-plus flex items-center -mt-3"
                    v-for="(item, index) in listColumn"
                    :key="index"
                  >
                    <div class="flex items-center">
                      <div class="form-xs-small px-1">
                        <input
                          type="text"
                          class="disabledInput"
                          disabled
                          :value="numToAlpha(index)"
                        />
                      </div>
                      <div class="form-x-small px-1">
                        <v-select class="w-full"></v-select>
                      </div>
                      <div class="form-mid-small px-1">
                        <input type="text" class="form-control-input" />
                      </div>
                      <div class="form-mid-small px-1">
                        <input type="text" class="form-control-input" />
                      </div>
                      <div class="form-extra-small px-1">
                        <input type="text" class="form-control-input" />
                      </div>
                      <div class="form-extra-small px-1">
                        <input type="text" class="form-control-input" />
                      </div>
                      <div class="form-mid-xs-small px-1">
                        <input type="text" class="form-control-input" />
                      </div>
                      <div class="form-mid-xs-small px-1">
                        <input type="text" class="form-control-input" />
                      </div>
                      <div class="form-mid-xs-small px-1">
                        <input type="text" class="form-control-input" />
                      </div>
                      <div class="form-mid-small mb-[10px] px-1">
                        <input type="text" class="form-control-input" />
                      </div>
                    </div>
                    <div class="" @click="removeColumn(index)">
                      <i
                        class="fal fa-times icon-close"
                        style="margin-top: 0px"
                      ></i>
                    </div>
                  </div>
                  <div class="mb-4" @click="addColumn()">
                    <i class="fal fa-plus-circle icon-plus"></i>
                  </div>
                </div>
              </Transition>
              <Transition>
                <div v-show="isSetting == false">
                  <h2
                    @click="isSetting = !isSetting"
                    class="cursor-pointer mt-2 form-group-label"
                  >
                    Cột, Giá trị cột *, Tiêu đề cột *, Từ khóa cột *, Cách tính
                    (công thức/hằng số) *, Giá trị của hàng tổng hợp khi tách
                    dòng, Giá trị của hàng tổng hợp
                  </h2>
                </div>
              </Transition>
            </div>
          </div>
        </the-tab>
      </Transition>
      <Transition name="slide-fade">
        <the-tab :isSelected="selected == 'Hàm và từ khóa'">
          <table class="w-full">
            <thead>
              <tr>
                <th class="cellTable min-w-[550px]">Hàm/Từ khóa</th>
                <th class="cellTable min-w-[550px]">Mô tả</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border">
                <td class="cellTable">@SUM_ON_DEPARTMENT(TU_KHOA)</td>
                <td class="cellTable">
                  Hàm trả lại tổng giá trị theo phòng ban của TU_KHOA. Lưu ý
                  TU_KHOA phải là các cột không chứa công thức.
                </td>
              </tr>
              <tr class="border">
                <td class="cellTable">@SUM_ON_POSITION(TU_KHOA)</td>
                <td class="cellTable">
                  Hàm trả lại tổng giá trị theo vị trí của TU_KHOA. Lưu ý
                  TU_KHOA phải là các cột không chứa công thức.
                </td>
              </tr>
              <tr class="border">
                <td class="cellTable">@SUM_ON_JOBTITLE(TU_KHOA)</td>
                <td class="cellTable">
                  Hàm trả lại tổng giá trị theo chức vụ của TU_KHOA. Lưu ý
                  TU_KHOA phải là các cột không chứa công thức.
                </td>
              </tr>
              <tr class="border">
                <td class="cellTable">@TOTAL_SUNDAY()</td>
                <td class="cellTable">
                  Hàm trả lại số ngày chủ nhật trong tháng
                </td>
              </tr>
              <tr class="border">
                <td class="cellTable">@TOTAL_DAY()</td>
                <td class="cellTable">Hàm trả lại tổng số ngày trong tháng)</td>
              </tr>
              <tr class="border">
                <td class="cellTable">@PREV(TU_KHOA)</td>
                <td class="cellTable">
                  Hàm trả lại giá trị TU_KHOA của bảng lương tháng trước tháng.
                  Lưu ý TU_KHOA phải là cột của bảng lương chính và đã được chốt
                </td>
              </tr>
              <tr class="border">
                <td class="cellTable">ROW_TYPE</td>
                <td class="cellTable">
                  Từ khóa trả lại giá trị của loại dòng. MAIN: Dòng chính, SUB:
                  Dòng phụ
                </td>
              </tr>
            </tbody>
          </table>
        </the-tab>
      </Transition>
    </div>
    <template v-slot:sub_footer
      ><div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="uploadPersonnel()">
            Cập nhật
          </button>
          <button
            class="button-close-modal"
            @click="this.$router.push('/wage-template')"
          >
            Hủy bỏ
          </button>
        </div>
      </div></template
    >
  </person-layout>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarWage from "@/components/sidebar/SidebarWage.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateWage from "@/views/wages/ButtonCreateWage.vue";
import TheTab from "@/components/tab/TheTab.vue";
import TabNav from "@/components/tab/TabNav.vue";
import { reactive, ref } from "@vue/reactivity";
export default {
  components: {
    PersonLayout,
    SidebarWage,
    NavbarSocial,
    ButtonCreateWage,
    NavFeature,
    TheTab,
    TabNav,
  },
  data() {
    return {
      selected: "Loại bảng lương",
      isInfor: true,
      isSetting: true,
    };
  },
  methods: {
    setSelected(tab) {
      this.selected = tab;
    },
  },
  setup() {
    const linkWage = ref(false);
    const autoWage = ref(false);
    const listColumn = reactive([{}]);
    const numToAlpha = (num) => {
      let alpha = "";
      for (; num >= 0; num = parseInt(num / 26, 10) - 1) {
        alpha = String.fromCharCode((num % 26) + 0x41) + alpha;
      }
      return alpha;
    };
    const addColumn = () => {
      listColumn.push({});
    };
    const removeColumn = (index) => {
      listColumn.splice(index, 1);
    };
    // const _buildColumnsArray = (range) => {
    //   let res = [];
    //   let rangeNum = range.split(":").map((val) => {
    //       return alphaToNum(val.replace(/[0-9]/g, ""));
    //     }),
    //     start = rangeNum[0],
    //     end = rangeNum[1] + 1;

    //   for (let i = start; i < end; i++) {
    //     res.push(numToAlpha(i));
    //   }

    //   return res;
    // };
    return {
      linkWage,
      autoWage,
      listColumn,
      numToAlpha,
      addColumn,
      removeColumn,
      // _buildColumnsArray,
    };
  },
};
</script>

<style></style>
