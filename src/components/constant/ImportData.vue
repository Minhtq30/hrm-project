<template>
  <div class="form-group-label">
    Chú ý: Chọn các trường dữ liệu tương ứng từ file excel bạn có để thực hiện
    import hàng loạt
  </div>
  <div class="form-file form-small">
    <input type="file" name="file" @change="onChange" />
    <div class="flex justify-between items-center w-full" v-if="fileSelected">
      <div class="form-file-label">{{ fileSelected }}</div>
      <div class="form-file-btn icon-upload"></div>
    </div>
    <div class="flex justify-between items-center w-full" v-else>
      <div class="form-file-label">Đính kèm file excel .xlsx</div>
      <div class="form-file-btn icon-upload"></div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { read, utils } from "xlsx";
import { useToast } from "vue-toastification";
export default {
  props: {
    Rows: {
      type: Array,
    },
  },
  setup(props) {
    const fileSelected = ref();
    const rows = ref(props.Rows);
    const toast = useToast();
    const onChange = (event) => {
      const arr = event.target.value.split(".");
      if (arr[1] == "xlsx") {
        const file = event.target.files ? event.target.files[0] : null;
        fileSelected.value = file.name;
        if (file) {
          const reader = new FileReader();
          // const arrayBuffer = new arrayBuffer();
          reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            // const wb = read(bstr);
            const wb = read(bstr, {
              type: "binary",
              cellDates: true,
              dateNF: "dd/mm/yyyy",
              locale: "vi-VN",
            });
            /* Get first worksheet */
            rows.value = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            //delete header
            rows.value.splice(0, 1);
          };
          reader.readAsBinaryString(file);
        }
      } else {
        toast.error("Không đúng định dạng file");
      }
    };
    return {
      onChange,
      fileSelected,
    };
  },
};
</script>

<style></style>
