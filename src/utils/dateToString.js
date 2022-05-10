const dateToString = (date: String) => {
  let dateStr = "";
  if (date !== null) {
    let dateObj = new Date(date);
    let day =
      dateObj.getDate().toString().length === 1
        ? `0${dateObj.getDate()}`
        : dateObj.getDate();
    let month =
      dateObj.getMonth().toString().length === 1
        ? `0${dateObj.getMonth() + 1}`
        : dateObj.getMonth() + 1;
    let year = `${dateObj.getFullYear().toString()[2]}${dateObj.getFullYear().toString()[3]}`;
    dateStr = `${day}/${month}/${year}`;
  }

  return dateStr;
};

export default dateToString;
