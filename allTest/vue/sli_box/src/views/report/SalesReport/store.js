import {
  getList
} from './model';
import factory from 'store/factory';

export const STORE_NAME = 'saleReport';
export default factory.createInstance({
  fetchList: getList
})
  .addState({
    pageSize: 10000,
    totalQuantity: '',
    totalReceivableAmount: '',
    totalReceivedAmount: ''
  })
  .addMutation({
    setItems (state, {
      items,
      total,
      totalQuantity,
      totalReceivableAmount,
      totalReceivedAmount
    }) {
      state.items = items;
      state.total = total;
      state.totalQuantity = totalQuantity;
      state.totalReceivableAmount = totalReceivableAmount;
      state.totalReceivedAmount = totalReceivedAmount;
    }
  });
