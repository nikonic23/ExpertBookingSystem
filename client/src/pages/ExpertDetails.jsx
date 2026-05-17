import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import {
  getExpertById
} from "../api/expertApi";

import {
  getBookedSlots
} from "../api/bookingApi";

function ExpertDetails() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [expert,
    setExpert] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  const [bookedSlots,
    setBookedSlots] =
    useState([]);

  useEffect(() => {

    const fetchData =
      async () => {

        try {

          // Expert fetch
          const expertData =
            await getExpertById(
              id
            );

          setExpert(
            expertData
          );

          // Booked slots fetch
          try {

            const bookedData =
              await getBookedSlots(
                id
              );

            setBookedSlots(
              bookedData
            );

          } catch (err) {

            console.error(
              "Booked slot error:",
              err
            );
          }

        } catch (error) {

          console.error(
            "Expert error:",
            error
          );

        } finally {

          setLoading(
            false
          );
        }
      };

    fetchData();

  }, [id]);

  const isBooked =
    (date, time) => {

      return bookedSlots.some(
        booking =>
          booking.date ===
            date &&
          booking.timeSlot ===
            time
      );
    };

  if (loading) {
    return (
      <h2>
        Loading...
      </h2>
    );
  }

  if (!expert) {
    return (
      <h2>
        Expert not found
      </h2>
    );
  }

  return (
    <div
      style={{
        padding:
          "20px"
      }}
    >

      <h1>
        {expert.name}
      </h1>

      <p>
        Category:
        {expert.category}
      </p>

      <p>
        Experience:
        {expert.experience}
        years
      </p>

      <p>
        Rating:
        {expert.rating}
      </p>

      <p>
        {expert.bio}
      </p>

      <h2>
        Available Slots
      </h2>

      {expert
        .availableSlots
        .map(slot => (
          <div
            key={
              slot.date
            }
          >

            <h3>
              {
                slot.date
              }
            </h3>

            {slot
              .slots
              .map(time => {

                const booked =
                  isBooked(
                    slot.date,
                    time
                  );

                return (
                  <button
                    key={time}

                    disabled={
                      booked
                    }

                    onClick={() =>
                      navigate(
                        `/booking/${id}`,
                        {
                          state: {
                            selectedDate:
                              slot.date,

                            selectedTime:
                              time
                          }
                        }
                      )
                    }

                    style={{
                      margin:
                        "5px",

                      padding:
                        "10px",

                      cursor:
                        booked
                          ? "not-allowed"
                          : "pointer",

                      opacity:
                        booked
                          ? 0.5
                          : 1
                    }}
                  >
                    {time}

                    {booked &&
                      " (Booked)"}
                  </button>
                );
              })}
          </div>
        ))}
    </div>
  );
}

export default ExpertDetails;