import { createSlice } from "@reduxjs/toolkit";

const deviceSlice = createSlice({
  name: "device",
  initialState: {
    singleDeviceSelection: [],
    multipleDeviceSelection: [],
    refresh: undefined,
    historyOrder: [],
    currentOrder: [],
    currentSelectionDevice: 0
  },
  reducers: {
    onAddMultipleDeviceSelection: (state, { payload }) => {
      let index = 0;
      state.multipleDeviceSelection.splice(index, 0, payload);
      index++;
    },
    onRemoveDeviceFromMultipleDeviceType: (state, { payload }) => {
      state.multipleDeviceSelection = payload;
    },
    onEditNumberInRowInMultipleDeviceType: (state, { payload }) => {
      state.multipleDeviceSelection = payload;
    },
    onResetTable: (state) => {
      state.multipleDeviceSelection = [];
    },
    onUpdateData: (state, { payload }) => {
      state.refresh = payload;
    },
    onAddNewOrder: (state, { payload }) => {
      state.currentOrder = [ payload ];
    },
    onAddNewOrderToHistory: (state, { payload }) => {
      state.historyOrder.unshift(payload);
    },
    onHardReset:(state) => {
      state.singleDeviceSelection = []
      state.multipleDeviceSelection = []
      state.refresh = undefined
      state.historyOrder = []
      state.currentOrder = []
      state.currentSelectionDevice = 0
    },
    onAddCurrentDeviceSelection: (state, { payload }) => {
      state.currentSelectionDevice = payload;
    },
  },
});

// action creators are generated for each case reducer function

export const {
  onAddMultipleDeviceSelection,
  onRemoveDeviceFromMultipleDeviceType,
  onEditNumberInRowInMultipleDeviceType,
  onResetTable,
  onUpdateData,
  onAddNewOrder,
  onAddNewOrderToHistory,
  onHardReset,
  onAddCurrentDeviceSelection
} = deviceSlice.actions;

export default deviceSlice.reducer;
