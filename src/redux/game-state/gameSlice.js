import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        rows: 3,
        coloums: 3,
        winnerRatio: 0,
        xColor: '#00CCFF',
        oColor: '#00FF61',
    },
    reducers: {
        onChangeRow: (state, action) => {
            state.rows = action.payload
        },

        onChangeColoum: (state, action) => {
            state.coloums = action.payload
        },

        onChangeWinnerRatio: (state, action) => {
            state.winnerRatio = action.payload
        },

        onChangeXColor: (state, action) => {
            state.xColor = action.payload
        },

        onChangeOColor: (state, action) => {
            state.oColor = action.payload
        }

        
    }
})



export const {
    onChangeRow,
    onChangeColoum, 
    onChangeWinnerRatio,
    onChangeXColor,
    onChangeOColor,    
    } = gameSlice.actions


export default gameSlice.reducer