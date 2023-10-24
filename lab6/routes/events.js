// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { Router } from "express";
import { ObjectId } from "mongodb";
import { create, get, getAll, remove, update } from "../data/events.js";
import {
  checkString,
  checkDate,
  checkTime,
  timeToMinutes,
} from "../helpers.js";
export const eventsRouter = Router();
eventsRouter
  .route("/")
  .get(async (req, res) => {
    //code here for GET
    try {
      const allObjIdEvents = await getAll();
      const allEvents = allObjIdEvents.map((event) => ({
        _id: event._id.toString(),
        eventName: event.eventName,
      }));
      return res.json(allEvents);
    } catch (e) {
      console.log(e);
      return res.status(404).json({ error: e });
    }
  })
  .post(async (req, res) => {
    //code here for POST
    try {
      const data = req.body;
      if (!data) throw "input is required";
      let {
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
      } = data;
      if (!eventLocation) throw "eventLocation is required";
      if (!maxCapacity) throw "maxCapacity is required";
      if (!priceOfAdmission && priceOfAdmission !== 0)
        throw "priceOfAdmission is required";
      if (publicEvent === undefined) throw "publicEvent is required";
      eventName = checkString(eventName, "eventName");
      if (eventName.length < 5)
        throw "the length of eventName must longer than 5";
      eventDescription = checkString(eventDescription, "eventDescription");
      if (eventDescription.length < 25)
        throw "the eventDescription must have at least 25 characters";
      contactEmail = checkString(contactEmail, "contactEmail");
      if (
        !contactEmail.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)
      )
        throw "the contactEmail is invalid";

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
      if (!city.match(/[a-z]{3,}/gi))
        throw "city must have at least 3 characters";
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
      const newEvent = await create(
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
      );
      return res.status(200).json(newEvent);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  });

eventsRouter
  .route("/:eventId")
  .get(async (req, res) => {
    //code here for GET
    let eventId = req.params.eventId;
    try {
      const id = checkString(eventId, "eventId");
      if (!ObjectId.isValid(eventId)) throw "the eventId is not valid!";
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const eventsInfo = await get(eventId);
      if (!eventsInfo) throw "the event with this eventId does not exist";
    } catch (e) {
      return res.status(404).json({ error: e });
    }
    try {
      const eventsInfo = await get(eventId);
      return res.status(200).json(eventsInfo);
    } catch (e) {}
  })
  .delete(async (req, res) => {
    //code here for DELETE
    let eventId = req.params.eventId;
    try {
      const id = checkString(eventId, "eventId");
      if (!ObjectId.isValid(eventId)) throw "the eventId is not valid!";
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const eventsInfo = await get(eventId);
      if (!eventsInfo) throw "the event with this eventId does not exist";
    } catch (e) {
      return res.status(404).json({ error: e });
    }
    try {
      const deleteInfo = await remove(eventId);
      if (!deleteInfo) throw "delete failed";
      return res.status(200).json(deleteInfo);
    } catch (e) {
      return res.json({ error: e });
    }
  })
  .put(async (req, res) => {
    //code here for PUT
    const eventId = req.params.eventId;
    const data = req.body;

    try {
      const id = checkString(eventId, "eventId");
      if (!ObjectId.isValid(eventId)) throw "the eventId is invalid";
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const targetEvent = await get(eventId);
      if (!targetEvent) throw "the event with eventId does not exist";
    } catch (e) {
      return res.status(404).json({ error: e });
    }
    try {
      if (!data) throw "input is required";
      let {
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
      } = data;
      if (!eventLocation) throw "eventLocation is required";
      if (!maxCapacity) throw "maxCapacity is required";
      if (!priceOfAdmission && priceOfAdmission !== 0)
        throw "priceOfAdmission is required";
      if (publicEvent === undefined) throw "publicEvent is required";
      eventName = checkString(eventName, "eventName");
      if (eventName.length < 5)
        throw "the length of eventName must longer than 5";
      eventDescription = checkString(eventDescription, "eventDescription");
      if (eventDescription.length < 25)
        throw "the eventDescription must have at least 25 characters";
      contactEmail = checkString(contactEmail, "contactEmail");
      if (
        !contactEmail.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)
      )
        throw "the contactEmail is invalid";

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
      const targetEvent = await get(eventId);
      if (targetEvent.attendees.length >= maxCapacity)
        throw "the number of attendees in the event exceeds the maxCapacity to be updated so the maxCapacity cannot be updated";
      const { attendees, totalNumberOfAttendees } = targetEvent;
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
      if (!city.match(/[a-z]{3,}/gi))
        throw "city must have at least 3 characters";
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
      const newEvent = await update(
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
        publicEvent,
        attendees,
        totalNumberOfAttendees
      );
      return res.status(200).json(newEvent);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  });
