import { ActivityLog, LogFilterOptions, PaginatedLogs } from "../entities/ActivityLog";

export interface IActivityLogRepository {
  create(log: ActivityLog): Promise<void>;

  findAll(): Promise<ActivityLog[]>;

  findWithFilters(options: LogFilterOptions): Promise<PaginatedLogs>;
}