export const createTodayInputFormat = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month = (today.getMonth() + 1).toString();
  let day = today.getDate().toString();

  if (+day < 10) {
    day = "0" + day;
  }

  if (+month < 10) {
    month = "0" + month;
  }

  const formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
};
