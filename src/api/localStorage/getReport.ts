import { type PropsWriting } from "./../../types/types";
export default function getReport(id: string): PropsWriting | null {
  const storedData = localStorage.getItem("reports");

  if (storedData) {
    try {
      const reports: PropsWriting[] = JSON.parse(storedData);
      if (!Array.isArray(reports)) {
        return null;
      }

      const foundReport = reports.find((report) => report.id === id);

      return foundReport || null;
    } catch (e) {
      console.error( e);
      return null;
    }
  } else {
    return null; 
  }
}
