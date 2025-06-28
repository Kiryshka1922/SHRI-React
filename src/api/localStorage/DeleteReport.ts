export default function removeReportFromStorage({id}: { id: string }): void {
  try {
    const storedReports = localStorage.getItem("reports");
    if (!storedReports) return;

    const reports = JSON.parse(storedReports);
    if (!Array.isArray(reports)) return;

    const updatedReports = reports.filter((report) => report.id != id);

    localStorage.setItem("reports", JSON.stringify(updatedReports));
  } catch (error) {
    console.error("Failed to remove report:", error);
    throw error;
  }
}
