import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";

export default createReducer(
  {
    tags: [],
    activeTags: [],
    responses: [],
    status: null,
    searchText: "",
    searchResults: [],
    searchStatus: null,
  },
  {
    [actions.setTags.toString()]: (state, action) => {
      state.tags = action.payload;
    },
    [actions.setActiveTags.toString()]: (state, action) => {
      state.activeTags = action.payload;
    },
    [actions.setResponses.toString()]: (state, action) => {
      state.responses = action.payload;
    },
    [actions.setStatus.toString()]: (state, action) => {
      state.status = action.payload;
    },
    [actions.setSearchText.toString()]: (state, action) => {
      state.searchText = action.payload;
    },
    [actions.setSearchResults.toString()]: (state, action) => {
      state.searchResults = action.payload;
    },
    [actions.setSearchStatus.toString()]: (state, action) => {
      state.searchStatus = action.payload;
    },
  }
);