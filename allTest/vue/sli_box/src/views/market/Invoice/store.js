import {
  getList,
  getItem
} from './model';
import factory from 'store/factory';

export default factory.createInstance({
  fetchList: getList,
  fetchItem: getItem,
  state: {
    modalSuccess: false,
    modalError: false,
    invoiceId: ''
  },
  mutation: {
    setModalSuccess (state, val) {
      state.modalSuccess = val;
    },
    setModalError (state, val) {
      state.modalError = val;
    },
    setInvoiceId (state, val) {
      state.invoiceId = val;
    }
  }
});

export const STORE_NAME = 'invoice';
