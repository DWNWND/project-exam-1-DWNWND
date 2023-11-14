//formatting the publishdate
export function formatDate(rawDate) {
  const initialWpPublishedDate = rawDate;
  const formattableDate = new Date(initialWpPublishedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const dateArr = formattableDate.split(",");
  return dateArr;
}
