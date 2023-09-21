import {
  GetAllNoticesApi,
  ReadedNoticesApi,
} from "@/api/ApiNotices/ApiNotices";
import { defineStore } from "pinia";
export const useNoticesStore = defineStore("notices", {
  state: () => ({ listNotices: [], count_unread: null }),
  getters: {
    getAllNoticesUnread: (state) =>
      state.listNotices.filter((item) => item.is_read == 0),
  },
  actions: {
    async getAllNoticesAction(count) {
      const token = localStorage.getItem("TOKEN");
      await GetAllNoticesApi(token, count)
        .then((payload) => {
          this.listNotices = payload.data.data;
          this.count_unread = payload.data.total_unread;
        })
        .catch((err) => console.log(err));
    },
    async readedNoticesAction({ id, count }) {
      await ReadedNoticesApi(id)
        .then(() => {
          this.getAllNoticesAction(count);
        })
        .catch((err) => console.log(err));
    },
  },
});
