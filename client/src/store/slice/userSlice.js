import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    email: '',
    role: '',
    pseudo: '',
    team: '',
    code: '',
    isLogged: false,
  },
  reducers: {
    addUser: (state, action) => {
      const { email, role, pseudo, team, code } = action.payload.user;
      return {
        ...state,
        email,
        role,
        pseudo,
        team,
        code,
        isLogged: true,
      };
    },
    logoutUser: (state) => {
      return {
        ...state,
        email: '',
        role: '',
        pseudo: '',
        team: '',
        code: '',
        isLogged: false,
      };
    },
  },
});

export const { addUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;