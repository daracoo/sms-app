const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const pad = (n: number) => String(n).padStart(2, "0");

export const startOfDay = (ts: number) => {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

// How many calendar days ago a timestamp was (0 = today, 1 = yesterday)
const daysBetween = (ts: number) =>
  Math.round((startOfDay(Date.now()) - startOfDay(ts)) / 86400000);

// "21:40"
export const formatTime = (ts: number) => {
  const d = new Date(ts);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// Label above a group of messages: "Today", "Yesterday", "Oct 28, 2025"
export const formatDayLabel = (ts: number) => {
  const diff = daysBetween(ts);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  const d = new Date(ts);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

// Short label in the conversation list: "21:40", "Yesterday", "Oct 28", "Oct 28, 2025"
export const formatListTime = (ts: number) => {
  const diff = daysBetween(ts);
  if (diff === 0) return formatTime(ts);
  if (diff === 1) return "Yesterday";
  const d = new Date(ts);
  const base = `${MONTHS[d.getMonth()]} ${d.getDate()}`;
  return d.getFullYear() === new Date().getFullYear()
    ? base
    : `${base}, ${d.getFullYear()}`;
};

// Mock-data helper: a timestamp N days ago at a given time
export const daysAgo = (days: number, hours: number, minutes: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hours, minutes, 0, 0);
  return d.getTime();
};