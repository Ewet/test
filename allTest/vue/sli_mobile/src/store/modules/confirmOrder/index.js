import actions from './actions';
import mutations from './mutations';
import state from './states';
let obj = {
  namespaced: true,
  state,
  mutations,
  actions
};
// console.log('obj', obj);
export default obj;
