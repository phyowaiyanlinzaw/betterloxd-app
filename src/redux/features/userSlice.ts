import {User} from '@/types/userType';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {storage} from '@/db/storage';

const initialUser: {user: User} = {
  user: {
    id: 0,
    name: '',
    email: '',
    password: '',
    favs: [],
    watchlist: [],
    isLoggedInBefore: false,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      storage.set('currentUser', JSON.stringify(action.payload));
    },
    logout: state => {
      state.user = {
        id: 0,
        name: '',
        email: '',
        password: '',
        favs: [],
        watchlist: [],
        isLoggedInBefore: false,
      };
    },
  },
});

export const {setUser, logout} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
