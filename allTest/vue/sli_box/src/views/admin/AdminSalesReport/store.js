import { getList } from './model';
import factory from 'store/factory';

export const STORE_NAME = 'AdminSalesReport';
export default factory.createInstance({
  fetchList: getList,
  state: {
    pageSize: 10000,
    totalQuantity: '',
    totalReceivableAmount: '',
    totalReceivedAmount: ''
  },
  mutation: {
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
  }
});
