const merge = (word1, word2) => {
  const word1Len = word1.length;
  const word2Len = word2.length;
  let minLen;
  let maxLen;
  let res = "";
  if (word1Len < word2Len) {
    minLen = word1Len;
    maxLen = word2Len;
  } else {
    minLen = word2Len;
    maxLen = word1Len;
  }
  for (let i = 0; i < minLen; i++) {
    res += word1[i];
    res += word2[i];
  }
  if (minLen === word1Len) {
    res += word2.slice(minLen);
  }
  res += word1.slice(minLen);
  return res;
};
console.log(merge("ab", "pqrs"));
