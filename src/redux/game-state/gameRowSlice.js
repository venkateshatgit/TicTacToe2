import { createSlice } from "@reduxjs/toolkit";


export const gameRowSlice = createSlice({
    name: 'rows',
    initialState: {
        value: 3,
    },
    reducers: {
        onChangeRow: (state, action) => {
            state.value = action.payload
        },
    },
})

export const {onChangeRow} = gameRowSlice.actions
export default gameRowSlice.reducer