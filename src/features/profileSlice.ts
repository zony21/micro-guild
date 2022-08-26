import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface PROFILE {
    displayName: string;
    company: string;
    tel: string;
    postcode: string;
    add1: string;
    add2: string;
    add3: string;
}

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: { displayName: "", company: "", tel: "", postcode: "", add1: "", add2: "", add3: "" },
  },
  reducers: {
    login: (state, action) => {
      state.profile = action.payload;
    },
    logout: (state) => {
      state.profile = { displayName: "", company: "", tel: "", postcode: "", add1: "", add2: "", add3: "" };
    },
    updateprofileProfile: (state, action: PayloadAction<PROFILE>) => {
      state.profile.displayName = action.payload.displayName;
      state.profile.company = action.payload.company;
      state.profile.tel = action.payload.tel;
      state.profile.postcode = action.payload.postcode;
      state.profile.add1 = action.payload.add1;
      state.profile.add2 = action.payload.add2;
      state.profile.add3 = action.payload.add3;
    },
  },
});

export const { login, logout, updateprofileProfile } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile.profile;

export default profileSlice.reducer;