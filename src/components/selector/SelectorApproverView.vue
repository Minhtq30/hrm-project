<template>
  <div v-click-outside="hideSearch">
    <div class="xs-contents form-control-input relative" @click="showSearch()">
      <div class="xs-body" :placeholder="Placeholder">
        <slot v-if="arrkq[Num] != null" :item="arrht" name="selected"></slot>
      </div>
      <div>
        <span v-if="arrkq[Num] == null"><i class="fal fa-search"></i></span>
        <span v-else @click="removeKQ(Num)" title="Xóa tất cả"
          ><i class="fal fa-times hover:text-red-500"></i
        ></span>
      </div>
      <div
        class="xs-pop-body absolute bg-white left-0 right-0 top-full z-[100]"
        v-if="search"
        id="OptionFlexible"
      >
        <div class="hidden xs-pop-marks"></div>
        <div class="xs-pop-search-box">
          <input
            class="xs-pop-search-input"
            type="text"
            placeholder="Tìm kiếm... hoặc Esc để dừng tìm kiếm"
            ref="searchInput"
            @input="searchOption($event, Num)"
            @keyup.esc="hideSearch"
          />
          <div class="hidden xs-pop-panel"></div>
        </div>
        <div class="xs-pop-message hidden"></div>
        <div class="xs-pop-list format-scroll">
          <div v-if="listPersonnelApprove?.length == 0">
            Không tìm thấy kết quả
          </div>
          <div
            v-else
            class="xs-pop-item disabled-done xs-option-mixed"
            style="opacity: 1"
            @click="addItem(item, Num)"
            v-for="(item, index) in listPersonnelApprove"
            :key="index"
          >
            <slot :item="item" name="selectedOption"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import { useConfirmApproval } from "@/store/modules/approval/ConfirmApproval";
import { storeToRefs } from "pinia";
export default {
  props: {
    final: {
      type: Array,
    },
    Placeholder: {
      type: String,
    },
    Num: {
      type: Number,
    },
  },
  emits: ["selected"],
  setup(props, { emit }) {
    const confirm = useConfirmApproval();
    const { listPersonnelApprove } = storeToRefs(confirm);
    const search = ref(false);
    const searchInput = ref();
    const arrkq = ref(props.final);
    const arrCheck = ref();
    const arrht = ref();
    const showSearch = () => {
      search.value = true;
    };
    const hideSearch = () => {
      search.value = false;
    };
    const addItem = (item, index) => {
      arrkq.value[index] = Number(item.ID);
      arrht.value = item;
      emit("selected", item);
      setTimeout(() => {
        search.value = false;
      }, 100);
    };
    const removeKQ = (index) => {
      arrkq.value[index] = null;
      arrht.value = null;
    };
    let searchValue = ref();
    let debounce = ref();
    const searchOption = (search, index) => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        searchValue = search.target.value;
        confirm.getAllPersonnelApproveAction(searchValue, index + 1);
      }, 500);
    };
    return {
      search,
      searchValue,
      showSearch,
      debounce,
      searchInput,
      hideSearch,
      arrkq,
      arrht,
      addItem,
      removeKQ,
      arrCheck,
      listPersonnelApprove,
      searchOption,
    };
  },
};
</script>

<style>
.xs-contents {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  cursor: pointer;
}
.xs:not([multiple]) .xs-body {
  display: flex;
  align-items: center;
  overflow: hidden;
  flex-grow: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}
[placeholder].empty:not(:focus):before,
[placeholder]:empty:before {
  pointer-events: none;
  content: attr(placeholder);
  display: inline-block;
  color: #ccc;
  white-space: wrap;
}
.xs-pop-body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-self: stretch;
  overflow: overlay;
  min-height: 0;
  border: 1px solid #ccc;
  border-radius: 0 0 4px 4px;
}
.xs-pop-search-box {
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  overflow: hidden;
  border-radius: 4px;
  flex-shrink: 0;
}
.xs-pop-search-input {
  height: 42px;
  padding: 10px;
  line-height: 1.2;
  color: #111;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  flex-grow: 1;
  outline: none;
  font-size: 14px;
}
.xs-pop-list {
  overflow: auto;
  flex-grow: 1;
  position: relative;
  z-index: 999;
  padding: 10px;
  max-height: 250px;
}
.xs-pop-item {
  padding: 10px;
  user-select: none;
  display: flex;
  flex-direction: row;
  transition: background 0.2s;
  border-radius: 4px;
  border: 1px solid transparent;
  margin-bottom: 1px;
}
.xs-pop-item:hover,
.xs-pop-item[focused] {
  border: 1px solid #ccc;
  cursor: pointer;
}
.xs-choice {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  user-select: none;
  background: #f7f7f7;
  display: inline-flex;
  margin: 2px;
  padding: 2px 8px;
  font-size: 0.9em;
  user-select: none;
  flex-shrink: 0;
  border-radius: 8px;
}
.xs-choice:hover {
  background: rgb(230, 74, 25, 0.1);
  color: rgb(230, 74, 25);
}
.bgSelected {
  background-color: #f5f5f5;
}
</style>
