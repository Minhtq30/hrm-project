<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-setting-timekeep></sidebar-setting-timekeep>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex flex-col justify-start text-left ml-4">
            <p class="font-medium text-xl">Chấm công</p>
            <p class="">Cài đặt chấm công</p>
          </div>
        </div></navbar-social
      >
    </template>
    <Transition duration="550" name="nested">
      <div class="home w-full h-full" v-if="isLoading == false">
        <div class="p-2">
          <div title="Cài đặt chung">
            <h2
              class="text-left uppercase font-semibold p-2 outer"
              style="color: var(--color-primary)"
            >
              Cài đặt chung
            </h2>
            <div class="w-full p-2 border rounded-lg inner">
              <div class="row-setting w-full grid grid-cols-12 gap-20">
                <div class="flex flex-col text-left col-span-8">
                  <h5 class="text-setting">Mã chấm công lấy theo</h5>
                  <h5 class="sub-setting">
                    Mã chấm công có thể lấy theo mã nhân sự hoặc mã độc lập, tốt
                    nhất nên lấy theo mã nhân sự, trong trường hợp này bạn cần
                    cài đặt thông tin phía dưới
                  </h5>
                </div>
                <div class="col-span-4">
                  <v-select></v-select>
                </div>
              </div>
              <hr />

              <div class="row-setting w-full grid grid-cols-12 gap-20">
                <div class="flex flex-col text-left ml-4 col-span-8">
                  <h5 class="text-setting">
                    Ngày bắt đầu tính công tính công hàng tháng
                  </h5>
                  <h5 class="sub-setting">
                    Là ngày bắt đầu chu kỳ tính công, lấy theo tháng dương lịch
                  </h5>
                </div>
                <div class="col-span-4">
                  <input
                    type="number"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập số ngày"
                  />
                </div>
              </div>
              <hr />
              <div class="row-setting w-full grid grid-cols-12 gap-20">
                <div class="flex flex-col text-left ml-4 col-span-8">
                  <h5 class="text-setting">
                    Khoảng thời gian rỗi được phép miễn chốt
                  </h5>
                  <h5 class="sub-setting">
                    Ví dụ: Trong công đoạn này bạn chọn 15 phút, giả sử nhân sự
                    làm cách nhau 10 phút thì nhân sự đó không cần chốt về ca
                    trước và vào ca sau, hệ thống sẽ tự hiểu làm nối tiếp
                  </h5>
                </div>
                <div class="col-span-4">
                  <hour-picker></hour-picker>
                </div>
              </div>
              <hr />
              <div class="row-setting w-full grid grid-cols-12 gap-20">
                <div class="flex flex-col text-left ml-4 col-span-8">
                  <h5 class="text-setting">Hiển thị trên bảng chấm công</h5>
                  <h5 class="sub-setting">
                    Tùy theo mục đích bạn muốn thể hiện trên bảng chấm công, hãy
                    lựa chọn cài đặt theo mục đích bạn muốn hiển thị trên bảng
                    chấm công
                  </h5>
                </div>
                <div class="col-span-4">
                  <v-select></v-select>
                </div>
              </div>
              <hr />
              <div class="row-setting w-full grid grid-cols-12 gap-20">
                <div class="flex flex-col text-left ml-4 col-span-8">
                  <h5 class="text-setting">Mã bảo mật của api chấm công</h5>
                  <h5 class="sub-setting">
                    Cần mã để nhận biết được chốt vân tay từ máy chấm công nào
                  </h5>
                </div>
                <div class="col-span-4">
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập mã"
                  />
                </div>
              </div>
            </div>
          </div>
          <div title="Chấm công GPS" class="mt-2">
            <h2
              class="text-left uppercase font-semibold p-2 outer"
              style="color: var(--color-primary)"
            >
              Chấm công theo định vị GPS
            </h2>
            <div class="w-full p-2 border rounded-lg inner">
              <div class="row-setting w-full grid grid-cols-12 gap-20">
                <div class="flex flex-col text-left col-span-8">
                  <h5 class="text-setting">Sử dụng GPS</h5>
                  <h5 class="sub-setting">
                    Hãy bật khi công ty bạn dùng chấm công bằng định vị GPS
                  </h5>
                </div>
                <div class="col-span-4">
                  <v-select></v-select>
                </div>
              </div>
              <hr />
              <div class="row-setting w-full grid grid-cols-12 gap-20">
                <div class="flex flex-col text-left ml-4 col-span-8">
                  <h5 class="text-setting">Địa điểm chấm công GPS</h5>
                </div>
                <div class="col-span-4 text-right">
                  <span
                    @click="this.$router.push('/timekeep-setting-gpslocation')"
                    class="cursor-pointer text-lg"
                    ><i class="fal fa-external-link"></i
                  ></span>
                </div>
              </div>
              <hr />
              <div class="row-setting w-full grid grid-cols-12 gap-20">
                <div class="flex flex-col text-left ml-4 col-span-8">
                  <h5 class="text-setting">
                    Cho phép chấm GPS tại các địa điểm được phép mà chưa có phân
                    ca hoặc đơn làm thêm
                  </h5>
                  <h5 class="sub-setting">
                    Khi bật cài đặt này, nhân sự sẽ được chấm công GPS ở những
                    địa điểm đã cài đặt trong hồ sơ nhấn sự.
                  </h5>
                </div>
                <div class="col-span-4 text-right">
                  <div class="check">
                    <input
                      id="isCompensatory "
                      type="checkbox"
                      true-value="1"
                      false-value="0"
                    />
                    <label for="isCompensatory"></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div title="Cài đặt khác" class="mt-2">
            <h2
              class="text-left uppercase font-semibold p-2 outer"
              style="color: var(--color-primary)"
            >
              Cài đặt khác
            </h2>
            <div class="w-full p-2 border rounded-lg inner">
              <div class="row-setting w-full grid grid-cols-12 gap-20">
                <div class="flex flex-col text-left col-span-8">
                  <h5 class="text-setting">Tách dòng chấm công của nhân sự</h5>
                  <h5 class="sub-setting">
                    Trong 1 tháng, nhân sự có thể ở phòng ban, vị trí hoặc mức
                    lương khác nhau. Mỗi giá trị như vậy cần thể hiện trên 1
                    dòng. Vì vậy việc tách dòng là cần thiết để quản lý cái nhìn
                    trực quan.
                  </h5>
                </div>
                <div class="col-span-4">
                  <v-select></v-select>
                </div>
              </div>
              <hr />
              <div class="row-setting w-full grid grid-cols-12 gap-20">
                <div class="flex flex-col text-left col-span-8">
                  <h5 class="text-setting">Hệ số làm tròn</h5>
                  <h5 class="sub-setting">
                    Ví dụ: Bàn cài 0.125 thì khi bạn làm lúc 07:01 thì hệ thống
                    sẽ làm tròn lên 08:00. Thông thường các công ty sẽ không làm
                    tròn và sẽ lấy đúng giờ thực tế.
                  </h5>
                </div>
                <div class="col-span-4">
                  <input
                    type="number"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập hệ số"
                  />
                </div>
              </div>
              <hr />
              <div class="row-setting w-full grid grid-cols-12 gap-20">
                <div class="flex flex-col text-left col-span-8">
                  <h5 class="text-setting">Ứng trước ngày công</h5>
                  <h5 class="sub-setting">
                    Sẽ có nhưng công ty ngày 30 mới kết thúc tháng chấm công
                    nhưng ngày 20 đã phát lương, nhân sự hoàn toàn có thể sử
                    dụng tạm ứng cho nhân viên công từ ngày 20-30 để tính lương.
                  </h5>
                </div>
                <div class="col-span-4">
                  <input
                    type="number"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập hệ số"
                  />
                </div>
              </div>
              <hr />
              <div class="row-setting w-full grid grid-cols-12 gap-20">
                <div class="flex flex-col text-left col-span-8">
                  <h5 class="text-setting">
                    Cho phép quyền quản lý phòng ban có thể sửa chấm công
                  </h5>
                  <h5 class="sub-setting">
                    Khi bật cài đặt này, quản lý phòng ban có thể sửa chấm công
                    của nhân sự phòng ban của mình gồm thêm chốt vân tay, tính
                    toán lại công, thêm ngày công.
                  </h5>
                </div>
                <div class="col-span-4 text-right">
                  <div class="check">
                    <input
                      id="isCompensatory "
                      type="checkbox"
                      true-value="1"
                      false-value="0"
                    />
                    <label for="isCompensatory"></label>
                  </div>
                </div>
              </div>
              <hr />
              <div class="row-setting grid grid-cols-12 gap-20">
                <div class="flex flex-col text-left col-span-8">
                  <h5 class="text-setting">Chốt đơn từ</h5>
                  <h5 class="sub-setting">
                    Chốt đơn từ là 1 nghiệp vụ nhằm không cho phép nhân viên
                    thực hiện tạo đơn từ trong tháng đó nữa.
                  </h5>
                </div>
                <div class="col-span-4">
                  <v-select></v-select>
                </div>
              </div>
              <hr />
              <div class="row-setting grid grid-cols-12 gap-20">
                <div class="flex flex-col text-left ml-4 col-span-8">
                  <h5 class="text-setting">
                    Ngày chốt công tự động sau kỳ công số ngày là
                  </h5>
                  <h5 class="sub-setting">
                    Trường hợp bạn chọn chốt tự động thì hãy chọn ngày bạn muốn
                    chốt
                  </h5>
                </div>
                <div class="col-span-4">
                  <input
                    type="number"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập số ngày"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="UpdateSettingCompensatory()">
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
import hourPicker from "@/components/datePicker/hourPicker.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { ref } from "@vue/reactivity";
export default {
  components: {
    PersonLayout,
    SidebarSettingTimekeep,
    NavbarSocial,
    hourPicker,
  },
  setup() {
    const isLoading = ref(true);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
    return {
      isLoading,
      EndTimeLoading,
    };
  },
};
</script>
