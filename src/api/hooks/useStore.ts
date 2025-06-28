import { create } from "zustand";

import { type Statistics } from "./../../types/types";

interface StoreState {
  stat: Statistics;
  metricsStatistics: {
    loading: boolean;
    error: boolean;
    isSuccess: boolean;
  };
  metricsGeneration: {
    loading: boolean;
    error: boolean;
    isSuccess: boolean;
  };
  file: File | null;
  setFile: (newFile: File | null) => void;
  clearError: () => void;
  getReport: () => Promise<void>;
  getStatistics: (date: FormData) => Promise<void>;
  setSuccessStatistics: () => void;
  setSuccessGeneration: () => void;
  clearStore: () => void;
}

const useStore = create<StoreState>((set) => ({
  metricsGeneration: {
    loading: false,
    error: false,
    isSuccess: false,
  },
  metricsStatistics: {
    loading: false,
    error: false,
    isSuccess: false,
  },
  file: null,
  stat: {
    total_spend_galactic: 0,
    rows_affected: 0,
    less_spent_at: 0,
    big_spent_at: 0,
    less_spent_value: 0,
    big_spent_value: 0,
    average_spend_galactic: 0,
    big_spent_civ: "-",
    less_spent_civ: "-",
  },
  setFile: (newFile: File | null) => set({ file: newFile }),
  setSuccessStatistics: () =>
    set((store) => ({
      metricsStatistics: {
        ...store.metricsStatistics,
        isSuccess: !store.metricsStatistics.isSuccess,
      },
    })),
  setSuccessGeneration: () =>
    set((store) => ({
      metricsGeneration: {
        ...store.metricsGeneration,
        isSuccess: !store.metricsGeneration.isSuccess,
      },
    })),

  getReport: async () => {
    set({
      metricsGeneration: { loading: true, error: false, isSuccess: false },
    });

    try {
      const response = await fetch(
        "http://localhost:3000/report?size=0.1&maxSpend=1000",
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      if (!response.headers.get("content-type")?.includes("text/csv")) {
        throw new Error("Invalid response format");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "report.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        window.URL.revokeObjectURL(downloadUrl);
        set({
          metricsGeneration: { loading: false, error: false, isSuccess: true },
        });
      }, 100);
    } catch (e) {
      console.error("Download failed:", e);
      set({
        metricsGeneration: { loading: false, error: true, isSuccess: false },
      });
    }
  },

  getStatistics: async (date: FormData) => {
    set({
      metricsStatistics: { loading: true, error: false, isSuccess: false },
    });

    try {
      const response = await fetch(
        "http://localhost:3000/aggregate?rows=10000",
        {
          method: "POST",
          body: date,
        },
      );

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Failed to read response");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        text.split("\n").forEach((line) => {
          if (line.trim()) {
            try {
              let data = JSON.parse(line);
              data = Object.fromEntries(
                Object.entries(data).map(([_, number]) => {
                  if (typeof number != "string") {
                    return [_, Math.floor(number as number)];
                  }
                  return [_, number];
                }),
              );

              set({ stat: { ...data } });
            } catch (e) {
              console.error("Parsing error:", e);
            }
          }
        });
      }
      set({
        metricsStatistics: { loading: false, error: false, isSuccess: true },
      });
    } catch (e) {
      console.error("Statistics failed:", e);
      set({
        metricsStatistics: { loading: false, error: true, isSuccess: false },
      });
    }
  },

  clearStore: () =>
    set({
      stat: {
        total_spend_galactic: 0,
        rows_affected: 0,
        less_spent_at: 0,
        big_spent_at: 0,
        less_spent_value: 0,
        big_spent_value: 0,
        average_spend_galactic: 0,
        big_spent_civ: "",
        less_spent_civ: "",
      },
    }),
  clearError: () =>
    set((store) => ({
      metricsGeneration: { ...store.metricsGeneration, error: false },
      metricsStatistics: { ...store.metricsStatistics, error: false },
    })),
}));

export default useStore;
