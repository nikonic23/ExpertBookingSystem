import {
  useState
} from "react";

import {
  useParams,
  useLocation
} from
"react-router-dom";

import {
  createBooking
} from
"../api/bookingApi";

function BookingPage() {

  const { id } =
    useParams();

  const location =
    useLocation();

  const {
    selectedDate,
    selectedTime
  } =
    location.state || {};

  const [formData,
    setFormData] =
    useState({

      name: "",
      email: "",
      phone: "",
      notes: ""
    });

  const [message,
    setMessage] =
    useState("");

  const handleChange =
    e => {

      setFormData({
        ...formData,

        [e.target.name]:
          e.target.value
      });
    };

  const handleSubmit =
    async e => {

      e.preventDefault();

      try {

        const booking =
          await createBooking({

            expertId:
              id,

            ...formData,

            date:
              selectedDate,

            timeSlot:
              selectedTime
          });

        setMessage(
          booking.message
        );

      } catch (error) {

        setMessage(
          error.response
            ?.data
            ?.message
            ||
          "Booking failed"
        );
      }
    };

  return (
    <div
      style={{
        padding:
          "20px"
      }}
    >

      <h1>
        Book Session
      </h1>

      <p>
        Date:
        {selectedDate}
      </p>

      <p>
        Time:
        {selectedTime}
      </p>

      <form
        onSubmit={
          handleSubmit
        }
      >

        <input
          type="text"
          name="name"
          placeholder=
            "Name"
          required
          onChange=
            {handleChange}
        />

        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder=
            "Email"
          required
          onChange=
            {handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="phone"
          placeholder=
            "Phone"
          required
          onChange=
            {handleChange}
        />

        <br />
        <br />

        <textarea
          name="notes"
          placeholder=
            "Notes"
          onChange=
            {handleChange}
        />

        <br />
        <br />

        <button
          type="submit"
        >
          Book Session
        </button>

      </form>

      {message && (
        <p>
          {message}
        </p>
      )}

    </div>
  );
}

export default BookingPage;