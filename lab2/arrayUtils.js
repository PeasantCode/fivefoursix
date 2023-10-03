/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
import { round } from "./helpers.js";
export let mergeCommonElements = (...args) => {
  if (!args) throw "Input is required";
  if (args.length < 2) throw "At least two arrays are required as input";
  if (!args.every((item) => Array.isArray(item)))
    throw "Every item in the input must be an array";
  if (args.some((item) => item.length < 1))
    throw "Every array in the input must have at least one element";

  if (
    !args
      .flat(Infinity)
      .every(
        (e) => typeof e === "string" || (typeof e === "number" && !isNaN(e))
      )
  )
    throw "Every array in the input must have at least one element";

  const deduplicated = args.map((arr) => new Set(arr.flat(Infinity)));

  const cnt = new Map();
  for (const set of deduplicated) {
    for (const e of set) {
      cnt.set(e, (cnt.get(e) || 0) + 1);
    }
  }
  return Array.from(cnt.entries())
    .filter(([e, count]) => count === args.length)
    .map(([e, count]) => e)
    .sort((a, b) => {
      if (typeof a === "number" && typeof b === "number") return a - b;
      if (typeof a === "number") return -1;
      if (typeof b === "number") return 1;
      return a.localeCompare(b);
    });
};


export let findTriangles = (arr) => {
  if (!arr) throw "the input must not be empty";
  if (!Array.isArray(arr)) "the input must be an array";
  for (const eachArr of arr) {
    if (!Array.isArray(eachArr))
      throw "Every item in the array must be an array";
    if (eachArr.length !== 3)
      throw "The argument must be a 2D array with each inner array containing 3 elements";
  }
  for (const eachArr of arr) {
    for (const e of eachArr) {
      if (typeof e !== "number" || Number.isNaN(e)) {
        throw "Every array in 'arr' must consist of numbers!";
      }
    }
  }

  const res = [];
  for (const sideLengths of arr) {
    const [a, b, c] = sideLengths.sort((a, b) => a - b);
    if (a + b <= c) throw "The three sides cannot form a triangle.";
    const perimeter = a + b + c,
      halfPerimeter = perimeter / 2,
      area = Math.sqrt(
        halfPerimeter *
          (halfPerimeter - a) *
          (halfPerimeter - b) *
          (halfPerimeter - c)
      );
    const lengthInCommon = new Set(sideLengths).size;
    const enumType = new Map([
      [3, "scalene"],
      [2, "isosceles"],
      [1, "equilateral"],
    ]);
    res.push([round(area, 2), perimeter, enumType.get(lengthInCommon)]);
  }
  return { ...res };
};



export let stringMetrics = (arr) => {
  if (!arr) throw "The input must be an array.";

  if (!Array.isArray(arr)) throw "the input must be array";
  if (arr.length < 2)
    throw "The length of the array must be greater than or equal to 2.";

  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "string")
      throw "The type of every item in the array must be a string.";

    arr[i] = arr[i].trim();
    if (arr[i].length === 0)
      throw "every item in the array cannot consist of empty spaces";
  }

  const arrDes = arr.sort((a, b) => b.length - a.length);

  const stringArr = arr.join("");
  const lengths = arrDes.map((str) => str.length);

  const allLetters = stringArr.match(/[a-z]/gi) ?? [];
  const vowels = stringArr.match(/[aeiou]/gi) ?? [];

  const mean = lengths.reduce((acc, cur) => acc + cur, 0) / arrDes.length;
  const longests = arrDes.filter((str) => str.length === lengths[0]);
  const shortests = arrDes.filter(
    (str) => str.length === lengths[lengths.length - 1]
  );

  const median =
    arrDes.length % 2 === 0
      ? (lengths[arrDes.length / 2] + lengths[arrDes.length / 2 - 1]) / 2
      : lengths[(arrDes.length - 1) / 2];

  const cnt = new Map();
  lengths.forEach((length) => cnt.set(length, (cnt.get(length) || 0) + 1));
  const modes = Array.from(cnt.entries())
    .sort((a, b) => b[1] - a[1])
    .reduce((modes, [len, count], idx, arr) => {
      if (count === arr[0][1]) modes.push(len);
      return modes;
    }, []);
  return {
    vowels: vowels.length,
    consonants: allLetters.length - vowels.length,
    longest: longests.length === 1 ? longests[0] : longests,
    shortest: shortests.length === 1 ? shortests[0] : shortests,
    mean: round(mean, 2),
    median,
    mode: modes.length === 1 ? modes[0] : modes,
  };
};

