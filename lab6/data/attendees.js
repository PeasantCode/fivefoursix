// This data file should export all functions using the ES6 standard as shown in the lecture code

import { checkString } from "../helpers.js";
import { ObjectId } from "mongodb";
import { get } from "./events.js";
import { events } from "../config/mongoCollections.js";

export const createAttendee = async (
  eventId,
  firstName,
  lastName,
  emailAddress
) => {
  //Implement Code here
  checkString(eventId, "eventId");
  if (!ObjectId.isValid(eventId)) throw "the eventId is invalid";
  firstName = checkString(firstName, "firstName");
  lastName = checkString(lastName, "lastName");
  emailAddress = checkString(emailAddress, "emailAddress");
  const eventsCollection = await events();
  const targetEvent = await eventsCollection.findOne({
    _id: new ObjectId(eventId),
  });
  if (!targetEvent) throw "the event with eventId does not exist";
  if (!emailAddress.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/))
    throw "the emailAddress is invalid";
  const oriAttendees = targetEvent.attendees;
  if (oriAttendees.length === targetEvent.maxCapacity)
    throw "the event has reached its maximum capacity and no new participants can be added";
  const ifExist = oriAttendees.find((ele) => ele.emailAddress === emailAddress);
  if (ifExist) throw "this attender is already on the list ";
  const eventAfterAddAtt = await eventsCollection.findOneAndUpdate(
    { _id: new ObjectId(eventId) },
    {
      $push: {
        attendees: { _id: new ObjectId(), firstName, lastName, emailAddress },
      },
      $set: { totalNumberOfAttendees: targetEvent.totalNumberOfAttendees + 1 },
    },
    { returnDocument: "after" }
  );
  if (!eventAfterAddAtt) throw "creating a new attender failed";
  return await get(eventId);
};

export const getAllAttendees = async (eventId) => {
  //Implement Code here
  checkString(eventId, "eventId");
  if (!ObjectId.isValid(eventId)) throw "the eventId is invalid";
  const eventsCollection = await events();
  const targetEvent = await eventsCollection.findOne({
    _id: new ObjectId(eventId),
  });
  if (!targetEvent) throw "the event with eventId does not exist";
  return targetEvent.attendees;
};

export const getAttendee = async (attendeeId) => {
  //Implement Code here
  checkString(attendeeId, "attendeeId");
  if (!ObjectId.isValid(attendeeId)) throw "the attendeeId is invalid";
  const eventsCollection = await events();
  const targetEvent = await eventsCollection.findOne({
    attendees: { $elemMatch: { _id: new ObjectId(attendeeId) } },
  });
  if (!targetEvent) throw "the attendee with attendeeId does not exist";
  return targetEvent.attendees.find((ele) => ele._id.toString() === attendeeId);
};

export const removeAttendee = async (attendeeId) => {
  //Implement Code her
  checkString(attendeeId, "attendeeId");
  if (!ObjectId.isValid(attendeeId)) throw "the attendeeId is invalid";
  const eventsCollection = await events();
  const targetEvent = await eventsCollection.findOne({
    attendees: { $elemMatch: { _id: new ObjectId(attendeeId) } },
  });
  if (!targetEvent) throw "the attendee with attendeeId does not exist";
  const deleteInfo = await eventsCollection.findOneAndUpdate(
    { _id: new ObjectId(targetEvent._id) },
    {
      $pull: { attendees: { _id: new ObjectId(attendeeId) } },
      $set: { totalNumberOfAttendees: targetEvent.totalNumberOfAttendees - 1 },
    },
    { returnDocument: "after" }
  );
  if (!deleteInfo) throw "deleting failed";
  return deleteInfo;
};