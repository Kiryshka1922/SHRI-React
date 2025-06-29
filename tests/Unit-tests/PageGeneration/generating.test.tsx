import { test, expect, describe, beforeEach, vi } from "vitest";
import Generator from "../../../src/components/PageGeneration/Generator";
import { mockStore, mockUseStore } from "../../__mocks__/mockStore";
import { fireEvent, render } from "@testing-library/react";

vi.mock("./../../../src/api/hooks/useStore");

describe("Generator Component", () => {
  beforeEach(() => {
    mockStore();
  });

  test("изначальное отображение", () => {
    const { getByTestId } = render(<Generator />);
    const buttonSend = getByTestId("begin-generation");

    expect(buttonSend.textContent).toBe("Начать генерацию");
  });

  test("кнопка 'Отправить' не отображается во время загрузки", () => {
    mockUseStore.mockReturnValue({
      ...mockUseStore(),
      metricsGeneration: {
        loading: true,
        error: false,
        isSuccess: false,
      },
    });
    const { container } = render(<Generator />);
    const buttonSend = container.querySelector(
      '[data-testid="begin-generation"]'
    );

    expect(buttonSend).toBeFalsy();
  });

  test("Отображение индикатора загрузки", () => {
    mockUseStore.mockReturnValue({
      ...mockUseStore(),
      metricsGeneration: {
        loading: true,
        error: false,
        isSuccess: false,
      },
    });
    const { getByTestId } = render(<Generator />);
    const buttonSend = getByTestId("generating-loader");

    expect(buttonSend.textContent).toBe("Идет процесс генерации");
  });

  test("Применение правильного состояния при удачном завершении запроса", () => {
    mockUseStore.mockReturnValue({
      ...mockUseStore(),
      metricsGeneration: {
        loading: false,
        error: false,
        isSuccess: true,
      },
    });
    const { getByTestId } = render(<Generator />);
    const success = getByTestId("success");

    expect(success.textContent).toContain("Файл сгенерирован!");
  });

  test("Применение правильного состояния при ошибке запроса", () => {
    mockUseStore.mockReturnValue({
      ...mockUseStore(),
      metricsGeneration: {
        loading: false,
        error: true,
        isSuccess: false,
      },
    });
    const { getByTestId } = render(<Generator />);
    const error = getByTestId("error");

    expect(error.textContent).toContain("Упс, не то ...");
  });

  test("При клике на кнопку крестик при ошибке возвращаемся к начальному состоянию", () => {
    mockUseStore.mockReturnValue({
      ...mockUseStore(),
      metricsGeneration: {
        loading: false,
        error: true,
        isSuccess: false,
      },
    });
    const { clearError } = mockUseStore();
    const { getByTestId } = render(<Generator />);
    const buttonClose = getByTestId("close-button");

    fireEvent.click(buttonClose);

    expect(clearError).toBeCalled();
  });

  test("При клике на крестик при успехе возвращаемся к начальному состоянию", async () => {
    mockUseStore.mockReturnValue({
      ...mockUseStore(),
      metricsGeneration: {
        loading: false,
        error: false,
        isSuccess: true,
      },
    });
    const { getByTestId } = render(<Generator />);
    const { setSuccessGeneration } = mockUseStore();
    const buttonClose = getByTestId("close-button");

    fireEvent.click(buttonClose);

    expect(setSuccessGeneration).toBeCalled();
  });
});
