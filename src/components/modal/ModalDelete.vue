<template>
  <Transition name="modal-fade">
    <div class="moda" v-if="isOpen">
      <div
        class="w-full h-full"
        ref="modal__container"
        id="modal__container"
        :resizable="true"
      >
        <div class="modal__container absolute" @mousedown="dragMouseDown">
          <div class="modal__header">
            <div class="modal__close" @click="handleCloseDetail">
              <i class="fal fa-times text-white"></i>
            </div>
          </div>
          <div class="modal__body">
            <div>
              <h1 class="header-modal">Xác nhận xóa</h1>
              <div class="p-4 text-lg">
                <div>Bạn có chắc chắn muốn xóa không??</div>
                <div>
                  <img :src="img_delete" alt="" class="w-[400px]" />
                </div>
              </div>
              <div class="bg-button-modal">
                <button class="button-modal" @click="ConfirmDelete">
                  Xác nhận
                </button>
                <button class="button-close-modal" @click="handleCloseDetail">
                  Hủy bỏ
                </button>
              </div>
            </div>
          </div>
          <div class="modal__footer"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import img_delete from "@/assets/images/delete.png";
export default {
  data() {
    return {
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0,
      },
      img_delete: img_delete,
    };
  },
  props: {
    isOpen: {
      type: Boolean,
    },
    handleCloseDetail: {
      type: Function,
    },
    ConfirmDelete: {
      type: Function,
    },
  },
  methods: {
    handleClose() {
      this.handleClose();
    },
    dragMouseDown: function (event) {
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      document.onmousemove = this.elementDrag;
      document.onmouseup = this.closeDragElement;
    },
    elementDrag: function (event) {
      this.positions.movementX = this.positions.clientX - event.clientX;
      this.positions.movementY = this.positions.clientY - event.clientY;
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      // set the element's new position:
      this.$refs.modal__container.style.top =
        this.$refs.modal__container.offsetTop - this.positions.movementY + "px";
      this.$refs.modal__container.style.left =
        this.$refs.modal__container.offsetLeft -
        this.positions.movementX +
        "px";
    },
    closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    },
  },
};
</script>

<style scoped>
.moda {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  padding: 0;
  transition: opacity 0.4s linear;
}
.modal__container {
  max-width: 1000px;
  margin: auto;
  margin-top: 20px;
  background-color: #fff;
  display: block;
  border-radius: 8px;
  animation: showModal linear 0.4s;
  box-shadow: 2px 2px 20px 1px;
  left: 50%;
  top: 47%;
  transform: translate(-50%, -50%);
}
.modal__header {
  display: flex;
  justify-content: flex-end;
  cursor: grabbing;
  z-index: 100;
}
.modal__close {
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  text-align: center;
  font-size: 30px;
  position: absolute;
  margin-top: 4px;
  transition: opacity 0.2s ease-in-out, transform 0.3s ease;
}
.modal__close:hover {
  cursor: pointer;
  color: rgba(0, 0, 0, 0.7);
  transform: scale(1.2);
}
@keyframes showModal {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes hiddenModal {
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
</style>
