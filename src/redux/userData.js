import { createSlice } from '@reduxjs/toolkit';

const UserDataSlice = createSlice({
  name: 'userinfo',
  initialState: {
    user: null,
    userType: "User",
    loading:false,
    registerEmail: null,
    areaCover:""
  },
  reducers: {
    SaveUserInfo: (state, action) => {
      state.user = action.payload
    },
    changeUserType: (state, action) => {
      state.userType = action.payload;
    },
    changeRegisterEmail: (state, action) => {
      state.registerEmail = action.payload;
    },
    changeAreaCover: (state, action) => {
      state.areaCover = action.payload;
    },
    LoadingOn:(state,action)=>{
      state.loading = true;
      return state
    },
    LoadingOff:(state,action)=>{
      state.loading = false;
      return state
    },
    userLocation:(state,action) =>{
      state.location = action.payload;
    }
  },
});

export const { SaveUserInfo, changeUserType,changeRegisterEmail ,changeAreaCover,LoadingOff,LoadingOn,userLocation} = UserDataSlice.actions;
export default UserDataSlice.reducer;