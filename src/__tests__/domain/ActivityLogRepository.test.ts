import { ActivityLogRepository } from '../../domain/repo/ActivityLogRepository';
import { ActivityLog } from '../../domain/entities/ActivityLog';

const mockModel = {
  create: jest.fn(),
  find: jest.fn(),
  countDocuments: jest.fn(),
};

jest.mock('../../infrastructure/mongodb/models/activityLog', () => ({
  ActivityLogModel: {
    create: jest.fn(),
    find: jest.fn().mockReturnValue({ lean: jest.fn().mockResolvedValue([]) }),
    countDocuments: jest.fn().mockResolvedValue(0),
  },
}));

describe('ActivityLogRepository', () => {
  let repo: ActivityLogRepository;

  beforeEach(() => {
    repo = new ActivityLogRepository();
    jest.clearAllMocks();
  });

  it('should call create with log data', async () => {
    const { ActivityLogModel } = require('../../infrastructure/mongodb/models/activityLog');
    ActivityLogModel.create.mockResolvedValue({});

    const log = new ActivityLog(
      'id-1', 'LOGIN', 'user-1', 'res-1', 'User logged in', new Date()
    );
    await repo.create(log);
    expect(ActivityLogModel.create).toHaveBeenCalledWith(log);
  });

  it('should return empty array when no logs exist', async () => {
    const result = await repo.findAll();
    expect(result).toEqual([]);
  });

  it('should call findWithFilters and return paginated result', async () => {
    const { ActivityLogModel } = require('../../infrastructure/mongodb/models/activityLog');
    ActivityLogModel.countDocuments.mockResolvedValue(0);
    ActivityLogModel.find.mockReturnValue({
      sort: jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            lean: jest.fn().mockResolvedValue([]),
          }),
        }),
      }),
    });

    const result = await repo.findWithFilters({ page: 1, limit: 10 });
    expect(result.total).toBe(0);
    expect(result.logs).toEqual([]);
  });
});