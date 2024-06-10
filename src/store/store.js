// store.js
import { configureStore } from '@reduxjs/toolkit';
import { dataTransaksi } from './actions/DataTransaksi';

export const store = configureStore({
  reducer : {
    data_transaksi : dataTransaksi.reducer
  }
});