import { createSlice } from '@reduxjs/toolkit';

export const ui = createSlice({
  name: 'ui',
  initialState: {
    loader: false
  },
  reducers: {
    setLoader: (store, action) => {
      store.loader = action.payload;
    }
  }
});