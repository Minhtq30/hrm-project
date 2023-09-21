<template>
  <person-layout>
    <template v-slot:navbar>
      <navbar-social></navbar-social>
    </template>
    <div class="m-auto">
      <div class="container bg-slate-100 w-1/2 mx-auto rounded-lg mt-10">
        <div class="p-2">
          <h2 class="uppercase text-left font-semibold py-2 ml-4">hệ thống</h2>
          <hr />
          <div class="grid grid-cols-10">
            <div
              class="flex flex-col items-center col-span-2 mt-5 cursor-pointer hover:text-red-500 hover:font-medium"
              @click.prevent="handleToAdmin"
              v-if="checkRole()"
            >
              <img class="w-10 h-10" :src="img_1" alt="" />
              <p class="text-sm mt-1">Hệ thống</p>
            </div>
            <div
              class="flex flex-col items-center col-span-2 mt-5 cursor-pointer hover:text-red-500 hover:font-medium"
              @click.prevent="this.$router.push('/error')"
            >
              <img class="w-10 h-10" :src="img_11" alt="" />
              <p class="text-sm mt-1">Tự động</p>
            </div>
            <div
              class="flex flex-col items-center col-span-2 mt-5 cursor-pointer hover:text-red-500 hover:font-medium"
              @click.prevent="this.$router.push('/setting-mail')"
            >
              <img class="w-10 h-10" :src="img_1" alt="" />
              <p class="text-sm mt-1">Email/SMS</p>
            </div>
            <div
              class="flex flex-col items-center col-span-2 mt-5 cursor-pointer hover:text-red-500 hover:font-medium"
              @click.prevent="this.$router.push('/error')"
            >
              <img class="w-10 h-10" :src="img_1" alt="" />
              <p class="text-sm mt-1">Biểu mẫu</p>
            </div>
          </div>
        </div>
      </div>
      <div class="container bg-slate-100 w-1/2 mx-auto rounded-lg mt-8">
        <div class="p-2">
          <h2 class="uppercase text-left font-semibold py-2 ml-4">workplace</h2>
          <hr />
          <div class="grid grid-cols-10">
            <div
              class="flex flex-col items-center col-span-2 mt-5 cursor-pointer hover:text-red-500 hover:font-medium"
            >
              <img class="w-10 h-10" :src="img_1" alt="" />
              <p class="text-sm mt-1">Social</p>
            </div>
            <div
              class="flex flex-col items-center col-span-2 mt-5 cursor-pointer hover:text-red-500 hover:font-medium"
              @click.prevent="this.$router.push('/error')"
            >
              <img class="w-10 h-10" :src="img_2" alt="" />
              <p class="text-sm mt-1">Công việc</p>
            </div>
            <div
              class="flex flex-col items-center col-span-2 mt-5 cursor-pointer hover:text-red-500 hover:font-medium"
              @click.prevent="this.$router.push('/error')"
            >
              <img class="w-10 h-10" :src="img_9" alt="" />
              <p class="text-sm mt-1">Văn bản</p>
            </div>
            <div
              class="flex flex-col items-center col-span-2 mt-5 cursor-pointer hover:text-red-500 hover:font-medium"
              @click.prevent="this.$router.push('/error')"
            >
              <img class="w-10 h-10" :src="img_10" alt="" />
              <p class="text-sm mt-1">Lịch biểu</p>
            </div>
          </div>
        </div>
      </div>
      <div class="container bg-slate-100 w-1/2 mx-auto rounded-lg mt-8">
        <div class="p-2">
          <h2 class="uppercase text-left font-semibold py-2 ml-4">hrm</h2>
          <hr />
          <div class="grid grid-cols-10">
            <div
              class="flex flex-col items-center col-span-2 mt-5 cursor-pointer hover:text-red-500 hover:font-medium"
              @click.prevent="this.$router.push('/approval-general-setting')"
              v-if="checkRole('APPROVAL_MANAGE_ALL')"
            >
              <img class="w-10 h-10" :src="img_9" alt="" />
              <p class="text-sm mt-1">Đơn từ</p>
            </div>
            <div
              class="flex flex-col items-center col-span-2 mt-5 cursor-pointer hover:text-red-500 hover:font-medium"
              @click="this.$router.push('/asset-settings-category-currency')"
              v-if="checkRole('ASSET_MANAGE_ALL')"
            >
              <img class="w-10 h-10" :src="img_12" alt="" />
              <p class="text-sm mt-1">Tài sản</p>
            </div>
            <div
              class="flex flex-col items-center col-span-2 mt-5 cursor-pointer hover:text-red-500 hover:font-medium"
              v-if="
                checkRole(
                  'RECRUITMENT_REQUEST_MANAGE_ALL' ||
                    'RECRUITMENT_RECRUITMENT_MANAGE_ALL'
                )
              "
              @click="
                this.$router.push('/setting/recruitment-settings-general')
              "
            >
              <img class="w-10 h-10" :src="img_6" alt="" />
              <p class="text-sm mt-1">Tuyển dụng</p>
            </div>
            <div
              class="flex flex-col items-center col-span-2 mt-5 cursor-pointer hover:text-red-500 hover:font-medium"
              v-if="checkRole('PERSONNEL_PROFILE_MANAGE_ALL')"
            >
              <router-link to="./personnel-profile-settings-general"
                ><img class="w-10 h-10" :src="img_7" alt="" />
                <p class="text-sm mt-1">Nhân sự</p></router-link
              >
            </div>
            <div
              class="flex flex-col items-center col-span-2 mt-5 cursor-pointer hover:text-red-500 hover:font-medium"
              @click.prevent="this.$router.push('/timekeep-setting-shift')"
              v-if="checkRole('TIMEKEEP_TIMEKEEP_MANAGE_ALL')"
            >
              <img class="w-10 h-10" :src="img_5" alt="" />
              <p class="text-sm mt-1">Chấm công</p>
            </div>
            <div
              class="flex flex-col items-center col-span-2 mt-5 cursor-pointer hover:text-red-500 hover:font-medium"
              @click.prevent="this.$router.push('/settings/wage-settings-type')"
              v-if="checkRole('WAGE_MANAGE_ALL')"
            >
              <img class="w-10 h-10" :src="img_3" alt="" />
              <p class="text-sm mt-1">Bảng lương</p>
            </div>
            <div
              class="flex flex-col items-center col-span-2 mt-5 cursor-pointer hover:text-red-500 hover:font-medium"
              @click.prevent="this.$router.push('/error')"
              v-if="false"
            >
              <img class="w-10 h-10" :src="img_8" alt="" />
              <p class="text-sm mt-1">KPI</p>
            </div>
            <div
              class="flex flex-col items-center col-span-2 mt-5 cursor-pointer hover:text-red-500 hover:font-medium"
              @click.prevent="this.$router.push('/error')"
              v-if="false"
            >
              <img class="w-10 h-10" :src="img_4" alt="" />
              <p class="text-sm mt-1">Đào tạo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </person-layout>
</template>

<script>
import PersonLayout from "@/layouts/person-layout.vue";
import NavbarSocial from "@/components/NavbarSocial3.vue";
import img_1 from "@/assets/module-icons/document.svg";
import img_2 from "@/assets/module-icons/work.svg";
import img_3 from "@/assets/module-icons/wage.svg";
import img_4 from "@/assets/module-icons/training.svg";
import img_5 from "@/assets/module-icons/timekeep.svg";
import img_6 from "@/assets/module-icons/recruitment.svg";
import img_7 from "@/assets/module-icons/personnel.svg";
import img_8 from "@/assets/module-icons/evaluation.svg";
import img_9 from "@/assets/module-icons/diploma.svg";
import img_10 from "@/assets/module-icons/calendar.svg";
import img_11 from "@/assets/module-icons/automation.svg";
import img_12 from "@/assets/module-icons/asset.svg";
import { useRouter } from "vue-router";
import { FormatRole } from "@/constants/FormatAll";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
export default {
  data() {
    return {
      img_1: img_1,
      img_2: img_2,
      img_3: img_3,
      img_4: img_4,
      img_5: img_5,
      img_6: img_6,
      img_7: img_7,
      img_8: img_8,
      img_9: img_9,
      img_10: img_10,
      img_11: img_11,
      img_12: img_12,
    };
  },
  setup() {
    const router = useRouter();
    const profile = useUserProfile();
    const { userProfile } = storeToRefs(profile);
    const handleToAdmin = () => {
      router.push("/page-user/type=ACTIVE");
    };
    const checkRole = (index) => {
      return FormatRole(index, userProfile.value);
    };
    return {
      handleToAdmin,
      userProfile,
      checkRole,
    };
  },
  components: {
    PersonLayout,
    NavbarSocial,
  },
};
</script>

<style></style>
