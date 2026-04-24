import { BookingEngine } from '../../application/BookingEngine';
import { BookingRepository } from '../../domain/repo/BookingRepository';
import { ActivityLog } from '../../domain/entities/ActivityLog';
import { Booking } from '../../domain/entities/Booking';

const mockBookingRepo: jest.Mocked<BookingRepository> = {
  create: jest.fn(),
  findByTime: jest.fn(),
  updateStatus: jest.fn(),
};

const mockActivityLogger = {
  log: jest.fn().mockResolvedValue(undefined),
} as unknown as ActivityLog;

describe('BookingEngine', () => {
  let engine: BookingEngine;

  beforeEach(() => {
    engine = new BookingEngine(mockBookingRepo, mockActivityLogger);
    jest.clearAllMocks();
  });

  it('should create a booking when no overlap exists', async () => {
    mockBookingRepo.findByTime.mockResolvedValue([]);
    mockBookingRepo.create.mockResolvedValue(undefined);

    const result = await engine.createBooking({
      userId: 'user-1',
      resourceId: 'room-101',
      startTime: new Date('2025-06-01T10:00:00Z'),
      endTime: new Date('2025-06-03T10:00:00Z'),
      createdAt: new Date(),
    });

    expect(mockBookingRepo.create).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Booking);
    expect(result.status).toBe('PENDING');
  });

  it('should throw error when overlap exists', async () => {
    const overlapping = new Booking(
      'existing-id',
      'user-2',
      'room-101',
      new Date('2025-06-01T09:00:00Z'),
      new Date('2025-06-02T11:00:00Z'),
      'PENDING',
      new Date()
    );
    mockBookingRepo.findByTime.mockResolvedValue([overlapping]);

    await expect(
      engine.createBooking({
        userId: 'user-1',
        resourceId: 'room-101',
        startTime: new Date('2025-06-01T10:00:00Z'),
        endTime: new Date('2025-06-03T10:00:00Z'),
        createdAt: new Date(),
      })
    ).rejects.toThrow('No availability for this time slot.');

    expect(mockActivityLogger.log).toHaveBeenCalledWith(
      'BOOKING_FAILED',
      'user-1',
      'Booking',
      'No availability for requested time'
    );
  });

  it('should log activity after successful booking', async () => {
    mockBookingRepo.findByTime.mockResolvedValue([]);
    mockBookingRepo.create.mockResolvedValue(undefined);

    await engine.createBooking({
      userId: 'user-1',
      resourceId: 'room-101',
      startTime: new Date('2025-06-01T10:00:00Z'),
      endTime: new Date('2025-06-03T10:00:00Z'),
      createdAt: new Date(),
    });

    expect(mockActivityLogger.log).toHaveBeenCalledWith(
      'CREATE_BOOKING',
      'user-1',
      'Booking',
      expect.stringContaining('room-101')
    );
  });
});