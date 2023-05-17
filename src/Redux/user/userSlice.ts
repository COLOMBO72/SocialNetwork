import {createSlice} from '@reduxjs/toolkit';
import { RootState } from '../store';

interface State {
  email: string,
  token: string,
  id: number,
  name: string,
  location:string;
  photoURL: string;
  status: string;
  old:string;
  aboutMe:string;
}

const initialState:State = {
  email: localStorage.email,
  token: localStorage.accessToken,
  id: null,
  name: localStorage.name,
  location: localStorage.location,
  photoURL: localStorage.photoURL,
  status: localStorage.status,
  old: localStorage.old,
  aboutMe: localStorage.aboutMe,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state,action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.location = action.payload.location;
      state.status = action.payload.status;
      state.old = action.payload.old;
      state.photoURL = action.payload.photoURL;
      state.aboutMe = action.payload.aboutMe;
      state.name = action.payload.name;
      localStorage.setItem("location", state.location);
      localStorage.setItem("status", state.status);
      localStorage.setItem("old", state.old);
      localStorage.setItem("photoURL", state.photoURL);
      localStorage.setItem("aboutMe", state.aboutMe);
      localStorage.setItem("name", state.name);
      localStorage.setItem("accessToken", state.token);
    },
    removeUser(state){
      state.id = null;
      localStorage.clear();
    }
  }
})

export const selectUser = (state:RootState) => state.user;

export const {setUser,removeUser} = userSlice.actions;
export default userSlice.reducer;