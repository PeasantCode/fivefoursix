/*
    1. Create a event of your choice.
    2. Log the newly created event. (Just that event, not all events)
    3. Create another event of your choice.
    4. Query all events, and log them all
    5. Create the 3rd event of your choice.
    6. Log the newly created 3rd event. (Just that event, not all events)
    7. Rename the first event
    8. Log the first event with the updated name. 
    9. Remove the second event you created.
    10. Query all events, and log them all
    11. Try to create an event with bad input parameters to make sure it throws errors.
    12. Try to remove an event that does not exist to make sure it throws errors.
    13. Try to rename an event that does not exist to make sure it throws errors.
    14. Try to rename an event passing in invalid data for the newEventName parameter to make sure it throws errors.
    15. Try getting an event by ID that does not exist to make sure it throws errors.
*/

import { create, get, getAll, rename, remove } from "./data/events.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";

const db = await dbConnection();
// await db.dropDatabase();

/* 1. Create a event of your choice.
   2. Log the newly created event. (Just that event, not all events)
*/

try {
  const firstEvent = [
    "Patrick's Big End of Summer BBQ",
    "Come join us for our yearly end of summer bbq!",
    {
      streetAddress: "1 Castle Point Terrace",
      city: "Hoboken",
      state: "NJ",
      zip: "07037",
    },
    "phill@stevens.edu",
    30,
    25.5,
    "08/25/2024",
    "2:00PM",
    "8:00PM",
    false,
  ];
  const event = await create(...firstEvent);
  console.log("This is firstEvent:");
  console.log(event);
} catch (e) {
  console.log({ error: e });
}

//3. Create another event of your choice.
try {
  const secondEvent = [
    "Patrick's Big End of Winter Hotpot",
    "Come join us for our yearly end of summer bbq!",
    {
      streetAddress: "1 Castle Point Terrace",
      city: "Jersey City",
      state: "NJ",
      zip: "07037",
    },
    "phill@stevens.edu",
    20,
    25.5,
    "08/27/2024",
    "8:00PM",
    "10:00PM",
    false,
  ];
  await create(...secondEvent);
} catch (e) {
  console.log({ error: e });
}

// 4. Query all events, and log them all
try {
  console.log("These are all events");
  console.log(await getAll());
} catch (e) {
  console.log({ error: e });
}

/*  5. Create the 3rd event of your choice.
    6. Log the newly created 3rd event. (Just that event, not all events)
*/

try {
  const thirdEvent = [
    "Patrick's orientation for new students",
    "Come join us to learn the newest assignment requirement!",
    {
      streetAddress: "1 Castle Point Terrace",
      city: "Hoboken",
      state: "NJ",
      zip: "07033",
    },
    "phill@stevens.edu",
    50,
    0,
    "08/25/2024",
    "10:00AM",
    "12:30PM",
    true,
  ];
  console.log("This is third event:");
  console.log(await create(...thirdEvent));
} catch (e) {
  console.log({ error: e });
}

/*  7. Rename the first event
    8. Log the first event with the updated name. */
try {
  await rename("65259b84f384a21747df50a3", "Patrick's Small Start of Fall QBB");
  console.log("This is rename event:");
  console.log(await get("65259b84f384a21747df50a3"));
} catch (e) {
  console.log({ error: e });
}

/*
9. Remove the second event you created.
    10. Query all events, and log them all
*/
try {
  await remove("65259b84f384a21747df50a4");
  console.log("These are all events after removing second event:");
  console.log(await getAll());
} catch (e) {
  console.log({ error: e });
}

//11. Try to create an event with bad input parameters to make sure it throws errors.
try {
  const badNameEvent = [
    "BQ",
    "Come join us for our yearly end of summer bbq!",
    {
      streetAddress: "1 Castle Point Terrace",
      city: "Hoboken",
      state: "NJ",
      zip: "07037",
    },
    "phill@stevens.edu",
    30,
    25.5,
    "08/25/2024",
    "2:00PM",
    "8:00PM",
    false,
  ];
  await create(...badNameEvent);
} catch (e) {
  console.log({ error: e });
}
//12. Try to remove an event that does not exist to make sure it throws errors.
try {
    await remove('6525a5d575a06a530c9c61bd');
} catch (e) {
    console.log({ error: e });
}
//13. Try to rename an event that does not exist to make sure it throws errors.
try {
    await rename('6525a5d575a06a530c9c61bd',"aaaaaaaaaa")
} catch (e) {
    console.log({ error: e });
}
//14. Try to rename an event passing in invalid data for the newEventName parameter to make sure it throws errors.
try {
   await rename("6525a6532ef515f46cf40641","Patrick's orientation for new students");
} catch (e) {
    console.log({ error: e });
}
//15. Try getting an event by ID that does not exist to make sure it throws errors.
try {
    await get("6525a6532ef515f46cf40691")   
} catch (e) {
    console.log({ error: e });
}
await closeConnection();
