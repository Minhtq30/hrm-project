<template>
  <div class="w-full">
    <div
      v-for="(item, index) in arrImage"
      :key="index"
      class="twoImage"
      @click="handleOpenShowImage"
    >
      <img
        class="rounded-lg cursor-pointer pt-[10px]"
        :src="urlIamge + '/' + item"
        alt="Sunset in the mountains"
        width="100"
        height="100"
      />
    </div>
  </div>
  <teleport to="#app">
    <modal-view :isOpen="isShowImage" :handleCloseDetail="handleCloseShowImage">
      <div class="w-full h-full">
        <h1 class="header-modal">hình ảnh</h1>
        <div class="text-left">
          <swiper
            :slidesPerView="1"
            :spaceBetween="10"
            :slidesPerGroup="1"
            :pagination="{
              clickable: true,
            }"
            :navigation="true"
            :modules="modules"
            class="mySwiper"
          >
            <swiper-slide v-for="(img, index) in arrImage" :key="index">
              <div class="w-auto h-[700px] bg-[#ebebeb] flex items-center">
                <img
                  :src="urlIamge + '/' + img"
                  alt=""
                  class="rounded-lg max-h-[650px]"
                />
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </modal-view>
  </teleport>
</template>
<script>
import { URL_IMG } from "@/constants/ApiUrl";
import { ref } from "@vue/reactivity";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    arrImage: {
      type: Array,
    },
  },
  data() {
    return {
      modules: [Pagination, Navigation],
    };
  },
  methods: {},
  setup() {
    // const total = useApprovalTotal();
    // const isLoading = ref(true);
    // const EndTimeLoading = () => {
    //   isLoading.value = false;
    // };
    // total.ShowDetailApprovalAction({
    //   id: route.params.idApproval,
    //   EndTimeLoading,
    // });
    const isShowImage = ref(false);
    const handleOpenShowImage = () => {
      isShowImage.value = true;
    };
    const handleCloseShowImage = () => {
      isShowImage.value = false;
    };
    const urlIamge = ref(URL_IMG);
    return {
      urlIamge,
      isShowImage,
      handleOpenShowImage,
      handleCloseShowImage,
    };
  },
};
</script>
<style scoped>
.swiper {
  width: 100%;
  height: 100%;
  background-color: #ccc;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #ebebeb;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.swiper-slide img {
  display: block;
  width: 100%;
  object-fit: fill;
}
.slide-sale {
  position: relative;
}
@keyframes brandList {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
