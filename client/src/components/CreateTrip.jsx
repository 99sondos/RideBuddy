import React, { useState } from "react";

export default function CreateTrip() {
  const [error, setError] = useState(null); // To store error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    const from = e.target.from.value;
    const to = e.target.to.value;
    const date = e.target.date.value;

    try {
      const response = await fetch("http://localhost:3000/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ from, to, date }),
      });

      if (response.ok) {
        alert("Trip created successfully!");
      } else {
        const result = await response.json();
        setError(result.message);
      }
    } catch (err) {
      setError("Error creating trip");
    }
  };

  return (
    <div>
      <h1>Create Trip</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="from"
          placeholder="From (city or address)"
          required
        />
        <input
          type="text"
          name="to"
          placeholder="To (city or address)"
          required
        />
        <input type="date" name="date" required />
        <button type="submit">Create Trip</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
