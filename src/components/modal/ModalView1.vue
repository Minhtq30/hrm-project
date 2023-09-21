<script>
export default {
  name: "modal-vue",
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header"></slot>
          <div class="">
            <!-- <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal"
            >
            </button> -->
            <a class="btn-close" @click="close"
              ><i class="fal fa-times fa-sm"></i
            ></a>
          </div>
        </header>
        <section class="modal-body" id="modalDescription">
          <form>
            <slot name="body"></slot>
          </form>
        </section>
        <footer class="modal-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  background: #ffffff;
  box-shadow: 0px 0px 0px 0px;
  position: relative;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  max-height: 800px;
  border-radius: 3px;
  z-index: 999;
}

.modal-footer {
  padding: 10px;
  display: flex;
  z-index: 9;
}

.modal-header {
  /* padding: 8px; */
  padding: 5px;
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: white;
  justify-content: space-between;
  background-color: var(--color-primary);
  text-align: center;
  display: flex;
  z-index: 9;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
}

.modal-body {
  position: relative;
  overflow: hidden;
  padding: 0px 12px 20px 12px;
}

.btn-close {
  position: absolute;
  right: 10px;
  border: none;
  font-size: 20px;
  /* padding: 3px; */
  cursor: pointer;
  /* font-weight: bold; */
  color: white;
  background: transparent;
}
.btn-close:hover {
  transform: scale(1.2);
}
.btn-green {
  color: white;
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  border-radius: 3px;
  width: 100px;
  height: 35px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
