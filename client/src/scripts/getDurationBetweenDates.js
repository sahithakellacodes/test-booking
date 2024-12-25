const getDurationBetweenDates = (startDate, endDate) => {
  // Ensure both dates are valid Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the difference in time (milliseconds)
  const timeDiff = end.getTime() - start.getTime();

  // Convert milliseconds to days
  const daysDiff = Math.round(timeDiff / (1000 * 60 * 60 * 24)); // 1 day = 1000ms * 60s * 60m * 24h

  return daysDiff;
};

export default getDurationBetweenDates;
