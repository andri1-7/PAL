// features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';
export const dataTransaksi = createSlice({
  name: 'simpan transaksi',
  initialState: {
    value: [],
  },
  reducers: {
    setDataTransaksi: (state, data) => {
      state.value = [...state.value, data];
    },
    resetTransaksi : (state, data) => {
      state.value = []
    }
  },
});
export const { setDataTransaksi, resetTransaksi } = dataTransaksi.actions;