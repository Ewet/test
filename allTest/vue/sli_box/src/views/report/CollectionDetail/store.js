import {
  getList
} from 'views/report/CollectionDetail/model';
import factory from 'store/factory';

export const STORE_NAME = 'collectionDetail';
export default factory.createInstance({
  fetchList: getList,
  state: {
    // pageSize: 100000,
    totalAmountOrders: '',
    totalAmountReceived: '',
    totalCost: '',
    grossGrossProfit: '',
    grossMargin: ''
  },
  mutation: {
    setItems (state, {
      items,
      total,
      totalAmountOrders,
      totalAmountReceived,
      totalCost,
      grossGrossProfit,
      grossMargin
    }) {
      state.items = items;
      state.total = total;
      state.totalAmountOrders = totalAmountOrders;
      state.totalAmountReceived = totalAmountReceived;
      state.totalCost = totalCost;
      state.grossGrossProfit = grossGrossProfit;
      state.grossMargin = grossMargin;
    }
  }
});
