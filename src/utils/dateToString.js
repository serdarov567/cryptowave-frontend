const dateToString = (date: String) => {
  let dateStr = "";
  let hourStr = "";
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
    let year = `${dateObj.getFullYear().toString()[2]}${
      dateObj.getFullYear().toString()[3]
    }`;
    dateStr = `${day}/${month}/${year}`;

    let hours =
      dateObj.getHours().toString().length === 1
        ? `0${dateObj.getHours()}`
        : dateObj.getHours();

    let minutes =
      dateObj.getMinutes().toString().length === 1
        ? `0${dateObj.getMinutes()}`
        : dateObj.getMinutes();

    hourStr = `${hours}:${minutes}`;
  }

  return { dateStr, hourStr };
};

export default dateToString;
