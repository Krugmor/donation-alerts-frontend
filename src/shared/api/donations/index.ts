import type { AxiosPromise } from "axios";
import { apiInstance } from "../base";

export type CreateDonationParams = {
  user: number;
  name: string;
  text: string;
};

export const createDonation = (
  data: CreateDonationParams
): AxiosPromise<void> => {
  return apiInstance.post("/donations/new", data);
};
