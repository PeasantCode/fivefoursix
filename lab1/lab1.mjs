export const questionOne = (arr) => {
  let sumVowels = 0;
  for (const str of arr) {
    for (const char of str) {
      if (["a", "e", "i", "o", "u"].includes(char.toLowerCase())) {
        sumVowels++;
      }
    }
  }
  return [sumVowels, sumVowels % 2 === 0];
};

export const questionTwo = (obj1, obj2) => {
  const copyObj1 = obj1;
  for (const key2 in obj2) {
    if (key2 in copyObj1) delete copyObj1[key2];
    else {
      copyObj1[key2] = obj2[key2];
    }
  }

  const res = Object.keys(copyObj1);
  return res.sort((a, b) => {
    if (!isNaN(a) && !isNaN(b)) return a - b;
    if (!isNaN(a)) return -1;
    if (!isNaN(b)) return 1;

    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
};

export const questionThree = (arr) => {
  const array = [];
  for (const eachTriangle of arr) {
    const perimeter = eachTriangle.reduce((acc, cur) => acc + cur, 0);
    const halfPerimeter = perimeter / 2;
    const [a, b, c] = eachTriangle;
    const area = Math.sqrt(
      halfPerimeter *
        (halfPerimeter - a) *
        (halfPerimeter - b) *
        (halfPerimeter - c)
    );
    array.push([+area.toFixed(2), perimeter]);
  }
  return Object.fromEntries(Object.entries(array));
};

export const questionFour = (string) => {
  const words = string.split(",");
  const res = words.map((element) => {
    const midPosition = Math.floor(element.length / 2);
    return element.substring(midPosition) + element.substring(0, midPosition);
  });
  return res;
};

export const studentInfo = {
  firstName: "Jinghao",
  lastName: "Huang",
  studentId: "20012772",
};
