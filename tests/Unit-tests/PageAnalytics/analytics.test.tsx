import { test, expect, describe, beforeEach, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Analytic from "../../../src/components/PageAnalytics/Analytic";
import { mockStore, mockUseStore } from "../../__mocks__/mockStore";
import '@testing-library/jest-dom';

vi.mock("../../../src/api/hooks/useStore");

describe("Analytic Component", () => {

  beforeEach(() => {
    mockStore();
  });

  test("отображает начальное состояние", () => {
    const { container } = render(<Analytic />);
    const fileInputLabel = container.querySelector('label[for="fileInput"]');

    expect(fileInputLabel?.textContent).toBe("Загрузить файл");
  });

  test("изначально кнопка должна быть неактивна", () => {
    const { getByText } = render(<Analytic />);
    const buttonSend = getByText("Отправить");

    expect(buttonSend.hasAttribute("disabled")).toBe(true);
  });

  test("обрабатывает загрузку файла через кнопку", async () => {
    const { setFile } = mockUseStore();
    const { container } = render(<Analytic />);
    const input = container.querySelector('input[type="file"]');
    const file = new File(["content"], "test.csv", { type: "text/csv" });

    fireEvent.change(input!, { target: { files: [file] } });

    expect(setFile).toHaveBeenCalledWith(file);
  });

  test("отображение правильных стилей dropzone при наличии файла", () => {
    mockUseStore.mockReturnValue({
      ...mockUseStore(),
      file: new File(["content"], "test.csv", { type: "text/csv" }),
    });
    const { getByTestId } = render(<Analytic />);
    const dropzone = getByTestId("dropzone");

    expect(dropzone).toHaveStyle({
      backgroundColor: "rgb(252, 226, 255)",
      border: "1px solid black",
      borderRadius: "40px",
    });
  });

  test("кнопка активна при наличии файла", () => {
    mockUseStore.mockReturnValue({
      ...mockUseStore(),
      file: new File(["content"], "test.csv", { type: "text/csv" }),
    });
    const { getByText } = render(<Analytic />);
    const buttonSend = getByText("Отправить");

    expect(buttonSend.hasAttribute("disabled")).toBe(false);
  });

  test("при загрузке файла неправильного формата, должна быть соответсвующая зашлушка", () => {
    const { container, getByText } = render(<Analytic />);
    const input = container.querySelector('input[type="file"]');
    const file = new File(["content"], "test.pdf", { type: "text/csv" });

    fireEvent.change(input!, { target: { files: [file] } });

    const text = getByText("Упс, не то ...");

    expect(Boolean(text)).toBeTruthy();
  });

  test("при загрузке через drag&drop должны быть применены соответсвующие стили", () => {
    const { getByTestId } = render(<Analytic />);

    const dropzone = getByTestId("dropzone");

    fireEvent.dragEnter(dropzone);
    fireEvent.dragOver(dropzone);

    expect(dropzone).toHaveStyle({
      background: "rgb(212, 250, 230)",
    });
  })

  test("при загруженном файле неправильного формата должны применяться правильные стили", () => {
    const { container, getByTestId } = render(<Analytic />);
    const input = container.querySelector('input[type="file"]');
    const file = new File(["content"], "test.pdf", { type: "text/csv" });
    const dropzone = getByTestId("dropzone");

    fireEvent.change(input!, { target: { files: [file] } });

    expect(dropzone).toHaveStyle({
      background: "rgb(252, 226, 255)",
      border: "1px solid rgb(255, 95, 0)",
      borderRadius: "40px",
    });
  });

  test('при загруженном файле направльного формата кнопка "Отправить" должна быть неактивной', () => {
    const { container, getByTestId } = render(<Analytic />);
    const input = container.querySelector('input[type="file"]');
    const file = new File(["content"], "test.pdf", { type: "text/csv" });
    fireEvent.change(input!, { target: { files: [file] } });
    const buttonSend = getByTestId("send");

    expect(buttonSend.hasAttribute("disabled")).toBe(true);
  });

  test("Отображение прогресса обработки -> Loader", () => {
    mockUseStore.mockReturnValue({
      ...mockUseStore(),
      metricsStatistics: {
        loading: true, 
        error: false,
        isSuccess: false,
      },
    });
    const { getByTestId } = render(<Analytic />);
    const loader = getByTestId("loader");

    expect(Boolean(loader)).toBeTruthy();
  });
});
