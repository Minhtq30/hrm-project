<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-home></sidebar-home>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <template v-slot:search>
          <search-view :handleSearch="handleSearch"></search-view>
        </template>
        <div class="flex grow">
          <div class="flex items-center">
            <button-create-admin></button-create-admin>
            <p class="longText">Danh sách phòng ban</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar v-if="isLoading == false">
      <nav-feature>
        <div class="flex justify-between items-center w-full">
          <ul class="flex text-gray-400 py-3">
            <li
              class="px-4 py-1"
              :class="{ activeRouter: checkRoute('ACTIVE') }"
            >
              <router-link to="/page-department/type=ACTIVE"
                >Phòng ban, chi nhánh ({{
                  listDepartments?.length
                }})</router-link
              >
            </li>
            <li
              class="px-4 py-1"
              :class="{ activeRouter: checkRoute('BLOCK') }"
            >
              <router-link to="/page-department/type=BLOCK"
                >Kích hoạt phòng ban ({{
                  listDepartmentsLock?.length
                }})</router-link
              >
            </li>
          </ul>
          <div>
            <div class="flex">
              <div class="btn-icon">
                <div class="cx">
                  <i class="fal fa-file-export"></i>
                </div>
                <div class="action-label">Export</div>
              </div>
              <div class="btn-icon">
                <div class="cx">
                  <i class="fal fa-trash"></i>
                </div>
                <div class="action-label">Xóa</div>
              </div>
              <div
                class="btn-icon"
                @click="this.$router.push('/page-department/import')"
              >
                <div class="cx">
                  <i class="fal fa-file-import"></i>
                </div>
                <div class="action-label">Import</div>
              </div>
            </div>
          </div>
        </div>
      </nav-feature>
    </template>
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <div class="w-full">
          <div>
            <Transition name="slide-fade">
              <table
                class="table table-sm border text-left w-full whitespace-nowrap"
                v-if="checkRoute('ACTIVE')"
              >
                <thead>
                  <tr>
                    <th class="cellTable">
                      <input type="checkbox" name="" id="" />
                    </th>
                    <th class="cellTable">Tên phòng ban</th>
                    <th class="cellTable">Cấu trúc quyền</th>
                    <th class="cellTable">Loại phòng ban</th>
                    <th class="cellTable">Khối nghiệp vụ</th>
                    <th class="cellTable">Tình trạng</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="parent in parents" :key="parent.ID">
                    <tr
                      class="border hover:bg-slate-100"
                      @contextmenu.prevent="rightClick($event, parent)"
                    >
                      <td class="cellTable">
                        <input type="checkbox" name="" id="" />
                      </td>
                      <td
                        class="bg-light cellTable flex items-center uppercase font-medium"
                        :style="{ 'margin-left': `${parent.deep * 10}px ` }"
                        :class="{ isCompany: parent.deep == 0 }"
                      >
                        <div
                          v-if="childrenOf(parent.ID).length > 1"
                          class="font-weight-light cursor-pointer"
                          @click="parent.expanded = !parent.expanded"
                        >
                          <i
                            class="fal fa-folder-open mx-1"
                            v-show="parent.expanded"
                          ></i>
                          <i
                            class="fal fa-folder mx-1"
                            v-show="!parent.expanded"
                          ></i>
                        </div>
                        {{ parent.title }}
                      </td>
                      <td class="cellTable">{{ parent.type }}</td>
                      <td class="cellTable"></td>
                      <td class="cellTable"></td>
                      <td class="cellTable">
                        {{ formatStatus(parent.status) }}
                      </td>
                    </tr>
                    <template
                      v-for="parent1 in childrenOf(parent.ID)"
                      :key="parent1.ID"
                    >
                      <tr
                        v-show="parent.expanded"
                        class="border hover:bg-slate-100"
                        @contextmenu.prevent="rightClick($event, parent1)"
                      >
                        <td class="cellTable">
                          <input type="checkbox" name="" id="" />
                        </td>
                        <td
                          class="bg-light cellTable flex items-center uppercase font-medium"
                          :style="{
                            'margin-left': `${parent1.deep * 20}px `,
                          }"
                        >
                          <div
                            v-if="childrenOf(parent1.ID).length > 1"
                            class="font-weight-light cursor-pointer"
                            @click="parent1.expanded = !parent1.expanded"
                          >
                            <i
                              class="fal fa-folder-open mx-1"
                              v-show="parent1.expanded"
                            ></i>
                            <i
                              class="fal fa-folder mx-1"
                              v-show="!parent1.expanded"
                            ></i>
                          </div>
                          <span>{{ parent1.title }}</span>
                        </td>
                        <td class="cellTable">{{ parent1.type }}</td>
                        <td class="cellTable"></td>
                        <td class="cellTable"></td>
                        <td class="cellTable">
                          {{ formatStatus(parent1.status) }}
                        </td>
                      </tr>
                      <template
                        v-for="parent2 in childrenOf(parent1.ID)"
                        :key="parent2.ID"
                      >
                        <tr
                          v-show="parent1.expanded"
                          class="border hover:bg-slate-100"
                          @contextmenu.prevent="rightClick($event, parent2)"
                        >
                          <td class="cellTable">
                            <input type="checkbox" name="" id="" />
                          </td>
                          <td
                            class="bg-light cellTable flex items-center"
                            :style="{
                              'margin-left': `${parent2.deep * 20}px `,
                            }"
                          >
                            <div
                              v-if="childrenOf(parent2.ID).length > 1"
                              class="font-weight-light cursor-pointer"
                              @click="parent2.expanded = !parent2.expanded"
                            >
                              <i
                                class="fal fa-folder-open mx-1"
                                v-show="parent2.expanded"
                              ></i>
                              <i
                                class="fal fa-folder mx-1"
                                v-show="!parent2.expanded"
                              ></i>
                            </div>
                            <span>{{ parent2.title }}</span>
                          </td>
                          <td class="cellTable">{{ parent2.type }}</td>
                          <td class="cellTable"></td>
                          <td class="cellTable"></td>
                          <td class="cellTable">
                            {{ formatStatus(parent2.status) }}
                          </td>
                        </tr>
                        <template
                          v-for="parent3 in childrenOf(parent2.ID)"
                          :key="parent3.ID"
                        >
                          <tr
                            v-show="parent2.expanded"
                            class="border hover:bg-slate-100"
                            @contextmenu.prevent="rightClick($event, parent3)"
                          >
                            <td class="cellTable">
                              <input type="checkbox" name="" id="" />
                            </td>
                            <td
                              class="bg-light cellTable flex items-center"
                              :style="{
                                'margin-left': `${parent3.deep * 20}px `,
                              }"
                            >
                              <div
                                v-if="childrenOf(parent2.ID).length > 1"
                                class="font-weight-light cursor-pointer"
                                @click="parent3.expanded = !parent3.expanded"
                              >
                                <i
                                  class="fal fa-folder-open mx-1"
                                  v-show="parent3.expanded"
                                ></i>
                                <i
                                  class="fal fa-folder mx-1"
                                  v-show="!parent3.expanded"
                                ></i>
                              </div>
                              <span>{{ parent3.title }}</span>
                            </td>
                            <td class="cellTable">{{ parent3.type }}</td>
                            <td class="cellTable"></td>
                            <td class="cellTable"></td>
                            <td class="cellTable">
                              {{ formatStatus(parent3.status) }}
                            </td>
                          </tr>
                          <template
                            v-for="parent4 in childrenOf(parent3.ID)"
                            :key="parent4.ID"
                          >
                            <tr
                              v-show="parent3.expanded"
                              class="border hover:bg-slate-100"
                              @contextmenu.prevent="rightClick($event, parent4)"
                            >
                              <td class="cellTable">
                                <input type="checkbox" name="" id="" />
                              </td>
                              <td
                                class="bg-light cellTable flex items-center"
                                :style="{
                                  'margin-left': `${parent4.deep * 20}px `,
                                }"
                              >
                                <div
                                  v-if="childrenOf(parent3.ID).length > 1"
                                  class="font-weight-light cursor-pointer"
                                  @click="parent4.expanded = !parent4.expanded"
                                >
                                  <i
                                    class="fal fa-folder-open mx-1"
                                    v-show="parent4.expanded"
                                  ></i>
                                  <i
                                    class="fal fa-folder mx-1"
                                    v-show="!parent4.expanded"
                                  ></i>
                                </div>
                                <span>{{ parent4.title }}</span>
                              </td>
                              <td class="cellTable">{{ parent4.type }}</td>
                              <td class="cellTable"></td>
                              <td class="cellTable"></td>
                              <td class="cellTable">
                                {{ formatStatus(parent4.status) }}
                              </td>
                            </tr>
                            <template
                              v-for="parent5 in childrenOf(parent4.ID)"
                              :key="parent5.ID"
                            >
                              <tr
                                v-show="parent4.expanded"
                                class="border hover:bg-slate-100"
                                @contextmenu.prevent="
                                  rightClick($event, parent5)
                                "
                              >
                                <td class="cellTable">
                                  <input type="checkbox" name="" id="" />
                                </td>
                                <td
                                  class="bg-light cellTable flex items-center"
                                  :style="{
                                    'margin-left': `${parent5.deep * 20}px `,
                                  }"
                                >
                                  <div
                                    v-if="childrenOf(parent4.ID).length > 1"
                                    class="font-weight-light cursor-pointer"
                                    @click="
                                      parent5.expanded = !parent5.expanded
                                    "
                                  >
                                    <i
                                      class="fal fa-folder-open mx-1"
                                      v-show="parent5.expanded"
                                    ></i>
                                    <i
                                      class="fal fa-folder mx-1"
                                      v-show="!parent5.expanded"
                                    ></i>
                                  </div>
                                  <span>{{ parent5.title }}</span>
                                </td>
                                <td class="cellTable">{{ parent5.type }}</td>
                                <td class="cellTable"></td>
                                <td class="cellTable"></td>
                                <td class="cellTable">
                                  {{ formatStatus(parent5.status) }}
                                </td>
                              </tr>
                              <template
                                v-for="parent6 in childrenOf(parent5.ID)"
                                :key="parent6.ID"
                              >
                                <tr
                                  v-show="parent5.expanded"
                                  class="border hover:bg-slate-100"
                                  @contextmenu.prevent="
                                    rightClick($event, parent6)
                                  "
                                >
                                  <td class="cellTable">
                                    <input type="checkbox" name="" id="" />
                                  </td>
                                  <td
                                    class="bg-light cellTable flex items-center"
                                    :style="{
                                      'margin-left': `${parent6.deep * 20}px `,
                                    }"
                                  >
                                    <div
                                      v-if="childrenOf(parent5.ID).length > 1"
                                      class="font-weight-light cursor-pointer"
                                      @click="
                                        parent6.expanded = !parent6.expanded
                                      "
                                    >
                                      <i
                                        class="fal fa-folder-open mx-1"
                                        v-show="parent6.expanded"
                                      ></i>
                                      <i
                                        class="fal fa-folder mx-1"
                                        v-show="!parent6.expanded"
                                      ></i>
                                    </div>
                                    <span>{{ parent6.title }}</span>
                                  </td>
                                  <td class="cellTable">
                                    {{ parent6.type }}
                                  </td>
                                  <td class="cellTable"></td>
                                  <td class="cellTable"></td>
                                  <td class="cellTable">
                                    {{ formatStatus(parent6.status) }}
                                  </td>
                                </tr>
                                <template
                                  v-for="parent7 in childrenOf(parent6.ID)"
                                  :key="parent7.ID"
                                >
                                  <tr
                                    v-show="parent6.expanded"
                                    class="border hover:bg-slate-100"
                                    @contextmenu.prevent="
                                      rightClick($event, parent7)
                                    "
                                  >
                                    <td class="cellTable">
                                      <input type="checkbox" name="" id="" />
                                    </td>
                                    <td
                                      class="bg-light cellTable flex items-center"
                                      :style="{
                                        'margin-left': `${
                                          parent7.deep * 20
                                        }px `,
                                      }"
                                    >
                                      <span>{{ parent7.title }}</span>
                                      <div
                                        v-if="childrenOf(parent6.ID).length > 1"
                                        class="font-weight-light cursor-pointer"
                                        @click="
                                          parent7.expanded = !parent7.expanded
                                        "
                                      >
                                        <i
                                          class="fal fa-folder-open mx-1"
                                          v-show="parent7.expanded"
                                        ></i>
                                        <i
                                          class="fal fa-folder mx-1"
                                          v-show="!parent7.expanded"
                                        ></i>
                                      </div>
                                    </td>
                                    <td class="cellTable">
                                      {{ parent7.type }}
                                    </td>
                                    <td class="cellTable"></td>
                                    <td class="cellTable"></td>
                                    <td class="cellTable">
                                      {{ formatStatus(parent7.status) }}
                                    </td>
                                  </tr>
                                  <template
                                    v-for="parent8 in childrenOf(parent7.ID)"
                                    :key="parent8.ID"
                                  >
                                    <tr
                                      v-show="parent7.expanded"
                                      class="border hover:bg-slate-100"
                                      @contextmenu.prevent="
                                        rightClick($event, parent8)
                                      "
                                    >
                                      <td class="cellTable">
                                        <input type="checkbox" name="" id="" />
                                      </td>
                                      <td
                                        class="bg-light cellTable flex items-center"
                                        :style="{
                                          'margin-left': `${
                                            parent8.deep * 20
                                          }px `,
                                        }"
                                      >
                                        <span>{{ parent8.title }}</span>
                                        <div
                                          v-if="
                                            childrenOf(parent7.ID).length > 1
                                          "
                                          class="font-weight-light cursor-pointer"
                                          @click="
                                            parent8.expanded = !parent8.expanded
                                          "
                                        >
                                          <i
                                            class="fal fa-folder-open mx-1"
                                            v-show="parent8.expanded"
                                          ></i>
                                          <i
                                            class="fal fa-folder mx-1"
                                            v-show="!parent8.expanded"
                                          ></i>
                                        </div>
                                      </td>
                                      <td class="cellTable">
                                        {{ parent8.type }}
                                      </td>
                                      <td class="cellTable"></td>
                                      <td class="cellTable"></td>
                                      <td class="cellTable">
                                        {{ formatStatus(parent8.status) }}
                                      </td>
                                    </tr>
                                    <template
                                      v-for="parent9 in childrenOf(parent8.ID)"
                                      :key="parent9.ID"
                                    >
                                      <tr
                                        v-show="parent8.expanded"
                                        class="border hover:bg-slate-100"
                                        @contextmenu.prevent="
                                          rightClick($event, parent9)
                                        "
                                      >
                                        <td class="cellTable">
                                          <input
                                            type="checkbox"
                                            name=""
                                            id=""
                                          />
                                        </td>
                                        <td
                                          class="bg-light cellTable flex items-center"
                                          :style="{
                                            'margin-left': `${
                                              parent9.deep * 20
                                            }px `,
                                          }"
                                        >
                                          <span>{{ parent9.title }}</span>
                                          <div
                                            v-if="
                                              childrenOf(parent8.ID).length > 1
                                            "
                                            class="font-weight-light cursor-pointer"
                                            @click="
                                              parent9.expanded =
                                                !parent9.expanded
                                            "
                                          >
                                            <i
                                              class="fal fa-folder-open mx-1"
                                              v-show="parent9.expanded"
                                            ></i>
                                            <i
                                              class="fal fa-folder mx-1"
                                              v-show="!parent9.expanded"
                                            ></i>
                                          </div>
                                        </td>
                                        <td class="cellTable">
                                          {{ parent9.type }}
                                        </td>
                                        <td class="cellTable"></td>
                                        <td class="cellTable"></td>
                                        <td class="cellTable">
                                          {{ formatStatus(parent9.status) }}
                                        </td>
                                      </tr>
                                    </template>
                                  </template>
                                </template>
                              </template>
                            </template>
                          </template>
                        </template>
                      </template>
                    </template>
                  </template>
                </tbody>
              </table>
            </Transition>
          </div>
          <div>
            <Transition name="slide-fade">
              <div v-if="checkRoute('BLOCK')">
                <table
                  class="table table-sm border text-left w-full whitespace-nowrap"
                  v-if="listDepartmentsLock?.length"
                >
                  <thead>
                    <tr class="border">
                      <th class="cellTable">Tên phòng ban</th>
                      <th class="cellTable">Cấu trúc quyền</th>
                      <th class="cellTable">Loại phòng ban</th>
                      <th class="cellTable">Khối nghiệp vụ</th>
                      <th class="cellTable">Tình trạng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="depart in listDepartmentsLock"
                      :key="depart.ID"
                      class="border hover:bg-slate-100"
                      @contextmenu.prevent="rightClick($event, depart)"
                    >
                      <td class="cellTable">{{ depart.title }}</td>
                      <td class="cellTable">{{ depart.type }}</td>
                      <td class="cellTable"></td>
                      <td class="cellTable"></td>
                      <td class="cellTable">
                        {{ formatStatus(depart.status) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-else class="text-left p-2">Không tìm thấy kết quả</div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </Transition>
  </person-layout>
  <div>
    <context-menu :isActive="isActive">
      <ul>
        <li @click.prevent="handleEditDepartment()">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li
          @click.prevent="LockDepartment()"
          v-show="departmentClick?.status == 1"
        >
          <i class="fal fa-lock-alt"></i><a href="#">Khóa phòng ban</a>
        </li>
        <li
          @click.prevent="UnlockDepartment()"
          v-show="departmentClick?.status == 0"
        >
          <i class="fal fa-lock-open-alt"></i
          ><a href="#">Kích hoạt phòng ban</a>
        </li>
        <li @click.prevent="handleOpenConfirm">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
      </ul>
    </context-menu>
  </div>
  <teleport to="#app">
    <modal-view
      :isOpen="isOpenCreateDepartment"
      :handleCloseDetail="handleCloseEditDepartment"
    >
      <div>
        <h1 class="header-modal">Sửa phòng ban</h1>
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
                  v-model="departmentClick.type"
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
                  v-model="departmentClick.code"
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
                placeholder="Nhập hình thức"
                v-model="departmentClick.title"
              />
            </div>
          </div>
          <div class="mt-2">
            <label for="" class="form-group-label">Thuộc phòng ban</label>
            <div>
              <v-select
                label="title"
                :options="listDepartmentsFull"
                :reduce="(department) => department.ID"
                placeholder="Chọn phòng ban"
                v-model="departmentID"
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
                v-model="departmentClick.type"
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
                v-model="departmentClick.desc"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="EditDepartment()">
            Cập nhật
          </button>
          <button
            class="button-close-modal"
            @click="handleCloseEditDepartment()"
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="DeleteDepartment"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
  </teleport>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarHome from "@/components/sidebar/SidebarHome.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import SearchView from "@/components/search/SearchView.vue";
import ButtonCreateAdmin from "./ButtonCreateAdmin.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import {
  FormatModalX,
  FormatModalY,
  FormatStatus,
} from "@/constants/FormatAll";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
export default {
  components: {
    NavFeature,
    PersonLayout,
    SidebarHome,
    NavbarSocial,
    SearchView,
    ButtonCreateAdmin,
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const route = useRoute();
    const checkDepartment = ref([]);
    const checkedAll = ref(false);
    const isActive = ref(false);
    const isOpenCreateDepartment = ref(false);
    const departmentClick = ref();
    const departmentID = ref();
    const isLoading = ref(true);
    const isOpenConfirm = ref(false);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("departments/getAllDepartmentsEndTimeLoadingAction", {
      EndTimeLoading,
    });
    const listDepartments = computed(
      () => store.getters["departments/getAllDepartmentActive"]
    );
    const listDepartmentsFull = computed(
      () => store.getters["departments/getFullDepartmentActive"]
    );
    const listDepartmentsLock = computed(
      () => store.getters["departments/getAllDepartmentInactive"]
    );
    const listTypes = computed(() => store.state.departments.listTypes);
    const listPermission = computed(
      () => store.state.departments.listPermission
    );
    const checkRoute = (index) => {
      if (index == route.params.type) {
        return true;
      } else {
        return false;
      }
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listDepartments.value) {
          checkDepartment.value.push(listDepartments.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkDepartment.value.splice(0, checkDepartment.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkDepartment.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const rightClick = (e, department) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        departmentClick.value = department;
        departmentID.value = Number(department.parent_id);
      }
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      store.dispatch("departments/SearchDepartmentsAction", {
        search: dataSearch.wordSearch,
        EndTimeLoading,
      });
      console.log(listDepartments);
      console.log(store.state);
    };
    const LockDepartment = () => {
      const dataID = {
        id: departmentClick.value.ID,
        status: 0,
      };
      store.dispatch("departments/ChangeStatusDepartmentAction", {
        dataID,
        toast,
        EndTimeLoading,
      });
    };
    const UnlockDepartment = () => {
      const dataID = {
        id: departmentClick.value.ID,
        status: 1,
      };
      store.dispatch("departments/ChangeStatusDepartmentAction", {
        dataID,
        toast,
        EndTimeLoading,
      });
    };
    const DeleteDepartment = () => {
      store.dispatch("departments/DeleteDepartmentAction", {
        id: departmentClick.value.ID,
        EndTimeLoading,
        handleCloseConfirm,
      });
    };
    const handleEditDepartment = () => {
      isOpenCreateDepartment.value = true;
      store.dispatch("departments/getFullDepartmentsAction");
    };
    const handleCloseEditDepartment = () => {
      isOpenCreateDepartment.value = false;
    };
    const EditDepartment = () => {
      const newData = {
        ID: departmentClick.value.ID,
        data: {
          code: departmentClick.value.code,
          title: departmentClick.value.title,
          parent_id: departmentID.value,
          type: departmentClick.value.type,
          desc: departmentClick.value.desc,
          status: departmentClick.value.status,
        },
      };
      store.dispatch("departments/UpdateDepartmentAction", {
        data: newData,
        toast,
        handleCloseEditDepartment,
        EndTimeLoading,
      });
    };
    return {
      listDepartments,
      isOpenCreateDepartment,
      checkedAllItem,
      CheckedBox,
      checkDepartment,
      checkedAll,
      isOpenConfirm,
      rightClick,
      isActive,
      departmentClick,
      listPermission,
      listTypes,
      isLoading,
      departmentID,
      LockDepartment,
      UnlockDepartment,
      listDepartmentsLock,
      handleSearch,
      DeleteDepartment,
      handleEditDepartment,
      listDepartmentsFull,
      handleCloseEditDepartment,
      EditDepartment,
      checkRoute,
      EndTimeLoading,
      handleCloseConfirm,
      handleOpenConfirm,
    };
  },
  data() {
    return {
      header: ["Tên phòng ban", "Cấp phòng ban", "ID"],
      hideShow: false,
    };
  },
  computed: {
    parents() {
      if (this.listDepartments.find((item) => item.deep == 0)) {
        return this.listDepartments.filter((item) => item.deep == 0);
      } else {
        return this.listDepartments.filter((item) => item.deep);
      }
    },
    children() {
      return this.listDepartments.filter((item) => item.parent_id);
    },
  },
  methods: {
    childrenOf(id) {
      let tg;
      const arr = this.listDepartments.filter((item) => item.parent_id == id);
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i].ord > arr[j].ord) {
            tg = arr[i];
            arr[i] = arr[j];
            arr[j] = tg;
          }
        }
      }
      return arr;
    },
    formatStatus(status) {
      return FormatStatus(status);
    },
  },
};
</script>

<style>
.isCompany {
  color: rgb(252, 55, 55);
}
</style>
