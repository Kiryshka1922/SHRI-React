import { vi } from "vitest";
import useStore from "./../../src/api/hooks/useStore";
import { cleanup } from "@testing-library/react";

export const mockUseStore = useStore as vi.MockedFunction<typeof useStore>;
export const mockStore = () => {
  vi.resetAllMocks();

  mockUseStore.mockReturnValue({
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
    metricsStatistics: {
      loading: false,
      error: false,
      isSuccess: false,
    },
    metricsGeneration: {
      loading: false,
      error: false,
      isSuccess: false,
    },
    file: null,
    setFile: vi.fn(),
    clearError: vi.fn(),
    getReport: vi.fn(),
    getStatistics: vi.fn(),
    setSuccessStatistics: vi.fn(),
    setSuccessGeneration: vi.fn(),
    clearStore: vi.fn(),
  });

  cleanup();
};
