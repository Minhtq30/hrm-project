<template>
  <div class="w-[580px]">
    <h1 class="header-modal">
      {{ departmentDetail.title }} ({{ dateNow }} - {{ timeNow }})
    </h1>
    <div class="text-left">
      <tab-nav
        :tabs="[
          `Đang làm việc (${personnelWorking.length})`,
          `Nghỉ có lý do(${personnelAbsenceAproval.length})`,
          `Nghỉ không lý do(${personnelLeaveNoReason.length})`,
          `Ngoài giờ làm việc(${personnelTimeOut.length})`,
        ]"
        :selected="selected"
        :paddingTab="true"
        @selected="setSelected"
      >
      </tab-nav>
      <div class="p-2 mt-[6px] border-t max-h-[400px] overflow-auto">
        <the-tab
          :isSelected="selected == `Đang làm việc (${personnelWorking.length})`"
        >
          <div class="w-full">
            <table-responsive
              :header="header"
              :isShow="false"
              v-if="personnelWorking.length"
            >
              <tr
                class="bg-white border-b"
                v-for="(total, index) in personnelWorking"
                :key="index"
              >
                <td class="cellTable">
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-green-500 m-auto"
                  ></div>
                </td>
                <td class="cellTable cursor-pointer">{{ total.code }}</td>

                <td class="cellTable cursor-pointer">{{ total.name }}</td>
                <td class="cellTable cursor-pointer">
                  <span
                    class="cursor-pointer text-red-500 hover:underline"
                    v-if="
                      total.checktime != null &&
                      total.checktime?.approval_leave != ''
                    "
                    @click="
                      handleShowDetailApprovalLeave(
                        total.checktime?.detail_approval_leave?.ID
                      )
                    "
                    >Đơn xin nghỉ</span
                  >
                  <span
                    class="cursor-pointer text-red-500 hover:underline"
                    v-if="
                      total.checktime != null &&
                      total.checktime?.approval_meeting != ''
                    "
                    @click="
                      handleShowDetailApprovalLeave(
                        total.checktime?.detail_approval_meeting?.ID
                      )
                    "
                    >Đơn vắng mặt</span
                  >
                </td>
              </tr>
            </table-responsive>
            <div v-else class="p-2 flex flex-col justify-center">
              <h4>Không tìm thấy kết quả</h4>
              <div class="flex justify-center">
                <img :src="imgNoData" alt="" class="w-[100px] h-[100px]" />
              </div>
            </div>
          </div>
        </the-tab>
        <the-tab
          :isSelected="
            selected == `Nghỉ có lý do(${personnelAbsenceAproval.length})`
          "
        >
          <div class="w-full">
            <table-responsive
              :header="header"
              :isShow="false"
              v-if="personnelAbsenceAproval.length"
            >
              <tr
                class="bg-white border-b"
                v-for="(total, index) in personnelAbsenceAproval"
                :key="index"
              >
                <td class="cellTable">
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-yellow-500 m-auto"
                  ></div>
                </td>
                <td class="cellTable cursor-pointer">{{ total.code }}</td>

                <td class="cellTable cursor-pointer">{{ total.name }}</td>
                <td class="cellTable cursor-pointer">
                  <span
                    class="cursor-pointer text-red-500 hover:underline"
                    v-if="
                      total.checktime != null &&
                      total.checktime?.approval_leave != ''
                    "
                    @click="
                      handleShowDetailApprovalLeave(
                        total.checktime?.detail_approval_leave?.ID
                      )
                    "
                    >Đơn xin nghỉ</span
                  >
                  <span
                    class="cursor-pointer text-red-500 hover:underline"
                    v-if="
                      total.checktime != null &&
                      total.checktime?.approval_meeting != ''
                    "
                    @click="
                      handleShowDetailApprovalLeave(
                        total.checktime?.detail_approval_meeting?.ID
                      )
                    "
                    >Đơn vắng mặt</span
                  >
                </td>
              </tr>
            </table-responsive>
            <div v-else class="p-2 flex flex-col justify-center">
              <h4>Không tìm thấy kết quả</h4>
              <div class="flex justify-center">
                <img :src="imgNoData" alt="" class="w-[100px] h-[100px]" />
              </div>
            </div>
          </div>
        </the-tab>
        <the-tab
          :isSelected="
            selected == `Nghỉ không lý do(${personnelLeaveNoReason.length})`
          "
        >
          <div class="w-full">
            <table-responsive
              :header="header"
              :isShow="false"
              v-if="personnelLeaveNoReason.length"
            >
              <tr
                class="bg-white border-b"
                v-for="(total, index) in personnelLeaveNoReason"
                :key="index"
              >
                <td class="cellTable">
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-red-500 m-auto"
                  ></div>
                </td>
                <td class="cellTable cursor-pointer">{{ total.code }}</td>

                <td class="cellTable cursor-pointer">{{ total.name }}</td>
                <td class="cellTable cursor-pointer">
                  <span
                    class="cursor-pointer text-red-500 hover:underline"
                    v-if="
                      total.checktime != null &&
                      total.checktime?.approval_leave != ''
                    "
                    @click="
                      handleShowDetailApprovalLeave(
                        total.checktime?.detail_approval_leave?.ID
                      )
                    "
                    >Đơn xin nghỉ</span
                  >
                  <span
                    class="cursor-pointer text-red-500 hover:underline"
                    v-if="
                      total.checktime != null &&
                      total.checktime?.approval_meeting != ''
                    "
                    @click="
                      handleShowDetailApprovalLeave(
                        total.checktime?.detail_approval_meeting?.ID
                      )
                    "
                    >Đơn vắng mặt</span
                  >
                </td>
              </tr>
            </table-responsive>
            <div v-else class="p-2 flex flex-col justify-center">
              <h4>Không tìm thấy kết quả</h4>
              <div class="flex justify-center">
                <img :src="imgNoData" alt="" class="w-[100px] h-[100px]" />
              </div>
            </div>
          </div>
        </the-tab>
        <the-tab
          :isSelected="
            selected == `Ngoài giờ làm việc(${personnelTimeOut.length})`
          "
        >
          <div class="w-full">
            <table-responsive
              :header="header"
              :isShow="false"
              v-if="personnelTimeOut.length"
            >
              <tr
                class="bg-white border-b"
                v-for="(total, index) in personnelTimeOut"
                :key="index"
              >
                <td class="cellTable">
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-gray-500 m-auto"
                  ></div>
                </td>
                <td class="cellTable cursor-pointer">{{ total.code }}</td>

                <td class="cellTable cursor-pointer">{{ total.name }}</td>
                <td class="cellTable cursor-pointer">
                  <span
                    class="cursor-pointer text-red-500 hover:underline"
                    v-if="
                      total.checktime != null &&
                      total.checktime?.approval_leave != ''
                    "
                    @click="
                      handleShowDetailApprovalLeave(
                        total.checktime?.detail_approval_leave?.ID
                      )
                    "
                    >Đơn xin nghỉ</span
                  >
                  <span
                    class="cursor-pointer text-red-500 hover:underline"
                    v-if="
                      total.checktime != null &&
                      total.checktime?.approval_meeting != ''
                    "
                    @click="
                      handleShowDetailApprovalLeave(
                        total.checktime?.detail_approval_meeting?.ID
                      )
                    "
                    >Đơn vắng mặt</span
                  >
                </td>
              </tr>
            </table-responsive>
            <div v-else class="p-2 flex flex-col justify-center">
              <h4>Không tìm thấy kết quả</h4>
              <div class="flex justify-center">
                <img :src="imgNoData" alt="" class="w-[100px] h-[100px]" />
              </div>
            </div>
          </div>
        </the-tab>
      </div>
    </div>
    <!-- <div class="bg-button-modal">
      <button class="button-modal" @click="handleUpdateWork()">Cập nhật</button>
      <button class="button-close-modal" @click="CloseEdit()">Hủy bỏ</button>
    </div> -->
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import TheTab from "@/components/tab/TheTab.vue";
import TabNav from "@/components/tab/TabNav.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import noData from "@/assets/images/noData.png";
export default {
  components: { TheTab, TabNav, TableResponsive },
  data() {
    return {
      header: ["Trạng thái", "Mã NV", "Họ và tên", "Lý do"],
      imgNoData: noData,
    };
  },
  props: {
    DepartmentDetail: {
      type: Object,
    },
    // closeEdit: {
    //   type: Function,
    // },
  },
  methods: {},
  setup(props) {
    const departmentDetail = ref(props.DepartmentDetail);
    console.log(departmentDetail.value);
    const timeNow = new Date().toLocaleTimeString("it-IT");
    const dateNow = new Date().toISOString().substring(0, 10);
    const personnelWorking = departmentDetail.value.details.filter(
      (item) =>
        item.has_approval == "N" &&
        item.leave_no_reason == "N" &&
        item.shift_ids != ""
    );
    const personnelAbsenceAproval = departmentDetail.value.details.filter(
      (item) => item.has_approval == "Y"
    );
    const personnelLeaveNoReason = departmentDetail.value.details.filter(
      (item) => item.leave_no_reason == "Y"
    );
    const personnelTimeOut = departmentDetail.value.details.filter(
      (item) =>
        item.shift_time_end < timeNow ||
        item.shift_time_start > timeNow ||
        item.shift_ids == ""
    );
    let count = personnelWorking.length;
    const selected = ref(`Đang làm việc (${count})`);
    // const CloseEdit = () => {
    //   props.closeEdit();
    // };
    const setSelected = (tab) => {
      selected.value = tab;
    };
    return {
      departmentDetail,
      selected,
      personnelWorking,
      personnelAbsenceAproval,
      personnelLeaveNoReason,
      personnelTimeOut,
      timeNow,
      dateNow,
      setSelected,
      // CloseEdit,
    };
  },
};
</script>

<style></style>
