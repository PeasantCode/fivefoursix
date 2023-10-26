// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { Router } from "express";
import { ObjectId } from "mongodb";
import { events } from "../data/index.js";
import { attendees } from "..data/index.js";
import { checkString } from "../helpers.js";
export const attendeesRouter = Router();
attendeesRouter
  .route("/:eventId")
  .get(async (req, res) => {
    //code here for GET
    const eventId = req.params.eventId;
    try {
      checkString(eventId, "eventId");
      if (!ObjectId.isValid(eventId)) throw "the eventId is invalid";
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const targetEvent = await events.get(eventId);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
    try {
      const attendees = await attendees.getAllAttendees(eventId);
      return res.status(200).json(attendees);
    } catch (e) {
      return res.json({ error: e });
    }
  })
  .post(async (req, res) => {
    //code here for POST
    const eventId = req.params.eventId;
    const data = req.body;
    let { firstName, lastName, emailAddress } = data;
    try {
      checkString(eventId, "eventId");
      if (!ObjectId.isValid(eventId)) throw "the eventId is invalid";
      if (!data) throw "input is required";
      firstName = checkString(firstName, "firstName");
      lastName = checkString(lastName, "lastName");
      emailAddress = checkString(emailAddress, "emailAddress");
      if (
        !emailAddress.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)
      )
        throw "the emailAddress is invalid";
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const targetEvent = await events.get(eventId);
      if (!targetEvent) throw "the event with eventId does not exist";
    } catch (e) {
      return res.status(404).json({ error: e });
    }
    try {
      const eventAfterAddAtt = await attendees.createAttendee(
        eventId,
        firstName,
        lastName,
        emailAddress
      );
      return res.status(200).json(eventAfterAddAtt);
    } catch (e) {
      return res.json({ error: e });
    }
  });

attendeesRouter
  .route("/attendee/:attendeeId")
  .get(async (req, res) => {
    //code here for GET
    const attendeeId = req.params.attendeeId;
    try {
      checkString(attendeeId, "attendeeId");
      if (!ObjectId.isValid(attendeeId)) throw "the attendeeId is invalid";
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const ifAttendeeExist = await attendees.getAttendee(attendeeId);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
    try {
      const targetAttendee = await attendees.getAttendee(attendeeId);
      return res.status(200).json(targetAttendee);
    } catch (e) {
      return res.json("getAttendee failed");
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    let attendeeId = req.params.attendeeId;
    try {
      checkString(attendeeId, "attendeeId");
      if (!ObjectId.isValid(attendeeId)) throw "the attendeeId is invalid";
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const targetAttendee = await attendees.getAttendee(attendeeId);
      if (!targetAttendee) throw "the attendeeId does not exist";
    } catch (e) {
      return res.status(404).json({ error: e });
    }
    try {
      const eventAfterDel = await attendees.removeAttendee(attendeeId);
      return res.status(200).json(eventAfterDel);
    } catch (e) {
      return res.json({ error: e });
    }
  });
