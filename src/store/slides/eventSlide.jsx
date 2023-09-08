import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    choice: "checking", //authenticated, not-authenticated
    company: "checking",
    event: [],
    subscription: undefined,
    eventInfoDetail: {
      eventName: undefined,
      eventLocation: undefined,
      dateBegin: undefined,
      dateEnd: undefined,
    },
    staff: {
      adminUser: [],
      headsetAttendees: [],
    },
    deviceSetup: undefined,
    contactInfo: undefined,
  },
  reducers: {
    onSelectEvent: (state, { payload }) => {
      state.choice = payload;
    },
    onSelectCompany: (state, { payload }) => {
      state.company = payload;
    },
    onAddEventData: (state, { payload }) => {
      state.event = payload;
    },
    onAddEventInfoDetail: (state, { payload }) => {
      state.eventInfoDetail = payload;
    },
    onAddEventStaff: (state, { payload }) => {
      state.staff = payload;
    },
    onAddDeviceSetup: (state, { payload }) => {
      state.deviceSetup = payload;
    },
    onAddContactInfo: (state, { payload }) => {
      state.contactInfo = payload;
    },
    onAddSubscriptionInfo: (state, { payload }) => {
        state.subscription = payload;
      },
  },
});

// action creators are generated for each case reducer function

export const {
  onSelectEvent,
  onSelectCompany,
  onAddEventData,
  onAddEventInfoDetail,
  onAddEventStaff,
  onAddDeviceSetup,
  onAddContactInfo,
  onAddSubscriptionInfo
} = eventSlice.actions;

export default eventSlice.reducer;