import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface IUser {
  uid: string;
  username: string;
  email: string;
  location: string;
  aboutMe: string;
  photoURL: string;
  status: string;
  YO: string;
  token: string;
  loading: boolean;
}

const initialState: IUser = {
  uid: '',
  username: '',
  email: '',
  location: '',
  aboutMe: '',
  photoURL: '',
  status: '',
  YO: '',
  token: '',
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn(state, action) {
      state.uid = action.payload.uid;
      state.status = action.payload.status;
      state.location = action.payload.location;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.YO = action.payload.YO;
      state.photoURL = action.payload.photoURL;
      state.aboutMe = action.payload.aboutMe;
      state.username = action.payload.username;
    },
    signOut(state) {
      localStorage.clear();
      state.uid = '';
      state.status = '';
      state.location = '';
      state.token = '';
      state.email = '';
      state.YO = '';
      state.photoURL = '';
      state.aboutMe = '';
      state.username = '';
    },
    updateUser(state) {

    },
  },
});

export const selectUser = (state: RootState) => state.user;

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;

// export type dataUserType = {
//   uid: string;
//   username: string;
//   email: string;
//   location: string;
//   aboutMe: string;
//   photoURL: string;
//   status: string;
//   YO: string;
//   token: string;
// };
// extraReducers: (builder) => {
//   builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<DocumentData>) => {
//     state.loading = Loading.SUCCESS;
//     state.dataUser = response.data();
//   });
//   builder.addCase(fetchUser.pending, (state) => {
//     state.loading = Loading.PENDING;
//     state.dataUser = null;
//   });
//   builder.addCase(fetchUser.rejected, (state) => {
//     state.loading = Loading.ERROR;
//     state.dataUser = null;
//   });
// },
// export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
//   const auth = getAuth();
//   const dispatch = useAppDispatch();
//   const docSnap = await getDoc(doc(db, 'users', auth.currentUser.uid));
//   if (docSnap.exists()) {
//           dispatch(
//             signIn({
//               uid: docSnap.data().uid,
//               status: docSnap.data().status,
//               location: docSnap.data().location,
//               token: docSnap.data().token,
//               email: docSnap.data().email,
//               YO: docSnap.data().YO,
//               photoURL: docSnap.data().photoURL,
//               aboutMe: docSnap.data().aboutMe,
//               username: docSnap.data().username,
//             }),
//           );
//           debugger
//   }else{
//     console.log('Something went wrong...')
//     console.error()
//   }
// });
