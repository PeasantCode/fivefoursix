const round = (num, decimals) => {
  if (isNaN(num) || isNaN(decimals) || decimals < 0 || decimals % 1 !== 0)
    return num;
  num = +num;
  return +(Math.round(num + "e" + decimals) + "e-" + decimals);
};

const mergeCommonElements = (...args) => {
  if (!args.every((arg) => Array.isArray(arg))) throw ``;
  if (!args.every((arg) => arg.length >= 1)) throw ``;

  if (
    !args
      .flat(Infinity)
      .every((e) => typeof e === "string" || !isNaN(e) || typeof e === "number")
  )
    throw ``;

  const deduplicated = args.map((arr) => new Set(arr.flat(Infinity)));

  const cnt = new Map();
  for (const arr of deduplicated) {
    for (const e of arr) {
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


const findTriangles = (array) => {
  if (!Array.isArray(array)) throw ``;
  if (!array.every((e) => Array.isArray(e))) throw ``;
  if (!array.every((arr) => arr.length === 3)) throw ``;
  for (const arr of array) {
    for (const e of arr) {
      if (typeof e !== "number") throw ``;
    }
  }

  const res = [];
  for (const sideLengths of array) {
    const [a, b, c] = sideLengths.sort((a, b) => a - b);
    if (a + b <= c) throw ``;
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

  return Object.fromEntries(Object.entries(res));
};

const stringMetrics = (array) => {
  if (!Array.isArray(array)) throw ``;
  if (!array.every((e) => typeof e === "string")) throw ``;
  if (array.length < 2) throw ``;

  const arrDes = array
    .map((str) => str.trim())
    .sort((a, b) => b.length - a.length);
  if (arrDes[0].length === 0) throw ``;
  const jointStr = arrDes.join("");
  const lengths = arrDes.map((str) => str.length);

  const vowels = jointStr.match(/[aeiou]/gi) ?? [];
  const letters = jointStr.match(/[a-z]/gi) ?? [];
  const longests = arrDes.filter((str) => str.length === lengths[0]);
  const shortests = arrDes.filter(
    (str) => str.length === lengths[lengths.length - 1]
  );
  const mean = lengths.reduce((acc, cur) => acc + cur, 0) / arrDes.length;
  const median =
    arrDes.length % 2 === 0
      ? (lengths[arrDes.length / 2] + lengths[arrDes.length / 2 - 1]) / 2
      : lengths[(arrDes.length - 1) / 2];

  const cnt = new Map();
  lengths.forEach((length) => cnt.set(length, (cnt.get(length) || 0) + 1));
  const modes = Array.from(cnt.entries())
    .sort((a, b) => b[1] - a[1])
    .reduce((modes, [len, count], idx, arr) => {
      if (idx === 0 || count === arr[0][1]) modes.push(len);
      return modes;
    }, []);
  return {
    vowels: vowels.length,
    consonants: letters.length - vowels.length,
    longest: longests.length === 1 ? longests[0] : longests,
    shortest: shortests.length === 1 ? shortests[0] : shortests,
    mean: round(mean, 2),
    median,
    mode: modes.length === 1 ? modes[0] : modes,
  };
};
