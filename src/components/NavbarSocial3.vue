<template>
  <div class="w-full">
    <nav
      class="py-1 flex mx-auto w-full"
      style="background-color: var(--color-primary)"
    >
      <div class="grid grid-cols-12 w-full">
        <div class="col-span-2">
          <div class="justify-center max-sm:ml-[15px]">
            <a
              href="/social"
              class="flex-col py-1.5 mt-8 px-2 md:flex md:space-y-0 md:flex-row md:items-center md:mt-0 items-center justify-center"
            >
              <img :src="logo" alt="" class="w-10 h-10" />
            </a>
          </div>
        </div>
        <div class="col-span-6 w-full">
          <div class="flex mr-4 ml-[4rem] p-1.5 w-full">
            <form>
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >Search</label
              >
              <div class="relative">
                <div
                  class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                >
                  <svg
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block p-2 pl-10 w-[22rem] whitespace-no-wrap outline-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-white focus:border-cyan-500 placeholder:text-[13px] placeholder:text-gray-500"
                  placeholder="Tìm kiếm trong bài viết, người dùng..."
                />
              </div>
            </form>
          </div>
        </div>
        <div class="col-span-4 w-full">
          <div class="justify-end">
            <ul
              class="showMenu xxs21 max-sm:flex-row flex flex-col mt-8 px-2 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:mt-0 items-end justify-end"
            >
              <!--          menu-->
              <li
                class="text-white hover:bg-[#ffffff33] cursor-pointer p-3 ml-2 rounded-lg items-center"
                @click="toggleActiveMenu"
                v-click-outside="onClickOutsideMenuBox"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.6"
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
                    v-bind:class="{ hidden: !activeMenu, block: activeMenu }"
                    class="bg-white text-base z-1 list-none text-left rounded shadow-lg mb-1"
                    ref="popoverDropdownRef"
                    v-if="activeMenu"
                  >
                    <menu-box />
                  </div>
                </div>
              </li>
              <li
                class="text-white hover:bg-[#ffffff33] cursor-pointer p-3 ml-2 rounded-lg"
                @click="goToMobile()"
              >
                <i class="fal fa-phone text-lg"></i>
              </li>

              <li
                class="text-white hover:bg-[#ffffff33] cursor-pointer p-3 ml-2 rounded-lg relative"
                @click="toggleActiveNotifyBox"
                v-click-outside="onClickOutsideNotifyBox"
              >
                <i class="fal fa-bell text-lg"></i>
                <div
                  class="modal-menu-box mr-100 max-sm:w-[350px]"
                  :class="activeNotifyBox ? 'flex' : 'hidden'"
                  @click.stop
                  v-if="activeNotifyBox"
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
                  v-if="count_unread"
                  class="absolute bg-white w-[20px] h-[20px] rounded-full top-0 text-xs right-0 flex items-center justify-center"
                  style="color: var(--color-primary)"
                >
                  {{ count_unread }}
                </div>
              </li>
              <li
                class="text-white hover:bg-[#ffffff33] cursor-pointer p-3 ml-2 rounded-lg"
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
                    max-width: fit-content;
                  "
                  class="border"
                />
                <div
                  id="modal-account-box"
                  class="modal-account-box max-sm"
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
        </div>
      </div>

      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
    </nav>
  </div>
</template>
<script>
import { ref } from "vue";
import MenuBox from "@/components/navbar/MenuBox";
import AccountBox from "@/components/navbar/AccountBox";
import NotifyBox from "@/components/navbar/NotifyBox.vue";
import { useRouter } from "vue-router";
import { LOGO_CTY } from "@/constants/ApiUrl";
import { useNoticesStore } from "@/store/modules/notices/piniaNotices";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";

export default {
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
    const logo = ref(LOGO_CTY);
    const unreadNotify = ref(0);
    const toggleNav = () => (showMenu.value = !showMenu.value);
    const toggleActiveMenu = () => (activeMenu.value = !activeMenu.value);
    const toggleActiveAccountBox = () =>
      (activeAccountBox.value = !activeAccountBox.value);
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
        console.log("Notify listened");
        listNotices.value.unshift(e.message);
        unreadNotify.value++;
      }
    );

    return {
      showMenu,
      activeMenu,
      activeAccountBox,
      activeNotifyBox,
      avatar,
      logo,
      toggleNav,
      toggleActiveMenu,
      toggleActiveAccountBox,
      onClickOutsideAccountBox,
      onClickOutsideMenuBox,
      toggleActiveNotifyBox,
      onClickOutsideNotifyBox,
      goToMobile,
      NoticesStore,
      listNotices,
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
  right: 0;
  z-index: 9999;
  justify-items: center;
}
.modal-account-box {
  position: absolute;
  z-index: 9999;
  justify-items: center;
  right: 0;
}
</style>
