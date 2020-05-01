import { FETCH_FACTORS } from "./actions.type";
import { FETCH_FACTOR_END, FETCH_FACTOR_START } from "./mutations.type";
import { FactorsService } from "../common/api.service";

const state = {
  errors: {},
  factors: [],
  factorsCount: 0,
  isLoadingFactors: true
};

const getters = {
  factors(state) {
    return state.factors;
  },
  factorsCount(state) {
    return state.factorsCount;
  },
  isLoadingFactors(state) {
    return state.isLoadingFactors;
  }
};

const actions = {
  [FETCH_FACTORS]({ commit }, params) {
    commit(FETCH_FACTOR_START);
    return FactorsService.query(params.filters)
      .then(({ data }) => {
        commit(FETCH_FACTOR_END, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

const mutations = {
  [FETCH_FACTOR_START](state) {
    state.isLoadingFactors = true;
  },
  [FETCH_FACTOR_END](state, { factors, factorsCount }) {
    state.factors = factors;
    state.factorsCount = factorsCount;
    state.isLoadingFactors = false;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
