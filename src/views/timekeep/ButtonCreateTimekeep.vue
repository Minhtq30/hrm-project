<template>
  <div class="button-create relative group">
    <div
      class="text-sm absolute w-60 z-10 bg-white left-0 top-full rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible p-2 drop-shadow-xl before:content-[''] before:h-5 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
    >
      <ul>
        <li
          class="p-[10px] sub-item"
          @click="this.$router.push('/timekeep-attendance-assign-add')"
          title="Tạo mới phân ca"
        >
          Phân ca
        </li>
        <li
          class="p-[10px] sub-item"
          @click="this.$router.push('/timekeep-attendance-desist-add')"
          title="Tạo mới ngày nghỉ"
        >
          Quản lý ngày nghỉ
        </li>
        <li
          class="p-[10px] sub-item"
          @click="handleOpenDetail()"
          title="Tạo mới tự động chấm công"
        >
          Tự động chấm công
        </li>
        <li
          class="p-[10px] sub-item"
          @click="this.$router.push('/timekeep-attendance-machine-add')"
        >
          Máy chấm công
        </li>
        <li class="p-[10px] sub-item">Báo cáo chấm công theo tháng</li>
        <li class="p-[10px] sub-item" @click="handleOpenCompensatoryLeave()">
          Quản lý nghỉ bù
        </li>
      </ul>
    </div>
  </div>
  <teleport to="#app">
    <modal-view :isOpen="isOpenDetail" :handleCloseDetail="handleCloseDetail">
      <div>
        <h1 class="header-modal">cập nhật tự động chấm công</h1>
        <div class="text-left p-4">
          <div class="form-small">
            <label for="" class="form-group-label col-span-3">Nhân sự</label>
            <div>
              <v-select
                label="name"
                :options="listPersonnelsAttendanceFull"
                :reduce="(personnel) => personnel.ID"
                @search="loadPersonnel"
                @option:selected="changeInputPersonnel($event)"
                :filterable="false"
                placeholder="Tìm mã, họ tên"
                class="rounded-3xl"
                v-model="attendanceFull.personnel_id"
              >
                <template #option="{ code, name }">
                  <div style="display: flex; align-items: baseline">
                    <strong>{{ code }}</strong>
                    <em style="margin-left: 0.5rem">- {{ name }}</em>
                  </div>
                </template>
              </v-select>
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Mã NV</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="disabledInput p-3 w-full"
                disabled
                placeholder="Mã NV"
                v-model="subPersonnel.code"
              />
            </div>
          </div>
          <div class="form-small grid grid-cols-2 gap-2">
            <div>
              <label for="" class="form-group-label col-span-1">Từ ngày</label>
              <div>
                <date-picker v-model="attendanceFull.date_start"></date-picker>
              </div>
            </div>
            <div>
              <label for="" class="form-group-label col-span-1">Đến ngày</label>
              <div>
                <date-picker v-model="attendanceFull.date_end"></date-picker>
              </div>
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Phòng ban</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="disabledInput p-3 w-full"
                disabled
                placeholder="Phòng ban"
                :value="subPersonnel.department"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Vị trí</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="disabledInput p-3 w-full"
                disabled
                placeholder="Vị trí"
                :value="subPersonnel.position"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Chức vụ</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="disabledInput p-3 w-full"
                disabled
                placeholder="Chức vụ"
                :value="subPersonnel.positiontitle"
              />
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button
            class="button-modal"
            :class="{ disabledButtonCreated: isCreated }"
            @click="CreateAttendanceFull()"
          >
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseDetail()">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <modal-view
      :isOpen="isOpenCompensatoryLeave"
      :handleCloseDetail="handleCloseCompensatoryLeave"
    >
      <div>
        <h1 class="header-modal">thêm lịch sử nghỉ bù</h1>
        <div class="text-left p-4">
          <div class="form-large grid grid-cols-12 gap-2">
            <div class="col-span-8">
              <label for="" class="form-group-label">Mã NV</label>
              <div>
                <v-select
                  label="name"
                  :options="listPersonnelsAttendanceFull"
                  :reduce="(personnel) => personnel.ID"
                  @search="loadPersonnel"
                  @option:selected="changeInputPersonnel($event)"
                  :filterable="false"
                  placeholder="Tìm mã, họ tên"
                  class="rounded-3xl"
                >
                  <template #option="{ code, name }">
                    <div style="display: flex; align-items: baseline">
                      <strong>{{ code }}</strong>
                      <em style="margin-left: 0.5rem">- {{ name }}</em>
                    </div>
                  </template>
                </v-select>
              </div>
            </div>
            <div class="col-span-4">
              <label for="" class="form-group-label">Số giờ</label>
              <div>
                <input
                  type="number"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Số giờ"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal">Cập nhật</button>
          <button
            class="button-close-modal"
            @click="handleCloseCompensatoryLeave()"
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import datePicker from "@/components/datePicker/datePicker.vue";
import _ from "lodash";
import { useAttendanceFull } from "@/store/modules/timekeep/attendanceFull";
import { storeToRefs } from "pinia";
export default {
  components: {
    datePicker,
  },
  data() {
    return {};
  },
  setup() {
    const router = useRouter();
    const toast = useToast();
    const isOpenDetail = ref(false);
    const isOpenCompensatoryLeave = ref(false);
    const isLoading = ref();
    const isCreated = ref(false);
    const full = useAttendanceFull();
    const { listPersonnelsAttendanceFull } = storeToRefs(full);
    const attendanceFull = reactive({
      personnel_id: null,
      date_start: null,
      date_end: null,
    });
    const subPersonnel = reactive({
      code: null,
      department: null,
      position: null,
      positiontitle: null,
    });
    const handleOpenDetail = () => {
      isOpenDetail.value = true;
    };
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const handleCloseDetail = () => {
      isOpenDetail.value = false;
      attendanceFull.personnel_id = null;
      attendanceFull.date_start = null;
      attendanceFull.date_end = null;
      subPersonnel.code = null;
      subPersonnel.department = null;
      subPersonnel.position = null;
      subPersonnel.positiontitle = null;
    };
    const handleOpenCompensatoryLeave = () => {
      isOpenCompensatoryLeave.value = true;
    };
    const handleCloseCompensatoryLeave = () => {
      isOpenCompensatoryLeave.value = false;
    };
    const loadPersonnel = _.debounce((search, loading) => {
      if (search.length > 0) {
        loading(true);
        const data = {
          search: search,
          key: "WORKING",
        };
        full.SearchPersonnelsAttendanceFullAction({
          data,
          loading,
        });
      }
    }, 300);
    const changeInputPersonnel = (e) => {
      subPersonnel.code = e.code;
      subPersonnel.department = e.department;
      subPersonnel.position = e.position;
      subPersonnel.positiontitle = e.job_title_current;
    };
    const ActivatedButton = () => {
      isCreated.value = false;
    };
    const CreateAttendanceFull = () => {
      const data = {
        personnel_id: attendanceFull.personnel_id,
        date_start: attendanceFull.date_start,
        date_end: attendanceFull.date_end,
      };
      if (attendanceFull.personnel_id != null) {
        if (attendanceFull.date_start == null) {
          toast.warning("Vui lòng chọn ngày bắt đầu");
        } else {
          full.CreateAttendanceFullAction({
            data: data,
            handleCloseDetail,
            EndTimeLoading,
            router,
            toast,
            ActivatedButton,
          });
        }
      } else {
        toast.error("Vui lòng chọn nhân sự");
      }
    };
    return {
      isCreated,
      isOpenDetail,
      isOpenCompensatoryLeave,
      attendanceFull,
      subPersonnel,
      isLoading,
      handleOpenDetail,
      handleCloseDetail,
      handleOpenCompensatoryLeave,
      handleCloseCompensatoryLeave,
      EndTimeLoading,
      CreateAttendanceFull,
      loadPersonnel,
      listPersonnelsAttendanceFull,
      changeInputPersonnel,
      ActivatedButton,
    };
  },
};
</script>

<style></style>
