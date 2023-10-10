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

export async function test(
  func,
  func_name,
  { is_error = true, expected_res } = {},
  ...args
) {
  try {
    // const [a,...e]=args;
    const res = await func(...args);
    if (expected_res) {
      if (_.isEqual(res, expected_res)) {
        console.log(`${func_name} passed successfully!\n`);
      } else {
        console.log(`${func_name} cannot pass successfully! The reason is:`);
        console.log(`\tThe actual result is:${JSON.stringify(res)}`);
        console.log(`\tThe expected result is:${JSON.stringify(expected_res)}`);
        console.log(`\tthe args are ${JSON.stringify(args)}\n`);
      }
    }
  } catch (error) {
    if (is_error) {
      console.error(`${func_name} failed successfully with error: ${error}`);
      console.log(`\tthe args are ${JSON.stringify(args)}\n`);
    } else {
      console.log(
        `${func_name} did not pass as expected, and the error is ${error}`
      );
      console.log(`\tthe args are ${JSON.stringify(args)}\n`);
    }
  }
}

export function generateTestNameAndNumber() {
  let testCounters = {};

  return function (testName) {
    if (!testCounters[testName]) {
      testCounters[testName] = 1;
    }
    const testCounter = testCounters[testName];
    testCounters[testName]++;
    return `${testName}${testCounter}`;
  };
}