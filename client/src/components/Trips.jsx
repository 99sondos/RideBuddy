import React, { useState, useEffect } from "react";

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null); // For handling errors

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("Please log in to view trips.");
      return;
    }

    fetch("http://localhost:3000/api/trips", {
      method: "GET", // Change to GET if you're fetching data
      headers: {
        Authorization: `Bearer ${token}`, // Include token in Authorization header
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch trips");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        setTrips(data); // Store trips in state
      })
      .catch((error) => {
        setError(error.message); // Show error if any
      });
  }, []); // Empty dependency array to run only once on component mount

  if (error) {
    return <div>{error}</div>; // Display error if there’s any
  }

  if (!trips.length) {
    return <div>No trips available.</div>; // Display a message if no trips are available
  }

  return (
    <div>
      <h1>All Trips</h1>
      <ul>
        {trips.map((trip) => (
          <li key={trip._id}>
            <strong>{trip.from}</strong> to <strong>{trip.to}</strong> on{" "}
            <strong>{trip.date}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
