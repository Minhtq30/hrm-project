<template>
  <div class="container">
    <div class="card p-3">
      Notifications:
      <notify :user="user" :user_notifications="user_notifications" />
    </div>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Author</th>
          <th scope="col">Post_Action</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="post in pposts" :key="post.id">
          <tr>
            <th scope="row">1</th>
            <td>{{ post.title }}</td>
            <td></td>
            <td>
              <button type="btn btn-sm btn-info" @click="LikePost(post.id)">
                Like
              </button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";

import Notify from "./PostNotify.vue";

import { DebugGetPostList, DebugPostLike } from "@/api/debug/debug";
export default {
  props: ["posts", "user", "user_notifications"],
  components: {
    notify: Notify,
  },
  setup(props) {
    let pposts = ref([]);
    console.log("props: ", props);
    onMounted(() => {
      let s = DebugGetPostList();
      s.then(function (result) {
        pposts.value = result;
      });
      // pposts.value = DebugGetPostList();
    });

    function LikePost(id) {
      DebugPostLike(id);
    }

    return {
      pposts,
      LikePost,
    };
  },
};
</script>
