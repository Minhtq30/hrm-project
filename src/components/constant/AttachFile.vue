<template>
  <div class="form-file form-small">
    <input type="file" name="file" @change="onChange($event)" />
    <div class="flex justify-between items-center w-full">
      <div class="form-file-label">Đính kèm</div>
      <div class="form-file-btn icon-upload"></div>
    </div>
  </div>
  <div>
    <div>
      <div
        v-for="(file, index) in multiFile"
        :key="index"
        class="form-small flex justify-between items-center mt-2 bg-slate-100 rounded-xl p-3"
      >
        <div class="flex flex-col">
          <span>{{ file.name }}</span>
          <span>{{ formatSizeFile(file.size) }}</span>
        </div>
        <div>
          <span @click="removeFile(index)" class="cursor-pointer"
            ><i class="fal fa-times icon-close"></i
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { getReadableFileSizeString } from "@/constants/FormatAll";
export default {
  methods: {
    formatSizeFile(index) {
      return getReadableFileSizeString(index);
    },
    onChange(event) {
      const file = event.target.files[0];
      const theReader = new FileReader();
      theReader.onloadend = async () => {
        this.newImage.push(await theReader.result);
      };
      theReader.readAsDataURL(file);
      this.multiFile.push(file);
      this.fileEncode.push(this.newImage);
    },
  },
  data() {
    return {
      newImage: [],
    };
  },
  props: {
    arrFile: {
      type: Array,
    },
  },
  setup(props) {
    const multiFile = ref([]);
    const fileEncode = ref(props.arrFile);
    const removeFile = (index) => {
      multiFile.value.splice(index, 1);
    };
    return {
      multiFile,
      fileEncode,
      removeFile,
    };
  },
};
</script>

<style></style>
