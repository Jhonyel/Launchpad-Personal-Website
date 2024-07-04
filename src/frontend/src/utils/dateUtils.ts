export const datePipe = (date?: Date) => {
  if (!date) return "";
  date =
    typeof date == "string" ? new Date(date) : new Date(date.toDateString());
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
};
