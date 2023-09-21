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
            <p class="text-base">Công thức và từ khóa</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="ml-2">Công thức và từ khóa</div>
        <div class="flex"></div></nav-feature
    ></template>
    <div class="home w-full text-left p-2">
      <div title="Hàm và từ khóa">
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
          Hàm và từ khóa
        </h4>
        <Transition name="slide-fade">
          <div v-show="isInfor == true">
            <table class="w-full">
              <thead>
                <tr class="border-b">
                  <th class="cellTable">Hàm/Từ khóa</th>
                  <th class="cellTable">Mô tả</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b">
                  <td class="cellTable">@SUM_ON_DEPARTMENT(TU_KHOA)</td>
                  <td class="cellTable">
                    Hàm trả lại tổng giá trị theo phòng ban của TU_KHOA. Lưu ý
                    TU_KHOA phải là các cột không chứa công thức.
                  </td>
                </tr>
                <tr class="border-b">
                  <td class="cellTable">@SUM_ON_POSITION(TU_KHOA)</td>
                  <td class="cellTable">
                    Hàm trả lại tổng giá trị theo vị trí của TU_KHOA. Lưu ý
                    TU_KHOA phải là các cột không chứa công thức.
                  </td>
                </tr>
                <tr class="border-b">
                  <td class="cellTable">@SUM_ON_JOBTITLE(TU_KHOA)</td>
                  <td class="cellTable">
                    Hàm trả lại tổng giá trị theo chức vụ của TU_KHOA. Lưu ý
                    TU_KHOA phải là các cột không chứa công thức.
                  </td>
                </tr>
                <tr class="border-b">
                  <td class="cellTable">@TOTAL_SUNDAY()</td>
                  <td class="cellTable">
                    Hàm trả lại số ngày chủ nhật trong tháng
                  </td>
                </tr>
                <tr class="border-b">
                  <td class="cellTable">@TOTAL_DAY()</td>
                  <td class="cellTable">
                    Hàm trả lại tổng số ngày trong tháng
                  </td>
                </tr>
                <tr class="border-b">
                  <td class="cellTable">@PREV(TU_KHOA)</td>
                  <td class="cellTable">
                    Hàm trả lại giá trị TU_KHOA của bảng lương tháng trước
                    tháng. Lưu ý TU_KHOA phải là cột của bảng lương chính và đã
                    được chốt
                  </td>
                </tr>
                <tr class="">
                  <td class="cellTable">ROW_TYPE</td>
                  <td class="cellTable">
                    Từ khóa trả lại giá trị của loại dòng. MAIN: Dòng chính,
                    SUB: Dòng phụ
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Transition>
      </div>
      <div title="Công thức mặc định">
        <h4
          class="form-section-title form-small cursor-pointer"
          @click="isFormula = !isFormula"
        >
          <span v-show="isFormula == true">
            <i class="fas fa-chevron-down cursor-pointer"></i>
          </span>
          <span v-show="isFormula == false"
            ><i class="fas fa-chevron-right cursor-pointer"></i
          ></span>
          Công thức mặc định
        </h4>
        <Transition name="slide-fade">
          <div v-show="isFormula == true">
            <table class="w-full">
              <thead>
                <tr class="border-b">
                  <th class="cellTable">Tiêu đề</th>
                  <th class="cellTable">Từ khóa</th>
                  <th class="cellTable">Công thức mặc định</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b">
                  <td class="cellTable">Tổng tiền</td>
                  <td class="cellTable">SALARY_END</td>
                  <td class="cellTable"></td>
                </tr>
                <tr class="border-b">
                  <td class="cellTable">Lương chuyển qua TK doanh nghiệp</td>
                  <td class="cellTable">SALARY_ENTERPRISE</td>
                  <td class="cellTable">
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="=IF(SALARY_END >= 9000000,9000000,SALARY_END)"
                    />
                  </td>
                </tr>
                <tr class="">
                  <td class="cellTable">Lương chuyển qua TK cá nhân</td>
                  <td class="cellTable">SALARY_PRIVATE</td>
                  <td class="cellTable">
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="=IF(SALARY_END- SALARY_ENTERPRISE >0 , SALARY_END- SALARY_ENTERPRISE,0)"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Transition>
      </div>
    </div>
    <template v-slot:sub_footer
      ><div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal">Cập nhật</button>
          <button class="button-close-modal">Hủy bỏ</button>
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
export default {
  components: {
    PersonLayout,
    SidebarWage,
    NavbarSocial,
    ButtonCreateWage,
    NavFeature,
  },
  methods: {},
  data() {
    return {
      isInfor: true,
      isFormula: true,
    };
  },
};
</script>

<style></style>
