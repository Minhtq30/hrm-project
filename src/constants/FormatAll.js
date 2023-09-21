import { MONEY_LATE, MONEY_SOON, URL_IMG } from "./ApiUrl";

export const FormatPriceInput = (price) => {
  return price.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export const FormatDate = (dateTime) => {
  if (dateTime) {
    if (dateTime == "0000-00-00") {
      return "";
    } else {
      let today = new Date(dateTime);
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1;
      let dd = today.getDate();
      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;
      today = dd + "/" + mm + "/" + yyyy;
      return today;
    }
  } else {
    return "";
  }
};
export const FormatInputDate = (dateTime) => {
  if (dateTime.length == 0) {
    return "";
  } else {
    let today = new Date(dateTime);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  }
};
export const FormatGender = (gender) => {
  if (gender == 0) {
    return "Nữ";
  } else if (gender == 1) {
    return "Nam";
  } else if (gender == 2) {
    return "Khác";
  } else {
    return "Trống";
  }
};
export const getReadableFileSizeString = (fileSizeInBytes) => {
  let i = -1;
  const byteUnits = [" kB", " MB", " GB", " TB", "PB", "EB", "ZB", "YB"];
  do {
    fileSizeInBytes = fileSizeInBytes / 1024;
    i++;
  } while (fileSizeInBytes > 1024);

  return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
};
export const FormatPrice = (price) => {
  if (price) {
    let val = (price / 1).toFixed(0).replace(",", ".");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return 0;
  }
};
export const FormatStatus = (status) => {
  if (status == 0) {
    return "Không hoạt động";
  } else {
    return "Hoạt động";
  }
};
export const FormatTrueFalse = (status) => {
  if (status == 0) {
    return "Không";
  } else if (status == 1) {
    return "Có";
  }
};
export const FormatMaritalStatus = (status) => {
  if (status == 0) {
    return "Độc thân";
  } else if (status == 1) {
    return "Kết hôn";
  } else if (status == 2) {
    return "Ly hôn";
  } else if (status == null) {
    return " ";
  }
};
export const FormatTitle = (id, array) => {
  if (id != null) {
    const arr = array.find((item) => item.ID == id);
    if (arr) {
      return arr.title;
    } else {
      return "";
    }
  } else {
    return "";
  }
};
export const FormatUpperCaseFirst = (str2) => {
  return str2
    .toLowerCase()
    .split(" ")
    .map(function (Word) {
      return Word[0].toUpperCase() + Word.substr(1);
    })
    .join(" ");
};
// Start Format Permission
export const FormatRoleDisable = (index, obj) => {
  if (obj.is_admin == "yes") {
    return false;
  } else {
    if (index == "PROFILE") {
      return false;
    } else if (obj?.roles?.find((item) => item.name == index)) {
      return false;
    } else {
      return true;
    }
  }
};
export const FormatRole = (index, obj) => {
  if (obj.is_admin == "yes") {
    return true;
  } else {
    if (index == "PROFILE") {
      return true;
    } else if (obj?.roles?.find((item) => item.name == index)) {
      return true;
    } else {
      return false;
    }
  }
};
// End Format Permission
export const FormatAssetStatus = (cod, array) => {
  if (cod) {
    const arr = array.find((item) => item.code == cod);
    if (arr) {
      return arr.name;
    } else {
      return "";
    }
  } else {
    return "";
  }
};
export const FormatPerson = (id, array) => {
  if (id) {
    const arr = array.find((item) => item.ID == id);
    if (arr) {
      return arr.code;
    } else {
      return "";
    }
  } else {
    return "";
  }
};
export const FormatStatusApproval = (status) => {
  if (status == "WAITING") {
    return "Chờ duyệt";
  } else if (status == "APPROVED") {
    return "Đã duyệt";
  } else if (status == "NO_APPROVED") {
    return "Không duyệt";
  } else if (status == "APPROVING") {
    return "Đang duyệt";
  } else {
    return status;
  }
};
export const FormatColorApproval = (status) => {
  if (status == "WAITING") {
    return "beacon-wait";
  } else if (status == "APPROVED") {
    return "beacon-success";
  } else if (status == "NO_APPROVED") {
    return "beacon-liquidation ";
  } else {
    return "beacon-wait";
  }
};
export const FormatDisableButtonApproval = (obj, user) => {
  if (obj.app_approval_status == "APPROVED") {
    return true;
  } else if (obj.app_approval_status == "NO_APPROVED") {
    return true;
  } else if (obj.app_approval_status == "APPROVING") {
    if (user.ID == obj.app_approval_current_ids) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
export const CheckUserCreateApproval = (obj, user) => {
  let check = true;
  if (obj.app_approval_status == "APPROVED") {
    check = false;
  } else if (obj.app_approval_status == "NO_APPROVED") {
    check = false;
  } else if (obj.app_approval_status == "APPROVING") {
    if (user.ID == obj.app_approval_current_ids) {
      return false;
    } else {
      return true;
    }
  } else {
    check = true;
  }
  // if (user.is_admin == "yes") {
  //   check = true;
  // } else {
  //   let check = obj.app_approval_ids.find((item) => item == user.ID);
  //   if (check) {
  //     check = true;
  //   } else {
  //     check = false;
  //   }
  // }
  return check;
};
export const CheckUserApproved = (id, user) => {
  if (user.is_admin == "yes") {
    return true;
  } else {
    let boolean = id.find((item) => item == user.ID);
    if (boolean) {
      return true;
    } else {
      return false;
    }
  }
};
export const CheckUserApprovedArray = (str, user) => {
  if (user.is_admin == "yes") {
    return true;
  } else {
    let check = str.find((item) => item == user.ID);
    if (check) {
      return true;
    } else {
      return false;
    }
  }
};
export const DateRange = (startDate, endDate, steps = 1) => {
  const dateArray = [];
  let currentDate = new Date(startDate.toUTCString());
  while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate).toISOString().substring(0, 10));
    currentDate.setUTCDate(currentDate.getUTCDate() + steps);
  }
  return dateArray;
};
export const FormatModalX = (menu, e) => {
  if (window.innerWidth - e.pageX > menu.clientWidth) {
    return (menu.style.left = e.pageX + "px");
  } else {
    return (menu.style.left = e.pageX - menu.clientWidth + "px");
  }
};
export const FormatModalY = (menu, e) => {
  if (window.innerHeight - e.pageY > menu.clientHeight) {
    return (menu.style.top = e.pageY + "px");
  } else {
    return (menu.style.top = e.pageY - menu.clientHeight + "px");
  }
};
export const FormatWeekdays = (index) => {
  if (index == 0) {
    return "CN";
  } else if (index == 1) {
    return "T2";
  } else if (index == 2) {
    return "T3";
  } else if (index == 3) {
    return "T4";
  } else if (index == 4) {
    return "T5";
  } else if (index == 5) {
    return "T6";
  } else {
    return "T7";
  }
};
export const FormatWeekend = (item) => {
  if (item == 0) {
    return "bg-[#dddddda3]";
  } else if (item == 6) {
    return "bg-[#eeeeee]";
  }
};
export const FormatWeekendShift = (item) => {
  let day = new Date(item);
  if (day.getDay() == 0) {
    return "bg-[#dddddda3]";
  } else if (day.getDay() == 6) {
    return "bg-[#eeeeee]";
  } else {
    return "bg-white";
  }
};
export const CountMinutesLate = (arr) => {
  let count = 0;
  for (let i = 0; i < arr?.length; i++) {
    let key = arr[i].result_check_checkin.split(",");
    if (Number(key[1]) < 0) {
      count = count + -Number(key[1]);
    }
  }
  return count;
};
export const CountMinutesSoon = (arr) => {
  let count = 0;
  for (let i = 0; i < arr?.length; i++) {
    let key = arr[i].result_check_checkout.split(",");
    if (key[0] == "soon") {
      count = count + Number(key[1]);
    }
  }
  return count;
};
export const CountMoneyLate = (arr) => {
  let count = 0;
  for (let i = 0; i < arr?.length; i++) {
    let key = arr[i].result_check_checkin.split(",");
    if (key[0] == "late") {
      if (-Number(key[1]) > 5) {
        count = count + -Number(key[1]);
      }
    }
  }
  return FormatPrice(count * MONEY_LATE);
};
export const CountMoneySoon = (arr) => {
  let count = 0;
  for (let i = 0; i < arr?.length; i++) {
    let key = arr[i].result_check_checkout.split(",");
    if (key[0] == "soon") {
      count = count + Number(key[1]);
    }
  }
  return FormatPrice(count * MONEY_SOON);
};
export const CountMinutesLateSingle = (obj) => {
  if (obj && obj.result_check_checkin) {
    let key = obj.result_check_checkin.split(",");
    if (key) {
      if (key[0] == "late") {
        return FormatPrice(Number(-key[1] * MONEY_LATE)) + ` (${-key[1]} phút)`;
      } else {
        return "";
      }
    }
  }
};
export const CountMinutesSoonSingle = (obj) => {
  if (obj & obj.result_check_checkout) {
    let key = obj.result_check_checkout.split(",");
    if (key) {
      if (key[0] == "soon") {
        return FormatPrice(Number(key[1] * MONEY_LATE)) + ` (${key[1]} phút)`;
      } else {
        return "";
      }
    }
  }
};
export const CheckLate = (obj) => {
  if (obj && obj.result_check_checkin) {
    let key = obj.result_check_checkin.split(",");
    if (key) {
      if (key[0] == "late" && Number(key[1] < -5) == true) {
        return true;
      } else {
        return false;
      }
    }
  }
};
export const CheckSoon = (obj) => {
  if (obj && obj.result_check_checkout) {
    let key = obj.result_check_checkout.split(",");
    if (key) {
      if (key[0] == "soon") {
        return true;
      } else {
        return false;
      }
    }
  }
};
export const FormatReasonFurlough = (key) => {
  const arr = [
    {
      key: "LEAVE",
      title: "Đơn xin nghỉ",
    },
    {
      key: "ADD_MONTH",
      title: "Cộng phép năm",
    },
    {
      key: "YEAR_MANUAL",
      title: "Sửa trực tiếp phép năm",
    },
    {
      key: "MANUAL",
      title: "Sửa trực tiếp số phép đã sử dụng",
    },
    {
      key: "ACCUMULATION_MANUAL",
      title: "Sửa trực tiếp phép lũy kế",
    },
    {
      key: "SENIORITY_MANUAL",
      title: "Sửa trực tiếp phép thâm niên",
    },
  ];
  if (key) {
    const final = arr.find((item) => item.key == key);
    if (final) {
      return final.title;
    } else {
      return "";
    }
  }
};
export const CatchError = ({ res, toast, EndTimeLoading }) => {
  if (res.response.status == 403) {
    toast.error("Bạn không có quyền thực hiện chức năng này");
    EndTimeLoading();
  } else {
    toast.error(res);
  }
};
export const FormatColorContract = (status) => {
  if (status == 1 || status == 0) {
    return "beacon-wait";
  } else if (status == 2) {
    return "beacon-success";
  } else if (status == 4 || status == 3) {
    return "beacon-liquidation";
  }
};
export const FormatStatusContract = (status) => {
  if (status == 0) {
    return "Chưa hiệu lực";
  } else if (status == 4) {
    return "Thanh lý";
  } else if (status == 3) {
    return "Hết hạn";
  } else if (status == 2) {
    return "Đang hiệu lực";
  } else if (status == 1) {
    return "Chưa hiệu lực";
  }
};
export const FormatApiApproval = (key) => {
  if (key == "all") {
    return (key = "");
  } else if (key == "waiting") {
    return (key = "WAITING");
  } else if (key == "approved") {
    return (key = "APPROVED");
  } else if (key == "no_approved") {
    return (key = "NO_APPROVED");
  }
};
export const FormatTypeApiApproval = (type) => {
  if (type == "private") {
    return "approval/private-list";
  } else if (type == "department") {
    return "approval/list-department";
  } else if (type == "confirm") {
    return "approval/private-list-need-approval";
  } else if (type == "all") {
    return "approval/list-all";
  } else if (type == "help") {
    return "approval/list-approval_create_for";
  }
};
export const HideShowFunctionContextmenu = (obj, user) => {
  const check = CheckUserApproved(obj.app_approval_ids, user);
  if (check == true) {
    if (obj.app_approval_status == "WAITING") {
      return true;
    }
  } else {
    return false;
  }
};
export const ShowRevertApproval = (obj, user) => {
  const check = CheckUserApproved(obj.app_approval_ids, user);
  if (check == true) {
    if (obj.app_approval_status == "APPROVED") {
      return true;
    } else if (obj.app_approval_status == "NO_APPROVED") {
      return true;
    } else if (obj.app_approval_status == "APPROVING") {
      if (user.ID == obj.app_approval_current_ids) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
};
export const ShowRevertAssignApproval = (obj, user) => {
  const check = CheckUserApprovedArray(obj.app_approval_ids, user);
  if (check == true) {
    if (obj.app_approval_status == "APPROVED") {
      return true;
    } else if (obj.app_approval_status == "NO_APPROVED") {
      return true;
    } else if (obj.app_approval_status == "APPROVING") {
      if (user.ID == obj.app_approval_current_ids) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
};
export const HideShowFunctionAssignContextmenu = (obj, user) => {
  const check = CheckUserApprovedArray(obj.app_approval_ids, user);
  if (check == true) {
    if (obj.app_approval_status == "WAITING") {
      return true;
    }
  } else {
    return false;
  }
};
export const FormatUserApproval = (arr) => {
  let final = "";
  if (arr) {
    for (let i = 0; i < arr?.length; i++) {
      final = final + arr[i] + " , ";
    }
    return final.slice(0, -2);
  } else {
    return "";
  }
};
export const FormatColorDevice = (stt) => {
  if (stt == "PENDING") {
    return "beacon-wait";
  } else if (stt == "APPROVED") {
    return "beacon-success";
  } else {
    return "beacon-liquidation";
  }
};
export const FormatMessageDevice = (stt) => {
  if (stt == "PENDING") {
    return "Chờ xác thực";
  } else if (stt == "APPROVED") {
    return "Đã xác thực";
  } else if (stt == "NO_APPROVED") {
    return "Không xác thực";
  } else {
    return "";
  }
};
export const FormatShowLiquidationContract = (stt) => {
  if (stt == "4" || stt == "3") {
    return false;
  } else {
    return true;
  }
};
export const FormatShowConfirmContract = (stt) => {
  if (stt == "2") {
    return false;
  } else {
    return true;
  }
};
export const FormatColorWork = (stt) => {
  if (stt == "WORKING") {
    return "beacon-success";
  } else if (stt == "WAITING") {
    return "beacon-wait-job";
  } else {
    return "beacon-liquidation";
  }
};
export const FormatStatusWork = (stt) => {
  if (stt == "WORKING") {
    return "Đang làm việc";
  } else if (stt == "STOP_WORKING") {
    return "Nghỉ việc";
  } else if (stt == "LEAVING") {
    return "Nghỉ chế độ";
  } else if (stt == "WAITING") {
    return "Chờ nhận việc";
  } else {
    return "";
  }
};
export const FormatAvatarApproval = (obj) => {
  if (obj) {
    return URL_IMG + "/" + obj.avatars;
  } else {
    return "";
  }
};
export const FormatBank = (obj, arr) => {
  let bank = "";
  if (obj.job_bank_account) {
    bank = bank + obj.job_bank_account + " - ";
  } else {
    bank = bank + "";
  }
  if (obj.job_bank_account_name) {
    bank = bank + obj.job_bank_account_name + " - ";
  } else {
    bank = bank + "";
  }
  if (obj.job_bank_id) {
    bank = bank + FormatTitle(obj.job_bank_id, arr) + " - ";
  } else {
    bank = bank + "";
  }
  return bank.slice(0, -2);
};
export const FormatPlacePersonnel = (ward, district, city) => {
  let place = "";
  if (ward) {
    place = place + ward?.title + " , ";
  } else {
    place = place + "";
  }
  if (district) {
    place = place + district?.title + " , ";
  } else {
    place = place + "";
  }
  if (city) {
    place = place + city?.title + " , ";
  } else {
    place = place + "";
  }
  return place.slice(0, -2);
};
