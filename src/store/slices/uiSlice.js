import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        pointerEventStatus: "auto"
    },
        reducers: {
            blockLinks: ( state, { payload} ) => {
                state.pointerEventStatus = payload
            },
        },
    });

// action creators are generated for each case reducer function

export const { blockLinks } = uiSlice.actions;

export default uiSlice.reducer;