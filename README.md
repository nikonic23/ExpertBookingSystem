# Real-Time Expert Session Booking System

A full-stack expert booking platform built using React, Node.js, Express, MongoDB, and Socket.io.

## Features

- Expert Listing Screen
- Search & Category Filter
- Pagination
- Expert Detail Page
- Real-time Slot Updates
- Booking System
- Prevent Double Booking
- Booking Status Tracking
- Disable Booked Slots

## Tech Stack

Frontend:
- React
- Axios
- React Router DOM

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io

## APIs

- GET /experts
- GET /experts/:id
- POST /bookings
- PATCH /bookings/:id/status
- GET /bookings?email=

## Run Project

Backend:

```bash
cd server
npm install
npm run dev
```

Frontend:

```bash
cd client
npm install
npm run dev
```
