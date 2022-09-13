import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';
import { apiPostCall, apiGetCall, apiPutCall } from '../utility/site-apis'

const initialState = {
  isFetching: false,
  error: null,
  user: null,
  token: null,
  userdata: null,
  manageusers: [],
  singleres: {},
  isEditData: false,

}

export const adminLogin = createAsyncThunk(
  'auth/adminLogin',
  async (params, { rejectWithValue }) => {
    const response = await apiPostCall(`/auth/login`, params)
  
    if (response.status === 'error') {
      return rejectWithValue(response.data)
    }
    response.data.data['roles'] = ['super-admin']
    return response.data
  }
)

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (params, { rejectWithValue }) => {

    const response = await apiGetCall(`/users/6150907e8ae5130aa2fa5b00`, params)
    // console.log(response)
    if (response.status === 'error') {
      return rejectWithValue(response.data)
    }
    let profile = response.data.profile ? response.data.profile : {}
    delete profile._id
    let newData = { ...response.data, ...profile }
    return newData
  }
)

export const editProfile = createAsyncThunk(
  'auth/editProfile',
  async (params, { rejectWithValue }) => {
    const response = await apiPutCall(`/user`, params)
    if (response.status === 'error') {
      return rejectWithValue(response.data)
    }
    let profile = response.data.data.profile ? response.data.data.profile : {}
    delete profile._id
    let newData = { ...response.data.data, ...profile }
    return newData
  }
)

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
    },
    singledata: (state, action) => {
      state.singleres = action.payload
    },
  },
  extraReducers: {
    // adminLogin
    [adminLogin.pending]: (state) => {
      state.isFetching = true
      state.error = null
    },
    [adminLogin.rejected]: (state, action) => {
      state.isFetching = false
      state.error = action?.payload?.message
    },
    [adminLogin.fulfilled]: (state, action) => {
      state.isFetching = false
      state.error = null
      state.token = action?.payload?.data?.Authorization
      state.user = action?.payload.data
    },
    // getProfile
    [getProfile.pending]: (state) => {
      state.isFetching = true
      state.error = null
    },
    [getProfile.rejected]: (state, action) => {
      state.isFetching = false
      state.error = action?.payload?.message
    },
    [getProfile.fulfilled]: (state, action) => {
      state.isFetching = false
      state.error = null
      state.userdata = action?.payload
    },
    // Edit Profile
    [editProfile.pending]: (state) => {
      state.isFetching = true
      state.error = null
      state.isEditData = false
    },
    [editProfile.rejected]: (state, action) => {
      state.isFetching = false
      state.error = action?.payload?.message
    },
    [editProfile.fulfilled]: (state, action) => {
      message.success(`Profile Edit Successfully`);
      state.isFetching = false
      state.isEditData = true
      state.userdata = action?.payload
    },
  }

})

export const { logout, singledata } = counterSlice.actions
export default counterSlice.reducer
