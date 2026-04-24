import { IActivityLogRepository } from '../domain/repo/IActivityLogRepository';
import { LogFilterOptions, PaginatedLogs } from '../domain/entities/ActivityLog';
export class GetLogsUseCase {
  constructor(private readonly logRepo: IActivityLogRepository) {}

  async execute(filters: LogFilterOptions): Promise<PaginatedLogs> {

    // Make sure page and limit are sensible numbers
    const page  = Math.max(1, Number(filters.page)  || 1);
    const limit = Math.min(200, Math.max(1, Number(filters.limit) || 50)); // max 200 per page

    // Parse the date strings into Date objects, ignore them if invalid
    let startDate = filters.startDate ? new Date(filters.startDate) : undefined;
    let endDate   = filters.endDate   ? new Date(filters.endDate)   : undefined;
    if (startDate && isNaN(startDate.getTime())) startDate = undefined;
    if (endDate   && isNaN(endDate.getTime()))   endDate   = undefined;

    // Hand off to the repository with cleaned values
    return this.logRepo.findWithFilters({ ...filters, page, limit, startDate, endDate });
  }
}
