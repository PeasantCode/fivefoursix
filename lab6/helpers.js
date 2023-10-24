// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is

export const checkString = (param, paramName) => {
  if (!param) throw `${paramName} must be exist!`;
  if (typeof param !== "string")
    throw `the type of ${paramName} must be string!`;
  param = param.trim();
  if (param.length === 0)
    throw `${paramName} cannot consist of spaces entirely!`;
  return param;
};

export const checkDate = (date, whatDate) => {
  date = checkString(date, whatDate);
  if (!date.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/gi))
    throw `${whatDate} type is invalid`;
  const [month, day, year] = date.split("/");
  const formatDate = new Date(year, month - 1, day);
  if (
    !(
      formatDate.getFullYear() === +year &&
      formatDate.getMonth() + 1 === +month &&
      formatDate.getDate() === +day
    )
  )
    throw `${whatDate} is invalid`;
  return date;
};

export const checkTime = (time, whatTime) => {
  time = checkString(time, whatTime);
  if (!time.match(/^(1[0-2]|0?[1-9]):[0-5][0-9] [AP]M$/))
    throw `${whatTime} is invalid`;
  return time;
};

export const timeToMinutes = (time) => {
  const part = time.split(":");
  const mins = +time.split(":")[1].split(" ")[0];
  let hours = +part[0];
  if (time.includes("PM") && hours !== 12) hours += 12;
  if (time.includes("AM") && hours === 12) hours = 0;
  return hours * 60 + mins;
};
