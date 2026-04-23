import { ActivityLog, LogFilterOptions, PaginatedLogs } from "../entities/ActivityLogger";

export interface ActivityLogRepository {
  create(log: ActivityLog): Promise<void>;

  findAll(): Promise<ActivityLog[]>;

  findWithFilters(options: LogFilterOptions): Promise<PaginatedLogs>;
}