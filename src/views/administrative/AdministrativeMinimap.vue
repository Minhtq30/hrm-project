<template>
  <person-layout>
    <template v-slot:sidebar>
      <SideBarAdministrative></SideBarAdministrative>
    </template>
    <template v-slot:navbar>
      <navbar-social
        ><div class="flex grow">
          <div class="flex items-center">
            <div class="flex items-center">
              <Transition name="slide-fade">
                <div
                  class="button-create relative group"
                  title="Tạo mới đơn từ"
                >
                  <div
                    class="text-black text-sm absolute w-48 z-10 bg-white left-0 top-full rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible p-2 drop-shadow-xl before:content-[''] before:h-5 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
                  >
                    <ul>
                      <li
                        class="p-[10px] hover:bg-slate-100 hover:rounded-lg flex justify-between items-center relative sub-dropdown"
                        @click="handleOpenCreateMap()"
                      >
                        Tạo mới phòng ban
                      </li>
                    </ul>
                  </div>
                </div>
              </Transition>
              <p class="longText">Minimap</p>
              <div class="icon-filter-approval relative group"></div>
            </div>
          </div></div
      ></navbar-social>
    </template>
    <div class="relative">
      <div class="h-[180px] absolute w-[200px] border-2 z-10 mt-[25%] ml-[1%]">
        <div class="pt-[10px]">
          <span>Chú thích</span>
          <div class="pt-[20px]">
            <div class="flex items-center">
              <div
                class="h-[14px] w-[14px] rounded-xl border-2 bg-green-500 ml-[10px]"
              ></div>
              <p class="pl-[30px]">Đang làm việc</p>
            </div>
            <div class="flex items-center">
              <div
                class="h-[14px] w-[14px] rounded-xl border-2 bg-yellow-500 ml-[10px]"
              ></div>
              <p class="pl-[30px]">Nghỉ có lý do</p>
            </div>
            <div class="flex items-center">
              <div
                class="h-[14px] w-[14px] rounded-xl border-2 bg-red-500 ml-[10px]"
              ></div>
              <p class="pl-[30px]">Nghỉ không lý do</p>
            </div>
            <div class="flex items-center">
              <div
                class="h-[14px] w-[14px] rounded-xl border-2 bg-gray-500 ml-[10px]"
              ></div>
              <p class="pl-[30px]">Ngoài giờ làm việc</p>
            </div>
          </div>
        </div>
      </div>
      <Transition>
        <div class="minimap relative z-0">
          <div
            v-for="(item, index) in dataStatusPersonnelOffice"
            :key="index"
            class="h-[70px] border-solid border-2 cursor-pointer absolute"
            :style="`width:${item.width}px;
            height:${item.height}px;
            top:${item.top}%;
            left:${item.left}%`"
            @click="openDetailAttendance(item)"
            @contextmenu.prevent="rightClick($event, item)"
          >
            <h1 v-html="item.title"></h1>
            <div class="pt-[5px]">
              <ul class="flex justify-around">
                <li>
                  <div>
                    <div
                      class="h-[14px] w-[14px] rounded-xl border-2 bg-green-500"
                    ></div>
                    <div>{{ item.count_detail.count_person_working }}</div>
                  </div>
                </li>
                <li>
                  <div>
                    <div
                      class="h-[14px] w-[14px] rounded-xl border-2 bg-yellow-500"
                    ></div>
                    <div>{{ item.count_detail.count_has_approval }}</div>
                  </div>
                </li>
                <li>
                  <div>
                    <div
                      class="h-[14px] w-[14px] rounded-xl border-2 bg-red-500"
                    ></div>
                    <div>{{ item.count_detail.count_leave_no_reason }}</div>
                  </div>
                </li>
                <li>
                  <div>
                    <div
                      class="h-[14px] w-[14px] rounded-xl border-2 bg-gray-500"
                    ></div>
                    <div>{{ item.count_detail.count_end_shift }}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- <div
          class="w-[150px] h-[70px] border-solid border-2 cursor-pointer absolute left-[15.5%] top-[77%]"
        >
          <h1>Phòng 3</h1>
          <div class="pt-[5px]">
            <ul class="flex justify-around">
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-green-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-red-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-yellow-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="w-[150px] h-[70px] border-solid border-2 cursor-pointer absolute left-[42.5%] top-[9.5%]"
        >
          <h1>Phòng 4</h1>
          <div class="pt-[5px]">
            <ul class="flex justify-around">
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-green-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-red-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-yellow-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="w-[150px] h-[70px] border-solid border-2 cursor-pointer absolute left-[60.5%] top-[9.5%]"
        >
          <h1>Phòng 5</h1>
          <div class="pt-[5px]">
            <ul class="flex justify-around">
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-green-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-red-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-yellow-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="w-[150px] h-[70px] border-solid border-2 cursor-pointer absolute left-[75.5%] top-[6%]"
        >
          <h1>Phòng 6</h1>
          <div class="pt-[5px]">
            <ul class="flex justify-around">
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-green-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-red-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-yellow-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="w-[150px] h-[70px] border-solid border-2 cursor-pointer absolute left-[87%] top-[8%]"
        >
          <h1>Phòng 7</h1>
          <div class="pt-[5px]">
            <ul class="flex justify-around">
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-green-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-red-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-yellow-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="w-[150px] h-[70px] border-solid border-2 cursor-pointer absolute left-[71.5%] top-[33%]"
        >
          <h1>Phòng R&D</h1>
          <div class="pt-[5px]">
            <ul class="flex justify-around">
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-green-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-red-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-yellow-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="w-[150px] h-[70px] border-solid border-2 cursor-pointer absolute left-[81.5%] top-[50%]"
        >
          <h1>Phòng CNTT</h1>
          <div class="pt-[5px]">
            <ul class="flex justify-around">
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-green-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-red-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-yellow-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="w-[150px] h-[70px] border-solid border-2 cursor-pointer absolute left-[77%] top-[56.5%]"
        >
          <h1>Phòng Kế Toán</h1>
          <div class="pt-[5px]">
            <ul class="flex justify-around">
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-green-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-red-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-yellow-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="w-[130px] h-[70px] border-solid border-2 cursor-pointer absolute left-[88%] top-[76.5%]"
        >
          <h1>Phòng Phó Tổng GĐ</h1>
          <div class="pt-[5px]">
            <ul class="flex justify-around">
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-green-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-red-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-yellow-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="w-[100px] h-[85px] border-solid border-2 cursor-pointer absolute left-[81.5%] top-[76.5%]"
        >
          <h1>
            Phòng <br />
            C&B
          </h1>
          <div class="pt-[5px]">
            <ul class="flex justify-around">
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-green-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-red-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-yellow-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="w-[100px] h-[85px] border-solid border-2 cursor-pointer absolute left-[75%] top-[76.5%]"
        >
          <h1>Phòng KD Massage</h1>
          <div class="pt-[5px]">
            <ul class="flex justify-around">
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-green-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-red-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-yellow-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="w-[150px] h-[100px] border-solid border-2 cursor-pointer absolute left-[87%] top-[64.5%]"
        >
          <h1>Ban trợ lý</h1>
          <div class="pt-[15px]">
            <ul class="flex justify-around">
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-green-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-red-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-yellow-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="w-[150px] h-[100px] border-solid border-2 cursor-pointer absolute left-[77%] top-[67.5%]"
        >
          <h1>Phòng Admin</h1>
          <div class="pt-[15px]">
            <ul class="flex justify-around">
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-green-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-red-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-yellow-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="w-[220px] h-[100px] border-solid border-2 cursor-pointer absolute left-[62%] top-[67.5%]"
        >
          <h1>Phòng Giám Sát KD</h1>
          <div class="pt-[15px]">
            <ul class="flex justify-around">
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-green-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-red-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-yellow-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="w-[170px] h-[120px] border-solid border-2 cursor-pointer absolute left-[50%] top-[68.5%]"
        >
          <h1>
            Phòng Hành Chính <br />
            Nhân Sự
          </h1>
          <div class="pt-[20px]">
            <ul class="flex justify-around">
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-green-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-red-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-yellow-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="w-[170px] h-[120px] border-solid border-2 cursor-pointer absolute left-[38%] top-[68.5%]"
        >
          <h1>
            Phòng Chăm Sóc <br />
            Khách Hàng
          </h1>
          <div class="pt-[20px]">
            <ul class="flex justify-around">
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-green-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-red-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-yellow-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="w-[220px] h-[100px] border-solid border-2 cursor-pointer absolute left-[23%] top-[67.5%]"
        >
          <h1>Phòng Marketing</h1>
          <div class="pt-[15px]">
            <ul class="flex justify-around">
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-green-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-red-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-yellow-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="w-[170px] h-[120px] border-solid border-2 cursor-pointer absolute left-[15%] top-[50.5%]"
        >
          <h1>
            Phòng Thiết Kế <br />
            Thi Công
          </h1>
          <div class="pt-[20px]">
            <ul class="flex justify-around">
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-green-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-red-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
              <li>
                <div>
                  <div
                    class="h-[14px] w-[14px] rounded-xl border-2 bg-yellow-500"
                  ></div>
                  <div>1</div>
                </div>
              </li>
            </ul>
          </div>
        </div> -->
        </div>
      </Transition>
      <teleport to="#app">
        <modal-view
          :isOpen="isOpenCreateDepartmentMap"
          :handleCloseDetail="handleCloseCreate"
        >
          <div>
            <h1 class="header-modal">tạo mới phòng ban</h1>
            <div
              class="text-left p-2 min-h-[300px] min-w-[500px] overflow-y-auto format-scroll"
            >
              <div class="mt-2">
                <label for="" class="form-group-label">Tên phòng ban</label>
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập tên phòng ban"
                    v-model="dataCreate.title"
                  />
                </div>
              </div>
              <div class="mt-2">
                <label for="" class="form-group-label">Mã phòng ban</label>
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập mã phòng ban"
                    v-model="dataCreate.code"
                  />
                </div>
              </div>
              <div class="mt-2">
                <label for="" class="form-group-label"
                  >Phòng ban tương ứng</label
                >
                <div>
                  <v-select
                    label="title"
                    :options="listDepartments"
                    :reduce="(department) => department.ID"
                    placeholder="Chọn phòng ban"
                    @option:selected="changeInputDepartment($event)"
                    v-model="dataCreate.department_id"
                  ></v-select>
                </div>
              </div>
              <div class="mt-2">
                <label for="" class="form-group-label">Nhân sự</label>
                <div>
                  <v-select
                    label="name"
                    class="max-h-[200px]"
                    :options="listPersonnels"
                    :reduce="(listPersonnel) => listPersonnel.ID"
                    placeholder="Chọn nhân sự"
                    v-model="dataCreate.list_personnel"
                    multiple
                  ></v-select>
                </div>
              </div>
              <div class="mt-2">
                <label for="" class="form-group-label"
                  >Vị trí(% từ trên xuống so với khung bản đồ)</label
                >
                <div>
                  <input
                    type="number"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập số"
                    v-model="dataCreate.top"
                  />
                </div>
              </div>
              <div class="mt-2">
                <label for="" class="form-group-label"
                  >Vị trí(% từ bên trái sang so với khung bản đồ)</label
                >
                <div>
                  <input
                    type="number"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập số"
                    v-model="dataCreate.left"
                  />
                </div>
              </div>
              <div class="mt-2">
                <label for="" class="form-group-label">Chiều rộng</label>
                <div>
                  <input
                    type="number"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập chiều rộng"
                    v-model="dataCreate.width"
                  />
                </div>
              </div>
              <div class="mt-2">
                <label for="" class="form-group-label">Chiều dài</label>
                <div>
                  <input
                    type="number"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập chiều dài"
                    v-model="dataCreate.height"
                  />
                </div>
              </div>
            </div>
            <div class="bg-button-modal">
              <button class="button-modal" @click="CreateDepartment()">
                Tạo
              </button>
              <button class="button-close-modal" @click="handleCloseCreate()">
                Hủy bỏ
              </button>
            </div>
          </div>
        </modal-view>
      </teleport>
      <teleport to="#app">
        <modal-view
          :isOpen="isOpenUpdateDepartmentMap"
          :handleCloseDetail="handleCloseUpdate"
        >
          <div>
            <h1 class="header-modal">Sửa phòng ban</h1>
            <div
              class="text-left p-2 min-h-[300px] min-w-[500px] overflow-y-auto format-scroll"
            >
              <div class="mt-2">
                <label for="" class="form-group-label">Tên phòng ban</label>
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập tên phòng ban"
                    v-model="dataDetailPersonnelOffice.title"
                  />
                </div>
              </div>
              <div class="mt-2">
                <label for="" class="form-group-label">Mã phòng ban</label>
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập mã phòng ban"
                    v-model="dataDetailPersonnelOffice.code"
                  />
                </div>
              </div>
              <div class="mt-2">
                <label for="" class="form-group-label"
                  >Phòng ban tương ứng</label
                >
                <div>
                  <v-select
                    label="title"
                    :options="listDepartments"
                    :reduce="(department) => department.ID"
                    placeholder="Chọn phòng ban"
                    @option:selected="changeInputDepartment($event)"
                    v-model="IdDepartment"
                  ></v-select>
                </div>
              </div>
              <div class="mt-2">
                <label for="" class="form-group-label">Nhân sự</label>
                <div class="">
                  <v-select
                    class="max-h-[200px]"
                    label="name"
                    :options="listPersonnels"
                    :reduce="(listPersonnel) => listPersonnel.ID"
                    placeholder="Chọn nhân sự"
                    v-model="dataDetailPersonnelOffice.list_personnel"
                    multiple
                  ></v-select>
                </div>
              </div>
              <div class="mt-2">
                <label for="" class="form-group-label"
                  >Vị trí(% từ trên xuống so với khung bản đồ)</label
                >
                <div>
                  <input
                    type="number"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập số"
                    v-model="dataDetailPersonnelOffice.top"
                  />
                </div>
              </div>
              <div class="mt-2">
                <label for="" class="form-group-label"
                  >Vị trí(% từ bên trái sang so với khung bản đồ)</label
                >
                <div>
                  <input
                    type="number"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập số"
                    v-model="dataDetailPersonnelOffice.left"
                  />
                </div>
              </div>
              <div class="mt-2">
                <label for="" class="form-group-label">Chiều rộng</label>
                <div>
                  <input
                    type="number"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập chiều rộng"
                    v-model="dataDetailPersonnelOffice.width"
                  />
                </div>
              </div>
              <div class="mt-2">
                <label for="" class="form-group-label">Chiều dài</label>
                <div>
                  <input
                    type="number"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập chiều dài"
                    v-model="dataDetailPersonnelOffice.height"
                  />
                </div>
              </div>
            </div>
            <div class="bg-button-modal">
              <button class="button-modal" @click="EditDepartmentMap()">
                Cập nhật
              </button>
              <button class="button-close-modal" @click="handleCloseUpdate()">
                Hủy bỏ
              </button>
            </div>
          </div>
        </modal-view>
      </teleport>
    </div>
  </person-layout>
  <div>
    <context-menu :isActive="isActive">
      <ul>
        <li @click.prevent="OpenModalEditDepartmentMap()">
          <i class="fal fa-edit"></i> <a href="#">Sửa</a>
        </li>
        <li @click.prevent="handleOpenConfirm()">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
      </ul>
    </context-menu>
  </div>
  <!-- <teleport to="#app">
    <modal-delete
      v-if="checkTotal?.length == 0"
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="handleDeleteApproval"
    >
    </modal-delete>
    <modal-delete
      v-else
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="removeDeleteApproval"
    >
    </modal-delete>
  </teleport> -->
  <modal-delete
    :isOpen="isOpenConfirmDelete"
    :handleCloseDetail="handleCloseConfirm"
    :ConfirmDelete="DeleleDepartmentMap"
  >
  </modal-delete>
  <teleport to="#app">
    <modal-view
      :isOpen="isopenDetailAttendance"
      :handleCloseDetail="closeDetailAttendance"
    >
      <ModalDetailMinimap
        :closeEdit="closeDetailAttendance"
        :DepartmentDetail="departmentDetail"
      >
      </ModalDetailMinimap>
    </modal-view>
  </teleport>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
  <loading-overlay :isLoading="isLoadingLoad"></loading-overlay>
</template>

<script>
import PersonLayout from "@/layouts/person-layout.vue";
import SideBarAdministrative from "@/components/sidebar/SideBarAdministrative.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { use5sViolation } from "@/store/modules/approval/Approval5s";
import ModalDetailMinimap from "./ModalDetailMinimap.vue";
import ModalDelete from "@/components/modal/ModalDelete.vue";
import { useToast } from "vue-toastification";
// import noData from "@/assets/images/noData.png";
import { ref, reactive, computed } from "@vue/reactivity";
import { storeToRefs } from "pinia";
import { useStore } from "vuex";
import _ from "lodash";
import { FormatModalX, FormatModalY } from "@/constants/FormatAll";
// import { watch } from "@vue/runtime-core";
// import { useRoute, useRouter } from "vue-router";
// import { useToast } from "vue-toastification";
// import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
// import { useReasonLeave } from "@/store/modules/settingApproval/ReasonLeave";
// import { useUserProfile } from "@/store/modules/user/userProfile";
// import { storeToRefs } from "pinia";
export default {
  components: {
    PersonLayout,
    SideBarAdministrative,
    NavbarSocial,
    ModalDetailMinimap,
    ModalDelete,
  },

  setup() {
    const isopenDetailAttendance = ref(false);
    const store = useStore();
    const toast = useToast();
    const isLoading = ref(true);
    const isLoadingLoad = ref(false);
    const isOpenCreateDepartmentMap = ref(false);
    const isOpenUpdateDepartmentMap = ref(false);
    const isActive = ref(false);
    const isOpenConfirmDelete = ref(false);
    const dataDepartmentMap = ref();
    const administrative = use5sViolation();
    const {
      dataStatusPersonnelOffice,
      personnelByDepart,
      personnelByDepartID,
      dataDetailPersonnelOffice,
    } = storeToRefs(administrative);
    const IdDepartment = computed(() =>
      Number(dataDetailPersonnelOffice.value.department_id)
    );
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const rightClick = (e, item) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        administrative.GetDetailMapDepartmentAction(item.ID);
      }
    };
    const OpenModalEditDepartmentMap = () => {
      isOpenUpdateDepartmentMap.value = true;
    };
    const handleCloseUpdate = () => {
      isOpenUpdateDepartmentMap.value = false;
    };
    const dataMapAll = reactive([
      {
        department_title: "Phòng đào tạo",
        left: "21.5",
        top: "8",
        width: "150",
        height: "70",
      },
      {
        department_title: "Phòng 3",
        left: "15.5",
        top: "77",
        width: "150",
        height: "70",
      },
      {
        department_title: "Phòng 4",
        left: "42.5",
        top: "9.5",
        width: "150",
        height: "70",
      },
      {
        department_title: "Phòng 5",
        left: "60.5",
        top: "9.5",
        width: "150",
        height: "70",
      },
      {
        department_title: "Phòng 6",
        left: "75.5",
        top: "6",
        width: "150",
        height: "70",
      },
      {
        department_title: "Phòng 7",
        left: "87",
        top: "8",
        width: "150",
        height: "70",
      },
      {
        department_title: "Phòng R&D",
        left: "71.5",
        top: "33",
        width: "150",
        height: "70",
      },
      {
        department_title: "Phòng CNTT",
        left: "81.5",
        top: "50",
        width: "150",
        height: "70",
      },
      {
        department_title: "Phòng Kế Toán",
        left: "77",
        top: "56.5",
        width: "150",
        height: "70",
      },
      {
        department_title: "Phòng Phó Tổng GĐ",
        left: "88",
        top: "76.5",
        width: "130",
        height: "70",
      },
      {
        department_title: "Phòng <br/> C&B",
        left: "81.5",
        top: "76.5",
        width: "100",
        height: "85",
      },
      {
        department_title: "Phòng <br/> KD Massage",
        left: "75",
        top: "76.5",
        width: "100",
        height: "85",
      },
      {
        department_title: "Ban trợ lý",
        left: "87",
        top: "64.5",
        width: "150",
        height: "100",
      },
      {
        department_title: "Phòng Admin",
        left: "77",
        top: "67.5",
        width: "150",
        height: "100",
      },
      {
        department_title: "Phòng Giám Sát KD",
        left: "62",
        top: "67.5",
        width: "150",
        height: "70",
      },
      {
        department_title: "Phòng HCNS",
        left: "50",
        top: "68.5",
        width: "150",
        height: "70",
      },
      {
        department_title: "Phòng CSKH",
        left: "38",
        top: "68.5",
        width: "150",
        height: "70",
      },
      {
        department_title: "Phòng Marketing",
        left: "23",
        top: "67.5",
        width: "150",
        height: "70",
      },
      {
        department_title: "Phòng Thiết kế thi công",
        left: "15",
        top: "50.5",
        width: "150",
        height: "70",
      },
    ]);
    const dataCreate = reactive({
      title: "",
      code: "",
      department_id: null,
      list_personnel: [],
      top: "",
      left: "",
      width: "",
      height: "",
      // status: "",
    });
    let selectedPersonnel = reactive([]);
    store.dispatch("personnels/getAllPersonnelNoPaginateAction");
    const loadPersonnel = _.debounce((event) => {
      store.dispatch("personnels/SearchPersonnelAction", event.target.value);
    }, 400);
    const listPersonnels = computed(
      () => store.state.personnels.listPersonnelNoPaginate
    );
    const changeInputPersonnel = (event) => {
      selectedPersonnel = event.map((item) => item.ID);
      console.log(selectedPersonnel);
      // store.dispatch("personnels/SearchPersonnelAction", event.ID);
    };
    const listDepartments = computed(
      () => store.getters["departments/getAllDepartmentActive"]
    );
    store.dispatch("departments/getAllDepartmentsAction");
    const departmentDetail = ref();
    // administrative.GetAll5sViolationAction({ EndTimeLoading });
    administrative.GetAllStatusPersonnelOfficeAction({ EndTimeLoading });
    const openDetailAttendance = (item) => {
      isopenDetailAttendance.value = true;
      departmentDetail.value = item;
    };
    const handleOpenCreateMap = () => {
      isOpenCreateDepartmentMap.value = true;
    };
    const closeDetailAttendance = () => {
      isopenDetailAttendance.value = false;
    };
    const handleCloseCreate = () => {
      isOpenCreateDepartmentMap.value = false;
      dataCreate.title = "";
      dataCreate.code = "";
      dataCreate.department_id = null;
      dataCreate.list_personnel = [];
      dataCreate.top = "";
      dataCreate.left = "";
      dataCreate.width = "";
      dataCreate.height = "";
    };
    const getPersonnelByDepartment = (listId) => {
      dataCreate.list_personnel = listId;
      dataDetailPersonnelOffice.value.list_personnel = listId;
    };
    const changeInputDepartment = (event) => {
      isLoading.value = true;
      administrative.ListPersonnelByDepartmentMapAction(
        event.ID,
        getPersonnelByDepartment,
        EndTimeLoading
      );
    };
    const CreateDepartment = () => {
      let data = {
        title: dataCreate.title,
        code: dataCreate.code,
        department_id: dataCreate.department_id,
        list_personnel: dataCreate.list_personnel,
        top: dataCreate.top,
        left: dataCreate.left,
        width: dataCreate.width,
        height: dataCreate.height,
      };
      administrative.CreateDepartmentOnMapAction(
        data,
        toast,
        EndTimeLoading,
        handleCloseCreate
      );
    };
    const EditDepartmentMap = () => {
      let data = {
        title: dataDetailPersonnelOffice.value.title,
        code: dataDetailPersonnelOffice.value.code,
        department_id: IdDepartment.value,
        list_personnel: dataDetailPersonnelOffice.value.list_personnel,
        top: dataDetailPersonnelOffice.value.top,
        left: dataDetailPersonnelOffice.value.left,
        width: dataDetailPersonnelOffice.value.width,
        height: dataDetailPersonnelOffice.value.height,
      };
      administrative.UpdateDepartmentOnMapAction(
        dataDetailPersonnelOffice.value.ID,
        data,
        toast,
        EndTimeLoading,
        handleCloseUpdate
      );
    };
    const handleCloseConfirm = () => {
      isOpenConfirmDelete.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirmDelete.value = true;
    };
    const DeleleDepartmentMap = () => {
      administrative.DeleteDepartmentOnMapAction(
        dataDetailPersonnelOffice.value.ID,
        toast,
        EndTimeLoading,
        handleCloseConfirm
      );
    };
    return {
      isopenDetailAttendance,
      administrative,
      dataStatusPersonnelOffice,
      isLoading,
      dataMapAll,
      departmentDetail,
      listDepartments,
      isOpenCreateDepartmentMap,
      dataCreate,
      selectedPersonnel,
      loadPersonnel,
      listPersonnels,
      personnelByDepart,
      personnelByDepartID,
      isLoadingLoad,
      toast,
      isActive,
      isOpenUpdateDepartmentMap,
      dataDepartmentMap,
      dataDetailPersonnelOffice,
      isOpenConfirmDelete,
      IdDepartment,
      DeleleDepartmentMap,
      EditDepartmentMap,
      rightClick,
      handleCloseConfirm,
      handleOpenConfirm,
      OpenModalEditDepartmentMap,
      handleCloseUpdate,
      CreateDepartment,
      handleCloseCreate,
      getPersonnelByDepartment,
      changeInputPersonnel,
      EndTimeLoading,
      changeInputDepartment,
      openDetailAttendance,
      closeDetailAttendance,
      handleOpenCreateMap,
    };
  },
};
</script>

<style>
.minimap {
  height: 1600px;
  width: 1600px;
  background-image: url("@/assets/images/layout_map_MB.png");
  background-repeat: no-repeat;
  overflow: auto;
}
/* .container {
  height: 150%;
  width: 120%;
  position: relative;
  display: inline-block;
} */
</style>
