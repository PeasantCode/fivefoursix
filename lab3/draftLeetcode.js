var kidsWithCandies = function (candies, extraCandies) {
  const combine = candies.map(
    (eachCandy) => (eachCandy = eachCandy + extraCandies)
  );
  const res = [];
  for (let i = 0; i < candies.length; i++) {
    const a = candies.filter((ele) => combine[i] < ele);
    if (a.length !== 0) res.push(false);
    else res.push(true);
  }
  return res;
};

console.log(kidsWithCandies([2, 3, 5, 1, 3], 3));
[5, 6, 8, 4, 6];
