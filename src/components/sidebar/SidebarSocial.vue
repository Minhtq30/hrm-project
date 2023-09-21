<template>
  <div class="p-4 sticky top-0">
    <div class="flex-column w-full">
      <div class="flex items-center mb-5" :title="userProfile.fullname">
        <div
          class="cursor-pointer"
          @click.prevent="this.$router.push(`/social/user/${userProfile.ID}`)"
        >
          <img
            :src="avatar"
            alt=""
            style="
              height: 45px;
              width: 45px;
              border-radius: 50%;
              border: 0.5px solid var(--color-primary);
            "
          />
        </div>
        <div class="flex-col text-left ml-2">
          <div>
            <a
              href=""
              class="font-bold"
              style="color: var(--color-primary)"
              @click.prevent="
                this.$router.push(`/social/user/${userProfile.ID}`)
              "
            >
              {{ userProfile.fullname }}</a
            >
          </div>
          <div
            :title="userProfile.department?.title"
            class="longText"
            style="font-size: 12px"
          >
            {{ userProfile.department?.title }}
          </div>
        </div>
      </div>
      <div class="menu flex-col w-full">
        <menu-item
          class="hover:bg-white/20 text-black py-2"
          v-for="(item, index) in menuTree"
          :key="index"
          :label="item.label"
          :icon="item.icon"
          :depth="0"
          :data="item.children"
          :to="item.to"
          :permission="item.permission"
        />
      </div>
      <div class="menu flex-col w-full">
        <div class="flex pt-4 pb-2">LỐI TẮT</div>
        <menu-item
          class="rounded hover:bg-[#ffffff33]"
          v-for="(item, index) in menuTreeShortcut"
          :key="index"
          :label="item.label"
          :src="item.icon"
          :icon="item.icon"
          :depth="0"
          :data="item.children"
          :to="item.to"
          :permission="item.permission"
        />
      </div>
      <div class="menu flex-col w-full">
        <div class="flex pt-4 pb-2">TIỆN ÍCH</div>
        <menu-item
          class="rounded hover:bg-[#ffffff33]"
          v-for="(item, index) in menuTreeUtilities"
          :key="index"
          :label="item.label"
          :src="item.icon"
          :icon="item.icon"
          :depth="0"
          :data="item.children"
          :to="item.to"
          :permission="item.permission"
        />
        <div
          @click="openChangeSignPage"
          class="rounded hover:bg-[#ffffff33] flex items-center py-2 pl-4 cursor-pointer"
        >
          <i
            style="
              font-size: 18px;
              width: 25px;
              height: 25px;
              text-align: left;
              padding-top: 3px;
              margin-right: 10px;
            "
            class="fas fa-signature flex items-center pl-1"
          ></i>
          <div class="flex-nowrap text-left ml-3 text-[14px]">Chữ ký BTP</div>
        </div>
      </div>
    </div>
    <div class="flex-column w-full hidden">
      <div
        class="cursor-pointer"
        @click.prevent="this.$router.push(`/social/user/${userProfile.ID}`)"
      >
        <img
          :src="avatar"
          alt=""
          style="
            height: 45px;
            width: 45px;
            border-radius: 50%;
            border: 0.5px solid var(--color-primary);
          "
        />
      </div>
      <hr class="mt-2" />
      <div class="flex-column w-full mt-2">
        <div
          v-for="(item, index) in menuTree"
          :key="index"
          class="text-left p-2 cursor-pointer"
        >
          <i :class="item.icon" style="font-size: 24px; text-align: left"></i>
        </div>
      </div>
      <hr class="mt-2" />
      <div class="flex-column w-full mt-2">
        <div
          v-for="(item, index) in menuTree"
          :key="index"
          class="text-left p-2 cursor-pointer"
        >
          <i :class="item.icon" style="font-size: 24px; text-align: left"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuItem from "@/components/sidebar/MenuItem.vue";
import { reactive, ref } from "@vue/reactivity";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
export default {
  components: {
    MenuItem,
  },
  data: () => ({}),
  setup() {
    const active = ref(false);
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const profile = useUserProfile();
    const { userProfile, avatar } = storeToRefs(profile);
    const menuTree = reactive([
      {
        label: "Bảng tin",
        icon: "fal fa-poll-h",
        to: "/social",
        permission: ["PROFILE"],
      },
      {
        label: "Tường công ty",
        icon: "fal fa-building",
        to: "/social/company/1",
        permission: ["PROFILE"],
      },
      {
        label: "Tường cá nhân",
        icon: "fal fa-user",
        to: `/social/user/${userProfile.value.ID}`,
        permission: ["PROFILE"],
      },
      {
        label: "Nhóm thảo luận",
        icon: "fal fa-users",
        to: "/social/groups",
        permission: ["PROFILE"],
      },
    ]);
    const menuTreeShortcut = reactive([
      {
        label: "Chấm công",
        icon: "icon_chamcong",
        to: `/user/attendance/month=${month}&year=${year}`,
        permission: ["PROFILE"],
      },
      {
        label: "Bảng lương",
        icon: "icon_bangluong",
        to: `/user/salary/${localStorage.getItem(
          "personnelID"
        )}&month=${month}&year=${year}`,
        permission: ["PROFILE"],
      },
      {
        label: "Sinh nhật",
        icon: "icon_sinhnhat",
        to: "/social/birthday",
        permission: ["PROFILE"],
      },
    ]);
    const menuTreeUtilities = reactive([
      {
        label: "Danh bạ BTP",
        icon: "icon_mobile",
        to: "/social/mobile",
        permission: ["PROFILE"],
      },
      // {
      //   label: "Sinh nhật",
      //   icon: "icon_sinhnhat",
      //   to: "/social/birthday",
      //   permission: ["PROFILE"],
      // },
    ]);
    const openChangeSignPage = () => {
      window.open("https://chuky.btpholdings.vn/");
    };
    return {
      active,
      userProfile,
      avatar,
      menuTree,
      menuTreeShortcut,
      menuTreeUtilities,
      date,
      month,
      year,
      openChangeSignPage,
    };
  },
};
</script>

<style>
.icon_chamcong {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  background: url("https://btpholdings.1office.vn/packages/4x/style/images/icons/svgs/shortcuts-timekeep.svg")
    no-repeat center center;
  background-size: 100%;
}
.icon_bangluong {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  background: url("https://btpholdings.1office.vn/packages/4x/style/images/icons/svgs/shortcuts-wage.svg")
    no-repeat center center;
  background-size: 100%;
}
.icon_sinhnhat {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  background: url("https://btpholdings.1office.vn/packages/4x/style/images/icons/svgs/shortcuts-birthday.svg")
    no-repeat center center;
  background-size: 100%;
}
.icon_mobile {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  background: url("https://hoathuanphat.com/wp-content/uploads/2019/03/kisspng-icon-phone-png-pic-5a753b39eeedd9.7165186815176323139787.jpg")
    no-repeat center center;
  background-size: 100%;
}
</style>
<style scoped>
.activeSidebar {
  color: var(--color-primary);
  background: transparent;
  font-weight: 600;
}
</style>
