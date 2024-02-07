import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { allUsers } from "../../../../utils/parse_functions/users";


const initialState = {
  username: '',
  password: '',
  isLoading: true,
  splashShown: false,
  status: '',
  profileData: {
    email: '',
    firstName: '',
    lastName: '',
    otherNames: '',
    phoneNumber: '',
    pin: '',
    bank: '',
    accountName: '',
    accountNumber: '',
    country: '',
    city: '',
    state: '',
    nickname: '',
    imageURL: ''
  }
}

// export const getAppUsers = createAsyncThunk('users/all', () => {
//   return allUsers()
//     .then(res => {
//       return res;
//     })
//     .catch(err => {
//       console.log('Error fetching users: ', err);
//     })
// })

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUsername: (state, action) => {
      state.username = action.payload;
    },
    updateSplashShown: (state, action) => {
      state.splashShown = action.payload;
    },
    updateProfileStatus: (state, action) => {
      state.status = action.payload;
    },
    updateProfileData: (state, action ) => {
      state.profileData = {
        ...state.profileData, ...action.payload
      }
    }
  },
  // extraReducers: {
  //   [getAppUsers.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [getAppUsers.fulfilled]: (state, action) => {
  //
  //   }
  // }
})

// console.log({ userSlice })

export const { updateUsername, updateProfileData, updateSplashShown, updateProfileStatus } = userSlice.actions;
export default userSlice.reducer;
