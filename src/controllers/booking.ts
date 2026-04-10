import bookingQueries from "../infrastructure/mongodb/queries/booking";

export const acceptBooking = (dependencies: any) => async (id: string) => {
  const booking = await bookingQueries.findBookingById(id);
  if (!booking) throw new Error("Booking not found");
  if (booking.status !== "PENDING") throw new Error("Only pending bookings can be accepted");
  return bookingQueries.updateBookingStatus(id, "ACCEPTED");

};
export const declineBooking = (dependencies: any) => async (id: string) => {
  const booking = await bookingQueries.findBookingById(id);
  if (!booking) throw new Error("Booking not found");
  if (booking.status !== "PENDING") throw new Error("Only pending bookings can be declined");
  return bookingQueries.updateBookingStatus(id, "DECLINED");
};
export const editBooking = (dependencies: any) => async (id: string, data: any) => {
  const booking = await bookingQueries.findBookingById(id);
  if (!booking) throw new Error("Booking not found");
  return bookingQueries.updateBooking(id, data);
};