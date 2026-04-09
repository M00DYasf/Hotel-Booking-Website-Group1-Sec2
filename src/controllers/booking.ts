import bookingQueries from "../infrastructure/mongodb/queries/booking";

export const acceptBooking = (dependencies: any) => async (id: string) => {
  const booking = await bookingQueries.findBookingById(id);
  if (!booking) throw new Error("Booking not found");
  if (booking.status !== "PENDING") throw new Error("Only pending bookings can be accepted");
  return bookingQueries.updateBookingStatus(id, "ACCEPTED");
};