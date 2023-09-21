import {
  AddMembersInGroupApi,
  ChangeAvatarGroupApi,
  ChangeBannerGroupApi,
  CreateSocialGroupApi,
  DeleteSocialGroupApi,
  GetAllGroupJoinedApi,
  GetAllMembersInGroupApi,
  GetAllPostGroupApi,
  GetAllSocialGroupApi,
  UpdateSocialGroupApi,
  GetDetailGroupApi,
} from "@/api/ApiSocial/ApiSocialGroup";
import { CreateSocialNewApi } from "@/api/ApiSocial/ApiSocialNew";
import { URL_IMG } from "@/constants/ApiUrl";
import { defineStore } from "pinia";
export const useSocialGroup = defineStore("SocialGroup", {
  state: () => ({
    listGroup: [],
    listGroupJoined: [],
    groupDetail: {},
    listPostGroup: [],
    listMembersInGroup: [],
  }),
  getters: {},
  actions: {
    setDataAllGroup(payload) {
      this.listGroup = payload.data;
    },
    setDataDetailGroup(payload) {
      this.groupDetail = payload.data;
    },
    setDataAllPostGroup(payload) {
      this.listPostGroup = payload.data_post;
      this.groupDetail = payload.data_group;
      if (payload.data_group.avatars == null) {
        this.avatar =
          "https://btpholdings.1office.vn/packages/4x/style/images/social/group.png";
      } else {
        this.avatar = URL_IMG + "/" + payload.data_group?.avatars;
      }
      if (payload.data_group.banners == null) {
        this.banner =
          "https://btpholdings.1office.vn/packages/4x/style/images/social/default-group-cover2.png";
      } else {
        this.banners = URL_IMG + "/" + payload.data_group?.banners;
      }
    },
    setDataAllGroupJoined(payload) {
      this.listGroupJoined = payload.data;
    },
    setDataAllMembersInGroup(payload) {
      this.listMembersInGroup = payload.data;
    },
    async GetDetailGroupAction({ id, EndTimeLoading }) {
      await GetDetailGroupApi(id)
        .then((payload) => {
          this.setDataDetailGroup(payload.data);
          EndTimeLoading();
        })
        .catch((err) => console.log(err));
    },
    async GetAllSocialGroupAction({ EndTimeLoading }) {
      await GetAllSocialGroupApi()
        .then((payload) => {
          this.setDataAllGroup(payload.data);
          EndTimeLoading();
        })
        .catch((err) => console.log(err));
    },
    async GetAllGroupJoinedAction({ EndTimeLoading }) {
      await GetAllGroupJoinedApi()
        .then((payload) => {
          this.setDataAllGroupJoined(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async CreateSocialGroupAction({
      data,
      toast,
      handleCloseCreateGroup,
      EndTimeLoading,
    }) {
      await CreateSocialGroupApi(data)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.error(res.data.messages);
          } else {
            this.GetAllSocialGroupAction({ EndTimeLoading });
            this.GetAllGroupJoinedAction({ EndTimeLoading });
            toast.success("Tạo mới thành công");
            handleCloseCreateGroup();
          }
        })
        .catch((err) => console.log(err));
    },
    async UpdateSocialGroupAction({
      dataGroup,
      toast,
      handleCloseEditGroup,
      EndTimeLoading,
    }) {
      await UpdateSocialGroupApi(dataGroup)
        .then((res) => {
          if (res.status == "failed") {
            toast.error(res.messages);
            EndTimeLoading();
          } else {
            this.GetAllSocialGroupAction({ EndTimeLoading });
            toast.success("Cập nhật thành công");
            handleCloseEditGroup();
          }
        })
        .catch((err) => console.log(err));
    },
    async DeleteSocialGroupAction({
      id,
      toast,
      handleCloseConfirm,
      EndTimeLoading,
    }) {
      await DeleteSocialGroupApi(id)
        .then((res) => {
          if (res.status == "failed") {
            toast.error(res.messages);
            EndTimeLoading();
          } else {
            this.GetAllSocialGroupAction({ EndTimeLoading });
            toast.success("Xóa thành công");
            handleCloseConfirm();
          }
        })
        .catch((err) => {
          console.log(err);
          handleCloseConfirm();
          EndTimeLoading();
        });
    },
    async GetAllPostGroupAction({ id, count, toast, EndTimeLoading }) {
      await GetAllPostGroupApi(id, count)
        .then((payload) => {
          if (payload.data.status == "failed") {
            toast.error(payload.data.messages);
            EndTimeLoading();
          } else {
            this.setDataAllPostGroup(payload.data);
            EndTimeLoading();
          }
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async CreatePostGroupAction({
      data,
      toast,
      route,
      closeModal,
      count,
      EndTimeLoading,
    }) {
      await CreateSocialNewApi(data)
        .then((res) => {
          if (res.data.status == "failed") {
            toast.error(res.data.messages);
          } else {
            toast.success("Tạo mới thành công");
            this.GetAllPostGroupAction({
              id: route.params.idGroup,
              count: count,
              EndTimeLoading,
            });
            closeModal();
          }
        })
        .catch((err) => {
          if (err.response.data?.error) toast.error("That bai");
        });
    },
    async ChangeAvatarGroupAction({ data, toast, EndTimeLoading }) {
      await ChangeAvatarGroupApi(data)
        .then((payload) => {
          if (payload.data?.status == "failed") {
            toast.error("Thất bại");
            EndTimeLoading();
          } else {
            this.GetAllPostGroupAction({
              id: data.id,
              count: 5,
              EndTimeLoading,
            });
            toast.success("Đổi ảnh đại diện thành công");
          }
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async ChangeBannerGroupAction({ data, toast, EndTimeLoading }) {
      await ChangeBannerGroupApi(data)
        .then((payload) => {
          if (payload.data.status == "failed") {
            toast.error("Thất bại");
            EndTimeLoading();
          } else {
            this.GetAllPostGroupAction({
              id: data.id,
              count: 5,
              EndTimeLoading,
            });
            toast.success("Đổi ảnh bìa thành công");
          }
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async GetAllMembersInGroupAction({ id, EndTimeLoading }) {
      await GetAllMembersInGroupApi(id)
        .then((payload) => {
          this.setDataAllMembersInGroup(payload.data);
          EndTimeLoading();
        })
        .catch((err) => {
          console.log(err);
          EndTimeLoading();
        });
    },
    async AddMembersInGroupAction({
      dataGroup,
      route,
      handleCloseAddPerson,
      EndTimeLoading,
    }) {
      await AddMembersInGroupApi(dataGroup)
        .then(() => {
          this.GetAllMembersInGroupAction({
            id: route.params.idGroup,
            EndTimeLoading,
          });
          handleCloseAddPerson();
        })
        .catch((err) => console.log(err));
    },
  },
});
