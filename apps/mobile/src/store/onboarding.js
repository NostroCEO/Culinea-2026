import { create } from "zustand";

export const useOnboardingStore = create((set) => ({
  diet: null,
  householdSize: 1,
  cookingTime: "standard",
  exclusions: [],

  setDiet: (diet) => set({ diet }),
  setHouseholdSize: (size) => set({ householdSize: size }),
  setCookingTime: (time) => set({ cookingTime: time }),
  setExclusions: (exclusions) => set({ exclusions }),

  reset: () =>
    set({
      diet: null,
      householdSize: 1,
      cookingTime: "standard",
      exclusions: [],
    }),
}));
