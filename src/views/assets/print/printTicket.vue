<template>
  <header class="clearfix">
    <div id="logo" class="text-left">
      <div class="text-left">
        CÔNG TY CỔ PHẦN ĐẦU TƯ THƯƠNG MẠI BÁCH TƯỜNG PHÁT
      </div>
      <div class="text-left">
        Tầng 5,N01-T4 Tower, chung cư Phú Mỹ complex, khu ngoại giao đoàn, Bắc
        Từ Liêm, Hà Nội
      </div>
    </div>
    <DIV class="title py-4">
      <h2 class="font-bold">BIÊN BẢN BÀN GIAO</h2>
      <h2 class="font-bold">TÀI SẢN, CÔNG CỤ DỤNG CỤ, TÀI LIỆU</h2></DIV
    >

    <div id="project" class="text-left w-full pt-10 px-10">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-6">
          <div class="text-left pt-2">
            <label for="" class=""
              >Ngày: {{ formatDate1(assetTicket.date_assign) }}
            </label>
          </div>
          <div class="text-left pt-2">
            <label for="" class="text-left"
              >Người giao: {{ assetTicket?.user_assignment_name }}</label
            >
          </div>
          <div class="text-left pt-2">
            <label for="" class="text-left"
              >Người nhận: {{ assetTicket?.user_assign_name }}</label
            >
          </div>
        </div>
        <div class="col-span-6">
          <div class="text-left pt-2">
            <label for="" class="text-left">Tại: Văn phòng công ty BTP</label>
          </div>
          <div class="text-left pt-2">
            <label for="" class="text-left"
              >Bộ phận:
              {{ assetTicket?.user_assignment_detail?.department_name }}</label
            >
          </div>
          <div class="text-left pt-2">
            <label for="" class="text-left"
              >Bộ phận:
              {{ assetTicket?.user_assign_detail?.department_name }}</label
            >
          </div>
        </div>
        <div class="col-span-12 text-left">
          <label for="" class="text-left pt-2"
            >Lý do bàn giao: {{ assetTicket?.description }}</label
          >
        </div>
      </div>
    </div>
  </header>
  <main>
    <div class="px-8">
      <table>
        <thead>
          <tr class="border">
            <th class="font-bold">TT</th>
            <th class="font-bold">Mã</th>
            <th class="text-left font-bold">
              Tên tài sản, trang thiết bị, tài liệu
            </th>
            <th class="text-center font-bold">ĐVT</th>
            <th class="text-center font-bold">Số lượng</th>
            <th class="text-center font-bold">Tình trạng</th>
            <th class="text-center font-bold">Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(asset, index) in assetTicket.assets" :key="index">
            <td class="">{{ asset.code }}</td>
            <td class="">{{ asset.code }}</td>
            <td class="text-left">
              {{ asset.name }}
            </td>
            <td class="text-center">Chiếc</td>
            <td class="text-center">01</td>
            <td class="">Sd bình thường</td>
            <td class="">{{ asset.code }}</td>
          </tr>
        </tbody>
      </table>
      <div id="notices px-8">
        <div class="italic text-right w-full">
          Hà nội, {{ formatDateToText(assetTicket.date_assign) }}
        </div>
        <div class="grid grid-cols-12 gap-4 mt-6">
          <div class="col-span-6 text-center">
            <DIV class="font-bold">BÊN GIAO</DIV>
            <DIV class="italic">(Ký ghi rõ họ tên)</DIV>
          </div>
          <div class="col-span-6 text-center">
            <DIV class="font-bold">BÊN NHẬN</DIV>
            <DIV class="italic">(Ký ghi rõ họ tên)</DIV>
          </div>
        </div>
        <footer>
          <div class="printDate text-left italic">
            Ngày in: {{ formatDate(asset.printDate) }}
          </div>
        </footer>
      </div>
    </div>
  </main>
</template>

<script>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
import { FormatDate } from "@/constants/FormatAll";
export default {
  components: {},
  setup() {
    // const router = useRouter();
    const route = useRoute();
    const store = useStore();
    store.dispatch("assetTicket/getTicketByIdAction", {
      id: route.params.ticketId,
      store,
    });
    const assetTicket = computed(
      () => store.state.assetTicket.getDataTicketById
    );
    const asset = reactive({
      printDate: new Date(),
    });
    return { asset, assetTicket };
  },
  methods: {
    formatDate1(date) {
      if (date == null) {
        return "";
      } else {
        return FormatDate(date);
      }
    },
    formatDateToText(date) {
      if (date == null) {
        return "";
      } else {
        const d = new Date(date);
        return (
          "ngày " +
          d.getDate() +
          " tháng " +
          (d.getMonth() + 1) +
          " năm " +
          d.getFullYear()
        );
      }
    },
    formatDate(date) {
      if (date == null) {
        return "";
      } else {
        return (
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear() +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes() +
          ":" +
          date.getSeconds()
        );
      }
    },
  },
};
</script>

<style>
.clearfix:after {
  content: "";
  display: table;
  clear: both;
}

a {
  color: #5d6975;
  text-decoration: underline;
}

body {
  position: relative;
  width: 28cm;
  /* height: 29.7cm; */
  margin: 0 auto;
  color: #001028;
  background: #ffffff;
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-family: Arial;
}

header {
  padding: 10px 0;
  margin-bottom: 30px;
}

#logo {
  text-align: center;
  margin-bottom: 10px;
}

#logo img {
  width: 90px;
}

h1 {
  border-top: 1px solid #5d6975;
  border-bottom: 1px solid #5d6975;
  color: #5d6975;
  font-size: 2.4em;
  line-height: 1.4em;
  font-weight: normal;
  text-align: center;
  margin: 0 0 20px 0;
}

#project {
  float: left;
}

#project span {
  color: #5d6975;
  text-align: right;
  width: 52px;
  margin-right: 10px;
  display: inline-block;
  font-size: 0.8em;
}

#company {
  float: right;
  text-align: right;
}

#project div,
#company div {
  white-space: nowrap;
}

table {
  width: 100%;
  border: collapse;
  border-spacing: 0;
  margin-bottom: 20px;
}

/* table tr:nth-child(2n-1) td {
  background: #f5f5f5;
  border: 1px solid #c1ced9;
} */
table tr td {
  border: 1px solid black;
}
table th,
table td {
  text-align: center;
  border: #001028;
}
table th {
  padding: 5px 20px;
  color: black;
  border: 1px solid black;
  white-space: nowrap;
  font-weight: normal;
}

table .service,
table .desc {
  text-align: left;
}

table td {
  padding: 20px;
  text-align: right;
}

table td.service,
table td.desc {
  vertical-align: top;
}

/* table td.unit,
table td.qty,
table td.total {
  font-size: 1.2em;
}

table td.grand {
  border-top: 1px solid #5d6975;
} */

#notices .notice {
  color: #5d6975;
  font-size: 1.2em;
}

footer {
  color: #5d6975;
  width: 100%;
  height: 30px;
  position: fixed;
  bottom: 0px;
  border-top: 1px solid #c1ced9;
  padding: 8px 0;
  text-align: center;
}
</style>
