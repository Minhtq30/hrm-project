<template>
  <Transition name="slide-fade">
    <div
      class="button-create relative group"
      title="Tạo mới đơn từ"
      v-if="isLoadingShow == false"
    >
      <div
        class="text-black text-sm absolute w-48 z-10 bg-white left-0 top-full rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible p-2 drop-shadow-xl before:content-[''] before:h-5 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
      >
        <ul>
          <li
            class="p-[10px] hover:bg-slate-100 hover:rounded-lg flex justify-between items-center relative sub-dropdown"
            @click="handleOpenCreateApproval()"
          >
            Đơn từ
            <i class="fas fa-chevron-right"></i>
            <ul
              class="absolute opacity-0 invisible top-0 left-full bg-white w-full sub-dropdown-content p-2 drop-shadow-xl"
            >
              <li
                class="sub-item"
                @click.stop="this.$router.push('/approval-leave/me')"
                v-if="CheckCreateApproval[2]?.leave_approval_create == 1"
              >
                Đơn xin nghỉ
              </li>
              <li
                class="sub-item"
                @click.stop="this.$router.push('/approval-absence/me')"
                v-if="CheckCreateApproval[3]?.meeting_approval_create == 1"
              >
                Đơn xin vắng mặt
              </li>
              <li
                class="sub-item"
                @click.stop="this.$router.push('/approval-overtime/me')"
                v-if="CheckCreateApproval[4]?.overtime_approval_create == 1"
              >
                Đơn làm thêm
              </li>
              <li
                class="sub-item"
                @click.stop="this.$router.push('/approval-inout/me')"
                v-if="CheckCreateApproval[0]?.inout_approval_create == 1"
              >
                Đơn check in/out
              </li>
              <li
                class="sub-item"
                @click.stop="this.$router.push('/approval-shiftchange/me')"
                v-if="CheckCreateApproval[7]?.shift_change_approval_create == 1"
              >
                Đơn đổi ca
              </li>
              <li
                class="sub-item"
                @click.stop="this.$router.push('/approval-shiftmore/me')"
                v-if="CheckCreateApproval[8]?.shift_more_approval_create == 1"
              >
                Đơn tăng ca
              </li>
              <li
                class="sub-item"
                @click.stop="this.$router.push('/approval-shiftregister/me')"
                v-if="
                  CheckCreateApproval[9]?.shift_register_approval_create == 1
                "
              >
                Đơn đăng kí ca
              </li>
              <li
                class="sub-item"
                @click.stop="this.$router.push('/approval-mission/me')"
                v-if="
                  CheckCreateApproval[5]?.private_mission_approval_create == 1
                "
              >
                Đơn công tác
              </li>
              <li
                class="sub-item"
                @click.stop="this.$router.push('/approval-worktime/me')"
                v-if="
                  CheckCreateApproval[6]
                    ?.privilege_application_approval_create == 1
                "
              >
                Đơn làm theo chế độ
              </li>
              <li
                class="sub-item"
                @click.stop="this.$router.push('/approval-resign/me')"
                v-if="
                  CheckCreateApproval[1]?.leave_application_approval_create == 1
                "
              >
                Đơn thôi việc
              </li>
              <li
                class="sub-item"
                @click.stop="this.$router.push('/upload-posm/me')"
                v-if="
                  CheckCreateApproval[1]?.leave_application_approval_create == 1
                "
              >
                Upload ảnh POSM
              </li>
            </ul>
          </li>
          <li
            class="p-[10px] hover:bg-slate-100 hover:rounded-lg flex justify-between items-center relative sub-dropdown"
            v-if="
              checkRole([
                'APPROVAL_APPROVAL_MANAGE_ALL',
                'APPROVAL_APPROVAL_MANAGE_COMPANY',
                'APPROVAL_APPROVAL_MANAGE_BRANCH',
                'APPROVAL_APPROVAL_MANAGE_DEPARTMENT',
              ])
            "
          >
            Tạo đơn hộ
            <i class="fas fa-chevron-right"></i>
            <ul
              class="absolute opacity-0 invisible top-0 left-full bg-white w-full sub-dropdown-content p-2 drop-shadow-xl"
            >
              <li
                class="sub-item"
                @click="this.$router.push('/approval-leave/help')"
                v-if="CheckCreateApproval[2]?.leave_approval_create == 1"
              >
                Đơn xin nghỉ
              </li>
              <li
                class="sub-item"
                @click="this.$router.push('/approval-absence/help')"
                v-if="CheckCreateApproval[3]?.meeting_approval_create == 1"
              >
                Đơn xin vắng mặt
              </li>
              <li
                class="sub-item"
                @click="this.$router.push('/approval-overtime/help')"
                v-if="CheckCreateApproval[4]?.overtime_approval_create == 1"
              >
                Đơn làm thêm
              </li>
              <li
                class="sub-item"
                @click="this.$router.push('/approval-inout/help')"
                v-if="CheckCreateApproval[0]?.inout_approval_create == 1"
              >
                Đơn check in/out
              </li>
              <li
                class="sub-item"
                @click="this.$router.push('/approval-shiftchange/help')"
                v-if="CheckCreateApproval[7]?.shift_change_approval_create == 1"
              >
                Đơn đổi ca
              </li>
              <li
                class="sub-item"
                @click="this.$router.push('/approval-shiftmore/help')"
                v-if="CheckCreateApproval[8]?.shift_more_approval_create == 1"
              >
                Đơn tăng ca
              </li>
              <li
                class="sub-item"
                @click="this.$router.push('/approval-shiftregister/help')"
                v-if="
                  CheckCreateApproval[9]?.shift_register_approval_create == 1
                "
              >
                Đơn đăng kí ca
              </li>
              <li
                class="sub-item"
                @click="this.$router.push('/approval-mission/help')"
                v-if="
                  CheckCreateApproval[5]?.private_mission_approval_create == 1
                "
              >
                Đơn công tác
              </li>
              <li
                class="sub-item"
                @click="this.$router.push('/approval-worktime/help')"
                v-if="
                  CheckCreateApproval[6]
                    ?.privilege_application_approval_create == 1
                "
              >
                Đơn làm theo chế độ
              </li>
              <li
                class="sub-item"
                @click.stop="this.$router.push('/approval-resign/help')"
                v-if="
                  CheckCreateApproval[1]?.leave_application_approval_create == 1
                "
              >
                Đơn thôi việc
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </Transition>
  <teleport to="#app">
    <modal-view
      :isOpen="isOpenCreateApproval"
      :handleCloseDetail="handleCloseCreateApproval"
    >
      <div>
        <h1 class="header-modal">tạo mới đơn từ</h1>
        <div class="text-left p-4 w-[800px] grid grid-cols-2 gap-2">
          <div
            class="approval-card"
            style="margin-right: 5px; height: 100%"
            @click="this.$router.push('/approval-leave/me')"
            v-if="CheckCreateApproval[2]?.leave_approval_create == 1"
          >
            <div class="content-approval">
              <b>Đơn xin nghỉ</b><br /><span
                >Đơn xin nghỉ phát sinh khi bạn muốn nghỉ nhiều ngày làm
                việc.</span
              >
            </div>
          </div>
          <div
            class="approval-card"
            style="margin-right: 5px; height: 100%"
            @click="this.$router.push('/approval-absence/me')"
            v-if="CheckCreateApproval[3]?.meeting_approval_create == 1"
          >
            <div class="content-approval">
              <b>Đơn vắng mặt</b><br /><span
                >Đơn vắng mặt phát sinh khi bạn có nhu cầu vắng mặt 1 khoảng
                thời gian trong ca làm việc.</span
              >
            </div>
          </div>
          <div
            class="approval-card"
            style="margin-right: 5px; height: 100%"
            @click="this.$router.push('/approval-overtime/me')"
            v-if="CheckCreateApproval[4]?.overtime_approval_create == 1"
          >
            <div class="content-approval">
              <b>Đơn làm thêm</b><br /><span
                >Đơn làm thêm phát sinh khi bạn có khoảng thời gian làm thêm
                không nằm trong ca làm việc.</span
              >
            </div>
          </div>
          <div
            class="approval-card"
            style="margin-right: 5px; height: 100%"
            @click="this.$router.push('/approval-inout/me')"
            v-if="CheckCreateApproval[0]?.inout_approval_create == 1"
          >
            <div class="content-approval">
              <b>Đơn check in/out</b><br /><span
                >Đơn checkin/out phát sinh khi bạn quên chấm công lúc đến hoặc
                lúc về.</span
              >
            </div>
          </div>
          <div
            class="approval-card"
            style="margin-right: 5px; height: 100%"
            @click="this.$router.push('/approval-shiftchange/me')"
            v-if="CheckCreateApproval[7]?.shift_change_approval_create == 1"
          >
            <div class="content-approval">
              <b>Đơn đổi ca</b><br /><span
                >Đơn đổi ca phát sinh khi bạn muốn đổi sang một ca làm việc khác
                với ca đã được phân.</span
              >
            </div>
          </div>
          <div
            class="approval-card"
            style="margin-right: 5px; height: 100%"
            @click="this.$router.push('/approval-shiftmore/me')"
            v-if="CheckCreateApproval[8]?.shift_more_approval_create == 1"
          >
            <div class="content-approval">
              <b>Đơn tăng ca</b><br /><span
                >Đơn tăng ca phát sinh khi bạn có nhu cầu làm thêm một ca nào đó
                ngoài ca làm việc đã được phân.</span
              >
            </div>
          </div>
          <div
            class="approval-card"
            style="margin-right: 5px; height: 100%"
            @click="this.$router.push('/approval-shiftregister/me')"
            v-if="CheckCreateApproval[9]?.shift_register_approval_create == 1"
          >
            <div class="content-approval">
              <b>Đơn đăng kí ca</b><br /><span
                >Đơn đăng ký ca phát sinh khi bạn cần đăng ký thêm ca làm
                việc.</span
              >
            </div>
          </div>
          <div
            class="approval-card"
            style="margin-right: 5px; height: 100%"
            @click="this.$router.push('/approval-mission/me')"
            v-if="CheckCreateApproval[5]?.private_mission_approval_create == 1"
          >
            <div class="content-approval">
              <b>Đơn công tác</b><br /><span
                >Đơn công tác phát sinh khi bạn được yêu cầu đi công tác và
                không thể chấm công trên công ty.</span
              >
            </div>
          </div>
          <div
            class="approval-card"
            style="margin-right: 5px; height: 100%"
            @click="this.$router.push('/approval-worktime/me')"
            v-if="
              CheckCreateApproval[6]?.privilege_application_approval_create == 1
            "
          >
            <div class="content-approval">
              <b>Đơn làm theo chế độ</b><br /><span
                >Đơn làm theo chế độ phát sinh khi bạn được hưởng chế độ đi muộn
                – về sớm.</span
              >
            </div>
          </div>
          <div
            class="approval-card"
            style="margin-right: 5px; height: 100%"
            @click="this.$router.push('/approval-resign/me')"
            v-if="
              CheckCreateApproval[1]?.leave_application_approval_create == 1
            "
          >
            <div class="content-approval">
              <b>Đơn thôi việc</b><br /><span
                >Đơn thôi việc phát sinh khi bạn nghỉ việc.</span
              >
            </div>
          </div>
          <div
            class="approval-card"
            style="margin-right: 5px; height: 100%"
            @click="this.$router.push('/upload-posm/me')"
            v-if="
              CheckCreateApproval[1]?.leave_application_approval_create == 1
            "
          >
            <div class="content-approval">
              <b>Upload ảnh POSM</b><br /><span>Upload ảnh POSM</span>
            </div>
          </div>
        </div>
      </div>
    </modal-view>
  </teleport>
</template>

<script>
import { FormatRole } from "@/constants/FormatAll";
import { ref } from "@vue/runtime-core";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { useSettingApproval } from "@/store/modules/settingApproval/allApproval";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const isLoadingShow = ref(true);
    const isOpenCreateApproval = ref(false);
    const profile = useUserProfile();
    const setting = useSettingApproval();
    const { userProfile } = storeToRefs(profile);
    const { CheckCreateApproval } = storeToRefs(setting);
    const EndTimeLoading = () => {
      isLoadingShow.value = false;
    };
    setting.CheckCreateApprovalAction({
      EndTimeLoading,
    });
    if (CheckCreateApproval.value == null) {
      setting.CheckCreateApprovalAction({
        EndTimeLoading,
      });
    }
    const handleCloseCreateApproval = () => {
      isOpenCreateApproval.value = false;
    };
    const handleOpenCreateApproval = () => {
      isOpenCreateApproval.value = true;
    };
    const checkRole = (index) => {
      for (let i = 0; i < index?.length; i++) {
        if (FormatRole(index[i], userProfile.value) == true) {
          return true;
        }
      }
    };
    return {
      CheckCreateApproval,
      isLoadingShow,
      isOpenCreateApproval,
      userProfile,
      handleCloseCreateApproval,
      handleOpenCreateApproval,
      checkRole,
      EndTimeLoading,
    };
  },
};
</script>

<style>
.approval-card {
  border: 2px solid #f0f4f5;
  border-radius: 6px;
  padding: 10px;
  display: flex;
  align-items: center;
  min-height: 90px;
  transition: all 0.5s ease-in-out 0s;
  cursor: pointer;
}
.approval-card:hover {
  border-color: var(--color-primary);
}
.content-approval b {
  color: #111;
}
.content-approval {
  color: #999;
}
</style>
