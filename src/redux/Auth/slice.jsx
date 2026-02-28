import { createSlice } from '@reduxjs/toolkit';
import {
  addUser,
  logUserIn,
  logUserOut,
  refreshUser,
  newReg,
} from './operations';

const initialState = {
  user: { name: null, email: null},
  token: null,
  ifLoggedIn: false,
  ifRegistered: false,
  ifRefreshing: false,
  ifLoading:false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(addUser.pending, (state, action) => {
        state.ifLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.token = action.payload.token;
        //state.token = action.payload.token;
        state.ifLoading = false;
        state.ifRegistered = true;
      })
      .addCase(addUser.rejected, state => {
        state.ifLoading = false;
      })
      .addCase(newReg.pending, (state, action) => {
       
      })
      .addCase(newReg.fulfilled, (state, action) => {
        state.ifRegistered = false;
      })
      .addCase(newReg.rejected, state => {
        state.ifLoading = false;
      })
      .addCase(logUserIn.pending, (state, action) => {
        state.ifLoading = true;
      })
      .addCase(logUserIn.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.token = action.payload.token;
        state.ifLoggedIn = true;
        state.ifLoading = false;
        //state.isRegistered = false;
      })
      .addCase(logUserIn.rejected, state => {
        state.ifLoading = false;
      })
      .addCase(logUserOut.pending, (state, action) => {
        state.ifLoading = true;
      })
      .addCase(logUserOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.ifLoggedIn = false;
        state.ifRegistered = false;
        state.ifLoading = false;
      })
      .addCase(logUserOut.rejected, state => {
        state.ifLoading = false;
        state.ifLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.ifRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        //state.user.token = action.payload.token;
        state.ifLoggedIn = true;
        state.ifRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.ifRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
