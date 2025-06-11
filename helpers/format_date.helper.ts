export const parse_date = (input: string) => {
  const [year, month, day] = input.split("-").map((num) => parseInt(num, 10));
  return new Date(year, month - 1, day);
};

export const format_date = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};