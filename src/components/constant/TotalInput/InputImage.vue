<template>
  <div
    class="w-full relative h-40 border-dashed border border-gray-400 rounded-lg hover:border-orange-400 icon-parent"
  >
    <input
      type="file"
      accept="image/*"
      @change="changeImage($event)"
      name=""
      id=""
      class="absolute top-0 right-0 cursor-pointer w-full h-full opacity-0"
      style="z-index: 2"
    />
    <img
      :src="img || 'https://www.namepros.com/attachments/empty-png.89209/'"
      alt=""
      class="absolute object-cover top-0 right-0 w-full h-full rounded-lg"
    />
    <div
      class="absolute cursor-pointer w-full h-full flex items-center justify-center"
    >
      <i class="bi bi-upload text-4xl icon-child opacity-50"></i>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  props: {
    image: {
      type: null,
    },
  },
  emits: ["change_image"],
  setup(props, { emit }) {
    const img = ref(props.image);
    const changeImage = (event) => {
      const file = event.target.files[0];
      const theReader = new FileReader();
      theReader.onloadend = async () => {
        emit("change_image", theReader.result);
      };
      theReader.readAsDataURL(file);
      img.value = URL.createObjectURL(file);
    };
    return {
      img,
      changeImage,
    };
  },
};
</script>

<style></style>
