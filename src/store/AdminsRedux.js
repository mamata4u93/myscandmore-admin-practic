import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';
import { apiGetCall, apiPostCall, apiPutCall, apiDeleteCall } from '../utility/site-apis'

const initialState = {
    isFetching: false,
    error: null,
    formValues: {},
    dataLists: [],
    singleData: null,
    isEditData: false,
}

export const feachAllAdminsData = createAsyncThunk(
    'admins/feachAllAdminsData',
    async (params, { rejectWithValue }) => {
        // console.log(params)
        const response = await apiGetCall(`/users`, params)
        console.log(response)
        if (response.status === 'error') {
            return rejectWithValue(response.data)
        }
        let name = response?.data?.data[0]?.profile.name
        // console.log(name)
        // newData = { ...response.data, ...name }
        return response?.data
    }
)

export const feachSingleData = createAsyncThunk(
    'admins/feachSingleData',
    async (params, { rejectWithValue }) => {

        const response = await apiGetCall(`/users/${params.id}`, params)
        if (response.status === 'error') {
            return rejectWithValue(response.data)
        }
        // response.data.name = response?.data?.profile?.name
        return { ...response.data, ...response?.data?.profile }

    }
)

export const addNewData = createAsyncThunk(
    'admins/addNewData',
    async (params, { rejectWithValue }) => {
        const response = await apiPostCall(`/auth/signup`, params)
        if (response.status === 'error') {
            return rejectWithValue(response.data)
        }
        // console.log(response.data.data)
        return response?.data?.data
    }
)

export const editData = createAsyncThunk(
    'admins/editData',
    async (params, { rejectWithValue }) => {
        const response = await apiPutCall(`/users/${params?._id}`, params)
        if (response.status === 'error') {
            return rejectWithValue(response.data)
        }
        return response?.data
    }
)

export const deleteData = createAsyncThunk(
    'admins/deleteData',
    async (params, { rejectWithValue }) => {
        const response = await apiDeleteCall(`/admins/${params?._id}`, params)
        if (response.status === 'error') {
            return rejectWithValue(response.data)
        }
        return params
    }
)

export const counterSlice = createSlice({
    name: 'admins',
    initialState,
    reducers: {
        resetAllData: (state) => {
            state.dataLists = []
        },
        resetSingleData: (state, action) => {
            state.singleData = action?.payload
        },
        setFormValues: (state, action) => {
            state.formValues = action?.payload
        },
    },
    extraReducers: {
        // All Data List
        [feachAllAdminsData.pending]: (state) => {
            state.isFetching = true
            state.error = null
            state.dataLists = []
        },
        [feachAllAdminsData.rejected]: (state, action) => {
            state.isFetching = false
            state.error = action?.payload
        },
        [feachAllAdminsData.fulfilled]: (state, action) => {
            state.isFetching = false
            state.dataLists = action?.payload
        },
        // All Data List
        [feachSingleData.pending]: (state) => {
            state.isFetching = true
            state.error = null
            state.singleData = null
        },
        [feachSingleData.rejected]: (state, action) => {
            state.isFetching = false
            state.error = action?.payload
        },
        [feachSingleData.fulfilled]: (state, action) => {
            state.isFetching = false
            state.singleData = action?.payload
        },
        // Add New Data
        [addNewData.pending]: (state) => {
            state.isFetching = true
            state.error = null
            state.isEditData = false
        },
        [addNewData.rejected]: (state, action) => {
            state.isFetching = false
            state.error = action?.payload
        },
        [addNewData.fulfilled]: (state, action) => {
            message.success(`Data Added Successfully`);
            state.isFetching = false
            state.isEditData = true
            state.dataLists = { ...state.dataLists, data: [...state.dataLists.data, action.payload] }
        },
        // Edit Data
        [editData.pending]: (state) => {
            state.isFetching = true
            state.error = null
            state.isEditData = false
        },
        [editData.rejected]: (state, action) => {
            state.isFetching = false
            state.error = action?.payload
        },
        [editData.fulfilled]: (state, action) => {
            message.success(`Data Edit Successfully`);
            state.isFetching = false
            state.isEditData = true
            let data = state.dataLists.data.filter(item => (item._id !== action?.payload?._id));
            state.dataLists = { ...state.dataLists, data: [...data, action.payload] }
        },
        // Delete Data
        [deleteData.pending]: (state) => {
            state.isFetching = true
            state.error = null
        },
        [deleteData.rejected]: (state, action) => {
            state.isFetching = false
            state.error = action?.payload
        },
        [deleteData.fulfilled]: (state, action) => {
            message.success(`Successfully delete the record`);
            state.isFetching = false
            let data = state.dataLists.data.filter(item => (item._id !== action?.payload?._id));
            state.dataLists = { ...state.dataLists, data }
        },
    }

})

export const { resetAllData, resetSingleData, setFormValues } = counterSlice.actions
export default counterSlice.reducer