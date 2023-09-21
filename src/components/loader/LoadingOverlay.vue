<template>
  <Transition duration="550" name="nested">
    <div id="preloader" v-if="isLoading" @click="handleEndLoading">
      <div id="loader"></div>
    </div>
    <!-- <div class="moda inner" v-if="isLoading" @click="handleEndLoading">
      <div class="boxes outer">
        <div class="box">
          <div>
            <img :src="btp" alt="" />
          </div>
          <div><img :src="btp" alt="" /></div>
          <div><img :src="btp" alt="" /></div>
          <div></div>
        </div>
        <div class="box">
          <div>
            <img :src="btp" alt="" />
          </div>
          <div><img :src="btp" alt="" /></div>
          <div><img :src="btp" alt="" /></div>
          <div></div>
        </div>
        <div class="box">
          <div>
            <img :src="btp" alt="" />
          </div>
          <div><img :src="btp" alt="" /></div>
          <div><img :src="btp" alt="" /></div>
          <div></div>
        </div>
        <div class="box">
          <div>
            <img :src="btp" alt="" />
          </div>
          <div><img :src="btp" alt="" /></div>
          <div><img :src="btp" alt="" /></div>
          <div></div>
        </div>
      </div>
    </div> -->
  </Transition>
</template>

<script>
import btp from "@/assets/images/btp.png";
export default {
  props: {
    isLoading: {
      type: Boolean,
    },
    handleEndLoading: {
      type: Function,
    },
  },
  data() {
    return {
      btp: btp,
    };
  },
};
</script>

<style scoped>
/* .moda {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  height: 100%;
  background: rgba(240, 240, 240, 0.2);
  padding: 0;
  transition: opacity 0.4s linear;
}
.boxes {
  --size: 32px;
  --duration: 800ms;
  height: calc(var(--size) * 2);
  width: calc(var(--size) * 3);
  position: relative;
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  margin-top: calc(var(--size) * 1.5 * -1);
  transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
  margin: auto;
}
.boxes .box {
  width: var(--size);
  height: var(--size);
  top: 0;
  left: 0;
  position: absolute;
  transform-style: preserve-3d;
}
.boxes .box:nth-child(1) {
  transform: translate(100%, 0);
  animation: box1 var(--duration) linear infinite;
}
.boxes .box:nth-child(2) {
  transform: translate(0, 100%);
  animation: box2 var(--duration) linear infinite;
}
.boxes .box:nth-child(3) {
  transform: translate(100%, 100%);
  animation: box3 var(--duration) linear infinite;
}
.boxes .box:nth-child(4) {
  transform: translate(200%, 0);
  animation: box4 var(--duration) linear infinite;
}
.boxes .box > div {
  --background: white;
  --top: auto;
  --right: auto;
  --bottom: auto;
  --left: auto;
  --translateZ: calc(var(--size) / 2);
  --rotateY: 0deg;
  --rotateX: 0deg;
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--background);
  top: var(--top);
  right: var(--right);
  bottom: var(--bottom);
  left: var(--left);
  transform: rotateY(var(--rotateY)) rotateX(var(--rotateX))
    translateZ(var(--translateZ));
}
.boxes .box > div:nth-child(1) {
  --top: 0;
  --left: 0;
}
.boxes .box > div:nth-child(2) {
  --background: white;
  --right: 0;
  --rotateY: 90deg;
}
.boxes .box > div:nth-child(3) {
  --background: white;
  --rotateX: -90deg;
}
.boxes .box > div:nth-child(4) {
  --background: #dbe3f4;
  --top: 0;
  --left: 0;
  --translateZ: calc(var(--size) * 3 * -1);
}

@keyframes box1 {
  0%,
  50% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(200%, 0);
  }
}

@keyframes box2 {
  0% {
    transform: translate(0, 100%);
  }
  50% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(100%, 0);
  }
}

@keyframes box3 {
  0%,
  50% {
    transform: translate(100%, 100%);
  }
  100% {
    transform: translate(0, 100%);
  }
}

@keyframes box4 {
  0% {
    transform: translate(200%, 0);
  }
  50% {
    transform: translate(200%, 100%);
  }
  100% {
    transform: translate(100%, 100%);
  }
} */
#preloader {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  height: 100%;
  background: rgba(240, 240, 240, 0.2);
  padding: 0;
  transition: opacity 0.4s linear;
}
#loader {
  display: block;
  position: relative;
  left: 50%;
  top: 50%;
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #9370db;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}
#loader:before {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #ba55d3;
  -webkit-animation: spin 3s linear infinite;
  animation: spin 3s linear infinite;
}
#loader:after {
  content: "";
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #ff00ff;
  -webkit-animation: spin 1.5s linear infinite;
  animation: spin 1.5s linear infinite;
}
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
