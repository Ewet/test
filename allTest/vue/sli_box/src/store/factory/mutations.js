export default () => ({
  setItems (state, { items, total }) {
    state.items = Object.freeze(items);
    state.total = total;
  },
  closeLoading (state) {
    state.isLoading = false;
  },
  openLoading (state) {
    state.isLoading = true;
  },
  setFilter (state, filter) {
    state.page = 1;
    state.filter = Object.freeze(filter);
  },
  setPage (state, page) {
    state.page = page;
  },
  setModal (state, val) {
    if (val === false) {
      state.itemId = '';
    }
    state.showModal = val;
  },
  setFormData (state, val) {
    state.formData = val;
  },
  reset (state) {
    // state.formData = {};
    // state.showModal = false;
    // state.filter = {};tate.formData = {};
    // state.showModal = false;
    // state.filter = {};
    state.page = 1;
    // state.items = 1;
    state.isLoading = false;
    state.items = [];
    state.total = 0;
    state.hasMore = false;
    // state.pageSize = 10;
    state.filter = {};
    state.showModal = false;
    state.formData = {};
    state.viewModal = false;
    state.itemLoading = false;
    state.itemId = '';
    state.activeName = '1';
    state.internalFilterObj = {};
    state.orderData = {};
    state.selectedItems = [];
  },
  setViewModal (state, val) {
    state.viewModal = val;
  },
  setItemLoading (state, val) {
    state.itemLoading = val;
  },
  setItemId (state, val) {
    state.itemId = val;
  },
  setInternalFilter (state, val) {
    if (!val) {
      state.internalFilterObj = {};
    } else {
      Object.keys(val).forEach((x) => {
        state.internalFilterObj[x] = val[x];
      });
    }
  },
  setSelectedItems (state, items) {
    state.selectedItems = items;
  },
  assignFormData (state, formData) {
    state.formData = { ...state.formData, ...formData };
  },
  setPageSize (state, pageSize) {
    state.pageSize = pageSize;
  }
});
