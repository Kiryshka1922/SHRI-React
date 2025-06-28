import { type PropsWriting } from "./../../types/types";

export default function writeReportToLocalStorage({
  filename,
  date,
  state,
  isSuccess,
}: Omit<PropsWriting, "id">) {
  const storedData = localStorage.getItem("reports");
  let reports: PropsWriting[] = [];

  if (storedData) {
    reports = JSON.parse(storedData);
    if (!Array.isArray(reports)) {
      reports = [];
    }
  }

  const newReport: PropsWriting = {
    filename,
    date,
    isSuccess,
    state: { ...state },
    id: generateId(), // Генерируем ID
  };

  reports.push(newReport);

  try {
    localStorage.setItem("reports", JSON.stringify(reports));
    console.log("Отчет успешно сохранен в localStorage");
  } catch (e) {
    console.error("Ошибка сохранения отчета в localStorage", e);
    throw new Error("Не удалось сохранить данные");
  }
}

function generateId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  return timestamp + randomPart;
}
