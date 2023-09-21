<template>
  <div class="notify-box">
    <div>
      <nav-feature>
        <tab-nav
          :tabs="['Công việc', 'Duyệt', 'Lịch', 'Quan trọng', 'Tất cả']"
          :selected="selected"
          :paddingTab="true"
          @selected="setSelected"
        >
        </tab-nav>
        <div class="group relative">
          <i
            class="fal fa-ellipsis-h-alt text-black p-2 hover:bg-slate-200 rounded-lg mr-2"
          ></i>
          <div
            class="absolute z-10 right-0 top-full invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute drop-shadow-2xl"
          >
            <ul class="bg-white p-1 rounded-md">
              <li class="w-52 sub-item" @click="ReadAllNotice()">
                <i class="fal fa-check px-3"></i>Đánh dấu tất cả đã đọc
              </li>
              <li class="w-52 sub-item">
                <i class="fal fa-cog px-3"></i>Cài đặt thông báo
              </li>
            </ul>
          </div>
        </div>
      </nav-feature>
    </div>
    <div class="max-sm:w-[415px]">
      <the-tab :isSelected="selected == 'Tất cả'">
        <div
          class="notify-box-body format-scroll"
          @scroll="loadNotices($event)"
          v-if="listNotices?.length"
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
                <img :src="formatImg(notice)" />
              </div>
              <div class="notify-box-message-body" _n="body">
                <div class="notify-message-content">
                  <b>{{ notice.from_user?.fullname }}</b>
                  {{ notice.msg }}
                  <b>{{ formatObject(notice) }}</b>
                  <div class="notify-message-desc">
                    <span>{{ formatTime(notice.created_at) }}</span
                    ><span class="text-xs">{{ formatRead(notice) }}</span>
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
        <div v-else class="text-center text-slate-300 p-4">
          Không có thông báo
        </div>
        <div class="notify-box-footer" _n="footer">
          <a
            class="notify-action"
            pop-close=""
            href=""
            @click.prevent="this.$router.push('/user/notices')"
            >Xem tất cả</a
          >
        </div>
      </the-tab>
      <the-tab :isSelected="selected == 'Quan trọng'">
        <div class="text-center text-slate-300 p-4">Không có thông báo</div>
        <div class="notify-box-footer">
          <a class="notify-action" pop-close="" href="">Xem tất cả</a>
        </div>
      </the-tab>
      <the-tab :isSelected="selected == 'Lịch'">
        <div class="text-center text-slate-300 p-4">Không có thông báo</div>
        <div class="notify-box-footer">
          <a class="notify-action" pop-close="" href="">Xem tất cả</a>
        </div>
      </the-tab>
      <the-tab :isSelected="selected == 'Duyệt'">
        <div class="text-center text-slate-300 p-4">Không có thông báo</div>
        <div class="notify-box-footer" _n="footer">
          <a class="notify-action" pop-close="" href="">Xem tất cả</a>
        </div>
      </the-tab>
      <the-tab :isSelected="selected == 'Công việc'">
        <div class="text-center text-slate-300 p-4">Không có thông báo</div>
        <div class="notify-box-footer" _n="footer">
          <a class="notify-action" pop-close="" href="">Xem tất cả</a>
        </div>
      </the-tab>
    </div>
  </div>
</template>

<script>
import TheTab from "@/components/tab/TheTab.vue";
import TabNav from "@/components/tab/TabNav.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import { ref } from "@vue/reactivity";
import { FormatDate } from "@/constants/FormatAll";
// import Pusher from "pusher-js";
import { URL_IMG } from "@/constants/ApiUrl";
import { useRouter } from "vue-router";
import { useNoticesStore } from "@/store/modules/notices/piniaNotices";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { storeToRefs } from "pinia";
export default {
  components: {
    TheTab,
    TabNav,
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
    formatRead(notice) {
      if (notice.is_read == 0) {
        return "";
      } else {
        return "Đã đọc";
      }
    },
    formatImg(obj) {
      if (obj.from_user?.avatars) {
        return `${this.urlIamge}/${obj.from_user?.avatars}`;
      } else {
        return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBggOBwgICAcIBwoGBgUFBg8ICQcKIBEWFiAREx8YKCggGCYlGx8fITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NEA0NDisZHxkrKysrKysrLSsrKysrLS0rKysrKystKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAgEH/8QALRABAAIBAgQEBgIDAQAAAAAAAAECAwQRISIxUgUSMnITM1FigpJCYUFxoiP/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oADAMBAAIRAxEAPwD6+A0yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhz6mmKOM727agmeTasdZiGZl1WXJPCfLHbVDMzM8Zk1ca/wAWndDqJiekxLG3n6y9i1onhMxKaY2RnYtZesx5+aF7Flrkjln8V1HYAAAAAAAAAAAAAAAAOMuSMdJmf8Ah1eo+HG1fXP8AyzpmZmd53l7e03tMz1lylutQAQAAHeO9sdoms7OAGvgzVzU3jr/KqRlabLOLJHbPLZqxMTEbdJalZoAAAAAAAAAAAAAApeI34VrH5LrN18755/qKlIrAMtAAAAAADV0d/Phrv1jlZS/4dO9b/wBLEq4AqAAAAAAAAAAAADN10bZ5/wBVaSj4jT0zH5FIpAMtAAAAAAC/4dG0X/tQamip5MMb9Z5liVOAqAAAAAAAAAAAADjNjjJjmJ/F2AxbRNbTE9YeNHV6b4keakc8eqvcz5iYnjG0pY08AQAAAdUpOS0RWN5kHenxzlyRG3COazWiIiI26Qi0+GMNPun1WStSM0AAAAAAAAAAAAAAAAQZ9NXL05b9yW16V9Voj3OomJjhO8AysumyY54xvHdVFtP0ltOZx0t1rEmLrGexEzPCJlrfAxdkOopWvSsQYaz8WkyXmPNHlr9y9iw0xRyxx7kgSGg5jJSZ2i0ebtdCAAAAAAAAAAAAAOcuSMdJmZ4QBe8UiZtO0KObWWtv8Plr3Ic+a2W07zy/xqiS1cezMzPGZlJi1GTHPCd47bIhFaOPW0n1xNZ+1NXNjmOF6/syBdTGz56d1f2eTmxx1vX9mRvP1knj1NMaV9ZjrHDe0qmXV5L77cte2quGmPd536zunxarJjmN581e2yuIrXxZq5Y5Z49qRj0vOO0TWdphpafNGan0tHqqsqWJgFQAAAAAAAAZuszTkvtE8lVzVZPh4p2njPLVlz1KseAMqAAAAAAAAAAJMOScV4mPyqjAbVLRasTHSXqpoMm9JrM8Y9PtW2oyAAAAAAAApeI29MfkorfiM/8ArX2KiXqwARQAAAAAAAAAAAFnRW8uePu5WkydN8/H72s1EoAIAAAAAAz/ABH50exUW/EfnR7FRL1qACAAAAAAAAAAAACXTfPx+9rMnTfPx+9rNRKACAAAAAAM/wAR+dHsVAS9agAgAAAAAAAAAAAAl03z8fvawNRKACAAP//Z";
      }
    },
  },
  props: {
    closeNotifyBox: {
      type: Function,
    },
  },
  setup(props) {
    const router = useRouter();
    const selected = ref("Tất cả");
    const urlIamge = ref(URL_IMG);
    const countNotices = ref(10);
    const NoticesStore = useNoticesStore();
    const total = useApprovalTotal();
    const { listNotices } = storeToRefs(NoticesStore);
    const { listApproval } = storeToRefs(total);

    const setSelected = (tab) => {
      selected.value = tab;
    };
    const readedNotice = (id) => {
      NoticesStore.readedNoticesAction({
        id: id,
        count: countNotices.value,
      });
    };
    const listNoticeUnread = (arr) => {
      let list = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].is_read == 0) {
          list.push(arr[i].ID);
        }
      }
      return list;
    };
    const ReadAllNotice = () => {
      let arr = listNoticeUnread(listNotices.value);
      for (let i = 0; i < arr.length; i++) {
        NoticesStore.readedNoticesAction({
          id: arr[i],
          count: countNotices.value,
        });
      }
      arr = [];
    };
    const formatUrlDetail = (obj) => {
      const arr = listApproval.value.find((item) => item.object == obj.object);
      return arr.urlDetail;
    };
    const showDetail = (obj) => {
      if (obj.is_read == 0) {
        readedNotice(obj.ID);
      }
      props.closeNotifyBox();
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
      selected,
      listNotices,
      urlIamge,
      listApproval,
      countNotices,
      NoticesStore,
      loadNotices,
      formatUrlDetail,
      setSelected,
      readedNotice,
      listNoticeUnread,
      ReadAllNotice,
      showDetail,
    };
  },
};
</script>

<style scoped>
.tablist li a {
  padding: 8px 12px;
}
</style>
