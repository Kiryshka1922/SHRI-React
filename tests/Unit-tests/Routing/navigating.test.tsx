import { describe, expect, test } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "../../../src/App";
import { MemoryRouter } from "react-router-dom";

describe("Routing", () => {
  test("Страница Analytic отображается при роуте '/analytic'", () => {
    const { container, getByTestId } = render(
      <MemoryRouter initialEntries={['/analytics']}>
        <App />
      </MemoryRouter>
    );

    const dropzone = getByTestId('dropzone');
    const line = container.querySelector("[data-testid='line-analytic']");

    expect(Boolean(line)).toBeTruthy();
    expect(dropzone.textContent).toContain('Загрузить файл');
  });
  test("Страница Generator отображается при роуте '/generate'", () => {
    const { container, getByTestId } = render(
      <MemoryRouter initialEntries={["/generate"]}>
        <App />
      </MemoryRouter>
    );

    const dropzone = getByTestId("begin-generation");

    const line = container.querySelector("[data-testid='line-generating']");

    expect(Boolean(line)).toBeTruthy();
    expect(dropzone.textContent).toContain("Начать генерацию");
  });
  test("Страница History отображается при роуте '/history'", () => {
    const { container, getByTestId } = render(
      <MemoryRouter initialEntries={["/history"]}>
        <App />
      </MemoryRouter>
    );

    const dropzone = getByTestId("toGenerate");
    const line = container.querySelector("[data-testid='line-history']");

    expect(Boolean(line)).toBeTruthy();
    expect(dropzone.textContent).toContain("Сгенерировать больше");
  });
});
