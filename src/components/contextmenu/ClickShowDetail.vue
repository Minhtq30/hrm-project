<template>
  <div class="w-full h-full" ref="modal__container" id="modal__container">
    <div
      id="detailModal"
      class="context-menu absolute"
      v-if="isActive"
      style="display: block"
      @mousedown="dragMouseDown"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0,
      },
    };
  },
  props: {
    isActive: {
      type: Boolean,
    },
  },
  methods: {
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

<style></style>
