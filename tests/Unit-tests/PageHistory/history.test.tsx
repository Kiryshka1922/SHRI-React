import {
  test,
  expect,
  describe,
  beforeEach,
  vi,
  beforeAll,
  Mock,
} from "vitest";
import History from "../../../src/components/PageHistory/History";

import { render, fireEvent } from "@testing-library/react";
import { clearHistory } from "../../../src/api/localStorage/clearHistory";
import { useNavigate } from "react-router-dom";
import removeReportFromStorage from "../../../src/api/localStorage/DeleteReport";

vi.mock("../../../src/api/localStorage/clearHistory");
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));
vi.mock("../../../src/api/localStorage/DeleteReport");

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
  };
})();

beforeAll(() => {
  Object.defineProperty(window, "localStorage", {
    value: mockLocalStorage,
    configurable: true,
  });
});

describe("History Component", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    mockLocalStorage.clear();
    vi.clearAllMocks();
  });

  test("отображает сообщение при отсутствии записей", () => {
    mockLocalStorage.getItem.mockReturnValueOnce("[]");
    const { getByTestId } = render(<History />);

    const elements = getByTestId("defolt");

    expect(elements.textContent).toContain("Записей пока нет");
  });

  test("отображает список отчетов при их наличии", () => {
    const mockReports = [
      {
        id: "1",
        filename: "report1.csv",
        date: "2023-01-01",
        isSuccess: true,
      },
      {
        id: "2",
        filename: "report2.csv",
        date: "2023-01-02",
        isSuccess: false,
      },
    ];
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(mockReports));
    const { container } = render(<History />);
    const reportItems = [
      container.querySelector("[data-testid='report-1']"),
      container.querySelector("[data-testid='report-2']"),
    ];

    expect(reportItems.length).toBe(2);
  });

  test("очищает историю при клике на кнопку", async () => {
    const mockReports = [
      {
        id: "1",
        filename: "report.csv",
        date: "2023-01-01",
        isSuccess: true,
      },
      {
        id: "2",
        filename: "report2.csv",
        date: "2023-01-02",
        isSuccess: false,
      },
    ];
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(mockReports));
    const { getAllByTestId } = render(<History />);
    const clearButton = getAllByTestId("clear-all");

    fireEvent.click(clearButton[0]);

    expect(clearHistory).toHaveBeenCalled();
  });

  test("переходит на страницу генерации при клике на кнопку", () => {
    mockLocalStorage.getItem.mockReturnValueOnce("[]");
    const { getByTestId } = render(<History />);
    const generateButton = getByTestId("toGenerate");

    fireEvent.click(generateButton);

    expect(mockNavigate).toHaveBeenCalledWith("/generate");
  });

  test("при клике на корзину корректно отрабатывает удаление из localStorage", async () => {
    const mockReports = [
      { id: "1", filename: "report1.csv", date: "2023-01-01", isSuccess: true },
      {
        id: "2",
        filename: "report2.csv",
        date: "2023-01-02",
        isSuccess: false,
      },
    ];

    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(mockReports));

    const { getByTestId } = render(<History />);
    const deleteButton = getByTestId("delete-1"); // Кнопка удаления для отчёта с id=1

    fireEvent.click(deleteButton);

    expect(removeReportFromStorage).toHaveBeenCalledWith({
      id: "1",
    });
  });

  test("при пустой истории кнопка 'очистить все' не отображается", () => {
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify([]));

    const { container } = render(<History />);

    const button = container.querySelector("[data-testid='']");

    expect(Boolean(button)).toBeFalsy();
  });
});
