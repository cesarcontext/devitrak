import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isModalOpen: false
    },
    reducers: {
        onOpenModal: ( state ) => {
            state.isModalOpen = true;
        },
        onCloseModal: ( state ) => {
            state.isModalOpen = false;
        },
    }
});


export default uiSlice.reducer

// Action creators are generated for each case reducer function
export const { onOpenModal, onCloseModal } = uiSlice.actions;