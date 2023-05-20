import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IFilterSlice {
  userId: string,
  searchValue: string,
}

const initialState: IFilterSlice = {
  userId: '',
  searchValue: '',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state,action: PayloadAction<string>){
      state.searchValue = action.payload;
    }
  }
})

export const selectFilter = (state: RootState) => state.filter;

export const {  setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;