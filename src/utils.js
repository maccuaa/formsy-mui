export function datesEq (date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getDate() === date2.getDate() &&
    date1.getDay() === date2.getDay() &&
    date1.getHours() === date2.getHours() &&
    date1.getMinutes() === date2.getMinutes() &&
    date1.getSeconds() === date2.getSeconds();
}
