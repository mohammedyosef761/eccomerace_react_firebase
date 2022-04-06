import { configureStore } from '@reduxjs/toolkit'
import storeSlice from './reducers'

export const store = configureStore({
  reducer: {
     storage:storeSlice,
  },
})