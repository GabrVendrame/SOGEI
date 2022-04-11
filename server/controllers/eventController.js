const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");

const findAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();

  return res.json(events);
});

const findRegisteredPresentationsInEvent = asyncHandler(async (req, res) => {
  const event = await Event.find({}).select('-_id registeredPresentations');

  return res.json(event);
});

const createEvent = asyncHandler(async (req, res) => {
  const event = await Event.create(req.body);

  return res.json(event);
});

module.exports = {
  findAllEvents,
  createEvent,
  findRegisteredPresentationsInEvent,
};

