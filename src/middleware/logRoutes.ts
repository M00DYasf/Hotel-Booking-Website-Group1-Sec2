import { Router } from 'express';
import { LogController } from '../controllers/LogController';
import { authenticateToken, adminOnly } from '../middleware/auth';

export function logRoutes(controller: LogController): Router {
  const router = Router();

  // GET /admin/logs
  // Must be logged in AND admin
  router.get('/', authenticateToken, adminOnly, controller.getLogs);

  return router;
}
