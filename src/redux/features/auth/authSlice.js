import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: false,
    username: null,
    id: null,
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSignIn: (state, action="") => {

            // state.email = action.payload.email;
            state.isLoggedIn = true;
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.id = action.payload.id
        },
        setSignOut: (state) => {
            // state.email = null;
            // state.userName = null;
            state.isLoggedIn = false;
            state.token = null;
        },
    }
});

export const { setSignIn, setSignOut } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
// export const selectEmail = (state) => state.userAuth.email;
export const selectUserName = (state) => state.auth.username;
export const selectUserId = (state) => state.auth.id;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
