export type LogLevel = "info" | "warn" | "error" | "debug";
export type LogCategory = "booking" | "auth" | "user" | "system" | "http";

export class ActivityLog {
  constructor(
    public id: string,
    public action: string,
    public userId: string | null,
    public resourceId: string,
    public details: string,
    public timestamp: Date,
    public level: LogLevel = "info",
    public category: LogCategory = "system"
  ) {}
}

// Filters for querying logs
export interface LogFilterOptions {
  level?: LogLevel;
  category?: LogCategory;
  userId?: string;
  resourceId?: string;
  action?: string;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}

// Paginated response
export interface PaginatedLogs {
  logs: ActivityLog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}