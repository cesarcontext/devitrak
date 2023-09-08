import { createSlice } from "@reduxjs/toolkit";

const articleHandlerSlice = createSlice({
  name: "article",
  initialState: {
    article:undefined
  },
  reducers: {
    onAddArticleInfo: (state, { payload }) => {
      state.article = payload;
    },
    onResetArticleInfo: (state) => {
        state.article = undefined
      },
  },
});

export const { onAddArticleInfo, onResetArticleInfo } = articleHandlerSlice.actions

export default articleHandlerSlice.reducer