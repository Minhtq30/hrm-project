import {
  OldSettingFurloughApi,
  UpdateSettingFurloughApi,
} from "@/api/ApiSettingTimekeep/ApiSettingTimekeep";
import { defineStore } from "pinia";
export const useSettingFurlough = defineStore("SettingFurlough", {
  state: () => ({
    OldSettingFurlough: null,
    TabSetting: [],
    ContractTypeStart: [
      {
        value: -1,
        title: "Ngày của hợp đồng đầu tiên được tính phép",
      },
      {
        value: -2,
        title: "Ngày vào của nhân sự",
      },
      {
        value: -3,
        title: "Ngày vào chính thức của nhân sự",
      },
      {
        value: 33,
        title: "Ngày của hợp đồng coongg tác viên",
      },
      {
        value: 39,
        title: "Ngày của hợp đồng đào tạo nghề xác định 6 tháng",
      },
      {
        value: 32,
        title: "Ngày của hợp đồng học việc",
      },
      {
        value: 37,
        title: "Ngày của hợp đồng không xác định thời hạn",
      },
      {
        value: 38,
        title: "Ngày của hợp đồng lao động không xác định thời hạn",
      },
      {
        value: 34,
        title: "Ngày của hợp đồng thử việc",
      },
      {
        value: 23,
        title: "Ngày của hợp đồng xác định thời hạn 12 tháng",
      },
      {
        value: 40,
        title: "Ngày của hợp đồng xác định thời hạn 36 tháng",
      },
      {
        value: 41,
        title: "Ngày của hợp đồng xác định thời hạn 6 tháng",
      },
    ],
    TypeSeniority: [
      {
        value: "JOB_DATE_JOIN",
        title: "Ngày bắt đầu làm việc",
      },
      {
        value: "CONTRACT_DATE_SIGN_FIRST",
        title: "Ngày ký hợp đồng đầu tiên",
      },
      {
        value: "CONTRACT_DATE_SIGN",
        title: "Ngày ký hợp đồng được tính phép",
      },
    ],
    StartAddFurlough: [
      {
        value: 0,
        title: "Trong năm",
      },
      {
        value: 1,
        title: "Năm sau",
      },
    ],
  }),
  getters: {},
  actions: {
    setDataSettingFurlough(payload) {
      this.OldSettingFurlough = payload.data.value;
      if (this.TabSetting?.length < payload.data.value?.length) {
        for (let i = 0; i < payload.data.value?.length; i++) {
          this.TabSetting.push(`Cài đặt ${i + 1}`);
        }
      }
    },
    async OldSettingFurloughAction({ EndTimeLoading }) {
      await OldSettingFurloughApi()
        .then((payload) => {
          this.setDataSettingFurlough(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async UpdateSettingFurloughAction({ data, toast, EndTimeLoading }) {
      await UpdateSettingFurloughApi(data)
        .then(() => {
          this.OldSettingFurloughAction({ EndTimeLoading });
          toast.success("Cập nhật thành công");
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
  },
});
