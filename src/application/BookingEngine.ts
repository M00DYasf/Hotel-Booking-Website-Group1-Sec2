import { Booking } from "../domain/entities/Booking";
import { BookingRepository } from "../domain/repo/BookingRepository";
import { ActivityLog } from "../domain/entities/ActivityLog";

export class BookingEngine {
  constructor(
    private bookingRepo: BookingRepository,
    private activityLogger: ActivityLog
  ) {}

  private isOverlapping(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
    return aStart < bEnd && aEnd > bStart;
  }

  async createBooking(data: {
    userId: string | null;
    resourceId: string;
    startTime: Date;
    endTime: Date;

    createdAt: Date;
  }) {
    const existingBookings = await this.bookingRepo.findByTime(
      data.resourceId,
      data.startTime,
      data.endTime
    );

    let overlappingCount = 0;

    for (const booking of existingBookings) {
      if (
        this.isOverlapping(
          data.startTime,
          data.endTime,
          booking.startTime,
          booking.endTime
        )
      ) {
        overlappingCount++;
      }
    }

    if (overlappingCount >= 1) {
      await this.activityLogger.log(
        "BOOKING_FAILED",
        data.userId,
        "Booking",
        "No availability for requested time"
      );

      throw new Error("No availability for this time slot.");
    }

    const booking = new Booking(
      crypto.randomUUID(),
      data.userId,
      data.resourceId,
      data.startTime,
      data.endTime,
      "PENDING",
      data.createdAt
    );

    await this.bookingRepo.create(booking);

    await this.activityLogger.log(
      "CREATE_BOOKING",
      data.userId,
      "Booking",
      `Booking for resource ${data.resourceId} from ${data.startTime} to ${data.endTime}`
    );

    return booking;
  }
}