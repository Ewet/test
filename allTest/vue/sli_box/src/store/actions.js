import { SET_TOKEN } from './mutation-types';

export default {
  [SET_TOKEN] ({ commit }, token) {
    commit(SET_TOKEN, token);
  }
};
