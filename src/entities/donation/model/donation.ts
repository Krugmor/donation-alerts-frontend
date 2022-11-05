/* eslint-disable react-hooks/rules-of-hooks */
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export type Donation = {
  id: number;
  name: string;
  text: string;
  shown: boolean;
  time: number;
};

export type DonationCreatePayload = Omit<Donation, "time">;
export type DonationTimerUpdatePayload = Pick<Donation, "id" | "time">;

export type DonationsModelState = {
  donations: Array<Donation>;
};

const initialState: DonationsModelState = {
  donations: [],
};

export const donationsModel = createSlice({
  name: "donations",
  initialState: initialState,
  reducers: {
    setDonations: (
      state,
      { payload }: PayloadAction<DonationCreatePayload[]>
    ) => {
      state.donations = payload.reduce<Donation[]>((donations, donation) => {
        donations[donation.id] = { ...donation, time: 0 };
        return donations;
      }, []);
    },
    updateDonation: (
      state,
      { payload: donation }: PayloadAction<DonationCreatePayload>
    ) => {
      state.donations[donation.id] = { ...donation, time: 0 };
    },
    updateDonationTimer: (
      state,
      { payload: donation }: PayloadAction<DonationTimerUpdatePayload>
    ) => {
      if (state.donations[donation.id])
        state.donations[donation.id].time = donation.time;
    },
  },
});

export const { setDonations, updateDonation, updateDonationTimer } =
  donationsModel.actions;

export const useDonations = (): Donation[] =>
  useSelector(
    createSelector(
      (state: RootState) => state.donations,
      ({ donations }) => donations
    )
  );

export const useActiveDonation = (): Donation | null =>
  useSelector(
    createSelector(
      (state: RootState) => state.donations,
      ({ donations }) =>
        donations.find((donation) => donation && !donation.shown) ?? null
    )
  );

export const reducer = donationsModel.reducer;
