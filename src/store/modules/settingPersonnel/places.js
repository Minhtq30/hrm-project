import {
  GetAllCityApi,
  GetAllDistrictsApi,
  GetAllWardsApi,
  GetAllCountryApi,
  GetAllLocationApi,
} from "@/api/ApiSettingPersonnel/ApiPlace";
const state = () => {
  return {
    listCity: [],
    listCountry: [],
    listDistricts: [],
    listWards: [],
    listDistrictsOrigin: [],
    listWardsOrigin: [],
    listDistrictsHome: [],
    listWardsHome: [],
    listDistrictsCurrent: [],
    listWardsCurrent: [],
    listLocation: [],
  };
};

const mutations = {
  getAllPlaceMutation(state, payload) {
    state.listCity = payload.data;
  },
  getAllDistrictsMutation(state, payload) {
    state.listDistricts = payload.data;
  },
  getAllWardsMutation(state, payload) {
    state.listWards = payload.data;
  },
  getAllDistrictsOriginMutation(state, payload) {
    state.listDistrictsOrigin = payload.data;
  },
  getAllWardsOriginMutation(state, payload) {
    state.listWardsOrigin = payload.data;
  },
  getAllDistrictsHomeMutation(state, payload) {
    state.listDistrictsHome = payload.data;
  },
  getAllWardsHomeMutation(state, payload) {
    state.listWardsHome = payload.data;
  },
  getAllDistrictsCurrentMutation(state, payload) {
    state.listDistrictsCurrent = payload.data;
  },
  getAllWardsCurrentMutation(state, payload) {
    state.listWardsCurrent = payload.data;
  },
  getAllCountryMutation(state, payload) {
    state.listCountry = payload.data;
  },
  getAllLocationMutation(state, payload) {
    state.listLocation = payload.data;
  },
};

const actions = {
  async getAllCityAction(context) {
    GetAllCityApi()
      .then((payload) => context.commit("getAllPlaceMutation", payload.data))
      .catch((error) => console.log(error));
  },
  async getAllDistrictsAction(context, data) {
    GetAllDistrictsApi(data)
      .then((payload) =>
        context.commit("getAllDistrictsMutation", payload.data)
      )
      .catch((error) => console.log(error));
  },
  async getAllWardsAction(context, data) {
    GetAllWardsApi(data)
      .then((payload) => context.commit("getAllWardsMutation", payload.data))
      .catch((error) => console.log(error));
  },
  async getAllDistrictsOriginAction(context, data) {
    GetAllDistrictsApi(data)
      .then((payload) =>
        context.commit("getAllDistrictsOriginMutation", payload.data)
      )
      .catch((error) => console.log(error));
  },
  async getAllWardsOriginAction(context, data) {
    GetAllWardsApi(data)
      .then((payload) =>
        context.commit("getAllWardsOriginMutation", payload.data)
      )
      .catch((error) => console.log(error));
  },
  async getAllDistrictsHomeAction(context, data) {
    GetAllDistrictsApi(data)
      .then((payload) =>
        context.commit("getAllDistrictsHomeMutation", payload.data)
      )
      .catch((error) => console.log(error));
  },
  async getAllWardsHomeAction(context, data) {
    GetAllWardsApi(data)
      .then((payload) =>
        context.commit("getAllWardsHomeMutation", payload.data)
      )
      .catch((error) => console.log(error));
  },
  async getAllDistrictsCurrentAction(context, data) {
    GetAllDistrictsApi(data)
      .then((payload) =>
        context.commit("getAllDistrictsCurrentMutation", payload.data)
      )
      .catch((error) => console.log(error));
  },
  async getAllWardsCurrentAction(context, data) {
    GetAllWardsApi(data)
      .then((payload) =>
        context.commit("getAllWardsCurrentMutation", payload.data)
      )
      .catch((error) => console.log(error));
  },
  async getAllCountryAction(context) {
    GetAllCountryApi()
      .then((payload) => context.commit("getAllCountryMutation", payload.data))
      .catch((error) => console.log(error));
  },
  async getAlllocationAction(context) {
    GetAllLocationApi()
      .then((payload) => context.commit("getAllLocationMutation", payload.data))
      .catch((error) => console.log(error));
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
