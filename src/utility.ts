//숫자를 배열로
export const range = (end: number): number[] => {
  const result = [...Array(end + 1).keys()].slice(1);
  return result;
};

export const week: string[] = ["sun", "Mon", "Tus", "Wen", "thr", "fri", "sat"];

export const month: string[] = [
  "jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
