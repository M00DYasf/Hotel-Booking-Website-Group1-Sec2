export type BookingStatus = "PENDING" | "ACCEPTED" | "DECLINED";

export class Booking {
  constructor(
    public id: string,
    public userId: string | null, // null is a guest
    public resourceId: string, // what we are booking
    public startTime: Date,
    public endTime: Date,
    public status: BookingStatus = "PENDING"
  ) {}
}