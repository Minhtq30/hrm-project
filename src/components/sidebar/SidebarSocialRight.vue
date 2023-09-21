<template>
  <div
    class="sticky top-3 pl-4 w-full max-h-[550px] overflow-y-auto format-scroll"
  >
    <div class="w-full mb-8" v-if="listBirthday?.length > 0">
      <div class="rounded-lg bg-white drop-shadow-sm">
        <div class="text-red-600 p-4 flex justify-between items-center">
          <div class="font-normal">
            <i class="fal fa-gift text-lg"></i>
            <span class="px-2 font-medium"
              >Sinh nhật ngày {{ date.getDate() }}/{{ date.getMonth() + 1 }}/{{
                date.getUTCFullYear()
              }}</span
            >
          </div>
        </div>
        <div class="pb-4">
          <div class="pr-4 pl-5 text-red-600">
            <table class="w-full text-sm text-left text-red-500">
              <thead class="text-red-600">
                <tr>
                  <th scope="col" class="px-2 py-1">Nhân viên</th>
                  <th scope="col" class="px-2 py-1 text-center">Ngày sinh</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="bg-white border-t"
                  v-for="(item, index) in SortBirthday()"
                  :key="index"
                >
                  <th
                    class="px-2 py-3 font-normal text-gray-900 whitespace-normal cursor-pointer hover:text-red-500 hover:underline relative group"
                    @click="showDetailUser(item?.ID)"
                  >
                    <div
                      class="text-sm text-black absolute w-60 z-50 bg-white -top-full left-0 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible p-2 drop-shadow-xl before:content-[''] before:h-5 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
                    >
                      <div class="flex items-center">
                        <div class="w-[40px] h-[40px]">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwbGozsS9QP10p16rZiCrQD0koXVkI4c7LwUHab9dkmFRcN0VqCkB37f2y0EnySItwykg&usqp=CAU"
                            alt=""
                            class="w-full h-full rounded-full"
                          />
                        </div>
                        <div class="flex flex-col ml-2">
                          <div class="font-medium">{{ item.name }}</div>
                          <div v-if="item?.department">
                            <i class="fal fa-home-lg-alt mr-1"></i
                            ><span class="text-[12px]">{{
                              item.department
                            }}</span>
                          </div>
                          <div v-if="item?.position">
                            <i class="fal fa-user-tag mr-1"></i
                            ><span class="text-[12px]">{{
                              item.position
                            }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {{ item.name }}
                  </th>
                  <td class="px-2 py-2 text-center">
                    {{ formatDate(item.birthday) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full" v-if="listNoticesCompany?.length">
      <div class="rounded-lg overflow-hidden border-solid bg-[#fff] shadow-sm">
        <div class="">
          <div class="widget-first-header border-b p-4 flex justify-between">
            <span
              ><i
                class="far fa-bell fa-lg"
                style="color: var(--color-primary)"
              ></i>
              <span class="px-4 font-medium">Thông báo</span>
            </span>
          </div>
        </div>
        <div class="pb-4">
          <div class="px-1">
            <div class="flex flex-col p-2 w-full">
              <div
                class="flex items-center my-2 w-full"
                v-for="notice in listNoticesCompany"
                :key="notice.ID"
              >
                <div class="min-w-[40px]">
                  <img
                    class="widget-first-avatar"
                    src="https://btpholdings.1office.vn/packages/4x/style/images/letters/h.png"
                    alt=""
                    style="
                      width: 30px;
                      height: 30px;
                      border-radius: 50%;
                      align-items: center;
                    "
                  />
                </div>
                <div class="text-left font-medium w-full">
                  <a
                    href=""
                    @click.prevent="
                      this.$router.push(`/social/detailID=${notice.ID}`)
                    "
                    style="color: var(--color-primary)"
                    class="flex flex-wrap overflow-hidden longText"
                    >{{ notice.topics }}</a
                  >
                  <span class="text-[10px]">{{
                    formatTime(notice.created_at)
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import { FormatDate } from "@/constants/FormatAll";
import { useRouter } from "vue-router";
import { useSocialCompany } from "@/store/modules/social/SocialCompany.js";
import { storeToRefs } from "pinia";
export default {
  data: () => ({
    isHidden: false,
  }),
  methods: {
    SortBirthday() {
      let temp;
      for (let i = 0; i < this.listBirthday?.length; i++) {
        for (let j = 0; j <= i; j++) {
          if (this.listBirthday[i].birthday < this.listBirthday[j].birthday) {
            temp = this.listBirthday[i];
            this.listBirthday[i] = this.listBirthday[j];
            this.listBirthday[j] = temp;
          }
        }
      }
      return this.listBirthday;
    },
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
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const date = new Date();
    const SocialCompany = useSocialCompany();
    const listNoticesCompany = storeToRefs(SocialCompany);
    const listBirthday = computed(() => store.state.SocialNew.listBirthday);
    if (listNoticesCompany.value?.length == 0) {
      store.dispatch("SocialCompany/GetAllNoticesCompanyAction");
    }
    if (listBirthday.value?.length == 0) {
      store.dispatch("SocialNew/GetAllBirthdayMonthAction");
    }
    const formatDate = (date) => {
      return FormatDate(date);
    };
    const showDetailUser = (id) => {
      router.push(`/social/user/${id}`);
    };
    return {
      date,
      listBirthday,
      listNoticesCompany,
      formatDate,
      showDetailUser,
    };
  },
};
</script>

<style></style>
