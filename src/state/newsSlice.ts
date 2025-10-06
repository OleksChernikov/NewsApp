import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNews } from "../services/newsService.ts";
import { type Article, type FetchParams } from "../types/interfaces.ts";

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (params: FetchParams) => {
    const data = await getNews(params);
    return data.articles || [];
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [] as Article[],
    loading: false,
    error: "",
    activeCategory: "",
    activeArticle: null as Article | null,
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setActiveArticle: (state, action) => {
      state.activeArticle = action.payload;
    },
    clearActiveArticle: (state) => {
      state.activeArticle = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load news";
      });
  },
});

export const { setActiveCategory, setActiveArticle, clearActiveArticle } =
  newsSlice.actions;

export default newsSlice.reducer;
