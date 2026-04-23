import { ActivityLog, LogFilterOptions, PaginatedLogs } from "../entities/ActivityLog";

export interface ActivityLogRepository {
  create(log: ActivityLog): Promise<void>;

  findAll(): Promise<ActivityLog[]>;

  findWithFilters(options: LogFilterOptions): Promise<PaginatedLogs>;
}