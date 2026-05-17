import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Expert from "./models/Expert.js";

dotenv.config();

await connectDB();

const experts = [
  {
    name: "Dr. Sarah Johnson",
    category: "Career",
    experience: 8,
    rating: 4.8,
    bio: "Career mentor with 8 years experience.",
    availableSlots: [
      {
        date: "2026-05-20",
        slots: [
          "10:00 AM",
          "11:00 AM",
          "2:00 PM"
        ]
      }
    ]
  },

  {
    name: "Mike Anderson",
    category: "Fitness",
    experience: 6,
    rating: 4.6,
    bio: "Certified fitness trainer.",
    availableSlots: [
      {
        date: "2026-05-20",
        slots: [
          "9:00 AM",
          "1:00 PM",
          "4:00 PM"
        ]
      }
    ]
  },

  {
    name: "David Lee",
    category: "Technology",
    experience: 10,
    rating: 4.9,
    bio: "Software engineering mentor.",
    availableSlots: [
      {
        date: "2026-05-21",
        slots: [
          "12:00 PM",
          "3:00 PM"
        ]
      }
    ]
  },

  {
    name: "Emily Carter",
    category: "Finance",
    experience: 7,
    rating: 4.7,
    bio: "Financial advisor and planner.",
    availableSlots: [
      {
        date: "2026-05-21",
        slots: [
          "11:00 AM",
          "5:00 PM"
        ]
      }
    ]
  }
];

const seedExperts = async () => {
  try {
    await Expert.deleteMany();

    const inserted =
      await Expert.insertMany(experts);

    console.log(
      `${inserted.length} experts inserted`
    );

    process.exit();

  } catch (error) {
    console.error(
      "Seeding error:",
      error
    );

    process.exit(1);
  }
};

seedExperts();