import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const usePlanStore = create(
  persist(
    (set) => ({
      currentPlan: null,
      groceries: [],
      lastGenerated: null,

      setPlan: (plan, groceries) =>
        set({
          currentPlan: plan,
          groceries,
          lastGenerated: new Date().toISOString(),
        }),

      toggleGrocery: (id) =>
        set((state) => ({
          groceries: state.groceries.map((item) =>
            item.id === id ? { ...item, completed: !item.completed } : item,
          ),
        })),

      reset: () =>
        set({ currentPlan: null, groceries: [], lastGenerated: null }),
    }),
    {
      name: "culinea-plan-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
