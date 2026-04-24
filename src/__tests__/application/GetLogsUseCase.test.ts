import { GetLogsUseCase } from '../../application/GetLogsUseCase';
import { IActivityLogRepository } from '../../domain/repo/IActivityLogRepository';
import { PaginatedLogs } from '../../domain/entities/ActivityLog';

const mockPaginatedLogs: PaginatedLogs = {
  logs: [],
  total: 0,
  page: 1,
  limit: 50,
  totalPages: 0,
};

const mockRepo: jest.Mocked<IActivityLogRepository> = {
  create: jest.fn(),
  findAll: jest.fn(),
  findWithFilters: jest.fn().mockResolvedValue(mockPaginatedLogs),
};

describe('GetLogsUseCase', () => {
  let useCase: GetLogsUseCase;

  beforeEach(() => {
    useCase = new GetLogsUseCase(mockRepo);
    jest.clearAllMocks();
  });

  it('should call findWithFilters with default page and limit', async () => {
    mockRepo.findWithFilters.mockResolvedValue(mockPaginatedLogs);
    await useCase.execute({});
    expect(mockRepo.findWithFilters).toHaveBeenCalledWith(
      expect.objectContaining({ page: 1, limit: 50 })
    );
  });

  it('should cap limit at 200', async () => {
    mockRepo.findWithFilters.mockResolvedValue(mockPaginatedLogs);
    await useCase.execute({ limit: 999 });
    expect(mockRepo.findWithFilters).toHaveBeenCalledWith(
      expect.objectContaining({ limit: 200 })
    );
  });

  it('should set page to 1 if less than 1', async () => {
    mockRepo.findWithFilters.mockResolvedValue(mockPaginatedLogs);
    await useCase.execute({ page: -5 });
    expect(mockRepo.findWithFilters).toHaveBeenCalledWith(
      expect.objectContaining({ page: 1 })
    );
  });

  it('should ignore invalid startDate', async () => {
    mockRepo.findWithFilters.mockResolvedValue(mockPaginatedLogs);
    await useCase.execute({ startDate: new Date('invalid') });
    expect(mockRepo.findWithFilters).toHaveBeenCalledWith(
      expect.objectContaining({ startDate: undefined })
    );
  });

  it('should ignore invalid endDate', async () => {
    mockRepo.findWithFilters.mockResolvedValue(mockPaginatedLogs);
    await useCase.execute({ endDate: new Date('invalid') });
    expect(mockRepo.findWithFilters).toHaveBeenCalledWith(
      expect.objectContaining({ endDate: undefined })
    );
  });

  it('should return paginated logs', async () => {
    mockRepo.findWithFilters.mockResolvedValue(mockPaginatedLogs);
    const result = await useCase.execute({});
    expect(result).toEqual(mockPaginatedLogs);
  });
});