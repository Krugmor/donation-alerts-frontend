import { configureStore } from "@reduxjs/toolkit";
import { donationsModel } from "../../entities/donation";
import { viewerModel } from "../../entities/viewer";

export const store = configureStore({
  reducer: {
    viewer: viewerModel.reducer,
    donations: donationsModel.reducer,
  },
});
