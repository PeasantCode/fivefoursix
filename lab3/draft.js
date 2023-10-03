// let dates = ["6/3/1932", "12/5/1945", "4/15/1980", "2/20/2000"];

// // 将日期字符串转换为日期对象
// let allDates = dates.map(dateString => new Date(dateString));

// // 获取最小和最大日期
// let minDate = new Date(Math.min(...allDates));
// let maxDate = new Date(Math.max(...allDates));

// // 转回日期格式
// let minDateString = `${minDate.getMonth() + 1}/${minDate.getDate()}/${minDate.getFullYear()}`;
// let maxDateString = `${maxDate.getMonth() + 1}/${maxDate.getDate()}/${maxDate.getFullYear()}`;

// console.log("Earliest Date:", minDateString);  // Outputs: "Earliest Date: 6/3/1932"
// console.log("Latest Date:", maxDateString);    // Outputs: "Latest Date: 2/20/2000"

// console.log(`aaa` === 'aaa');

// const books = [
//   "aood Thief",
//   "Aood Thief",
//   "good thief",
//   "Good thief",
//   "point, the",
//   "Point.the",
// ];
// console.log(
//   books.sort((a, b) => {
//     const [firstCharA, firstCharB] = [
//       a.charAt(0).toLowerCase(),
//       b.charAt(0).toLowerCase(),
//     ];
//     return firstCharA.localeCompare(firstCharB);
//   })
// );
const a = [
  {
    id: "2155574a-80b0-4389-8bb3-3240da52b770",
    first_name: "Mayer",
    last_name: "Staddart",
    date_of_birth: "6/30/1913",
    HometownCity: "New York City",
    HometownState: "NY",
    books: [],
  },
  {
    id: "69b3f32f-5690-49d1-b9a6-9d2dd7d6e6cd",
    first_name: "Madelaine",
    last_name: "Armatage",
    date_of_birth: "4/13/1972",
    HometownCity: "Pasadena",
    HometownState: "CA",
    books: [
      "60a172b9-33fa-4ced-a210-528c723b27de",
      "ade687ed-1ee8-4ee7-bf14-485810f2af16",
    ],
  },
  {
    id: "4ac1276b-9471-4c52-a138-182746b8b89d",
    first_name: "Adorne",
    last_name: "Briant",
    date_of_birth: "6/13/1937",
    HometownCity: "Corpus Christi",
    HometownState: "TX",
    books: ["d14228c6-ce24-4edd-887e-d661dd0832b3"],
  },
  {
    id: "d6caf59c-f74c-415a-a5c7-d80ecafd1c0b",
    first_name: "Huberto",
    last_name: "Kleinmintz",
    date_of_birth: "4/27/1984",
    HometownCity: "Fort Pierce",
    HometownState: "FL",
    books: [
      "55bd691d-075f-4691-b4b7-3a77794c6335",
      "dd594b3b-43a0-4a71-8e7e-8fdab17d8ad9",
      "6ab1a72a-b93b-40fd-89df-10fcf8c9e2bd",
      "c8628b06-4fbf-4437-af28-f6eb5ac058a4",
    ],
  },
];

const b = a.map((ele) => {
  return { first_name: ele.first_name };
});
// console.log(b);
const c = a.map(({ first_name, last_name, date_of_birth }) => ({first_name,last_name,date_of_birth}))
// const c = a.map(({ first_name, last_name }) => {
//     return first_name + " " + last_name;
// });

console.log(c);

a.map(({propA,propB}) => {
    return {propA,propB}
})

a.map(({propA,propB}) => 
     ({propA,propB})
)

a.map(callback)
map(callback,a)

