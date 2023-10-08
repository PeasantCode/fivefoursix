//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
export const checkString = (pram, pramName) => {
  if (!pram) throw `${pramName} must be exist!`;
  if (typeof pram !== "string") throw `the type of ${pramName} must be string!`;
  pram = pram.trim();
  if (pram.length === 0) throw `${pramName} cannot consist of spaces entirely!`;
  return pram;
};

export const isValidDate = (date, whatDate) => {
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
};

export const checkValidTime = (time, whatTime) => {
  if (!time.match(/^(1[0-2]|0?[1-9]):[0-5][0-9][AP]M$/)) throw `${whatTime} is invalid`;
};

export const timeToMinutes = (time) => {
  const part = time.split(":");
  let hours = +part[0],
    mins;
  if (time.includes("PM")) {
    hours += 12;
    mins = +part[1].split("P")[0];
  } else {
    mins = +part[1].split("A")[0];
  }
  return hours * 60 + mins;
};

