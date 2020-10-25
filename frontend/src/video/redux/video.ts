import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { AppState } from "../../redux/types";
import { MovieVideo } from "../../tmdb/types";

const name = "video";

/* 


*/

export interface VideoProgress {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

export interface VideoState {
  isPlaying: boolean;
  currentVideo: MovieVideo | undefined;
  playlist: MovieVideo[];
}

export const initialState: VideoState = {
  isPlaying: false,
  currentVideo: undefined,
  playlist: [],
};

/* 

*/

const actions = {
  setCurrentVideo: createAction<MovieVideo | undefined>(
    name + "/SET_CURRENT_VIDEO"
  ),
  setPlaylist: createAction<MovieVideo[]>(name + "/SET_PLAYLIST"),
  setIsPlaying: createAction<boolean>(name + "/SET_IS_PLAYING"),
  //
  progress: createAction<VideoProgress>(name + "/PROGRESS"),
};

/* 


*/

const slice = (state: AppState) => state.video;
const isPlaying = createSelector([slice], (slice) => slice.isPlaying);
const currentVideo = createSelector([slice], (slice) => slice.currentVideo);
const playlist = createSelector([slice], (slice) => slice.playlist);
const selectors = {
  isPlaying,
  currentVideo,
  playlist,
};

/* 


*/

export const reducer = createReducer(initialState, {
  [actions.setIsPlaying.toString()]: (state, action) => {
    state.isPlaying = action.payload;
  },
  [actions.setCurrentVideo.toString()]: (state, action) => {
    state.currentVideo = action.payload;
  },
  [actions.setPlaylist.toString()]: (state, action) => {
    state.playlist = action.payload;
  },
});

/* 


*/

export const video = {
  reducer,
  actions,
  selectors,
};