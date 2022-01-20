import { createSlice } from "@reduxjs/toolkit";

export const gameColoumSlice = createSlice({
    name: 'coloums',
    initialState: {
        value: 3,
    },
    reducers: {
        onChangeColoum: (state, action) => {
            state.value = action.payload
        },
    },
})

export const {onChangeColoum} = gameColoumSlice.actions
export default gameColoumSlice.reducer