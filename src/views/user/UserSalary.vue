<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-user></sidebar-user>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center ml-4">
            <p class="ml-2 text-base uppercase">
              bảng lương {{ this.$route.params.month }}/{{
                this.$route.params.year
              }}
            </p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="">
          <div class="btn-icon relative" @click="show()">
            <div class="cx">
              <i class="fal fa-calendar-alt"></i>
            </div>
            <div class="action-label">Thời gian</div>
            <input
              type="month"
              id="start"
              name="start"
              v-model="time"
              ref="calendar"
              class="absolute opacity-0 bottom-0 right-0"
              @change="ChangeDate($event)"
            />
          </div>
        </div>
      </nav-feature>
    </template>
    <Transition name="slide-fade">
      <div v-if="isLoading == false">
        <div
          class="w-[500px] m-auto border p-2 rounded-lg mt-10"
          v-if="!showHideSalary"
        >
          <div class="text-3xl p-4">Xác thực mật khẩu</div>
          <div>
            <input
              type="password"
              name="showSalary"
              id="showSalary"
              class="form-control-input"
              v-model="confirmPassword"
              placeholder="Nhập mật khẩu để xem bảng lương"
              @keyup.enter="Confirm()"
            />
          </div>
          <img :src="imgPassword" alt="" />
        </div>
      </div>
    </Transition>
    <Transition name="slide-fade">
      <div v-if="isLoading == false">
        <div class="h-full text-center" v-if="showHideSalary">
          <table class="w-[1200px] salaryTable">
            <thead>
              <tr>
                <th rowspan="3" class="cellTable1 headerBg border text-xs">
                  Họ và tên:
                  <span class="mx-3 italic">{{ userProfile.fullname }}</span>
                </th>
                <th rowspan="3" class="cellTable1 border text-xs w-36"></th>
                <th class="cellTable1 border text-xs">
                  Phòng ban:
                  <span class="mx-3 italic">
                    {{ userProfile.department?.title }}</span
                  >
                </th>
                <th rowspan="3" class="cellTable1 border text-xs w-36"></th>
              </tr>
              <tr>
                <th class="cellTable1 border text-xs">
                  Mã nhân viên:
                  <span class="mx-3 italic"> {{ userProfile.code }} </span>
                </th>
              </tr>
              <tr>
                <th class="cellTable1 border text-xs">
                  Vị trí:
                  <span class="mx-3 italic">
                    {{ userProfile.position?.title }}
                  </span>
                </th>
              </tr>
              <!-- <tr>
                <th class="cellTable1 border text-xs">
                  Chức vụ: {{ userProfile.job_title_current?.title }}
                </th>
              </tr> -->
            </thead>
            <tbody>
              <tr>
                <td class="cellTable1 border">Công tiêu chuẩn</td>
                <td class="border text-center">
                  {{ dataSalary.StandardWork }}
                </td>
                <td class="cellTable1 border"></td>
                <td class="border text-center"></td>
              </tr>
              <tr>
                <td class="cellTable1 border">Công thử việc</td>
                <td class="border text-center">
                  {{ dataSalary.ProbationaryWork }}
                </td>
                <td class="cellTable1 border">Tỷ lệ % thử việc</td>
                <td class="border text-center">{{ dataSalary.Probation }}</td>
              </tr>
              <tr>
                <td class="cellTable1 border">Công chính thức</td>
                <td class="border text-center">
                  {{ dataSalary.OfficialPublic }}
                </td>
                <td class="cellTable1 border"></td>
                <td class="border text-center"></td>
              </tr>
              <tr>
                <td class="cellTable1 border">Công lễ</td>
                <td class="border text-center">
                  {{ dataSalary.PublicCeremony }}
                </td>
                <td class="cellTable1 border"></td>
                <td class="border text-center"></td>
              </tr>
              <tr>
                <td class="cellTable1 border">Công làm online</td>
                <td class="border text-center">{{ dataSalary.OnlineJob }}</td>
                <td class="cellTable1 border"></td>
                <td class="border text-center"></td>
              </tr>
              <tr>
                <td class="cellTable1 border">Công trực lễ</td>
                <td class="cellTable1 border"></td>
                <td class="cellTable1 border"></td>
                <td class="cellTable1 border"></td>
              </tr>
              <tr>
                <td class="cellTable1 border">Phép/CĐ/NB</td>
                <td class="cellTable1 border"></td>
                <td class="cellTable1 border"></td>
                <td class="cellTable1 border"></td>
              </tr>
              <tr>
                <td class="cellTable1 border">Tổng công thanh toán</td>
                <td class="text-center border">
                  {{ dataSalary.TotalPaymentAmount }}
                </td>
                <td class="cellTable1 border"></td>
                <td class="text-center border"></td>
              </tr>
              <tr>
                <td class="cellTable1 border">TL cơ bản</td>
                <td class="text-center border">
                  {{ formatPrice(dataSalary.BasicSalary) }}
                </td>
                <td class="cellTable1 border"></td>
                <td class="text-center border"></td>
              </tr>
              <tr class="cellColor text-red-500">
                <td class="cellTable1 border underline">Tổng thu nhập:</td>
                <td class="text-center border">
                  {{ formatPrice(TotalIncome) }}
                </td>
                <td class="cellTable1 border underline">Tổng khấu trừ:</td>
                <td class="text-center border">
                  {{ formatPrice(TotalDeduction) }}
                </td>
              </tr>
              <tr>
                <td class="cellTable1 border">TL thời gian</td>
                <td class="cellTable1 border"></td>
                <td class="cellTable1 border">Tiền ăn</td>
                <td class="cellTable1 border"></td>
              </tr>
              <tr>
                <td class="cellTable1 border">TL chi trong tháng</td>
                <td class="cellTable1 border"></td>
                <td class="cellTable1 border">Đồng phục, Thẻ tên</td>
                <td class="cellTable1 border"></td>
              </tr>
              <tr>
                <td class="cellTable1 border">Lương Online</td>
                <td class="cellTable1 border"></td>
                <td class="cellTable1 border">Công nợ/tạm ứng</td>
                <td class="cellTable1 border"></td>
              </tr>
              <tr>
                <td class="cellTable1 border">Hỗ trọ tăng ca</td>
                <td class="cellTable1 border"></td>
                <td class="cellTable1 border">Bảo hiểm bảo việt</td>
                <td class="cellTable1 border"></td>
              </tr>
              <tr>
                <td class="cellTable1 border">PC thâm niên</td>
                <td class="cellTable1 border"></td>
                <td class="cellTable1 border">Điện thoại,Vé xe, CPN</td>
                <td class="cellTable1 border"></td>
              </tr>
              <tr>
                <td class="cellTable1 border">PC trách nhiệm</td>
                <td class="cellTable1 border"></td>
                <td class="cellTable1 border">Kỷ luật</td>
                <td class="cellTable1 border"></td>
              </tr>
              <tr>
                <td class="cellTable1 border">PC Điện thoại</td>
                <td class="cellTable1 border"></td>
                <td class="cellTable1 border">Đặt cọc</td>
                <td class="cellTable1 border"></td>
              </tr>
              <tr>
                <td class="cellTable1 border">PC Xăng xe</td>
                <td class="cellTable1 border"></td>
                <td class="cellTable1 border">Phí công đoàn</td>
                <td class="text-center border">
                  {{ formatPrice(dataSalary.UnionDues) }}
                </td>
              </tr>
              <tr>
                <td class="cellTable1 border">Phụ cấp ăn</td>
                <td class="text-center border">
                  {{ formatPrice(dataSalary.MealAllowance) }}
                </td>
                <td class="cellTable1 border">Thưởng Tết dương đã lĩnh</td>
                <td class="cellTable1 border"></td>
              </tr>
              <tr>
                <td class="cellTable1 border">Hoa hồng</td>
                <td class="cellTable1 border"></td>
                <td class="cellTable1 border">Thuế TNCN</td>
                <td class="cellTable1 border"></td>
              </tr>
              <tr>
                <td class="cellTable1 border">Thưởng</td>
                <td class="text-center border">
                  {{ formatPrice(dataSalary.Bonus) }}
                </td>
                <td class="cellTable1 border">BHXH</td>
                <td class="text-center border">
                  {{ formatPrice(dataSalary.SocialInsurance) }}
                </td>
              </tr>
              <tr>
                <td class="cellTable1 border">Sinh nhật</td>
                <td class="cellTable1 border"></td>
                <td class="cellTable1 border">Du lịch</td>
                <td class="cellTable1 border"></td>
              </tr>
              <tr>
                <td class="cellTable1 border">Hỗ trợ ăn ca</td>
                <td class="cellTable1 border"></td>
                <td class="cellTable1 border">Vi phạm chấm công</td>
                <td class="cellTable1 border"></td>
              </tr>
              <tr>
                <td class="cellTable1 border">Lương KPI</td>
                <td class="cellTable1 border"></td>
                <td colspan="2" rowspan="3" class="cellTable1 border w-[100px]">
                  <span class="font-bold">Lưu ý:</span>
                  <span class="italic">
                    Toàn bộ các khoản phụ cấp đều
                    <span class="text-red-500">
                      tính theo ngày công làm việc thực tế </span
                    >(Công nghỉ lễ, nghỉ phép, nghỉ bù, nghỉ chế độ sẽ không
                    được cộng vào để tính hưởng Phụ cấp)</span
                  >
                </td>
              </tr>
              <tr>
                <td class="cellTable1 border">Truy lĩnh(+),Thu(-)</td>
                <td class="cellTable1 border"></td>
              </tr>
              <tr>
                <td class="cellTable1 border">Thưởng 30/04</td>
                <td class="cellTable1 border"></td>
              </tr>
              <tr class="cellColor text-red-500">
                <td class="cellTable1 border underline">Thực lĩnh:</td>
                <td class="text-center border">
                  {{ formatPrice(RealField) }}
                </td>
                <td
                  class="text-center border underline font-bold text-black bg-amber-300"
                  colspan="2"
                >
                  Yêu cầu bảo mật thông tin lương
                </td>
              </tr>
              <tr class="cellColor text-red-500">
                <td class="cellTable1 border underline">
                  Hình thức thanh toán
                </td>
                <td class="text-center border">Chuyển khoản</td>
                <td class="cellTable1 border">021786060</td>
                <td class="cellTable1 border">VIB</td>
              </tr>
              <tr class="cellColor text-red-500">
                <td class="cellTable1 border underline">Lý do giữ lương</td>
                <td class="cellTable1 border" colspan="3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Transition>
  </person-layout>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarUser from "@/components/sidebar/SidebarUser.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import imgPassword from "@/assets/images/password.png";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { FormatDate, FormatPrice } from "@/constants/FormatAll";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
export default {
  components: {
    PersonLayout,
    SidebarUser,
    NavbarSocial,
    NavFeature,
  },
  data() {
    return {
      time: new Date(),
      headerTime: new Date(),
      imgPassword: imgPassword,
      dataSalary: {
        StandardWork: 24,
        ProbationaryWork: 0,
        Probation: 0,
        OfficialPublic: 24,
        PublicCeremony: 0,
        OnlineJob: null,
        TotalPaymentAmount: 24,
        BasicSalary: 8000000,
        UnionDues: 55700,
        SocialInsurance: 584850,
        Bonus: 100000,
        MealAllowance: 500000,
      },
    };
  },
  computed: {
    TotalDeduction() {
      return this.dataSalary.SocialInsurance + this.dataSalary.UnionDues;
    },
    TotalIncome() {
      return (
        this.dataSalary.BasicSalary +
        this.dataSalary.Bonus +
        this.dataSalary.MealAllowance
      );
    },
    RealField() {
      return this.TotalIncome - this.TotalDeduction;
    },
  },
  methods: {
    formatDate(date) {
      return FormatDate(date);
    },
    formatPrice(price) {
      return FormatPrice(price);
    },
    show() {
      this.$refs.calendar.showPicker();
    },
  },
  setup() {
    const toast = useToast();
    const router = useRouter();
    const route = useRoute();
    const isLoading = ref(true);
    const profile = useUserProfile();
    const { userProfile } = storeToRefs(profile);
    const confirmPassword = ref();
    const showHideSalary = ref(false);
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    watch(route, (to) => {
      if (to.name == "Bảng lương cá nhân") {
        isLoading.value = true;
        EndTimeLoading();
      }
    });
    const ChangeDate = (e) => {
      isLoading.value = true;
      const date = new Date(e.target.value);
      router.push(
        `/user/salary/${route.params.idUser}&month=${
          date.getMonth() + 1
        }&year=${date.getFullYear()}`
      );
    };
    const Confirm = () => {
      if (confirmPassword.value == "Btp@123456") {
        showHideSalary.value = true;
      } else {
        showHideSalary.value = false;
        toast.error("Mật khẩu xác thực không đúng");
      }
    };
    return {
      isLoading,
      userProfile,
      confirmPassword,
      showHideSalary,
      Confirm,
      EndTimeLoading,
      ChangeDate,
    };
  },
};
</script>

<style>
/* .salaryTable tbody tr {
  height: 5px;
} */
.salaryTable thead tr {
  background-color: rgb(254, 251, 216);
}
.cellColor {
  background-color: rgb(254, 251, 216);
}
.cellTable1 {
  text-align: left;
  padding: 2px 10px;
}
</style>
