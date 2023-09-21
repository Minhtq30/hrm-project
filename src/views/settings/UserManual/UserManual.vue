<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-user-manual></sidebar-user-manual>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center ml-4">
            <p class="longText uppercase">Hướng dẫn sử dụng</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar> <nav-feature></nav-feature></template>
    <Transition name="slide-fade">
      <div
        class="home w-full h-full text-left text-base"
        v-if="isLoading == false"
      >
        <div v-if="checkRoute(1)" class="p-2">
          <div class="formatLine">
            <strong>Chấm công</strong> là một tác vụ quen thuộc và vô cùng quan
            trọng trong các doanh nghiệp nhằm thu thập thời gian làm việc của
            mỗi nhân viên theo thời gian thực, bao gồm: check in (giờ vào),
            check out (giờ ra), phân ca, làm thêm, nghỉ phép, đi muộn, về sớm.
            <br />
          </div>
          <div class="formatLine">
            Phân hệ <strong>Chấm công</strong> của BTP HRM cung cấp các đối
            tượng chính hỗ trợ người dùng theo dõi được đầy đủ chấm công của
            nhân sự như:
          </div>
          <ul class="ml-5">
            <li
              class="cursor-pointer hover:text-red-500 hover:underline"
              @click="this.$router.push('/user-manual/timekeep/tab=2')"
            >
              1. Bảng phân ca
            </li>
            <li class="cursor-pointer hover:text-red-500 hover:underline">
              2. Chấm công
            </li>
            <li class="cursor-pointer hover:text-red-500 hover:underline">
              3. Bảng đăng ký ca
            </li>
            <li class="cursor-pointer hover:text-red-500 hover:underline">
              4. Phân ca làm việc
            </li>
            <li class="cursor-pointer hover:text-red-500 hover:underline">
              5. Bảng chấm công ăn
            </li>
            <li class="cursor-pointer hover:text-red-500 hover:underline">
              6. Quản lý ngày nghỉ
            </li>
            <li class="cursor-pointer hover:text-red-500 hover:underline">
              7. Tự động chấm công
            </li>
            <li class="cursor-pointer hover:text-red-500 hover:underline">
              8. Máy chấm công
            </li>
            <li class="cursor-pointer hover:text-red-500 hover:underline">
              9. Quản lý phép, bù
            </li>
            <li class="cursor-pointer hover:text-red-500 hover:underline">
              10. Báo cáo
            </li>
          </ul>
          <div class="p-2 w-full">
            <img :src="tongquan" class="rounded-md m-auto" alt="" />
          </div>
        </div>
        <div v-if="checkRoute(2)" class="p-2">
          <div class="formatLine">
            Bảng phân ca thể hiện ca làm việc được phân trong ngày, ngày nghỉ
            của từng nhân sự trong 1 kỳ công, giúp quản lý có thể theo dõi tổng
            quan, cũng như chi tiết thời gian làm việc của nhân sự. <br />
          </div>
          <div class="formatLine">
            Ngoài ra trên bảng phân ca còn có các thông tin cơ bản của nhân sự
            như: Mã nhân sự, Họ tên, Phòng ban, Vị trí. <br />
          </div>
          Để sử dụng Bảng phân ca, người dùng thực hiện quy trình với 2 bước sau
          : <br />
          <strong>Bước 1:</strong> Tạo mới phân ca. <br />
          <strong>Bước 2:</strong> Theo dõi và quản lý Bảng phân ca. <br />
          <br />
          <strong>Bước 1.</strong> Tạo mới phân ca <br />
          <div class="formatLine">
            Bảng phân ca được lấy dữ liệu từ Phân ca làm việc. Phân ca làm việc
            sau khi được tạo mới và duyệt sẽ được thể hiện tại đây. Bạn có thể
            xem hướng dẫn phần Phân ca tại Hướng dẫn chi tiết Phân ca làm việc
            <br />
          </div>
          <strong>Bước 2.</strong> Theo dõi và quản lý Bảng phân ca <br />
          <div class="formatLine">
            Giao diện trên Bảng phân ca dễ dàng theo dõi dưới dạng bảng, các cột
            là các ngày trong 1 kỳ công, mỗi hàng thể hiện ca làm việc của 1
            nhân sự và trong mỗi ô là mã của ca làm việc được phân. Ngày thứ 7,
            chủ nhật, các ngày nghỉ tuần và các ngày nhân sự không làm việc
            (Nghỉ việc, chưa đi làm,..) được thể hiện bằng các ô màu xám. Ô
            trống có nghĩa là ngày hôm đấy nhân sự không có ca làm việc.
          </div>
          <div class="p-2 w-full">
            <img :src="chamcong" class="rounded-md m-auto" alt="" />
          </div>
          <div class="formatLine">
            Khi click vào một ô tướng ứng với một ngày làm việc trên bảng phân
            ca có thể xem được thông tin chi tiết ca làm việc trong ngày của
            nhân sự.
          </div>
          <div class="p-2 w-full">
            <img :src="chitietcc" class="rounded-md m-auto" alt="" />
          </div>
          <div class="formatLine">
            Để sử dụng các tác vụ trên bảng phân ca, click vào một trong các
            biểu tượng trên bảng phân ca.
          </div>
          <div>
            <table class="border">
              <thead class="border">
                <th class="cellTable">STT</th>
                <th class="cellTable">Tên trường</th>
                <th class="cellTable">Quyền sử dụng</th>
                <th class="cellTable">Mô tả</th>
              </thead>
              <tbody>
                <tr class="border">
                  <td class="cellTable">1</td>
                  <td class="cellTable">Thời gian</td>
                  <td class="cellTable">Quyền xem, Quyền quản lý</td>
                  <td class="cellTable">
                    Chọn thời gian tháng, năm của kỳ công cần xem
                  </td>
                </tr>
                <tr class="border">
                  <td class="cellTable">2</td>
                  <td class="cellTable">Export</td>
                  <td class="cellTable">Quyền quản lý</td>
                  <td class="cellTable">
                    Xuất dữ liệu bảng phân ca ra file excel
                  </td>
                </tr>
                <tr class="border">
                  <td class="cellTable">3</td>
                  <td class="cellTable">Cài đặt</td>
                  <td class="cellTable">Quyền quản lý</td>
                  <td class="cellTable">
                    Đưa người dùng đến phần Cài đặt chấm công
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="checkRoute(3)" class="p-2">
          <div class="formatLine">
            Phân ca làm việc là hành động mà người quản lý tiến hành phân ca cho
            nhân sự của mình, sau khi được duyệt thì sẽ hiển thị trên Bảng phân
            ca.
          </div>
          <div class="formatLine">
            Để quản lý các Phân ca trên Hệ thống , bạn thực hiện bước sau:
          </div>
          <strong> Bước 1. Tạo mới phân ca </strong>
          <div class="formatLine">
            Bảng phân ca được lấy dữ liệu từ Tính năng Phân ca làm việc. Phân ca
            làm việc sau khi được tạo mới và duyệt sẽ được thể hiện tại đây.
          </div>
          <br />
          <div class="formatLine font-medium">
            Có 2 cách để tạo mới phân ca:
          </div>
          <div class="formatLine">
            Cách 1: Tạo mới trực tiếp phân ca làm việc trên phần mềm.<br />
            Để tạo mới phân ca làm việc, bạn thực hiện các thao tác sau: <br />
            ● Vào phân hệ Chấm công > Chọn icon tạo mới ở góc trái màn hình >
            Chọn Phân ca <br />
            ● Nhập các thông tin trong màn hình tạo mới phân ca .Chọn để lưu lại
            thông tin Bảng phân ca.
          </div>
        </div>
        <div v-if="checkRoute(4)">s</div>
        <div v-if="checkRoute(5)">g</div>
        <div v-if="checkRoute(6)">e</div>
        <div v-if="checkRoute(7)">r</div>
        <div v-if="checkRoute(8)">k</div>
        <div v-if="checkRoute(9)">ta</div>
        <div v-if="checkRoute(10)">aa</div>
      </div>
    </Transition>
  </person-layout>
  <loading-overlay :isLoading="isLoading"></loading-overlay>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarUserManual from "@/components/sidebar/SidebarUserManual.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import tongquan from "@/assets/images/timekeep/tongquan.png";
import chamcong from "@/assets/images/timekeep/chamcong.png";
import chitietcc from "@/assets/images/timekeep/chitietcc.png";
import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
export default {
  components: {
    PersonLayout,
    SidebarUserManual,
    NavbarSocial,
    NavFeature,
  },
  data() {
    return {
      tongquan: tongquan,
      chamcong: chamcong,
      chitietcc: chitietcc,
    };
  },
  methods: {},
  setup() {
    const route = useRoute();
    const isLoading = ref(true);
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
    const checkRoute = (index) => {
      if (route.params.key == index) {
        return true;
      } else {
        return false;
      }
    };
    return {
      isLoading,
      route,
      checkRoute,
    };
  },
};
</script>

<style>
.formatLine {
  text-indent: 12px;
}
</style>
