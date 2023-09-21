const state = () => {
  return {
    dataExpRecruitment: [
      {
        value: "0",
        title: "Chưa có kinh nghiệm",
      },
      {
        value: "1",
        title: "Dưới 1 năm",
      },
      {
        value: "2",
        title: "1 năm",
      },
      {
        value: "3",
        title: "2 năm",
      },
      {
        value: "4",
        title: "3 năm",
      },
      {
        value: "5",
        title: "4 năm",
      },
      {
        value: "6",
        title: "5 năm",
      },
    ],
    dataLanguageRecruitment: [
      {
        value: "0",
        title: "Tiếng Anh",
      },
      {
        value: "1",
        title: "Tiếng Nhật",
      },
      {
        value: "2",
        title: "Tiếng Đức",
      },
      {
        value: "3",
        title: "Tiếng Pháp",
      },
      {
        value: "4",
        title: "Tiếng Nga",
      },
      {
        value: "5",
        title: "Tiếng Hàn",
      },
      {
        value: "6",
        title: "Tiếng Trung",
      },
      {
        value: "7",
        title: "Tiếng Thái",
      },
    ],
    dataGenderRecruitment: [
      {
        value: "0",
        title: "Nữ",
      },
      {
        value: "1",
        title: "Nam",
      },
      {
        value: "2",
        title: "Không yêu cầu",
      },
    ],
    dataPlaceinterview: [
      {
        value: "0",
        title: "Phòng đào tạo",
      },
      {
        value: "1",
        title: "Phòng họp số 1 (nhỏ)",
      },
      {
        value: "2",
        title: "Phòng họp số 2 (nhỏ)",
      },

      {
        value: "3",
        title: "Phòng họp số 3 (lớn)",
      },
      {
        value: "4",
        title: "Phòng phỏng vấn 1",
      },
      {
        value: "5",
        title: "Phòng phỏng vấn 2",
      },
    ],
    dataTypePremium: [
      { value: "0", title: "Báo tăng" },
      { value: "1", title: "Báo giảm" },
    ],
  };
};

export default {
  namespaced: true,
  state,
};
