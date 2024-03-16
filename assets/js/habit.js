export function getTodayDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // Format the date string in YYYY-MM-DD
}

export function todaysHabitRecord(records) {
  // console.log("aayi");
  const todayDate = getTodayDate(new Date());

  const record = records.find((record) => {
    const recordDate = getTodayDate(record.date);
    return recordDate === todayDate;
  });

  return record;
}
