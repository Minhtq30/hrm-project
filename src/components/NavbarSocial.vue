<template>
  <div class="w-full border h-full flex-1">
    <nav class="flex justify-end mx-auto w-full bg-white">
      <slot></slot>
      <div class="text-right w-[300px]" v-if="isShowSearch">
        <slot name="search"></slot>
      </div>
      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
      <div class="flex items-center">
        <ul class="flex xxs222 items-center justify-center max-sm:mr-[60px]">
          <!--          menu-->
          <li
            class="hover:bg-gray-100 cursor-pointer p-3 ml-2 rounded-lg max-sm:px-1"
            style="color: var(--color-primary)"
            @click="toggleActiveMenu"
            v-click-outside="onClickOutsideMenuBox"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            <div
              class="modal-menu-box mr-100"
              :class="activeMenu ? 'flex' : 'hidden'"
              @click.stop
            >
              <div
                class="bg-white text-base z-1 list-none text-left rounded shadow-lg mb-1"
                ref="popoverDropdownRef"
                v-if="activeMenu"
              >
                <menu-box />
              </div>
            </div>
          </li>
          <li
            class="hover:bg-gray-100 cursor-pointer p-3 ml-2 rounded-lg max-sm:px-1"
            style="color: var(--color-primary)"
            @click="goToMobile()"
          >
            <i class="fal fa-phone text-lg"></i>
          </li>

          <li
            class="hover:bg-gray-100 cursor-pointer p-3 ml-2 rounded-lg relative max-sm:px-1"
            @click="toggleActiveNotifyBox"
            v-click-outside="onClickOutsideNotifyBox"
            style="color: var(--color-primary)"
          >
            <i class="fal fa-bell text-lg"></i>
            <div
              class="modal-menu-box mr-100"
              :class="activeNotifyBox ? 'flex' : 'hidden'"
              @click.stop
            >
              <div
                v-bind:class="{
                  hidden: !activeNotifyBox,
                  block: activeNotifyBox,
                }"
                class="bg-white text-base z-1 list-none text-left rounded shadow-lg mb-1"
                ref="popoverDropdownRef"
              >
                <notify-box
                  :closeNotifyBox="onClickOutsideNotifyBox"
                ></notify-box>
              </div>
            </div>
            <div
              v-if="count_unread > 0"
              class="absolute text-white w-[20px] h-[20px] rounded-full top-0 text-xs right-0 flex items-center justify-center"
              style="background-color: var(--color-primary)"
            >
              {{ count_unread }}
            </div>
          </li>
          <li
            class="text-white hover:bg-gray-100 cursor-pointer p-3 ml-2 mr-2 rounded-lg max-sm:px-1"
            @click="toggleActiveAccountBox"
            v-click-outside="onClickOutsideAccountBox"
          >
            <img
              :src="avatar"
              style="
                height: 25px;
                width: 25px;
                border-radius: 50%;
                border-color: var(--color-primary);
              "
            />
            <div
              id="modal-account-box"
              class="modal-account-box"
              :class="activeAccountBox ? 'flex' : 'hidden'"
            >
              <div
                v-bind:class="{
                  hidden: !activeAccountBox,
                  block: activeAccountBox,
                }"
                class="bg-white text-base z-1 list-none text-left rounded mb-1 shadow-lg text-blue-900"
                ref="popoverDropdownRef"
              >
                <account-box />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
import { ref } from "vue";
import MenuBox from "@/components/navbar/MenuBox";
import AccountBox from "@/components/navbar/AccountBox";
import NotifyBox from "@/components/navbar/NotifyBox.vue";
import { useRouter } from "vue-router";
import { useNoticesStore } from "@/store/modules/notices/piniaNotices";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";

export default {
  props: {
    isShowSearch: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    MenuBox,
    AccountBox,
    NotifyBox,
  },
  methods: {
    countIsRead() {
      let sum = 0;
      for (let i = 0; i < this.listNotices?.length; i++) {
        if (this.listNotices[i].is_read == 0) {
          sum += 1;
        } else {
          sum += 0;
        }
      }
      return (this.unreadNotify.value = sum);
    },
  },
  setup() {
    const router = useRouter();
    const showMenu = ref(false);
    const activeMenu = ref(false);
    const activeAccountBox = ref(false);
    const activeNotifyBox = ref(false);
    const NoticesStore = useNoticesStore();
    const profile = useUserProfile();
    const { avatar } = storeToRefs(profile);
    const { listNotices, count_unread } = storeToRefs(NoticesStore);
    const unreadNotify = ref(0);
    const toggleNav = () => (showMenu.value = !showMenu.value);
    const toggleActiveMenu = () => (activeMenu.value = !activeMenu.value);
    const toggleActiveAccountBox = () => (activeAccountBox.value = true);
    const toggleActiveNotifyBox = () =>
      (activeNotifyBox.value = !activeNotifyBox.value);
    const onClickOutsideNotifyBox = () => (activeNotifyBox.value = false);
    const onClickOutsideAccountBox = () => (activeAccountBox.value = false);
    const onClickOutsideMenuBox = () => (activeMenu.value = false);
    const goToMobile = () => {
      let link = router.resolve({ path: "/social/mobile" });
      window.open(link.href);
    };
    /**
     * Notify by laravel echo
     * @type {Pusher}
     */
    window.Echo.channel("user.notify." + localStorage.getItem("userID")).listen(
      "UserNotify",
      (e) => {
        console.log("Notify listened", e);
        listNotices.value.unshift(e.message);
        unreadNotify.value++;
      }
    );
    return {
      showMenu,
      activeMenu,
      activeAccountBox,
      avatar,
      activeNotifyBox,
      toggleActiveNotifyBox,
      onClickOutsideNotifyBox,
      toggleNav,
      toggleActiveMenu,
      toggleActiveAccountBox,
      onClickOutsideAccountBox,
      onClickOutsideMenuBox,
      goToMobile,
      listNotices,
      NoticesStore,
      unreadNotify,
      count_unread,
    };
  },
};
</script>
<style scoped>
.modal-menu-box {
  position: absolute;
  top: 50px;
  right: 0px;
  z-index: 9999;
  justify-items: center;
}
.modal-account-box {
  position: absolute;
  z-index: 9999;
  justify-items: center;
  right: 10px;
}
</style>
