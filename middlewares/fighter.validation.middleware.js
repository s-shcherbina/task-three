import { FIGHTER } from '../models/fighter.js';

const { id, ...allowedFildsObj } = FIGHTER;
const { health, ...requiredFildsObj } = allowedFildsObj;
const allowedFilds = Object.keys(allowedFildsObj);
const requiredFilds = Object.keys(requiredFildsObj);

const createFighterValid = (req, res, next) => {
  const response = (message) =>
    res.status(400).send({ error: true, message: message });

  if (req.body.id) return response('ID in the request body');

  const missingFields = [];
  requiredFilds.forEach((field) => {
    if (!req.body[field]) missingFields.push(field);
  });
  if (missingFields.length) return response(`${missingFields} required`);

  const bannedFields = [];
  Object.keys(req.body).forEach((field) => {
    if (!allowedFilds.includes(field)) bannedFields.push(field);
  });
  if (bannedFields.length) return response(`${bannedFields} banned`);

  if (!(req.body.power >= 1 && req.body.power <= 100))
    return response('Power is invalid');

  if (!(req.body.defense >= 1 && req.body.defense <= 10))
    return response('Defense is invalid');

  if (
    (req.body.health || req.body.health === 0) &&
    !(req.body.health >= 80 && req.body.health <= 120)
  )
    return response('Health is invalid');

  next();
};

const updateFighterValid = (req, res, next) => {
  const response = (message) =>
    res.status(400).send({ error: true, message: message });

  if (req.body.id) return response('ID in the request body');

  const existFields = [];
  const bannedFields = [];
  Object.keys(req.body).forEach((field) => {
    if (!allowedFilds.includes(field)) bannedFields.push(field);
    if (allowedFilds.includes(field)) existFields.push(field);
  });
  if (bannedFields.length) return response(`${bannedFields} banned`);
  if (!existFields.length)
    return response('There are no fields from the models');

  if (
    (req.body.power || req.body.power === 0) &&
    !(req.body.power >= 1 && req.body.power <= 100)
  )
    return response('Power is invalid');

  if (
    (req.body.defense || req.body.defense === 0) &&
    !(req.body.defense >= 1 && req.body.defense <= 10)
  )
    return response('Defense is invalid');

  if (
    (req.body.health || req.body.health === 0) &&
    !(req.body.health >= 80 && req.body.health <= 120)
  )
    return response('Health is invalid');

  next();
};

export { createFighterValid, updateFighterValid };
