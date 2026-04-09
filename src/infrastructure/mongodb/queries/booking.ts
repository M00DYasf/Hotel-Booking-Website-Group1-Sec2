import { Booking } from "../models/booking";

const findBookingById = async (id: string) => {
  return Booking.findById(id);
};

const updateBookingStatus = async (id: string, status: string) => {
  return Booking.findByIdAndUpdate(id, { status }, { new: true });
};

const updateBooking = async (id: string, data: any) => {
  return Booking.findByIdAndUpdate(id, data, { new: true });
};

const findAllBookings = async () => {
  return Booking.find();
};

export default { findBookingById, updateBookingStatus, updateBooking, findAllBookings };