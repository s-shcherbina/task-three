import { Router } from 'express';
import { fighterService } from '../services/fighterService.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';
import {
  createFighterValid,
  updateFighterValid,
} from '../middlewares/fighter.validation.middleware.js';

const router = Router();
router.post(
  '/',
  createFighterValid,
  (req, res, next) => {
    try {
      const data = fighterService.createFighter(req.body);
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
  '/',
  (req, res, next) => {
    try {
      const data = fighterService.getAllFighters();
      res.data = data;
    } catch (err) {
      res.err = err;
      console.log(res.err.message);
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
      const data = fighterService.getFighter(id);
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
  updateFighterValid,
  (req, res, next) => {
    try {
      const { id } = req.params;
      const data = fighterService.updateFighter(id, req.body);
      res.data = data;
    } catch (err) {
      res.err = err;
      res.err.message === 'Fighter not found'
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
      const data = fighterService.delete(id);
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
