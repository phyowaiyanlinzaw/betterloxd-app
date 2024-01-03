import {User} from '@/types/userType';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

const initialUser: User = {
  id: 0,
  name: '',
  email: '',
  password: '',
  favs: [],
  watchlist: [],
  isLoggedInBefore: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state = action.payload;
    },
    logout: state => {
      state = initialUser;
    },
  },
});

export const {setUser, logout} = userSlice.actions;

export const selectUser = (state: RootState) => state.userSlice;

export default userSlice.reducer;
