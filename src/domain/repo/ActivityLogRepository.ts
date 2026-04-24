import { ActivityLog, LogFilterOptions, PaginatedLogs } from "../entities/ActivityLog";
import { ActivityLogModel } from '../../infrastructure/mongodb/models/activityLog';


export class ActivityLogRepository implements ActivityLogRepository {

  async create(log: ActivityLog): Promise<void> {
    await ActivityLogModel.create(log);
  }

  async findAll(): Promise<ActivityLog[]> {
    const docs = await ActivityLogModel.find().lean();
    return docs.map(this.toEntity);
  }

  async findWithFilters(options: LogFilterOptions): Promise<PaginatedLogs> {
    const { level, category, userId, resourceId, action, startDate, endDate, page = 1, limit = 50 } = options;

    const filter: Record<string, any> = {};

    if (level) filter.level = level;
    if (category) filter.category = category;
    if (userId) filter.userId = userId;
    if (resourceId) filter.resourceId = resourceId;

    if (action) {
      filter.action = { $regex: action, $options: 'i' };
    }

    if (startDate || endDate) {
      filter.timestamp = {
        ...(startDate && { $gte: startDate }),
        ...(endDate && { $lte: endDate }),
      };
    }

    const skip = (page - 1) * limit;
    const total = await ActivityLogModel.countDocuments(filter);

    const docs = await ActivityLogModel
      .find(filter)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return {
      logs: docs.map(this.toEntity),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  private toEntity(doc: any): ActivityLog {
    const { _id, ...rest } = doc;
    return new ActivityLog(
      _id.toString(),
      rest.action,
      rest.userId,
      rest.resourceId,
      rest.details,
      rest.timestamp,
      rest.level,
      rest.category
    );
  }
}