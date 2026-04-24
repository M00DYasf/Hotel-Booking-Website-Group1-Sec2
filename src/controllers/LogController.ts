import { Request, Response } from 'express';
import { GetLogsUseCase } from '../application/GetLogsUseCase';
import { LogCategory, LogLevel } from '../domain/entities/ActivityLog';

export class LogController {
  constructor(private readonly getLogsUC: GetLogsUseCase) {}

  // GET /admin/logs
  // All parameters are optional — call with no params to get the latest 50 logs.
  getLogs = async (req: Request, res: Response): Promise<void> => {
    try {
      const { level, category, userId, resourceId, action, startDate, endDate, page, limit } =
        req.query as Record<string, string | undefined>;

      const result = await this.getLogsUC.execute({
        level:      level     as LogLevel    | undefined,
        category:   category  as LogCategory | undefined,
        userId,
        resourceId,
        action,
        startDate:  startDate ? new Date(startDate) : undefined,
        endDate:    endDate   ? new Date(endDate)   : undefined,
        page:       page  ? Number(page)  : 1,
        limit:      limit ? Number(limit) : 50,
      });

      res.status(200).json(result);

    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
}
