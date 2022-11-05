export const getUnixTime = (date: Date = new Date()) =>
  Math.ceil(date.getTime() / 1000);
