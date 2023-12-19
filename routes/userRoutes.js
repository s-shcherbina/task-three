import { Router } from 'express';
import { userService } from '../services/userService.js';
import {
  createUserValid,
  updateUserValid,
} from '../middlewares/user.validation.middleware.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';

const router = Router();

router.post(
  '/',
  createUserValid,
  (req, res, next) => {
    try {
      const data = userService.createUser(req.body);
      res.data = data;
    } catch (err) {
      res.err = err;
      res.statusCode = 400;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  '/',
  (req, res, next) => {
    try {
      const data = userService.getAllUsers();
      res.data = data;
    } catch (err) {
      res.err = err;
      res.statusCode = 404;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  '/:id',
  (req, res, next) => {
    try {
      const { id } = req.params;
      const data = userService.getUser(id);
      res.data = data;
    } catch (err) {
      res.err = err;
      res.statusCode = 404;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.put(
  '/:id',
  updateUserValid,
  (req, res, next) => {
    try {
      const { id } = req.params;
      const data = userService.updateUser(id, req.body);
      res.data = data;
    } catch (err) {
      res.err = err;
      res.err.message === 'User not found'
        ? (res.statusCode = 404)
        : (res.statusCode = 400);
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.delete(
  '/:id',
  (req, res, next) => {
    try {
      const { id } = req.params;
      const data = userService.delete(id);
      res.data = data;
    } catch (err) {
      res.err = err;
      res.statusCode = 404;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
