export const formatDate = (value: string | Date): string => {
  const date = value instanceof Date ? value : new Date(value);

  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  }).format(date);
};
