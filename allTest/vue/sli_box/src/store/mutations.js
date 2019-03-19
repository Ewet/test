import { SET_TOKEN } from './mutation-types';

export default {
  [SET_TOKEN] (state, token) {
    state.token = token;
  },
  showImage (state, {
    title,
    url
  }) {
    state.imgUrl = url;
    state.imgTitle = title || '摩萄盒子';
    state.imgModal = true;
  },
  setImageModal (state, val) {
    // console.log(state, val);
    state.imgModal = val;
  },
  setLoading (state, val) {
    state.showLoadingModal = val;
  }
};
