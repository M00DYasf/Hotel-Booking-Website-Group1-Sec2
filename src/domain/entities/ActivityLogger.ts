export type LogLevel = "info" | "warn" | "error" | "debug";
export type LogCategory = "booking" | "auth" | "user" | "system" | "http" | "Booking";

export class ActivityLogger {
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

  
  public async log(
    type: string, 
    userId: string | null, 
    category: string, 
    message: string
  ): Promise<void> {
    console.log(`[${category}] ${type}: ${message} (User: ${userId})`);
  }
} 

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

export interface PaginatedLogs {
  logs: ActivityLogger[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}