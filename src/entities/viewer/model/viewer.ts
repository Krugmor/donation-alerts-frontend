/* eslint-disable react-hooks/rules-of-hooks */
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { getUnixTime } from "../../../shared/lib/helpers/date";
import { decodeJwt } from "../../../shared/lib/helpers/jwt";
import { MemoryStorage } from "../../../shared/lib/storage/memory-storage";

const VIEWER_STORAGE_KEY = "VIEWER_STORAGE_KEY";

export type Viewer = {
  id: number;
  email: string;
};

export type ViewerModelState = {
  token: string | null;
  viewer: Viewer | null;
  info: {
    iat: number;
    exp: number;
  } | null;
};

const initialState: ViewerModelState = {
  token: null,
  viewer: null,
  info: null,
};

export const viewerModel = createSlice({
  name: "viewer",
  initialState: (): ViewerModelState => {
    let cachedData = MemoryStorage.getItem(VIEWER_STORAGE_KEY);
    if (!cachedData) return initialState;
    return { ...initialState, ...cachedData };
  },
  reducers: {
    setToken: (state, { payload: token }: PayloadAction<string>) => {
      try {
        state.token = token;
        let decoded = decodeJwt(token);
        const { user: viewer, ...info } = decoded;
        state.viewer = viewer;
        state.info = info;
        MemoryStorage.setItem(VIEWER_STORAGE_KEY, {
          token,
          viewer,
          info,
        });
      } catch (error) {
        state.token = null;
        state.viewer = null;
        state.info = null;
      }
    },
  },
});

export const { setToken } = viewerModel.actions;

export const isAuthorised = (): boolean =>
  useSelector(
    createSelector(
      (state: RootState) => state.viewer,
      ({ viewer, info }) => !!viewer && !!info && info.exp > getUnixTime()
    )
  );

export const useToken = (): string | null =>
  useSelector(
    createSelector(
      (state: RootState) => state.viewer,
      ({ token }) => token
    )
  );

export const reducer = viewerModel.reducer;
