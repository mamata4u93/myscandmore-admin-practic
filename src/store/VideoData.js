import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videoData: {},
  videoDetails: {},
  categoryIds: [],
  hashTagIds: [],
};

export const counterSlice = createSlice({
  name: "createVideoData",
  initialState,
  reducers: {
    addVideoDetails: (state, action) => {
      state.videoDetails = { ...action.payload };
    },
    addVideoData: (state, action) => {
      state.videoData[action.payload.keyValue] = {
        ...action.payload,
        endTime: parseInt(action.payload.endTime),
      };
    },
    clearVideoData: (state) => {
      state.videoData = initialState.videoData;
    },

    clearVideoDetails: (state) => {
      state.videoDetails = initialState.videoDetails;
    },

    editVideoData: (state, action) => {
      state.videoData = {
        ...state.videoData,
        [action.payload.keyValue]: {
          ...action.payload,
        },
      };
    },
    deleteVideoCardData: (state, action) => {
      delete state.videoData[action.payload.keyValue];
    },
  },
});

export const {
  addVideoData,
  clearVideoData,
  editVideoData,
  addVideoDetails,
  clearVideoDetails,
  deleteVideoCardData,
} = counterSlice.actions;
export default counterSlice.reducer;
