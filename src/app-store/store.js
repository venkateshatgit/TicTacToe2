import { configureStore } from '@reduxjs/toolkit'
// import gameRowSliceReducer from '../redux/game-state/gameRowSlice'
// import gameColoumSliceReducer from '../redux/game-state/gameColoumSlice'
import gameSlice from '../redux/game-state/gameSlice'


export const store = configureStore({
  reducer: {
    game: gameSlice,
  },
})