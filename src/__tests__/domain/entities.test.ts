import { ActivityLog } from '../../domain/entities/ActivityLog';
import { Inventory } from '../../domain/entities/Inventory';
import { Booking } from '../../domain/entities/Booking';

describe('ActivityLog entity', () => {
  it('should create an ActivityLog with default values', () => {
    const log = new ActivityLog(
      'id-1', 'LOGIN', 'user-1', 'res-1', 'User logged in', new Date()
    );
    expect(log.level).toBe('info');
    expect(log.category).toBe('system');
  });

  it('should log to console without throwing', async () => {
    const log = new ActivityLog(
      'id-1', 'LOGIN', 'user-1', 'res-1', 'User logged in', new Date()
    );
    await expect(log.log('info', 'user-1', 'auth', 'test message')).resolves.toBeUndefined();
  });
});

describe('Inventory entity', () => {
  it('should create an Inventory with correct values', () => {
    const inv = new Inventory('room-101', 10);
    expect(inv.resourceId).toBe('room-101');
    expect(inv.totalUnits).toBe(10);
  });
});

describe('Booking entity', () => {
  it('should create a Booking with default status PENDING', () => {
    const booking = new Booking(
      'id-1', 'user-1', 'room-101',
      new Date('2025-06-01'), new Date('2025-06-03')
    );
    expect(booking.status).toBe('PENDING');
  });
});