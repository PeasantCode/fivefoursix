// This data file should export all functions using the ES6 standard as shown in the lecture code
import {
  checkDate,
  checkString,
  checkTime,
  timeToMinutes,
} from "../helpers.js";
import { ObjectId } from "mongodb";
import { events } from "../config/mongoCollections.js";
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
  //Implement Code here
  //Do NOT forget to initalize attendees to be an empty array and totalNumberOfAttendees to 0 on event creation
  if (!eventLocation) throw "eventLocation is required";
  if (!maxCapacity) throw "maxCapacity is required";
  if (!priceOfAdmission && priceOfAdmission !== 0)
    throw "priceOfAdmission is required";
  if (publicEvent === undefined) throw "publicEvent is required";
  eventName = checkString(eventName, "eventName");
  if (eventName.length < 5) throw "the length of eventName must longer than 5";
  if (eventDescription.length < 25)
    throw "the eventDescription must have at least 25 characters";
  if (!contactEmail.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/))
    throw "the contactEmail is invalid";

  eventDescription = checkString(eventDescription, "eventDescription");
  contactEmail = checkString(contactEmail, "contactEmail");
  eventDate = checkDate(eventDate, "eventDate");
  if (new Date(eventDate) - new Date() < 0)
    throw "eventTime must be greater than the current date";
  startTime = checkTime(startTime, "startTime");
  endTime = checkTime(endTime, "endTime");
  const startTimeMins = timeToMinutes(startTime);
  const endTimeMins = timeToMinutes(endTime);
  if (endTimeMins - startTimeMins < 0)
    throw "startTime must be earlier than endTime";

  if (endTimeMins - startTimeMins < 30)
    throw "the events time at least last 30 minutes";

  if (typeof publicEvent !== "boolean")
    throw "the value of publicEvent must be boolean false or true";

  if (typeof maxCapacity !== "number")
    throw "the type of maxCapacity must be number";
  if (maxCapacity % 1) throw "maxCapacity must be integer";

  if (typeof priceOfAdmission !== "number")
    throw "the type of priceOfAdmission must be number";
  if (maxCapacity <= 0) throw "maxCapacity must larger than 0";

  if (priceOfAdmission < 0) throw "priceOdAdmission must be positive or 0";
  if (
    priceOfAdmission !== 0 &&
    !priceOfAdmission.toString().match(/^\d+\.\d{0,2}$/)
  )
    throw "the length of priceOfAdmission cannot longer than two decimal place";
  if (typeof eventLocation !== "object" || Array.isArray(eventDescription))
    throw "the type of eventLocation must be object";
  let { streetAddress, city, state, zip } = eventLocation;
  if (!streetAddress) throw "streetAddress are not supplied";
  streetAddress = checkString(streetAddress, "streetAddress");
  city = checkString(city, "city");
  state = checkString(state, "state");
  zip = checkString(zip, "zip");
  if (streetAddress.length < 3)
    throw "streetAddress must have at least 3 characters";
  if (!city.match(/[a-z]{3,}/gi)) throw "city must have at least 3 characters";
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
    throw "state must be a valid state abbreviation";
  if (!zip.match(/^[0-9]{5}$/gi)) throw "zip must consist of five numbers";
  const newEvent = {
    eventName,
    description: eventDescription,
    eventLocation,
    contactEmail,
    maxCapacity,
    priceOfAdmission,
    eventDate,
    startTime,
    endTime,
    publicEvent,
    attendees: [],
    totalNumberOfAttendees: 0,
  };
  const eventsCollection = await events();
  const insertInfo = await eventsCollection.insertOne(newEvent);
  if (insertInfo.acknowledged !== true) throw "create failed";
  const event = await get(insertInfo.insertedId.toString());
  return event;
};

export const getAll = async () => {
  //Implement Code here
  const eventsCollection = await events();
  const allObjIdEvents = await eventsCollection.find().toArray();
  const allEvents = allObjIdEvents.map((event) => ({
    _id: event._id.toString(),
    eventName: event.eventName,
  }));
  return allEvents;
};

export const get = async (eventId) => {
  //Implement Code here
  const id = checkString(eventId, "eventId");
  if (!ObjectId.isValid(eventId)) throw "the eventId is not valid!";
  const eventsCollection = await events();
  const eventsInfo = await eventsCollection.findOne({
    _id: new ObjectId(eventId),
  });
  if (!eventsInfo) throw "the event with this id does not exist";
  eventsInfo._id = eventsInfo._id.toString();
  return eventsInfo;
};

export const remove = async (eventId) => {
  //Implement Code here
  const id = checkString(eventId, "eventId");
  if (!ObjectId.isValid(eventId)) throw "the eventId is not valid!";
  const eventsCollection = await events();
  const theEvent = await get(eventId);
  if (!theEvent) throw "the event with this is does not exist";
  const deleteInfo = await eventsCollection.findOneAndDelete({
    _id: new ObjectId(eventId),
  });
  if (!deleteInfo) throw "delete failed";
  return { eventName: theEvent.eventName, deleted: true };
};

export const update = async (
  eventId,
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
  //Implement Code here
  const id = checkString(eventId, "eventId");
  if (!ObjectId.isValid(eventId)) throw "the eventId is not valid!";
  if (!eventLocation) throw "eventLocation is required";
  if (!maxCapacity) throw "maxCapacity is required";
  if (!priceOfAdmission && priceOfAdmission !== 0)
    throw "priceOfAdmission is required";
  if (publicEvent === undefined) throw "publicEvent is required";
  eventName = checkString(eventName, "eventName");
  if (eventName.length < 5) throw "the length of eventName must longer than 5";
  if (eventDescription.length < 25)
    throw "the eventDescription must have at least 25 characters";
  if (!contactEmail.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/))
    throw "the contactEmail is invalid";

  eventDescription = checkString(eventDescription, "eventDescription");
  contactEmail = checkString(contactEmail, "contactEmail");
  eventDate = checkDate(eventDate, "eventDate");
  if (new Date(eventDate) - new Date() < 0)
    throw "eventTime must be greater than the current date";
  startTime = checkTime(startTime, "startTime");
  endTime = checkTime(endTime, "endTime");
  const startTimeMins = timeToMinutes(startTime);
  const endTimeMins = timeToMinutes(endTime);
  if (endTimeMins - startTimeMins < 0)
    throw "startTime must be earlier than endTime";

  if (endTimeMins - startTimeMins < 30)
    throw "the events time at least last 30 minutes";

  if (typeof publicEvent !== "boolean")
    throw "the value of publicEvent must be boolean false or true";

  if (typeof maxCapacity !== "number")
    throw "the type of maxCapacity must be number";
  if (maxCapacity % 1) throw "maxCapacity must be integer";
  const eventsCollection = await events();
  const targetEvent = await eventsCollection.findOne({
    _id: new ObjectId(eventId),
  });
  if (!targetEvent) throw "the event with eventId does not exist";
  if (targetEvent.attendees.length > maxCapacity)
    throw "the number of attendees in the event exceeds the maxCapacity to be updated so the maxCapacity cannot be updated";

  if (typeof priceOfAdmission !== "number")
    throw "the type of priceOfAdmission must be number";
  if (maxCapacity <= 0) throw "maxCapacity must larger than 0";

  if (priceOfAdmission < 0) throw "priceOdAdmission must be positive or 0";
  if (
    priceOfAdmission !== 0 &&
    !priceOfAdmission.toString().match(/^\d+\.\d{0,2}$/)
  )
    throw "the length of priceOfAdmission cannot longer than two decimal place";
  if (typeof eventLocation !== "object" || Array.isArray(eventDescription))
    throw "the type of eventLocation must be object";
  let { streetAddress, city, state, zip } = eventLocation;
  if (!streetAddress) throw "streetAddress are not supplied";
  streetAddress = checkString(streetAddress, "streetAddress");
  city = checkString(city, "city");
  state = checkString(state, "state");
  zip = checkString(zip, "zip");
  if (streetAddress.length < 3)
    throw "streetAddress must have at least 3 characters";
  if (!city.match(/[a-z]{3,}/gi)) throw "city must have at least 3 characters";
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
    throw "state must be a valid state abbreviation";
  if (!zip.match(/^[0-9]{5}$/gi)) throw "zip must consist of five numbers";

  const updateInfo = await eventsCollection.findOneAndUpdate(
    { _id: new ObjectId(eventId) },
    {
      $set: {
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
      },
    },
    { returnDocument: "after" }
  );
  console.log(updateInfo);
  if (!updateInfo) throw "update failed";
  return updateInfo;
};
