<template>
  <div class="menu-box text-cyan-600 p-4">
    <div class="app-menu-group">
      <!--
      <div class="app-menu-caption">WORKPLACE</div>
      <div class="group-content" style="border-right: 1px solid #ccc">
        <router-link to="/error" class="app-menu-item app-item">
          <img class="w-10 h-10" :src="img_2" alt="" />
          <span class="nowrap">Công việc</span>
        </router-link>
        <router-link to="/error" class="app-menu-item app-item">
          <img class="w-10 h-10" :src="img_11" alt="" />
          <span class="nowrap">Quy trình</span>
        </router-link>
        <router-link to="/error" class="app-menu-item app-item">
          <img class="w-10 h-10" :src="img_5" alt="" />
          <span class="nowrap">Ký số</span>
        </router-link>
        <router-link to="/error" class="app-menu-item app-item">
          <img class="w-10 h-10" :src="img_2" alt="" />
          <span class="nowrap">Tài liệu</span>
        </router-link>
        <router-link to="/error" class="app-menu-item app-item">
          <img class="w-10 h-10" :src="img_2" alt="" />
          <span class="nowrap">Văn bản</span>
        </router-link>
        <router-link to="/error" class="app-menu-item app-item">
          <img class="w-10 h-10" :src="img_2" alt="" />
          <span class="nowrap">Lịch biểu</span>
        </router-link>
      </div>
    </div>
    -->
      <div class="app-menu-group">
        <div class="app-menu-caption">HRM</div>
        <div class="group-content">
          <router-link
            to="/approval-approval-private/type=ALL"
            class="app-menu-item app-item"
            :class="{ disabledDiv: checkRole('APPROVAL') }"
          >
            <img class="w-10 h-10" :src="img_9" alt="" />
            <span class="nowrap">Đơn từ</span>
          </router-link>
          <router-link
            to="/candidate-profile/all"
            class="app-menu-item app-item"
            :class="{ disabledDiv: checkRole('RECRUITMENT') }"
          >
            <img class="w-10 h-10" :src="img_6" alt="" />
            <span class="nowrap">Tuyển dụng</span>
          </router-link>
          <router-link
            to="/personnel/type=WORKING"
            class="app-menu-item app-item"
            :class="{ disabledDiv: checkRole('PERSONNEL') }"
          >
            <img class="w-10 h-10" :src="img_7" alt="" />
            <span class="nowrap">Nhân sự</span>
          </router-link>
          <router-link
            to="/timekeep-attendance"
            class="app-menu-item app-item"
            :class="{ disabledDiv: checkRole('TIMEKEEP') }"
          >
            <img class="w-10 h-10" :src="img_5" alt="" />
            <span class="nowrap">Chấm công</span>
          </router-link>
          <!--
        <router-link to="/error" class="app-menu-item app-item">
          <img class="w-10 h-10" :src="img_4" alt="" />
          <span class="nowrap">Đào tạo</span>
        </router-link>
        -->
          <router-link
            to="/asset"
            class="app-menu-item app-item"
            :class="{ disabledDiv: checkRole('ASSET') }"
          >
            <img class="w-10 h-10" :src="img_12" alt="" />
            <span class="nowrap">Tài sản</span>
          </router-link>

          <router-link
            to="/wage-wage"
            class="app-menu-item app-item"
            :class="{ disabledDiv: checkRole('WAGE') }"
          >
            <img class="w-10 h-10" :src="img_3" alt="" />
            <span class="nowrap">Bảng lương</span>
          </router-link>
          <router-link
            to="/administrative-violation"
            class="app-menu-item app-item"
            :class="{ disabledDiv: checkRole('APPROVAL') }"
          >
            <img class="w-10 h-10" :src="img_1" alt="" />
            <span class="nowrap">Hành chính</span>
          </router-link>
          <!-- <router-link to="/error" class="app-menu-item app-item">
          <img class="w-10 h-10" :src="img_8" alt="" />
          <span class="nowrap">KPI</span>
        </router-link> -->
        </div>
      </div>
      <!-- <div class="app-menu-group">
      <div class="app-menu-caption">CRM</div>
      <div class="group-content" style="border-right: 1px solid #ccc">
        <a href="" class="app-menu-item app-item">
          <img class="w-10 h-10" :src="img_2" alt="" />
          <span class="nowrap">Marketing</span>
        </a>
        <a href="" class="app-menu-item app-item">
          <img class="w-10 h-10" :src="img_2" alt="" />
          <span class="nowrap">CSKH</span>
        </a>
        <a href="" class="app-menu-item app-item">
          <img class="w-10 h-10" :src="img_2" alt="" />
          <span class="nowrap">Bán hàng</span>
        </a>
        <a href="" class="app-menu-item app-item">
          <img class="w-10 h-10" :src="img_2" alt="" />
          <span class="nowrap">Thu chi</span>
        </a>
        <a href="" class="app-menu-item app-item">
          <img class="w-10 h-10" :src="img_2" alt="" />
          <span class="nowrap">Kho hàng</span>
        </a>
        <a href="" class="app-menu-item app-item">
          <img class="w-10 h-10" :src="img_2" alt="" />
          <span class="nowrap">Mua hàng</span>
        </a>
      </div>
    </div> 
    <div class="app-menu-group">
      <div class="app-menu-caption">ADVANCE</div>
      <div class="group-content">
        <router-link to="/error" class="app-menu-item app-item">
          <img class="w-10 h-10" :src="img_2" alt="" />
          <span class="nowrap">Hỗ trợ 247</span>
        </router-link>
        <router-link to="/error" class="app-menu-item app-item">
          <img class="w-10 h-10" :src="img_2" alt="" />
          <span class="nowrap">Báo cáo</span>
        </router-link>
        <router-link to="/error" class="app-menu-item app-item">
          <img class="w-10 h-10" :src="img_2" alt="" />
          <span class="nowrap">Tự động</span>
        </router-link>
        <router-link to="/error" class="app-menu-item app-item">
          <img class="w-10 h-10" :src="img_2" alt="" />
          <span class="nowrap">Clounds</span>
        </router-link>
        <router-link to="/error" class="app-menu-item app-item">
          <img class="w-10 h-10" :src="img_2" alt="" />
          <span class="nowrap">Tài nguyên</span>
        </router-link>
        <router-link to="/error" class="app-menu-item app-item">
          <img class="w-10 h-10" :src="img_2" alt="" />
          <span class="nowrap">Open API</span>
        </router-link>
      </div>-->
    </div>
  </div>
</template>

<script>
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
import { FormatRoleDisable } from "@/constants/FormatAll";
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
    const date = new Date();
    const month = date.getMonth() + 1;
    const profile = useUserProfile();
    const { userProfile } = storeToRefs(profile);
    const checkRole = (index) => {
      return FormatRoleDisable(index, userProfile.value);
    };
    return {
      userProfile,
      checkRole,
      date,
      month,
    };
  },
};
</script>

<style scoped>
.menu-box {
  grid-template-columns: repeat(1, 1fr);
  display: grid;
}
.app-menu-caption {
  text-align: center;
  max-width: 100%;
  padding: 0 15px;
  margin-bottom: 10px;
  color: #000;
  font-weight: 600;
  font-size: 18px;
}
.group-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 100%;
  grid-column-gap: 5px;
  padding: 0 15px;
}
.app-menu-item {
  padding: 10px;
  text-align: center;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 8px;
  margin-bottom: 10px;
  position: relative;
  transition: 0.2s ease-in-out;
  cursor: pointer;
}
.app-menu-item > span {
  display: block;
  white-space: nowrap;
  margin-top: 10px;
  line-height: 1;
  color: #000;
  font-size: 14px;
}
</style>
