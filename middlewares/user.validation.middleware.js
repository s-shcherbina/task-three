import { USER } from '../models/user.js';
const { id, ...requiredFildsObj } = USER;
const requiredFilds = Object.keys(requiredFildsObj);

const createUserValid = (req, res, next) => {
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
    if (!requiredFilds.includes(field)) bannedFields.push(field);
  });
  if (bannedFields.length) return response(`${bannedFields} banned`);

  const regexpEmail = /^[a-zA-Z0-9](\.?[a-zA-Z0-9]){5,29}@gmail\.com$/gi;
  if (!regexpEmail.test(req.body.email))
    return response('Invalid email format');

  const regexpPhoneNumber = /^(\+380|)[0-9]{9}$/;
  if (!regexpPhoneNumber.test(req.body.phoneNumber))
    return response('Invalid phone number format');

  if (req.body.password.length < 3)
    return response('Password min 3 characters required');

  next();
};

const updateUserValid = (req, res, next) => {
  const response = (message) =>
    res.status(400).send({ error: true, message: message });

  if (req.body.id) return response('ID in the request body');

  const existFields = [];
  const bannedFields = [];
  Object.keys(req.body).forEach((field) => {
    if (!requiredFilds.includes(field)) bannedFields.push(field);
    if (requiredFilds.includes(field)) existFields.push(field);
  });
  if (bannedFields.length) return response(`${bannedFields} banned`);
  if (!existFields.length)
    return response('There are no fields from the models');

  if (req.body.email) {
    const regexpEmail = /^[a-zA-Z0-9](\.?[a-zA-Z0-9]){5,29}@gmail\.com$/gi;
    if (!regexpEmail.test(req.body.email))
      return response('Invalid email format');
  }

  if (req.body.phoneNumber) {
    const regexpPhoneNumber = /^(\+380|)[0-9]{9}$/;
    if (!regexpPhoneNumber.test(req.body.phoneNumber))
      return response('Invalid phone number format');
  }

  if (req.body.password?.length < 3)
    return response('Password min 3 characters required');

  next();
};

export { createUserValid, updateUserValid };
