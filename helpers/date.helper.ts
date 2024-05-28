export const getReadableTimestamp = (date: Date) => {
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  const h = date.getHours();
  const min = date.getMinutes();

  const formattedDate =
    (dd < 10 ? "0" + dd : dd) +
    "/" +
    (mm < 10 ? "0" + mm : mm) +
    "/" +
    yyyy +
    " - " +
    h +
    ":" +
    (min < 10 ? "0" + min : min);

  return formattedDate;
};
