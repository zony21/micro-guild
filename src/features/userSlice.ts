import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface USER {
  displayName: string;
  hpurl: string;
  email: string;
  photoUrl: string;
  company: string;
  tel: string;
  postcode: string;
  add1: string;
  add2: string;
  add3: string;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { uid: "", email: "", photoUrl: "", displayName: "", hpurl: "", company: "", tel: "", postcode: "", add1: "", add2: "", add3: "", },
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = { uid: "", email: "", photoUrl: "", displayName: "", hpurl: "", company: "", tel: "", postcode: "", add1: "", add2: "", add3: "", };
    },
    updateUserProfile: (state, action: PayloadAction<USER>) => {
      state.user.displayName = action.payload.displayName;
      state.user.hpurl = action.payload.hpurl;
      state.user.email = action.payload.email;
      state.user.company = action.payload.company;
      state.user.tel = action.payload.tel;
      state.user.postcode = action.payload.postcode;
      state.user.add1 = action.payload.add1;
      state.user.add2 = action.payload.add2;
      state.user.add3 = action.payload.add3;
    },
  },
});

export const { login, logout, updateUserProfile } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;