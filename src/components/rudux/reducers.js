import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  admin:[],
  products:[],
  carts:[],
}

export const storeSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {
 AddAdmin :(state,action)=>{
     state.admin = action.payload;
 },
 AddProduts:(state,action)=>{
   state.products = action.payload;
 },
 AddToCarts:(state,action)=>{
  state.carts = action.payload;
 }

  },
})

// Action creators are generated for each case reducer function
export const { AddAdmin,AddProduts,AddToCarts } = storeSlice.actions

export default storeSlice.reducer