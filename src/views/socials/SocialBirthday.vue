<template>
  <div class="bg-[#f0f2f5]">
    <person-layout>
      <template v-slot:navbar>
        <navbar-social-3></navbar-social-3>
      </template>
      <div class="grid grid-cols-12 gap-x-2 grow h-full">
        <div class="col-span-3">
          <sidebar-social />
        </div>
        <Transition name="slide-fade">
          <div class="col-span-9 m-4" v-if="isLoading == false">
            <div class="bgBirthday rounded-lg h-full">
              <div
                class="flex items-center justify-center p-4 text-4xl font-medium bg-white/95 rounded-t-lg"
                style="
                  color: var(--color-primary);
                  background: url('https://btpholdings.1office.vn/packages/4x/style/images/birthday.png')
                    0% 0% / contain no-repeat;
                "
              >
                <span class="text-4xl mr-2"
                  ><i class="fal fa-birthday-cake"></i
                ></span>
                Sinh nhật trong tháng {{ date.getMonth() + 1 }}
                <span class="text-4xl ml-2"
                  ><i class="fal fa-birthday-cake"></i
                ></span>
              </div>
              <div class="">
                <div class="m-4 rounded-lg py-4 px-10">
                  <div v-for="(date, index) in arrDay" :key="index">
                    <div v-if="SortBirthday(date)?.length">
                      <div v-if="CompareBirthday(date)">
                        <div class="text-left p-5 text-xl text-red-500">
                          <i class="fal fa-birthday-cake mr-2"></i>Ngày
                          {{ formatDate(date) }}
                        </div>
                        <div class="grid grid-cols-12 gap-8">
                          <div
                            class="lg:col-span-3 md:col-span-4 sm:col-span-6 item-member-social"
                            v-for="item in SortBirthday(date)"
                            :key="item.ID"
                            :class="{
                              itemMemberSocialBirthday: formatBirthday(
                                item.birthday
                              ),
                            }"
                          >
                            <div>
                              <img
                                :src="formatImage(item.personnel_photo)"
                                alt=""
                                style="
                                  width: 100px;
                                  height: 100px;
                                  border-radius: 50%;
                                "
                              />
                            </div>
                            <div class="mt-4 text-lg">
                              <a
                                href=""
                                @click.prevent="showDetailUser(item.ID)"
                                class="hover:text-red-500 hover:underline"
                                >{{ item.name }}</a
                              >
                            </div>
                            <div class="px-3">
                              {{ formatAge(item.birthday) }} tuổi
                            </div>
                            <div class="py-5 px-3">
                              {{ formatDay(item.birthday) }}
                            </div>
                            <div class="px-3">
                              {{ item.position }}
                            </div>
                            <div class="py-4 px-3">
                              {{ item.department }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </person-layout>
  </div>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import { computed, ref } from "vue";
import SidebarSocial from "@/components/sidebar/SidebarSocial.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import NavbarSocial3 from "@/components/NavbarSocial3.vue";
import { useStore } from "vuex";
import { FormatDate } from "@/constants/FormatAll";
import { URL_IMG } from "@/constants/ApiUrl";
import { useRouter } from "vue-router";
// import { useRoute } from "vue-router";
export default {
  components: {
    SidebarSocial,
    PersonLayout,
    NavbarSocial3,
  },
  methods: {
    formatDate(date) {
      return FormatDate(date);
    },
    formatDay(index) {
      let birthday = new Date(index);
      if (birthday.getDate() - this.date.getDate() == 0) {
        return "Hôm nay";
      } else {
        return FormatDate(index);
      }
    },
    formatBirthday(index) {
      let birthday = new Date(index);
      if (birthday.getDate() - this.date.getDate() == 0) {
        return true;
      } else {
        return false;
      }
    },
    formatAge(date) {
      const birthday = new Date(date);
      const current = new Date();
      return current.getUTCFullYear() - birthday.getUTCFullYear();
    },
    formatImage(avatar) {
      if (avatar == null) {
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0nuD5Rv6FV-35aHcgmvyYlldqJbjdJsYQ3NKM4xVLPsLhKvxjET5BrI8bmCAr75WY5Tw&usqp=CAU";
      } else {
        return URL_IMG + "/" + avatar;
      }
    },
    SortBirthday(date) {
      return this.listBirthdayMonth.filter(
        (item) => new Date(item.birthday).getDate() == date.getDate()
      );
    },
    CompareBirthday(index) {
      if (index.getDate() >= this.date.getDate()) {
        return true;
      } else {
        return false;
      }
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLoading = ref(true);
    const date = new Date();
    const multiDate = ref([]);
    const arrDay = ref([]);
    let firstDay = new Date(date.getFullYear(), date.getMonth());
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1);
    // const route = useRoute();
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const listBirthdayMonth = computed(
      () => store.state.SocialNew.listBirthdayMonth
    );
    if (listBirthdayMonth.value?.length == 0) {
      store.dispatch("SocialNew/GetAllBirthdayAction", {
        date: date.getMonth() + 1,
        EndTimeLoading,
      });
    }

    const showDetailUser = (id) => {
      router.push(`/social/user/${id}`);
    };
    const dateRange = (startDate, endDate, steps = 1) => {
      const dateArray = [];
      let currentDate = new Date(startDate);
      while (currentDate <= new Date(endDate)) {
        dateArray.push(new Date(currentDate).toISOString().substring(0, 10));
        currentDate.setUTCDate(currentDate.getUTCDate() + steps);
      }
      return dateArray;
    };
    const loadDay = (start, end) => {
      multiDate.value = dateRange(start, end);
      for (let i = 1; i < multiDate.value.length; i++) {
        let da = new Date(multiDate.value[i]);
        arrDay.value.push(da);
      }
    };
    loadDay(firstDay, lastDay);
    return {
      listBirthdayMonth,
      isLoading,
      date,
      firstDay,
      lastDay,
      multiDate,
      arrDay,
      dateRange,
      showDetailUser,
      loadDay,
      EndTimeLoading,
    };
  },
};
</script>
<style>
.bgBirthday {
  width: 100%;
  height: 100%;
  background-color: #fff;
  /* background: url("https://img.freepik.com/free-vector/flat-style-happy-birthday-balloons-confetti-background_1017-29990.jpg?w=2000")
    repeat right top; */
  /* background-size: 100%;
  object-fit: cover; */
}
.modal-change-box {
  background: white;
  position: absolute;
  z-index: 1;
  top: 300px;
  justify-items: center;
  margin-left: 150px;
}

.modal-change-background {
  background: white;
  position: absolute;
  z-index: 1;
  top: 190px;
  justify-items: center;
  margin-left: 150px;
}

.detail-profile-header {
  margin-top: 5px;
}

.profile-header {
  height: 250px;
  background-image: url("https://saigonmetromall.com.vn/wp-content/uploads/2021/10/background-dep-840x557-3-780x470.jpg");
  border-radius: 15px;
}
.avatar-user-header {
  width: 160px;
  height: 160px;
}

.avatar-user-header-img {
  border-radius: 50%;
  width: 149px;
  height: 145px;
  margin-top: 130px;
}

.detail-profile {
  height: 600px;
  border-radius: 12px;
  background: white;
}

.setting-background {
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 5px;
}
.sidebar-left {
  width: 300px;
}
</style>
