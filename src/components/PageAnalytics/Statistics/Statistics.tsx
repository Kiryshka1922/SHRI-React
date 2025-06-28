import { type Statistics } from "../../../types/types";

import style from "./style.module.css";

const monthsGenitive = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

const formatDayOfYear = (dayOfYear: number): string => {
  const date = new Date(2023, 0);
  date.setDate(dayOfYear);

  const day = date.getDate();
  const monthIndex = date.getMonth();

  return `${day} ${monthsGenitive[monthIndex]}`;
};

const displayOrder: Array<keyof Statistics> = [
  "total_spend_galactic",
  "less_spent_civ",
  "rows_affected",
  "big_spent_at",
  "less_spent_at",
  "big_spent_value",
  "big_spent_civ",
  "average_spend_galactic",
] as const;

const descriptions: Map<keyof Statistics, string> = new Map([
  ["total_spend_galactic", "Общие расходы в галактических кредитах"],
  ["rows_affected", "Количество обработанных записей"],
  ["less_spent_at", "День года с минимальными расходами"],
  ["big_spent_at", "День года с максимальными расходами"],
  ["big_spent_value", "Максимальная сумма расходов за день"],
  ["average_spend_galactic", "Средние расходы в галактических кредитах"],
  ["big_spent_civ", "Цивилизация с максимальными расходами"],
  ["less_spent_civ", "Цивилизация с минимальными расходами"],
  ["less_spent_value", "-"],
]);

type ItemProps = {
  info: number | string;
  nameParametr: keyof Statistics;
  isModal: boolean | undefined;
};

const Item = ({ info, nameParametr, isModal }: ItemProps) => {
  let displayValue: string | number = info;

  if (nameParametr === "less_spent_at" || nameParametr === "big_spent_at") {
    displayValue = formatDayOfYear(Number(info));
  }

  return (
    <div
      style={isModal ? { backgroundColor: "#EACDFF" } : {}}
      className={style.item}
    >
      <span className={style.item__number}>{displayValue}</span>
      <span className={style.item__description}>
        {descriptions.get(nameParametr)}
      </span>
    </div>
  );
};

type StatisticsProps = {
  stat: Statistics;
  isModal?: boolean;
};

export default function Statistic({ stat, isModal }: StatisticsProps) {
  return (
    <div className={isModal ? style.modal : style.stateContainer}>
      {displayOrder.map((key) => (
        <Item isModal={isModal} key={key} info={stat[key]} nameParametr={key} />
      ))}
    </div>
  );
}
