import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { clearHistory } from "../../api/localStorage/clearHistory";
import Button from "../../shared/buttons/button";
import { type PropsWriting } from "../../types/types";

import Report from "./Report/Report";
import style from "./style.module.css";

export default function History() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<PropsWriting[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    try {
      const storedReports = localStorage.getItem("reports") || "[]";
      const parsedReports = JSON.parse(storedReports);
      setReports(Array.isArray(parsedReports) ? parsedReports : []);
    } catch (error) {
      console.error("Failed to load reports:", error);
      setReports([]);
    }
  }, [refreshKey]);

  const handleRefresh = () => setRefreshKey((prev) => prev + 1);

  if (!reports.length) {
    return (
      <div data-testid='defolt' className={style.message}>
        <span>Записей пока нет</span>
        <Button
          testId="toGenerate"
          classes={["button-send"]}
          onClick={() => {
            navigate("/generate");
          }}
        >
          Сгенерировать больше
        </Button>
      </div>
    );
  }

  return (
    <div className={style.historyList}>
      {reports.map((report, index) => (
        <Report
        testId={`report-${report.id}`}
          id={report.id}
          key={index}
          onDelete={handleRefresh}
          filename={report.filename}
          date={report.date}
          isSuccessful={report.isSuccess}
        />
      ))}
      <div className={style.groupButton}>
        <Button testId="toGenerate" classes={['button-send']} onClick={() => {
          navigate("/generate");
        }}>
          Сгенерировать больше 
        </Button>
        <Button classes={['close']} onClick={() => {
            clearHistory();
            setReports([]);
          }}
          testId="clear-all"
          >
          Очистить все
        </Button>

      </div>
    </div>
  );
}
