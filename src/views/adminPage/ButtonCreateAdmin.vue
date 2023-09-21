<template>
  <div class="button-create relative group">
    <div
      class="text-sm absolute w-48 z-10 bg-white left-0 top-full rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible p-2 drop-shadow-2xl before:content-[''] before:h-5 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
    >
      <ul>
        <li class="sub-item" @click="handleOpenCreateDepartment()">
          <span class="ml-4">Phòng ban chi nhánh</span>
        </li>
        <li class="sub-item" @click="this.$router.push('/admin-group-add')">
          <span class="ml-4">Nhóm người dùng</span>
        </li>
      </ul>
    </div>
  </div>
  <teleport to="#app">
    <modal-view
      :isOpen="isOpenCreateDepartment"
      :handleCloseDetail="handleCloseDetail"
    >
      <div>
        <h1 class="header-modal">tạo mới phòng ban</h1>
        <div class="text-left p-2 h-[500px] overflow-y-auto format-scroll">
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label for="" class="form-group-label"
                >Cấu trúc quyền<span class="text-red-600">*</span></label
              >
              <div>
                <v-select
                  label="title"
                  :options="listPermission"
                  :reduce="(permission) => permission.type"
                  placeholder="Chọn loại phòng ban"
                  v-model="department.type"
                ></v-select>
              </div>
            </div>
            <div>
              <label for="" class="form-group-label">Mã</label>
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập mã phòng ban"
                  v-model="department.code"
                />
              </div>
            </div>
          </div>
          <div class="mt-2">
            <label for="" class="form-group-label"
              >Tên phòng ban<span class="text-red-600">*</span></label
            >
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập tên phòng ban"
                v-model="department.title"
              />
            </div>
          </div>
          <div class="mt-2">
            <label for="" class="form-group-label">Thuộc phòng ban</label>
            <div>
              <v-select
                label="title"
                :options="listDepartments"
                :reduce="(department) => department.ID"
                placeholder="Chọn phòng ban"
                v-model="department.parent_id"
              ></v-select>
            </div>
          </div>
          <div class="mt-2">
            <label for="" class="form-group-label">Khối nghiệp vụ</label>
            <select name="" id="" class="form-control-select">
              <option value="" selected disabled>
                Danh sách khối nghiệp vụ
              </option>
            </select>
            <p class="text-xs mt-2" style="color: #777">
              Lựa chọn cài đặt này giúp người quản trị có thể xuất ra các báo
              cáo theo nghiệp vụ. VD:Báo cáo lương của khối nghiệp vụ kế toán,
              kinh doanh,..
            </p>
          </div>
          <div class="mt-2">
            <label for="">Loại phòng ban</label>
            <div>
              <v-select
                label="title"
                :options="listTypes"
                :reduce="(city) => city.type"
                placeholder="Chọn loại phòng ban"
                v-model="department.type"
              ></v-select>
            </div>
            <p class="text-xs mt-2" style="color: #777">
              Phòng ban là 1 đơn vị nội bộ trực thuộc doanh nghiệp, nó được hiểu
              là 1 nhóm/1 đội/1 phòng/1 ban/1 khối/..Để lên báo cáo một cách
              tường minh hơn, bạn nên cấu hình và lựa chọn cài đặt này
            </p>
          </div>
          <div class="mt-2">
            <label for="">Mô tả:</label>
            <div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="3"
                class="form-control-input"
                v-model="department.desc"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="CreateDepartment()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseDetail()">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
  <loading-overlay
    :isLoading="isLoadingShow"
    :handleEndLoading="EndTimeLoadingShow"
  ></loading-overlay>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { useToast } from "vue-toastification";
export default {
  setup() {
    const store = useStore();
    const isOpenCreateDepartment = ref(false);
    const isLoadingShow = ref(false);
    const fullPage = ref(true);
    const toast = useToast();
    const listTypes = computed(() => store.state.departments.listTypes);
    const listPermission = computed(
      () => store.state.departments.listPermission
    );
    const listDepartments = computed(
      () => store.getters["departments/getAllDepartmentActive"]
    );
    const EndTimeLoadingShow = () => {
      isLoadingShow.value = false;
    };
    const department = reactive({
      code: "",
      title: "",
      parent_id: 1,
      type: "DEPART",
      desc: "",
      status: 1,
    });
    const handleOpenCreateDepartment = () => {
      isLoadingShow.value = true;
      store.dispatch("departments/getAllDepartmentsAction");
      setTimeout(() => {
        isLoadingShow.value = false;
        isOpenCreateDepartment.value = true;
      }, 600);
    };
    const getDepartment = (id) => {
      const depart = listDepartments.value.find((item) => item.ID == id);
      return depart;
    };

    const handleCloseDetail = () => {
      isOpenCreateDepartment.value = false;
      department.code = "";
      department.title = "";
      department.parent_id = 1;
      department.type = "DEPART";
      department.desc = "";
      department.status = 1;
    };
    const CreateDepartment = () => {
      const data = {
        code: department.code,
        title: department.title,
        parent_id: department.parent_id,
        type: department.type,
        desc: department.desc,
        deep: Number(getDepartment(department.parent_id).deep) + 1,
        status: department.status,
      };
      if (department.title?.length > 0) {
        store.dispatch("departments/createDepartmentAction", {
          data,
          toast,
          handleCloseDetail,
          EndTimeLoading: EndTimeLoadingShow,
        });
      } else {
        toast.error("Vui lòng nhập tên phòng ban");
      }
    };
    return {
      isOpenCreateDepartment,
      department,
      isLoadingShow,
      fullPage,
      listTypes,
      listPermission,
      listDepartments,
      getDepartment,
      CreateDepartment,
      handleOpenCreateDepartment,
      handleCloseDetail,
      EndTimeLoadingShow,
    };
  },
};
</script>

<style></style>
