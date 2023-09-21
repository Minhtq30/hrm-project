<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-notices></sidebar-notices>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center ml-4">
            <p class="longText uppercase">Hộp thông báo</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div></div>
        <div class="flex">
          <div class="btn-icon">
            <div class="cx">
              <i class="fal fa-cog"></i>
            </div>
            <div class="action-label">Cài đặt</div>
          </div>
        </div></nav-feature
      ></template
    >
    <Transition name="slide-fade">
      <div class="home w-full h-full" v-if="isLoading == false">
        <div
          class="notify-box-body-all format-scroll h-full"
          @scroll="loadNotices($event)"
        >
          <div
            class="notify-single"
            v-for="notice in listNotices"
            :key="notice.ID"
          >
            <a
              href=""
              class="notify-box-message"
              :class="formatUnread(notice)"
              @click.prevent="showDetail(notice)"
            >
              <div class="notify-box-message-photo" _n="photo">
                <img :src="urlIamge + '/' + notice.from_user?.avatars" />
              </div>
              <div class="notify-box-message-body" _n="body">
                <div class="notify-message-content">
                  <b>{{ notice.from_user?.fullname }}</b>
                  {{ notice.msg }}
                  <b>{{ formatObject(notice) }}</b>
                  <div class="notify-message-desc">
                    {{ formatTime(notice.created_at) }}
                  </div>
                </div>
              </div>
            </a>
            <a class="icon-braille group relative"
              ><i class="fal fa-ellipsis-h-alt text-black"></i>
              <div
                class="absolute z-[9999] right-full -top-full invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute drop-shadow-2xl"
              >
                <ul class="bg-white p-3 rounded-md">
                  <li class="w-40 sub-item" @click="readedNotice(notice.ID)">
                    Đánh dấu đã đọc
                  </li>
                </ul>
              </div></a
            >
          </div>
        </div>
      </div>
    </Transition>
  </person-layout>
  <loading-overlay :isLoading="isLoading"></loading-overlay>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarNotices from "@/components/sidebar/SidebarNotices.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { ref } from "@vue/runtime-core";
import { FormatDate } from "@/constants/FormatAll";
import { useRouter } from "vue-router";
import { URL_IMG } from "@/constants/ApiUrl";
import { useNoticesStore } from "@/store/modules/notices/piniaNotices";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { storeToRefs } from "pinia";
export default {
  components: {
    PersonLayout,
    SidebarNotices,
    NavbarSocial,
    NavFeature,
  },
  methods: {
    formatTime(index) {
      let time = new Date(index);
      const current = new Date();
      let key = Math.ceil((current.getTime() - time.getTime()) / 86400);
      if (key < 60) {
        return key + " phút trước";
      } else if (key > 60 && key < 1440) {
        return Math.floor(key / 60) + " giờ trước";
      } else if (key > 1440) {
        return FormatDate(index);
      }
    },
    formatModule(module) {
      if (module == "approvals") {
        return "đã gửi yêu cầu duyệt đơn ";
      }
    },
    formatObject(object) {
      if (object.module == "approvals") {
        let arr = this.listApproval.find(
          (item) => item.object == object.object
        );
        if (arr) {
          return arr.title;
        } else {
          return "";
        }
      } else if (object.module == "shifts_assign") {
        return "";
      }
    },
    formatUnread(notice) {
      if (notice.is_read == 0) {
        return "isUnread";
      } else {
        return "";
      }
    },
  },
  setup() {
    const NoticesStore = useNoticesStore();
    const total = useApprovalTotal();
    const { listApproval } = storeToRefs(total);
    const router = useRouter();
    const isLoading = ref(true);
    const countNotices = ref(10);
    const urlIamge = ref(URL_IMG);
    setTimeout(() => {
      isLoading.value = false;
    }, 600);
    NoticesStore.getAllNoticesAction(countNotices.value);
    const { listNotices } = storeToRefs(NoticesStore);
    const readedNotice = (id) => {
      NoticesStore.readedNoticesAction({
        id: id,
        count: countNotices.value,
      });
    };
    const formatUrlDetail = (obj) => {
      const arr = listApproval.value.find((item) => item.object == obj.object);
      return arr.urlDetail;
    };
    const showDetail = (obj) => {
      if (obj.is_read == 0) {
        readedNotice(obj.ID);
      }
      if (obj.module == "approvals") {
        router.push(`${formatUrlDetail(obj)}` + `${obj.post_id}`);
      } else if (obj.module == "shifts_assign") {
        router.push(`/timekeep-attendance-assign-detail/${obj.post_id}`);
      }
    };
    const loadNotices = (e) => {
      const clientHeight = e.target.clientHeight;
      const scrollHeight = e.target.scrollHeight;
      const scrollTop = e.target.scrollTop;
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        NoticesStore.getAllNoticesAction((countNotices.value += 1));
        return (countNotices.value += 1);
      }
    };
    return {
      listNotices,
      isLoading,
      listApproval,
      countNotices,
      urlIamge,
      NoticesStore,
      readedNotice,
      formatUrlDetail,
      showDetail,
      loadNotices,
    };
  },
};
</script>

<style></style>
