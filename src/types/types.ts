export type typeReport = {
  filename: string | undefined;
  date: string;
  isSuccessful: boolean;
  onDelete: () => void;
  id: string;
  testId?: string;
};

export type Statistics = {
  total_spend_galactic: number;
  rows_affected: number;
  less_spent_at: number;
  big_spent_at: number;
  less_spent_value: number;
  big_spent_value: number;
  average_spend_galactic: number;
  big_spent_civ: string;
  less_spent_civ: string;
};

export type PropsWriting = {
  filename: string | undefined;
  date: string;
  state: Statistics;
  isSuccess: boolean;
  id: string;
};
