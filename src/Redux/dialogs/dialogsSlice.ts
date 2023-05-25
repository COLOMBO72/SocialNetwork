import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IDialogSlice {
  dialogId: string;
  currentUserId: string;
  user: {
    username: string;
    photoURL: string;
    uid: string;
  };
}

const initialState: IDialogSlice = {
  currentUserId: '',
  dialogId: '',
  user: null,
};

const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    getCurrentUserId(state, action) {
      state.currentUserId = action.payload;
    },
    setUserDialog(state, action) {
      state.user = action.payload;
      state.dialogId =
        state.currentUserId > action.payload.uid
          ? state.currentUserId + action.payload.uid
          : action.payload.uid + state.currentUserId;
    },
    setLogout(state) {
      state.currentUserId = '';
      state.user = null;
      state.dialogId = '';
    },
    setClear(state) {
      state.user = null;
    },
  },
});

export const selectDialogs = (state: RootState) => state.dialogs;

export const { setUserDialog, getCurrentUserId, setLogout, setClear} =
  dialogsSlice.actions;
export default dialogsSlice.reducer;
