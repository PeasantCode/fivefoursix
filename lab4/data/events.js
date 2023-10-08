// TODO: Export and implement the following functions in ES6 format
import { events } from "../config/mongoCollections.js";
import { Collection, ObjectId } from "mongodb";
import {
  checkString,
  isValidDate,
  checkValidTime,
  timeToMinutes,
} from "../helpers.js";

export const create = async (
  eventName,
  eventDescription,
  eventLocation,
  contactEmail,
  maxCapacity,
  priceOfAdmission,
  eventDate,
  startTime,
  endTime,
  publicEvent
) => {
  if (!eventLocation) throw "eventLocation is required";
  if (!maxCapacity) throw "maxCapacity is required";
  if (!priceOfAdmission && priceOfAdmission !== 0)
    throw "priceOfAdmission is required";
  if (publicEvent === undefined) throw "publicEvent is required";
  eventName = checkString(eventName, "eventName");
  if (eventName.match(/[a-z]/gi).length < 5)
    throw "the length of eventName must longer than 5";
  if (eventDescription.match(/[a-z]/gi).length < 25)
    throw "the eventDescription must have 25 characters";
  if (!contactEmail.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/))
    throw "the contactEmail is invalid";

  eventDescription = checkString(eventDescription, "eventDescription");
  contactEmail = checkString(contactEmail, "contactEmail");
  eventDate = checkString(eventDate, "eventDate");
  startTime = checkString(startTime, "startTime");
  endTime = checkString(endTime, "endTime");
  isValidDate(eventDate, "eventDate");
  if (new Date(eventDate) - new Date() < 0)
    throw "eventTime must be greater than the current date";
  checkValidTime(startTime, "startTime");
  checkValidTime(endTime, "endTime");
  const startTimeMins = timeToMinutes(startTime);
  const endTimeMins = timeToMinutes(endTime);
  if (endTimeMins - startTimeMins < 0)
    throw "startTime must be earlier than endTime";

  if (endTimeMins - startTimeMins < 30)
    throw "the events time at least last 30 minutes";

  if (publicEvent !== false && publicEvent !== true)
    throw "the value of publicEvent must be false or true";
  if (typeof maxCapacity !== "number")
    throw "the type of maxCapacity must be number";
  if (typeof priceOfAdmission !== "number")
    throw "the type of priceOfAdmission must be number";
  if (maxCapacity <= 0) throw "maxCapacity must larger than 0";

  if (priceOfAdmission < 0) throw "priceOdAdmission must be positive or 0";
  // if (priceOfAdmission !== 0)
  //   const strPriceOfAdmission = String(priceOfAdmission * 100)
  //     throw "the priceOfAdmission must have two decimal place";
  if (typeof eventLocation !== "object" || Array.isArray(eventDescription))
    throw "the type of eventLocation must be string";
  let { streetAddress, city, state, zip } = eventLocation;
  if (!streetAddress) throw "streetAddress are not supplied";
  streetAddress = checkString(streetAddress, "streetAddress");
  city = checkString(city, "city");
  state = checkString(state, "state");
  zip = checkString(zip, "zip");
  if (!streetAddress.match(/[a-z]{3,}/gi))
    throw "streetAddress must be more than or equal to 3 characters";
  if (!city.match(/[a-z]{3,}/gi))
    throw "city must be more than or equal to 3 characters";
  const usStateAbbreviations = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  if (!usStateAbbreviations.includes(state))
    throw "state must be a valid two characters";
  if (!zip.match(/^[0-9]{5}$/gi)) throw "zip must be a valid five numbers";
  const newEvent = {
    eventName,
    eventDescription,
    eventLocation,
    contactEmail,
    maxCapacity,
    priceOfAdmission,
    eventDate,
    startTime,
    endTime,
    publicEvent,
  };
  const eventsCollection = await events();
  const insertInfo = await eventsCollection.insertOne(newEvent);
  if (insertInfo.acknowledged !== true) throw "create failed";
  return await get(insertInfo.insertedId.toString());
};

// console.log(
//   await create(
//     "Patrick's Big End of Summer BBQ",
//     "Come join us for our yearly end of summer bbq!",
//     {
//       streetAddress: "1 Castle Point Terrace",
//       city: "Hoboken",
//       state: "NJ",
//       zip: "07030",
//     },
//     "phill@stevens.edu",
//     30,
//     0,
//     "08/25/2024",
//     "2:00PM",
//     "8:00PM",
//     false
//   )
// );

export const getAll = async () => {
  const eventsCollection = await events();
  const allEvents = await eventsCollection.find();
  return allEvents.toArray();
};

export const get = async (id) => {
  id = checkString(id, "id");
  if (!ObjectId.isValid(id)) throw "the id is not valid!";
  const eventsCollection = await events();
  const eventsInfo = await eventsCollection.findOne({ _id: new ObjectId(id) });
  if (!eventsInfo) throw "the event with this id is not exist";
  eventsInfo._id = eventsInfo._id.toString();
  return eventsInfo;
};
// console.log(await get("652320e0b374530f6be5c0bb"));

export const remove = async (id) => {
  id = checkString(id, "id");
  if (!ObjectId.isValid(id)) throw "the id is not valid!";
  const eventsCollection = await events();
  const theEvent = await get(id);
  if (!theEvent) throw "the event with this is does not exist";
  const deleteInfo = await eventsCollection.findOneAndDelete({
    _id: new ObjectId(id),
  });
  if (!deleteInfo) throw "delete failed";
  return { eventName: theEvent.eventName, deleted: true };
};

// const remo = await remove("652327068e6eb738de01df83");
// console.log(remo);

export const rename = async (id, newEventName) => {
  id = checkString(id, "id");
  if (!ObjectId.isValid(id)) throw "the id is not valid!";
  newEventName = checkString(newEventName, "newEventName");
  if (!newEventName.match(/[a-z]{5,}/gi))
    throw "the newEventName must have at least 5 characters";
  const eventsCollection = await events();
  const targetEvent = await eventsCollection.findOne({ _id: new ObjectId(id) });
  if (!targetEvent) throw "the event with this id does not exist";
  const ifExist = await eventsCollection.findOne({ eventName: newEventName });
  if (ifExist) throw `${newEventName}`;
  const renameInfo = await eventsCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { eventName: newEventName } },
    { returnDocument: "after" }
  );
  if (!renameInfo) throw "rename failed";
  renameInfo._id = renameInfo._id.toString();
  return renameInfo;
};

// const renamedAidensbdayBash = await rename(
//   "6523270874c9224571e6ec68",
//   "Aiden's 5th Birthday Bash"
// );
// console.log(renamedAidensbdayBash);

// console.log(
//   await create(
//     "Patrick's Big End of Summer BBQ",
//     "Come join us for our yearly end of summer bbq!",
//     {
//       streetAddress: "1 Castle Point Terrace",
//       city: "Hoboken",
//       state: "NJ",
//       zip: "07030",
//     },
//     "phill@stevens.edu",
//     30,
//     0,
//     "08/25/2024",
//     "2:00PM",
//     "8:00PM",
//     false
//   )
// );
