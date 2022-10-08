import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        status: 'checking',  //authenticated, not-authenticated
        user: [],
        errorMessage: undefined,

    },
        reducers: {
            onChecking: ( state ) => {
                state.status = 'checking';
                state.user = [];
                state.errorMessage = undefined;
            },
            onLogin: ( state, { payload } ) => {
                state.status = 'authenticated'
                state.user = payload;
                state.errorMessage = undefined;
            },
            onLogout: (state, { payload }) => {
                state.status = 'not-authenticated';
                state.user = []
                state.errorMessage = payload;
            },
            clearErrorMessage: ( state ) => {
                state.errorMessage = undefined
            }
        },
    });

// action creators are generated for each case reducer function

export const { onChecking, onLogin, onLogout, clearErrorMessage } = adminSlice.actions;

export default adminSlice.reducer;
