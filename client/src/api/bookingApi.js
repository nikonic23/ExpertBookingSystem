import axios from "axios";

const API =
  `${import.meta.env.VITE_API_URL}/api`;

export const createBooking =
  async (bookingData) => {

    const response =
      await axios.post(
        `${API}/bookings`,
        bookingData
      );

    return response.data;
  };

export const getBookingsByEmail =
  async (email) => {

    const response =
      await axios.get(
        `${API}/bookings`,
        {
          params: {
            email
          }
        }
      );

    return response.data;
  };

export const getBookedSlots =
  async (id) => {

    const response =
      await axios.get(
        `${API}/bookings/expert/${id}`
      );

    return response.data;
  };