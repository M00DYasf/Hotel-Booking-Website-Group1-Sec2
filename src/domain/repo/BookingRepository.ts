import { Booking } from "../entities/Booking";

export interface BookingRepository {
  create(booking: Booking): Promise<void>;
  findByTime(resourceId: string, start: Date, end: Date): Promise<Booking[]>;
  updateStatus(id: string, status: string): Promise<void>;
}
