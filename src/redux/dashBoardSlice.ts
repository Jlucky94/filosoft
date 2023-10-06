import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    page: 1,
    scrollY: 0
}
const dashBoardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setCurPage: (state) => {
            state.page = state.page + 1
        },
        saveScrollPosition: (state, action: PayloadAction<number>) => {
            state.scrollY = action.payload
        },
    }
})

export const {reducer: dashBoardReducer, actions: dashBoardActions} = dashBoardSlice;